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
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen overflow-x-hidden bg-background font-sans antialiased selection:bg-[#D2042D] selection:text-[#FBF7F2]">
        {/* Skip to Content - Brutalist Style */}
        <a
          href="#content"
          className="sr-only fixed left-0 top-0 z-[10000] border-2 border-[#1A1A1A] bg-[#D2042D] px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#FBF7F2] focus:not-sr-only"
        >
          Skip to content _
        </a>

        {/* Grain Overlay - Per la texture della carta */}
        <div className="grain-overlay" aria-hidden="true" />

        <FloatingSidebar />

        {/* Main Content Wrapper */}
        <main
          id="content"
          className="relative mx-auto max-w-[1600px] px-4 pb-[calc(7.5rem+env(safe-area-inset-bottom))] pt-24 transition-all duration-500 md:px-6 md:pb-16 md:pt-36 lg:px-8"
        >
          <div className="reveal">
            {children}
          </div>
        </main>

        {/* Decorative structural line at the very bottom */}
        <div className="fixed bottom-0 left-0 h-1 w-full bg-[#1A1A1A] z-[90] md:hidden" />
      </body>
    </html>
  );
}
