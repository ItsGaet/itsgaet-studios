import Link from "next/link";
import { ArrowUpRight, FileText, LayoutGrid, Rss, Zap } from "lucide-react";

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
    <header className="relative overflow-hidden rounded-[2.5rem] border border-[#d8c6bb] bg-[#fffaf6]/90 px-8 py-12 shadow-[0_30px_70px_-48px_rgba(31,23,21,0.34)] sm:px-14">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b62d34]/30 to-transparent" />
        <div className="absolute right-[-10%] top-[-20%] size-96 rounded-full bg-[#b62d34]/8 blur-[120px]" />
      </div>

      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl space-y-7">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#8f5552]">
              <span className="h-px w-8 bg-[#b62d34]/35" />
              Resource Archive
            </div>
            <h1 className="font-display text-5xl tracking-[-0.05em] text-[#1f1715] sm:text-7xl">
              Archive<span className="text-[#b62d34]">.</span>
            </h1>
          </div>

          <p className="max-w-2xl text-lg leading-relaxed text-[#5f4c47]">
            Technical notes, field-tested patterns, and clear runbooks for modern
            products. Search, filter by topic, and move through the archive like a
            library instead of a feed.
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-[1.5rem] border border-[#e0d3c9] bg-[#fffaf6] px-5 py-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#b62d34]/8 text-[#9f2028]">
                <FileText className="size-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#8f5552]">Posts</p>
                <p className="text-xl font-black leading-none text-[#1f1715]">{postCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-[1.5rem] border border-[#e0d3c9] bg-[#fffaf6] px-5 py-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#b62d34]/8 text-[#9f2028]">
                <LayoutGrid className="size-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#8f5552]">Topics</p>
                <p className="text-xl font-black leading-none text-[#1f1715]">{topicCount}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-[1.5rem] border border-[#e0d3c9] bg-[#fffaf6] px-5 py-4">
              <div className="flex size-10 items-center justify-center rounded-xl bg-[#f4e7de] text-[#6a4f49]">
                <Zap className="size-5" />
              </div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-[#8f5552]">Last update</p>
                <p className="text-sm font-black leading-none text-[#1f1715]">
                  {latestPostDate ? formatDisplayDate(latestPostDate) : "—"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button
            variant="outline"
            asChild
            className="group h-14 rounded-full px-6 text-xs font-bold uppercase tracking-widest"
          >
            <a href="/feed.xml">
              RSS Feed
              <Rss className="ml-2 size-4 transition-transform group-hover:scale-110" />
            </a>
          </Button>
          <Button
            variant="outline"
            asChild
            className="group h-14 rounded-full px-8 text-xs font-bold uppercase tracking-widest"
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
