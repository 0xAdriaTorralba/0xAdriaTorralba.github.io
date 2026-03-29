---
layout: page
title: "Hands-on KZG Commitments and EIP-4844"
description: "A hands-on workshop on KZG polynomial commitments with a focus on their role in EIP-4844 (Proto-Danksharding), given on the same day the Dencun upgrade went live."
talk_date: "Mar. 2024 — yAcademy Workshop, Online"
sort_date: 2024-03-13
slides_url: "https://github.com/0xAdriaTorralba/slides/tree/8ccf01ebd4423e6940ebee5270ad6ca524df8575/2024_yAcademyWorkshop_KZG"
img: assets/img/talks/yacademy_kzg.png
category: talk
---

{% include figure.liquid loading="eager" path="assets/img/talks/yacademy_kzg.png" class="img-fluid rounded z-depth-1" %}

Workshop given at **yAcademy** on March 13, 2024 — the same day that **EIP-4844 (Proto-Danksharding)** went live with the Ethereum Dencun upgrade.

## Abstract

A hands-on workshop covering **KZG (Kate-Zaverucha-Goldberg) polynomial commitments** with a special focus on their role in **EIP-4844 (Proto-Danksharding)**. EIP-4844 introduces "blob-carrying transactions" to Ethereum, using KZG commitments to enable cheap data availability for Layer 2 rollups — a fundamental step in Ethereum's rollup-centric roadmap.

The workshop walks through the mathematics behind KZG commitments step by step, then connects them to how Ethereum uses them in practice: verifying that blob data posted by rollups is available and correctly committed, without requiring full nodes to store the data permanently.

## Materials

- **Main presentation** — `KZG_Workshop_yAcademy_2024.pdf`
- **Worked example** — `hands_on_KZG_example.pdf`, a step-by-step KZG computation done by hand

## Links

- [View the slides](https://github.com/0xAdriaTorralba/slides/tree/8ccf01ebd4423e6940ebee5270ad6ca524df8575/2024_yAcademyWorkshop_KZG)
