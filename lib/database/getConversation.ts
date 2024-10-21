import { db } from "@/lib/database/db";
import { ChatHistory } from "@/types/chat";

export async function getConversation(id: string): Promise<ChatHistory> {
  const conversation = await db.sharedConversation.findUnique({
    where: {
      id,
    },
    select: {
      conversation: true,
    },
  });
  if (conversation && typeof conversation.conversation === "string") {
    return JSON.parse(conversation.conversation);
  }
  throw new Error("Conversation not found or invalid format");
}
