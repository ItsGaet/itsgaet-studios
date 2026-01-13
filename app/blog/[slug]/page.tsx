import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export const dynamicParams = false;

export const generateStaticParams = () =>
  getAllPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = ({
  params,
}: {
  params: { slug: string };
}): Metadata => {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: `${post.title} - itsgaet`,
    description: post.summary,
  };
};

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute bottom-[-30%] left-[-15%] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 pb-24 pt-12">
        <Button variant="ghost" className="w-fit px-0" asChild>
          <Link href="/blog">
            <ArrowLeft className="size-4" />
            Back to blog
          </Link>
        </Button>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span>{post.date}</span>
            <span>-</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground">{post.summary}</p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <article className="space-y-6 text-base leading-7 text-foreground/80">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </div>
    </div>
  );
}
