---
title: "FPGA RISC-V Core"
order: 1
status: current
year: 2026
stack: [SystemVerilog, Lattice ECP5, RISC-V]
links:
  - label: GitHub
    url: https://github.com/
thumbnail: /images/projects/placeholder.svg
---

A from-scratch **RV32I** core on a Lattice ECP5 FPGA. Currently a 5-stage
pipeline with hazard detection working in simulation; next up is forwarding and
getting it to boot a small program from block RAM on real hardware.
