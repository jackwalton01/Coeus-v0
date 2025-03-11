import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { initialChatMessage } from "@/data/initialChatMessage.data";
import { MemoizedMarkdownMessage } from "./MemoizedMarkdownMessage";
import { CONFIG } from "@/config";

export function WelcomeMessage() {
  return (
    <ChatBubble variant="received">
      <ChatBubbleAvatar fallback="MIC" src={`${CONFIG.CdnUrl}/mic-logo.png`} />
      <ChatBubbleMessage className="tw:bg-[#95C13D]/80" variant="received">
        <MemoizedMarkdownMessage content={initialChatMessage} id='' />
      </ChatBubbleMessage>
    </ChatBubble>
  );
}
