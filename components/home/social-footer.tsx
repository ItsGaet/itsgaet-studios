import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
  Youtube,
} from "lucide-react"

const socialLinks = [
  {
    label: "GitHub",
    handle: "@itsgaet",
    href: "https://github.com/itsgaet",
    icon: Github,
  },
  {
    label: "LinkedIn",
    handle: "/in/itsgaet",
    href: "https://www.linkedin.com/in/itsgaet",
    icon: Linkedin,
  },
  {
    label: "Instagram",
    handle: "@itsgaet",
    href: "https://instagram.com/itsgaet",
    icon: Instagram,
  },
  {
    label: "X",
    handle: "@itsgaet",
    href: "https://x.com/itsgaet",
    icon: Twitter,
  },
  {
    label: "YouTube",
    handle: "@itsgaet",
    href: "https://youtube.com/@itsgaet",
    icon: Youtube,
  },
  {
    label: "Email",
    handle: "gaetanoabbaticchio8@gmail.com",
    href: "mailto:gaetanoabbaticchio8@gmail.com",
    icon: Mail,
  },
]

export default function SocialFooter() {
  return (
    <footer className="relative overflow-hidden rounded-[32px] border border-border/60 bg-card/70">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-0 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl hero-float" />
        <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl hero-float-slow" />
        <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)]" />
        <div className="absolute -right-8 top-6 text-[120px] font-semibold tracking-tight text-white/5">
          SOCIAL
        </div>
      </div>

      <div className="relative grid gap-10 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 hero-fade-up">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            <span className="size-2 rounded-full bg-emerald-500" />
            Stay connected
          </div>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Choose a channel. I share the work in progress.
          </h2>
          <p className="max-w-xl text-base text-muted-foreground">
            Short updates, deeper breakdowns, and product notes. Pick the feed
            that fits your rhythm.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-4 py-2 text-sm font-semibold text-foreground transition hover:border-fuchsia-500/40 hover:text-fuchsia-300"
              href="mailto:gaetanoabbaticchio8@gmail.com"
            >
              Email me <ArrowUpRight className="size-4" />
            </a>
            <span className="text-xs text-muted-foreground">
              Fastest way to reach me.
            </span>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {socialLinks.map((link, index) => {
            const Icon = link.icon
            const isExternal = link.href.startsWith("http")

            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="hero-fade-up group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border/60 bg-background/40 px-4 py-4 transition hover:-translate-y-1 hover:border-foreground/30 hover:bg-background/60"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 [background-image:radial-gradient(circle_at_top_left,rgba(217,70,239,0.25),transparent_60%)]" />
                <span className="relative flex size-11 items-center justify-center rounded-xl border border-border/60 bg-background/80 text-foreground transition group-hover:border-fuchsia-500/40 group-hover:text-fuchsia-300">
                  <Icon className="size-5" />
                </span>
                <div className="relative">
                  <p className="text-sm font-semibold">{link.label}</p>
                  <p className="text-xs text-muted-foreground">{link.handle}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>

      <div className="relative flex flex-col gap-2 border-t border-border/60 px-6 pb-6 pt-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
        <span>(c) 2025 itsgaet.</span>
        <span>Thanks for reading.</span>
      </div>
    </footer>
  )
}
