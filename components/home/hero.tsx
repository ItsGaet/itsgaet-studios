import Link from "next/link";
import { ArrowUpRight, Dot } from "lucide-react";

import { Button } from "@/components/ui/button";
import { nowSnapshot } from "@/lib/now";
import { formatDisplayDate } from "@/lib/site";

const principles = [
  "Document what survived production",
  "Prefer calm systems over clever demos",
  "Turn delivery work into usable notes",
];

const focusAreas = [
  {
    label: "What I publish",
    value: "Runbooks, field notes, architecture patterns",
  },
  {
    label: "Current mode",
    value: "Automation, reliability, editorial depth",
  },
  {
    label: "Based in",
    value: "Bisceglie / Remote",
  },
];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b1220]/92 px-5 py-6 sm:rounded-[3rem] sm:px-8 sm:py-8 lg:min-h-[calc(100svh-9rem)] lg:px-12 lg:py-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.12),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_22%),linear-gradient(135deg,rgba(11,18,32,0.96),rgba(8,13,24,0.94))]" />
        <div className="absolute inset-y-0 right-0 hidden w-[42%] border-l border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_30%,rgba(255,255,255,0.02))] lg:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-14">
        <div className="flex min-h-full flex-col justify-between gap-12">
          <div className="space-y-10">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-amber-100/80">
              <span className="inline-flex items-center rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-amber-200">
                itsgaet studio
              </span>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/70">
                vExpert 2026
              </span>
              <span className="text-white/35">
                updated {formatDisplayDate(nowSnapshot.updatedAt)}
              </span>
            </div>

            <div className="max-w-4xl space-y-6">
              <p className="max-w-2xl text-xs font-semibold uppercase tracking-[0.28em] text-white/52 sm:text-sm">
                Gaetano Abbaticchio on architecture, automation, and production
                discipline
              </p>

              <h1 className="font-display max-w-5xl text-5xl leading-[0.9] tracking-[-0.045em] text-white sm:text-7xl lg:text-[7.25rem]">
                I document
                <br />
                the systems work
                <br />
                behind reliable products.
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-white/68 sm:text-lg">
                This is where I turn delivery work into technical notes, calmer
                runbooks, and sharper product engineering patterns that stay useful
                after launch.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-14 rounded-full bg-amber-300 px-7 text-xs font-black uppercase tracking-[0.22em] text-slate-950 shadow-[0_18px_45px_-20px_rgba(251,191,36,0.6)] transition-transform hover:scale-[1.02] hover:bg-amber-200"
              >
                <Link href="/blog">
                  Read the archive <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 rounded-full border-white/12 bg-transparent px-7 text-xs font-black uppercase tracking-[0.22em] text-white/84 backdrop-blur-sm hover:border-amber-200/30 hover:bg-white/6"
              >
                <Link href="/now">See what&apos;s current</Link>
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
          <div className="flex items-center justify-between border-b border-white/8 pb-4 text-[10px] font-black uppercase tracking-[0.28em] text-white/38">
            <span>From the desk</span>
            <span>active signal</span>
          </div>

          <div className="mt-8 space-y-4">
            {principles.map((principle, index) => (
              <div
                key={principle}
                className="hero-fade-up rounded-[1.5rem] border border-white/8 bg-black/15 px-4 py-4 text-white/82"
              >
                <div className="mb-3 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-amber-100/58">
                  <span className="inline-flex size-7 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/10 text-[9px] text-amber-200">
                    0{index + 1}
                  </span>
                  editorial rule
                </div>
                <p className="font-display text-2xl leading-snug tracking-[-0.03em]">
                  {principle}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-white/8 bg-white/[0.02] p-4 text-sm leading-relaxed text-white/64">
            <div className="mb-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.28em] text-white/38">
              <Dot className="size-4 text-amber-300" />
              Current note
            </div>
            <p className="text-white/74">{nowSnapshot.summary}</p>
            <p className="mt-3 font-mono text-[11px] text-white/38">
              {`status = "${nowSnapshot.statusLine}"`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
