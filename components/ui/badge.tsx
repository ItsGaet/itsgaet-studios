import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-[10px] font-black tracking-[0.15em] uppercase w-fit whitespace-nowrap shrink-0 transition-all duration-300 [&>svg]:size-3 gap-1.5 focus-visible:ring-2 focus-visible:ring-[#b62d34]/25",
  {
    variants: {
      variant: {
        default:
          "border-[#b62d34]/20 bg-[#b62d34]/8 text-[#9f2028] shadow-[0_0_10px_rgba(182,45,52,0.08)] hover:border-[#b62d34]/35 hover:bg-[#b62d34]/12",
        secondary:
          "border-[#d8c6bb] bg-[#fffaf6]/90 text-[#5a4945] shadow-[0_0_10px_rgba(82,56,49,0.05)] hover:border-[#c7b4a7] hover:bg-[#fff5ef]",
        destructive:
          "border-red-500/30 bg-red-500/10 text-red-400",
        outline:
          "border-[#d8c6bb] bg-transparent text-[#6d5c57] hover:border-[#b62d34]/25 hover:text-[#1f1715] hover:bg-[#fff5ef]",
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
