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
      <div className="group relative overflow-hidden rounded-[2rem] border border-[#d8c6bb] bg-[#fffaf6]/90 p-6 transition-all hover:border-[#b62d34]/20">
        <div className="absolute -right-4 -top-4 size-24 rounded-full bg-[#b62d34]/8 blur-2xl transition-all group-hover:bg-[#b62d34]/12" />

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8f5552]">
          Article Metrics
        </p>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between group/item">
            <div className="flex items-center gap-2 text-[#6c5954]">
              <Calendar className="size-4 opacity-50 transition-colors group-hover/item:text-[#b62d34]" />
              <span className="text-xs font-medium">Published</span>
            </div>
            <span className="text-xs font-bold text-[#1f1715]">
              {formatDisplayDate(post.date)}
            </span>
          </div>

          <div className="flex items-center justify-between group/item">
            <div className="flex items-center gap-2 text-[#6c5954]">
              <Clock className="size-4 opacity-50 transition-colors group-hover/item:text-[#b62d34]" />
              <span className="text-xs font-medium">Read Time</span>
            </div>
            <span className="text-xs font-bold text-[#1f1715]">{post.readTime}</span>
          </div>

          <div className="flex items-center justify-between group/item">
            <div className="flex items-center gap-2 text-[#6c5954]">
              <Hash className="size-4 opacity-50 transition-colors group-hover/item:text-[#b62d34]" />
              <span className="text-xs font-medium">Topic</span>
            </div>
            <Link
              href={`/topics/${post.tags[0] || "general"}`}
              className="rounded-full border border-[#d8c6bb] bg-[#fffaf6] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#6c5954] transition-colors hover:border-[#b62d34]/20 hover:bg-[#b62d34] hover:text-[#fff9f4]"
            >
              {post.tags[0] || "General"}
            </Link>
          </div>
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-[2.5rem] border border-[#b62d34]/15 bg-[#b62d34] p-6 text-[#fff9f4] shadow-xl transition-transform hover:-rotate-1">
        <div className="relative z-10">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-white/12 backdrop-blur-sm">
            <Mail className="size-5 text-[#fff9f4]" />
          </div>
          <h3 className="font-display mt-4 text-2xl leading-tight tracking-tight">
            Have some <br /> feedback?
          </h3>
          <p className="mt-2 text-xs font-medium leading-relaxed text-[#fff9f4]/78">
            Send a quick note and I&apos;ll fold it into the next run.
          </p>
          <a
            href={`mailto:${siteConfig.email}?subject=Community%20topic`}
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#fff9f4] py-3 text-xs font-bold text-[#b62d34] transition-all hover:bg-[#fcefeb]"
          >
            GET IN TOUCH <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="absolute -bottom-6 -right-6 size-24 rounded-full bg-white/18 blur-xl" />
      </div>

      <div className="px-4">
        <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8f5552]">
          Focus: automation • infra • product
        </p>
      </div>
    </aside>
  );
}
