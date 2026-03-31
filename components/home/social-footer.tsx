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
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0d1424]/88 p-8 backdrop-blur-md">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/35 to-transparent" />
            <div className="absolute -left-10 -bottom-10 size-64 rounded-full bg-amber-300/8 blur-[100px]" />
          </div>

          <div className="flex h-full flex-col justify-between gap-10">
            <div className="space-y-5">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-amber-200/80">
                <span className="size-1 rounded-full bg-amber-300" />
                Available for projects
              </div>
              <h2 className="font-display max-w-xl text-4xl leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl">
                Build something clearer, calmer, and harder to break.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-white/64 sm:text-base">
                Product engineering, technical direction, and systems thinking
                for teams that need clarity more than noise.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 rounded-full bg-amber-300 px-6 text-[11px] font-black uppercase tracking-widest text-slate-950 shadow-[0_18px_45px_-20px_rgba(251,191,36,0.6)] hover:bg-amber-200"
              >
                <a href={`mailto:${siteConfig.email}`}>
                  Get in touch <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                className="h-12 rounded-full border-white/12 bg-transparent px-6 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/5"
              >
                <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
                  Github profile
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`group relative flex min-h-32 flex-col items-start justify-between overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 transition-all duration-300 hover:border-amber-200/25 hover:bg-white/[0.06] ${social.color}`}
            >
              <social.icon className="size-6 text-white/82 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" />
              <div className="space-y-1">
                <span className="block text-[9px] font-black uppercase tracking-[0.24em] text-white/72 group-hover:text-white">
                  {social.label}
                </span>
                <span className="text-xs font-medium text-white/45">
                  Follow the trail
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-6 border-t border-white/8 pt-10 text-[10px] font-bold uppercase tracking-[0.3em] text-white/36 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <p>© {currentYear} ITSGAET</p>
          <span className="hidden h-4 w-px bg-white/12 sm:block" />
          <p className="text-amber-200/60">Systems, notes, shipping</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 sm:gap-8">
          <p className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-amber-300/80" />
            {siteConfig.location}
          </p>
          <a href="#top" className="transition-colors hover:text-amber-200">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
