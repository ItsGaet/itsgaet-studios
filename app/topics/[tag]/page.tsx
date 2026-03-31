import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ArrowUpRight, Rss, Hash } from "lucide-react";

import BlogCard from "@/components/blog/blog-card";
import SocialFooter from "@/components/home/social-footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  if (!topic) return { title: "Topic not found" };

  const title = `Topic: ${topic.label}`;
  const description = topic.longDescription;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(`/topics/${topic.slug}`),
      types: { "application/rss+xml": absoluteUrl("/feed.xml") },
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

  if (!topic) notFound();

  const posts = getPostsByTag(topic.slug);
  const relatedTopics = getRelatedTopics(topic.slug, 3);
  const relatedPosts = getAllPosts()
    .filter((post) => !post.tags.includes(topic.slug))
    .slice(0, 3);

  return (
    <div className="relative min-h-screen bg-[#FBF7F2]">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]">
        <div className="absolute inset-0 [background-image:linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] [background-size:100px_100px]" />
      </div>

      <main className="reveal relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-12 px-4 pb-24 pt-12 md:px-8 lg:pt-20">
        
        {/* Navigation Bar */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/blog"
            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#1A1A1A] transition-colors hover:text-[#D2042D]"
          >
            <div className="flex size-10 items-center justify-center border-2 border-[#1A1A1A] bg-transparent transition-all group-hover:bg-[#1A1A1A] group-hover:text-[#FBF7F2]">
              <ChevronLeft className="size-4" />
            </div>
            <span>Return_to_Archive //</span>
          </Link>

          <a
            href="/feed.xml"
            className="flex items-center gap-3 border-2 border-[#1A1A1A] bg-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#1A1A1A] transition-colors hover:bg-[#D2042D] hover:text-[#FBF7F2] hover:border-[#D2042D]"
          >
            <Rss className="size-3.5" />
            RSS_Feed
          </a>
        </div>

        {/* Topic Header: Hero Block */}
        <section className="border-2 border-[#1A1A1A] bg-white p-8 md:p-12">
          <div className="space-y-10">
            <div className="flex items-center gap-3">
              <Hash className="size-4 text-[#D2042D]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D2042D]">
                Topic_Index_Entry
              </span>
            </div>

            <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl space-y-6">
                <h1 className="font-serif text-6xl font-medium leading-[0.85] tracking-tighter text-[#1A1A1A] sm:text-8xl">
                  {topic.label}<span className="text-[#D2042D]">.</span>
                </h1>
                <p className="max-w-2xl font-serif text-2xl leading-tight tracking-tight text-[#4A4A4A]">
                  {topic.longDescription}
                </p>
              </div>

              <Button asChild variant="default" className="h-14 px-10">
                <Link href="/blog">
                  All Topics <ArrowUpRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            {/* Technical Metadata Row */}
            <div className="grid gap-0 border-t-2 border-[#1A1A1A] sm:grid-cols-3">
              <div className="p-6 border-b-2 sm:border-b-0 sm:border-r-2 border-[#1A1A1A]">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D8C6BB]">Posts_Count</p>
                <p className="mt-2 text-4xl font-black text-[#1A1A1A]">{topic.postCount}</p>
              </div>
              <div className="p-6 border-b-2 sm:border-b-0 sm:border-r-2 border-[#1A1A1A]">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D8C6BB]">Last_Update</p>
                <p className="mt-2 text-sm font-black uppercase tracking-widest text-[#1A1A1A]">
                  {topic.latestPostDate ? formatDisplayDate(topic.latestPostDate) : "—"}
                </p>
              </div>
              <div className="p-6">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D8C6BB]">Indexing</p>
                <p className="mt-2 text-sm font-black uppercase tracking-widest text-[#D2042D]">Live_Archive</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Feed: 2 Column Grid */}
        <section className="grid gap-8 md:grid-cols-2 [content-visibility:auto] [contain-intrinsic-size:1px_1600px]">
          {posts.map((post, index) => (
            <BlogCard key={post.slug} post={post} animationDelay={index * 50} />
          ))}
        </section>

        <Separator variant="thick" />

        {/* Footer Insights: Related Topics & Notes */}
        <section className="grid gap-12 lg:grid-cols-2 [content-visibility:auto] [contain-intrinsic-size:1px_820px]">
          <div className="border-2 border-[#1A1A1A] p-8 space-y-6 bg-white">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A1A1A]">Topic_Context //</h2>
            <div className="space-y-4">
              <p className="font-serif text-xl leading-snug text-[#4A4A4A]">
                {topic.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {relatedTopics.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/topics/${related.slug}`}
                    className="border border-[#1A1A1A] px-3 py-1 text-[9px] font-black uppercase tracking-widest hover:bg-[#D2042D] hover:text-white transition-colors"
                  >
                    Nearby: {related.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="border-2 border-[#1A1A1A] bg-[#1A1A1A] p-8 text-[#FBF7F2]">
             <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D2042D] mb-8">Related_Logs //</h2>
             <div className="space-y-6">
                {relatedPosts.map((post) => (
                  <Link 
                    key={post.slug} 
                    href={`/blog/${post.slug}`}
                    className="group block border-l-2 border-[#D2042D] pl-6 hover:border-[#FBF7F2] transition-colors"
                  >
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D8C6BB]">
                      {formatDisplayDate(post.date)}
                    </span>
                    <h3 className="font-serif text-2xl group-hover:text-[#D2042D] transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                ))}
             </div>
          </div>
        </section>

        <footer className="[content-visibility:auto] [contain-intrinsic-size:1px_720px]">
          <SocialFooter />
        </footer>
      </main>
    </div>
  );
}
