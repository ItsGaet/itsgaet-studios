"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Github, Home, Mail, UserRound } from "lucide-react";

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

const desktopOnlyItems: NavItem[] = [
  {
    label: "Github",
    href: siteConfig.links.github,
    external: true,
    icon: Github,
  },
];

export default function FloatingSidebar() {
  const pathname = usePathname();

  return (
    <>
      <header className="fixed inset-x-0 top-4 z-[100] hidden px-5 md:block">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between rounded-full border border-[#d8c6bb]/90 bg-[#fffaf6]/92 px-4 py-3 shadow-[0_18px_45px_-36px_rgba(31,23,21,0.35)] backdrop-blur-xl">
          <Link
            href="/"
            className="font-display text-xl tracking-[-0.04em] text-[#1f1715]"
          >
            itsgaet
          </Link>

          <nav className="flex items-center gap-1">
            {primaryNavItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] transition-colors",
                    isActive
                      ? "bg-[#b62d34] text-[#fff9f4]"
                      : "text-[#7a6660] hover:text-[#1f1715]"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {desktopOnlyItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#7a6660] transition-colors hover:text-[#1f1715]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-full border border-[#d8c6bb] px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#1f1715] transition-colors hover:border-[#b62d34]/30 hover:bg-[#fff2eb] hover:text-[#b62d34]"
            >
              Email
            </a>
          </div>
        </div>
      </header>

      <nav className="fixed bottom-4 left-1/2 z-[100] flex w-[calc(100%-1rem)] max-w-md -translate-x-1/2 items-center justify-between gap-1 rounded-[1.75rem] border border-[#d8c6bb] bg-[#fffaf6]/94 p-2 shadow-[0_20px_45px_-32px_rgba(31,23,21,0.34)] backdrop-blur-3xl md:hidden">
        {primaryNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = !item.external && pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
              className={cn(
                "flex min-w-0 flex-1 items-center justify-center gap-2 rounded-[1.15rem] px-3 py-3 text-xs font-black uppercase tracking-[0.18em] transition-all duration-300",
                isActive
                  ? "bg-[#b62d34] text-[#fff9f4] shadow-lg"
                  : "text-[#7a6660] hover:bg-[#f4e7de]"
              )}
              aria-label={item.label}
            >
              <Icon className={cn("size-4 shrink-0", isActive && "scale-110")} />
              <span className={cn("truncate", !isActive && "opacity-75")}>
                {item.label}
              </span>
            </Link>
          );
        })}

        <a
          href={`mailto:${siteConfig.email}`}
          className="flex size-11 shrink-0 items-center justify-center rounded-[1.15rem] border border-[#d8c6bb] text-[#7a6660] transition-colors hover:bg-[#f4e7de] hover:text-[#1f1715]"
          aria-label="Email"
        >
          <Mail className="size-4" />
        </a>
      </nav>
    </>
  );
}
