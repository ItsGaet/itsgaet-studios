import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 shrink-0 outline-none focus-visible:ring-1 focus-visible:ring-amber-300/50",
  {
    variants: {
      variant: {
        default:
          "bg-amber-300 text-slate-950 shadow-[0_18px_40px_-20px_rgba(251,191,36,0.7)] hover:bg-amber-200 hover:shadow-[0_22px_45px_-22px_rgba(251,191,36,0.8)] hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white shadow-[0_0_15px_rgba(239,68,68,0.1)]",
        outline:
          "border border-white/12 bg-white/[0.03] backdrop-blur-sm text-white hover:border-amber-200/30 hover:bg-white/[0.06] hover:text-white",
        secondary:
          "bg-white text-slate-950 shadow-[0_18px_40px_-24px_rgba(255,255,255,0.8)] hover:bg-white/90 hover:scale-[1.02]",
        ghost:
          "bg-transparent text-white/58 hover:text-white hover:bg-white/5",
        link:
          "text-amber-200 underline-offset-4 hover:underline",
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
