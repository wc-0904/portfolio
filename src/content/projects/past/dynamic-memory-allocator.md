---
title: "Dynamic Memory Allocator"
order: 7
status: past
stack: [C]
thumbnail: /images/projects/placeholder.svg
---

A custom **malloc** package, implemented and then optimized to **12,085
kilo-ops/sec** at **74.5% memory utilization**. Getting there meant weighing the
algorithmic tradeoffs across block structures and free list strategies to push
throughput up while keeping overhead low.
