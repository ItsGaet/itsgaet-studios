import type { Metadata } from "next";
import FloatingSidebar from "@/components/navigation/floating-sidebar";
import { absoluteUrl, siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  alternates: {
    canonical: absoluteUrl("/"),
    types: {
      "application/rss+xml": absoluteUrl("/feed.xml"),
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: absoluteUrl("/"),
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  authors: [{ name: siteConfig.fullName, url: siteConfig.links.linkedin }],
  creator: siteConfig.fullName,
  publisher: siteConfig.name,
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-background font-sans antialiased">
        <a
          href="#content"
          className="sr-only fixed left-4 top-4 z-[10000] rounded-full bg-amber-300 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-950 shadow-lg focus:not-sr-only"
        >
          Skip to content
        </a>
        <div className="noise-overlay pointer-events-none fixed inset-0 z-[9999]" />

        <FloatingSidebar />

        <div
          id="content"
          className="relative pb-24 transition-all duration-500 md:pb-0"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
