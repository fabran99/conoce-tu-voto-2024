import { AgentExecutor, createToolCallingAgent } from "langchain/agents";
import { mainModel, smallModel } from "./llms";
import {
  questionAgentPrompt,
  enhanceQuestionPrompt,
  validateQuestionPrompt,
} from "./prompts";
import {
  StringOutputParser,
  JsonOutputParser,
} from "@langchain/core/output_parsers";
import { askVectorStoreTool } from "./programs/tools";
import { ChatMessage } from "@/types/chat";
import { traceable } from "langsmith/traceable";

export const chatWithQuestionAgent = async ({
  summary,
  chatHistory,
  userQuery,
  threadId,
}: {
  summary: string | null;
  chatHistory: ChatMessage[];
  userQuery: string;
  threadId: string;
}) => {
  // Initialize the agent
  const tools = [askVectorStoreTool];
  const agent = await createToolCallingAgent({
    llm: mainModel,
    tools,
    prompt: questionAgentPrompt,
  });
  const agentExecutor = new AgentExecutor({
    agent,
    tools,
    verbose: true,
    returnIntermediateSteps: true,
    maxIterations: 12,
  });

  // Validate user query
  try {
    const validateChain = validateQuestionPrompt
      .pipe(mainModel)
      .pipe(new JsonOutputParser());
    const validatedQuery = (await validateChain.invoke({
      chatHistory,
      userQuery,
    })) as { isValid: boolean; response: string };

    if (validatedQuery && !validatedQuery.isValid && validatedQuery.response) {
      console.log(validatedQuery);
      return {
        response: validatedQuery.response,
        references: [],
      };
    }
  } catch (e) {
    console.log(e);
  }

  // Generate enhanced query
  const chain = enhanceQuestionPrompt
    .pipe(smallModel)
    .pipe(new StringOutputParser());
  const enhancedQuery = await chain.invoke({
    chatHistory,
    userQuery,
  });
  console.log("Enhanced query:", enhancedQuery);

  const response = await agentExecutor.invoke({
    summary,
    chatHistory: chatHistory.map((message) => {
      return {
        content: message.content,
        type: message.type,
      };
    }),
    userQuery,
    enhancedQuery,
  });

  let allObservations: object[] = [];
  response.intermediateSteps.forEach((step: { observation: string }) => {
    let docs = JSON.parse(step.observation);
    docs.forEach((doc: any) => {
      allObservations.push(doc);
    });
  });

  return {
    response: response.output,
    references: allObservations,
  };
};

export const traceableChatWithQuestionAgent = (threadId: string) => {
  return traceable(
    async ({
      summary,
      chatHistory,
      userQuery,
    }: {
      summary: string | null;
      chatHistory: ChatMessage[];
      userQuery: string;
    }) => {
      return await chatWithQuestionAgent({
        summary,
        chatHistory,
        userQuery,
        threadId,
      });
    },
    {
      name: "chatWithQuestionAgent",
      metadata: {
        thread_id: threadId,
      },
    }
  );
};
