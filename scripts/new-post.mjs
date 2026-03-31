import fs from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();

if (!title) {
  console.error('Usage: npm run new:post -- "Your post title"');
  process.exit(1);
}

const postsDirectory = path.join(process.cwd(), "content/posts");
const slug = slugify(title);
const filePath = path.join(postsDirectory, `${slug}.md`);
const today = new Intl.DateTimeFormat("en-CA", {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
}).format(new Date());

if (fs.existsSync(filePath)) {
  console.error(`Post already exists: ${path.relative(process.cwd(), filePath)}`);
  process.exit(1);
}

fs.mkdirSync(postsDirectory, { recursive: true });
fs.writeFileSync(
  filePath,
  `---
title: ${title}
summary: Short summary of the post.
date: ${today}
tags: general
featured: false
---

## Why this matters

Explain the problem you are solving.

## Approach

Describe the implementation, tradeoffs, or workflow.

## Verification

Close with outcomes, gotchas, or next steps.
`,
  "utf8"
);

console.log(`Created ${path.relative(process.cwd(), filePath)}`);

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
