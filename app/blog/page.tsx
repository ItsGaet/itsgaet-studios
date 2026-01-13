import { Suspense } from "react";

import BlogPageClient from "@/components/blog/blog-page-client";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <BlogPageClient posts={posts} />
    </Suspense>
  );
}
