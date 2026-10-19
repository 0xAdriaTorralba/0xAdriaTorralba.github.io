---
layout: page
title: evm-storage.codes
description: "Web tool to visualize, compare and analyze Ethereum smart-contract storage layouts, built on OpenZeppelin's upgrades-core. Open-source contributor to Gianfranco Bazzani's project."
project_date: "Apr. 2026 — open-source contribution"
github: "https://github.com/GianfrancoBazzani/evm-storage.codes"
demo_url: "https://evm-storage.codes"
importance: 2
sort_date: 2026-04
category: project
tags: [security, evm, storage, tooling]
---

[**EVM-Storage.codes**](https://evm-storage.codes/) is an online web tool to visualize, compare and analyze Ethereum smart-contract storage layouts. It is a user-friendly interface on top of [OpenZeppelin's upgrades-core](https://github.com/OpenZeppelin/openzeppelin-upgrades) library, which it uses to analyze contract storage and generate compatibility reports.

The project is created and maintained by [Gianfranco Bazzani](https://github.com/GianfrancoBazzani). I contribute to it as an open-source contributor:

- [#75](https://github.com/GianfrancoBazzani/evm-storage.codes/pull/75) — link to Sourcify's new APIv2 verifier UI (merged)
- [#76](https://github.com/GianfrancoBazzani/evm-storage.codes/pull/76) — confirm the copy action in the share-button tooltip (merged)

## Features

- Upload local smart contracts or fetch verified sources from [Sourcify](https://sourcify.dev/)
- In-browser compilation using a dynamic solc web worker
- Graphical representation of storage layouts in the UI
- Support for [ERC-7201](https://eips.ethereum.org/EIPS/eip-7201) namespaced storage layouts and the custom storage layouts released with Solidity 0.8.29
- Backend caching of storage layouts to avoid repeated recompilation

## Why it matters for security

A storage-layout mismatch between two implementations behind the same proxy can overwrite live state after an upgrade. EVM-Storage.codes makes those compatibility checks visual: during upgrades of proxy-pattern contracts and when modifying EIP-7702 delegations.

## Links

- Live tool: <https://evm-storage.codes>
- Source code: <https://github.com/GianfrancoBazzani/evm-storage.codes>
