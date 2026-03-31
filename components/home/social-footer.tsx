import { ArrowUpRight, Github, Instagram, Linkedin, Twitter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const socials = [
  {
    icon: Github,
    href: siteConfig.links.github,
    label: "Github",
    color: "hover:text-[#2ea44f]",
  },
  {
    icon: Linkedin,
    href: siteConfig.links.linkedin,
    label: "LinkedIn",
    color: "hover:text-[#0077b5]",
  },
  {
    icon: Twitter,
    href: siteConfig.links.twitter,
    label: "Twitter",
    color: "hover:text-fuchsia-500",
  },
  {
    icon: Instagram,
    href: siteConfig.links.instagram,
    label: "Instagram",
    color: "hover:text-[#e4405f]",
  },
];

export default function SocialFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full space-y-10">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/30 p-8 backdrop-blur-md lg:col-span-7">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
            <div className="absolute -left-10 -bottom-10 size-64 rounded-full bg-fuchsia-500/5 blur-[100px]" />
          </div>

          <div className="flex h-full flex-col justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-fuchsia-500">
                <span className="size-1 rounded-full bg-fuchsia-500" />
                Available for projects
              </div>
              <h2 className="max-w-md text-3xl font-black leading-tight tracking-tighter sm:text-5xl">
                Let&apos;s build something calm, useful, and technically honest.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-muted-foreground/70 sm:text-base">
                Product engineering, technical direction, and systems thinking
                for teams that need clarity more than noise.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-2xl bg-fuchsia-500 px-6 text-[11px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(217,70,239,0.2)] hover:bg-fuchsia-600"
              >
                <a href={`mailto:${siteConfig.email}`}>
                  Get in touch <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="h-12 rounded-2xl border-border/40 bg-background/40 px-6 text-[11px] font-black uppercase tracking-widest hover:bg-white/5"
              >
                <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                  Github profile
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:col-span-5">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`group relative flex min-h-32 flex-col items-start justify-between overflow-hidden rounded-[2rem] border border-border/40 bg-card/20 p-5 transition-all duration-300 hover:border-fuchsia-500/30 hover:bg-fuchsia-500/5 ${social.color}`}
            >
              <social.icon className="size-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
              <div className="space-y-1">
                <span className="block text-[9px] font-black uppercase tracking-[0.24em] text-muted-foreground group-hover:text-foreground">
                  {social.label}
                </span>
                <span className="text-xs font-medium text-muted-foreground/55">
                  Follow the trail
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-6 border-t border-border/10 pt-10 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <p>© {currentYear} ITSGAET</p>
          <span className="hidden h-4 w-px bg-border/40 sm:block" />
          <p className="text-fuchsia-500/50">Systems, notes, shipping</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 sm:gap-8">
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-500/50" />
            {siteConfig.location}
          </p>
          <a href="#top" className="transition-colors hover:text-fuchsia-500">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
