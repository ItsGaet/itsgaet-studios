import { ArrowUpRight, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { siteConfig } from "@/lib/site";

const socials = [
  { icon: Github, href: siteConfig.links.github, label: "Github" },
  { icon: Linkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: siteConfig.links.twitter, label: "Twitter" },
  { icon: Instagram, href: siteConfig.links.instagram, label: "Instagram" },
];

export default function SocialFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#FBF7F2] pb-12">
      {/* Top Section: CTA & Social Grid */}
      <div className="grid grid-cols-1 border-2 border-[#1A1A1A] lg:grid-cols-12">
        
        {/* Contact Text Block */}
        <div className="flex flex-col justify-between border-b-2 border-[#1A1A1A] p-8 lg:col-span-7 lg:border-b-0 lg:border-r-2 lg:p-12">
          <div className="space-y-8">
            <span className="inline-block bg-[#D2042D] px-3 py-1 text-[10px] font-black uppercase tracking-[0.4em] text-[#FBF7F2]">
              Transmission // End
            </span>
            <h2 className="font-serif text-5xl leading-[0.85] tracking-tighter text-[#1A1A1A] sm:text-7xl">
              Systems, notes, <br /> and the art of <span className="italic">shipping.</span>
            </h2>
            <p className="max-w-xl text-lg font-medium leading-tight text-[#4A4A4A]">
              For inquiries regarding infrastructure, automation patterns, or technical writing, 
              direct communication is preferred.
            </p>
          </div>

          <div className="mt-12 flex flex-col gap-0 border border-[#1A1A1A] sm:w-fit sm:flex-row">
            <a 
              href={`mailto:${siteConfig.email}`}
              className="group flex items-center justify-center gap-4 bg-[#1A1A1A] px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-[#FBF7F2] transition-colors hover:bg-[#D2042D]"
            >
              Email Direct
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a 
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center border-t border-[#1A1A1A] px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-[#1A1A1A] transition-colors hover:bg-[#D8C6BB]/20 sm:border-l sm:border-t-0"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* Social Grid: Shared Borders */}
        <div className="grid grid-cols-2 lg:col-span-5">
          {socials.map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className={`group flex flex-col items-center justify-center gap-4 p-8 text-center transition-colors hover:bg-[#1A1A1A] hover:text-[#FBF7F2] 
                ${index % 2 === 0 ? "border-r-2" : ""} 
                ${index < 2 ? "border-b-2" : ""} border-[#1A1A1A]`}
            >
              <social.icon className="size-6 text-[#D2042D] group-hover:text-[#FBF7F2] transition-transform duration-500 group-hover:scale-110" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                {social.label}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar: Metadata */}
      <div className="mt-12 flex flex-col items-start justify-between gap-8 px-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#1A1A1A] md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-6">
          <p>© {currentYear} ITSGAET_</p>
          <p className="text-[#D8C6BB]">EST. 2024 // ALL RIGHTS RESERVED</p>
        </div>

        <div className="flex flex-wrap items-center gap-10">
          <p className="flex items-center gap-2">
            <span className="size-2 bg-[#D2042D]" /> {siteConfig.location}
          </p>
          <a href="#top" className="underline decoration-2 underline-offset-8 transition-colors hover:text-[#D2042D]">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}