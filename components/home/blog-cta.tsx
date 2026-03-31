import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/posts";
import { formatDisplayDate, siteConfig } from "@/lib/site";

export default function BlogCTA() {
  const [latestPost] = getAllPosts();

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
              Resource archive
            </p>
            <h2 className="max-w-3xl text-3xl font-black leading-[0.95] tracking-[-0.04em] sm:text-5xl">
              Writing that stays close to production reality.
            </h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground/75 sm:text-lg">
              Practical notes on delivery systems, technical decisions, and the
              boring details that keep products reliable.
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
              variant="outline"
              asChild
              className="h-14 rounded-full border-border/40 bg-background/35 px-7 text-xs font-black uppercase tracking-[0.22em] hover:border-cyan-300/30 hover:bg-background/60"
            >
              <a href={`mailto:${siteConfig.email}?subject=Topic%20idea`}>
                Suggest a topic
              </a>
            </Button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-border/40 bg-background/45 p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/45">
                Latest note
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400/80">
                {latestPost ? formatDisplayDate(latestPost.date) : "No posts yet"}
              </p>
            </div>
            <div className="rounded-full border border-fuchsia-500/20 bg-fuchsia-500/8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-fuchsia-500">
              {latestPost?.tags[0] ?? "general"}
            </div>
          </div>

          {latestPost && (
            <div className="mt-6 space-y-4">
              <h3 className="text-2xl font-black leading-tight tracking-tight">
                {latestPost.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground/75">
                {latestPost.summary}
              </p>
              <Link
                href={`/blog/${latestPost.slug}`}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-foreground transition-colors hover:text-fuchsia-500"
              >
                Open latest post <ArrowUpRight className="size-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
