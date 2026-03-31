import type { MetadataRoute } from "next";

import { nowSnapshot } from "@/lib/now";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date(posts[0]?.date ?? Date.now()),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/chi-sono"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/now"),
      lastModified: new Date(nowSnapshot.updatedAt),
      changeFrequency: "monthly",
      priority: 0.68,
    },
    ...tags.map((tag) => ({
      url: absoluteUrl(`/topics/${tag}`),
      lastModified: new Date(
        posts.find((post) => post.tags.includes(tag))?.date ?? Date.now()
      ),
      changeFrequency: "monthly" as const,
      priority: 0.55,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.8 : 0.6,
    })),
  ];
}
