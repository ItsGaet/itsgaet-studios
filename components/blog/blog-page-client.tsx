"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search, X, Command } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import BlogCard from "@/components/blog/blog-card";
import BlogEmptyState from "@/components/blog/blog-empty-state";
import BlogFilter from "@/components/blog/blog-filter";
import BlogHeader from "@/components/blog/blog-header";
import SocialFooter from "@/components/home/social-footer";
import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

type BlogPageClientProps = {
  posts: Post[];
};

export default function BlogPageClient({ posts }: BlogPageClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const tags = useMemo(() => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(), [posts]);
  const tagCounts = useMemo(() => {
    return posts.reduce<Record<string, number>>((acc, post) => {
      post.tags.forEach((tag) => { acc[tag] = (acc[tag] ?? 0) + 1; });
      return acc;
    }, {});
  }, [posts]);

  const activeTags = useMemo(() => {
    const raw = searchParams.get("tags") ?? searchParams.get("tag");
    if (!raw) return [];
    return raw.split(",").map(t => t.trim()).filter(t => tags.includes(t));
  }, [searchParams, tags]);

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (activeTags.length > 0 && !post.tags.some((tag) => activeTags.includes(tag))) return false;
      if (!normalizedQuery) return true;
      return getSearchableText(post).includes(normalizedQuery);
    });
  }, [activeTags, normalizedQuery, posts]);

  const updateUrl = (nextTags: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextTags.length === 0) {
      params.delete("tags");
    } else {
      params.set("tags", nextTags.join(","));
    }
    params.delete("tag");
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  };

  const handleTagClick = (tag: string) => {
    const nextTags = activeTags.includes(tag) ? activeTags.filter((v) => v !== tag) : [...activeTags, tag];
    updateUrl(nextTags);
  };

  return (
    // Background Cotton solido, niente gradienti
    <div className="min-h-screen bg-[#FBF7F2] selection:bg-[#D2042D] selection:text-[#FBF7F2]">
      
      <main className="mx-auto flex max-w-[1600px] flex-col gap-0 px-4 py-8 md:px-10 lg:px-12">
        
        <BlogHeader
          postCount={posts.length}
          topicCount={tags.length}
          latestPostDate={posts[0]?.date}
        />

        {/* Toolbar: Un blocco monolitico che separa Header da Content */}
        <section className="relative z-20 mt-[-2px] border-2 border-[#1A1A1A] bg-[#FBF7F2] p-6 lg:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            
            {/* Search Input: Sharp & Minimal */}
            <div className="relative w-full max-w-2xl">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#D2042D]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH ARCHIVE..."
                className="w-full border-b-2 border-[#1A1A1A] bg-transparent py-3 pl-12 pr-10 text-sm font-bold uppercase tracking-widest outline-none focus:border-[#D2042D] transition-colors placeholder:text-[#D8C6BB]"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 hover:text-[#D2042D]">
                  <X className="size-5" />
                </button>
              )}
            </div>

            <BlogFilter
              tags={tags}
              tagCounts={tagCounts}
              activeTags={activeTags}
              onToggleTag={handleTagClick}
              onClear={() => updateUrl([])}
            />
          </div>

          {/* Quick Tags Bar */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#D8C6BB]">
              <Command className="size-3" /> Quick Access:
            </span>
            {tags.slice(0, 8).map((tag) => {
              const active = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest transition-colors",
                    active ? "text-[#D2042D] underline decoration-2 underline-offset-4" : "text-[#1A1A1A] hover:text-[#D2042D]"
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </section>

        {/* Results Info */}
        <div className="flex items-center justify-between border-x-2 border-[#1A1A1A] bg-[#1A1A1A] px-6 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#FBF7F2]">
          <span>Displaying {filteredPosts.length} Entries</span>
          <span className="hidden sm:block">Sorted by: Recency</span>
        </div>

        {/* Grid: Bordi condivisi per un look "Swiss Design" */}
        <section id="posts" className="grid border-2 border-t-0 border-[#1A1A1A] md:grid-cols-2">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.slug} className="border-[#1A1A1A] [&:nth-child(odd)]:border-r-2 [&:not(:last-child)]:border-b-2">
                <BlogCard post={post} />
              </div>
            ))
          ) : (
            <div className="col-span-full">
              <BlogEmptyState onReset={() => { updateUrl([]); setQuery(""); }} query={deferredQuery} />
            </div>
          )}
        </section>

        <footer className="mt-20 border-t-2 border-[#1A1A1A] pt-12">
          <SocialFooter />
        </footer>
      </main>
    </div>
  );
}

function getSearchableText(post: Post) {
  const bodyText = post.body.flatMap((b) => b.type === "list" ? b.items : b.content).join(" ");
  return `${post.title} ${post.summary} ${post.tags.join(" ")} ${bodyText}`.toLowerCase();
}
