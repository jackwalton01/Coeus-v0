import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:whitespace-nowrap tw:rounded-md tw:text-sm tw:font-medium tw:transition-colors tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "tw:bg-[#7FDBFF]! tw:text-primary-foreground tw:shadow tw:hover:bg-[#7FDBFF]/90",
        destructive:
          "tw:bg-destructive tw:text-destructive-foreground tw:shadow-sm tw:hover:bg-destructive/90",
        outline:
          "tw:border tw:border-input tw:bg-background tw:shadow-sm tw:hover:bg-accent tw:hover:text-accent-foreground",
        secondary:
          "tw:bg-secondary tw:text-secondary-foreground tw:shadow-sm hover:bg-secondary/80",
        ghost: "tw:hover:bg-accent! tw:hover:text-accent-foreground!",
        link: "tw:text-primary tw:underline-offset-4 tw:hover:underline",
      },
      size: {
        default: "tw:h-9 tw:px-4 tw:py-2",
        sm: "tw:h-8 tw:rounded-md tw:px-3 tw:text-xs",
        lg: "tw:h-10 tw:rounded-md tw:px-8",
        icon: "tw:h-9! tw:w-9!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
