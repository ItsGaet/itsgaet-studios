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
        <div className="absolute -top-24 right-[-5%] h-[500px] w-[500px] rounded-full bg-[#b62d34]/10 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[5%] h-[600px] w-[600px] rounded-full bg-white/30 blur-[180px]" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[1600px] flex-col gap-16 px-6 pb-24 pt-12 sm:px-10 lg:px-16">
        <BlogHeader
          postCount={posts.length}
          topicCount={tags.length}
          latestPostDate={posts[0]?.date}
        />

        <section className="relative z-20 flex flex-col gap-6 rounded-[2rem] border border-[#d8c6bb] bg-[#fffaf6]/86 p-5 shadow-[0_24px_60px_-42px_rgba(31,23,21,0.28)] sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8f5552]">
                  Topics Explorer
                </span>
                <div className="h-1 w-1 rounded-full bg-[#cdbbb1]" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8f5552]">
                  {filteredPosts.length} Results
                </span>
              </div>
              {(activeTags.length > 0 || normalizedQuery) && (
                <p className="text-xs font-medium text-[#5f4c47]">
                  {activeTags.length > 0 ? (
                    <>
                      Topics: <span className="text-[#1f1715]">{activeTags.join(", ")}</span>
                    </>
                  ) : null}
                  {activeTags.length > 0 && normalizedQuery ? " • " : null}
                  {normalizedQuery ? (
                    <>
                      Query: <span className="text-[#1f1715]">{deferredQuery}</span>
                    </>
                  ) : null}
                </p>
              )}
            </div>

            <div className="w-full max-w-xl">
              <label className="group flex items-center gap-3 rounded-[1.5rem] border border-[#d8c6bb] bg-[#fffaf6] px-4 py-3 transition-colors focus-within:border-[#b62d34]/25">
                <Search className="size-4 shrink-0 text-[#8f5552]" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search titles, summaries, tags, and article text"
                  className="w-full bg-transparent text-sm text-[#1f1715] outline-none placeholder:text-[#8f5552]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="flex size-7 items-center justify-center rounded-full border border-[#d8c6bb] text-[#6c5954] transition-colors hover:bg-[#f4e7de] hover:text-[#1f1715]"
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
                      ? "border-[#b62d34]/25 bg-[#b62d34]/8 text-[#9f2028]"
                      : "border-[#d8c6bb] bg-[#fffaf6] text-[#6c5954] hover:border-[#cdbbb1] hover:text-[#1f1715]"
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

        <section className="border-t border-[#ddd1c8] pt-20">
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
