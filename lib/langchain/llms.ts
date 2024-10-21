import { ChatOpenAI } from "@langchain/openai";

export const mainModel = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});
export const smallModel = new ChatOpenAI({
  model: "gpt-4o-mini",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});
