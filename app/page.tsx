import BlogCTA from "@/components/home/blog-cta";
import HomeHero from "@/components/home/hero";
import SocialFooter from "@/components/home/social-footer";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-[-10%] h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl hero-float" />
        <div className="absolute bottom-[-25%] right-[-5%] h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl hero-float-slow" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent" />
      </div>

      <main className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 py-16">
        <HomeHero />
        <BlogCTA />
        <SocialFooter />
      </main>
    </div>
  );
}
