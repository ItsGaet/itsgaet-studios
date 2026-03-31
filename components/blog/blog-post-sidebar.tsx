import Link from "next/link";
import { ArrowUpRight, Calendar, Clock, Hash, Mail } from "lucide-react";

import type { Post } from "@/lib/posts";
import { formatDisplayDate, siteConfig } from "@/lib/site";

type BlogPostSidebarProps = {
  post: Post;
};

export default function BlogPostSidebar({ post }: BlogPostSidebarProps) {
  return (
    <aside className="flex flex-col gap-0 border-x-2 border-b-2 border-[#1A1A1A] bg-[#FBF7F2] lg:sticky lg:top-8">
      {/* Metrics Section */}
      <div className="border-b-2 border-[#1A1A1A] p-6 lg:p-8">
        <p className="mb-8 text-[11px] font-black uppercase tracking-[0.4em] text-[#D2042D]">
          Metadata // 01
        </p>

        <div className="space-y-6">
          <div className="group flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#1A1A1A]">
              <Calendar className="size-4 text-[#D2042D]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Published</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#1A1A1A]">
              {formatDisplayDate(post.date)}
            </span>
          </div>

          <div className="group flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#1A1A1A]">
              <Clock className="size-4 text-[#D2042D]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Reading Time</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#1A1A1A]">
              {post.readTime.toUpperCase()}
            </span>
          </div>

          <div className="group flex items-center justify-between border-t border-[#D8C6BB] pt-6">
            <div className="flex items-center gap-3 text-[#1A1A1A]">
              <Hash className="size-4 text-[#D2042D]" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Primary Topic</span>
            </div>
            <Link
              href={`/topics/${post.tags[0] || "general"}`}
              className="border border-[#1A1A1A] bg-transparent px-3 py-1 text-[10px] font-black uppercase tracking-tighter text-[#1A1A1A] transition-colors hover:bg-[#1A1A1A] hover:text-[#FBF7F2]"
            >
              {post.tags[0] || "General"}
            </Link>
          </div>
        </div>
      </div>

      {/* CTA / Feedback Section - Solid Cherry Red Block */}
      <div className="bg-[#D2042D] p-6 text-[#FBF7F2] lg:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex size-12 items-center justify-center border-2 border-[#FBF7F2] bg-transparent">
            <Mail className="size-6 text-[#FBF7F2]" />
          </div>
          
          <div className="space-y-2">
            <h3 className="font-serif text-3xl font-medium leading-none tracking-tighter">
              Feedback?
            </h3>
            <p className="text-xs leading-relaxed opacity-90 uppercase font-bold tracking-tight">
              Send a note and I&apos;ll fold it <br /> into the next revision.
            </p>
          </div>

          <a
            href={`mailto:${siteConfig.email}?subject=Feedback:%20${post.title}`}
            className="group flex items-center justify-between border-2 border-[#FBF7F2] bg-[#FBF7F2] px-4 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-[#D2042D] transition-all hover:bg-[#1A1A1A] hover:border-[#1A1A1A] hover:text-[#FBF7F2]"
          >
            Get in touch
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>

      {/* Footer / Tagline */}
      <div className="p-6 text-center lg:p-8 opacity-40">
        <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#1A1A1A]">
          Focus: Automation // Infra // Product
        </p>
      </div>
    </aside>
  );
}