import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { PostBlock } from "@/lib/posts";

type BlogPostContentProps = {
  body: PostBlock[];
};

export default function BlogPostContent({ body }: BlogPostContentProps) {
  return (
    <article className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0f172a]/76 px-6 py-10 backdrop-blur-sm sm:px-10 sm:py-12">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-amber-300/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-3xl space-y-8">
        {body.map((block, index) => {
          if (block.type === "heading") {
            if (block.level === 2) {
              return (
                <h2
                  key={`${block.type}-${index}`}
                  className="font-display pt-6 text-3xl tracking-[-0.035em] text-white sm:text-4xl"
                >
                  {renderInlineContent(block.content)}
                </h2>
              );
            }

            return (
              <h3
                key={`${block.type}-${index}`}
                className="pt-2 text-xl font-bold tracking-tight text-white/92 sm:text-2xl"
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
                  "space-y-3 pl-6 text-base leading-relaxed text-white/72 sm:text-lg",
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
                className="border-l-2 border-amber-300/40 pl-5 text-lg italic leading-relaxed text-white/64"
              >
                {renderInlineContent(block.content)}
              </blockquote>
            );
          }

          if (block.type === "code") {
            return (
              <div
                key={`${block.type}-${index}`}
                className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-black/30"
              >
                {block.language && (
                  <div className="border-b border-white/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                    {block.language}
                  </div>
                )}
                <pre className="overflow-x-auto px-4 py-5 text-sm leading-relaxed text-white/88">
                  <code>{block.content}</code>
                </pre>
              </div>
            );
          }

          return (
            <p
              key={`${block.type}-${index}`}
              className={cn(
                "text-lg leading-relaxed text-white/72 transition-colors hover:text-white",
                index === 0 &&
                  "first-letter:font-display first-letter:mr-3 first-letter:float-left first-letter:text-7xl first-letter:text-amber-200"
              )}
            >
              {renderInlineContent(block.content)}
            </p>
          );
        })}
      </div>

      <div className="mt-16 flex items-center gap-4 border-t border-white/8 pt-8">
        <div className="size-2 rounded-full bg-amber-200" />
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/40">
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
          className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[0.95em] text-amber-200"
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
          className="font-semibold text-amber-200 underline decoration-amber-300/30 underline-offset-4 transition-colors hover:text-amber-100"
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
