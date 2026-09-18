---
title: "RetroTron"
order: 6
status: past
stack: [ESP32, FPGA, SystemVerilog]
thumbnail: /images/projects/placeholder.svg
---

A Build18 hardware hackathon project: a multi-board system integrating an **ESP32**
microcontroller and an **FPGA**, brought up from scratch. I prototyped a custom
breadboard game controller from push-buttons, pull-up resistors, and N-channel
MOSFETs, then designed and verified an **ESP-NOW** wireless link between the
microcontroller and the controller I/O. On the FPGA I implemented a VGA controller
FSM-D and the concurrent game logic in SystemVerilog.
