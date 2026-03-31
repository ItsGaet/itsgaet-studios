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
    <div className="group relative col-span-full overflow-hidden rounded-[2.5rem] border border-[#d8c6bb] bg-[#fffaf6]/90 px-8 py-20 text-center shadow-[0_26px_60px_-36px_rgba(31,23,21,0.22)]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b62d34]/20 to-transparent" />
        <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b62d34]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative flex size-20 items-center justify-center rounded-3xl border border-[#b62d34]/15 bg-[#b62d34]/5 shadow-[0_0_30px_rgba(182,45,52,0.08)]">
          <SearchX className="size-8 text-[#9f2028]/70" />
          <div className="absolute -right-1 -top-1 size-3 rounded-full bg-[#b62d34]" />
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-4xl tracking-[-0.04em] text-[#1f1715]">
            No signal <span className="text-[#b62d34]">found.</span>
          </h3>
          <p className="mx-auto max-w-[360px] text-sm font-medium leading-relaxed text-[#5f4c47]">
            {query
              ? `No posts match "${query}" with the current filters. Try broadening the search or reset the current view.`
              : "There are no posts for the current filter combination. Try another topic or reset the search."}
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="group/btn flex items-center gap-2 rounded-full border border-[#d8c6bb] bg-[#fffaf6] px-6 py-3 text-[10px] font-black uppercase tracking-widest text-[#5f4c47] transition-all hover:border-[#b62d34]/20 hover:text-[#b62d34]"
        >
          <RefreshCcw className="size-3 transition-transform duration-500 group-hover/btn:rotate-180" />
          Reset search
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#8f5552]/70">
          Error Code: 404_POSTS_NOT_FOUND
        </p>
      </div>
    </div>
  );
}
