---
title: "Multi-Threaded Caching Web Proxy"
order: 8
status: past
stack: [C, Pthreads, POSIX Sockets]
thumbnail: /images/projects/placeholder.svg
---

A concurrent HTTP proxy built on POSIX sockets and **Pthreads** to handle many
simultaneous client connections. I added a thread-safe **LRU cache** guarded by
reader-writer locks, which cuts redundant upstream requests and improves
throughput under load.
