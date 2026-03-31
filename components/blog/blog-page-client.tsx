"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
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
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

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

  const normalizedQuery = deferredQuery.trim().toLowerCase();

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (activeTags.length > 0 && !post.tags.some((tag) => activeTags.includes(tag))) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return getSearchableText(post).includes(normalizedQuery);
    });
  }, [activeTags, normalizedQuery, posts]);

  const updateUrl = (nextTags: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("tag");
    if (nextTags.length === 0) {
      params.delete("tags");
    } else {
      params.set("tags", nextTags.join(","));
    }
    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const handleTagClick = (tag: string) => {
    const nextTags = activeTags.includes(tag)
      ? activeTags.filter((value) => value !== tag)
      : [...activeTags, tag];
    updateUrl(nextTags);
  };

  const clearFilters = () => updateUrl([]);

  const resetSearch = () => {
    clearFilters();
    setQuery("");
  };

  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 select-none">
        <div className="absolute -top-24 right-[-5%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/10 blur-[150px]" />
        <div className="absolute top-[20%] left-[-10%] h-[400px] w-[400px] rounded-full bg-cyan-500/5 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[5%] h-[600px] w-[600px] rounded-full bg-fuchsia-600/5 blur-[180px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-16 px-6 pb-24 pt-12 sm:px-10 lg:px-16">
        <BlogHeader
          postCount={posts.length}
          topicCount={tags.length}
          latestPostDate={posts[0]?.date}
        />

        <section className="relative z-20 flex flex-col gap-6 border-y border-border/10 py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-fuchsia-500">
                  Topics Explorer
                </span>
                <div className="h-1 w-1 rounded-full bg-border" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                  {filteredPosts.length} Results
                </span>
              </div>
              {(activeTags.length > 0 || normalizedQuery) && (
                <p className="text-xs font-medium text-muted-foreground">
                  {activeTags.length > 0 ? (
                    <>
                      Topics:{" "}
                      <span className="text-foreground">{activeTags.join(", ")}</span>
                    </>
                  ) : null}
                  {activeTags.length > 0 && normalizedQuery ? " • " : null}
                  {normalizedQuery ? (
                    <>
                      Query: <span className="text-foreground">{deferredQuery}</span>
                    </>
                  ) : null}
                </p>
              )}
            </div>

            <div className="w-full max-w-xl">
              <label className="group flex items-center gap-3 rounded-[1.5rem] border border-border/40 bg-card/35 px-4 py-3 transition-colors focus-within:border-fuchsia-500/30">
                <Search className="size-4 shrink-0 text-muted-foreground/60" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search titles, summaries, tags, and article text"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/45"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="flex size-7 items-center justify-center rounded-full border border-border/40 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Clear search"
                  >
                    <X className="size-3.5" />
                  </button>
                )}
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 6).map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className={`rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
                    activeTags.includes(tag)
                      ? "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-500"
                      : "border-border/40 bg-background/35 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-auto">
              <BlogFilter
                tags={tags}
                tagCounts={tagCounts}
                activeTags={activeTags}
                onToggleTag={handleTagClick}
                onClear={clearFilters}
              />
            </div>
          </div>
        </section>

        <section id="posts" className="grid gap-8 lg:grid-cols-2">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} animationDelay={index * 50} />
            ))
          ) : (
            <BlogEmptyState onReset={resetSearch} query={normalizedQuery ? deferredQuery : undefined} />
          )}
        </section>

        <section className="border-t border-border/10 pt-20">
          <SocialFooter />
        </section>
      </main>
    </div>
  );
}

function getSearchableText(post: Post) {
  const bodyText = post.body
    .flatMap((block) => {
      if (block.type === "list") {
        return block.items;
      }

      return block.content;
    })
    .join(" ");

  return `${post.title} ${post.summary} ${post.tags.join(" ")} ${bodyText}`.toLowerCase();
}
