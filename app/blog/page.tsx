import { Suspense } from "react";
import type { Metadata } from "next";

import BlogPageClient from "@/components/blog/blog-page-client";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog Archive",
  description:
    "Technical notes, infrastructure patterns, and delivery logs by Gaetano Abbaticchio. Deep dives into automation, systems architecture, and product reliability.",
  alternates: {
    canonical: absoluteUrl("/blog"),
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
    },
  },
  openGraph: {
    title: `Blog Archive | ${siteConfig.name}`,
    description:
      "Technical notes, infrastructure patterns, and delivery logs by Gaetano Abbaticchio. Deep dives into automation, systems architecture, and product reliability.",
    url: absoluteUrl("/blog"),
    type: "website",
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog Archive | ${siteConfig.name}`,
    description:
      "Technical notes, infrastructure patterns, and delivery logs by Gaetano Abbaticchio. Deep dives into automation, systems architecture, and product reliability.",
    images: [absoluteUrl(siteConfig.ogImage)],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Suspense 
      fallback={
        <div className="min-h-screen bg-[#FBF7F2]">
          {/* Sottile griglia di caricamento per coerenza visiva */}
          <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#1A1A1A_1px,transparent_1px),linear-gradient(90deg,#1A1A1A_1px,transparent_1px)] [background-size:100px_100px]" />
        </div>
      }
    >
      <BlogPageClient posts={posts} />
    </Suspense>
  );
}