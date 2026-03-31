"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, Mail, UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

type NavItem = {
  label: string;
  href: string;
  icon: typeof Home;
  external?: boolean;
};

const primaryNavItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Blog", href: "/blog", icon: BookOpen },
  { label: "Chi sono", href: "/chi-sono", icon: UserRound },
];

export default function FloatingSidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation: Sharp Top Bar */}
      <header className="fixed inset-x-0 top-0 z-[100] hidden border-b-2 border-[#1A1A1A] bg-[#FBF7F2] px-6 py-4 md:block">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <Link
            href="/"
            className="font-serif text-2xl font-medium tracking-tighter text-[#1A1A1A]"
          >
            itsgaet<span className="text-[#D2042D]">.</span>
          </Link>

          <nav className="flex items-center gap-8">
            {primaryNavItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative text-[10px] font-black uppercase tracking-[0.3em] transition-colors",
                    isActive
                      ? "text-[#D2042D] after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-[#D2042D]"
                      : "text-[#1A1A1A] hover:text-[#D2042D]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1A1A] transition-colors hover:text-[#D2042D]"
            >
              Github
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="border-2 border-[#1A1A1A] bg-[#1A1A1A] px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#FBF7F2] transition-colors hover:bg-[#D2042D] hover:border-[#D2042D]"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Navigation: Solid Bottom Dock */}
      <nav className="fixed bottom-0 left-0 z-[100] flex w-full border-t-2 border-[#1A1A1A] bg-[#FBF7F2] md:hidden">
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-1 py-4 transition-colors",
                isActive 
                  ? "bg-[#1A1A1A] text-[#FBF7F2]" 
                  : "text-[#1A1A1A] active:bg-[#D8C6BB]/20"
              )}
            >
              <Icon className="size-5" />
              <span className="text-[8px] font-black uppercase tracking-widest">
                {item.label}
              </span>
            </Link>
          );
        })}

        <a
          href={`mailto:${siteConfig.email}`}
          className="flex flex-1 flex-col items-center justify-center gap-1 border-l-2 border-[#1A1A1A] py-4 text-[#D2042D]"
        >
          <Mail className="size-5" />
          <span className="text-[8px] font-black uppercase tracking-widest">Mail</span>
        </a>
      </nav>
    </>
  );
}
