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
    <div className="group relative col-span-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d1424]/84 px-8 py-20 text-center shadow-2xl backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/20 to-transparent" />
        <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative flex size-20 items-center justify-center rounded-3xl border border-amber-300/20 bg-amber-300/5 shadow-[0_0_30px_rgba(251,191,36,0.08)]">
          <SearchX className="size-8 text-amber-200/70" />
          <div className="absolute -right-1 -top-1 size-3 rounded-full bg-amber-300" />
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-4xl tracking-[-0.04em] text-white">
            No signal <span className="text-amber-200">found.</span>
          </h3>
          <p className="mx-auto max-w-[360px] text-sm font-medium leading-relaxed text-white/56">
            {query
              ? `No posts match "${query}" with the current filters. Try broadening the search or reset the current view.`
              : "There are no posts for the current filter combination. Try another topic or reset the search."}
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="group/btn flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/58 transition-all hover:border-amber-200/30 hover:text-amber-100"
        >
          <RefreshCcw className="size-3 transition-transform duration-500 group-hover/btn:rotate-180" />
          Reset search
        </button>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <p className="text-[9px] font-bold uppercase tracking-[0.4em] opacity-20">
          Error Code: 404_POSTS_NOT_FOUND
        </p>
      </div>
    </div>
  );
}
