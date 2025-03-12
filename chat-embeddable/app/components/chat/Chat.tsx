"use client";

import { useChat } from "ai/react";
import { ChatArea } from "./ChatArea";
import { ChatInputBox } from "./ChatInputBox";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";

const guardRailMessage: string = "I'm sorry, but I'm only able to help with questions related to the services and information" +
  "provided by the Money Information Centre. For more details, please visit Leeds City Council's Money Information Centre.\n" +
  "Can I assist you with any topics in that area";

const messageRemovedPlaceholder: string = "*This message may have violated a guard rail so has been removed to allow the conversation to continue.*"

export default function Chat({
  handleFeedback,
  chatUrl,
} : {
  handleFeedback: (event: React.MouseEvent<HTMLButtonElement>) => void,
  chatUrl: string,
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: chatUrl,
    maxSteps: 2,
    onFinish(message, options) {
      if(options.finishReason === "content-filter") {
        setMessages((prev) => {
          message.content = guardRailMessage;
          const userMessage = prev.at(-2);

          if(userMessage) {
            userMessage.content = messageRemovedPlaceholder;
            return [...prev.slice(0,-2), userMessage, message];
          } else {
            return [...prev.slice(0,-1), message];
          }
        });
      }
    },
  });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <>
      <div className="tw:flex-grow tw:overflow-hidden tw:p-2 tw:sm:p-4 tw:box-border tw:bg-white">
        <div ref={containerRef} className="tw:h-full tw:overflow-y-auto tw:box-border">
          <div className="tw:max-w-3xl tw:mx-auto tw:pt-2">
            <ChatArea messages={messages} isLoading={isLoading} />
          </div>
        </div>
      </div>

      <div className="tw:flex-shrink-0 tw:p-4 tw:bg-white">
        <div className="tw:max-w-3xl tw:mx-auto">
          <div className="tw:flex tw:flex-col tw:gap-4">
            {isLoading && (
              <Badge className="tw:w-fit tw:bg-[#7FDBFF]/80 tw:text-black">Loading Response...</Badge>
            )}

            <ChatInputBox
              handleSubmit={handleSubmit}
              input={input}
              handleInputChange={handleInputChange}
              handleFeedback={handleFeedback}
            />
          </div>
        </div>
      </div>
    </>
  );
}
