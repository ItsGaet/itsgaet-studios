import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import AuthorPortrait from "@/components/home/author-portrait";
import { siteConfig } from "@/lib/site";

const focusAreas = [
  {
    label: "Current Base",
    value: siteConfig.location,
  },
  {
    label: "Focus Domains",
    value: "Automation, infrastructure, product systems",
  },
  {
    label: "Accreditation",
    value: "vExpert 2026",
  },
];

export default function HomeHero() {
  return (
    <section className="relative border-2 border-[#1A1A1A] bg-[#FBF7F2] p-8 md:p-16 lg:p-20">
      {/* Structural Accent Line */}
      <div className="absolute left-0 top-0 h-full w-2 bg-[#D2042D] hidden lg:block" />

      <div className="relative grid gap-16 lg:grid-cols-12 lg:items-start lg:gap-24">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-16">
          
          <div className="space-y-10">
            {/* Minimalist Badge System */}
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-[#1A1A1A] px-3 py-1 text-[10px] font-black uppercase tracking-[0.4em] text-[#FBF7F2]">
                {siteConfig.fullName}
              </span>
              <span className="border-2 border-[#1A1A1A] px-3 py-1 text-[10px] font-black uppercase tracking-[0.4em] text-[#1A1A1A]">
                VEXPERT // 2026
              </span>
            </div>

            <div className="space-y-6">
              <p className="text-xs font-black uppercase tracking-[0.5em] text-[#D2042D]">
                [ Systems Design & Architecture ]
              </p>

              <h1 className="font-serif text-6xl font-medium leading-[0.8] tracking-tighter text-[#1A1A1A] sm:text-8xl lg:text-[10rem]">
                Systems <br />
                Notes<span className="text-[#D2042D]">_</span>
              </h1>

              <p className="max-w-2xl font-serif text-2xl italic leading-tight tracking-tight text-[#4A4A4A] sm:text-3xl">
                Infrastructure patterns and delivery notes <br className="hidden sm:block" /> 
                extracted from real implementation work.
              </p>
            </div>

            {/* Brutalist Action Buttons */}
            <div className="flex flex-col gap-0 border border-[#1A1A1A] sm:w-fit sm:flex-row">
              <Link 
                href="/blog"
                className="group flex items-center justify-center gap-4 bg-[#1A1A1A] px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-[#FBF7F2] transition-colors hover:bg-[#D2042D]"
              >
                Open Archive
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <Link 
                href="/chi-sono"
                className="flex items-center justify-center px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-[#1A1A1A] border-t border-[#1A1A1A] sm:border-t-0 sm:border-l transition-colors hover:bg-[#D8C6BB]/20"
              >
                About the author
              </Link>
            </div>
          </div>

          {/* Footer Grid: Clean Data Points */}
          <div className="grid gap-8 border-t-2 border-[#1A1A1A] pt-10 sm:grid-cols-3">
            {focusAreas.map((item) => (
              <div key={item.label} className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D8C6BB]">
                  {item.label}
                </p>
                <p className="text-xs font-bold uppercase tracking-tight text-[#1A1A1A]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Content Area */}
        <div className="lg:col-span-4">
          <AuthorPortrait priority note="Bari // Remote" />
        </div>

      </div>

      {/* Background Decorative Element */}
      <div className="pointer-events-none absolute bottom-4 right-8 hidden -z-10 lg:block opacity-10">
         <span className="font-mono text-[12rem] font-black leading-none text-[#1A1A1A] select-none">
           01
         </span>
      </div>
    </section>
  );
}
