---
layout: page
title: Gramática Pedagógica del Chino
description: "Chinese-learning wiki built on Wiki.js 2, extended through an nginx injection layer with level tagging, text-to-speech and a reviewed DOCX chapter importer. In development."
project_date: "2025 – 2026 — Barcelona, Spain"
importance: 4
sort_date: 2025-12
category: project
tags: [wiki, docker, nginx]
---

> In development — not publicly deployed yet.
> {: .block-warning }

**Gramática Pedagógica del Chino** is a Chinese-learning wiki built on Wiki.js 2. A custom nginx reverse-proxy layer injects additional CSS and JavaScript on every page **without touching the Wiki.js source code**, so upgrades of the underlying wiki stay simple while the reading and editing experience is fully customised.

## Features

- **Level tagging** — authors mark examples with CEFR (A1–B2) and HSK 1–6 levels from the editor toolbar; readers filter by level and see colour-coded badges
- **Reader layout** — chapter navigation, an in-page table of contents with scroll-spy and a reading-progress bar, and a bottom bar on narrow screens
- **Reading settings** — Chinese font, text size, line spacing, and simplified/traditional character conversion
- **Text-to-speech** — "listen" buttons on examples, with adjustable speed and Chinese voice selection
- **Interactive activities** — H5P embeds inside wiki pages
- **Print / PDF** — a citation cover page for printed chapters

## Architecture

Docker Compose services on a private bridge network; nginx serves every page and Wiki.js has no exposed port:

- **nginx** — reverse proxy, static asset server, and HTML injection via `sub_filter` (custom CSS/JS appended before `</body>` on every proxied page)
- **wiki** — Wiki.js 2, internal only
- **db** — PostgreSQL 15, the Wiki.js database
- **pdf-counter** and **h5p-admin** — small helper services for the PDF and H5P features

Database credentials are supplied through container secrets rather than plain environment values, and CI uses a disposable file-backed source.

## DOCX importer

Grammar chapters arrive as reviewed Word documents. A dedicated importer converts each `.docx` (including embedded images) into unpublished draft pages under the Spanish grammar tree. Preparation artifacts stay local, and publication remains a separate editorial decision.

## Tech stack

| Layer    | Technology                        |
| -------- | --------------------------------- |
| Wiki     | Wiki.js 2 (CKEditor)              |
| Proxy    | nginx (`sub_filter` injection)    |
| Database | PostgreSQL 15                     |
| Runtime  | Docker Compose / Podman           |
| Importer | Pandoc-based DOCX → page pipeline |
| Testing  | Playwright                        |
