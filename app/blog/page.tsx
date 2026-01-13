import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)));

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-[-25%] right-[-15%] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-24 pt-10">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Archive</p>
            <h1 className="text-4xl font-semibold tracking-tight">Blog</h1>
            <p className="max-w-xl text-base text-muted-foreground">
              Technical posts, field notes, and operating checklists. Everything
              I need to remember, shared out loud.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">
              Back to home <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </header>

        <Separator />

        <section className="flex flex-wrap gap-2">
          <Badge variant="secondary">All</Badge>
          {tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="group relative overflow-hidden border-border/60 bg-card/80 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-fuchsia-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-fuchsia-500/10 opacity-0 transition group-hover:opacity-100" />
              <CardHeader className="relative">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span>-</span>
                  <span>{post.readTime}</span>
                </div>
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <CardDescription className="text-base">
                  {post.summary}
                </CardDescription>
              </CardHeader>
              <CardContent className="relative flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
                <Button variant="link" className="ml-auto px-0" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    Read <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
}
