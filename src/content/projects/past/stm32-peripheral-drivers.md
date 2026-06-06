---
title: "STM32 Bare-Metal Peripheral Drivers"
order: 2
status: past
stack: [C, STM32, ARM Cortex-M, I2C, UART]
thumbnail: /images/projects/placeholder.svg
---

Interrupt-driven **I2C** and **UART** drivers written from scratch by configuring
the peripheral registers directly. The transmit and receive paths are fully
asynchronous, built on **NVIC** interrupts and hardware status flags. I verified
the communication timing and signal integrity on an oscilloscope to confirm the
drivers behaved correctly on real hardware.
