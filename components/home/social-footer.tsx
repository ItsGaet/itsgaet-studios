import { Github, Instagram, Linkedin, Mail, Twitter, Youtube } from "lucide-react"

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
    <footer className="grid gap-8 border-t border-border/60 pt-10">
      <div className="hero-fade-up flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Stay connected
          </p>
          <h2 className="text-2xl font-semibold tracking-tight">
            All my socials, in one place.
          </h2>
          <p className="max-w-lg text-sm text-muted-foreground">
            Direct links to the channels where I share updates, behind the
            scenes, and micro-analyses on digital products.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          (c) 2025 itsgaet. Thanks for reading.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {socialLinks.map((link, index) => {
          const Icon = link.icon
          const isExternal = link.href.startsWith("http")

          return (
            <a
              key={link.label}
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
              className="hero-fade-up group flex items-center gap-4 rounded-2xl border border-border/60 bg-card/60 px-4 py-4 transition hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-card"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="flex size-11 items-center justify-center rounded-xl border border-border/60 bg-background/80 text-foreground transition group-hover:border-fuchsia-500/40 group-hover:text-fuchsia-500">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{link.label}</p>
                <p className="text-xs text-muted-foreground">{link.handle}</p>
              </div>
            </a>
          )
        })}
      </div>
    </footer>
  )
}
