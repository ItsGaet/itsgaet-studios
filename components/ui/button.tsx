import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#b62d34]/25",
  {
    variants: {
      variant: {
        default:
          "bg-[#b62d34] text-[#fff9f4] shadow-[0_18px_40px_-24px_rgba(182,45,52,0.45)] hover:bg-[#a3252d] hover:shadow-[0_22px_45px_-24px_rgba(182,45,52,0.52)] hover:scale-[1.01] active:scale-[0.98]",
        destructive:
          "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.1)]",
        outline:
          "border border-[#d8c6bb] bg-[#fffaf6]/85 text-[#2b201d] hover:border-[#b62d34]/30 hover:bg-[#fff5ef]",
        secondary:
          "bg-[#2b201d] text-[#fff9f4] shadow-[0_18px_40px_-24px_rgba(31,23,21,0.34)] hover:bg-[#1f1715] hover:scale-[1.01]",
        ghost:
          "bg-transparent text-[#6d5c57] hover:text-[#1f1715] hover:bg-[#f2e7de]/80",
        link:
          "text-[#b62d34] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 rounded-xl px-4 text-[9px]",
        lg: "h-14 rounded-[1.25rem] px-10 text-xs gap-3",
        icon: "size-11 rounded-xl",
        "icon-sm": "size-9 rounded-lg",
        "icon-lg": "size-14 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
