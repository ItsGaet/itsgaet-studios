---
title: Kafka outbox pattern and idempotent consumers in production
summary: A practical guide to moving from best effort events to reliable pipelines with outbox tables, CDC, and idempotent consumption.
date: 2025-03-10
readTime: 6 min
tags: kafka
featured: true
---

Event driven systems fail in boring, predictable ways: duplicates, gaps, and out of order messages. The root cause is almost always the same, you write to the database and publish to Kafka in two separate steps. If either side fails, you lose consistency. The outbox pattern fixes this by persisting events in the same transaction as the state change, then shipping them asynchronously. Pair it with idempotent consumers and you get at least once delivery with deterministic outcomes.

Start with the outbox table. A minimal schema includes `id` (UUID), `aggregate_id`, `event_type`, `payload`, `created_at`, and a `published_at` or `status` column. Insert into the outbox inside the same transaction as the business write. This guarantees that if the row exists, the event exists. If you poll, select rows with `FOR UPDATE SKIP LOCKED` in small batches so multiple workers can advance without blocking each other.

The transport from outbox to Kafka can be CDC or polling. CDC with Debezium is the most robust for Postgres and MySQL because it streams WAL or binlog changes and preserves ordering by primary key. If you poll, keep it lightweight and frequent. Always choose a stable message key, typically `aggregate_id`, so events for the same entity stay ordered in a partition. Ordering is not global, so design your workflows accordingly.

Producer settings matter. Enable idempotence with `enable.idempotence=true`, require `acks=all`, and set `min.insync.replicas` to avoid data loss. Tune `linger.ms` and `batch.size` for throughput, but keep latency within SLOs. For topics representing state, consider log compaction with a stable key so consumers can rebuild materialized views. For event streams, use retention and do not compact unless you are sure the semantics are correct.

Consumers must be idempotent by default. The simplest approach is a dedupe table keyed by `event_id` or by `topic`, `partition`, `offset`. Wrap your side effects and the dedupe insert in the same transaction, or use an upsert with a unique constraint to make duplicates no ops. If you update a record, use `INSERT ... ON CONFLICT DO UPDATE` to keep the operation safe under retries. This is where exactly once behavior is achieved in practice.

Plan for retries and poison messages. Use exponential backoff and a retry topic with a dead letter queue for payloads that fail validation. Keep retries bounded and record failure reasons for debugging. A poison pill should not block a partition forever. If you need strict ordering, send failures to a separate topic and continue with later events, but document the trade off clearly.

Schema evolution is part of reliability. Use a schema registry or version your payloads explicitly with `schema_version`. Favor additive changes and treat field removal as a breaking change. Consumers should ignore unknown fields and provide defaults for missing ones. For multi team systems, publish a contract per topic and treat it like an API, with review and deprecation windows.

Operationally, measure what matters: outbox backlog size, CDC lag, consumer lag, and the rate of failed processing. Alert on growth rather than absolute values. Run periodic reconciliation jobs that compare aggregates and derived projections, and be ready to replay from Kafka using offsets. With outbox plus idempotent consumers, replay is a feature, not a nightmare.
