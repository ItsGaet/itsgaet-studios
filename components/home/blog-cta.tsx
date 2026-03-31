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
    <section className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/25 px-5 py-8 backdrop-blur-md sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/30 to-transparent" />
        <div className="absolute -left-16 top-10 size-72 rounded-full bg-cyan-500/6 blur-[110px]" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent)]" />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)] lg:items-end">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-fuchsia-500">
              Archive and current signal
            </p>
            <h2 className="max-w-3xl text-3xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl">
              Start from a post, a topic, or the live direction of the site.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground/75 sm:text-lg">
              The archive is organized for fast discovery: featured notes,
              topic-led navigation, and a lightweight Now page that explains what
              I am focusing on at the moment.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              asChild
              className="h-14 rounded-full bg-fuchsia-500 px-7 text-xs font-black uppercase tracking-[0.22em] text-white hover:bg-fuchsia-400"
            >
              <Link href="/blog">
                Browse all posts <ArrowUpRight className="ml-2 size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="h-14 rounded-full border-border/40 bg-background/35 px-7 text-xs font-black uppercase tracking-[0.22em] hover:border-cyan-300/30 hover:bg-background/60"
            >
              <Link href="/now">Open Now page</Link>
            </Button>
          </div>

          <div className="space-y-4 border-t border-border/10 pt-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/45">
                Top topics
              </p>
              <a
                href={`mailto:${siteConfig.email}?subject=Topic%20idea`}
                className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-400/80 transition-colors hover:text-cyan-300"
              >
                Suggest a topic
              </a>
            </div>

            <div className="flex flex-wrap gap-2">
              {topTopics.map((topic) => (
                <Link
                  key={topic.slug}
                  href={`/topics/${topic.slug}`}
                  className="rounded-full border border-border/40 bg-background/35 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-fuchsia-500/30 hover:text-fuchsia-500"
                >
                  {topic.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          {featuredPost && (
            <article className="rounded-[2rem] border border-border/40 bg-background/45 p-5 sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/45">
                    Featured note
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">
                    {formatDisplayDate(featuredPost.date)}
                  </p>
                </div>
                <div className="rounded-full border border-fuchsia-500/20 bg-fuchsia-500/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-fuchsia-500">
                  {featuredPost.tags[0] ?? "general"}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-2xl font-black leading-tight tracking-tight">
                  {featuredPost.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground/75">
                  {featuredPost.summary}
                </p>
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-foreground transition-colors hover:text-fuchsia-500"
                >
                  Open featured post <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </article>
          )}

          <article className="rounded-[2rem] border border-border/40 bg-background/45 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/45">
                  Now
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">
                  Updated {formatDisplayDate(nowSnapshot.updatedAt)}
                </p>
              </div>
              <div className="rounded-full border border-cyan-400/20 bg-cyan-400/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-cyan-300">
                live context
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <h3 className="text-2xl font-black leading-tight tracking-tight">
                What I am working through right now
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground/75">
                {nowSnapshot.summary}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground/65">
                Latest archive update:{" "}
                {latestPost ? formatDisplayDate(latestPost.date) : "No posts yet"}.
              </p>
              <Link
                href="/now"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-foreground transition-colors hover:text-cyan-400"
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
