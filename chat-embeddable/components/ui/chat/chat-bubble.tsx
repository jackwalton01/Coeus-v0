import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import MessageLoading from "./message-loading";
import { Button, ButtonProps } from "../button";

// ChatBubble
const chatBubbleVariant = cva("tw:flex tw:gap-2 tw:items-end tw:relative group", {
  variants: {
    variant: {
      received: "tw:self-start",
      sent: "tw:self-end tw:flex-row-reverse",
    },
    layout: {
      default: "",
      ai: "tw:max-w-full tw:w-full tw:items-center",
    },
  },
  defaultVariants: {
    variant: "received",
    layout: "default",
  },
});

interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariant> {}

const ChatBubble = React.forwardRef<HTMLDivElement, ChatBubbleProps>(
  ({ className, variant, layout, children, ...props }, ref) => (
    <div
      className={cn(chatBubbleVariant({ variant, layout, className }), "tw:relative group")}
      ref={ref}
      {...props}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && typeof child.type !== "string"
          ? React.cloneElement(child, {
              variant,
              layout,
            } as React.ComponentProps<typeof child.type>)
          : child
      )}
    </div>
  )
);
ChatBubble.displayName = "ChatBubble";

// ChatBubbleAvatar
interface ChatBubbleAvatarProps {
  src?: string;
  fallback?: string;
  className?: string;
}

const ChatBubbleAvatar: React.FC<ChatBubbleAvatarProps> = ({ src, fallback, className }) => (
  <Avatar className={className}>
    <AvatarImage src={src} alt="Avatar" />
    <AvatarFallback className="tw:bg-[#7FDBFF]">{fallback}</AvatarFallback>
  </Avatar>
);

// ChatBubbleMessage
const chatBubbleMessageVariants = cva("tw:p-2 tw:sm:p-4", {
  variants: {
    variant: {
      received: "tw:bg-secondary tw:text-secondary-foreground tw:rounded-r-lg tw:rounded-tl-lg",
      sent: "tw:bg-primary tw:text-secondary-foreground tw:rounded-l-lg tw:rounded-tr-lg",
    },
    layout: {
      default: "",
      ai: "tw:border-t tw:w-full tw:rounded-none tw:bg-transparent",
    },
  },
  defaultVariants: {
    variant: "received",
    layout: "default",
  },
});

interface ChatBubbleMessageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleMessageVariants> {
  isLoading?: boolean;
}

const ChatBubbleMessage = React.forwardRef<HTMLDivElement, ChatBubbleMessageProps>(
  ({ className, variant, layout, isLoading = false, children, ...props }, ref) => (
    <div
      className={cn(
        chatBubbleMessageVariants({ variant, layout, className }),
        "tw:break-words tw:max-w-full"
      )}
      ref={ref}
      {...props}
    >
      {isLoading ? (
        <div className="tw:flex tw:items-center tw:space-x-2">
          <MessageLoading />
        </div>
      ) : (
        children
      )}
    </div>
  )
);
ChatBubbleMessage.displayName = "ChatBubbleMessage";

// ChatBubbleTimestamp
interface ChatBubbleTimestampProps extends React.HTMLAttributes<HTMLDivElement> {
  timestamp: string;
}

const ChatBubbleTimestamp: React.FC<ChatBubbleTimestampProps> = ({
  timestamp,
  className,
  ...props
}) => (
  <div className={cn("tw:text-xs tw:mt-2 tw:text-right", className)} {...props}>
    {timestamp}
  </div>
);

// ChatBubbleAction
type ChatBubbleActionProps = ButtonProps & {
  icon: React.ReactNode;
};

const ChatBubbleAction: React.FC<ChatBubbleActionProps> = ({
  icon,
  onClick,
  className,
  variant = "ghost",
  size = "icon",
  ...props
}) => (
  <Button variant={variant} size={size} className={className} onClick={onClick} {...props}>
    {icon}
  </Button>
);

interface ChatBubbleActionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "sent" | "received";
  className?: string;
}

const ChatBubbleActionWrapper = React.forwardRef<HTMLDivElement, ChatBubbleActionWrapperProps>(
  ({ variant, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "tw:absolute tw:top-1/2 tw:-translate-y-1/2 tw:flex tw:opacity-0 tw:group-hover:opacity-100 tw:transition-opacity tw:duration-200",
        variant === "sent"
          ? "tw:-left-1 tw:-translate-x-full tw:flex-row-reverse"
          : "tw:-right-1 tw:translate-x-full",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
ChatBubbleActionWrapper.displayName = "ChatBubbleActionWrapper";

export {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleTimestamp,
  chatBubbleVariant,
  chatBubbleMessageVariants,
  ChatBubbleAction,
  ChatBubbleActionWrapper,
};
