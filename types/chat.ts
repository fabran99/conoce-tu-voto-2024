export interface ChatReference {
  source: string;
  page: number;
  howToCite: string;
  pageContent: string;
}

export type MessageType = "human" | "ai";

export interface ChatMessage {
  date: string;
  type: MessageType;
  content: string;
  references: ChatReference[];
}

export type ChatHistoryType = "comparison" | "conversation";

export interface ChatHistory {
  type: ChatHistoryType;
  id: string;
  summary: string | null;
  messages: ChatMessage[];
}
