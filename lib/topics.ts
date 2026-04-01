import { getAllPosts } from "@/lib/posts";

const TOPIC_CONFIG: Record<
  string,
  { label: string; description: string; longDescription: string }
> = {
  "aria-automation": {
    label: "Aria Automation",
    description:
      "Upgrade paths, platform hardening, and operational runbooks around VMware Aria Automation.",
    longDescription:
      "Notes for keeping Aria Automation stable in production: upgrades, integrations, validation, and the ugly edges that show up only after real usage.",
  },
  argocd: {
    label: "ArgoCD",
    description:
      "GitOps workflows, progressive delivery patterns, and operational controls for safer Kubernetes releases.",
    longDescription:
      "Posts about running ArgoCD in production with ordered sync, health validation, and rollback discipline across real delivery pipelines.",
  },
  kafka: {
    label: "Kafka",
    description:
      "Reliable event pipelines, outbox patterns, and failure-resistant stream processing.",
    longDescription:
      "Posts about designing Kafka-based systems that survive duplicate delivery, lag, consumer failure, and real production pressure.",
  },
  kubernetes: {
    label: "Kubernetes",
    description:
      "Operational tuning, scheduling behavior, resource sizing, and cluster pragmatism.",
    longDescription:
      "A working archive of Kubernetes notes focused on predictability: requests, limits, QoS, and the mechanics behind stable workloads.",
  },
  n8n: {
    label: "n8n",
    description:
      "Execution architecture, queue mode, persistence, and production safety for workflow automation.",
    longDescription:
      "Patterns for moving n8n from quick automation experiments to something that behaves like a real platform under traffic and failure.",
  },
  postgres: {
    label: "Postgres",
    description:
      "Replication, zero-downtime migrations, and operational database engineering.",
    longDescription:
      "Field notes on Postgres changes that need to be boring in production: replication, cutovers, table rewrites, and migration discipline.",
  },
  rust: {
    label: "Rust",
    description:
      "Runtime behavior, backpressure, throughput, and service resilience in Rust systems.",
    longDescription:
      "Posts about using Rust in production services, with attention to runtime limits, concurrency control, and predictable performance.",
  },
};

export type Topic = {
  slug: string;
  label: string;
  description: string;
  longDescription: string;
  postCount: number;
  latestPostDate?: string;
};

export function normalizeTag(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getTopicMetadata(tag: string) {
  const slug = normalizeTag(tag);
  const config = TOPIC_CONFIG[slug];

  return {
    slug,
    label: config?.label ?? humanizeTopic(slug),
    description:
      config?.description ??
      `${humanizeTopic(slug)} notes from the ${slug} archive on ${"itsgaet"}.`,
    longDescription:
      config?.longDescription ??
      `A focused archive of posts tagged ${humanizeTopic(slug)}, collected for quick navigation and discovery.`,
  };
}

export function getAllTopics(): Topic[] {
  const posts = getAllPosts();
  const topicMap = new Map<string, Topic>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const metadata = getTopicMetadata(tag);
      const current = topicMap.get(metadata.slug);

      if (!current) {
        topicMap.set(metadata.slug, {
          ...metadata,
          postCount: 1,
          latestPostDate: post.date,
        });
        return;
      }

      current.postCount += 1;
      if (!current.latestPostDate || current.latestPostDate < post.date) {
        current.latestPostDate = post.date;
      }
    });
  });

  return Array.from(topicMap.values()).sort((a, b) => {
    if (b.postCount !== a.postCount) {
      return b.postCount - a.postCount;
    }

    return (b.latestPostDate ?? "").localeCompare(a.latestPostDate ?? "");
  });
}

export function getTopicBySlug(slug: string) {
  const normalized = normalizeTag(slug);
  return getAllTopics().find((topic) => topic.slug === normalized);
}

export function getRelatedTopics(currentSlug: string, limit = 3) {
  const normalized = normalizeTag(currentSlug);

  return getAllTopics()
    .filter((topic) => topic.slug !== normalized)
    .slice(0, limit);
}

function humanizeTopic(slug: string) {
  if (slug === "n8n") {
    return "n8n";
  }

  return slug
    .split("-")
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}
