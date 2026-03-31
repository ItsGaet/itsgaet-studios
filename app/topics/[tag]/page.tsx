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
  const description = `${topic.longDescription} Explore posts, nearby topics, and related notes from ${topic.label}.`;

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
        <div className="absolute -top-24 right-[-5%] h-[500px] w-[500px] rounded-full bg-[#b62d34]/10 blur-[150px]" />
        <div className="absolute top-[20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-white/30 blur-[130px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-14 px-6 pb-24 pt-8 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#8f5552] transition-colors hover:text-[#b62d34]"
          >
            <ArrowLeft className="size-4" />
            Back to archive
          </Link>

          <a
            href="/feed.xml"
            className="inline-flex items-center gap-2 rounded-full border border-[#d8c6bb] bg-[#fffaf6] px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#6c5954] transition-colors hover:border-[#b62d34]/20 hover:text-[#b62d34]"
          >
            <Rss className="size-3.5" />
            RSS feed
          </a>
        </div>

        <section className="rounded-[2.5rem] border border-[#d8c6bb] bg-[#fffaf6]/92 px-8 py-12 shadow-[0_30px_70px_-48px_rgba(31,23,21,0.34)] sm:px-12">
          <div className="space-y-7">
            <p className="text-[10px] font-black uppercase tracking-[0.34em] text-[#8f5552]">
              Topic archive
            </p>

            <div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
              <div className="max-w-4xl space-y-4">
                <h1 className="font-display text-5xl tracking-[-0.05em] text-[#1f1715] sm:text-7xl">
                  {topic.label}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-[#5f4c47] sm:text-lg">
                  {topic.longDescription}
                </p>
              </div>

              <Button
                asChild
                variant="outline"
                className="rounded-full px-6 text-xs font-black uppercase tracking-[0.22em]"
              >
                <Link href="/blog">
                  Explore all topics <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4 border-t border-[#ddd1c8] pt-6 sm:grid-cols-3">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8f5552]">
                  Posts
                </p>
                <p className="mt-2 text-2xl font-black text-[#1f1715]">{topic.postCount}</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8f5552]">
                  Latest
                </p>
                <p className="mt-2 text-base font-semibold text-[#1f1715]">
                  {topic.latestPostDate
                    ? formatDisplayDate(topic.latestPostDate)
                    : "—"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#8f5552]">
                  Feed
                </p>
                <p className="mt-2 text-base font-semibold text-[#1f1715]">Included in RSS</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-[#ddd1c8] pt-6">
              {relatedTopics.map((relatedTopic) => (
                <Link
                  key={relatedTopic.slug}
                  href={`/topics/${relatedTopic.slug}`}
                  className="rounded-full border border-[#d8c6bb] bg-[#fffaf6] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#6c5954] transition-colors hover:border-[#b62d34]/20 hover:text-[#b62d34]"
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
          <div className="rounded-[2rem] border border-[#d8c6bb] bg-[#fffaf6]/86 p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8f5552]">
              Topic summary
            </p>
            <div className="mt-5 space-y-3">
              <p className="text-base leading-relaxed text-[#5f4c47]">
                {topic.description}
              </p>
              <p className="text-sm leading-relaxed text-[#7c6762]">
                Use this page when you want a narrower archive than the full blog,
                without losing the editorial context around adjacent systems work.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#d8c6bb] bg-[#fffaf6]/86 p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8f5552]">
                  Latest related notes
                </p>
                <p className="mt-2 text-sm text-[#7c6762]">
                  Nearby reading from the rest of the archive.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="rounded-[1.5rem] border border-[#d8c6bb] bg-[#fffaf6] p-4 transition-colors hover:border-[#b62d34]/20 hover:bg-[#fff5ef]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.24em] text-[#9f2028]">
                      {post.tags[0]}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8f5552]">
                      {formatDisplayDate(post.date)}
                    </span>
                  </div>
                  <h2 className="font-display mt-3 text-2xl tracking-tight text-[#1f1715]">{post.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#5f4c47]">
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
