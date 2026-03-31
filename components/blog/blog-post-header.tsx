import Link from "next/link";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import type { Post } from "@/lib/posts";
import { formatDisplayDate } from "@/lib/site";

type BlogPostHeaderProps = {
  post: Post;
};

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  return (
    <header className="relative border-x-2 border-t-2 border-[#1A1A1A] bg-[#FBF7F2] p-8 pt-12 md:p-16 lg:p-20">
      {/* Top Navigation Bar */}
      <div className="mb-16 flex items-center justify-between border-b-2 border-[#1A1A1A] pb-8">
        <Link 
          href="/blog" 
          className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1A1A] hover:text-[#D2042D]"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          Back to Archive
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-[#D8C6BB]">
          <span className="flex items-center gap-2 text-[#1A1A1A]">
            <Calendar className="size-3 text-[#D2042D]" /> {formatDisplayDate(post.date)}
          </span>
          <span className="flex items-center gap-2 text-[#1A1A1A]">
            <Clock className="size-3 text-[#D2042D]" /> {post.readTime}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
        {/* Main Title Section */}
        <div className="lg:col-span-8 space-y-8">
          <h1 className="font-serif text-6xl font-medium leading-[0.85] tracking-tighter text-[#1A1A1A] sm:text-8xl lg:text-9xl">
            {post.title}<span className="text-[#D2042D]">_</span>
          </h1>
          
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/topics/${tag}`}
                className="border border-[#1A1A1A] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A] transition-colors hover:bg-[#D2042D] hover:border-[#D2042D] hover:text-[#FBF7F2]"
              >
                {`// ${tag}`}
              </Link>
            ))}
          </div>
        </div>

        {/* Summary / Lead Section */}
        <div className="lg:col-span-4 lg:border-l-2 lg:border-[#1A1A1A] lg:pl-10">
          <div className="mb-6 inline-block bg-[#D2042D] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#FBF7F2]">
            Executive Summary
          </div>
          <p className="text-xl font-medium leading-snug tracking-tight text-[#4A4A4A] sm:text-2xl">
            {post.summary}
          </p>
        </div>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="mt-16 flex h-1 w-full bg-[#1A1A1A]">
        <div className="h-full w-1/3 bg-[#D2042D]" />
      </div>
    </header>
  );
}
