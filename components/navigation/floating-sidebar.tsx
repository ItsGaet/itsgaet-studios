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
      <nav className="fixed left-6 top-1/2 z-[100] hidden -translate-y-1/2 flex-col items-center gap-6 rounded-full border border-white/10 bg-black/20 p-3 shadow-[0_0_40px_rgba(0,0,0,0.3)] backdrop-blur-2xl md:flex">
        <div className="size-1.5 animate-pulse rounded-full bg-fuchsia-500" />

        <div className="flex flex-col gap-3">
          {[...primaryNavItems, ...desktopOnlyItems].map((item) => {
            const Icon = item.icon;
            const isActive = !item.external && pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noreferrer" : undefined}
                className={cn(
                  "group relative flex size-12 items-center justify-center rounded-full transition-all duration-300",
                  isActive
                    ? "bg-fuchsia-500 text-white shadow-[0_0_20px_rgba(217,70,239,0.4)]"
                    : "text-muted-foreground hover:bg-white/5 hover:text-fuchsia-400"
                )}
                aria-label={item.label}
              >
                <Icon className="size-5 shrink-0" />

                <span className="absolute left-16 scale-90 rounded-xl border border-white/10 bg-black/80 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100 backdrop-blur-md">
                  {item.label}
                </span>

                {isActive && (
                  <div className="absolute -left-1 h-4 w-0.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="h-px w-6 bg-white/10" />

        <a
          href={`mailto:${siteConfig.email}`}
          className="flex size-12 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-cyan-400"
          aria-label="Email"
        >
          <Mail className="size-5" />
        </a>
      </nav>

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
                  ? "bg-fuchsia-500 text-white shadow-lg"
                  : "text-muted-foreground hover:bg-white/5"
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
          className="flex size-11 shrink-0 items-center justify-center rounded-[1.15rem] border border-white/10 text-muted-foreground transition-colors hover:text-cyan-300"
          aria-label="Email"
        >
          <Mail className="size-4" />
        </a>
      </nav>
    </>
  );
}
