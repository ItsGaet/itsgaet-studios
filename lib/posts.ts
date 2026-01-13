export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  body: string[];
};

const posts: Post[] = [
  {
    slug: "manifesto",
    title: "A technical blog, without noise",
    summary:
      "Who I write for, what I publish, and how I keep track of the technical decisions that really matter.",
    date: "2025-02-10",
    readTime: "3 min",
    tags: ["editorial", "workflow"],
    featured: true,
    body: [
      "This space exists to capture decisions, trade-offs, and operational details that often stay in my head or in private notes. I wanted a place where technical context does not disappear after a call or a demo.",
      "I will write mostly about frontend, design engineering, and tools that improve the quality of everyday work. Few posts, dense, with real examples and clear reasons.",
      "If you are building digital products and care about the craft side of software, you will find replicable notes and a pragmatic point of view here.",
    ],
  },
  {
    slug: "nextjs-github-pages",
    title: "Next.js on GitHub Pages: what really works",
    summary:
      "Static export, real limits, and how to avoid surprises when deployment moves from Vercel to GitHub Pages.",
    date: "2025-02-12",
    readTime: "5 min",
    tags: ["next.js", "deploy", "github-pages"],
    body: [
      "GitHub Pages is great for a static site: reliable, free, and with a simple pipeline. The key is accepting that everything must be pre-rendered.",
      "With Next.js you need to use static export. No API routes, no server actions, and unoptimized images. In return you get fast pages that are easy to version.",
      "The good news is that for a technical blog this choice is perfect. Just organize content well and define generateStaticParams for every dynamic page.",
    ],
  },
  {
    slug: "shadcn-tailwind-v4",
    title: "Shadcn + Tailwind v4: first field notes",
    summary:
      "What changes with the new themes, CSS variables, and how to set up a lightweight design system.",
    date: "2025-02-14",
    readTime: "4 min",
    tags: ["ui", "tailwind", "design-system"],
    body: [
      "The initial shadcn setup with Tailwind v4 brings CSS variables, coherent tokens, and a clean set of components right away. It is a solid base for a lean system.",
      "I am most interested in theming: oklch colors, modular radius, and a type scale that is easy to control. Perfect for a technical blog that should not turn into a mega framework.",
      "My rule: fewer components, more consistency. Better three cards done well than ten inconsistent variants.",
    ],
  },
];

export const getAllPosts = () =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPostBySlug = (slug: string) =>
  posts.find((post) => post.slug === slug);
