---
layout: page
title: The Sand Walker
description: "Hackathon project at EthPrague 2023. Took inspiration from the Etherenauts project to learn Solidity, then adapted it to learn Cairo 1."
project_date: "Jun. 2023 — Prague, Czech Republic"
github: "https://github.com/OpenTechne/TheSandWalker"
twitter_url: "https://x.com/0xAdriaTorralba/status/1668256261442355200"
importance: 2
sort_date: 2023-06
category: project
tags: [security, ctf, starknet, cairo]
---

**The Sand Walker** is a community-driven StarkNet cybersecurity wargame built at [EthPrague 2023](https://ethprague.com), inspired by OpenZeppelin's [The Ethernaut](https://ethernaut.openzeppelin.com/). The project adapts the Capture The Flag (CTF) format for **Cairo 1** smart contracts deployed on StarkNet.

Each level presents a Cairo smart contract with a vulnerability or puzzle. Players must analyse the contract, find the exploit, and call the right functions to "pwn" it. The live version is available at [sandwalker.xyz](https://sandwalker.xyz).

## Team

Built with [Marina Cebotari](https://twitter.com/MarinaCebotari), [GianfrancoBazzani](https://twitter.com/BazziBazzani), and [Roger](https://twitter.com/Moustach_Crypto) over one weekend at EthPrague 2023.

## Architecture

**Smart Contracts (`/contracts`)** — Cairo 1 contracts on StarkNet. The main `TheSandWalker` contract acts as a game registry: it tracks registered levels, player instances, and completion status. Players call `create_instance()` to deploy a personal challenge instance, then interact with it to find the solution.

**Frontend (`/client`)** — A Next.js 13 app with StarkNet wallet integration. Players connect their wallet, browse levels, and submit solutions directly from the browser.

## Tech Stack

| Layer           | Technology                    |
| --------------- | ----------------------------- |
| Smart contracts | Cairo 1, StarkNet             |
| Frontend        | Next.js 13, React 18          |
| Styling         | Tailwind CSS                  |
| Wallet          | starknet-react, get-starknet  |
| Build tool      | Scarb (Cairo package manager) |

## Links

- Devfolio submission: [devfolio.co/projects/the-sand-walker-9191](https://devfolio.co/projects/the-sand-walker-9191)
- Live game: [sandwalker.xyz](https://sandwalker.xyz)
