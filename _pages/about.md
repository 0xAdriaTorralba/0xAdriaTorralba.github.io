---
layout: about
title: about
permalink: /
subtitle: >
  Blockchain Security Auditor &amp; Vulnerability Researcher <br>
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

# "latest news" block is TEMPORARILY HIDDEN on /about.
# The block is rendered by _layouts/about.liquid only when
# `page.announcements.enabled` is true, so flipping this flag to
# false is enough — the layout stays untouched, _news/*.md entries
# are not deleted, and the /news/ page still lists them.
#
# To restore: set `enabled: true` below. The other knobs
# (scrollable, limit) keep their current values.
announcements:
  enabled: false # ← flip to true to bring "latest news" back on /about
  scrollable: true # vertical scroll bar when there are more than 3 items
  limit: 5 # leave blank to include every _news/*.md

# latest_posts:
#   enabled: true
#   scrollable: true # adds a vertical scroll bar if there are more than 3 new posts items
#   limit: 3 # leave blank to include all the blog posts

selected_papers: true # includes a list of papers marked as "selected={true}"
social: true # includes social icons at the bottom of the page
---

I audit blockchain systems — with a focus on Zero-Knowledge proving infrastructure (zkVMs, recursion circuits, rollup components) and DeFi protocols — and publish vulnerability research on bug classes that repeatedly show up in Layer 2 deployments. Most recently, I worked at <a href="https://www.openzeppelin.com/" target="_blank">OpenZeppelin</a> auditing zkVMs and DeFi protocols, and researching Zero-Knowledge Cryptography and Fully-Homomorphic Encryption. Selected engagements, contest findings, writeups, and my current CTF progress are on the <a href="{{ '/security/' | relative_url }}">security</a> page.

In parallel, I am a PhD Candidate in Applied Cryptography on Blockchain at the <a href="https://www.uoc.edu/portal/es/in3/recerca/grups/kriptography_and_information" target="_blank">KISON research group</a> (Universitat Oberta de Catalunya), where my research focuses on Zero-Knowledge Cryptography, Elliptic Curve Cryptography, and the security assumptions of blockchain Layer 2 scalability solutions.

I hold a double BSc in Mathematics and Computer Science and a MSc in Fundamental Principles of Data Science, both from the Universitat de Barcelona. My broader interests include Pairing-based Cryptography, Homomorphic Encryption, Interactive Proof-Systems, and Abstract Algebra.
