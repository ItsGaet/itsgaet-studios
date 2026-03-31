import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";

import BlogPostContent from "@/components/blog/blog-post-content";
import BlogPostHeader from "@/components/blog/blog-post-header";
import BlogPostSidebar from "@/components/blog/blog-post-sidebar";
import SocialFooter from "@/components/home/social-footer";
import { Button } from "@/components/ui/button";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { absoluteUrl, getPostOgImagePath, siteConfig } from "@/lib/site";

export const dynamicParams = false;

export const generateStaticParams = () =>
  getAllPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  return {
    title: post.title,
    description: `${post.summary} Published by ${siteConfig.fullName} on ${siteConfig.name}.`,
    keywords: post.tags,
    authors: [{ name: siteConfig.fullName, url: siteConfig.links.linkedin }],
    category: post.tags[0],
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
      types: {
        "application/rss+xml": absoluteUrl("/feed.xml"),
      },
    },
    openGraph: {
      type: "article",
      url: absoluteUrl(`/blog/${post.slug}`),
      title: post.title,
      description: `${post.summary} Published by ${siteConfig.fullName} on ${siteConfig.name}.`,
      publishedTime: `${post.date}T00:00:00.000Z`,
      tags: post.tags,
      authors: [siteConfig.fullName],
      siteName: siteConfig.name,
      images: [absoluteUrl(getPostOgImagePath(post.slug))],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: `${post.summary} Published by ${siteConfig.fullName} on ${siteConfig.name}.`,
      images: [absoluteUrl(getPostOgImagePath(post.slug))],
    },
  };
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: `${post.date}T00:00:00.000Z`,
    dateModified: `${post.date}T00:00:00.000Z`,
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      name: siteConfig.fullName,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.fullName,
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <div className="relative min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-amber-300/[0.08] blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-white/[0.04] blur-[150px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-6 pb-24 pt-8 sm:px-10 lg:px-16 lg:pt-12">
        <nav className="flex items-center">
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/42 transition-colors hover:text-amber-200"
          >
            <div className="flex size-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] transition-all group-hover:border-amber-200/40 group-hover:bg-white/[0.06]">
              <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            </div>
            Back to Archive
          </Link>
        </nav>

        <BlogPostHeader post={post} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-20">
          <div className="space-y-12">
            <BlogPostContent body={post.body} />

            <div className="flex flex-col gap-4 border-t border-white/8 pt-12 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/34">
                  Thank you for reading
                </span>
                <p className="text-sm font-medium text-white/56">
                  Share your thoughts on this topic.
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-full border-white/12 bg-white/[0.03] text-white hover:border-amber-200/30 hover:bg-white/[0.06] hover:text-amber-100"
                asChild
              >
                <a href={`mailto:${siteConfig.email}?subject=Re: ${post.title}`}>
                  Reply to Post
                </a>
              </Button>
            </div>

            {relatedPosts.length > 0 && (
              <section className="space-y-6 border-t border-white/8 pt-12">
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200/80">
                    Related notes
                  </p>
                  <h2 className="font-display text-4xl tracking-[-0.04em] text-white">
                    Continue from the same line of thought.
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
                    These posts share nearby topics or reinforce the same
                    production concerns.
                  </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-amber-200/20 hover:bg-white/[0.05]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.24em] text-amber-200/80">
                          {relatedPost.tags[0]}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/38">
                          {relatedPost.readTime}
                        </span>
                      </div>
                      <h3 className="font-display mt-3 text-2xl tracking-tight text-white">
                        {relatedPost.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">
                        {relatedPost.summary}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="relative">
            <div className="sticky top-12">
              <BlogPostSidebar post={post} />
            </div>
          </aside>
        </div>

        <section className="mt-20 border-t border-white/8 pt-10">
          <SocialFooter />
        </section>
      </main>
    </div>
  );
}
