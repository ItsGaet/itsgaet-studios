import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getFeaturedPosts, getAllPosts } from "@/lib/posts";
import { formatDisplayDate } from "@/lib/site";
import { getAllTopics } from "@/lib/topics";

export default function BlogCTA() {
  const [latestPost] = getAllPosts();
  const [featuredPost] = getFeaturedPosts(1);
  const topTopics = getAllTopics().slice(0, 4);

  return (
    <section className="border-t border-[#ddd1c8] pt-14">
      <div className="grid gap-12 lg:grid-cols-[minmax(280px,0.55fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#8f5552]">
            Archive
          </p>
          <h2 className="font-display max-w-lg text-4xl leading-[0.96] tracking-[-0.04em] text-[#1f1715] sm:text-5xl">
            Writing that sits between a technical blog and a compact portfolio.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-[#5f4c47]">
            Selected notes, clear topics, and enough context to understand how I
            work without turning the site into a brochure.
          </p>

          <div>
            <Button
              size="lg"
              asChild
              className="h-14 rounded-full px-7 text-xs font-black uppercase tracking-[0.22em]"
            >
              <Link href="/blog">
                Browse all posts <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>

          <div className="space-y-3 border-t border-[#ddd1c8] pt-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8f5552]">
              Key topics
            </p>
            <div className="flex flex-wrap gap-2">
              {topTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="rounded-full border border-[#d8c6bb] bg-[#fffaf6]/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#5f4c47] transition-colors hover:border-[#b62d34]/30 hover:text-[#b62d34]"
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#ddd1c8] border-y border-[#ddd1c8]">
          {featuredPost && (
            <article className="grid gap-4 py-6 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-8">
              <div className="space-y-2 text-[10px] font-black uppercase tracking-[0.26em] text-[#8f5552]">
                <p>Featured</p>
                <p className="text-[#b62d34]">{formatDisplayDate(featuredPost.date)}</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-3xl tracking-tight text-[#1f1715]">
                  {featuredPost.title}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-[#5f4c47]">
                  {featuredPost.summary}
                </p>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#1f1715] transition-colors hover:text-[#b62d34]"
                >
                  Open featured post <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>
          )}

          <article className="grid gap-4 py-6 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-8">
            <div className="space-y-2 text-[10px] font-black uppercase tracking-[0.26em] text-[#8f5552]">
              <p>Latest</p>
              <p className="text-[#b62d34]">
                {latestPost ? formatDisplayDate(latestPost.date) : "No posts yet"}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-3xl tracking-tight text-[#1f1715]">
                {latestPost ? latestPost.title : "Archive in progress"}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-[#5f4c47]">
                {latestPost
                  ? latestPost.summary
                  : "New notes will land here as the archive grows."}
              </p>
              {latestPost ? (
                <Link
                  href={`/blog/${latestPost.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#1f1715] transition-colors hover:text-[#b62d34]"
                >
                  Open latest post <ArrowUpRight className="size-4" />
                </Link>
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
