import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { getFeaturedPosts, getAllPosts } from "@/lib/posts";
import { formatDisplayDate } from "@/lib/site";
import { getAllTopics } from "@/lib/topics";

export default function BlogCTA() {
  const [latestPost] = getAllPosts();
  const [featuredPost] = getFeaturedPosts(1);
  const topTopics = getAllTopics().slice(0, 4);

  return (
    <section className="border-t-2 border-[#1A1A1A] bg-[#FBF7F2] py-20">
      <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
        
        {/* Left Column: Brand & Topics */}
        <div className="space-y-12 lg:col-span-5">
          <div className="space-y-6">
            <span className="inline-block bg-[#D2042D] px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-[#FBF7F2]">
              Archive Index
            </span>
            <h2 className="font-serif text-5xl leading-[0.85] tracking-tighter text-[#1A1A1A] sm:text-6xl">
              Technical Writing <br /> Meets <span className="italic">Product Design.</span>
            </h2>
            <p className="max-w-md text-xl leading-snug tracking-tight text-[#4A4A4A]">
              Selected notes and field-tested patterns. No fluff, just context on how I build.
            </p>

            <Link
              href="/blog"
              className="group inline-flex items-center gap-4 border-2 border-[#1A1A1A] bg-[#1A1A1A] px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-[#FBF7F2] transition-colors hover:bg-[#D2042D] hover:border-[#D2042D]"
            >
              Browse all entries
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>

          <div className="space-y-4 border-t-2 border-[#1A1A1A] pt-8">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D8C6BB]">
              Core Subjects //
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {topTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] transition-colors hover:text-[#D2042D] hover:underline underline-offset-8 decoration-2"
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Featured & Latest (The List) */}
        <div className="lg:col-span-7">
          <div className="border-2 border-[#1A1A1A]">
            
            {/* Featured Post Block */}
            {featuredPost && (
              <article className="group relative border-b-2 border-[#1A1A1A] p-8 transition-colors hover:bg-[#D2042D]">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D2042D] group-hover:text-[#FBF7F2]">
                    [ Featured Entry ]
                  </span>
                  <span className="font-mono text-[10px] text-[#1A1A1A] group-hover:text-[#FBF7F2]">
                    {formatDisplayDate(featuredPost.date)}
                  </span>
                </div>
                <h3 className="mb-4 font-serif text-4xl tracking-tighter text-[#1A1A1A] group-hover:text-[#FBF7F2]">
                  {featuredPost.title}
                </h3>
                <p className="mb-8 max-w-xl text-base leading-relaxed text-[#4A4A4A] group-hover:text-[#FBF7F2]/80">
                  {featuredPost.summary}
                </p>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1A1A] group-hover:text-[#FBF7F2] group-hover:underline underline-offset-4"
                >
                  Read full analysis <ArrowUpRight className="size-3" />
                </Link>
              </article>
            )}

            {/* Latest Post Block */}
            <article className="group p-8 transition-colors hover:bg-[#1A1A1A]">
              <div className="mb-6 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1A1A] group-hover:text-[#D8C6BB]">
                  [ Latest Release ]
                </span>
                <span className="font-mono text-[10px] text-[#1A1A1A] group-hover:text-[#D8C6BB]">
                  {latestPost ? formatDisplayDate(latestPost.date) : "00.00.00"}
                </span>
              </div>
              <h3 className="mb-4 font-serif text-4xl tracking-tighter text-[#1A1A1A] group-hover:text-[#FBF7F2]">
                {latestPost ? latestPost.title : "Archive Refreshing..."}
              </h3>
              <p className="mb-8 max-w-xl text-base leading-relaxed text-[#4A4A4A] group-hover:text-[#FBF7F2]/80">
                {latestPost?.summary || "Updates are being indexed. Check back shortly for new technical notes."}
              </p>
              {latestPost && (
                <Link
                  href={`/blog/${latestPost.slug}`}
                  className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1A1A] group-hover:text-[#FBF7F2] group-hover:underline underline-offset-4"
                >
                  View latest entry <ArrowUpRight className="size-3" />
                </Link>
              )}
            </article>

          </div>
        </div>
      </div>
    </section>
  );
}