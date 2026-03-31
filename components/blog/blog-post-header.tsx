import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

import type { Post } from "@/lib/posts";
import { formatDisplayDate } from "@/lib/site";
import { Badge } from "@/components/ui/badge";

type BlogPostHeaderProps = {
  post: Post;
};

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d1424]/88 px-8 py-14 backdrop-blur-xl sm:px-14 sm:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
        <div className="absolute right-[-10%] top-[-20%] size-96 rounded-full bg-amber-300/10 blur-[120px]" />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/8 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-200">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-200" />
            </span>
            Community note
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-white/44">
            <div className="flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              {formatDisplayDate(post.date)}
            </div>
            <span className="opacity-30">/</span>
            <div className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {post.readTime}
            </div>
          </div>
        </div>

        <h1 className="font-display max-w-5xl text-4xl leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
          {post.title.split(" ").map((word, i) => (
            <span key={i} className={i % 5 === 0 ? "text-amber-100" : "text-white"}>
              {word}{" "}
            </span>
          ))}
        </h1>

        <div className="max-w-3xl border-l-2 border-amber-300/30 pl-6">
          <p className="text-lg leading-relaxed text-white/66 sm:text-xl">
            {post.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" asChild>
              <Link
                href={`/topics/${tag}`}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:border-amber-200/25 hover:bg-amber-300 hover:text-slate-950"
              >
                #{tag}
              </Link>
            </Badge>
          ))}
        </div>
      </div>
    </header>
  );
}
