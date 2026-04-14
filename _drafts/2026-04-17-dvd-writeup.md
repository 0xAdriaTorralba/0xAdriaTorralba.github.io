---
layout: post
title: "Damn Vulnerable DeFi — <challenge>: <bug class>"
date: 2026-04-17
description: "Writeup of Damn Vulnerable DeFi <challenge>. Foundry test-based exploit, and the pattern this bug represents in real DeFi protocols."
tags: [security-research, damn-vulnerable-defi, defi, solidity]
categories: []
featured: false
---

<!--
Draft shell for a DVD v4 challenge writeup. Pick a challenge that demonstrates
a bug class you have seen in the wild (oracle manipulation, flashloan
composition, signature replay, etc.) — the point is to tie the puzzle to
real DeFi risk.

When moving to _posts/, also update _data/ctf_progress.yml.
-->

## The protocol under attack

Short description of the scenario DVD sets up. Include the key contracts
(flashloan pool, lending market, whatever the challenge uses).

## The goal

What state you need to produce. In DVD this is usually "drain pool X of
token Y" — state it explicitly with the invariants involved.

## The vulnerability

What the bug actually is, in plain English. Avoid jumping to the exploit —
first nail the bug.

## The Foundry exploit

Code block with the relevant test / attacker contract. Keep it short; link
to the full source on your fork of the DVD repo if helpful.

```solidity
// attacker contract / test body
```

## The real-world pattern

One or two DeFi incidents that share the bug class (bZx, Harvest, Mango,
Euler, etc.). Link for details; do not rewrite well-documented post-mortems.

## What an auditor should ask

One or two sentences translating this into a review checklist item.

## Links

- [DVD challenge source](https://www.damnvulnerabledefi.xyz/)
- Your fork / solution repo.
- Real-world incident references.
