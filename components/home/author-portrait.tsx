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
  note = "Bisceglie / Remote",
}: AuthorPortraitProps) {
  return (
    <figure className={cn("space-y-4", className)}>
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c1322]">
        <div className="relative aspect-[4/5]">
          <Image
            src="/images/gaetano-portrait.jpeg"
            alt="Gaetano Abbaticchio"
            fill
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 34vw"
            className="object-cover object-[58%_22%]"
          />
        </div>
      </div>

      <figcaption className="flex items-center justify-between gap-4 border-t border-white/8 pt-4 text-[10px] font-black uppercase tracking-[0.24em] text-white/42">
        <span>Gaetano Abbaticchio</span>
        <span>{note}</span>
      </figcaption>
    </figure>
  );
}
