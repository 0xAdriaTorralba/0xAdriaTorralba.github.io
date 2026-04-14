---
layout: page
published: false
title: "<Client> — <Scope> audit"
# audit completion date (YYYY-MM-DD)
date: 2024-01-01
client: "<Protocol or firm name>"
firm: "OpenZeppelin"              # or "Independent", "Code4rena", "Sherlock", "Cantina", ...
contest: false                    # set true for competitive-audit platforms (Code4rena / Sherlock / Cantina / Immunefi); surfaces into the "Audit contest findings" section
role: "Contributor"               # "Lead auditor" | "Co-lead" | "Contributor"
scope: "<e.g. zkEVM recursion circuits, Solidity staking contracts>"
description: "One-sentence public summary of what was audited and why it mattered."
# Severity counts as reported in the public audit. Omit any level with 0 findings.
severity_counts:
  critical: 0
  high: 0
  medium: 0
  low: 0
  info: 0
# Links
report_url: "https://blog.openzeppelin.com/<slug>"
repo_url: null                    # optional — link to the audited commit/repo
# Surfacing
selected: true                    # surface to the main /security/ grid
tags: [zk, solidity, defi]
# Findings you can publicly name and briefly describe (optional).
# Reference finding # in the public report. Keep summaries one or two sentences.
featured_findings:
  - title: "<Short name of the finding>"
    severity: "High"
    summary: "1–2 sentence plain-English description of what the bug was and why it mattered. Link to finding # in the report if possible."
---

## Context

Optional longer notes. Anything you add here should be either:

1. Already public in the linked report, or
2. Clearly non-sensitive methodology / reflections.

Respect client NDAs. If uncertain, leave this body empty and let the linked
report speak for itself — the grid + severity pills are the signal.

## My contribution

Brief (2–4 sentences) on what you specifically contributed to this engagement,
in the form your firm's policy allows. Examples of appropriate framing:

- "Primary reviewer of the recursion circuit; identified the [Finding 3.1]
  signature-malleability issue."
- "Paired on the sequencer review; contributed the fuzzing harness that
  surfaced the oracle precision rounding bug ([Finding 4.2])."

## Techniques that generalise

Optional short section on bug classes or review techniques that readers may
find useful beyond this specific audit. This is the kind of content that
signals vulnerability-research maturity to readers who are not going to
read the full report.
