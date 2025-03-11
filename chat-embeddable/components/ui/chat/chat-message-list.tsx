import * as React from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAutoScroll } from "@/components/ui/chat/hooks/useAutoScroll";

interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  smooth?: boolean;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({
  className,
  children,
  smooth = false,
  ...props
}) => {
  const { scrollRef, isAtBottom, scrollToBottom, disableAutoScroll } = useAutoScroll({
    smooth,
    content: children,
  });

  return (
    <div className="tw:relative tw:w-full tw:h-full">
      <div
        className={`tw:flex tw:flex-col tw:w-full tw:h-full tw:p-4 tw:overflow-y-auto ${className}`}
        ref={scrollRef}
        onWheel={disableAutoScroll}
        onTouchMove={disableAutoScroll}
        {...props}
      >
        <div className="tw:flex tw:flex-col tw:gap-6">{children}</div>
      </div>

      {!isAtBottom && (
        <Button
          onClick={() => {
            scrollToBottom();
          }}
          size="icon"
          variant="outline"
          className="tw:absolute tw:bottom-2 tw:left-1/2 tw:transform tw:-translate-x-1/2 tw:inline-flex tw:rounded-full tw:shadow-md"
          aria-label="Scroll to bottom"
        >
          <ArrowDown className="tw:h-4 tw:w-4" />
        </Button>
      )}
    </div>
  );
};

ChatMessageList.displayName = "ChatMessageList";

export { ChatMessageList };
