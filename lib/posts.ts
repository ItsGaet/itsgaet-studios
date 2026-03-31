import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

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

const readPosts = cache((): Post[] => {
  const filenames = fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((filename) => filename.endsWith(".md"))
    .filter((filename) => !path.basename(filename).startsWith("_"));

  return filenames
    .map((filename) => {
      const fullPath = path.join(POSTS_DIRECTORY, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const slug = path.basename(filename, ".md");

      return parsePostFile(fileContents, slug);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
});

export const getAllPosts = () => readPosts();

export const getPostBySlug = (slug: string) =>
  readPosts().find((post) => post.slug === slug);

export const getAllTags = () =>
  Array.from(new Set(readPosts().flatMap((post) => post.tags))).sort();

export const getPostsByTag = (tag: string) =>
  readPosts().filter((post) => post.tags.includes(tag));

function parsePostFile(fileContents: string, slug: string): Post {
  const match = fileContents.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

  if (!match) {
    throw new Error(`Post "${slug}" is missing valid frontmatter.`);
  }

  const [, frontmatterSource, bodySource] = match;
  const frontmatter = parseFrontmatter(frontmatterSource, bodySource, slug);

  return {
    slug,
    ...frontmatter,
    featured: frontmatter.featured || undefined,
    body: parseBody(bodySource),
  };
}

function parseFrontmatter(
  source: string,
  bodySource: string,
  slug: string
): PostFrontmatter {
  const data = source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, line) => {
      const separatorIndex = line.indexOf(":");

      if (separatorIndex === -1) {
        throw new Error(`Invalid frontmatter line in "${slug}": ${line}`);
      }

      const key = line.slice(0, separatorIndex).trim();
      const value = normalizeScalar(line.slice(separatorIndex + 1).trim());
      acc[key] = value;

      return acc;
    }, {});

  return {
    title: getRequiredField(data, "title", slug),
    summary: getRequiredField(data, "summary", slug),
    date: getRequiredField(data, "date", slug),
    readTime: data.readTime || estimateReadTime(bodySource),
    tags: parseTags(data.tags),
    featured: parseBoolean(data.featured),
  };
}

function getRequiredField(
  data: Record<string, string>,
  key: string,
  slug: string
) {
  const value = data[key];

  if (!value) {
    throw new Error(`Post "${slug}" is missing required field "${key}".`);
  }

  return value;
}

function parseTags(source?: string) {
  if (!source) {
    return [];
  }

  const normalized = source
    .replace(/^\[/, "")
    .replace(/\]$/, "")
    .split(",")
    .map((tag) => normalizeScalar(tag.trim()))
    .filter(Boolean);

  return Array.from(new Set(normalized));
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

function parseBody(source: string): PostBlock[] {
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

      if (index < lines.length) {
        index += 1;
      }

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
