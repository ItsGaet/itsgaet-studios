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
            ? "border-fuchsia-500/50 bg-fuchsia-500/10 text-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.15)]"
            : "border-border/40 bg-card/40 text-muted-foreground hover:border-border/80 hover:bg-card/60"
        )}
        aria-expanded={menuOpen}
        aria-haspopup="dialog"
      >
        <Filter className={cn("size-3.5", hasActiveTags && "fill-fuchsia-500")} />
        Filter topics
        {hasActiveTags && (
          <span className="ml-1 rounded-full bg-fuchsia-500 px-2 py-0.5 text-[10px] text-white">
            {activeTags.length}
          </span>
        )}
      </button>

      {menuOpen && (
        <div className="absolute left-0 right-0 z-50 mt-4 origin-top rounded-[2rem] border border-border/40 bg-background/90 p-4 shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200 sm:left-auto sm:right-0 sm:w-80">
          <div className="mb-4 flex items-center justify-between px-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
              Select topics
            </span>
            <div className="flex items-center gap-2">
              {hasActiveTags && (
                <button
                  type="button"
                  onClick={onClear}
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-tighter text-fuchsia-500 hover:text-fuchsia-400"
                >
                  <X className="size-3" /> Reset
                </button>
              )}
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex size-7 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-colors hover:text-foreground"
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
                      ? "bg-fuchsia-500/10 text-fuchsia-500 ring-1 ring-inset ring-fuchsia-500/30"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex size-5 items-center justify-center rounded-lg border transition-all",
                        isActive
                          ? "border-fuchsia-500 bg-fuchsia-500"
                          : "border-border/60 group-hover:border-border"
                      )}
                    >
                      {isActive && <Check className="size-3 stroke-[4px] text-white" />}
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
