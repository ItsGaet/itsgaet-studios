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
  {
    slug: "postgres-logical-replication-zero-downtime",
    title: "PostgreSQL logical replication for zero downtime table rewrites",
    summary:
      "How to move a hot table to a new schema without blocking writes, using backfill, change capture, validation, and a clean cutover.",
    date: "2025-03-01",
    readTime: "9 min",
    tags: ["postgres", "replication", "migrations", "database"],
    body: [
      "Zero downtime table rewrites in PostgreSQL are not about a single magic command, they are about keeping writes flowing while you move data to a new shape. The typical triggers are changing a column type, partitioning a hot table, moving to a new collation, or consolidating bloat. The challenge is that `ALTER TABLE` often takes an ACCESS EXCLUSIVE lock. The safer approach is to build a new table, backfill, mirror changes, validate, and cut over with a short write pause. This post outlines a production ready sequence.",
      "Start by checking the replication features you will rely on. If you are moving across clusters, set `wal_level = logical`, ensure `max_replication_slots` and `max_wal_senders` are large enough, and use the `pgoutput` plugin. For logical replication on a single cluster, the same settings apply but you can publish from the source database and subscribe from a loopback connection. Set a stable primary key, or configure `REPLICA IDENTITY FULL` on the source table so updates can be identified. Increase `wal_keep_size` to avoid slot lag discarding WAL during long backfills.",
      "Design the new table with the final schema, not a temporary compromise. Use `CREATE TABLE new (LIKE old INCLUDING DEFAULTS INCLUDING CONSTRAINTS)` to copy structure, then adjust columns, indexes, and partitioning. Create heavy indexes concurrently to avoid write locks, and defer expensive foreign keys until after backfill. If you are changing data types, add new columns instead of rewriting in place, and plan a later `ALTER TABLE ... DROP COLUMN` once cutover is complete. This keeps the original table stable.",
      "Backfill in controlled batches to keep autovacuum and WAL growth under control. A common pattern is keyset pagination: `INSERT INTO new SELECT ... FROM old WHERE id > $last ORDER BY id LIMIT 5000`. Commit often to reduce long running transactions and free snapshots. For large tables, consider `synchronous_commit = off` and a higher `maintenance_work_mem` during the backfill session. Run `ANALYZE` on the new table early so the planner produces efficient index builds and validation queries.",
      "Once the new table is mostly populated, set up change capture. With logical replication across clusters, create a publication: `CREATE PUBLICATION pub FOR TABLE old`, then a subscription on the target: `CREATE SUBSCRIPTION sub CONNECTION ... PUBLICATION pub`. For same cluster moves, logical replication can still work via a loopback connection, but many teams choose triggers or application level dual writes for simplicity. The goal is the same: every insert, update, and delete must reach the new table.",
      "If you go with triggers, keep them narrow and deterministic. Use `AFTER INSERT OR UPDATE OR DELETE` on the source and apply changes to the new table with `INSERT ... ON CONFLICT` to avoid duplicates. On updates, avoid full row rewrites if only a subset of columns is changing. Track failures with a dead letter table or a retry queue so the migration does not silently diverge. For logical replication, watch `pg_stat_subscription` and `pg_stat_replication` to ensure lag stays near zero.",
      "Validation is not a single count check. Compare row counts per partition or key range, then validate critical columns with checksums such as `sum(hashtext(col1 || col2))` grouped by ranges. For wide tables, sample with `TABLESAMPLE SYSTEM` and run targeted `EXCEPT` queries on known edge cases. Verify constraints by running `ALTER TABLE new VALIDATE CONSTRAINT` and confirm indexes with `REINDEX CONCURRENTLY` if you built them early. Only proceed when differences are explainable.",
      "Cutover is a short, explicit maintenance window. Stop writers or put the application in read only mode, wait for replication lag to reach zero, then swap names in a single transaction: `ALTER TABLE old RENAME TO old_backup; ALTER TABLE new RENAME TO old;`. Update sequences with `SELECT setval(...)` and reattach foreign keys, views, and grants. Keep the old table for rollback, but revoke writes so it stays as a safety snapshot.",
      "After traffic is back, clean up the migration machinery. Drop triggers, subscriptions, and replication slots to release WAL retention. Run `VACUUM ANALYZE` on the new table and monitor bloat, especially if you used high frequency updates during backfill. Remove temporary columns and unused indexes, and update documentation to reflect the new schema. The real win is that the procedure becomes repeatable, turning risky table rewrites into a controlled, observable workflow.",
    ],
  },
  {
    slug: "kubernetes-requests-limits-qos",
    title: "Kubernetes requests and limits: performance tuning without guesswork",
    summary:
      "A technical deep dive into CPU throttling, memory OOM, QoS classes, and the metrics that make resource sizing predictable.",
    date: "2025-03-05",
    readTime: "9 min",
    tags: ["kubernetes", "sre", "performance", "containers"],
    body: [
      "Kubernetes resource tuning is often treated as a guess, but the scheduler and the kernel follow precise rules. Requests decide placement, limits decide cgroup enforcement, and both feed into autoscaling and eviction. If you do not understand those rules, you will chase OOMKills, CPU throttling, or random pod evictions. This post focuses on CPU and memory behavior under cgroups, how QoS classes are derived, and a practical strategy to pick values that keep latency stable without wasting nodes.",
      "CPU is compressible. A CPU request sets the relative share for scheduling, while the CPU limit enables CFS quota in cgroup v1 (`cpu.cfs_quota_us` and `cpu.cfs_period_us`) or `cpu.max` in cgroup v2. When a container hits its limit, it is throttled, not killed, which can stretch response times and increase tail latency. If your service is latency sensitive, consider omitting CPU limits and rely on requests plus HPA to control scale. Use `kubectl describe pod` to verify effective requests.",
      "Memory is not compressible. A memory request influences scheduling and eviction priority, but the limit is a hard cap enforced by the kernel (`memory.max` in cgroup v2). When the process exceeds that cap, the kernel kills it, and Kubernetes reports `OOMKilled`. For JVM, Go, and Node, ensure the runtime is container aware. Use `-XX:MaxRAMPercentage` for Java, `GOMEMLIMIT` for Go, and `--max-old-space-size` for Node to align heap ceilings with the container limit.",
      "QoS classes are derived from the ratio of requests to limits. Guaranteed requires CPU and memory requests equal to limits for every container. Burstable is the default when at least one request is set but it does not match the limit. BestEffort has no requests at all. Under pressure, kubelet evicts BestEffort first, then Burstable, then Guaranteed. The OOM killer also uses `oom_score_adj` based on QoS, so misclassified pods can die before the ones you care about.",
      "Autoscaling depends on the same numbers. HPA with CPU utilization targets uses `current_usage / request`, so an inflated request hides real load and delays scaling. VPA can adjust requests based on history, but it restarts pods to apply changes, which can conflict with HPA. A common pattern is to use HPA for scale out and VPA in recommendation mode for periodic request tuning. For batch jobs, VPA in auto mode can work because restarts are less disruptive.",
      "Observability is the guardrail. Track `container_cpu_cfs_throttled_seconds_total` and `container_cpu_usage_seconds_total` to spot throttling. For memory, `container_memory_working_set_bytes` shows resident usage, while `container_memory_rss` and `container_memory_cache` separate hot and reclaimable pages. Use p95 and p99, not averages. Also watch node level metrics like `node_memory_MemAvailable_bytes` and `kube_pod_container_resource_requests` to understand cluster headroom.",
      "A practical sizing strategy starts with measurement, not intuition. For CPU, set requests near p95 usage during peak hours and keep limits at 2x or remove them entirely if you can absorb bursts with scaling. For memory, set the limit close to p99 usage plus a safety margin for allocations and fragmentation, and set the request to a realistic baseline to avoid over packing. For critical services, aim for Guaranteed QoS and reserve node capacity to avoid eviction.",
      "Node level configuration matters. Ensure `kube-reserved` and `system-reserved` are set so system daemons do not steal pod resources. Tune eviction thresholds such as `evictionHard` to avoid sudden pressure. With cgroup v2, consider enabling swap with a small `memory.swap.max` if your workloads tolerate it, otherwise keep swap disabled to avoid latency spikes. Finally, align the container runtime and the kernel version so cgroup metrics are accurate.",
      "Close the loop with load tests and repeatable playbooks. Run a steady load until memory and CPU plateau, then increase concurrency and watch throttling and GC behavior. Tune runtimes for container limits, for example by setting Go `GODEBUG=madvdontneed=1` in older versions or using `GOMEMLIMIT` in newer releases. Document your targets and re-evaluate after each release. Resource tuning is not a one time task, it is operational hygiene.",
    ],
  },
];

export const getAllPosts = () =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPostBySlug = (slug: string) =>
  posts.find((post) => post.slug === slug);
