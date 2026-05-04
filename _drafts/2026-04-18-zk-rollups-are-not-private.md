---
layout: post
title: "ZK-Rollups are not private — the concrete failure mode"
date: 2026-04-18
description: "Practitioner reframing of our RECSI 2024 paper: the specific, reproducible ways a user can be de-anonymised on production ZK-Rollups, and what to ask a rollup team before trusting any privacy claim."
tags: [security-research, zk, layer2, privacy]
categories: []
featured: true
---

<!--
Draft shell. This one reframes your existing 'Unmasking the Illusion' paper
(RECSI 2024) as a practitioner piece: instead of a taxonomy, a reader
should leave with a concrete attack narrative and a checklist of things
to verify on any production ZK-Rollup.

Link to the paper for anyone who wants the academic treatment. Do NOT
reproduce the paper here — reframe.
-->

## The claim vs. the reality

Open with the misleading framing ("Zero-Knowledge Rollups") and state the
finding bluntly: these systems prove correctness to the L1, not privacy
between users.

## What an observer actually sees

Walk through what an L1-side observer (or anyone running an indexer against
a public ZK-Rollup) can link to a single user. Be concrete: transaction
graph, MEV-bot-visible metadata, sequencer ordering leaks.

## Two minimal attack narratives

Attack 1: deanonymisation via transaction graph analysis on <specific ZK-Rollup>.

- What the adversary starts with.
- What they produce.

Attack 2: metadata leak through <specific mechanism — e.g. gas pricing,
nonce patterns, bridge-side correlation>.

## What the alternative names would buy us

Link the renaming proposal from the RECSI paper (verRollup, ivcRollup,
sucRollup). Two sentences: why the name matters for user expectations.

## What to ask before trusting a rollup's privacy claim

Five-to-seven-item checklist. Plain language. Each item should have a
concrete answer-format ("what does the sequencer see?", "are user addresses
hashed on-chain, and by what salt?", etc.).

## Reference

- [Unmasking the Illusion: The Shortcomings of 'Zero-Knowledge' Rollups in
  Achieving Privacy](../../research/) — full academic treatment.
