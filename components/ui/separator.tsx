"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  variant = "solid",
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root> & {
  variant?: "solid" | "thick" | "cherry" | "dashed"
}) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 transition-colors duration-300",
        
        // --- ORIZZONTALE ---
        orientation === "horizontal" && [
          "w-full",
          // Solid: Linea sottile e rigorosa in Ink
          variant === "solid" && "h-[1px] bg-[#1A1A1A]/10",
          // Thick: Doppia linea o linea marcata per separare grandi sezioni
          variant === "thick" && "h-[2px] bg-[#1A1A1A]",
          // Cherry: Una linea sottile ma vibrante nel colore del brand
          variant === "cherry" && "h-[1px] bg-[#D2042D]/40",
          // Dashed: Effetto "ritaglio" tipico dei documenti tecnici
          variant === "dashed" && "h-[1px] border-t border-dashed border-[#1A1A1A]/30 bg-transparent"
        ],

        // --- VERTICALE ---
        orientation === "vertical" && [
          "h-full",
          variant === "solid" && "w-[1px] bg-[#1A1A1A]/10",
          variant === "thick" && "w-[2px] bg-[#1A1A1A]",
          variant === "cherry" && "w-[1px] bg-[#D2042D]/40",
          variant === "dashed" && "w-[1px] border-l border-dashed border-[#1A1A1A]/30 bg-transparent"
        ],

        className
      )}
      {...props}
    />
  )
}

export { Separator }