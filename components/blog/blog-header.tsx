import Link from "next/link";
import { ArrowUpRight, Rss } from "lucide-react";
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
    <header className="relative border-2 border-[#1A1A1A] bg-[#FBF7F2] p-8 md:p-16 lg:p-20">
      {/* Top Stripe Decoration */}
      <div className="absolute inset-x-0 top-0 h-2 bg-[#D2042D]" />

      <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-4xl space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.4em] text-[#D2042D]">
              <span>Collection // Archive</span>
              <div className="h-px flex-1 bg-[#D8C6BB]" />
            </div>
            
            <h1 className="font-serif text-6xl font-medium leading-[0.85] tracking-tighter text-[#1A1A1A] sm:text-9xl">
              The <span className="italic">Signal</span> Archive<span className="text-[#D2042D]">_</span>
            </h1>
          </div>

          <p className="max-w-xl text-xl leading-snug tracking-tight text-[#4A4A4A]">
            Technical notes and field-tested patterns for modern products. 
            Navigated like a library, curated like a gallery.
          </p>

          {/* Stats Grid: Clean & Minimal */}
          <div className="flex flex-wrap gap-x-12 gap-y-6 pt-4">
            <div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#D8C6BB]">Index</p>
              <p className="font-serif text-4xl text-[#1A1A1A]">{postCount} <span className="text-sm font-sans uppercase">Posts</span></p>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#D8C6BB]">Subjects</p>
              <p className="font-serif text-4xl text-[#1A1A1A]">{topicCount} <span className="text-sm font-sans uppercase">Topics</span></p>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-black uppercase tracking-widest text-[#D8C6BB]">Revision</p>
              <p className="text-xl font-bold uppercase tracking-tighter text-[#1A1A1A] mt-2">
                {latestPostDate ? formatDisplayDate(latestPostDate) : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Solid & Brutalist */}
        <div className="flex shrink-0 flex-col gap-0 border border-[#1A1A1A] sm:w-64">
          <a 
            href="/feed.xml"
            className="group flex items-center justify-between border-b border-[#1A1A1A] bg-[#FBF7F2] p-5 text-xs font-black uppercase tracking-widest text-[#1A1A1A] transition-colors hover:bg-[#D2042D] hover:text-[#FBF7F2]"
          >
            RSS Feed
            <Rss className="size-4" />
          </a>
          <Link 
            href="/"
            className="group flex items-center justify-between bg-[#1A1A1A] p-5 text-xs font-black uppercase tracking-widest text-[#FBF7F2] transition-colors hover:bg-[#D2042D]"
          >
            Back to Home
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>

      {/* Decorative Corner Element */}
      <div className="absolute bottom-4 right-4 hidden lg:block">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#D8C6BB] [writing-mode:vertical-lr]">
          EST. 2024
        </p>
      </div>
    </header>
  );
}