import { Calendar, Clock } from "lucide-react";

import type { Post } from "@/lib/posts";
import { formatDisplayDate } from "@/lib/site";
import { Badge } from "@/components/ui/badge";

type BlogPostHeaderProps = {
  post: Post;
};

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/40 backdrop-blur-xl px-8 py-16 sm:px-14">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent" />
        <div className="absolute right-[-10%] top-[-20%] size-96 rounded-full bg-fuchsia-500/15 blur-[120px]" />
        <div className="absolute left-[-5%] bottom-[-30%] size-80 rounded-full bg-cyan-500/10 blur-[100px]" />
      </div>

      <div className="relative z-10 space-y-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-500" />
            </span>
            Community note
          </div>

          <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-muted-foreground/60">
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

        <h1 className="max-w-4xl text-4xl font-black leading-[1.1] tracking-tighter sm:text-6xl lg:text-7xl">
          {post.title.split(" ").map((word, i) => (
            <span key={i} className={i % 4 === 0 ? "text-foreground" : "text-foreground/90"}>
              {word}{" "}
            </span>
          ))}
        </h1>

        <div className="border-l-2 border-fuchsia-500/30 pl-6">
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {post.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-lg bg-secondary/50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider hover:bg-fuchsia-500 hover:text-white transition-colors"
            >
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
    </header>
  );
}
