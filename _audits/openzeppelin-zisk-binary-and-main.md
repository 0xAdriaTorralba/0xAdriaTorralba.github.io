---
layout: page
published: true
title: "ZisK zkVM — Binary &amp; Main circuits review"
date: 2025-11-18
client: "ZisK (0xPolygonHermez/zisk)"
firm: "OpenZeppelin"
contest: false
scope: "PIL2 constraints for the ZisK zkVM: binary opcode circuits (binary.pil, binary_add.pil, binary_extension.pil, binary_extension_table.pil, binary_table.pil) and the main execution trace (main.pil)"
description: "ZisK is a general-purpose zkVM — a virtual machine that produces a zero-knowledge proof of any RISC-V program's execution. This engagement reviewed the core PIL2 arithmetic circuits (binary opcode evaluation and the main execution-trace constraints that stitch execution segments together). Thirteen issues surfaced, including one critical — see the public report below."
severity_counts:
  critical: 1
  high: 2
  medium: 1
  low: 3
  info: 4
report_url: "https://github.com/0xPolygonHermez/zisk/blob/48cf7ccefb5ed62261abf6bfb007b5be8a23c547/audits/Zisk_Binary_and_Main_Review.pdf"
repo_url: "https://github.com/0xPolygonHermez/zisk"
selected: true
tags: [zk, zkvm, pil2, polygon, zisk]
featured_findings:
  - title: "C-01 — Incorrect Binary Opcode Evaluations"
    severity: "Critical"
    summary: "Binary opcode circuits evaluated to incorrect results for specific input combinations. See report §C-01."
  - title: "H-01 — Incorrect Binary Table for LE[U] Opcodes"
    severity: "High"
    summary: "The precomputed lookup table backing LE / LEU opcode evaluation contained incorrect rows. See report §H-01."
  - title: "H-02 — Invalid Last-Carry Correction in 32-bit Mode"
    severity: "High"
    summary: "Last-carry correction logic in 32-bit mode did not preserve the intended constraint. See report §H-02."
  - title: "M-01 — Asymmetric Read and Store: Store Ignores High 32 Bits"
    severity: "Medium"
    summary: "Asymmetry between read and store operations caused the high 32 bits to be silently dropped on store. See report §M-01."
---

## Engagement summary

OpenZeppelin reviewed the [0xPolygonHermez/zisk](https://github.com/0xPolygonHermez/zisk) repository at commit [`5104c56`](https://github.com/0xPolygonHermez/zisk/commit/5104c56). ZisK is a general-purpose, open-source zkVM that proves programs compiled to a custom ISA (Zisk ISA). The emulation step is written in Rust; the proving step is expressed in the PIL2 constraint language.

The review split into two scopes:

1. **Binary circuits** — all `*.pil` files under `state-machines/binary/pil/`. These encode operations like MIN / MAX / LT / GT / EQ / ADD / SUB / LE / AND / OR / XOR / SLL / SRL / SRA / SE and validate them against an 8-bit lookup table; 64-bit operations are checked byte-by-byte against the table and then stitched together. We verified the table contents and the stitching constraints.
2. **Main execution trace** — `state-machines/main/pil/main.pil`. Dispatches each ROM instruction to the appropriate sub-circuit, handles register reads and writes, maintains control flow via the program counter, and enforces consistency between the end of one execution segment and the start of the next. The stack-path variant was out of scope.

Audit window: **2025-10-13 → 2025-11-14**. Report published **2025-11-18**.

Total: **13 issues** — 1 critical, 2 high, 1 medium, 3 low, 4 notes (plus 2 client-reported). Full details and issue classification in the [public report PDF]({{ page.report_url }}).

## What OpenZeppelin said about this engagement

> "Adrià's main project was the open-source review of the ZisK zkVM, one of the more complex engagements our team took on during that period. The work required reasoning carefully about both the cryptographic design of the proof system and its concrete implementation, and Adrià surfaced a number of subtle issues that only become visible if you genuinely understand what the code is doing mathematically. Beyond that engagement, he also contributed to the review of several DeFi protocols, working through Solidity code, economic invariants, and cross-contract behaviour with the same care."
>
> — Excerpt from the OpenZeppelin recommendation letter.
