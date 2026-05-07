---
layout: page
title: Croisette.cc
description: "Hackathon project at ETHGlobal Cannes 2026. Effortless, 24/7 investing managed by AI agents on 0G's compute network. Won 1st place — Best OpenClaw Agent on 0G."
project_date: "Apr. 2026 — Cannes, France"
github: "https://github.com/GianfrancoBazzani/croisette.cc"
twitter_url: "https://x.com/0xAdriaTorralba/status/2041897272053485794"
demo_url: "https://croisette.cc"
importance: 1
sort_date: 2026-04
category: project
tags: [hackathon, ai-agents, 0g, defi, ethglobal]
---

**Croisette.cc** is an autonomous investing platform built at [ETHGlobal Cannes 2026](https://ethglobal.com/events). It targets two well-documented retail-investing failure modes: roughly 55% of people leave their savings in bank accounts where inflation eats them, and around 80% of retail investors lose money because they lack the time or expertise to manage a portfolio. Croisette replaces brokers and active management with AI agents that run 24/7 on top of 0G's compute network — the user answers a few onboarding questions about goals and risk tolerance, and the agents take it from there.

## Awards

- 🥇 **1st place** — _Best OpenClaw Agent on 0G_ (0G prize)

References: [ETHGlobal showcase](https://ethglobal.com/showcase/croisette-cc-8vdfk) · [LinkedIn announcement](https://www.linkedin.com/feed/update/urn:li:activity:7447652372786626562/)

## How it works

A new user opens the app and answers a short questionnaire — their financial goals, time horizon, and risk tolerance. The **Portfolio Builder** agent turns that profile into a concrete portfolio across yield-bearing stablecoins and on-chain lending positions on the **Arc testnet**.

From that point on the **Portfolio Manager** agent takes over: it periodically snapshots wallet balances, prices each position via the **Uniswap Trading API**, and proposes rebalancing actions when the portfolio drifts from the target allocation. The user only signs the rebalances — the agents do the rest of the work, on a 24/7/365 cadence.

## Architecture

The system is built around two cooperating agents orchestrated by a Next.js backend that calls **0G's LLMs** through the **0G-Compute-Adapter**. Both agents are implemented on top of the **ZeroClaw / OpenClaw agent runtime**.

- **Portfolio Builder** — risk assessment + portfolio construction, exposed as 7 specialised skills (questionnaire parsing, risk scoring, asset selection, allocation, etc.).
- **Portfolio Manager** — balance snapshots, Uniswap-based pricing, drift detection, rebalancing proposals.
- **Wallet management** — driven via `cast`.
- **Integrity** — security-critical files are hashed into a manifest committed to **0G Storage**, so any tampering with the agent code or its config can be detected on-chain.

## Tech stack

| Layer               | Technology                                                                  |
| ------------------- | --------------------------------------------------------------------------- |
| Frontend            | Next.js                                                                     |
| Agent runtime       | ZeroClaw / OpenClaw + 0G-Compute-Adapter                                    |
| LLMs                | 0G                                                                          |
| Wallet management   | cast                                                                        |
| Pricing             | Uniswap Trading API                                                         |
| Network             | Arc testnet                                                                 |
| Storage / integrity | 0G Storage (file-hash manifest)                                             |
| Source              | [croisette.cc on GitHub](https://github.com/GianfrancoBazzani/croisette.cc) |

## Links

- Live demo: <https://croisette.cc>
- Source code: <https://github.com/GianfrancoBazzani/croisette.cc>
- ETHGlobal showcase: <https://ethglobal.com/showcase/croisette-cc-8vdfk>
- Announcement (X): <https://x.com/0xAdriaTorralba/status/2041897272053485794>
- Announcement (LinkedIn): <https://www.linkedin.com/feed/update/urn:li:activity:7447652372786626562/>

## Team

- [Adrià Torralba-Agell](https://0xadriatorralba.me)
- [Gianfranco Bazzani](https://github.com/GianfrancoBazzani)
- [Pol Ureña Heras](https://x.com/Draiakoo)
- [mentasuave01](https://x.com/mentasuave01)
- [Fernando Rabasco](https://x.com/ferrabled)
