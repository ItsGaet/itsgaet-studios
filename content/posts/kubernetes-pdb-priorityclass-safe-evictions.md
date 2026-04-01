---
title: Kubernetes safe evictions with PDB and PriorityClass
summary: A practical runbook to drain nodes and survive maintenance windows without breaking critical workloads.
date: 2026-03-28
readTime: 8 min
tags: kubernetes
featured: false
---

Kubernetes maintenance failures usually do not come from a broken cluster. They come from weak assumptions in workload policy. A node drain is a predictable sequence of evictions, but many teams run it without realistic PodDisruptionBudgets, without clear priority tiers, and without proving that readiness checks match real traffic behavior. The result is avoidable downtime during upgrades or autoscaling churn.

This post focuses on the controls that matter most in production: PodDisruptionBudget, PriorityClass, and a strict pre-drain validation flow. The goal is not to block every disruption. The goal is to make disruption controlled, observable, and reversible.

## Why drains fail even when pods are replicated

Replica count alone is not availability. A deployment with three replicas can still fail a drain if one replica is not actually ready, one is waiting on a slow startup path, and one holds sticky session state. During eviction, Kubernetes respects your disruption budget and then waits. If the budget is too strict, maintenance stalls. If it is too loose, traffic degrades.

The right question is not "how many replicas exist." The right question is "how many replicas can disappear right now without violating SLO." That number should drive the budget.

## Build a disruption budget that reflects service reality

A budget is useful only if it encodes how the service behaves under load.

- Use `minAvailable` for stateful or latency-critical services where a minimum floor is non-negotiable.
- Use `maxUnavailable` for large stateless pools where percentage-based disruption is easier to reason about.
- Keep budgets per workload tier, not one policy copied everywhere.
- Re-evaluate budgets whenever rollout strategy or replica count changes.

For services behind aggressive autoscaling, do not set a budget that assumes ideal peak capacity at all times. Base it on verified steady-state capacity, then add explicit surge strategy in deployments.

## PriorityClass protects scheduling order, not business impact by itself

PriorityClass decides which pods are preferred when resources are tight and which pods can preempt others. It does not replace disruption budgets. It solves a different problem.

Use it to encode operational tiers:

- Platform-critical controllers and ingress paths at high priority.
- Revenue-critical APIs below platform core.
- Batch and non-critical async workers at low priority.

Without this tiering, a noisy low-value workload can consume capacity that should have been reserved for control-plane-adjacent components or high-value APIs during node rotations.

## A practical pre-drain checklist

Before draining a node, run the same checklist every time:

1. Confirm target workloads have healthy replica distribution across nodes and zones.
2. Validate PDB status with `kubectl get pdb` and ensure `ALLOWED DISRUPTIONS` is greater than zero for expected evictions.
3. Check current rollout state; do not drain while critical deployments are mid-rollout.
4. Verify HPA and cluster autoscaler are not already in a stressed scaling loop.
5. Drain with explicit flags and bounded timeout, then observe eviction progress in events.

If any precondition fails, stop and fix policy first. Forced drains are not a strategy. They are an emergency action.

## Baseline manifests for safer maintenance

```yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: api-pdb
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app: api
---
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: business-critical
value: 900000
preemptionPolicy: PreemptLowerPriority
globalDefault: false
description: "Priority for critical customer-facing APIs"
```

This is only a baseline. Tune numbers against measured traffic and failure tests, not assumptions.

## Signals that prove your policy works

Track these during every maintenance window:

- Eviction duration per pod and per node.
- Number of blocked evictions caused by PDB.
- 5xx rate and p95 latency before, during, and after drain.
- Replica readiness recovery time after each eviction.

If these metrics move in the wrong direction, your policy is too optimistic or your readiness model is not representing true availability.

## Failure patterns to remove from your runbooks

Common anti-patterns show up repeatedly:

- Global PDB templates copied to all workloads without tiering.
- PriorityClass set everywhere at high values, removing any real priority signal.
- Draining nodes while deployments are actively changing image or config.
- Declaring success when pods are Running, without checking readiness and traffic stability.

Cluster maintenance is an operational product. Treat PDB and PriorityClass as versioned policy with review, not as one-time YAML.
