---
title: "RTOS PID Motor Controller"
order: 2
status: past
year: 2024
stack: [C, STM32, FreeRTOS, I2C]
links:
  - label: GitHub
    url: https://github.com/
thumbnail: /images/projects/placeholder.svg
---

A closed-loop motor controller running on an STM32 under FreeRTOS. A real-time
task samples an encoder over I2C, runs a tuned **PID loop**, and drives a motor
through PWM, all while a lower-priority task streams telemetry over UART. A good
lesson in priority inversion and deterministic timing.
