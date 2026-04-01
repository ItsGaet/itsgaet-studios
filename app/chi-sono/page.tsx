import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Linkedin,
  Mail,
} from "lucide-react";

import AuthorPortrait from "@/components/home/author-portrait";
import SocialFooter from "@/components/home/social-footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/lib/site";

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
  // ... rest of metadata
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-[#FBF7F2]">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]">
        <div className="absolute inset-0 [background-image:linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] [background-size:100px_100px]" />
      </div>

      <main className="reveal relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-12 px-4 pb-24 pt-12 md:px-8 lg:pt-20">
        
        {/* Header Section: The Manifesto */}
        <section className="grid gap-12 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-8 space-y-10">
            <div className="flex flex-wrap items-center gap-4">
              <Badge variant="default">Chi sono</Badge>
              <Badge variant="outline">vExpert 2026</Badge>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D2042D]">
                [ Profile_Archive_01 ]
              </p>
              <h1 className="font-serif text-6xl font-medium leading-[0.85] tracking-tighter text-[#1A1A1A] sm:text-8xl">
                I build and document the <span className="italic">systems work</span> behind reliable products.
              </h1>
              <p className="max-w-2xl font-serif text-2xl leading-snug tracking-tight text-[#4A4A4A]">
                I&apos;m {siteConfig.fullName}. I write about automation,
                infrastructure, and delivery patterns that hold up outside demos.
              </p>
            </div>

            <div className="grid gap-8 border-t-2 border-[#1A1A1A] pt-10 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D8C6BB]">Base</p>
                <p className="text-sm font-black uppercase tracking-widest text-[#1A1A1A]">{siteConfig.location}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D8C6BB]">Focus</p>
                <p className="text-sm font-black uppercase tracking-widest text-[#1A1A1A]">Systems & Automation</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D8C6BB]">Recognition</p>
                <p className="text-sm font-black uppercase tracking-widest text-[#D2042D]">vExpert 2026</p>
              </div>
            </div>

            <div className="flex flex-col gap-0 border-2 border-[#1A1A1A] sm:w-fit sm:flex-row">
              <Button asChild variant="default" className="h-14 px-10">
                <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn Profile <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>
              <Button asChild variant="outline" className="h-14 px-10 border-t-2 sm:border-t-0 sm:border-l-2 border-[#1A1A1A]">
                <Link href="/blog">Read the Archive</Link>
              </Button>
            </div>
          </div>

          {/* Sidebar: Visuals & Contact */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="border-2 border-[#1A1A1A] bg-[#FBF7F2] p-1">
              <AuthorPortrait note={siteConfig.location} />
            </div>

            <div className="border-2 border-[#1A1A1A] p-8 space-y-6 bg-white">
              <div className="flex items-center gap-4">
                <BadgeCheck className="size-6 text-[#D2042D]" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1A1A]">Credibility</p>
              </div>
              <p className="text-sm leading-relaxed font-medium text-[#4A4A4A]">
                The vExpert recognition reflects public technical contribution and community engagement, moving beyond private project delivery.
              </p>
            </div>

            <div className="border-2 border-[#1A1A1A] divide-y-2 divide-[#1A1A1A]">
              <a href={siteConfig.links.linkedin} className="flex items-center justify-between p-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1A1A1A] hover:text-[#FBF7F2] transition-colors">
                <span className="flex items-center gap-3"><Linkedin className="size-4" /> LinkedIn</span>
                <ArrowUpRight className="size-4" />
              </a>
              <a href={`mailto:${siteConfig.email}`} className="flex items-center justify-between p-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#1A1A1A] hover:text-[#FBF7F2] transition-colors">
                <span className="flex items-center gap-3"><Mail className="size-4" /> Email</span>
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </aside>
        </section>

        <Separator variant="thick" />

        {/* Secondary Info: Focus Areas */}
        <section className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D2042D]">Focus Areas //</h2>
            <div className="grid gap-4">
              {focusAreas.map((item, index) => (
                <div key={item} className="flex items-center gap-6 border-2 border-[#1A1A1A] p-6 bg-white hover:bg-[#F4E7DE]/30 transition-colors">
                  <span className="font-serif text-3xl italic text-[#D8C6BB]">0{index + 1}</span>
                  <p className="text-sm font-black uppercase tracking-widest text-[#1A1A1A]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-2 border-[#1A1A1A] p-8 md:p-12 bg-[#1A1A1A] text-[#FBF7F2] space-y-8">
             <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D2042D]">The Philosophy //</h2>
             <p className="font-serif text-3xl leading-tight tracking-tight">
                I prefer writing from <span className="italic text-[#D8C6BB]">implementation work</span> rather than theory. This archive is where migrations and production lessons become usable notes.
             </p>
             <p className="text-sm font-medium leading-relaxed text-[#D8C6BB]">
                The goal is simple: publish fewer things, but make each one more durable and more useful for the long term.
             </p>
          </div>
        </section>

        <footer className="mt-12">
          <SocialFooter />
        </footer>
      </main>
    </div>
  );
}
