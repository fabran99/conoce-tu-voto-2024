"use server";
import { traceableChatWithQuestionAgent } from "@/lib/langchain/agents";
import { ChatHistory, ChatReference, ChatMessage } from "@/types/chat";

interface ChatWithQuestionAgentData {
  threadId: string;
  summary: string;
  chatHistory: ChatMessage[];
  userQuery: string;
}

interface ChatWithQuestionAgentResult {
  response?: string;
  references?: object[];
  error?: string;
  summary?: string;
}

async function chatWithQuestionAgentAction(
  data: ChatWithQuestionAgentData
): Promise<ChatWithQuestionAgentResult> {
  const { threadId, chatHistory, userQuery, summary } = data;
  console.log(data);
  return await traceableChatWithQuestionAgent(threadId)({
    summary,
    chatHistory,
    userQuery,
  });
}

export default chatWithQuestionAgentAction;
