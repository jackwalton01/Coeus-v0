"use client";
import { Message } from "ai";
import { useRef, useEffect, useState } from "react";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { WelcomeMessage } from "./WelcomeMessage";
import { UserMessage } from "./UserMessage";
import { AIMessage } from "./AIMessage";

export function ChatArea({ messages, isLoading }: { messages: Message[]; isLoading: boolean }) {
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const [loadingNextMessage, setLoadingNextMessage] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setLoadingNextMessage(true);
    }
  }, [isLoading]);

  const previousLoadingNextMessageValue = loadingNextMessage;

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollIntoView(false);
    }

    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage?.role === "assistant" &&
      previousLoadingNextMessageValue &&
      lastMessage.content
    ) {
      setLoadingNextMessage(false);
    }
  }, [messages, previousLoadingNextMessageValue]);

  return (
    <div ref={chatHistoryRef} className="tw:h-full tw:space-y-4">
      <ChatMessageList>
        <WelcomeMessage />
        {messages.map((message) =>
          message.role === "user" ? (
            <UserMessage key={message.id} content={message.content} />
          ) : (
            <AIMessage key={message.id} message={message} />
          )
        )}

        {loadingNextMessage && <AIMessage isLoading />}
      </ChatMessageList>
    </div>
  );
}
