import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "tw:flex min-h-[60px] tw:w-full tw:rounded-md tw:border border-input tw:bg-transparent tw:px-3 tw:py-2 tw:text-base tw:shadow-sm placeholder:text-muted-foreground tw:focus-visible:outline-none tw:focus-visible:ring-1 focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
