import Link from "next/link";
import { ArrowUpRight, Calendar, Clock } from "lucide-react";

import type { Post } from "@/lib/posts";
import { formatDisplayDate } from "@/lib/site";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: Post;
  animationDelay?: number;
};

export default function BlogCard({ post, animationDelay }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d1424]/84 p-8 transition-all duration-500",
          "hover:-translate-y-1.5 hover:border-amber-200/25 hover:bg-[#10182a]/96 hover:shadow-[0_28px_60px_-28px_rgba(15,23,42,0.8)]"
        )}
        style={animationDelay ? { animationDelay: `${animationDelay}ms` } : undefined}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/20 to-transparent transition-opacity group-hover:via-amber-200/40" />
          <div className="absolute inset-y-0 right-0 w-24 border-l border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_35%)]" />
        </div>

        <div className="relative z-10 flex h-full flex-col gap-5">
          <div className="flex items-center justify-between">
            {post.featured ? (
              <div className="flex items-center gap-1.5 rounded-full bg-amber-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-amber-200 ring-1 ring-amber-300/20">
                <span className="size-1 rounded-full bg-amber-200" />
                Featured
              </div>
            ) : (
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/38">
                Technical Note
              </div>
            )}
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/36">
              <span className="flex items-center gap-1">
                <Calendar className="size-3" /> {formatDisplayDate(post.date)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-3xl leading-tight tracking-[-0.035em] text-white transition-colors group-hover:text-amber-100">
              {post.title}
            </h2>
            <p className="line-clamp-3 text-sm leading-relaxed text-white/62">
              {post.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/58 transition-colors group-hover:border-amber-200/20 group-hover:text-white"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-white/8 pt-6">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 transition-colors group-hover:text-amber-100">
              <Clock className="size-3" /> {post.readTime}
            </div>
            <div className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/74 transition-all group-hover:border-amber-200/30 group-hover:bg-amber-300 group-hover:text-slate-950">
              <ArrowUpRight className="size-5 transition-transform group-hover:scale-110" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
