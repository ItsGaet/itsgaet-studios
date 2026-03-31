# itsgaet.studios

Personal site built with Next.js App Router and exported as a static site.

## Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Static export via `output: "export"`

## Development

```bash
npm install
npm run dev
```

## Blog workflow

Blog posts now live in `content/posts` as Markdown files with simple frontmatter.

### Create a new post

```bash
npm run new:post -- "Your post title"
```

This creates a new file in `content/posts/<slug>.md`.

### Frontmatter fields

- `title`: required
- `summary`: required
- `date`: required, use `YYYY-MM-DD`
- `tags`: comma-separated list
- `featured`: optional, `true` or `false`
- `readTime`: optional, auto-calculated if omitted

### Supported content blocks

- Paragraphs
- `##` and `###` headings
- Ordered and unordered lists
- Blockquotes with `>`
- Fenced code blocks with triple backticks
- Inline code with backticks
- Markdown links like `[label](https://example.com)`

## Build checks

```bash
npm run lint
npm run build
```

## Current improvement direction

- Content is now separated from presentation, so adding articles does not require editing TypeScript.
- The next sensible step is tightening SEO and social metadata per post, then replacing remaining boilerplate/home copy with production content.
