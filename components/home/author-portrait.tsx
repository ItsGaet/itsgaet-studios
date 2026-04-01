import Image from "next/image";
import { cn } from "@/lib/utils";

type AuthorPortraitProps = {
  className?: string;
  priority?: boolean;
  note?: string;
};

export default function AuthorPortrait({
  className,
  priority = false,
  note = "Bari / Remote",
}: AuthorPortraitProps) {
  return (
    <figure className={cn("group relative max-w-full", className)}>
      {/* Outer Border with offset effect */}
      <div className="relative border-2 border-[#1A1A1A] bg-[#FBF7F2] p-2 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1">
        
        {/* Decorative Corner Marker */}
        <div className="absolute -right-1 -top-1 size-4 border-r-2 border-t-2 border-[#D2042D]" />
        
        <div className="relative aspect-[4/5] overflow-hidden grayscale transition-all duration-700 group-hover:grayscale-0">
          <Image
            src="/images/gaetano-portrait.jpeg"
            alt="Gaetano Abbaticchio"
            fill
            priority={priority}
            sizes="(max-width: 768px) 92vw, (max-width: 1280px) 42vw, 32vw"
            className="object-cover object-[58%_22%] scale-105 transition-transform duration-700 group-hover:scale-100"
          />
        </div>

        {/* Bottom Label Integrated in the frame */}
        <div className="mt-2 border-t-2 border-[#1A1A1A] pt-2">
          <div className="flex items-center justify-between px-1 text-[9px] font-black uppercase tracking-[0.3em] text-[#1A1A1A]">
            <span className="text-[#D2042D]">ID_AUTHOR</span>
            <span>{note}</span>
          </div>
        </div>
      </div>

      {/* Background "Ghost" Frame for depth without shadows */}
      <div className="absolute inset-0 -z-10 translate-x-2 translate-y-2 border-2 border-[#D8C6BB]" />

      <figcaption className="mt-6 border-t-2 border-[#1A1A1A] bg-[#FBF7F2] px-2 pt-4">
        <h4 className="font-serif text-3xl font-medium leading-none tracking-tighter text-[#1A1A1A]">
          Gaetano <br />
          Abbaticchio<span className="text-[#D2042D]">.</span>
        </h4>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-[#6D5A52]">
          Product Engineer // Founder
        </p>
      </figcaption>
    </figure>
  );
}
