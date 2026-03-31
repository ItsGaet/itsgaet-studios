import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft, ArrowUpRight } from "lucide-react";

import BlogPostContent from "@/components/blog/blog-post-content";
import BlogPostHeader from "@/components/blog/blog-post-header";
import BlogPostSidebar from "@/components/blog/blog-post-sidebar";
import SocialFooter from "@/components/home/social-footer";
import { Button } from "@/components/ui/button";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { absoluteUrl, getPostOgImagePath, siteConfig } from "@/lib/site";
import { Separator } from "@/components/ui/separator";

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
    <div className="relative min-h-screen bg-[#FBF7F2]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Technical Grid Overlay */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]">
        <div className="absolute inset-0 [background-image:linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] [background-size:100px_100px]" />
      </div>

      <main className="reveal relative z-10 mx-auto flex w-full max-w-[1600px] flex-col gap-12 px-4 pb-24 pt-12 md:px-8 lg:pt-20">
        
        {/* Navigation: Sharp & Technical */}
        <nav className="flex items-center">
          <Link
            href="/blog"
            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-[#1A1A1A] transition-colors hover:text-[#D2042D]"
          >
            <div className="flex size-10 items-center justify-center border-2 border-[#1A1A1A] bg-transparent transition-all group-hover:bg-[#1A1A1A] group-hover:text-[#FBF7F2]">
              <ChevronLeft className="size-4" />
            </div>
            <span>Return_to_Archive //</span>
          </Link>
        </nav>

        <BlogPostHeader post={post} />

        {/* Main Layout Grid */}
        <div className="grid gap-16 lg:grid-cols-12 lg:items-start lg:gap-24">
          
          {/* Article Content Area */}
          <div className="lg:col-span-8 space-y-16">
            <BlogPostContent body={post.body} />

            {/* Post Footer / Reply Action */}
            <div className="flex flex-col gap-8 border-t-2 border-[#1A1A1A] pt-12 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D2042D]">
                  [ End of Transmission ]
                </span>
                <p className="font-serif text-2xl italic tracking-tight text-[#4A4A4A]">
                  Thoughts on this architecture? Reach out directly.
                </p>
              </div>
              <Button
                variant="default"
                size="lg"
                asChild
              >
                <a href={`mailto:${siteConfig.email}?subject=Re: ${post.title}`}>
                  Reply to Post <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>

            {/* Related Entries Section */}
            {relatedPosts.length > 0 && (
              <section className="space-y-10 border-t-2 border-[#1A1A1A] pt-16 [content-visibility:auto] [contain-intrinsic-size:1px_620px]">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D8C6BB]">
                    Related Logs
                  </p>
                  <h2 className="font-serif text-5xl leading-none tracking-tighter text-[#1A1A1A]">
                    Continue the <span className="italic">thread.</span>
                  </h2>
                </div>

                <div className="grid gap-0 border-2 border-[#1A1A1A] md:grid-cols-2">
                  {relatedPosts.map((relatedPost, index) => (
                    <Link
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className={`group block p-8 transition-colors hover:bg-[#1A1A1A] hover:text-[#FBF7F2] ${
                        index === 0 ? "border-b-2 md:border-b-0 md:border-r-2" : ""
                      } border-[#1A1A1A]`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#D2042D]">
                          {relatedPost.tags[0]}
                        </span>
                        <span className="font-mono text-[9px] uppercase text-[#D8C6BB]">
                          {relatedPost.readTime}
                        </span>
                      </div>
                      <h3 className="font-serif mt-4 text-3xl font-medium leading-none tracking-tight">
                        {relatedPost.title}
                      </h3>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sticky Metadata Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32">
            <BlogPostSidebar post={post} />
          </aside>
        </div>

        {/* Global Footer Divider */}
        <section className="mt-20 [content-visibility:auto] [contain-intrinsic-size:1px_720px]">
          <Separator variant="thick" className="mb-12" />
          <SocialFooter />
        </section>
      </main>
    </div>
  );
}
