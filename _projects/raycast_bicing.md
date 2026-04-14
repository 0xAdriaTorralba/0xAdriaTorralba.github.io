---
layout: page
title: Pedal for Raycast
description: "Raycast extension to check real-time availability of bikes and e-bikes at bike-sharing stations across hundreds of cities worldwide. Coming soon to the Raycast Store."
project_date: "2026 — Barcelona, Spain"
importance: 6
sort_date: 2026-01
category: project
---

> Coming soon to the [Raycast Store](https://www.raycast.com/store).
> {: .block-warning }

**Pedal for Raycast** is a [Raycast](https://www.raycast.com/) extension that provides instant access to real-time bike-sharing data from hundreds of networks worldwide. Query station availability, manage favorites, and navigate to stations — all from the Raycast launcher. Supports hundreds of bike-sharing systems across the globe.

## Features

- **Real-time availability** of classic bikes and e-bikes at any station
- **Multi-network support** — switch between bike-sharing systems in hundreds of cities
- **Favorites with groups** — organise stations into groups (e.g., "Home", "Work") with emoji icons
- **Location-based sorting** — find the nearest stations via GPS (CoreLocationCLI) or manual coordinates
- **Custom station names** — rename stations for quick identification
- **Map integration** — open any station in Apple Maps or Google Maps
- **Multiple sort options** — by name, distance, regular bikes, e-bikes, docks, or total bikes

## Keyboard Shortcuts

| Shortcut | Action              |
| -------- | ------------------- |
| `⌘A`     | Open in Apple Maps  |
| `⌘G`     | Open in Google Maps |
| `⌘⌫`     | Delete custom name  |
| `⌘H`     | Toggle count labels |

## Tech Stack

| Layer     | Technology                                 |
| --------- | ------------------------------------------ |
| Framework | Raycast Extension API                      |
| Language  | TypeScript, React                          |
| HTTP      | Axios                                      |
| API       | [CityBikes API](https://api.citybik.es/v2) |
| Testing   | Jest, React Testing Library                |
| Storage   | Raycast LocalStorage                       |
