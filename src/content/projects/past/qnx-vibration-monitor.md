---
title: "QNX Real-Time Vibration Monitor"
order: 5
status: past
stack: [Python, QNX Neutrino, Raspberry Pi 5, I2C]
thumbnail: /images/projects/placeholder.svg
---

A hackathon build: a real-time vibration monitor on a Raspberry Pi 5 running **QNX
Neutrino RTOS**, sampling an MPU6050 accelerometer over I2C at 100Hz for edge
anomaly detection. I wrote a pure-Python **DFT/FFT** pipeline with no external
dependencies to extract RMS amplitude and dominant frequency shift for
threshold-based fault classification. Getting there meant navigating QNX bring-up
constraints: I2C resource manager limits, the MPU6050 wake sequence, GPIO driver
interfaces, slog2 logging, and POSIX signal handling.
