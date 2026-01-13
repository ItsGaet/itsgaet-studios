import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-6">
      <div className="flex max-w-lg flex-col items-center gap-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Pagina non trovata
        </h1>
        <p className="text-base text-muted-foreground">
          Questa pagina non esiste o e' stata spostata. Torna al blog per gli
          ultimi contenuti.
        </p>
        <Button asChild>
          <Link href="/blog">
            Vai al blog <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
