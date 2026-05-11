---
layout: page
title: "A Taxonomy and Security Analysis of Rollup Architectures in Ethereum Blockchain"
description: "Presenting a systematic taxonomy of Ethereum rollup architectures and their associated security threats."
talk_date: "Mar. 2026 — RECSI 2026, Universidad de La Laguna, Tenerife (Spain)"
sort_date: 2026-03-19
img: assets/img/talks/recsi2026_tenerife.jpg
slides_url: "https://github.com/0xAdriaTorralba/slides/blob/5a24bfc591fb92989e68457ea541d3f0ff13b0ba/2026_RECSI26_TaxonomySecurityRollups_Tenerife/A_Taxonomy_and_Security_Analysis_Rollup_Architectures_RECSI_2026.pdf"
category: talk
---

{% include figure.liquid loading="eager" path="assets/img/talks/recsi2026_tenerife.jpg" class="img-fluid rounded z-depth-1" %}

Talk given at **RECSI 2026** (XIX Reunión Española sobre Criptología y Seguridad de la Información) at Universidad de La Laguna, Tenerife, March 19, 2026.

## Abstract

Layer 2 rollups improve Ethereum's scalability by executing transactions off-chain while relying on on-chain verification for finality. Despite their growing importance with increasingly high stakes, rollups have received limited systematic security analysis.

This paper presents a **taxonomy of rollup architectures**, focusing on the design of the **sequencer** — the critical component that bridges off-chain transaction execution with on-chain finality. We identify three main architectural patterns:

- **Stand-alone sequencer** (simple and high-availability variants) — e.g., Polygon zkEVM, ZKSync Era, Arbitrum One, Base
- **Pipeline sequencer** — e.g., Linea, Starknet, Katana
- **Distributed sequencer** — e.g., Lighter, INTMAX, Facet Bluebird

The analysis reveals inherent trade-offs between **throughput**, **decentralisation**, and **resilience**, demonstrating that no single architecture simultaneously optimises all these properties.

## Links

- [View the slides](https://github.com/0xAdriaTorralba/slides/blob/5a24bfc591fb92989e68457ea541d3f0ff13b0ba/2026_RECSI26_TaxonomySecurityRollups_Tenerife/A_Taxonomy_and_Security_Analysis_Rollup_Architectures_RECSI_2026.pdf)

## Authors

Adrià Torralba-Agell, Muoi Tran, and Cristina Pérez-Solà.
