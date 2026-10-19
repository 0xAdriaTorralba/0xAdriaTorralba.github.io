---
layout: about
title: about
permalink: /
subtitle: >
  Blockchain Security Researcher @ OpenZeppelin <br>
  Zero-Knowledge Cryptographer <br>
  PhD Candidate — Applied Cryptography on Blockchain

profile:
  align: left
  image: prof_pic.jpeg
  image_circular: true # crops the image to make it circular
  more_info: >
    <p style="text-align: center;">
        <a href="mailto:crypto@0xAdriaTorralba.me" style="display: inline-flex; align-items: center;">
            <i class="fa-solid fa-envelope" style="margin-right: 5px;"></i> crypto@0xAdriaTorralba.me
        </a>
    </p>

recent_security:
  enabled: true # surfaces the most recent audit / writeup / security-tagged activity
  limit: 3

github_activity:
  enabled: true # renders the GitHub contribution heatmap at the bottom

# "latest news" block on /about. Rendered by _layouts/about.liquid
# only when `page.announcements.enabled` is true. To hide it again:
# set `enabled: false` — the layout stays untouched, _news/*.md
# entries are not deleted, and the /news/ page still lists them.
announcements:
  enabled: true # ← set to false to hide "latest news" on /about
  scrollable: true # vertical scroll bar when there are more than 3 items
  limit: 5 # leave blank to include every _news/*.md

# latest_posts:
#   enabled: true
#   scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
#   limit: 3 # leave blank to include all the blog posts

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
---

I am a Blockchain Security Researcher at <a href="https://www.openzeppelin.com/" target="_blank">OpenZeppelin</a>. I audit Zero-Knowledge proving infrastructure (zkVMs, recursion circuits, rollup components) and DeFi protocols, and I research Zero-Knowledge Cryptography and Fully-Homomorphic Encryption. My public work includes the <a href="{{ '/audits/openzeppelin-zisk-binary-and-main/' | relative_url }}">ZisK zkVM Binary &amp; Main circuits review</a> (1 critical and 2 high-severity issues) and an <a href="https://github.com/OpenZeppelin/openzeppelin-contracts/pull/6624" target="_blank">ERC-7535 native-asset vault extension</a> proposed to OpenZeppelin Contracts. On the research side, I study how Layer 2 design choices become attack surface; my latest work classifies rollup sequencer architectures, presented at RECSI 2026 and <a href="{{ '/talks/ethprague_breaking_rollups/' | relative_url }}">ETHPrague 2026</a>. My audit reports, CTF results and training are on the <a href="{{ '/security/' | relative_url }}">security</a> page.

In parallel, I am a PhD Candidate in Applied Cryptography on Blockchain at the <a href="https://www.uoc.edu/portal/es/in3/recerca/grups/kriptography_and_information" target="_blank">KISON research group</a> (Universitat Oberta de Catalunya), where my research focuses on Zero-Knowledge Cryptography, Elliptic Curve Cryptography, and the security assumptions of blockchain Layer 2 scalability solutions.

I hold a double BSc in Mathematics and Computer Science and a MSc in Fundamental Principles of Data Science, both from the Universitat de Barcelona. My broader interests include Pairing-based Cryptography, Interactive Proof-Systems, and Abstract Algebra.
