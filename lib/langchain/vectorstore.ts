import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { smallModel } from "@/lib/langchain/llms";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { queryVariationPrompt } from "@/lib/langchain/prompts";
import type { Document } from "@langchain/core/documents";
import { traceable } from "langsmith/traceable";

// Returns a list of strings
const generateQueryVariations = async (
  query: string,
  variationsNumber: number,
  includeOriginal: boolean = true
) => {
  //Map variations to the correct number
  const multiqueryMapping = {
    1: "uno",
    2: "dos",
    3: "tres",
    4: "cuatro",
    5: "cinco",
  };
  const variations =
    multiqueryMapping[variationsNumber as keyof typeof multiqueryMapping] ||
    "cuatro";

  const queries: string[] = [];
  if (includeOriginal) {
    queries.push(query);
  }

  // Add variations to the queries list
  try {
    const chain = queryVariationPrompt
      .pipe(smallModel)
      .pipe(new JsonOutputParser());
    const response: any = await chain.invoke({
      input: query,
      variations: variations,
    });
    // Response is an object with the key variations which is a list of strings
    if (response.variations && Array.isArray(response.variations)) {
      queries.push(...response.variations);
    }
  } catch (e) {
    console.error(e);
  }

  return queries;
};

export interface GetDocsQueryOptions {
  query: string; // El parámetro obligatorio
  k?: number; // Opcional con valor por defecto de 5
  multiQuery?: number; // Opcional con valor por defecto de 4
  metadataFilter?: Record<string, any>; // Opcional con valor por defecto de {}
  maxDocs?: number; // Opcional con valor por defecto de 10
  minSimilarity?: number; // Opcional con valor por defecto de 0.3
  config?: any; // Opcional con valor por defecto de {}
}

// Start a class in JS like WorkspaceVectorStoreHandler, initialize a vectorstore from PineconeStore like in the code below
class VectorStoreHandler {
  vectorstore: PineconeStore;
  namespace: string;
  indexName: string;

  constructor(indexName: string, namespace: string) {
    this.indexName = indexName;
    this.namespace = namespace;
    const pinecone = new Pinecone();
    const index = pinecone.Index(indexName);
    this.vectorstore = new PineconeStore(new OpenAIEmbeddings(), {
      pineconeIndex: index,
      namespace,
    });
  }

  getDocs = traceable(
    async ({
      query,
      k = 5,
      multiQuery = 4,
      metadataFilter = {},
      maxDocs = 10,
      minSimilarity = 0.3,
    }: GetDocsQueryOptions) => {
      // Generate extra queries if needed
      let queries = [query];
      if (multiQuery) {
        queries = await generateQueryVariations(query, multiQuery);
      }

      // Get documents for each query
      let docs: [any, number][] = [];
      const currentMetadataFilter = { ...metadataFilter };
      // Remove all null values from the metadata filter
      Object.keys(currentMetadataFilter).forEach((key) => {
        if (currentMetadataFilter[key] === null) {
          delete currentMetadataFilter[key];
        }
      });

      // Generate all promises for vectorstore
      const docsPromises = queries.map((q) =>
        this.vectorstore.similaritySearchWithScore(q, k, currentMetadataFilter)
      );
      const docsResults = await Promise.all(docsPromises);
      docsResults.forEach((newDocs) => docs.push(...newDocs));

      // First, filter by similarity
      docs = docs.filter((doc) => doc[1] > minSimilarity);
      // Now, sort by similarity
      docs = docs.sort((a, b) => b[1] - a[1]);
      // Finally, get the unique docs, which is a
      let uniqueDocs: Document[] = [];
      docs.forEach((doc) => {
        if (!uniqueDocs.find((d) => d === doc[0])) {
          uniqueDocs.push(doc[0]);
        }
      });

      // add the how_to_cite property to all the metadata
      uniqueDocs = uniqueDocs.map((doc) => {
        doc.metadata.howToCite = `${doc.metadata.source}, Pagina: ${doc.metadata.page}`;
        return doc;
      });

      // Return the top maxDocs
      uniqueDocs = uniqueDocs.slice(0, maxDocs);

      return uniqueDocs;
    },
    {
      name: "Get Docs",
    }
  );
}

export { VectorStoreHandler };
