import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const postsDirectory = path.join(cwd, "content/posts");
const outputDirectory = path.join(cwd, "public/og");
const postsOutputDirectory = path.join(outputDirectory, "posts");
const topicsOutputDirectory = path.join(outputDirectory, "topics");

fs.mkdirSync(postsOutputDirectory, { recursive: true });
fs.mkdirSync(topicsOutputDirectory, { recursive: true });

const posts = fs
  .readdirSync(postsDirectory)
  .filter((filename) => filename.endsWith(".md"))
  .filter((filename) => !filename.startsWith("_"))
  .map((filename) => parsePostFile(path.join(postsDirectory, filename)));

const topics = buildTopics(posts);

posts.forEach((post) => {
  fs.writeFileSync(
    path.join(postsOutputDirectory, `${post.slug}.svg`),
    renderPostSvg(post),
    "utf8"
  );
});

topics.forEach((topic) => {
  fs.writeFileSync(
    path.join(topicsOutputDirectory, `${topic.slug}.svg`),
    renderTopicSvg(topic),
    "utf8"
  );
});

console.log(
  `Generated ${posts.length} post OG images and ${topics.length} topic OG images.`
);

function parsePostFile(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);

  if (!match) {
    throw new Error(`Missing frontmatter in ${filePath}`);
  }

  const [, frontmatterSource] = match;
  const data = Object.fromEntries(
    frontmatterSource
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf(":");
        return [
          line.slice(0, separatorIndex).trim(),
          normalizeScalar(line.slice(separatorIndex + 1).trim()),
        ];
      })
  );

  const slug = path.basename(filePath, ".md");
  const tags = (data.tags ?? "")
    .split(",")
    .map((tag) => normalizeTag(tag))
    .filter(Boolean);

  return {
    slug,
    title: data.title ?? slug,
    summary: data.summary ?? "",
    date: data.date ?? "",
    tags,
  };
}

function buildTopics(posts) {
  const topicMap = new Map();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const current = topicMap.get(tag);

      if (!current) {
        topicMap.set(tag, {
          slug: tag,
          label: topicLabel(tag),
          description: topicDescription(tag),
          postCount: 1,
        });
        return;
      }

      current.postCount += 1;
    });
  });

  return Array.from(topicMap.values());
}

function renderPostSvg(post) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#050816"/>
  <circle cx="1038" cy="126" r="214" fill="#D946EF" fill-opacity="0.16"/>
  <circle cx="178" cy="560" r="230" fill="#22D3EE" fill-opacity="0.14"/>
  <rect x="54" y="54" width="1092" height="522" rx="36" fill="url(#panel)" stroke="#FFFFFF" stroke-opacity="0.12"/>
  <text x="106" y="146" fill="#22D3EE" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="5">${escapeXml(
    post.tags[0] ? `#${post.tags[0]}` : "ITSGAET"
  )}</text>
  ${renderTextLines(post.title, 106, 230, 74, "#FFFFFF", 820, 2, 88)}
  ${renderTextLines(post.summary, 106, 412, 28, "#A6B0C0", 860, 2, 38)}
  <text x="106" y="530" fill="#F5F7FB" font-family="JetBrains Mono, monospace" font-size="22" font-weight="700">${escapeXml(
    post.date || "Technical note"
  )}</text>
  <text x="954" y="530" fill="#D946EF" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="800">itsgaet</text>
  <defs>
    <linearGradient id="panel" x1="87" y1="77" x2="1134" y2="559" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0E1428" stop-opacity="0.94"/>
      <stop offset="1" stop-color="#0B1020" stop-opacity="0.88"/>
    </linearGradient>
  </defs>
</svg>`;
}

function renderTopicSvg(topic) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#050816"/>
  <circle cx="1048" cy="104" r="214" fill="#D946EF" fill-opacity="0.16"/>
  <circle cx="170" cy="540" r="230" fill="#22D3EE" fill-opacity="0.14"/>
  <rect x="54" y="54" width="1092" height="522" rx="36" fill="url(#panel)" stroke="#FFFFFF" stroke-opacity="0.12"/>
  <text x="106" y="152" fill="#D946EF" font-family="Inter, Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="5">TOPIC ARCHIVE</text>
  ${renderTextLines(topic.label, 106, 252, 86, "#FFFFFF", 820, 2, 94)}
  ${renderTextLines(topic.description, 106, 404, 28, "#A6B0C0", 860, 3, 38)}
  <text x="106" y="530" fill="#22D3EE" font-family="JetBrains Mono, monospace" font-size="22" font-weight="700">${escapeXml(
    `${topic.postCount} post${topic.postCount === 1 ? "" : "s"}`
  )}</text>
  <text x="954" y="530" fill="#F5F7FB" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="800">itsgaet</text>
  <defs>
    <linearGradient id="panel" x1="87" y1="77" x2="1134" y2="559" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0E1428" stop-opacity="0.94"/>
      <stop offset="1" stop-color="#0B1020" stop-opacity="0.88"/>
    </linearGradient>
  </defs>
</svg>`;
}

function renderTextLines(text, x, y, fontSize, color, maxWidth, maxLines, lineHeight) {
  const lines = wrapText(text, maxWidth, fontSize).slice(0, maxLines);

  return lines
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" fill="${color}" font-family="Inter, Arial, sans-serif" font-size="${fontSize}" font-weight="${
          fontSize >= 60 ? 800 : 500
        }">${escapeXml(line)}</text>`
    )
    .join("\n  ");
}

function wrapText(text, maxWidth, fontSize) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines = [];
  let currentLine = "";
  const approxCharWidth = fontSize * 0.56;
  const maxChars = Math.max(12, Math.floor(maxWidth / approxCharWidth));

  words.forEach((word) => {
    const candidate = currentLine ? `${currentLine} ${word}` : word;

    if (candidate.length <= maxChars) {
      currentLine = candidate;
      return;
    }

    if (currentLine) {
      lines.push(currentLine);
    }
    currentLine = word;
  });

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
}

function normalizeScalar(value) {
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }

  return value;
}

function normalizeTag(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function topicLabel(slug) {
  if (slug === "n8n") {
    return "n8n";
  }

  return slug
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function topicDescription(slug) {
  const descriptions = {
    "aria-automation":
      "Upgrade paths, hardening, and platform runbooks around VMware Aria Automation.",
    argocd:
      "GitOps workflows, progressive delivery patterns, and operational controls for Kubernetes releases.",
    kafka:
      "Reliable event pipelines, outbox patterns, and resilient stream processing.",
    kubernetes:
      "Operational tuning, resource sizing, and predictable cluster behavior.",
    n8n: "Execution architecture, persistence, and workflow automation at production scale.",
    postgres:
      "Replication, zero-downtime migrations, and database engineering notes.",
    rust:
      "Backpressure, throughput, and service resilience in production Rust systems.",
  };

  return descriptions[slug] ?? `${topicLabel(slug)} notes from the archive.`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
