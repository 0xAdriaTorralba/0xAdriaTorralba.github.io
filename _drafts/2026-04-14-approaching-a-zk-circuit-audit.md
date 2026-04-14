---
layout: post
title: "How I approach a ZK circuit audit"
date: 2026-04-14
description: "A methodology note on reviewing ZK proving systems — what I read first, the bug classes I look for, and where under-constrained circuits tend to hide."
tags: [security-research, zk, methodology]
categories: []
featured: false
---

<!--
Draft shell. Fill each section below before moving this file from _drafts/
to _posts/. Target length: 800–1500 words. Keep examples generic enough
to avoid NDA exposure on any specific past engagement.
-->

## Why write this

One short paragraph: what reader is this for (someone about to audit their
first ZK circuit, or someone hiring auditors and wanting to understand what
they should expect). Why your perspective is useful.

## The order I read things

Step 1: what you read before touching any code (spec, trust assumptions,
prior audits if any).

Step 2: first pass on the circuit — what you look at, in what order.

Step 3: the second pass — where you start writing notes and questions.

## Bug classes I look for first

Enumerate the bug classes that are common in ZK circuits. Examples:

- Under-constrained signals / missing range checks
- Aliasing between field-element representations
- Public-input handling (ordering, domain separation)
- Recursion boundary issues
- Lookup table misuse

Two or three sentences per class. One concrete example per class — generic,
not pulled from a specific real engagement, unless it is already public.

## Tooling that actually helps

What you reach for (and why): formal tools (Picus, Ecne, Coda), fuzzers,
hand-written differential tests, custom Python harnesses, etc.

## What I still find hard

Honesty paragraph. Where review is still hard for you. Why.

## Reading list

Three to five links. Keep curated.
