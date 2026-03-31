import { getAllPosts, renderPostBlocksToHtml } from "@/lib/posts";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const feedUrl = absoluteUrl("/feed.xml");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:atom="http://www.w3.org/2005/Atom" 
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
>
  <channel>
    <title>${escapeXml(siteConfig.title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <copyright>${escapeXml(`© 2026 ${siteConfig.fullName}`)}</copyright>
    <lastBuildDate>${new Date(
      posts[0] ? `${posts[0].date}T00:00:00.000Z` : Date.now()
    ).toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    ${posts
      .map(
        (post) => `<item>
      <title>${escapeXml(post.title)}</title>
      <link>${absoluteUrl(`/blog/${post.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${post.slug}`)}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00.000Z`).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(siteConfig.fullName)}</dc:creator>
      ${post.tags
        .map(
          (tag) =>
            `<category>${escapeXml(tag)}</category>`
        )
        .join("\n      ")}
      <description>${escapeXml(post.summary)}</description>
      <content:encoded>${wrapCdata(
        `<div>
          ${renderPostBlocksToHtml(post.body)}
          <hr />
          <p>
            <a href="${absoluteUrl(`/blog/${post.slug}`)}">
              View this entry in the original archive // ${siteConfig.name}
            </a>
          </p>
        </div>`
      )}</content:encoded>
    </item>`
      )
      .join("\n")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
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