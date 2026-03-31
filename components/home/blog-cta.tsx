import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { nowSnapshot } from "@/lib/now";
import { getFeaturedPosts, getAllPosts } from "@/lib/posts";
import { formatDisplayDate } from "@/lib/site";
import { getAllTopics } from "@/lib/topics";

export default function BlogCTA() {
  const [latestPost] = getAllPosts();
  const [featuredPost] = getFeaturedPosts(1);
  const topTopics = getAllTopics().slice(0, 4);

  return (
    <section className="border-t border-white/8 pt-14">
      <div className="grid gap-12 lg:grid-cols-[minmax(280px,0.55fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <p className="text-[10px] font-black uppercase tracking-[0.34em] text-amber-200/80">
            Blog and portfolio signal
          </p>
          <h2 className="font-display max-w-lg text-4xl leading-[0.96] tracking-[-0.04em] text-white sm:text-5xl">
            Selected writing, current direction, and the topics shaping the work.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-white/58">
            This is the bridge between blog and portfolio: enough editorial context
            to understand the writing, without turning the site into a dashboard.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="h-14 rounded-full bg-amber-300 px-7 text-xs font-black uppercase tracking-[0.22em] text-slate-950 hover:bg-amber-200"
            >
              <Link href="/blog">
                Browse all posts <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="h-14 rounded-full border-white/12 bg-transparent px-7 text-xs font-black uppercase tracking-[0.22em] text-white hover:border-amber-200/30 hover:bg-white/6"
            >
              <Link href="/now">Current direction</Link>
            </Button>
          </div>

          <div className="space-y-3 border-t border-white/8 pt-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">
              Key topics
            </p>
            <div className="flex flex-wrap gap-2">
              {topTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/68 transition-colors hover:border-amber-200/30 hover:text-amber-100"
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="divide-y divide-white/8 border-y border-white/8">
          {featuredPost && (
            <article className="grid gap-4 py-6 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-8">
              <div className="space-y-2 text-[10px] font-black uppercase tracking-[0.26em] text-white/40">
                <p>Featured</p>
                <p className="text-amber-200/80">{formatDisplayDate(featuredPost.date)}</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-display text-3xl tracking-tight text-white">
                  {featuredPost.title}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-white/58">
                  {featuredPost.summary}
                </p>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-white transition-colors hover:text-amber-200"
                >
                  Open featured post <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>
          )}

          <article className="grid gap-4 py-6 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-8">
            <div className="space-y-2 text-[10px] font-black uppercase tracking-[0.26em] text-white/40">
              <p>Now</p>
              <p className="text-amber-200/80">
                Updated {formatDisplayDate(nowSnapshot.updatedAt)}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-3xl tracking-tight text-white">
                What I am focused on right now
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-white/58">
                {nowSnapshot.summary}
              </p>
              <p className="text-sm leading-relaxed text-white/44">
                Latest post: {latestPost ? latestPost.title : "No posts yet"}.
              </p>
              <Link
                href="/now"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-white transition-colors hover:text-amber-200"
              >
                Read the Now page <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
