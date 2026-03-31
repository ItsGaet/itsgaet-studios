import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const principles = [
  "Systems before ornament",
  "Calm interfaces under real constraints",
  "Notes from infra, product, and delivery",
];

const focusAreas = [
  {
    label: "What I publish",
    value: "Architecture notes",
  },
  {
    label: "How I work",
    value: "Product-minded engineering",
  },
  {
    label: "Where",
    value: "Bisceglie / Remote",
  },
];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#050816] px-5 py-8 sm:rounded-[3rem] sm:px-8 sm:py-10 lg:min-h-[calc(100svh-9rem)] lg:px-12 lg:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(217,70,239,0.18),transparent_32%),linear-gradient(135deg,rgba(5,8,22,0.96),rgba(12,16,34,0.92))]" />
        <div className="absolute inset-y-0 right-0 w-[48%] border-l border-white/6 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_28%,transparent_72%,rgba(255,255,255,0.04))]" />
        <div className="absolute inset-y-0 right-[12%] hidden w-px bg-gradient-to-b from-transparent via-white/15 to-transparent lg:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent" />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-12">
        <div className="flex min-h-full flex-col justify-between gap-10">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.32em] text-fuchsia-300/90">
              <span className="inline-flex items-center rounded-full border border-fuchsia-400/20 bg-fuchsia-400/10 px-3 py-1.5">
                itsgaet studio
              </span>
              <span className="text-white/35">systems journal 2026</span>
            </div>

            <div className="max-w-4xl space-y-5">
              <p className="max-w-2xl text-sm font-medium uppercase tracking-[0.28em] text-cyan-200/70">
                Engineering notes for people shipping under real load
              </p>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.06em] text-white sm:text-7xl lg:text-[7rem]">
                Build systems
                <br />
                with a calm edge.
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-white/66 sm:text-lg">
                Technical writing, production runbooks, and product engineering
                patterns shaped by delivery work, not theory decks.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-14 rounded-full bg-fuchsia-500 px-7 text-xs font-black uppercase tracking-[0.22em] text-white shadow-[0_0_35px_rgba(217,70,239,0.28)] transition-transform hover:scale-[1.02] hover:bg-fuchsia-400"
              >
                <Link href="/blog">
                  Read the archive <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 rounded-full border-white/12 bg-white/4 px-7 text-xs font-black uppercase tracking-[0.22em] text-white/84 backdrop-blur-sm hover:border-cyan-300/30 hover:bg-white/8"
              >
                <a href={`mailto:${siteConfig.email}`}>Start a conversation</a>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 border-t border-white/8 pt-6 sm:grid-cols-3">
            {focusAreas.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-white/35">
                  {item.label}
                </p>
                <p className="text-sm font-semibold text-white/82">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex min-h-full flex-col justify-between rounded-[2rem] border border-white/8 bg-white/[0.03] p-5 backdrop-blur-md sm:p-6 lg:rounded-[2.5rem]">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.28em] text-white/35">
            <span>signal board</span>
            <span>active</span>
          </div>

          <div className="mt-8 space-y-5">
            {principles.map((principle, index) => (
              <div
                key={principle}
                className="hero-fade-up rounded-[1.5rem] border border-white/8 bg-black/15 px-4 py-4 text-white/82"
              >
                <div className="mb-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-cyan-200/60">
                  <span className="inline-flex size-7 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-[9px] text-cyan-200">
                    0{index + 1}
                  </span>
                  principle
                </div>
                <p className="text-lg font-semibold leading-snug">{principle}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-fuchsia-400/10 bg-[linear-gradient(135deg,rgba(217,70,239,0.12),rgba(34,211,238,0.04))] p-4 font-mono text-[11px] leading-relaxed text-white/64">
            <p>{`status = "writing / building / documenting"`}</p>
            <p className="text-white/38">{`surface = "blog, systems, runbooks"`}</p>
            <p className="text-emerald-300/70">{`signal = "stable"`}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
