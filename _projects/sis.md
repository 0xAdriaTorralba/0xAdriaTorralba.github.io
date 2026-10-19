---
layout: page
title: Sis
description: "Local-first scratchpad for macOS, iPhone and iPad: six fixed spaces, zero clutter. Written in Swift 6 with CloudKit sync, widgets and a watchOS companion. In development."
project_date: "2026 — Barcelona, Spain"
importance: 3
sort_date: 2026-07
category: project
tags: [swift, macos, ios, watchos]
---

> In development — no public release yet.
> {: .block-warning }

**Sis** is a local-first scratchpad built around one idea: six fixed, color-coded spaces and nothing else — no titles, folders, tags, or note-management screens between you and the editor. On the Mac it lives in the menu bar and opens in a popover; on iPhone and iPad it opens directly into a space.

## Features

- **Six fixed spaces** with stable positions and empty/occupied/selected dot states; the selected space's color tints the whole surface, including the Mac menu-bar icon
- **Native text editors** (`NSTextView` / `UITextView`) with autosave and undo/redo
- **Markdown-first spaces** with source-preserving live styling: headings, tables, fenced code, tasks, footnotes, and more, plus Source / Live / Live Raw display modes
- **Hierarchical focus** with breadcrumbs and subtree-only editing and export
- **Local-first CloudKit sync** through a private database, with durable offline queuing and three-way conflict resolution
- **Widgets** (small/medium/large) and **App Intents** for get/set/append/clear operations, backed by the same validation rules as the editor
- **watchOS companion** for browsing and appending to all six spaces
- **Automatic local backups** with verified writes, deterministic retention and pre-restore safety snapshots
- **No analytics**, no third-party runtime dependencies, no account service, no ads

## Architecture

A shared Swift 6 package, `SisCore`, owns the domain, persistence, conversion, validation and sync policies — the app, widgets, intents and watch companion all apply the same limits and mutation semantics. A 100,000-character / 7.5 MB invariant is enforced before every editor mutation, import, restore and sync.

## Tech stack

| Layer    | Technology                                  |
| -------- | ------------------------------------------- |
| Language | Swift 6                                     |
| Core     | Shared `SisCore` Swift package              |
| Editors  | AppKit (`NSTextView`), UIKit (`UITextView`) |
| Sync     | CloudKit (private database, custom zone)    |
| Widgets  | WidgetKit + App Intents                     |
| Watch    | watchOS companion app                       |
