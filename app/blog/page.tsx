import { Suspense } from "react";
import type { Metadata } from "next";

import BlogPageClient from "@/components/blog/blog-page-client";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog archive",
  description:
    "Technical notes and production runbooks by Gaetano Abbaticchio on Kafka, Postgres, Kubernetes, automation, and calm product engineering.",
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
    },
  },
  openGraph: {
    title: `Blog archive | ${siteConfig.name}`,
    description:
      "Technical notes and production runbooks by Gaetano Abbaticchio on Kafka, Postgres, Kubernetes, automation, and calm product engineering.",
    url: absoluteUrl("/blog"),
    type: "website",
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  twitter: {
    title: `Blog archive | ${siteConfig.name}`,
    description:
      "Technical notes and production runbooks by Gaetano Abbaticchio on Kafka, Postgres, Kubernetes, automation, and calm product engineering.",
    images: [absoluteUrl(siteConfig.ogImage)],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <BlogPageClient posts={posts} />
    </Suspense>
  );
}
