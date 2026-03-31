---
title: Kubernetes requests and limits: performance tuning without guesswork
summary: A technical deep dive into CPU throttling, memory OOM, QoS classes, and the metrics that make resource sizing predictable.
date: 2025-03-05
readTime: 9 min
tags: kubernetes
featured: false
---

Kubernetes resource tuning is often treated as a guess, but the scheduler and the kernel follow precise rules. Requests decide placement, limits decide cgroup enforcement, and both feed into autoscaling and eviction. If you do not understand those rules, you will chase OOMKills, CPU throttling, or random pod evictions. This post focuses on CPU and memory behavior under cgroups, how QoS classes are derived, and a practical strategy to pick values that keep latency stable without wasting nodes.

CPU is compressible. A CPU request sets the relative share for scheduling, while the CPU limit enables CFS quota in cgroup v1 (`cpu.cfs_quota_us` and `cpu.cfs_period_us`) or `cpu.max` in cgroup v2. When a container hits its limit, it is throttled, not killed, which can stretch response times and increase tail latency. If your service is latency sensitive, consider omitting CPU limits and rely on requests plus HPA to control scale. Use `kubectl describe pod` to verify effective requests.

Memory is not compressible. A memory request influences scheduling and eviction priority, but the limit is a hard cap enforced by the kernel (`memory.max` in cgroup v2). When the process exceeds that cap, the kernel kills it, and Kubernetes reports `OOMKilled`. For JVM, Go, and Node, ensure the runtime is container aware. Use `-XX:MaxRAMPercentage` for Java, `GOMEMLIMIT` for Go, and `--max-old-space-size` for Node to align heap ceilings with the container limit.

QoS classes are derived from the ratio of requests to limits. Guaranteed requires CPU and memory requests equal to limits for every container. Burstable is the default when at least one request is set but it does not match the limit. BestEffort has no requests at all. Under pressure, kubelet evicts BestEffort first, then Burstable, then Guaranteed. The OOM killer also uses `oom_score_adj` based on QoS, so misclassified pods can die before the ones you care about.

Autoscaling depends on the same numbers. HPA with CPU utilization targets uses `current_usage / request`, so an inflated request hides real load and delays scaling. VPA can adjust requests based on history, but it restarts pods to apply changes, which can conflict with HPA. A common pattern is to use HPA for scale out and VPA in recommendation mode for periodic request tuning. For batch jobs, VPA in auto mode can work because restarts are less disruptive.

Observability is the guardrail. Track `container_cpu_cfs_throttled_seconds_total` and `container_cpu_usage_seconds_total` to spot throttling. For memory, `container_memory_working_set_bytes` shows resident usage, while `container_memory_rss` and `container_memory_cache` separate hot and reclaimable pages. Use p95 and p99, not averages. Also watch node level metrics like `node_memory_MemAvailable_bytes` and `kube_pod_container_resource_requests` to understand cluster headroom.

A practical sizing strategy starts with measurement, not intuition. For CPU, set requests near p95 usage during peak hours and keep limits at 2x or remove them entirely if you can absorb bursts with scaling. For memory, set the limit close to p99 usage plus a safety margin for allocations and fragmentation, and set the request to a realistic baseline to avoid over packing. For critical services, aim for Guaranteed QoS and reserve node capacity to avoid eviction.

Node level configuration matters. Ensure `kube-reserved` and `system-reserved` are set so system daemons do not steal pod resources. Tune eviction thresholds such as `evictionHard` to avoid sudden pressure. With cgroup v2, consider enabling swap with a small `memory.swap.max` if your workloads tolerate it, otherwise keep swap disabled to avoid latency spikes. Finally, align the container runtime and the kernel version so cgroup metrics are accurate.

Close the loop with load tests and repeatable playbooks. Run a steady load until memory and CPU plateau, then increase concurrency and watch throttling and GC behavior. Tune runtimes for container limits, for example by setting Go `GODEBUG=madvdontneed=1` in older versions or using `GOMEMLIMIT` in newer releases. Document your targets and re-evaluate after each release. Resource tuning is not a one time task, it is operational hygiene.
