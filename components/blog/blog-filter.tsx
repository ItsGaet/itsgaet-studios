"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Hash } from "lucide-react";
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
    if (!menuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger Button: Square & Bold */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className={cn(
          "flex w-full items-center justify-between gap-8 border-2 px-6 py-3 transition-all duration-300 sm:w-auto",
          menuOpen || hasActiveTags
            ? "border-[#D2042D] bg-[#D2042D] text-[#FBF7F2]"
            : "border-[#1A1A1A] bg-transparent text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FBF7F2]"
        )}
      >
        <span className="text-xs font-black uppercase tracking-[0.2em]">
          {hasActiveTags ? `Filters (${activeTags.length})` : "Filter Topics"}
        </span>
        <Plus className={cn("size-4 transition-transform duration-300", menuOpen && "rotate-45")} />
      </button>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-0 z-50 mt-2 w-full border-2 border-[#1A1A1A] bg-[#FBF7F2] p-0 shadow-[10px_10px_0px_0px_rgba(26,26,26,1)] sm:w-72">
          {/* Menu Header */}
          <div className="flex items-center justify-between border-b border-[#1A1A1A] bg-[#1A1A1A] p-4 text-[#FBF7F2]">
            <span className="text-[10px] font-black uppercase tracking-widest">Select Category</span>
            {hasActiveTags && (
              <button 
                onClick={onClear}
                className="text-[10px] font-bold uppercase underline decoration-[#D2042D] underline-offset-4 hover:text-[#D2042D]"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Tags List */}
          <div className="max-h-[60vh] overflow-y-auto overflow-x-hidden uppercase">
            {tags.map((tag) => {
              const isActive = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => onToggleTag(tag)}
                  className={cn(
                    "group flex w-full items-center justify-between border-b border-[#D8C6BB] p-4 text-left transition-colors last:border-none",
                    isActive 
                      ? "bg-[#D2042D]/10 text-[#D2042D]" 
                      : "text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FBF7F2]"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Hash className={cn("size-3", isActive ? "text-[#D2042D]" : "text-[#D8C6BB] group-hover:text-[#FBF7F2]/50")} />
                    <span className="text-xs font-bold tracking-tight">{tag}</span>
                  </div>
                  <span className="font-mono text-[10px] opacity-60">
                    [{tagCounts[tag] || 0}]
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
