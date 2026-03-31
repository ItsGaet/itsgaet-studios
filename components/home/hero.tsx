import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import AuthorPortrait from "@/components/home/author-portrait";
import { Button } from "@/components/ui/button";
import { nowSnapshot } from "@/lib/now";
import { formatDisplayDate } from "@/lib/site";

const focusAreas = [
  {
    label: "What I publish",
    value: "Runbooks, architecture notes, system patterns",
  },
  {
    label: "Current focus",
    value: "Automation, reliability, technical writing",
  },
  {
    label: "Based in",
    value: "Bisceglie / Remote",
  },
];

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0b1220]/86 px-5 py-6 sm:rounded-[3rem] sm:px-8 sm:py-8 lg:px-12 lg:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_20%),linear-gradient(135deg,rgba(11,18,32,0.96),rgba(8,13,24,0.94))]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-start lg:gap-16">
        <div className="space-y-10">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-amber-100/80">
              <span className="inline-flex items-center rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1.5 text-amber-200">
                itsgaet
              </span>
              <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-white/70">
                vExpert 2026
              </span>
              <span className="text-white/35">
                updated {formatDisplayDate(nowSnapshot.updatedAt)}
              </span>
            </div>

            <div className="max-w-4xl space-y-5">
              <p className="max-w-2xl text-xs font-semibold uppercase tracking-[0.28em] text-white/48 sm:text-sm">
                Systems-minded product engineer writing from real delivery work
              </p>

              <h1 className="font-display max-w-4xl text-5xl leading-[0.92] tracking-[-0.05em] text-white sm:text-7xl lg:text-[6.3rem]">
                Minimal systems notes
                <br />
                with a portfolio spine.
              </h1>

              <p className="max-w-2xl text-base leading-relaxed text-white/62 sm:text-lg">
                I&apos;m Gaetano Abbaticchio. I write about architecture,
                automation, cloud infrastructure, and the quieter side of product
                engineering: the systems that keep shipping predictable.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-14 rounded-full bg-amber-300 px-7 text-xs font-black uppercase tracking-[0.22em] text-slate-950 shadow-[0_18px_45px_-20px_rgba(251,191,36,0.6)] transition-transform hover:scale-[1.02] hover:bg-amber-200"
              >
                <Link href="/blog">
                  Read the blog <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-14 rounded-full border-white/12 bg-transparent px-7 text-xs font-black uppercase tracking-[0.22em] text-white/84 backdrop-blur-sm hover:border-amber-200/30 hover:bg-white/6"
              >
                <Link href="/chi-sono">About me</Link>
              </Button>
            </div>

            <p className="text-sm leading-relaxed text-white/48">
              Current note: {nowSnapshot.summary}
            </p>
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

        <AuthorPortrait priority note={`Updated ${formatDisplayDate(nowSnapshot.updatedAt)}`} />
      </div>
    </section>
  );
}
