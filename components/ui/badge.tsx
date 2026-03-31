import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center border-2 px-3 py-1 text-[10px] font-black tracking-[0.25em] uppercase w-fit whitespace-nowrap shrink-0 transition-all duration-200 [&>svg]:size-3 gap-2 focus-visible:ring-2 focus-visible:ring-[#D2042D]/50 outline-none",
  {
    variants: {
      variant: {
        // Stile Cherry: Fondo rosso solido, testo Cotton
        default:
          "border-[#D2042D] bg-[#D2042D] text-[#FBF7F2] hover:bg-[#1A1A1A] hover:border-[#1A1A1A]",
        
        // Stile Ink: Fondo nero solido, testo Cotton
        secondary:
          "border-[#1A1A1A] bg-[#1A1A1A] text-[#FBF7F2] hover:bg-[#D2042D] hover:border-[#D2042D]",
        
        // Stile Alert: Per stati critici, mantenendo il rigore
        destructive:
          "border-[#D2042D] bg-transparent text-[#D2042D] hover:bg-[#D2042D] hover:text-[#FBF7F2]",
        
        // Stile Outline: Solo bordo, perfetto per i tag dei post
        outline:
          "border-[#1A1A1A] bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FBF7F2]",
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