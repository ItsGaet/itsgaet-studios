---
title: ArgoCD sync waves and health gates for safer progressive delivery
summary: A production pattern for shipping Kubernetes changes with ArgoCD using ordered sync, validation gates, and deterministic rollback paths.
date: 2026-03-24
readTime: 9 min
tags: argocd, kubernetes
featured: false
---

ArgoCD is often introduced as "GitOps for Kubernetes," but the real challenge starts after the first successful sync. In production, the risk is not whether manifests apply. The risk is whether dependent resources become healthy in the right order, whether failures are detected early, and whether rollback is fast and predictable.

Sync waves and health gates are the controls that turn sync from a best-effort apply into a controlled release process. They let you encode dependency order, validate readiness with intent, and stop bad rollouts before they propagate across the cluster.

## Why default sync order is not enough

A plain sync applies manifests without modeling business dependency chains. If your app deployment starts before config, secrets, CRDs, or ingress dependencies are ready, the rollout may flap or partially fail. The cluster can eventually converge, but customer impact happens during that unstable period.

Production GitOps needs deterministic ordering:

- Platform prerequisites first.
- Shared runtime dependencies second.
- Customer-facing workloads last.

That is exactly what sync waves provide.

## Encode deployment order with sync waves

ArgoCD uses the `argocd.argoproj.io/sync-wave` annotation to sequence resources. Lower numbers apply first.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  annotations:
    argocd.argoproj.io/sync-wave: "10"
spec:
  replicas: 3
```

A practical wave model:

- Wave `-1`: namespaces, CRDs, cluster prerequisites.
- Wave `0`: config and secrets.
- Wave `5`: data plane dependencies like messaging or sidecar controllers.
- Wave `10`: application deployments and services.
- Wave `20`: ingress and public traffic routing.

Keep the model simple and consistent across teams. Too many wave levels create policy noise.

## Add health gates, not just apply order

Order alone does not guarantee safe progression. You also need explicit health checks that block promotion when a resource is not genuinely ready.

In ArgoCD, this means:

- Reliable health status for critical custom resources.
- PreSync hooks for invariants that must pass before rollout.
- PostSync validation checks for smoke tests or synthetic probes.

If a gate fails, sync should fail fast and stop the blast radius.

## Use hooks for controlled checks

```yaml
apiVersion: batch/v1
kind: Job
metadata:
  name: post-sync-smoke
  annotations:
    argocd.argoproj.io/hook: PostSync
    argocd.argoproj.io/hook-delete-policy: HookSucceeded
spec:
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: smoke
          image: curlimages/curl:8.7.1
          command: ["sh", "-c", "curl -fsS http://api.default.svc.cluster.local/healthz"]
```

Treat hook jobs like release policy code. Version them, keep them small, and fail aggressively on ambiguity.

## Rollback strategy must be explicit

GitOps rollback is conceptually simple: revert commit, sync again. In practice, you still need clear execution rules.

Recommended baseline:

- Keep small, reviewable commits to isolate fault domains.
- Separate infra and app changes when possible.
- Use manual sync windows for high-risk releases.
- Document who can force-sync and under which incident conditions.

Fast rollback depends more on repository hygiene than on ArgoCD UI clicks.

## Drift control and promotion flow

For multi-environment delivery, avoid copying manifests per environment. Use a consistent template approach and promote immutable versions across `dev`, `staging`, and `prod`. Promotion should be a Git operation, not manual edits in cluster.

Also enforce drift visibility:

- Alert when application status is OutOfSync for too long.
- Alert when health degrades after sync completion.
- Track mean time to recover from failed sync attempts.

These signals tell you whether your GitOps process is stable, not just active.

## Common pitfalls in ArgoCD rollouts

These issues are responsible for most painful incidents:

- Sync waves defined only for a few resources, leaving hidden dependencies unordered.
- Hooks that pass on partial success and hide real failures.
- Monolithic pull requests that combine schema, infra, and app behavior.
- Auto-sync enabled in production without guardrails, freeze windows, or clear ownership.

ArgoCD is reliable when release policy is explicit. Sync waves and health gates are that policy. Without them, GitOps becomes fast configuration drift with better branding.
