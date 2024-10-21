import { metadata } from "@/app/layout";
import { VectorStoreHandler } from "@/lib/langchain/vectorstore";
import { z } from "zod";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { tool } from "@langchain/core/tools";
import { traceable } from "langsmith/traceable";
import { v4 as uuidv4 } from "uuid";
import { ALL_PARTIES_DATA, ALL_PARTIES, PartyName } from "@/types/parties";

type Nullable<T> = T | null;

export const askVectorStore = async (
  query: string,
  party: Nullable<string> = null,
  isContent: boolean = true
) => {
  const vectorStoreHandler = new VectorStoreHandler(
    "conote-tu-voto",
    "programs"
  );

  const response = await vectorStoreHandler.getDocs({
    query,
    k: 4,
    multiQuery: 2,
    metadataFilter: {
      party: party || null,
      is_content: isContent,
    },
  });
  const parsedResponse = response.map((document) => {
    return {
      pageContent: document.pageContent,
      source: document.metadata.source,
      howToCite: document.metadata.howToCite,
      page: document.metadata.page,
    };
  });

  return JSON.stringify(parsedResponse);
};

export const askVectorStoreTool = new DynamicStructuredTool({
  name: "check-government-programs-database",
  description: `Utilizalo para consultar los programas de gobierno de cada partido, los partidos disponibles son ${ALL_PARTIES.join(
    ", "
  )}. 
        Esta herramienta permite hacer consultas por similaridad de texto a una vectorstore que contiene el programa de gobierno de cada partido. 
        Incluye un partido si quieres especificar uno, o no lo incluyas si quieres buscar entre todos.
        Ejemplos de uso: 
            check-government-programs-database('Medidas de seguridad', 'colorado') => Devuelve fragmentos del programa de gobierno del partido colorado relacionado a ese tema.
            check-government-programs-database('Como se va a manejar el problema de las jubilaciones?') => Devuelve fragmentos del programa de gobierno de entre todos los partidos relacionados a ese tema.
        `,
  schema: z.object({
    query: z.string().describe("Consulta para la vectorstore"),
    party: z
      .string()
      .optional()
      .describe(`Partido politico, uno de: ${ALL_PARTIES.join(", ")}`),
  }),
  func: async (input) => {
    return await askVectorStore(input.query, input.party ?? null, true);
  },
});
