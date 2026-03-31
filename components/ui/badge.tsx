import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-[10px] font-black tracking-[0.15em] uppercase w-fit whitespace-nowrap shrink-0 transition-all duration-300 [&>svg]:size-3 gap-1.5 focus-visible:ring-1 focus-visible:ring-amber-300/50",
  {
    variants: {
      variant: {
        default:
          "border-amber-300/30 bg-amber-300/10 text-amber-200 shadow-[0_0_10px_rgba(251,191,36,0.08)] hover:border-amber-300/50 hover:bg-amber-300/20",
        secondary:
          "border-white/12 bg-white/[0.03] text-white/72 shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:border-white/20 hover:bg-white/[0.06]",
        destructive:
          "border-red-500/30 bg-red-500/10 text-red-400",
        outline:
          "border-white/12 bg-white/[0.03] text-white/58 hover:border-white/20 hover:text-white hover:bg-white/[0.06]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
