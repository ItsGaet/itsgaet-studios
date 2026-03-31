import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Linkedin,
  Mail,
  NotebookText,
} from "lucide-react";

import AuthorPortrait from "@/components/home/author-portrait";
import SocialFooter from "@/components/home/social-footer";
import { Button } from "@/components/ui/button";
import { absoluteUrl, siteConfig } from "@/lib/site";

const focusAreas = [
  "Automation and operational discipline",
  "Cloud, virtualization, and platform workflows",
  "Technical writing that comes from delivery work",
  "Products that need clarity more than noise",
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
        <div className="absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-[#b62d34]/12 blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-white/35 blur-[150px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-16 px-5 pb-24 pt-8 sm:px-8 lg:px-16 lg:pt-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_360px]">
          <div className="overflow-hidden rounded-[2.5rem] border border-[#d8c6bb] bg-[#fffaf6]/92 px-6 py-8 shadow-[0_32px_80px_-52px_rgba(31,23,21,0.34)] sm:px-10 sm:py-12">
            <div className="space-y-8">
              <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em]">
                <span className="rounded-full border border-[#b62d34]/20 bg-[#b62d34]/8 px-3 py-1.5 text-[#9f2028]">
                  Chi sono
                </span>
                <span className="rounded-full border border-[#d8c6bb] bg-[#f6ece5] px-3 py-1.5 text-[#5d4a45]">
                  vExpert 2026
                </span>
              </div>

              <div className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#8f5552]">
                  About the person behind the archive
                </p>
                <h1 className="font-display max-w-4xl text-4xl leading-[0.94] tracking-[-0.05em] text-[#1f1715] sm:text-6xl lg:text-7xl">
                  I build and document the systems work behind reliable digital products.
                </h1>
                <p className="max-w-3xl text-base leading-relaxed text-[#5f4c47] sm:text-lg">
                  I&apos;m {siteConfig.fullName}. I write about automation,
                  infrastructure, and delivery patterns that hold up outside demos.
                </p>
              </div>

              <div className="grid gap-4 border-t border-[#ddd1c8] pt-6 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8f5552]">
                    Base
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#2b201d]">{siteConfig.location}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8f5552]">
                    Focus
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#2b201d]">
                    Systems, automation, product delivery
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8f5552]">
                    Recognition
                  </p>
                  <p className="mt-2 text-sm font-semibold text-[#2b201d]">vExpert 2026</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  asChild
                  className="h-14 rounded-full px-7 text-xs font-black uppercase tracking-[0.22em]"
                >
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn profile <ArrowUpRight className="ml-2 size-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-14 rounded-full px-7 text-xs font-black uppercase tracking-[0.22em]"
                >
                  <Link href="/blog">Read the blog</Link>
                </Button>
              </div>
            </div>
          </div>

          <aside className="grid gap-5">
            <AuthorPortrait note={siteConfig.location} />

            <div className="rounded-[2rem] border border-[#d8c6bb] bg-[#fffaf6]/82 p-6">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl border border-[#b62d34]/20 bg-[#b62d34]/8 text-[#9f2028]">
                  <BadgeCheck className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8f5552]">
                    Credibility
                  </p>
                  <p className="mt-1 text-base font-semibold text-[#1f1715]">vExpert 2026</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-[#5f4c47]">
                The recognition matters because it reflects public technical
                contribution, not only private project work.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#d8c6bb] bg-[#fffaf6]/82 p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8f5552]">
                Reach me
              </p>
              <div className="mt-5 grid gap-3">
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-[#d8c6bb] bg-[#fffaf6] px-4 py-3 text-sm font-semibold text-[#2b201d] transition-colors hover:border-[#b62d34]/20 hover:text-[#b62d34]"
                >
                  <span className="flex items-center gap-3">
                    <Linkedin className="size-4" />
                    LinkedIn
                  </span>
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center justify-between rounded-2xl border border-[#d8c6bb] bg-[#fffaf6] px-4 py-3 text-sm font-semibold text-[#2b201d] transition-colors hover:border-[#b62d34]/20 hover:text-[#b62d34]"
                >
                  <span className="flex items-center gap-3">
                    <Mail className="size-4" />
                    Email
                  </span>
                  <ArrowUpRight className="size-4" />
                </a>
                <Link
                  href="/blog"
                  className="flex items-center justify-between rounded-2xl border border-[#d8c6bb] bg-[#fffaf6] px-4 py-3 text-sm font-semibold text-[#2b201d] transition-colors hover:border-[#b62d34]/20 hover:text-[#b62d34]"
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

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="rounded-[2.25rem] border border-[#d8c6bb] bg-[#fffaf6]/82 p-6 sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8f5552]">
              Focus areas
            </p>
            <div className="mt-6 grid gap-3">
              {focusAreas.map((item, index) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-[1.5rem] border border-[#e0d3c9] bg-[#fffaf6] px-4 py-4"
                >
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-[#b62d34]/20 bg-[#b62d34]/8 text-[10px] font-black uppercase tracking-[0.18em] text-[#9f2028]">
                    0{index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-[#4f3d38] sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.25rem] border border-[#d8c6bb] bg-[#fffaf6]/82 p-6 sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8f5552]">
              Short version
            </p>
            <div className="mt-6 space-y-5">
              <p className="text-base leading-relaxed text-[#4f3d38] sm:text-lg">
                I prefer writing from implementation work rather than theory.
                This archive is where migrations, system patterns, and
                production lessons become usable notes.
              </p>
              <p className="text-base leading-relaxed text-[#4f3d38] sm:text-lg">
                The goal is simple: publish fewer things, but make each one
                more durable and more useful.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Button asChild className="h-12 rounded-full px-6 text-[11px] font-black uppercase tracking-widest">
                  <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                    Open LinkedIn <ArrowUpRight className="ml-2 size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-full px-6 text-[11px] font-black uppercase tracking-widest">
                  <Link href="/blog">Open archive</Link>
                </Button>
              </div>
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
