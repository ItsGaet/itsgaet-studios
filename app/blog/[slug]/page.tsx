import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronLeft } from "lucide-react";

import BlogPostContent from "@/components/blog/blog-post-content";
import BlogPostHeader from "@/components/blog/blog-post-header";
import BlogPostSidebar from "@/components/blog/blog-post-sidebar";
import SocialFooter from "@/components/home/social-footer";
import { Button } from "@/components/ui/button";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

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
    description: post.summary,
    keywords: post.tags,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      type: "article",
      url: absoluteUrl(`/blog/${post.slug}`),
      title: post.title,
      description: post.summary,
      publishedTime: `${post.date}T00:00:00.000Z`,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
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
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
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
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-fuchsia-500/[0.07] blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.05] blur-[150px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-6 pb-24 pt-8 sm:px-10 lg:px-16 lg:pt-12">
        <nav className="flex items-center">
          <Link
            href="/blog"
            className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/50 transition-colors hover:text-fuchsia-500"
          >
            <div className="flex size-8 items-center justify-center rounded-full border border-border/40 bg-card/40 transition-all group-hover:border-fuchsia-500/50 group-hover:bg-fuchsia-500/10">
              <ChevronLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            </div>
            Back to Archive
          </Link>
        </nav>

        <BlogPostHeader post={post} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-20">
          <div className="space-y-12">
            <BlogPostContent body={post.body} />

            <div className="flex flex-col gap-4 border-t border-border/10 pt-12 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/30">
                  Thank you for reading
                </span>
                <p className="text-sm font-medium text-muted-foreground/60">
                  Share your thoughts on this topic.
                </p>
              </div>
              <Button
                variant="outline"
                className="rounded-full border-fuchsia-500/20 hover:bg-fuchsia-500/5 hover:text-fuchsia-500"
                asChild
              >
                <a href={`mailto:${siteConfig.email}?subject=Re: ${post.title}`}>
                  Reply to Post
                </a>
              </Button>
            </div>
          </div>

          <aside className="relative">
            <div className="sticky top-12">
              <BlogPostSidebar post={post} />
            </div>
          </aside>
        </div>

        <section className="mt-20 border-t border-border/10 pt-10">
          <SocialFooter />
        </section>
      </main>
    </div>
  );
}
