import type { Metadata } from "next";

import BlogCTA from "@/components/home/blog-cta";
import HomeHero from "@/components/home/hero";
import SocialFooter from "@/components/home/social-footer";
import { absoluteUrl, siteConfig } from "@/lib/site";
import { Separator } from "@/components/ui/separator";

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
      addressLocality: "Bari",
      addressCountry: "IT",
    },
  };

  return (
    <div id="top" className="relative min-h-screen bg-[#FBF7F2]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Background Layer: Solo griglia tecnica, niente blur */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]">
        <div className="absolute inset-0 [background-image:linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] [background-size:100px_100px]" />
      </div>

      <main className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-24 py-12 md:gap-32 md:py-20">
        
        {/* Hero Section: Il Manifesto */}
        <section className="reveal w-full px-4 md:px-8">
          <HomeHero />
        </section>

        {/* Archive Section: Separata da una linea netta */}
        <section className="reveal hero-delay-1 w-full px-4 md:px-8 [content-visibility:auto] [contain-intrinsic-size:1px_900px]">
          <div className="mb-16 flex items-center justify-between border-b-2 border-[#1A1A1A] pb-6">
            <h3 className="font-serif text-3xl font-medium tracking-tighter text-[#1A1A1A]">
              The Archive<span className="text-[#D2042D]">.</span>
            </h3>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D8C6BB]">
              Technical Logs // 001-050
            </span>
          </div>
          <BlogCTA />
        </section>

        {/* Footer Section: Chiusura del frame */}
        <section className="reveal hero-delay-2 w-full px-4 pb-12 md:px-8 [content-visibility:auto] [contain-intrinsic-size:1px_720px]">
          <div className="mb-16">
             <Separator variant="thick" />
          </div>
          <SocialFooter />
        </section>

      </main>

      {/* Decorative side coordinates (Optional technical detail) */}
      <div className="fixed right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[8px] font-black uppercase tracking-[0.8em] text-[#1A1A1A]/20 lg:block">
        41.2428° N, 16.5022° E // Bari_IT
      </div>
    </div>
  );
}
