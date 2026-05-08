---
layout: page
title: "Findings from the ZisK Open Source Review"
description: "Walkthrough of OpenZeppelin's security review of the ZisK zkVM — security properties, encapsulation, vulnerabilities, observations, and tooling from the audit."
talk_date: "Nov. 2025 — Aleph Hub, Buenos Aires (Argentina)"
sort_date: 2025-11-20
img: assets/img/talks/zisk_buenos_aires.jpg
category: talk
---

{% include figure.liquid loading="eager" path="assets/img/talks/zisk_buenos_aires.jpg" class="img-fluid rounded z-depth-1" %}

Talk given at **Aleph Hub**, Buenos Aires, November 20, 2025, as part of the [_Real-Time Proofs in Motion_](https://luma.com/9mydf126?tk=3EBFiV) day hosted by ZisK during DevConnect Buenos Aires '25. The session walked through the OpenZeppelin security review of the ZisK zkVM — the engagement also published as [`audits/openzeppelin-zisk-binary-and-main`](/security/) on this site.

The day brought together protocol engineers and researchers from ZisK, the Ethereum Foundation, OpenZeppelin, Costa Group, Brevis, zkSync, Boundless, Axiom, and Succinct around the architecture, distributed proving, and security of zkVMs.

## Agenda

- What is ZisK?
- Security Properties
- Anatomy of a ZisK Program
- Encapsulation
- Vulnerabilities
- Observations
- Tooling
- Conclusions

## Abstract

ZisK is a high-performance zkVM that recently demonstrated real-time zk-proofing of Ethereum. This talk reports on the OpenZeppelin security review of its codebase: the security properties we expected the prover to enforce, the structure of a ZisK program, the encapsulation patterns the team relies on for soundness, the vulnerabilities surfaced during the engagement, and the tooling we built along the way to make the analysis tractable.

## Links

- Event page: [Real-Time Proofs in Motion · Luma](https://luma.com/9mydf126?tk=3EBFiV)
- Related audit report: [OpenZeppelin — ZisK Binary & Main](/security/)
