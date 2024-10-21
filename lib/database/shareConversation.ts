import { db } from "./db";
import { ChatHistory } from "@/types/chat";

export async function shareConversation(
  conversation: ChatHistory
): Promise<string> {
  const conversationId = await db.sharedConversation.create({
    data: {
      conversation: JSON.stringify(conversation),
    },
    select: {
      id: true,
    },
  });
  return conversationId.id;
}
