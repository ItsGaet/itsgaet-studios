import { cn } from "@/lib/utils";
import type { PostBlock } from "@/lib/posts";

type BlogPostContentProps = {
  body: PostBlock[];
};

export default function BlogPostContent({ body }: BlogPostContentProps) {
  return (
    <article className="relative border-2 border-[#1A1A1A] bg-[#FBF7F2] p-8 md:p-16 lg:p-20">
      {/* Decorative Side Label */}
      <div className="absolute left-4 top-20 hidden -rotate-90 text-[10px] font-black uppercase tracking-[0.5em] text-[#D8C6BB] lg:block">
        Technical Archive // Content
      </div>

      <div className="mx-auto max-w-2xl space-y-12">
        {body.map((block, index) => {
          if (block.type === "heading") {
            const Tag = block.level === 2 ? "h2" : "h3";
            return (
              <Tag
                key={`${block.type}-${index}`}
                className={cn(
                  "font-serif tracking-tighter text-[#1A1A1A]",
                  block.level === 2 ? "pt-8 text-5xl md:text-6xl" : "pt-4 text-3xl md:text-4xl"
                )}
              >
                {renderInlineContent(block.content)}
                <span className="text-[#D2042D]">.</span>
              </Tag>
            );
          }

          if (block.type === "list") {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={`${block.type}-${index}`}
                className={cn(
                  "space-y-4 text-lg leading-relaxed text-[#4A4A4A]",
                  block.ordered ? "list-decimal pl-5" : "list-none"
                )}
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`${item}-${itemIndex}`} className="relative">
                    {!block.ordered && (
                      <span className="absolute -left-6 text-[#D2042D] font-bold">—</span>
                    )}
                    {renderInlineContent(item)}
                  </li>
                ))}
              </ListTag>
            );
          }

          if (block.type === "quote") {
            return (
              <blockquote
                key={`${block.type}-${index}`}
                className="border-y-2 border-[#1A1A1A] py-8 text-2xl font-serif italic leading-tight text-[#1A1A1A]"
              >
                “{renderInlineContent(block.content)}”
              </blockquote>
            );
          }

          if (block.type === "code") {
            return (
              <div key={`${block.type}-${index}`} className="border-2 border-[#1A1A1A] bg-[#1A1A1A]">
                {block.language && (
                  <div className="border-b border-[#FBF7F2]/20 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#FBF7F2]">
                    {block.language}
                  </div>
                )}
                <pre className="overflow-x-auto p-6 text-sm leading-relaxed text-[#FBF7F2]">
                  <code className="font-mono">{block.content}</code>
                </pre>
              </div>
            );
          }

          return (
            <p
              key={`${block.type}-${index}`}
              className={cn(
                "text-xl leading-relaxed text-[#4A4A4A]",
                index === 0 &&
                  "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-8xl first-letter:font-medium first-letter:leading-[0.8] first-letter:text-[#D2042D]"
              )}
            >
              {renderInlineContent(block.content)}
            </p>
          );
        })}
      </div>

      {/* End of Content Marker */}
      <div className="mt-24 flex items-center justify-between border-t-2 border-[#1A1A1A] pt-6">
        <div className="flex items-center gap-2">
          <div className="size-3 bg-[#D2042D]" />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1A1A1A]">
            End of entry
          </p>
        </div>
        <div className="text-[10px] font-bold text-[#D8C6BB]">
          REF: {new Date().getFullYear()}{" // CHRY_CTTN"}
        </div>
      </div>
    </article>
  );
}

function renderInlineContent(content: string) {
  const tokens = content.split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g).filter(Boolean);

  return tokens.map((token, index) => {
    if (token.startsWith("`") && token.endsWith("`")) {
      return (
        <code
          key={`${token}-${index}`}
          className="bg-[#1A1A1A] px-1.5 py-0.5 font-mono text-[0.9em] text-[#FBF7F2]"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      return (
        <a
          key={`${href}-${index}`}
          href={href}
          className="font-bold text-[#D2042D] underline decoration-2 underline-offset-4 transition-colors hover:bg-[#D2042D] hover:text-[#FBF7F2]"
        >
          {label}
        </a>
      );
    }

    return <span key={`${token}-${index}`}>{token}</span>;
  });
}
