import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Linkedin, Mail, NotebookText } from "lucide-react";

import SocialFooter from "@/components/home/social-footer";
import { Button } from "@/components/ui/button";
import { absoluteUrl, siteConfig } from "@/lib/site";

const focusAreas = [
  "Systems and platform thinking",
  "Automation with operational discipline",
  "Cloud, virtualization, and delivery workflows",
  "Calm product engineering under real constraints",
];

const principles = [
  {
    title: "Write from delivery, not from theory",
    body: "This blog is where I turn implementation work, migration pain, and production lessons into usable notes.",
  },
  {
    title: "Prefer clear systems over clever demos",
    body: "I care about resilient foundations, predictable operations, and interfaces that stay usable when the project gets complex.",
  },
  {
    title: "Community validation matters",
    body: "Being a vExpert 2026 matters because it reflects public contribution, not just private execution.",
  },
];

export const metadata: Metadata = {
  title: "Chi sono",
  description:
    "About Gaetano Abbaticchio, the person behind itsgaet: systems-minded product engineer, technical writer, and vExpert 2026.",
  alternates: {
    canonical: absoluteUrl("/chi-sono"),
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
    },
  },
  openGraph: {
    title: `Chi sono | ${siteConfig.name}`,
    description:
      "About Gaetano Abbaticchio, the person behind itsgaet: systems-minded product engineer, technical writer, and vExpert 2026.",
    url: absoluteUrl("/chi-sono"),
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  twitter: {
    title: `Chi sono | ${siteConfig.name}`,
    description:
      "About Gaetano Abbaticchio, the person behind itsgaet: systems-minded product engineer, technical writer, and vExpert 2026.",
    images: [absoluteUrl(siteConfig.ogImage)],
  },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    alternateName: siteConfig.name,
    jobTitle: siteConfig.role,
    description: siteConfig.description,
    email: siteConfig.email,
    url: absoluteUrl("/chi-sono"),
    sameAs: Object.values(siteConfig.links),
    award: siteConfig.credentials,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bisceglie",
      addressCountry: "IT",
    },
  };

  return (
    <div className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-cyan-500/8 blur-[150px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-16 px-5 pb-24 pt-8 sm:px-8 lg:px-16 lg:pt-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_360px]">
          <div className="overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/30 px-6 py-8 backdrop-blur-md sm:px-10 sm:py-12">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em]">
                <span className="rounded-full border border-fuchsia-500/20 bg-fuchsia-500/8 px-3 py-1.5 text-fuchsia-500">
                  Chi sono
                </span>
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/8 px-3 py-1.5 text-cyan-300">
                  vExpert 2026
                </span>
              </div>

              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground/55">
                  About the person behind the notes
                </p>
                <h1 className="max-w-4xl text-4xl font-black leading-[0.94] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
                  I&apos;m {siteConfig.fullName}, and this blog is my operating
                  log for modern systems work.
                </h1>
                <p className="max-w-3xl text-base leading-relaxed text-muted-foreground/76 sm:text-lg">
                  I write about architecture, automation, cloud infrastructure,
                  and product engineering with a bias toward clarity, operational
                  realism, and useful documentation.
                </p>
              </div>

              <div className="grid gap-4 border-t border-border/10 pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground/45">
                    Base
                  </p>
                  <p className="mt-2 text-sm font-semibold">{siteConfig.location}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground/45">
                    Focus
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    Systems, automation, product delivery
                  </p>
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
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn profile <ArrowUpRight className="ml-2 size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-14 rounded-full border-border/40 bg-background/35 px-7 text-xs font-black uppercase tracking-[0.22em] hover:border-cyan-300/30 hover:bg-background/60"
                >
                  <Link href="/blog">Read the blog</Link>
                </Button>
              </div>
            </div>
          </div>

          <aside className="grid gap-5">
            <div className="rounded-[2rem] border border-border/40 bg-card/30 p-6 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-500">
                  <BadgeCheck className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground/45">
                    Credibility
                  </p>
                  <p className="mt-1 text-base font-semibold">vExpert 2026</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground/72">
                The vExpert title reflects community contribution around the
                VMware ecosystem and strengthens the technical context behind
                what gets published here.
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
                  href="/blog"
                  className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/35 px-4 py-3 text-sm font-semibold transition-colors hover:border-white/20 hover:text-foreground"
                >
                  <span className="flex items-center gap-3">
                    <NotebookText className="size-4" />
                    Archive
                  </span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="rounded-[2.25rem] border border-border/40 bg-card/25 p-6 backdrop-blur-md sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-fuchsia-500">
              Focus areas
            </p>
            <div className="mt-6 grid gap-3">
              {focusAreas.map((item, index) => (
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
              Why this blog exists
            </p>
            <div className="mt-6 grid gap-4">
              {principles.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-border/30 bg-background/35 p-5"
                >
                  <h2 className="text-xl font-black tracking-tight">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground/76 sm:text-base">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-border/40 bg-card/25 px-6 py-8 backdrop-blur-md sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-500">
                Next step
              </p>
              <h2 className="text-2xl font-black tracking-tight sm:text-4xl">
                If the writing resonates, start with LinkedIn or the archive.
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-14 rounded-full bg-fuchsia-500 px-7 text-xs font-black uppercase tracking-[0.22em] text-white hover:bg-fuchsia-400"
              >
                <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                  Open LinkedIn <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 rounded-full border-border/40 bg-background/35 px-7 text-xs font-black uppercase tracking-[0.22em] hover:border-cyan-300/30 hover:bg-background/60"
              >
                <Link href="/blog">Open archive</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="pt-2">
          <SocialFooter />
        </section>
      </main>
    </div>
  );
}
