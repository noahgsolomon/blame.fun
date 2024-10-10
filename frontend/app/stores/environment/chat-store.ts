import { create } from "zustand";

export interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    image: string;
  };
  timestamp: string;
  type?: "message" | "user_joined" | "user_left";
}

interface ChatState {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  sendMessage: (message: string, subscription: any) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  setMessages: (newMessages: Message[]) => set({ messages: newMessages }),
  sendMessage: (message: string, subscription: any) => {
    subscription.send({ content: message });
  },
}));
