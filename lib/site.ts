export const siteConfig = {
  name: "itsgaet",
  fullName: "Gaetano Abbaticchio",
  title: "itsgaet | Systems, notes, and product engineering",
  description:
    "Gaetano Abbaticchio writes technical notes, system design patterns, and practical runbooks for teams shipping modern digital products.",
  shortDescription:
    "Systems notes, field-tested patterns, and calm product engineering by Gaetano Abbaticchio.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://itsgaet.github.io").replace(
    /\/$/,
    ""
  ),
  locale: "en_US",
  email: "gaetanoabbaticchio8@gmail.com",
  location: "Bari, Italy",
  role: "Systems-minded product engineer",
  credentials: ["vExpert 2026"],
  ogImage: "/og-default.svg",
  keywords: [
    "software engineering",
    "system design",
    "technical blog",
    "frontend architecture",
    "kafka",
    "postgres",
    "kubernetes",
    "n8n",
    "rust",
  ],
  links: {
    github: "https://github.com/itsgaet",
    linkedin: "https://linkedin.com/in/itsgaet",
    twitter: "https://x.com/itsgaet",
    instagram: "https://instagram.com/itsgaet",
  },
};

export function absoluteUrl(pathname = "/") {
  return new URL(pathname, `${siteConfig.url}/`).toString();
}

export function getPostOgImagePath(slug: string) {
  return `/og/posts/${slug}.svg`;
}

export function getTopicOgImagePath(slug: string) {
  return `/og/topics/${slug}.svg`;
}

export function formatDisplayDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
