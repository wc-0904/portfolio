---
title: "STM32 Bare-Metal Bootloader"
order: 3
status: past
stack: [C, ARM Assembly, STM32, OpenOCD]
thumbnail: /images/projects/placeholder.svg
---

A bare-metal bootloader in ARM Assembly that populates the interrupt vector table
and implements the reset handler from scratch. It initializes the processor memory
map, copying data from flash to SRAM and zeroing BSS using linker script symbols
before branching to the kernel entry point. I debugged the full boot sequence with
**OpenOCD** as a GDB server over JTAG, stepping through assembly to verify
processor state at reset.
