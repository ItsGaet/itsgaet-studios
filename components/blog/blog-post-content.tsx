import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { PostBlock } from "@/lib/posts";

type BlogPostContentProps = {
  body: PostBlock[];
};

export default function BlogPostContent({ body }: BlogPostContentProps) {
  return (
    <article className="relative overflow-hidden rounded-[2.5rem] border border-border/40 bg-card/30 px-8 py-12 backdrop-blur-sm sm:px-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
        <div className="absolute -left-20 top-20 size-96 rounded-full bg-fuchsia-500/[0.03] blur-[120px]" />
        <div className="absolute -right-20 bottom-20 size-96 rounded-full bg-cyan-500/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-3xl space-y-8">
        {body.map((block, index) => {
          if (block.type === "heading") {
            if (block.level === 2) {
              return (
                <h2
                  key={`${block.type}-${index}`}
                  className="pt-4 text-2xl font-black tracking-tight text-foreground sm:text-3xl"
                >
                  {renderInlineContent(block.content)}
                </h2>
              );
            }

            return (
              <h3
                key={`${block.type}-${index}`}
                className="pt-2 text-xl font-bold tracking-tight text-foreground/90 sm:text-2xl"
              >
                {renderInlineContent(block.content)}
              </h3>
            );
          }

          if (block.type === "list") {
            const ListTag = block.ordered ? "ol" : "ul";

            return (
              <ListTag
                key={`${block.type}-${index}`}
                className={cn(
                  "space-y-3 pl-6 text-base leading-relaxed text-foreground/80 sm:text-lg",
                  block.ordered ? "list-decimal" : "list-disc"
                )}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`${item}-${itemIndex}`}>{renderInlineContent(item)}</li>
                ))}
              </ListTag>
            );
          }

          if (block.type === "quote") {
            return (
              <blockquote
                key={`${block.type}-${index}`}
                className="border-l-2 border-fuchsia-500/40 pl-5 text-lg italic leading-relaxed text-foreground/70"
              >
                {renderInlineContent(block.content)}
              </blockquote>
            );
          }

          if (block.type === "code") {
            return (
              <div
                key={`${block.type}-${index}`}
                className="overflow-hidden rounded-[1.75rem] border border-border/50 bg-black/30"
              >
                {block.language && (
                  <div className="border-b border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/50">
                    {block.language}
                  </div>
                )}
                <pre className="overflow-x-auto px-4 py-5 text-sm leading-relaxed text-foreground/90">
                  <code>{block.content}</code>
                </pre>
              </div>
            );
          }

          return (
            <p
              key={`${block.type}-${index}`}
              className={cn(
                "text-lg leading-relaxed text-foreground/80 transition-colors hover:text-foreground",
                index === 0 &&
                  "first-letter:mr-3 first-letter:float-left first-letter:text-7xl first-letter:font-black first-letter:text-fuchsia-500"
              )}
            >
              {renderInlineContent(block.content)}
            </p>
          );
        })}
      </div>

      <div className="mt-16 flex items-center gap-4 border-t border-border/20 pt-8">
        <div className="size-2 animate-pulse rounded-full bg-fuchsia-500" />
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground/50">
          End of transmission
        </p>
      </div>
    </article>
  );
}

function renderInlineContent(content: string) {
  const tokens = content
    .split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean);

  return tokens.map((token, index) => {
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code
          key={`${token}-${index}`}
          className="rounded-md border border-border/50 bg-background/70 px-1.5 py-0.5 font-mono text-[0.95em] text-fuchsia-300"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = /^https?:\/\//.test(href);

      return (
        <a
          key={`${href}-${index}`}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="font-semibold text-fuchsia-400 underline decoration-fuchsia-500/30 underline-offset-4 transition-colors hover:text-fuchsia-300"
        >
          {label}
        </a>
      );
    }

    return <InlineText key={`${token}-${index}`}>{token}</InlineText>;
  });
}

function InlineText({ children }: { children: string }) {
  return <>{children as ReactNode}</>;
}
