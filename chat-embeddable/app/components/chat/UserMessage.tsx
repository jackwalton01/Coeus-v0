import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { MemoizedMarkdownMessage } from "./MemoizedMarkdownMessage";

export function UserMessage({ content }: { content: string }) {
  return (
    <ChatBubble variant="sent">
      <ChatBubbleAvatar fallback="You" />
      <ChatBubbleMessage variant="sent" className="tw:bg-[#95C13D]/80">
        <MemoizedMarkdownMessage content={content} id='' />
      </ChatBubbleMessage>
    </ChatBubble>
  );
}
