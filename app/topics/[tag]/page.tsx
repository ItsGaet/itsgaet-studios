import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Rss } from "lucide-react";

import BlogCard from "@/components/blog/blog-card";
import SocialFooter from "@/components/home/social-footer";
import { Button } from "@/components/ui/button";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamicParams = false;

export const generateStaticParams = () =>
  getAllTags().map((tag) => ({ tag }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> => {
  const { tag } = await params;
  const title = `Topic: ${tag}`;
  const description = `Posts tagged ${tag} on ${siteConfig.name}.`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/topics/${tag}`),
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml"),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/topics/${tag}`),
      images: [absoluteUrl(siteConfig.ogImage)],
    },
    twitter: {
      title,
      description,
      images: [absoluteUrl(siteConfig.ogImage)],
    },
  };
};

export default async function TopicPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute -top-24 right-[-5%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[150px]" />
        <div className="absolute top-[20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[130px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-14 px-6 pb-24 pt-8 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/55 transition-colors hover:text-fuchsia-500"
          >
            <ArrowLeft className="size-4" />
            Back to archive
          </Link>

          <a
            href="/feed.xml"
            className="inline-flex items-center gap-2 rounded-full border border-border/40 bg-card/30 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:border-fuchsia-500/30 hover:text-fuchsia-500"
          >
            <Rss className="size-3.5" />
            RSS feed
          </a>
        </div>

        <section className="rounded-[2.5rem] border border-border/40 bg-card/30 px-8 py-12 backdrop-blur-md sm:px-12">
          <div className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-fuchsia-500">
              Topic archive
            </p>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">
                  #{tag}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground/76 sm:text-lg">
                  All notes tagged <span className="text-foreground font-semibold">#{tag}</span>,
                  collected into a focused archive.
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-border/40 bg-background/35 px-6 text-xs font-black uppercase tracking-[0.22em] hover:border-cyan-300/30 hover:bg-background/60"
              >
                <Link href="/blog">
                  Explore all topics <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} animationDelay={index * 50} />
          ))}
        </section>

        <section className="pt-12">
          <SocialFooter />
        </section>
      </main>
    </div>
  );
}
