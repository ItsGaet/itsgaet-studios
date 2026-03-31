import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Hash, Mail } from "lucide-react";

import type { Post } from "@/lib/posts";
import { formatDisplayDate, siteConfig } from "@/lib/site";

type BlogPostSidebarProps = {
  post: Post;
};

export default function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  return (
    <aside className="grid gap-6">
      <div className="group relative overflow-hidden rounded-[2rem] border border-border/40 bg-card/40 backdrop-blur-md p-6 transition-all hover:border-fuchsia-500/30">
        <div className="absolute -right-4 -top-4 size-24 rounded-full bg-fuchsia-500/10 blur-2xl transition-all group-hover:bg-fuchsia-500/20" />

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-fuchsia-500">
          Article Metrics
        </p>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between group/item">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="size-4 opacity-50 transition-colors group-hover/item:text-fuchsia-500" />
              <span className="text-xs font-medium">Published</span>
            </div>
            <span className="text-xs font-bold text-foreground/80">
              {formatDisplayDate(post.date)}
            </span>
          </div>

          <div className="flex items-center justify-between group/item">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4 opacity-50 transition-colors group-hover/item:text-fuchsia-500" />
              <span className="text-xs font-medium">Read Time</span>
            </div>
            <span className="text-xs font-bold text-foreground/80">{post.readTime}</span>
          </div>

          <div className="flex items-center justify-between group/item">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Hash className="size-4 opacity-50 transition-colors group-hover/item:text-fuchsia-500" />
              <span className="text-xs font-medium">Topic</span>
            </div>
            <Link
              href={`/topics/${post.tags[0] || "general"}`}
              className="rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-[10px] font-bold text-fuchsia-400 transition-colors hover:bg-fuchsia-500 hover:text-white"
            >
              {post.tags[0] || "General"}
            </Link>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-foreground p-6 text-background shadow-xl transition-transform hover:-rotate-1">
        <div className="relative z-10">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-background/20 backdrop-blur-sm">
            <Mail className="size-5 text-background" />
          </div>
          <h3 className="mt-4 text-lg font-bold leading-tight tracking-tight">
            Have some <br /> feedback?
          </h3>
          <p className="mt-2 text-xs font-medium leading-relaxed opacity-70">
            Send a quick note and I&apos;ll fold it into the next run.
          </p>
          <a
            href={`mailto:${siteConfig.email}?subject=Community%20topic`}
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-background py-3 text-xs font-bold text-foreground transition-all hover:bg-fuchsia-500 hover:text-white"
          >
            GET IN TOUCH <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="absolute -bottom-6 -right-6 size-24 rounded-full bg-white/10 blur-xl" />
      </div>

      <div className="px-4">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40">
          Focus: automation • infra • product
        </p>
      </div>
    </aside>
  );
}
