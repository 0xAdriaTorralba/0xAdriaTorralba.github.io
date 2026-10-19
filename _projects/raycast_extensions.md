---
layout: page
title: Raycast extensions
description: "A collection of Raycast extensions for my own macOS workflow: menu-bar visibility modes, popular-times forecasts, natural-language timezone conversion, bike-share availability and more. In development."
project_date: "2025 – 2026 — Barcelona, Spain"
importance: 5
sort_date: 2026-08
category: project
tags: [raycast, macos, typescript, tooling]
---

> In development — not yet published.
> {: .block-warning }

A growing collection of [Raycast](https://www.raycast.com/) extensions I build for my own daily macOS workflow.

## Extensions

- **BarShift** — switches the macOS "Automatically hide and show the menu bar" setting between two configurable modes, or picks any of the four modes from a searchable list. It writes the underlying preferences directly instead of driving System Settings, so it needs no Accessibility or Automation permission, and it shows the current mode in Raycast root search. Related upstream work: [Enhance Toggle Menu Bar with native switching and mode selection](https://github.com/raycast/extensions/pull/31391), an open PR to the official Raycast extensions repository.
- **Peak Peek** — popular-times ("rush hour") forecasts for saved places, powered by a third-party foot-traffic service: a live busyness overlay, a weekly heatmap and next-hour trend arrows.
- **Pedal for Raycast** — real-time bike and e-bike availability at bike-share stations worldwide. It has [its own project page](/projects/raycast_bicing/) and grew into the native [Pedal](/projects/bicing_ios/) app.
- **Timezone Converter** — converts times between timezones using natural language; supports city names, timezone abbreviations and UTC offsets.
- **Say No** — serves a creative excuse to say no.

## Tech stack

| Layer     | Technology                                   |
| --------- | -------------------------------------------- |
| Framework | Raycast Extension API                        |
| Language  | TypeScript, React                            |
| Native    | Objective-C helper for macOS preference APIs |
