import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover shadow-elegant hover:shadow-hover",
        whatsapp: "bg-whatsapp text-white hover:bg-whatsapp-dark shadow-elegant hover:shadow-hover",
        learning: "bg-learning text-white hover:bg-learning-dark shadow-elegant hover:shadow-hover",
        success: "bg-success text-white hover:bg-success/90 shadow-elegant",
        streak: "bg-streak text-white hover:bg-streak/90 shadow-elegant",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-elegant",
        outline: "border border-input bg-card hover:bg-card-hover hover:text-accent-foreground shadow-card hover:shadow-elegant",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-card",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-primary text-white hover:scale-105 shadow-elegant hover:shadow-hover",
        "gradient-success": "bg-gradient-success text-white hover:scale-105 shadow-elegant hover:shadow-hover",
        "gradient-streak": "bg-gradient-streak text-white hover:scale-105 shadow-elegant hover:shadow-hover",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-13 rounded-lg px-8 text-base",
        icon: "h-11 w-11",
        xs: "h-8 px-2 text-xs rounded-md",
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
