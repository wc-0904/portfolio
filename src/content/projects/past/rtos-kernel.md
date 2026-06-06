---
title: "Real-Time Operating System Kernel"
order: 1
status: past
stack: [C, ARM Assembly, Cortex-M4, RTOS]
thumbnail: /images/projects/placeholder.svg
---

A preemptive **RMS scheduler** on the ARM Cortex-M4 with UB-test-based admission
control, so tasks are only admitted when the set stays schedulable. I added
**HLP/IPCP** mutex locking to prevent priority inversion and deadlock across
concurrent tasks, and wrote the TCB and **PendSV** context switcher in ARM
Assembly for low-level thread state management.
