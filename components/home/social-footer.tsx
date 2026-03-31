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
      <div className="grid grid-cols-1 gap-8 border-t border-[#ddd1c8] pt-10 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="space-y-5">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8f5552]">
            Contact
          </p>
          <h2 className="font-display max-w-xl text-4xl leading-[0.96] tracking-[-0.04em] text-[#1f1715] sm:text-5xl">
            Clear systems, calm delivery, practical writing.
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-[#5f4c47] sm:text-base">
            If you want to talk about automation, infrastructure, or technical
            writing, LinkedIn or email is enough.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="h-12 rounded-full px-6 text-[11px] font-black uppercase tracking-widest">
              <a href={`mailto:${siteConfig.email}`}>
                Email me <ArrowUpRight className="ml-2 size-4" />
              </a>
            </Button>
            <Button variant="outline" asChild className="h-12 rounded-full px-6 text-[11px] font-black uppercase tracking-widest">
              <a href={siteConfig.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`group flex min-h-28 flex-col items-start justify-between rounded-[1.75rem] border border-[#d8c6bb] bg-[#fffaf6]/80 p-5 transition-all duration-300 hover:border-[#b62d34]/25 hover:bg-[#fff5ef] ${social.color}`}
            >
              <social.icon className="size-5 text-[#5f4c47] transition-transform duration-500 group-hover:scale-110" />
              <div className="space-y-1">
                <span className="block text-[9px] font-black uppercase tracking-[0.24em] text-[#1f1715]">
                  {social.label}
                </span>
                <span className="text-xs font-medium text-[#7c6762]">
                  Open profile
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-6 border-t border-[#ddd1c8] pt-8 text-[10px] font-bold uppercase tracking-[0.3em] text-[#7c6762] md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <p>© {currentYear} ITSGAET</p>
          <span className="hidden h-4 w-px bg-[#d8c6bb] sm:block" />
          <p className="text-[#8f5552]">Systems, notes, shipping</p>
        </div>

        <div className="flex flex-wrap items-center gap-5 sm:gap-8">
          <p>{siteConfig.location}</p>
          <a href="#top" className="transition-colors hover:text-[#b62d34]">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
