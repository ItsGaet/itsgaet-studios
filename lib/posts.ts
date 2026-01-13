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
    title: "Un blog tecnico, senza rumore",
    summary:
      "Per chi scrivo, cosa pubblico e come tengo traccia delle scelte tecniche che contano davvero.",
    date: "2025-02-10",
    readTime: "3 min",
    tags: ["editoriale", "workflow"],
    featured: true,
    body: [
      "Questo spazio nasce per fissare decisioni, trade-off e dettagli operativi che spesso restano in testa o in note private. Voglio un posto dove i contesti tecnici non si perdano dopo una call o una demo.",
      "Scrivero' soprattutto di frontend, design engineering e strumenti che migliorano la qualita' del lavoro quotidiano. Pochi post, densi, con esempi reali e motivazioni chiare.",
      "Se stai costruendo prodotti digitali e ti interessa la parte artigianale del software, qui troverai appunti replicabili e un punto di vista pragmatico.",
    ],
  },
  {
    slug: "nextjs-github-pages",
    title: "Next.js su GitHub Pages: cosa funziona davvero",
    summary:
      "Static export, limiti reali e come evitare sorprese quando il deploy passa da Vercel a GitHub Pages.",
    date: "2025-02-12",
    readTime: "5 min",
    tags: ["next.js", "deploy", "github-pages"],
    body: [
      "GitHub Pages e' ottimo per un sito statico: affidabile, gratuito e con una pipeline semplice. Il punto chiave e' accettare che tutto deve essere pre-renderizzato.",
      "Con Next.js bisogna usare l'export statico. Niente API routes, niente server actions e immagini non ottimizzate. In cambio hai pagine veloci e facili da versionare.",
      "La buona notizia e' che per un blog tecnico questa scelta e' perfetta. Basta organizzare bene i contenuti e definire generateStaticParams per ogni pagina dinamica.",
    ],
  },
  {
    slug: "shadcn-tailwind-v4",
    title: "Shadcn + Tailwind v4: prime note operative",
    summary:
      "Cosa cambia con i nuovi temi, le variabili CSS e come impostare un design system leggero.",
    date: "2025-02-14",
    readTime: "4 min",
    tags: ["ui", "tailwind", "design-system"],
    body: [
      "Il setup iniziale di shadcn con Tailwind v4 porta subito in dote variabili CSS, token coerenti e un set di componenti puliti. E' una buona base per un sistema snello.",
      "Mi interessa soprattutto la parte di theming: colori in oklch, radius modulare e uno scale tipografica facile da controllare. Perfetto per un blog tecnico che non deve diventare un mega framework.",
      "La mia regola: meno componenti, piu' consistenza. Meglio tre card fatte bene che dieci varianti incoerenti.",
    ],
  },
];

export const getAllPosts = () =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPostBySlug = (slug: string) =>
  posts.find((post) => post.slug === slug);
