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
    <div className="group relative col-span-full overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/30 px-8 py-20 text-center shadow-2xl backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
        <div className="absolute left-1/2 top-1/2 size-80 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-fuchsia-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="relative flex size-20 items-center justify-center rounded-3xl border border-fuchsia-500/20 bg-fuchsia-500/5 shadow-[0_0_30px_rgba(217,70,239,0.1)]">
          <SearchX className="size-8 text-fuchsia-500/60" />
          <div className="absolute -right-1 -top-1 size-3 animate-ping rounded-full bg-fuchsia-500" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-black uppercase tracking-tighter text-foreground">
            No signal <span className="text-fuchsia-500">found.</span>
          </h3>
          <p className="mx-auto max-w-[360px] text-sm font-medium leading-relaxed text-muted-foreground/60">
            {query
              ? `No posts match "${query}" with the current filters. Try broadening the search or reset the current view.`
              : "There are no posts for the current filter combination. Try another topic or reset the search."}
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="group/btn flex items-center gap-2 rounded-full border border-border/60 bg-background/50 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-muted-foreground transition-all hover:border-fuchsia-500/50 hover:text-fuchsia-500"
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
