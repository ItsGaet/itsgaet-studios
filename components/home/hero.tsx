import Link from "next/link"
import { ArrowUpRight, Layers, Sparkles, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-border/60 bg-card/70 px-6 py-14 shadow-[0_25px_60px_-35px_rgba(217,70,239,0.45)] sm:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl hero-float" />
        <div className="absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl hero-float-slow" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(120deg,rgba(0,0,0,0.03)_0%,rgba(0,0,0,0.03)_30%,transparent_30%,transparent_100%)]" />
      </div>

      <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4 hero-fade-up">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl border border-border/70 bg-background/80 text-sm font-semibold">
                ig
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  itsgaet studio
                </p>
                <p className="text-base font-semibold">Notes and systems</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-3 py-1">
                <span className="size-2 rounded-full bg-emerald-500" />
                community open
              </span>
            </div>
          </div>

          <Badge
            variant="outline"
            className="w-fit border-fuchsia-500/50 text-foreground hero-fade-up hero-delay-1"
          >
            <Sparkles className="size-3" />
            open community blog
          </Badge>

          <div className="space-y-4 hero-fade-up hero-delay-2">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              I build digital products
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-rose-500 to-orange-400">
                and publish the work in the open.
              </span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              A community blog where notes, templates, and the site itself are
              open source. Fork it, improve it, and ship faster together.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 hero-fade-up hero-delay-3">
            <Button size="lg" asChild>
              <Link href="/blog">
                Explore the blog <ArrowUpRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a
                href="https://github.com/ItsGaet/itsgaet.github.io"
                target="_blank"
                rel="noreferrer"
              >
                View the repo
              </a>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground hero-fade-up hero-delay-4">
            <span>Open content. Open workflows. Open repo.</span>
            <a
              className="inline-flex items-center gap-2 text-foreground transition hover:text-fuchsia-300"
              href="mailto:gaetanoabbaticchio8@gmail.com"
            >
              Email me <ArrowUpRight className="size-4" />
            </a>
          </div>

          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-3 hero-fade-up hero-delay-4">
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em]">Focus</p>
              <p className="mt-2 text-base font-semibold text-foreground">
                Design engineering
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Modular components and reliable UI.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em]">Output</p>
              <p className="mt-2 text-base font-semibold text-foreground">
                Repeatable patterns
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Checklists ready for teams.
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background/70 p-4">
              <p className="text-xs uppercase tracking-[0.2em]">Cadence</p>
              <p className="mt-2 text-base font-semibold text-foreground">
                Steady momentum
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Technical notes every cycle.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 hero-fade-up hero-delay-2">
          <div className="rounded-3xl border border-border/60 bg-background/80 p-6 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span>Signal board</span>
              <span className="font-mono">2025</span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold">Operating stack</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A collection of principles that guide every release: speed,
              clarity, and reuse.
            </p>
            <div className="mt-6 grid gap-3">
              <div className="rounded-2xl border border-border/60 bg-card/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold">Design systems</p>
                  <Layers className="size-4 text-fuchsia-500" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Coherent libraries and clear guidelines.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold">Performance</p>
                  <Zap className="size-4 text-amber-500" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Lean builds and metrics under control.
                </p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-card/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold">Experiments</p>
                  <Sparkles className="size-4 text-cyan-500" />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Rapid prototypes to validate ideas.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-border/60 bg-card/70 px-5 py-4 text-sm text-muted-foreground">
            <span>Newsletter coming soon</span>
            <span className="font-semibold text-foreground">Stay tuned</span>
          </div>
        </div>
      </div>
    </section>
  )
}
