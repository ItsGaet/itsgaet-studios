import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { Post } from "@/lib/posts";
import { formatDisplayDate } from "@/lib/site";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: Post;
  animationDelay?: number;
};

export default function BlogCard({ post, animationDelay }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article
        className={cn(
          "relative flex h-full flex-col border-b border-r border-[#D8C6BB] bg-[#FBF7F2] p-6 transition-all duration-300 ease-in-out [content-visibility:auto] [contain-intrinsic-size:1px_420px]",
          "hover:bg-[#D2042D] group-hover:border-[#D2042D]"
        )}
        style={animationDelay ? { animationDelay: `${animationDelay}ms` } : undefined}
      >
        {/* Header: Date & Status */}
        <div className="mb-8 flex items-center justify-between">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#D2042D] group-hover:text-[#FBF7F2]">
            {formatDisplayDate(post.date)}
          </span>
          {post.featured && (
            <span className="bg-[#D2042D] px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter text-[#FBF7F2] group-hover:bg-[#FBF7F2] group-hover:text-[#D2042D]">
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-4xl font-medium leading-[0.9] tracking-tight text-[#1A1A1A] group-hover:text-[#FBF7F2]">
            {post.title}
          </h2>
          <p className="line-clamp-2 text-sm leading-relaxed text-[#4A4A4A] group-hover:text-[#FBF7F2]/80">
            {post.summary}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-10">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-widest text-[#D2042D] group-hover:text-[#FBF7F2]"
              >
                {`// ${tag}`}
              </span>
            ))}
          </div>
          
          <div className="flex items-center justify-between border-t border-[#D8C6BB] pt-4 group-hover:border-[#FBF7F2]/30">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase text-[#1A1A1A] group-hover:text-[#FBF7F2]">
              <Clock className="size-3" /> {post.readTime}
            </div>
            <ArrowUpRight className="size-5 text-[#D2042D] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#FBF7F2]" />
          </div>
        </div>
      </article>
    </Link>
  );
}
