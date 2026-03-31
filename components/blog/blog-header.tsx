import Link from "next/link";
import { ArrowUpRight, FileText, LayoutGrid, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatDisplayDate } from "@/lib/site";

type BlogHeaderProps = {
  postCount: number;
  topicCount: number;
  latestPostDate?: string;
};

export default function BlogHeader({
  postCount,
  topicCount,
  latestPostDate,
}: BlogHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/30 backdrop-blur-md px-8 py-12 sm:px-14">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />
        <div className="absolute right-[-10%] top-[-20%] size-96 rounded-full bg-fuchsia-500/10 blur-[120px]" />
        <div className="absolute left-[-10%] bottom-[-30%] size-80 rounded-full bg-cyan-500/5 blur-[100px]" />
      </div>

      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-500">
              <span className="h-px w-8 bg-fuchsia-500/40" />
              Resource Archive
            </div>
            <h1 className="text-5xl font-black tracking-tighter sm:text-7xl">
              Blog<span className="text-fuchsia-500">.</span>
            </h1>
          </div>
          
          <p className="max-w-xl text-lg leading-relaxed text-muted-foreground/80">
            Technical notes, field-tested patterns, and clear
            runbooks for modern products.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 rounded-2xl border border-border/40 bg-background/40 px-5 py-3 transition-colors hover:border-fuchsia-500/30">
              <div className="flex size-10 items-center justify-center rounded-xl bg-fuchsia-500/10 text-fuchsia-500">
                <FileText className="size-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">Posts</p>
                <p className="text-xl font-black leading-none">{postCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-border/40 bg-background/40 px-5 py-3 transition-colors hover:border-cyan-500/30">
              <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                <LayoutGrid className="size-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">Topics</p>
                <p className="text-xl font-black leading-none">{topicCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-border/40 bg-background/40 px-5 py-3 transition-colors hover:border-white/20">
              <div className="flex size-10 items-center justify-center rounded-xl bg-white/5 text-muted-foreground">
                <Zap className="size-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground/50">Last Update</p>
                <p className="text-sm font-black leading-none">
                  {latestPostDate ? formatDisplayDate(latestPostDate) : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <Button
            variant="outline"
            asChild
            className="group h-14 rounded-full border-border/40 bg-background/40 px-8 text-xs font-bold uppercase tracking-widest backdrop-blur-sm transition-all hover:border-fuchsia-500/50 hover:bg-fuchsia-500/5"
          >
            <Link href="/">
              Back to Home 
              <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
