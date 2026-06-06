---
title: "M:N Green Thread Runtime"
order: 1
status: past
year: 2025
stack: [C, pthreads, Chase-Lev deques]
links:
  - label: GitHub
    url: https://github.com/
thumbnail: /images/projects/placeholder.svg
---

A user-space threading library that multiplexes many lightweight green threads
onto a small pool of OS threads. It uses **work-stealing** Chase-Lev deques for
load balancing and a custom context-switch routine written in inline assembly.
Built to understand how runtimes like Go's scheduler actually schedule.
