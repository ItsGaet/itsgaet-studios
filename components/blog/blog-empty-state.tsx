import { RefreshCcw, SearchX } from "lucide-react";

type BlogEmptyStateProps = {
  onReset: () => void;
  query?: string;
};

export default function BlogEmptyState({
  onReset,
  query,
}: BlogEmptyStateProps) {
  return (
    <div className="col-span-full border-2 border-dashed border-[#D8C6BB] bg-[#FBF7F2] p-12 lg:p-24 text-center transition-colors hover:border-[#D2042D]/30">
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        
        {/* Icon with raw aesthetic */}
        <div className="mb-10 flex size-24 items-center justify-center border border-[#D2042D] bg-[#D2042D] text-[#FBF7F2]">
          <SearchX className="size-10 stroke-[1.5px]" />
        </div>

        {/* Typography Focus */}
        <div className="mb-12 space-y-6">
          <h3 className="font-serif text-5xl md:text-7xl font-medium leading-[0.8] tracking-tighter text-[#1A1A1A]">
            Zero <span className="text-[#D2042D]">Results</span> Found.
          </h3>
          <p className="mx-auto max-w-md text-base leading-relaxed text-[#4A4A4A]">
            {query
              ? `Your search for "${query}" didn't return any matches. The signal is lost in the cotton.`
              : "We've reached the end of the archive. No posts match your current filter selection."}
          </p>
        </div>

        {/* CTA Button - No rounded, just sharp edges */}
        <button
          type="button"
          onClick={onReset}
          className="group flex items-center gap-3 border-2 border-[#1A1A1A] bg-[#1A1A1A] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#FBF7F2] transition-all hover:bg-[#D2042D] hover:border-[#D2042D]"
        >
          <RefreshCcw className="size-4 transition-transform duration-700 group-hover:rotate-180" />
          Reset Archive
        </button>

        {/* Minimal Footer Info */}
        <div className="mt-16 border-t border-[#D8C6BB] pt-4 w-full flex justify-between items-center opacity-40">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A]">
            Status: Null
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1A1A]">
            Ref: 404_POSTS
          </span>
        </div>
      </div>
    </div>
  );
}
