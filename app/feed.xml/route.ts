import { getAllPosts, renderPostBlocksToHtml } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const feedUrl = absoluteUrl("/feed.xml");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <managingEditor>${escapeXml(siteConfig.email)} (${escapeXml(siteConfig.fullName)})</managingEditor>
    <webMaster>${escapeXml(siteConfig.email)} (${escapeXml(siteConfig.fullName)})</webMaster>
    <copyright>${escapeXml(`© 2026 ${siteConfig.fullName}`)}</copyright>
    <lastBuildDate>${new Date(
      posts[0] ? `${posts[0].date}T00:00:00.000Z` : Date.now()
    ).toUTCString()}</lastBuildDate>
    ${posts
      .map(
        (post) => `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${absoluteUrl(`/blog/${post.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${post.slug}`)}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00.000Z`).toUTCString()}</pubDate>
      <author>${escapeXml(siteConfig.email)} (${escapeXml(siteConfig.fullName)})</author>
      ${post.tags
        .map(
          (tag) =>
            `<category domain="${escapeXml(
              absoluteUrl(`/topics/${tag}`)
            )}">${escapeXml(tag)}</category>`
        )
        .join("\n      ")}
      <description>${escapeXml(post.summary)}</description>
      <content:encoded>${wrapCdata(
        `${renderPostBlocksToHtml(post.body)}
<p><a href="${absoluteUrl(`/blog/${post.slug}`)}">Read the full post on ${siteConfig.name}</a></p>`
      )}</content:encoded>
    </item>`
      )
      .join("\n")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function wrapCdata(value: string) {
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}
