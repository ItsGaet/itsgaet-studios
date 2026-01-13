"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import BlogCard from "@/components/blog/blog-card";
import BlogEmptyState from "@/components/blog/blog-empty-state";
import BlogFilter from "@/components/blog/blog-filter";
import BlogHeader from "@/components/blog/blog-header";
import SocialFooter from "@/components/home/social-footer";
import type { Post } from "@/lib/posts";

type BlogPageClientProps = {
  posts: Post[];
};

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts]
  );

  const tagCounts = useMemo(() => {
    return posts.reduce<Record<string, number>>((acc, post) => {
      post.tags.forEach((tag) => {
        acc[tag] = (acc[tag] ?? 0) + 1;
      });
      return acc;
    }, {});
  }, [posts]);

  const activeTags = useMemo(() => {
    const raw = searchParams.get("tags") ?? searchParams.get("tag");
    if (!raw) return [];
    const parsed = raw.split(",").map((tag) => tag.trim()).filter(Boolean);
    return Array.from(new Set(parsed)).filter((tag) => tags.includes(tag));
  }, [searchParams, tags]);

  const filteredPosts =
    activeTags.length === 0
      ? posts
      : posts.filter((post) => post.tags.some((tag) => activeTags.includes(tag)));

  const updateUrl = (nextTags: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tag");
    nextTags.length === 0 ? params.delete("tags") : params.set("tags", nextTags.join(","));
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleTagClick = (tag: string) => {
    const nextTags = activeTags.includes(tag)
      ? activeTags.filter((value) => value !== tag)
      : [...activeTags, tag];
    updateUrl(nextTags);
  };

  const clearFilters = () => updateUrl([]);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Luci Ambientali Coerenti */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute -top-24 right-[-5%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[150px]" />
        <div className="absolute top-[20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[5%] h-[600px] w-[600px] rounded-full bg-fuchsia-600/5 blur-[180px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-16 px-6 pb-24 pt-12 sm:px-10 lg:px-16">
        {/* Header dell'archivio */}
        <BlogHeader
          postCount={posts.length}
          topicCount={tags.length}
          latestPostDate={posts[0]?.date}
        />

        {/* Toolbar dei Filtri */}
        <section className="relative z-20 flex flex-wrap items-center justify-between gap-6 border-y border-border/10 py-8">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-500">
                Topics Explorer
              </span>
              <div className="h-1 w-1 rounded-full bg-border" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                {filteredPosts.length} Results
              </span>
            </div>
            {activeTags.length > 0 && (
              <p className="text-xs font-medium text-muted-foreground">
                Filtering by: <span className="text-foreground">{activeTags.join(", ")}</span>
              </p>
            )}
          </div>

          <BlogFilter
            tags={tags}
            tagCounts={tagCounts}
            activeTags={activeTags}
            onToggleTag={handleTagClick}
            onClear={clearFilters}
          />
        </section>

        {/* Griglia Post Evoluta */}
        <section id="posts" className="grid gap-8 lg:grid-cols-2">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                animationDelay={index * 50}
              />
            ))
          ) : (
            <BlogEmptyState />
          )}
        </section>

        {/* Footer */}
        <section className="pt-20 border-t border-border/10">
          <SocialFooter />
        </section>
      </main>
    </div>
  );
}
