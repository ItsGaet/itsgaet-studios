---
title: PostgreSQL logical replication for zero downtime table rewrites
summary: How to move a hot table to a new schema without blocking writes, using backfill, change capture, validation, and a clean cutover.
date: 2025-03-01
readTime: 9 min
tags: postgres
featured: false
---

Zero downtime table rewrites in PostgreSQL are not about a single magic command, they are about keeping writes flowing while you move data to a new shape. The typical triggers are changing a column type, partitioning a hot table, moving to a new collation, or consolidating bloat. The challenge is that `ALTER TABLE` often takes an ACCESS EXCLUSIVE lock. The safer approach is to build a new table, backfill, mirror changes, validate, and cut over with a short write pause. This post outlines a production ready sequence.

Start by checking the replication features you will rely on. If you are moving across clusters, set `wal_level = logical`, ensure `max_replication_slots` and `max_wal_senders` are large enough, and use the `pgoutput` plugin. For logical replication on a single cluster, the same settings apply but you can publish from the source database and subscribe from a loopback connection. Set a stable primary key, or configure `REPLICA IDENTITY FULL` on the source table so updates can be identified. Increase `wal_keep_size` to avoid slot lag discarding WAL during long backfills.

Design the new table with the final schema, not a temporary compromise. Use `CREATE TABLE new (LIKE old INCLUDING DEFAULTS INCLUDING CONSTRAINTS)` to copy structure, then adjust columns, indexes, and partitioning. Create heavy indexes concurrently to avoid write locks, and defer expensive foreign keys until after backfill. If you are changing data types, add new columns instead of rewriting in place, and plan a later `ALTER TABLE ... DROP COLUMN` once cutover is complete. This keeps the original table stable.

Backfill in controlled batches to keep autovacuum and WAL growth under control. A common pattern is keyset pagination: `INSERT INTO new SELECT ... FROM old WHERE id > $last ORDER BY id LIMIT 5000`. Commit often to reduce long running transactions and free snapshots. For large tables, consider `synchronous_commit = off` and a higher `maintenance_work_mem` during the backfill session. Run `ANALYZE` on the new table early so the planner produces efficient index builds and validation queries.

Once the new table is mostly populated, set up change capture. With logical replication across clusters, create a publication: `CREATE PUBLICATION pub FOR TABLE old`, then a subscription on the target: `CREATE SUBSCRIPTION sub CONNECTION ... PUBLICATION pub`. For same cluster moves, logical replication can still work via a loopback connection, but many teams choose triggers or application level dual writes for simplicity. The goal is the same: every insert, update, and delete must reach the new table.

If you go with triggers, keep them narrow and deterministic. Use `AFTER INSERT OR UPDATE OR DELETE` on the source and apply changes to the new table with `INSERT ... ON CONFLICT` to avoid duplicates. On updates, avoid full row rewrites if only a subset of columns is changing. Track failures with a dead letter table or a retry queue so the migration does not silently diverge. For logical replication, watch `pg_stat_subscription` and `pg_stat_replication` to ensure lag stays near zero.

Validation is not a single count check. Compare row counts per partition or key range, then validate critical columns with checksums such as `sum(hashtext(col1 || col2))` grouped by ranges. For wide tables, sample with `TABLESAMPLE SYSTEM` and run targeted `EXCEPT` queries on known edge cases. Verify constraints by running `ALTER TABLE new VALIDATE CONSTRAINT` and confirm indexes with `REINDEX CONCURRENTLY` if you built them early. Only proceed when differences are explainable.

Cutover is a short, explicit maintenance window. Stop writers or put the application in read only mode, wait for replication lag to reach zero, then swap names in a single transaction: `ALTER TABLE old RENAME TO old_backup; ALTER TABLE new RENAME TO old;`. Update sequences with `SELECT setval(...)` and reattach foreign keys, views, and grants. Keep the old table for rollback, but revoke writes so it stays as a safety snapshot.

After traffic is back, clean up the migration machinery. Drop triggers, subscriptions, and replication slots to release WAL retention. Run `VACUUM ANALYZE` on the new table and monitor bloat, especially if you used high frequency updates during backfill. Remove temporary columns and unused indexes, and update documentation to reflect the new schema. The real win is that the procedure becomes repeatable, turning risky table rewrites into a controlled, observable workflow.
