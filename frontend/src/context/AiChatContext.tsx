// context/AiChatContext.tsx
import { createContext, useContext, useState } from "react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface AiChatContextType {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const AiChatContext = createContext<AiChatContextType | null>(null);

export const AiChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <AiChatContext.Provider value={{ messages, setMessages }}>
      {children}
    </AiChatContext.Provider>
  );
};

export const useAiChat = () => {
  const context = useContext(AiChatContext);
  if (!context) throw new Error("useAiChat must be used within AiChatProvider");
  return context;
};
