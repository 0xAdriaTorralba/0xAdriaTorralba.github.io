---
layout: page
title: Délégative
description: "Hackathon project at EthGlobal Paris 2023. Implemented an off-chain DAO liquid democracy voting application with identity proofs and vote delegations. Won 1st place from ApeCoinDAO, Top 5 from Sismo and Pool Prize for The Graph."
project_date: "Jul. 2023 — Paris, France"
github: "https://github.com/delegative"
twitter_url: "https://x.com/0xAdriaTorralba/status/1683502045687422976"
importance: 1
sort_date: 2023-07
category: project
---

**Délégative** is a DAO tooling project built at [EthGlobal Paris 2023](https://ethglobal.com/events/paris2023) that implements **liquid democracy** — a governance model where participants can either vote directly or delegate their voting power to someone they trust, with delegations being revocable at any time.

The project combines a **Mina zkApp** (zero-knowledge smart contract) for off-chain vote verification with a **Next.js** frontend for the governance interface.

## Awards

- 🥇 **1st place** — ApeCoinDAO prize
- 🏆 **Top 5** — Sismo prize
- 🏆 **Pool Prize** — The Graph

## How It Works

The system is split into two components:

**Smart Contract (`delegative/contracts`)** — A Mina zkApp that receives a batch of votes, verifies timestamps are valid, checks for duplicates, and finalises a poll result. Zero-knowledge proofs ensure vote validity without revealing individual votes.

**Frontend (`delegative/ui`)** — A Next.js application that provides the governance interface: creating proposals, casting votes, delegating voting power, and revoking delegations. Live at [ui-ruby-chi.vercel.app](https://ui-ruby-chi.vercel.app).

## Tech Stack

| Layer | Technology |
|---|---|
| Smart contracts | Mina zkApp (TypeScript) |
| ZK proofs | Mina Protocol |
| Frontend | Next.js, React |
| Styling | Tailwind CSS |
| Identity | Sismo |
| Indexing | The Graph |
