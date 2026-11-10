---
layout: page
title: Vim Keybindings for Bike
description: "Vim-style modal editing for the Bike 2 outliner on macOS: hjkl over rows, counts, dd/yy/p with an outline-aware register, folding and a row-wise visual mode. Open source (MIT)."
project_date: "2026 — Barcelona, Spain"
importance: 4
sort_date: 2026-11
category: project
tags: [bike, macos, typescript, tooling]
---

**Vim Keybindings for Bike** is an open-source extension that adds Vim-style modal editing to the [Bike](https://www.hogbaysoftware.com/bike/) outliner for macOS. Bike's block (row) selection acts as normal mode and Bike's text editing acts as insert mode, so the way Bike edits text inside a row does not change.

- Source code: [0xAdriaTorralba/bike-vim-keybindings](https://github.com/0xAdriaTorralba/bike-vim-keybindings) (MIT licence).
- First release: [v0.1.0](https://github.com/0xAdriaTorralba/bike-vim-keybindings/releases/tag/vim-keybindings-v0.1.0), 10 Nov 2026. Built for Bike 2 (build 293, extension API 0.64.0).
- Submitted to the Bike extensions registry in [bike-outliner/extensions-registry#4](https://github.com/bike-outliner/extensions-registry/pull/4), under review.

## What it does

- **Modes** — normal, insert and row-wise visual mode. The mode comes from Bike's own selection, so it cannot get out of sync with the app. The status bar shows `-- INSERT --` and `-- VISUAL --` while those modes are active.
- **Motions** — `j` / `k` over visible rows, `h` / `l` to collapse, expand or move to the parent or first child, `gg` / `G`, and counts (`3j`, `2dd`, `3p`).
- **Operators** — `yy`, `dd`, `cc`, `p` / `P` and operator + motion (`dj`, `yG`). Yank and delete copy whole subtrees with their row types and attributes, so a done task or a heading keeps its state after a paste. The register is shared by all windows and is separate from the system clipboard.
- **Folding and focus** — `zo` / `zc` / `za`, `zR` / `zM`, and `L` / `H` to focus in on a row or out one level.
- **Visual mode** — `v` / `V`, extended by motions, with yank, delete, change, paste and indent / outdent on the selection.
- **Bike commands on Vim keys** — `u` / `Control-r` for undo and redo, `/` `n` `N` for find, `>>` / `<<` for indent and outdent.

Two command-palette entries, **Vim: Toggle Keybindings** and **Vim: Toggle Mode Indicator**, turn the extension or its status message off without uninstalling.

## Tech stack

| Layer     | Technology                                               |
| --------- | -------------------------------------------------------- |
| Platform  | Bike 2 extension API (`.bkext`)                          |
| Language  | TypeScript                                               |
| Tests     | `bike-ext test` suite that runs inside Bike              |
| Manual QA | Bike outline with one checkbox per binding and edge case |
