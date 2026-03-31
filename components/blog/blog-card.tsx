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
          "group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-[#d8c6bb] bg-[#fffaf6]/88 p-8 transition-all duration-500",
          "hover:-translate-y-1 hover:border-[#b62d34]/20 hover:bg-[#fff7f2] hover:shadow-[0_28px_60px_-36px_rgba(31,23,21,0.24)]"
        )}
        style={animationDelay ? { animationDelay: `${animationDelay}ms` } : undefined}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b62d34]/18 to-transparent transition-opacity group-hover:via-[#b62d34]/30" />
          <div className="absolute inset-y-0 right-0 w-24 border-l border-[#eadfd8] bg-[linear-gradient(180deg,rgba(182,45,52,0.03),transparent_35%)]" />
        </div>

        <div className="relative z-10 flex h-full flex-col gap-5">
          <div className="flex items-center justify-between">
            {post.featured ? (
              <div className="flex items-center gap-1.5 rounded-full bg-[#b62d34]/8 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#9f2028] ring-1 ring-[#b62d34]/15">
                <span className="size-1 rounded-full bg-[#b62d34]" />
                Featured
              </div>
            ) : (
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#8f5552]">
                Technical Note
              </div>
            )}
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#8f5552]">
              <span className="flex items-center gap-1">
                <Calendar className="size-3" /> {formatDisplayDate(post.date)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-3xl leading-tight tracking-[-0.035em] text-[#1f1715] transition-colors group-hover:text-[#b62d34]">
              {post.title}
            </h2>
            <p className="line-clamp-3 text-sm leading-relaxed text-[#5f4c47]">
              {post.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#d8c6bb] bg-[#fffaf6] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6c5954] transition-colors group-hover:border-[#b62d34]/20 group-hover:text-[#b62d34]"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-[#ddd1c8] pt-6">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#8f5552] transition-colors group-hover:text-[#b62d34]">
              <Clock className="size-3" /> {post.readTime}
            </div>
            <div className="flex size-10 items-center justify-center rounded-full border border-[#d8c6bb] bg-[#fffaf6] text-[#4f3d38] transition-all group-hover:border-[#b62d34]/30 group-hover:bg-[#b62d34] group-hover:text-[#fff9f4]">
              <ArrowUpRight className="size-5 transition-transform group-hover:scale-110" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
