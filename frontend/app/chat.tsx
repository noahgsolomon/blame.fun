"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { createConsumer } from "@rails/actioncable";
import { Message, useChatStore } from "./stores/environment/chat-store";
import { useEnvironmentStore } from "./stores/environment/environment-store";
import { useUserStore } from "./stores/user-store";
import {
  ExpandableChat,
  ExpandableChatBody,
  ExpandableChatHeader,
  ExpandableChatFooter,
} from "@/components/ui/chat/expandable-chat";
import { ChatInput } from "@/components/ui/chat/chat-input";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "frosted-ui";
import { AnimatePresence, motion } from "framer-motion";

export default function Chat({ environmentId }: { environmentId: string }) {
  const { environments } = useEnvironmentStore();
  const environment = environments?.find(
    (e) => e.id.toString() === environmentId
  );
  const { user } = useUserStore();
  const { messages, setMessages } = useChatStore();
  const [inputMessage, setInputMessage] = useState("");
  const subscriptionRef = useRef<any>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    const setupWebSocket = async () => {
      try {
        const response = await fetch("http://localhost:3000/websocket_auth", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const { token } = data;

        const consumer = createConsumer(
          `ws://localhost:3000/cable?token=${token}`
        );

        const subscription = consumer.subscriptions.create(
          {
            channel: "ChatChannel",
            environmentId,
          },
          {
            connected: () => {
              console.log("Connected to ChatChannel");
            },
            received: (data: any) => {
              console.log("Received data:", data);
              if (
                data.action === "user_joined" ||
                data.action === "user_left"
              ) {
                const newMessage: Message = {
                  id: Date.now().toString(),
                  content: `${data.user?.name || "A user"} has ${
                    data.action === "user_joined" ? "joined" : "left"
                  } the chat`,
                  sender: {
                    id: data.user?.id,
                    name: data.user?.name,
                    image: data.user?.image,
                  },
                  timestamp: new Date().toLocaleTimeString(),
                  type: data.action,
                };
                setMessages((prevMessages) => [...prevMessages, newMessage]);
              } else if (data.message) {
                setMessages((prevMessages) => [...prevMessages, data.message]);
              }
            },
            disconnected: () => {
              console.log("Disconnected from ChatChannel");
            },
          }
        );

        subscriptionRef.current = subscription;
      } catch (error) {
        console.error("Failed to set up WebSocket:", error);
      }
    };

    setupWebSocket();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [environmentId, setMessages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() && subscriptionRef.current) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputMessage,
        sender: {
          id: user?.id || "",
          name: user?.name || "",
          image: user?.image || "",
        },
        timestamp: new Date().toLocaleTimeString(),
        type: "message",
      };

      subscriptionRef.current.send({ content: newMessage });
      setInputMessage("");
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <ExpandableChat
      icon={<MessageCircle className="h-6 w-6" />}
      size="lg"
      position="bottom-right"
    >
      <ExpandableChatBody>
        <ExpandableChatHeader className="text-lg font-bold">
          {environment ? environment.name : "Loading..."}
        </ExpandableChatHeader>
        <ChatMessageList
          ref={messagesContainerRef}
          className="dark:bg-muted/40"
        >
          <AnimatePresence>
            {messages
              ?.filter(
                (message) =>
                  message.type === "message" ||
                  message.sender.id.toString() !== user?.id
              )
              .map((message, index) => {
                return (
                  <motion.div
                    key={index}
                    layout
                    initial={{ opacity: 0, scale: 1, y: 10, x: 0 }}
                    animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                    exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                    transition={{
                      opacity: { duration: 0.1 },
                      layout: {
                        type: "spring",
                        bounce: 0.3,
                        duration: index * 0.05 + 0.2,
                      },
                    }}
                    style={{ originX: 0.5, originY: 0.5 }}
                    className="flex flex-col"
                  >
                    <ChatBubble
                      key={message.id}
                      variant={
                        message.sender.id.toString() === user?.id
                          ? "sent"
                          : "received"
                      }
                    >
                      <ChatBubbleAvatar
                        src={
                          message.type === "message"
                            ? message.sender.id.toString() === user?.id
                              ? user?.image!
                              : message.sender?.image!
                            : ""
                        }
                        fallback={"🤖"}
                      />
                      <div>
                        {message.sender.name !== user?.name && (
                          <p className="ml-2 text-xs text-primary/60">
                            {message.sender.name}
                          </p>
                        )}
                        <ChatBubbleMessage
                          variant={
                            message.type !== "message"
                              ? "received"
                              : message.sender.id.toString() === user?.id
                              ? "sent"
                              : "received"
                          }
                        >
                          {message.content}
                        </ChatBubbleMessage>
                      </div>
                    </ChatBubble>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </ChatMessageList>
      </ExpandableChatBody>
      <ExpandableChatFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex relative gap-2"
        >
          <ChatInput
            onKeyDown={onKeyDown}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <Button
            variant="soft"
            disabled={!inputMessage.trim()}
            style={{ cursor: "pointer" }}
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 shrink-0"
          >
            <Send className="size-4" />
          </Button>
        </form>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
}
