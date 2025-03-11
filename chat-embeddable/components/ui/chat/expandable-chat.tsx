"use client";

import React, { useRef, useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export type ChatPosition = "bottom-right" | "bottom-left";
export type ChatSize = "sm" | "md" | "lg" | "xl" | "full";

const chatConfig = {
  dimensions: {
    sm: "tw:sm:max-w-sm tw:sm:max-h-[500px]",
    md: "tw:sm:max-w-md tw:sm:max-h-[600px]",
    lg: "tw:sm:max-w-lg tw:sm:max-h-[700px]",
    xl: "tw:sm:max-w-xl tw:sm:max-h-[800px]",
    full: "tw:sm:w-[99vw] tw:sm:h-[93vh] tw:border-none",  
  },
  positions: {
    "bottom-right": "tw:bottom-5 tw:right-5",
    "bottom-left": "tw:bottom-5 tw:left-5",
  },
  chatPositions: {
    "bottom-right": "tw:sm:bottom-[calc(100%+10px)] tw:sm:right-0",
    "bottom-left": "tw:sm:bottom-[calc(100%+10px)] tw:sm:left-0",
  },
  states: {
    open: "tw:pointer-events-auto tw:opacity-100 tw:visible tw:scale-100 tw:translate-y-0",
    closed:
      "tw:pointer-events-none tw:opacity-0 tw:invisible tw:scale-100 tw:sm:translate-y-5",
  },
};

interface ExpandableChatProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: ChatPosition;
  size?: ChatSize;
  icon?: React.ReactNode;
}

const ExpandableChat: React.FC<ExpandableChatProps> = ({
  className,
  position = "bottom-right",
  size = "md",
  icon,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div
      className={cn(`tw:fixed ${chatConfig.positions[position]} tw:z-50`, className)}
      {...props}
    >
      <div
        ref={chatRef}
        className={cn(
          "tw:p tw:flex tw:flex-col tw:tw:bg-white tw:border tw:sm:rounded-lg tw:shadow-md tw:overflow-hidden tw:transition-all tw:duration-250 tw:ease-out tw:sm:absolute tw:sm:w-[90vw] tw:sm:h-[80vh] tw:fixed tw:inset-0 tw:w-full tw:h-full tw:sm:inset-auto",
          chatConfig.chatPositions[position],
          chatConfig.dimensions[size],
          isOpen ? chatConfig.states.open : chatConfig.states.closed,
          className,
        )}
      >
        {children}
        <Button
          variant="ghost"
          size="icon"
          className="tw:absolute tw:top-2 tw:right-2 tw:sm:hidden"
          onClick={toggleChat}
        >
          <X className="tw:h-4! tw:w-4! tw:bg-transparent!" size={24} />
        </Button>
      </div>
      <ExpandableChatToggle
        icon={icon}
        isOpen={isOpen}
        toggleChat={toggleChat}
      />
    </div>
  );
};

ExpandableChat.displayName = "ExpandableChat";

const ExpandableChatHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn("tw:flex tw:items-center tw:justify-between tw:p-4 tw:border-b", className)}
    {...props}
  />
);

ExpandableChatHeader.displayName = "ExpandableChatHeader";

const ExpandableChatBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("tw:flex-grow tw:overflow-y-auto", className)} {...props} />;

ExpandableChatBody.displayName = "ExpandableChatBody";

const ExpandableChatFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("tw:border-t tw:p-4", className)} {...props} />;

ExpandableChatFooter.displayName = "ExpandableChatFooter";

interface ExpandableChatToggleProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  isOpen: boolean;
  toggleChat: () => void;
}

const ExpandableChatToggle: React.FC<ExpandableChatToggleProps> = ({
  className,
  icon,
  isOpen,
  toggleChat,
  ...props
}) => (
  <Button
    variant="default"
    onClick={toggleChat}
    className={cn(
      "tw:w-14 tw:h-14 tw:rounded-full! tw:shadow-md tw:flex tw:items-center tw:justify-center tw:hover:shadow-lg tw:hover:shadow-black/30 tw:transition-all tw:duration-300",
      className,
    )}
    {...props}
  >
    {isOpen ? (
      <X className="tw:h-6 tw:w-6" />
    ) : (
      icon || <MessageCircle className="tw:h-6 tw:w-6" />
    )}
  </Button>
);

ExpandableChatToggle.displayName = "ExpandableChatToggle";

export {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
};
