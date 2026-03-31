import type { Metadata } from "next";

import BlogCTA from "@/components/home/blog-cta";
import HomeHero from "@/components/home/hero";
import SocialFooter from "@/components/home/social-footer";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.fullName,
  description:
    "Gaetano Abbaticchio shares technical notes, runbooks, and systems patterns from real delivery work across automation, cloud infrastructure, and product engineering.",
  alternates: {
    canonical: absoluteUrl("/"),
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
    },
  },
  openGraph: {
    title: siteConfig.fullName,
    description:
      "Gaetano Abbaticchio shares technical notes, runbooks, and systems patterns from real delivery work across automation, cloud infrastructure, and product engineering.",
    url: absoluteUrl("/"),
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  twitter: {
    title: siteConfig.fullName,
    description:
      "Gaetano Abbaticchio shares technical notes, runbooks, and systems patterns from real delivery work across automation, cloud infrastructure, and product engineering.",
    images: [absoluteUrl(siteConfig.ogImage)],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.fullName,
    description: siteConfig.description,
    email: siteConfig.email,
    url: siteConfig.url,
    jobTitle: siteConfig.role,
    sameAs: Object.values(siteConfig.links),
    award: siteConfig.credentials,
    knowsAbout: siteConfig.keywords,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bisceglie",
      addressCountry: "IT",
    },
  };

  return (
    <div
      id="top"
      className="relative min-h-screen overflow-hidden bg-background [background-image:radial-gradient(circle_at_center,rgba(217,70,239,0.03),transparent_70%)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute -top-32 right-[-5%] h-[600px] w-[600px] rounded-full bg-fuchsia-500/10 blur-[180px] animate-pulse duration-[10s]" />
        <div className="absolute top-[30%] left-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-fuchsia-600/5 blur-[200px]" />
        <div className="absolute inset-0 opacity-[0.02] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:100px_100px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-20 px-5 py-6 sm:px-8 md:gap-28 md:py-12 lg:px-16 lg:py-16">
        <section className="w-full">
          <HomeHero />
        </section>

        <section className="relative w-full">
          <div className="mb-10 flex items-center gap-4 opacity-20 sm:mb-12">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-foreground" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">
              Archive and current signal
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-foreground" />
          </div>
          <BlogCTA />
        </section>

        <section className="w-full pb-8">
          <SocialFooter />
        </section>
      </main>

      <div className="fixed right-6 top-1/2 hidden -translate-y-1/2 rotate-90 flex-col items-center gap-4 md:flex">
        <span className="h-12 w-px bg-border/40" />
        <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted-foreground/30">
          Scroll to explore
        </span>
      </div>
    </div>
  );
}
