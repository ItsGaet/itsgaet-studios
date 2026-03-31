import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Rss } from "lucide-react";

import BlogCard from "@/components/blog/blog-card";
import SocialFooter from "@/components/home/social-footer";
import { Button } from "@/components/ui/button";
import { getAllTags, getAllPosts, getPostsByTag } from "@/lib/posts";
import {
  absoluteUrl,
  formatDisplayDate,
  getTopicOgImagePath,
} from "@/lib/site";
import { getRelatedTopics, getTopicBySlug } from "@/lib/topics";

export const dynamicParams = false;

export const generateStaticParams = () =>
  getAllTags().map((tag) => ({ tag }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> => {
  const { tag } = await params;
  const topic = getTopicBySlug(tag);

  if (!topic) {
    return { title: "Topic not found" };
  }

  const title = `Topic: ${topic.label}`;
  const description = topic.description;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/topics/${topic.slug}`),
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml"),
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(`/topics/${topic.slug}`),
      images: [absoluteUrl(getTopicOgImagePath(topic.slug))],
    },
    twitter: {
      title,
      description,
      images: [absoluteUrl(getTopicOgImagePath(topic.slug))],
    },
  };
};

export default async function TopicPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const topic = getTopicBySlug(tag);

  if (!topic) {
    notFound();
  }

  const posts = getPostsByTag(topic.slug);
  const relatedTopics = getRelatedTopics(topic.slug, 3);
  const relatedPosts = getAllPosts()
    .filter((post) => !post.tags.includes(topic.slug))
    .slice(0, 3);

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute -top-24 right-[-5%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[150px]" />
        <div className="absolute top-[20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[130px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-14 px-6 pb-24 pt-8 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
          <div className="space-y-7">
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-fuchsia-500">
              Topic archive
            </p>

            <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-4xl space-y-4">
                <h1 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">
                  {topic.label}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-muted-foreground/76 sm:text-lg">
                  {topic.longDescription}
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

            <div className="grid gap-4 border-t border-border/10 pt-6 sm:grid-cols-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground/45">
                  Posts
                </p>
                <p className="mt-2 text-2xl font-black">{topic.postCount}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground/45">
                  Latest
                </p>
                <p className="mt-2 text-base font-semibold">
                  {topic.latestPostDate
                    ? formatDisplayDate(topic.latestPostDate)
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-muted-foreground/45">
                  Feed
                </p>
                <p className="mt-2 text-base font-semibold">Included in RSS</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-border/10 pt-6">
              {relatedTopics.map((relatedTopic) => (
                <Link
                  key={relatedTopic.slug}
                  href={`/topics/${relatedTopic.slug}`}
                  className="rounded-full border border-border/40 bg-background/35 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-fuchsia-500/30 hover:text-fuchsia-500"
                >
                  Nearby topic: {relatedTopic.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} animationDelay={index * 50} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="rounded-[2rem] border border-border/40 bg-card/25 p-6 backdrop-blur-md">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-500">
              Topic summary
            </p>
            <div className="mt-5 space-y-3">
              <p className="text-base leading-relaxed text-muted-foreground/76">
                {topic.description}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground/62">
                Use this page when you want a narrower archive than the full blog,
                without losing the editorial context around adjacent systems work.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/40 bg-card/25 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-500">
                  Latest related notes
                </p>
                <p className="mt-2 text-sm text-muted-foreground/62">
                  Nearby reading from the rest of the archive.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-[1.5rem] border border-border/35 bg-background/35 p-4 transition-colors hover:border-fuchsia-500/30"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.24em] text-cyan-400/80">
                      {post.tags[0]}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/45">
                      {formatDisplayDate(post.date)}
                    </span>
                  </div>
                  <h2 className="mt-3 text-lg font-black tracking-tight">{post.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground/72">
                    {post.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="pt-12">
          <SocialFooter />
        </section>
      </main>
    </div>
  );
}
