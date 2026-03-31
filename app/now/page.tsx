import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CircleDot, Linkedin, Mail, NotebookPen } from "lucide-react";

import SocialFooter from "@/components/home/social-footer";
import { Button } from "@/components/ui/button";
import { nowSnapshot } from "@/lib/now";
import { absoluteUrl, formatDisplayDate, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Now",
  description:
    "What Gaetano Abbaticchio is focused on right now across writing, systems work, and technical direction.",
  alternates: {
    canonical: absoluteUrl("/now"),
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
    },
  },
  openGraph: {
    title: `Now | ${siteConfig.name}`,
    description:
      "What Gaetano Abbaticchio is focused on right now across writing, systems work, and technical direction.",
    url: absoluteUrl("/now"),
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  twitter: {
    title: `Now | ${siteConfig.name}`,
    description:
      "What Gaetano Abbaticchio is focused on right now across writing, systems work, and technical direction.",
    images: [absoluteUrl(siteConfig.ogImage)],
  },
};

export default function NowPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `Now | ${siteConfig.fullName}`,
    description: nowSnapshot.summary,
    url: absoluteUrl("/now"),
    dateModified: `${nowSnapshot.updatedAt}T00:00:00.000Z`,
    about: {
      "@type": "Person",
      name: siteConfig.fullName,
      alternateName: siteConfig.name,
      jobTitle: siteConfig.role,
      award: siteConfig.credentials,
      sameAs: Object.values(siteConfig.links),
    },
  };

  return (
    <div className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute right-0 top-0 h-[460px] w-[460px] rounded-full bg-fuchsia-500/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-cyan-500/8 blur-[140px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-16 px-5 pb-24 pt-8 sm:px-8 lg:px-16 lg:pt-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_360px]">
          <div className="overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/30 px-6 py-8 backdrop-blur-md sm:px-10 sm:py-12">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em]">
                <span className="rounded-full border border-fuchsia-500/20 bg-fuchsia-500/8 px-3 py-1.5 text-fuchsia-500">
                  Now
                </span>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/8 px-3 py-1.5 text-cyan-300">
                  Updated {formatDisplayDate(nowSnapshot.updatedAt)}
                </span>
              </div>

              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground/55">
                  A lightweight snapshot of what is active right now
                </p>
                <h1 className="max-w-4xl text-4xl font-black leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                  What I am building, documenting, and thinking through at the
                  moment.
                </h1>
                <p className="max-w-3xl text-base leading-relaxed text-muted-foreground/76 sm:text-lg">
                  {nowSnapshot.summary}
                </p>
              </div>

              <div className="grid gap-4 border-t border-border/10 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground/45">
                    Status
                  </p>
                  <p className="mt-2 text-sm font-semibold">{nowSnapshot.statusLine}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground/45">
                    Base
                  </p>
                  <p className="mt-2 text-sm font-semibold">{siteConfig.location}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground/45">
                    Recognition
                  </p>
                  <p className="mt-2 text-sm font-semibold">vExpert 2026</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-14 rounded-full bg-fuchsia-500 px-7 text-xs font-black uppercase tracking-[0.22em] text-white hover:bg-fuchsia-400"
                >
                  <Link href="/blog">
                    Read the archive <ArrowUpRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-14 rounded-full border-border/40 bg-background/35 px-7 text-xs font-black uppercase tracking-[0.22em] hover:border-cyan-300/30 hover:bg-background/60"
                >
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn profile <ArrowUpRight className="ml-2 size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <aside className="grid gap-5">
            <div className="rounded-[2rem] border border-border/40 bg-card/30 p-6 backdrop-blur-md">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground/45">
                Current direction
              </p>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground/72">
                The site is becoming more editorially structured: topic pages,
                stronger post discovery, and clearer author context around the
                technical writing.
              </p>
            </div>

            <div className="rounded-[2rem] border border-border/40 bg-card/30 p-6 backdrop-blur-md">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground/45">
                Reach me
              </p>
              <div className="mt-5 grid gap-3">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/35 px-4 py-3 text-sm font-semibold transition-colors hover:border-cyan-300/30 hover:text-cyan-300"
                >
                  <span className="flex items-center gap-3">
                    <Linkedin className="size-4" />
                    LinkedIn
                  </span>
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/35 px-4 py-3 text-sm font-semibold transition-colors hover:border-fuchsia-500/30 hover:text-fuchsia-500"
                >
                  <span className="flex items-center gap-3">
                    <Mail className="size-4" />
                    Email
                  </span>
                  <ArrowUpRight className="size-4" />
                </a>
                <Link
                  href="/chi-sono"
                  className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/35 px-4 py-3 text-sm font-semibold transition-colors hover:border-white/20 hover:text-foreground"
                >
                  <span className="flex items-center gap-3">
                    <NotebookPen className="size-4" />
                    Chi sono
                  </span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2.25rem] border border-border/40 bg-card/25 p-6 backdrop-blur-md sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-fuchsia-500">
              Current focus
            </p>
            <div className="mt-6 grid gap-3">
              {nowSnapshot.currentFocus.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-[1.5rem] border border-border/30 bg-background/35 px-4 py-4"
                >
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-[10px] font-black uppercase tracking-[0.18em] text-cyan-300">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-foreground/84 sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.25rem] border border-border/40 bg-card/25 p-6 backdrop-blur-md sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-fuchsia-500">
              Writing into the site
            </p>
            <div className="mt-6 grid gap-4">
              {nowSnapshot.writingNow.map((item) => (
                <article
                  key={item}
                  className="rounded-[1.5rem] border border-border/30 bg-background/35 p-5"
                >
                  <div className="flex items-start gap-3">
                    <CircleDot className="mt-1 size-4 text-cyan-300" />
                    <p className="text-sm leading-relaxed text-muted-foreground/76 sm:text-base">
                      {item}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="rounded-[2.25rem] border border-border/40 bg-card/25 p-6 backdrop-blur-md sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-fuchsia-500">
              Open to talk about
            </p>
            <div className="mt-6 grid gap-4">
              {nowSnapshot.openTo.map((item) => (
                <article
                  key={item}
                  className="rounded-[1.5rem] border border-border/30 bg-background/35 p-5"
                >
                  <p className="text-sm leading-relaxed text-muted-foreground/76 sm:text-base">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2.25rem] border border-border/40 bg-card/25 p-6 backdrop-blur-md sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-fuchsia-500">
              Next move
            </p>
            <div className="mt-6 space-y-4">
              <h2 className="text-3xl font-black tracking-tight">
                Follow the archive or reach out directly.
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground/72 sm:text-base">
                If the blog resonates, the best next step is simple: read the
                archive, connect on LinkedIn, or send a note when the topic is close
                to systems, automation, or delivery work.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-border/40 bg-background/35 px-6 text-xs font-black uppercase tracking-[0.22em] hover:border-cyan-300/30 hover:bg-background/60"
                >
                  <Link href="/blog">Open archive</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-border/40 bg-background/35 px-6 text-xs font-black uppercase tracking-[0.22em] hover:border-fuchsia-500/30 hover:bg-background/60"
                >
                  <a href={`mailto:${siteConfig.email}`}>Send an email</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-8">
          <SocialFooter />
        </section>
      </main>
    </div>
  );
}
