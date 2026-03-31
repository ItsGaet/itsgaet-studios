import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import AuthorPortrait from "@/components/home/author-portrait";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const focusAreas = [
  {
    label: "Base",
    value: siteConfig.location,
  },
  {
    label: "Writes about",
    value: "Automation, infrastructure, product systems",
  },
  {
    label: "Recognition",
    value: "vExpert 2026",
  },
];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-[#dccdc3] bg-[#fffaf6]/92 px-5 py-6 shadow-[0_32px_80px_-52px_rgba(31,23,21,0.34)] sm:rounded-[3rem] sm:px-8 sm:py-8 lg:px-12 lg:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(182,45,52,0.1),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.34),transparent_26%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b62d34]/30 to-transparent" />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start lg:gap-16">
        <div className="space-y-10">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#8f5552]">
              <span className="inline-flex items-center rounded-full border border-[#b62d34]/20 bg-[#b62d34]/8 px-3 py-1.5 text-[#9f2028]">
                {siteConfig.fullName}
              </span>
              <span className="inline-flex items-center rounded-full border border-[#dccdc3] bg-[#f7eee8] px-3 py-1.5 text-[#5d4a45]">
                vExpert 2026
              </span>
            </div>

            <div className="max-w-4xl space-y-5">
              <p className="max-w-2xl text-xs font-semibold uppercase tracking-[0.28em] text-[#8f5552] sm:text-sm">
                Minimal blog and portfolio for systems work
              </p>

              <h1 className="font-display max-w-4xl text-5xl leading-[0.92] tracking-[-0.05em] text-[#1f1715] sm:text-7xl lg:text-[6.3rem]">
                Systems notes
                <br />
                for products that need
                <br />
                to stay reliable.
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-[#5f4c47] sm:text-lg">
                Technical writing, infrastructure patterns, and delivery notes from
                real implementation work.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-14 rounded-full px-7 text-xs font-black uppercase tracking-[0.22em]"
              >
                <Link href="/blog">
                  Open archive <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 rounded-full px-7 text-xs font-black uppercase tracking-[0.22em]"
              >
                <Link href="/chi-sono">About me</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 border-t border-[#ddd1c8] pt-6 sm:grid-cols-3">
            {focusAreas.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-[#8f5552]">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-[#2b201d]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <AuthorPortrait priority note="Bisceglie / Remote" />
      </div>
    </section>
  );
}
