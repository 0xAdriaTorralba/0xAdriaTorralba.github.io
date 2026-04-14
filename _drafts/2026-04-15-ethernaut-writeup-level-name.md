---
layout: post
title: "Ethernaut — <level name>: <bug class>"
date: 2026-04-15
description: "A focused writeup of Ethernaut level <N>. Why the bug class matters beyond the puzzle, and what the same pattern looks like in production code."
tags: [security-research, ethernaut, solidity]
categories: []
featured: false
---

<!--
Draft shell for an Ethernaut writeup. Pick a non-trivial level (avoid the
very first few — Gatekeeper One/Two, Alien Codex, Puzzle Wallet, Motorbike
are better signal). Fill the sections below and move to _posts/.

When you move this to _posts/, also update _data/ctf_progress.yml for that
level: set status: solved, solved_on: <date>, and writeup: /blog/YYYY/<slug>/.
-->

## The level

Short description. Include the contract source inline (a code block is fine)
so the post stands alone without needing the visitor to open Ethernaut.

## What the level is teaching

The bug class in one paragraph. Do not describe the exploit yet — describe
the *primitive*. Example: "this level tests whether you notice that `delegatecall`
runs foreign code with the caller's storage layout."

## The exploit

Walk through. Code where useful. Do not over-explain — assume the reader
knows Solidity. The useful content is the *decision* — why you looked
where you looked.

## Where this shows up in real code

The key section. Pick one or two real-world incidents (Parity multisig,
LuBian, etc.) that share the bug class. Summarise without repeating what's
already written elsewhere — link for the details.

## What I'd look for in an audit

Turn the puzzle into a checklist item. Two or three sentences on how a
reviewer spots this pattern before it ships.

## Links

- [Ethernaut level page](https://ethernaut.openzeppelin.com/)
- Any primary sources for the real-world references above.
