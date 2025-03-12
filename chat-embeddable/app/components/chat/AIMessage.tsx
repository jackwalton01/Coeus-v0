import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { Message } from "ai";
import { AIMessageTool } from "./AIMessageTool";
import { MemoizedMarkdownMessage } from "./MemoizedMarkdownMessage";
import { CONFIG } from "@/config";

export function AIMessage({ message, isLoading }: { message?: Message; isLoading?: boolean }) {
  if (!message) {
    <ChatBubble variant="received">
      <ChatBubbleAvatar fallback="AI" />
      <ChatBubbleMessage className="tw:bg-[#7FDBFF]/80" isLoading={isLoading} variant="received" />
    </ChatBubble>;
  }

  if (!message?.content && message?.toolInvocations?.length) {
    return <AIMessageTool message={message} />;
  }

  return (
    <ChatBubble variant="received">
      <ChatBubbleAvatar fallback="AI" />
      <ChatBubbleMessage className="tw:bg-[#7FDBFF]/80" isLoading={isLoading} variant="received">
        {message && <MemoizedMarkdownMessage content={message?.content} id={message.id} />}
        <AIMessageTool message={message!} />
      </ChatBubbleMessage>
    </ChatBubble>
  );
}
