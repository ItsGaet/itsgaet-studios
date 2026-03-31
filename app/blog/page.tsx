import { Suspense } from "react";
import type { Metadata } from "next";

import BlogPageClient from "@/components/blog/blog-page-client";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical notes, production runbooks, and field-tested architecture patterns from itsgaet.",
  alternates: {
    canonical: absoluteUrl("/blog"),
  },
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description:
      "Technical notes, production runbooks, and field-tested architecture patterns from itsgaet.",
    url: absoluteUrl("/blog"),
    type: "website",
  },
  twitter: {
    title: `Blog | ${siteConfig.name}`,
    description:
      "Technical notes, production runbooks, and field-tested architecture patterns from itsgaet.",
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
