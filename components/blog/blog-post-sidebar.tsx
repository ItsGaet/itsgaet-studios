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
      <div className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d1424]/84 p-6 backdrop-blur-md transition-all hover:border-amber-200/20">
        <div className="absolute -right-4 -top-4 size-24 rounded-full bg-amber-300/8 blur-2xl transition-all group-hover:bg-amber-300/12" />

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-200/80">
          Article Metrics
        </p>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between group/item">
            <div className="flex items-center gap-2 text-white/52">
              <Calendar className="size-4 opacity-50 transition-colors group-hover/item:text-amber-200" />
              <span className="text-xs font-medium">Published</span>
            </div>
            <span className="text-xs font-bold text-white/84">
              {formatDisplayDate(post.date)}
            </span>
          </div>

          <div className="flex items-center justify-between group/item">
            <div className="flex items-center gap-2 text-white/52">
              <Clock className="size-4 opacity-50 transition-colors group-hover/item:text-amber-200" />
              <span className="text-xs font-medium">Read Time</span>
            </div>
            <span className="text-xs font-bold text-white/84">{post.readTime}</span>
          </div>

          <div className="flex items-center justify-between group/item">
            <div className="flex items-center gap-2 text-white/52">
              <Hash className="size-4 opacity-50 transition-colors group-hover/item:text-amber-200" />
              <span className="text-xs font-medium">Topic</span>
            </div>
            <Link
              href={`/topics/${post.tags[0] || "general"}`}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/72 transition-colors hover:border-amber-200/30 hover:bg-amber-300 hover:text-slate-950"
            >
              {post.tags[0] || "General"}
            </Link>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[2.5rem] border border-amber-300/20 bg-amber-300 p-6 text-slate-950 shadow-xl transition-transform hover:-rotate-1">
        <div className="relative z-10">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-slate-950/10 backdrop-blur-sm">
            <Mail className="size-5 text-slate-950" />
          </div>
          <h3 className="font-display mt-4 text-2xl leading-tight tracking-tight">
            Have some <br /> feedback?
          </h3>
          <p className="mt-2 text-xs font-medium leading-relaxed text-slate-950/70">
            Send a quick note and I&apos;ll fold it into the next run.
          </p>
          <a
            href={`mailto:${siteConfig.email}?subject=Community%20topic`}
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-slate-950 py-3 text-xs font-bold text-white transition-all hover:bg-white hover:text-slate-950"
          >
            GET IN TOUCH <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="absolute -bottom-6 -right-6 size-24 rounded-full bg-white/25 blur-xl" />
      </div>

      <div className="px-4">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/34">
          Focus: automation • infra • product
        </p>
      </div>
    </aside>
  );
}
