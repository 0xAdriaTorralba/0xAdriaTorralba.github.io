---
layout: page
title: Pedal for iOS
description: "Native iOS app for checking real-time bike and e-bike availability at bike-sharing stations worldwide, with Apple Watch app, widgets, and map integration. Coming soon to the App Store."
project_date: "2026 — Barcelona, Spain"
importance: 7
sort_date: 2026-01
category: project
---

> Coming soon to the App Store.
{: .block-warning }

**Pedal for iOS** is a native iOS app for checking real-time availability of bikes and e-bikes at bike-sharing stations worldwide. Built entirely in SwiftUI, it supports Apple Watch, home screen widgets, and iCloud sync. The mobile companion to [Pedal for Raycast](/projects/raycast_bicing/).

## Features

- **Real-time station data** with color-coded availability indicators (green/orange/red)
- **Favorites management** — save stations into groups for quick access
- **Integrated map** with station annotations and clustering
- **Location-based sorting** — find nearest stations via GPS
- **Custom station names** — rename any station for easy identification
- **Apple Watch app** — check availability from your wrist
- **Home screen widgets** — favorite groups, nearby stations, network overview, commute, and quick glance widgets
- **iCloud sync** — favorites and custom names synced across devices
- **Multi-network support** — works with bike-sharing systems worldwide via CityBikes API
- **Appearance settings** — customisable icons, colours, thresholds, and font scale

## Architecture

The app follows a modern SwiftUI architecture with Combine for reactive state management:

```
CityBikes/
├── Models/          # Station, Network, FavoriteGroup, Appearance
├── Services/        # API client, LocationManager, WatchConnectivity
├── Views/           # 13+ SwiftUI view components
Widgets/             # 5 widget types with timeline providers
Watch App/           # watchOS companion
Tests/               # 131+ unit tests
```

## Tech Stack

| Layer | Technology |
|---|---|
| Language | Swift 5.9 |
| UI | SwiftUI |
| State | Combine, ObservableObject |
| Maps | MapKit (custom MKMapView wrapper) |
| Location | CoreLocation |
| Widgets | WidgetKit |
| Watch | WatchConnectivity |
| Storage | UserDefaults, iCloud KVS |
| API | [CityBikes API](https://api.citybik.es/v2) |
| Target | iOS 17.0+ |
