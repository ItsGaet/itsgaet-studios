import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  Linkedin,
  Mail,
  NotebookText,
} from "lucide-react";

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
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-amber-300/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-white/5 blur-[150px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-16 px-5 pb-24 pt-8 sm:px-8 lg:px-16 lg:pt-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_360px]">
          <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d1424]/86 px-6 py-8 backdrop-blur-md sm:px-10 sm:py-12">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em]">
                <span className="rounded-full border border-amber-300/20 bg-amber-300/8 px-3 py-1.5 text-amber-200">
                  Chi sono
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/72">
                  vExpert 2026
                </span>
              </div>

              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/48">
                  About the person behind the notes
                </p>
                <h1 className="font-display max-w-4xl text-4xl leading-[0.94] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                  I&apos;m {siteConfig.fullName}, and this blog is my operating
                  log for modern systems work.
                </h1>
                <p className="max-w-3xl text-base leading-relaxed text-white/64 sm:text-lg">
                  I write about architecture, automation, cloud infrastructure,
                  and product engineering with a bias toward clarity, operational
                  realism, and useful documentation.
                </p>
              </div>

              <div className="grid gap-4 border-t border-white/8 pt-6 sm:grid-cols-3">
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
                  className="h-14 rounded-full bg-amber-300 px-7 text-xs font-black uppercase tracking-[0.22em] text-slate-950 hover:bg-amber-200"
                >
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn profile <ArrowUpRight className="ml-2 size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-14 rounded-full border-white/12 bg-transparent px-7 text-xs font-black uppercase tracking-[0.22em] text-white hover:border-amber-200/30 hover:bg-white/6"
                >
                  <Link href="/blog">Read the blog</Link>
                </Button>
              </div>
            </div>
          </div>

          <aside className="grid gap-5">
            <div className="rounded-[2rem] border border-white/10 bg-[#0d1424]/72 p-6 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/10 text-amber-200">
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

            <div className="rounded-[2rem] border border-white/10 bg-[#0d1424]/72 p-6 backdrop-blur-md">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground/45">
                Reach me
              </p>
              <div className="mt-5 grid gap-3">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold transition-colors hover:border-amber-200/20 hover:text-amber-100"
                >
                  <span className="flex items-center gap-3">
                    <Linkedin className="size-4" />
                    LinkedIn
                  </span>
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold transition-colors hover:border-amber-200/20 hover:text-amber-100"
                >
                  <span className="flex items-center gap-3">
                    <Mail className="size-4" />
                    Email
                  </span>
                  <ArrowUpRight className="size-4" />
                </a>
                <Link
                  href="/blog"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold transition-colors hover:border-amber-200/20 hover:text-amber-100"
                >
                  <span className="flex items-center gap-3">
                    <NotebookText className="size-4" />
                    Archive
                  </span>
                  <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href="/now"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold transition-colors hover:border-amber-200/20 hover:text-amber-100"
                >
                  <span className="flex items-center gap-3">
                    <Activity className="size-4" />
                    Now
                  </span>
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="rounded-[2.25rem] border border-white/10 bg-[#0d1424]/72 p-6 backdrop-blur-md sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-amber-200/80">
              Focus areas
            </p>
            <div className="mt-6 grid gap-3">
              {focusAreas.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-4"
                >
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10 text-[10px] font-black uppercase tracking-[0.18em] text-amber-200">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-white/72 sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.25rem] border border-white/10 bg-[#0d1424]/72 p-6 backdrop-blur-md sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-amber-200/80">
              Why this blog exists
            </p>
            <div className="mt-6 grid gap-4">
              {principles.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
                >
                  <h2 className="font-display text-2xl tracking-tight text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
                    {item.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[2.5rem] border border-white/10 bg-[#0d1424]/72 px-6 py-8 backdrop-blur-md sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200/80">
                Next step
              </p>
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-5xl">
                If the writing resonates, start with LinkedIn or the archive.
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-14 rounded-full bg-amber-300 px-7 text-xs font-black uppercase tracking-[0.22em] text-slate-950 hover:bg-amber-200"
              >
                <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                  Open LinkedIn <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-14 rounded-full border-white/12 bg-white/[0.03] px-7 text-xs font-black uppercase tracking-[0.22em] text-white hover:border-amber-200/30 hover:bg-white/[0.06]"
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
