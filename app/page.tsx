import Link from "next/link";
import { ArrowUpRight, Rss, Sparkles } from "lucide-react";

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

export default function Home() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  const latest = rest.slice(0, 3);
  const topics = Array.from(new Set(posts.flatMap((post) => post.tags))).slice(
    0,
    6
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-15%] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 pt-10">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl border border-border/70 bg-card/80 text-sm font-semibold">
              ig
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                itsgaet.github.io
              </p>
              <p className="text-lg font-semibold">Notes & systems</p>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Button variant="ghost" asChild>
              <Link href="/blog">Blog</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#focus">Focus</Link>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://github.com/itsgaet"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </Button>
          </nav>
        </header>

        <main className="flex flex-col gap-16">
          <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <Badge variant="outline" className="w-fit border-fuchsia-500/50">
                <Sparkles className="size-3" />
                Tech log
              </Badge>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Appunti tecnici, senza rumore. Esperimenti, design e scelte di
                  prodotto.
                </h1>
                <p className="max-w-xl text-lg text-muted-foreground">
                  Un blog per chi vuole capire il perche' delle decisioni, non
                  solo il risultato. Frontend, design engineering, tooling e
                  workflow replicabili.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/blog">
                    Leggi il blog <ArrowUpRight className="size-4" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="#latest">Ultimi post</Link>
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-fuchsia-500" />
                  Aggiornato ogni 2 settimane
                </span>
                <span className="flex items-center gap-2">
                  <Rss className="size-4" />
                  Feed in arrivo
                </span>
              </div>
            </div>

            {featured ? (
              <Card className="relative overflow-hidden border-border/60 bg-card/80 shadow-lg shadow-fuchsia-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-transparent" />
                <CardHeader className="relative">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{featured.date}</span>
                    <span>-</span>
                    <span>{featured.readTime}</span>
                  </div>
                  <CardTitle className="text-2xl">
                    {featured.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {featured.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative flex flex-wrap items-center gap-3">
                  {featured.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                  <Button className="ml-auto" asChild>
                    <Link href={`/blog/${featured.slug}`}>
                      Leggi ora <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ) : null}
          </section>

          <Separator />

          <section id="latest" className="grid gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Ultimi articoli
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Idee fresche e note operative
                </h2>
              </div>
              <Button variant="outline" asChild>
                <Link href="/blog">Archivio completo</Link>
              </Button>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {latest.map((post) => (
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
                    <CardTitle className="text-xl leading-tight">
                      {post.title}
                    </CardTitle>
                    <CardDescription>{post.summary}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                    <Button
                      variant="link"
                      className="ml-auto px-0 text-sm"
                      asChild
                    >
                      <Link href={`/blog/${post.slug}`}>Leggi</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator />

          <section id="focus" className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">
                Focus attuale
              </p>
              <h2 className="text-3xl font-semibold tracking-tight">
                Roadmap editoriale 2025
              </h2>
              <p className="text-base text-muted-foreground">
                Voglio combinare deep dive tecnici con note brevi da usare come
                checklist. Ogni articolo nasce da un progetto reale o da un
                problema ricorrente.
              </p>
              <div className="flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <Badge key={topic} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
            <Card className="border-border/60 bg-card/80">
              <CardHeader>
                <CardTitle>In arrivo</CardTitle>
                <CardDescription>
                  Post brevi, snippet e refactor guidati.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-fuchsia-500" />
                  <p>Setup di un blog statico con Next.js export.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-fuchsia-500" />
                  <p>Layout editoriali modulari con shadcn.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 size-2 rounded-full bg-fuchsia-500" />
                  <p>Checklist di performance per landing tecniche.</p>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>

        <footer className="flex flex-col gap-3 border-t border-border/70 pt-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>(c) 2025 itsgaet. Tutto quello che imparo, condiviso qui.</p>
          <div className="flex items-center gap-4">
            <Link className="hover:text-foreground" href="/blog">
              Blog
            </Link>
            <a
              className="hover:text-foreground"
              href="mailto:hello@itsgaet.dev"
            >
              hello@itsgaet.dev
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
