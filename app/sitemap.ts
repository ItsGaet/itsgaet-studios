import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();
  const latestPostDate = posts[0]?.date ? new Date(posts[0].date) : new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: latestPostDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/chi-sono"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Topics: Indici tematici dell'archivio
    ...tags.map((tag) => {
      const lastPostInTag = posts.find((post) => post.tags.includes(tag));
      return {
        url: absoluteUrl(`/topics/${tag}`),
        lastModified: lastPostInTag ? new Date(lastPostInTag.date) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    }),
    // Entries: I singoli log tecnici
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.85 : 0.7,
    })),
  ];
}