---
layout: page
title: Pedal
description: "Native iOS, watchOS and WidgetKit app for real-time bike and dock availability at bike-share stations worldwide, powered by the CityBikes API. In development."
project_date: "2025 – 2026 — Barcelona, Spain"
importance: 7
sort_date: 2025-11
category: project
tags: [swift, ios, watchos, widgetkit]
---

> In development — no public release yet.
> {: .block-warning }

**Pedal** is a native iOS + watchOS + WidgetKit app for checking real-time bike availability at bike-share stations around the world. Powered by the public [CityBikes API](https://api.citybik.es/v2/networks), it supports every network CityBikes exposes — Barcelona's Bicing, Citi Bike, Vélib' and hundreds more — with per-network favorites, custom station names and location-aware sorting. It started as a port of my Raycast bike-share extension, [Pedal for Raycast](/projects/raycast_bicing/), one of my [Raycast extensions](/projects/raycast_extensions/).

## Features

- **Real-time station data** — live bike and dock availability for every CityBikes network
- **Multi-city support** — pick any network and switch between them at any time
- **Favorite groups** — organize stations into color-coded groups with custom names
- **Location-based sorting** — find the nearest stations with on-device GPS
- **Custom station names** and network-wide search
- **Map integration** — native MapKit view with color-coded annotations; open in Maps
- **Apple Watch companion** — favorites, nearest stations, map and settings synced over WatchConnectivity
- **Widgets** — 6 WidgetKit configurations across Home Screen and Lock Screen families (Favorite Stations, Nearby Stations, Nearby Map, Single Station, Commute, City Overview), three of them configurable with App Intents
- **Appearance customization** — availability thresholds and colors, bike icon, imperial or metric units, high-contrast map annotations
- **Optional iCloud sync** of favorite groups and custom names

## Privacy

Pedal sends CityBikes only the selected public network identifier. It does not add your location, favorites, custom names or an advertising identifier. Everything else stays on the device, moves between iPhone and Apple Watch over WatchConnectivity, and reaches your private iCloud key-value store only when iCloud sync is on.

## Tech stack

| Layer    | Technology                                          |
| -------- | --------------------------------------------------- |
| Language | Swift 5.9                                           |
| UI       | SwiftUI                                             |
| Maps     | MapKit                                              |
| Location | CoreLocation                                        |
| Widgets  | WidgetKit + App Intents                             |
| Watch    | watchOS companion, WatchConnectivity                |
| Storage  | UserDefaults, App Group, iCloud key-value store     |
| API      | [CityBikes API](https://api.citybik.es/v2/networks) |
| Targets  | iOS 17.0+, watchOS 10.0+                            |
