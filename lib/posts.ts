import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

import { normalizeTag } from "@/lib/topics";

export type PostBlock =
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "heading";
      content: string;
      level: 2 | 3;
    }
  | {
      type: "list";
      items: string[];
      ordered: boolean;
    }
  | {
      type: "quote";
      content: string;
    }
  | {
      type: "code";
      content: string;
      language?: string;
    };

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  body: PostBlock[];
};

type PostFrontmatter = Omit<Post, "slug" | "body" | "featured"> & {
  featured: boolean;
};

const POSTS_DIRECTORY = path.join(process.cwd(), "content/posts");
const ALLOWED_FRONTMATTER_KEYS = new Set([
  "title",
  "summary",
  "date",
  "readTime",
  "tags",
  "featured",
]);
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const readPosts = cache((): Post[] => {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    throw new Error(`Posts directory not found: ${POSTS_DIRECTORY}`);
  }

  const filenames = fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((filename) => filename.endsWith(".md"))
    .filter((filename) => !path.basename(filename).startsWith("_"));

  return filenames
    .map((filename) => {
      const fullPath = path.join(POSTS_DIRECTORY, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const slug = path.basename(filename, ".md");

      validateSlug(slug, fullPath);

      return parsePostFile(fileContents, slug, fullPath);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getAllPosts = () => readPosts();

export const getPostBySlug = (slug: string) =>
  readPosts().find((post) => post.slug === slug);

export const getAllTags = () =>
  Array.from(new Set(readPosts().flatMap((post) => post.tags))).sort();

export const getPostsByTag = (tag: string) => {
  const normalizedTag = normalizeTag(tag);

  return readPosts().filter((post) => post.tags.includes(normalizedTag));
};

export const getFeaturedPosts = (limit = 3) => {
  const posts = readPosts();
  const featured = posts.filter((post) => post.featured);
  const remainder = posts.filter((post) => !post.featured);

  return [...featured, ...remainder].slice(0, limit);
};

export const getRelatedPosts = (slug: string, limit = 3) => {
  const currentPost = getPostBySlug(slug);

  if (!currentPost) {
    return [];
  }

  const posts = readPosts().filter((post) => post.slug !== slug);
  const scoredPosts = posts.map((post) => ({
    post,
    sharedTagCount: countSharedTags(currentPost.tags, post.tags),
  }));

  const primaryMatches = scoredPosts
    .filter((entry) => entry.sharedTagCount > 0)
    .sort(
      (a, b) =>
        b.sharedTagCount - a.sharedTagCount ||
        Number(Boolean(b.post.featured)) - Number(Boolean(a.post.featured)) ||
        b.post.date.localeCompare(a.post.date)
    )
    .map((entry) => entry.post);

  if (primaryMatches.length >= limit) {
    return primaryMatches.slice(0, limit);
  }

  const fallback = scoredPosts
    .filter((entry) => entry.sharedTagCount === 0)
    .sort(
      (a, b) =>
        Number(Boolean(b.post.featured)) - Number(Boolean(a.post.featured)) ||
        b.post.date.localeCompare(a.post.date)
    )
    .map((entry) => entry.post);

  return [...primaryMatches, ...fallback].slice(0, limit);
};

export function renderPostBlocksToHtml(body: PostBlock[]) {
  return body
    .map((block) => {
      if (block.type === "heading") {
        const tag = block.level === 2 ? "h2" : "h3";
        return `<${tag}>${renderInlineContentToHtml(block.content)}</${tag}>`;
      }

      if (block.type === "list") {
        const tag = block.ordered ? "ol" : "ul";
        const items = block.items
          .map((item) => `<li>${renderInlineContentToHtml(item)}</li>`)
          .join("");

        return `<${tag}>${items}</${tag}>`;
      }

      if (block.type === "quote") {
        return `<blockquote><p>${renderInlineContentToHtml(
          block.content
        )}</p></blockquote>`;
      }

      if (block.type === "code") {
        const languageClass = block.language
          ? ` class="language-${escapeHtmlAttribute(block.language)}"`
          : "";

        return `<pre><code${languageClass}>${escapeHtmlContent(
          block.content
        )}</code></pre>`;
      }

      return `<p>${renderInlineContentToHtml(block.content)}</p>`;
    })
    .join("\n");
}

function parsePostFile(fileContents: string, slug: string, filePath: string): Post {
  const match = fileContents.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

  if (!match) {
    throw new Error(`Post "${slug}" is missing valid frontmatter in ${filePath}.`);
  }

  const [, frontmatterSource, bodySource] = match;
  const frontmatter = parseFrontmatter(frontmatterSource, bodySource, slug, filePath);
  const body = parseBody(bodySource, slug, filePath);

  if (body.length === 0) {
    throw new Error(`Post "${slug}" has no readable body blocks in ${filePath}.`);
  }

  return {
    slug,
    ...frontmatter,
    featured: frontmatter.featured || undefined,
    body,
  };
}

function parseFrontmatter(
  source: string,
  bodySource: string,
  slug: string,
  filePath: string
): PostFrontmatter {
  const data = source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, line) => {
      const separatorIndex = line.indexOf(":");

      if (separatorIndex === -1) {
        throw new Error(`Invalid frontmatter line in "${slug}" (${filePath}): ${line}`);
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = normalizeScalar(line.slice(separatorIndex + 1).trim());

      if (!ALLOWED_FRONTMATTER_KEYS.has(key)) {
        throw new Error(
          `Unsupported frontmatter key "${key}" in "${slug}" (${filePath}).`
        );
      }

      if (key in acc) {
        throw new Error(
          `Duplicate frontmatter key "${key}" in "${slug}" (${filePath}).`
        );
      }

      acc[key] = value;

      return acc;
    }, {});

  return {
    title: validateTitle(getRequiredField(data, "title", slug, filePath), slug, filePath),
    summary: validateSummary(
      getRequiredField(data, "summary", slug, filePath),
      slug,
      filePath
    ),
    date: validateDate(getRequiredField(data, "date", slug, filePath), slug, filePath),
    readTime: validateReadTime(
      data.readTime || estimateReadTime(bodySource),
      slug,
      filePath
    ),
    tags: parseTags(data.tags, slug, filePath),
    featured: parseBoolean(data.featured),
  };
}

function getRequiredField(
  data: Record<string, string>,
  key: string,
  slug: string,
  filePath: string
) {
  const value = data[key];

  if (!value) {
    throw new Error(
      `Post "${slug}" is missing required field "${key}" in ${filePath}.`
    );
  }

  return value;
}

function parseTags(source: string | undefined, slug: string, filePath: string) {
  const normalized = (source ?? "")
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((tag) => normalizeTag(normalizeScalar(tag.trim())))
    .filter(Boolean);

  const uniqueTags = Array.from(new Set(normalized));

  if (uniqueTags.length === 0) {
    throw new Error(`Post "${slug}" must define at least one tag in ${filePath}.`);
  }

  return uniqueTags;
}

function parseBoolean(source?: string) {
  return /^(true|1|yes)$/i.test(source ?? "");
}

function normalizeScalar(value: string) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function estimateReadTime(source: string) {
  const wordCount = source
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));

  return `${minutes} min`;
}

function parseBody(source: string, slug: string, filePath: string): PostBlock[] {
  const lines = source.trim().split(/\r?\n/);
  const blocks: PostBlock[] = [];

  let index = 0;

  while (index < lines.length) {
    const line = lines[index]?.trimEnd() ?? "";
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim() || undefined;
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index >= lines.length) {
        throw new Error(
          `Post "${slug}" has an unclosed code fence in ${filePath}.`
        );
      }

      index += 1;

      blocks.push({
        type: "code",
        language,
        content: codeLines.join("\n"),
      });
      continue;
    }

    if (trimmed.startsWith("## ")) {
      blocks.push({
        type: "heading",
        level: 2,
        content: trimmed.slice(3).trim(),
      });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("### ")) {
      blocks.push({
        type: "heading",
        level: 3,
        content: trimmed.slice(4).trim(),
      });
      index += 1;
      continue;
    }

    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith("> ")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push({
        type: "quote",
        content: quoteLines.join(" "),
      });
      continue;
    }

    const listItem = parseListItem(trimmed);
    if (listItem) {
      const items: string[] = [];
      const ordered = listItem.ordered;

      while (index < lines.length) {
        const current = parseListItem(lines[index].trim());
        if (!current || current.ordered !== ordered) {
          break;
        }

        items.push(current.content);
        index += 1;
      }

      blocks.push({
        type: "list",
        items,
        ordered,
      });
      continue;
    }

    const paragraphLines: string[] = [];

    while (index < lines.length && !isBlockBoundary(lines[index])) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({
      type: "paragraph",
      content: paragraphLines.join(" "),
    });
  }

  return blocks;
}

function isBlockBoundary(line: string) {
  const trimmed = line.trim();

  return (
    trimmed === "" ||
    trimmed.startsWith("```") ||
    trimmed.startsWith("## ") ||
    trimmed.startsWith("### ") ||
    trimmed.startsWith("> ") ||
    parseListItem(trimmed) !== null
  );
}

function parseListItem(line: string) {
  const unorderedMatch = line.match(/^[-*]\s+(.+)$/);
  if (unorderedMatch) {
    return { ordered: false, content: unorderedMatch[1].trim() };
  }

  const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
  if (orderedMatch) {
    return { ordered: true, content: orderedMatch[1].trim() };
  }

  return null;
}

function validateSlug(slug: string, filePath: string) {
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      `Invalid post slug "${slug}" from filename ${filePath}. Use lowercase kebab-case.`
    );
  }
}

function validateTitle(value: string, slug: string, filePath: string) {
  if (value.length < 8) {
    throw new Error(`Post "${slug}" has a title that is too short in ${filePath}.`);
  }

  return value;
}

function validateSummary(value: string, slug: string, filePath: string) {
  if (value.length < 20) {
    throw new Error(
      `Post "${slug}" has a summary that is too short in ${filePath}.`
    );
  }

  return value;
}

function validateDate(value: string, slug: string, filePath: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(
      `Post "${slug}" has an invalid date "${value}" in ${filePath}. Use YYYY-MM-DD.`
    );
  }

  const date = new Date(`${value}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error(`Post "${slug}" has a non-existent date "${value}" in ${filePath}.`);
  }

  return value;
}

function validateReadTime(value: string, slug: string, filePath: string) {
  if (!/^\d+\s+min$/.test(value)) {
    throw new Error(
      `Post "${slug}" has an invalid readTime "${value}" in ${filePath}. Use formats like "6 min".`
    );
  }

  return value;
}

function countSharedTags(a: string[], b: string[]) {
  const reference = new Set(a);
  return b.reduce((count, tag) => count + Number(reference.has(tag)), 0);
}

function renderInlineContentToHtml(content: string) {
  return content
    .split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
    .filter(Boolean)
    .map((token) => {
      if (token.startsWith("`") && token.endsWith("`")) {
        return `<code>${escapeHtmlContent(token.slice(1, -1))}</code>`;
      }

      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

      if (linkMatch) {
        const [, label, href] = linkMatch;
        return `<a href="${escapeHtmlAttribute(href)}">${escapeHtmlContent(
          label
        )}</a>`;
      }

      return escapeHtmlContent(token);
    })
    .join("");
}

function escapeHtmlContent(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtmlAttribute(value: string) {
  return escapeHtmlContent(value).replace(/"/g, "&quot;");
}
