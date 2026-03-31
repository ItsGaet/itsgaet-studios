"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, BookOpen, Github, Home, Mail, UserRound } from "lucide-react";

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
  { label: "Now", href: "/now", icon: Activity },
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
        <div className="mx-auto flex max-w-[1180px] items-center justify-between rounded-full border border-white/10 bg-[#0b1220]/82 px-4 py-3 backdrop-blur-xl">
          <Link
            href="/"
            className="font-display text-xl tracking-[-0.04em] text-white"
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
                      ? "bg-white text-slate-950"
                      : "text-white/56 hover:text-white"
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
                className="rounded-full px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white/56 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`mailto:${siteConfig.email}`}
              className="rounded-full border border-white/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-white transition-colors hover:border-amber-200/20 hover:text-amber-100"
            >
              Email
            </a>
          </div>
        </div>
      </header>

      <nav className="fixed bottom-4 left-1/2 z-[100] flex w-[calc(100%-1rem)] max-w-md -translate-x-1/2 items-center justify-between gap-1 rounded-[1.75rem] border border-white/10 bg-black/55 p-2 shadow-2xl backdrop-blur-3xl md:hidden">
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
                  ? "bg-amber-300 text-slate-950 shadow-lg"
                  : "text-white/54 hover:bg-white/5"
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
          className="flex size-11 shrink-0 items-center justify-center rounded-[1.15rem] border border-white/10 text-white/54 transition-colors hover:text-white"
          aria-label="Email"
        >
          <Mail className="size-4" />
        </a>
      </nav>
    </>
  );
}
