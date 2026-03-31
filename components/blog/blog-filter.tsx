"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Filter, X } from "lucide-react";

import { cn } from "@/lib/utils";

type BlogFilterProps = {
  tags: string[];
  tagCounts: Record<string, number>;
  activeTags: string[];
  onToggleTag: (tag: string) => void;
  onClear: () => void;
};

export default function BlogFilter({
  tags,
  tagCounts,
  activeTags,
  onToggleTag,
  onClear,
}: BlogFilterProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hasActiveTags = activeTags.length > 0;

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuOpen]);

  return (
    <div className="relative w-full sm:w-auto" ref={menuRef}>
      <button
        type="button"
        onClick={() => setMenuOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-center justify-center gap-3 rounded-full border px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 sm:w-auto",
          menuOpen || hasActiveTags
            ? "border-[#b62d34]/30 bg-[#b62d34]/8 text-[#9f2028] shadow-[0_0_20px_rgba(182,45,52,0.12)]"
            : "border-[#d8c6bb] bg-[#fffaf6]/80 text-[#6c5954] hover:border-[#cdbbb1] hover:bg-[#fff5ef]"
        )}
        aria-expanded={menuOpen}
        aria-haspopup="dialog"
      >
        <Filter className={cn("size-3.5", hasActiveTags && "fill-[#9f2028]")} />
        Filter topics
        {hasActiveTags && (
          <span className="ml-1 rounded-full bg-[#b62d34] px-2 py-0.5 text-[10px] text-[#fff9f4]">
            {activeTags.length}
          </span>
        )}
      </button>

      {menuOpen && (
        <div className="absolute left-0 right-0 z-50 mt-4 origin-top rounded-[2rem] border border-[#d8c6bb] bg-[#fffaf6]/96 p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 sm:left-auto sm:right-0 sm:w-80">
          <div className="mb-4 flex items-center justify-between px-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8f5552]">
              Select topics
            </span>
            <div className="flex items-center gap-2">
              {hasActiveTags && (
                <button
                  type="button"
                  onClick={onClear}
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter text-[#9f2028] hover:text-[#b62d34]"
                >
                  <X className="size-3" /> Reset
                </button>
              )}
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex size-7 items-center justify-center rounded-full border border-[#d8c6bb] text-[#6c5954] transition-colors hover:bg-[#f4e7de] hover:text-[#1f1715]"
                aria-label="Close filter menu"
              >
                <X className="size-3.5" />
              </button>
            </div>
          </div>

          <div className="grid max-h-[60svh] gap-1.5 overflow-y-auto pr-1">
            {tags.map((tag) => {
              const isActive = activeTags.includes(tag);

              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onToggleTag(tag)}
                  className={cn(
                    "group flex items-center justify-between rounded-2xl px-4 py-3 text-sm transition-all duration-200",
                    isActive
                      ? "bg-[#b62d34]/8 text-[#9f2028] ring-1 ring-inset ring-[#b62d34]/20"
                      : "text-[#5f4c47] hover:bg-[#f4e7de] hover:text-[#1f1715]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex size-5 items-center justify-center rounded-lg border transition-all",
                        isActive
                          ? "border-[#b62d34] bg-[#b62d34]"
                          : "border-[#d8c6bb] group-hover:border-[#cdbbb1]"
                      )}
                    >
                      {isActive && (
                        <Check className="size-3 stroke-[4px] text-[#fff9f4]" />
                      )}
                    </div>
                    <span className={cn("font-medium", isActive && "font-bold")}>
                      {tag}
                    </span>
                  </div>
                  <span
                    className={cn(
                      "text-[10px] font-bold opacity-40",
                      isActive && "opacity-100"
                    )}
                  >
                    {tagCounts[tag] ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
