import Link from "next/link";
import { ArrowUpRight, Home, Ghost } from "lucide-react";
import SocialFooter from "@/components/home/social-footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/6 blur-[160px]" />
        <div className="absolute -top-20 left-[-10%] size-96 rounded-full bg-white/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1600px] flex-col px-6 py-12 sm:px-10 lg:px-16">
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="relative">
            <h1 className="font-display text-[12rem] leading-none tracking-tighter opacity-[0.05] sm:text-[20rem]">
              404
            </h1>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="mb-4 flex size-16 items-center justify-center rounded-3xl border border-amber-300/20 bg-amber-300/10 shadow-[0_0_30px_rgba(251,191,36,0.1)]">
                <Ghost className="size-8 text-amber-200" />
              </div>
              <h2 className="font-display text-4xl tracking-tight text-white sm:text-6xl">
                Lost in <span className="text-amber-200">space.</span>
              </h2>
            </div>
          </div>

          <div className="mt-8 flex max-w-md flex-col items-center gap-8 text-center">
            <p className="text-sm font-medium leading-relaxed text-white/56">
              Il segnale si è interrotto. La risorsa che cercavi è stata spostata o non è mai esistita nel nostro database.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild className="h-12 rounded-full bg-amber-300 px-8 font-bold text-slate-950 hover:bg-amber-200">
                <Link href="/blog">
                  BACK TO BLOG <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-full border-white/12 bg-white/[0.03] px-8 font-bold text-white hover:bg-white/[0.06]">
                <Link href="/">
                  <Home className="mr-2 size-4" /> HOME
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <section className="mt-12 opacity-80 grayscale transition-all hover:grayscale-0">
          <SocialFooter />
        </section>
      </div>
    </div>
  );
}
