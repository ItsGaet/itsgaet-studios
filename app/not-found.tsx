import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-background px-6">
      <div className="flex max-w-lg flex-col items-center gap-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="text-base text-muted-foreground">
          This page does not exist or has been moved. Head back to the blog for
          the latest posts.
        </p>
        <Button asChild>
          <Link href="/blog">
            Go to the blog <ArrowUpRight className="size-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
