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
          "group relative flex h-full flex-col overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/40 p-8 transition-all duration-500",
          "hover:-translate-y-2 hover:border-fuchsia-500/40 hover:bg-card/60 hover:shadow-[0_30px_60px_-15px_rgba(217,70,239,0.1)]"
        )}
        style={animationDelay ? { animationDelay: `${animationDelay}ms` } : undefined}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent transition-opacity group-hover:via-fuchsia-500/50" />
          <div className="absolute -right-10 -top-10 size-40 rounded-full bg-fuchsia-500/5 blur-[80px] transition-all group-hover:bg-fuchsia-500/15" />
          <div className="absolute -left-10 -bottom-10 size-40 rounded-full bg-cyan-500/5 blur-[80px] transition-all group-hover:bg-cyan-500/10" />
        </div>

        <div className="relative z-10 flex h-full flex-col gap-5">
          <div className="flex items-center justify-between">
            {post.featured ? (
              <div className="flex items-center gap-1.5 rounded-full bg-fuchsia-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-fuchsia-500 ring-1 ring-fuchsia-500/20">
                <span className="size-1 rounded-full bg-fuchsia-500 animate-pulse" />
                Featured
              </div>
            ) : (
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                Technical Note
              </div>
            )}
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
              <span className="flex items-center gap-1">
                <Calendar className="size-3" /> {formatDisplayDate(post.date)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-black leading-tight tracking-tighter text-foreground transition-colors group-hover:text-fuchsia-500">
              {post.title}
            </h2>
            <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground/80">
              {post.summary}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-border/40 bg-background/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-tight text-muted-foreground transition-colors group-hover:border-fuchsia-500/20 group-hover:text-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between border-t border-border/10 pt-6">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-fuchsia-500 transition-colors">
              <Clock className="size-3" /> {post.readTime}
            </div>
            <div className="flex size-10 items-center justify-center rounded-full border border-border/40 bg-background/40 transition-all group-hover:border-fuchsia-500 group-hover:bg-fuchsia-500 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(217,70,239,0.4)]">
              <ArrowUpRight className="size-5 transition-transform group-hover:scale-110" />
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
