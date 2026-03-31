import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { nowSnapshot } from "@/lib/now";
import { getFeaturedPosts, getAllPosts } from "@/lib/posts";
import { formatDisplayDate, siteConfig } from "@/lib/site";
import { getAllTopics } from "@/lib/topics";

export default function BlogCTA() {
  const [latestPost] = getAllPosts();
  const [featuredPost] = getFeaturedPosts(1);
  const topTopics = getAllTopics().slice(0, 4);

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d1424]/88 px-5 py-8 backdrop-blur-md sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-transparent" />
        <div className="absolute -left-16 top-10 size-72 rounded-full bg-amber-300/8 blur-[110px]" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent)]" />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-end">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-amber-200/80">
              Archive and current signal
            </p>
            <h2 className="font-display max-w-3xl text-4xl leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl">
              Start from a post, a topic, or the live direction of the site.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-white/64 sm:text-lg">
              The archive is organized for fast discovery: featured notes,
              topic-led navigation, and a lightweight Now page that explains what
              I am focusing on at the moment.
            </p>
          </div>

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
              <Link href="/now">Open Now page</Link>
            </Button>
          </div>

          <div className="space-y-4 border-t border-white/8 pt-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/42">
                Top topics
              </p>
              <a
                href={`mailto:${siteConfig.email}?subject=Topic%20idea`}
                className="text-[10px] font-black uppercase tracking-[0.22em] text-amber-200/80 transition-colors hover:text-amber-100"
              >
                Suggest a topic
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {topTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-amber-200/30 hover:text-amber-100"
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {featuredPost && (
            <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/42">
                    Featured note
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/80">
                    {formatDisplayDate(featuredPost.date)}
                  </p>
                </div>
                <div className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-amber-200">
                  {featuredPost.tags[0] ?? "general"}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-display text-3xl leading-tight tracking-tight text-white">
                  {featuredPost.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/64">
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

          <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/42">
                  Now
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-amber-200/80">
                  Updated {formatDisplayDate(nowSnapshot.updatedAt)}
                </p>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-white/72">
                live context
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="font-display text-3xl leading-tight tracking-tight text-white">
                What I am working through right now
              </h3>
              <p className="text-sm leading-relaxed text-white/64">
                {nowSnapshot.summary}
              </p>
              <p className="text-sm leading-relaxed text-white/48">
                Latest archive update:{" "}
                {latestPost ? formatDisplayDate(latestPost.date) : "No posts yet"}.
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
