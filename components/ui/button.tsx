import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border-2 text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#D2042D]/40",
  {
    variants: {
      variant: {
        // Massiccio Cherry: Il colore primario del brand
        default:
          "bg-[#D2042D] border-[#D2042D] text-[#FBF7F2] hover:bg-[#1A1A1A] hover:border-[#1A1A1A]",
        
        // Massiccio Ink: Per azioni secondarie ma forti
        secondary:
          "bg-[#1A1A1A] border-[#1A1A1A] text-[#FBF7F2] hover:bg-[#D2042D] hover:border-[#D2042D]",
        
        // Outline: Sottile ma rigoroso, perfetto per i ghost button
        outline:
          "bg-transparent border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FBF7F2]",
        
        // Ghost: Nessun bordo, solo testo e hover solido
        ghost:
          "bg-transparent border-transparent text-[#1A1A1A] hover:bg-[#D8C6BB]/20",
        
        // Destructive: Rosso su bianco per avvisi chiari
        destructive:
          "bg-transparent border-[#D2042D] text-[#D2042D] hover:bg-[#D2042D] hover:text-[#FBF7F2]",

        link:
          "bg-transparent border-transparent text-[#D2042D] underline-offset-8 decoration-2 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-12 px-8",
        sm: "h-10 px-5 text-[9px]",
        lg: "h-16 px-12 text-xs gap-4",
        icon: "size-12",
        "icon-sm": "size-10",
        "icon-lg": "size-16",
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
      className={cn(buttonVariants({ variant, size, className }), "rounded-none")}
      {...props}
    />
  )
}

export { Button, buttonVariants }