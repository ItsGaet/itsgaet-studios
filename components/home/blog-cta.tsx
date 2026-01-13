import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function BlogCTA() {
  return (
    <section className="hero-fade-up relative overflow-hidden rounded-[28px] border border-border/60 bg-card/70 px-6 py-12 sm:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 top-0 h-40 w-40 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-fuchsia-500/15 blur-3xl" />
      </div>

      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <Badge variant="outline" className="w-fit border-amber-400/40">
            CTA
          </Badge>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Explore the community blog and build in the open.
          </h2>
          <p className="max-w-xl text-base text-muted-foreground">
            Deep technical dives, modular layouts, and operating notes. Every
            article, template, and the site itself is open source on GitHub.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
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
      </div>
    </section>
  )
}
