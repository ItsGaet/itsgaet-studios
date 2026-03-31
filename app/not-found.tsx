import Link from "next/link";
import { ArrowUpRight, Home, Terminal } from "lucide-react";
import SocialFooter from "@/components/home/social-footer";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#FBF7F2]">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#1A1A1A 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <main className="relative z-10 mx-auto flex min-h-[90vh] w-full max-w-[1600px] flex-col px-6 py-20 lg:px-12">
        <div className="flex flex-1 flex-col items-start justify-center">
          
          {/* Large Background Text */}
          <div className="relative w-full">
            <span className="font-serif text-[15rem] font-medium leading-none tracking-tighter text-[#1A1A1A] opacity-[0.03] sm:text-[25rem] lg:text-[35rem]">
              404
            </span>
            
            <div className="absolute inset-0 flex flex-col items-start justify-center">
              <div className="mb-8 flex items-center gap-4 border-2 border-[#D2042D] bg-[#D2042D] px-4 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#FBF7F2]">
                <Terminal className="size-4" /> 
                Resource_Not_Found //
              </div>
              
              <h1 className="max-w-4xl font-serif text-6xl font-medium leading-[0.85] tracking-tighter text-[#1A1A1A] sm:text-8xl lg:text-9xl">
                The entry was <br />
                <span className="italic text-[#D2042D]">de-indexed.</span>
              </h1>
              
              <div className="mt-12 max-w-xl space-y-8 border-l-2 border-[#1A1A1A] pl-8">
                <p className="text-xl font-medium leading-snug tracking-tight text-[#4A4A4A] sm:text-2xl">
                  Il segnale si è interrotto. La risorsa che cercavi è stata spostata o non è mai esistita nell&apos;archivio dei sistemi.
                </p>
                
                <div className="flex flex-col gap-0 border border-[#1A1A1A] sm:w-fit sm:flex-row">
                  <Link 
                    href="/blog"
                    className="group flex items-center justify-center gap-4 bg-[#1A1A1A] px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-[#FBF7F2] transition-colors hover:bg-[#D2042D]"
                  >
                    Return to Blog
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </Link>
                  <Link 
                    href="/"
                    className="flex items-center justify-center border-t border-[#1A1A1A] px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-[#1A1A1A] transition-colors hover:bg-[#D8C6BB]/20 sm:border-l sm:border-t-0"
                  >
                    <Home className="mr-2 size-4" /> Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Footer with subtle divider */}
        <section className="mt-20 border-t-2 border-[#1A1A1A] pt-12">
          <SocialFooter />
        </section>
      </main>
    </div>
  );
}