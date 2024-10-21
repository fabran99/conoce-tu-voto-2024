"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import HumanMessage from "./HumanMessage";
import AIMessage from "./AIMessage";
import { ChatHistory, ChatMessage, ChatReference } from "@/types/chat";
import { v4 as uuidv4 } from "uuid";
import chatWithQuestionAgentAction from "@/app/actions/chatWithQuestionAgent";

const DEFAULT_INITIAL_MESSAGE = `👋 **¡Bienvenido!**\n\n Aquí puedes consultar fácilmente las propuestas de los partidos políticos para las próximas elecciones en Uruguay. Haz preguntas específicas o compara las propuestas entre diferentes partidos.\n\n---\n\n\n**¿Qué puedes hacer?**\n\n- 🔎 **Consultar sobre temas que te interesan**\n  - Ejemplo: _"¿Qué propone el Partido X en educación?"_\n- ⚖️ **Comparar propuestas entre partidos**\n  - Ejemplo: _"¿Cómo difieren las propuestas de los partidos sobre economía?"_\n- 📚 **Explorar temas clave**\n  - Economía, Educación, Salud, Seguridad, Empleo, Medio Ambiente, Vivienda, Infraestructura, Justicia, Política Exterior\n\n---\n\n`;

export default function ChatSection() {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory>({
    type: "conversation",
    id: uuidv4().toString(),
    summary: "",
    messages: [
      {
        date: new Date().toISOString(),
        type: "ai",
        content: DEFAULT_INITIAL_MESSAGE,
        references: [],
      },
    ],
  });
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory.messages]);

  const [isLoading, setIsLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");

  const sendMessageAction = async () => {
    if (!userMessage || userMessage.trim() === "" || isLoading) {
      return;
    }

    // Add the message to the chat history
    const newHumanMessage: ChatMessage = {
      date: new Date().toISOString(),
      type: "human",
      content: userMessage,
      references: [],
    };
    setChatHistory((prevChatHistory) => ({
      ...prevChatHistory,
      messages: [...prevChatHistory.messages, newHumanMessage],
    }));
    setUserMessage("");
    setIsLoading(true);

    chatWithQuestionAgentAction({
      threadId: chatHistory.id,
      chatHistory: chatHistory.messages,
      userQuery: userMessage,
      summary: chatHistory.summary?.toString() || "",
    }).then((response) => {
      // Add the response to the chat history
      const newAIMessage: ChatMessage = {
        date: new Date().toISOString(),
        type: "ai",
        content: response.response || "No se encontró respuesta",
        references: (response.references as ChatReference[]) || [],
      };
      setChatHistory((prevChatHistory) => ({
        ...prevChatHistory,
        messages: [...prevChatHistory.messages, newAIMessage],
        summary: response.summary || prevChatHistory.summary,
      }));

      setIsLoading(false);
    });
  };

  return (
    <section className="max-w-4xl mx-auto z-20 relative my-6">
      <div className=" rounded-lg shadow-xl">
        <div className="p-6 overflow-y-auto bg-white max-h-[85vh] min-h-[50vh]">
          <div className="space-y-4">
            {chatHistory.messages.map((message, index) => {
              const isLastMessage =
                index == chatHistory.messages.length - 1 && !isLoading;
              if (message.type === "human") {
                return (
                  <div ref={isLastMessage ? lastMessageRef : null} key={index}>
                    <HumanMessage message={message.content} />
                  </div>
                );
              } else {
                return (
                  <div ref={isLastMessage ? lastMessageRef : null}>
                    <AIMessage
                      chatReferences={message.references}
                      key={index}
                      message={message.content}
                      isLoading={false}
                    />
                  </div>
                );
              }
            })}
            {isLoading && (
              <div ref={lastMessageRef}>
                <AIMessage
                  chatReferences={[]}
                  message={"Generando respuesta..."}
                  isLoading={true}
                />
              </div>
            )}
          </div>
        </div>
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <form
            className="flex items-center space-x-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessageAction();
            }}
          >
            <Input
              type="text"
              name="message"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Escribe tu pregunta aquí..."
              className="flex-grow"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
