---
layout: page
permalink: /security/
title: security
description: "I audit blockchain systems, primarily Zero-Knowledge proving infrastructure (zkVMs, circuits, recursion layers) and DeFi protocols."
nav: true
nav_order: 2              # directly after about
---

{% assign published_audits = site.audits | where: "published", true | sort: "date" | reverse %}
{% assign contest_audits = published_audits | where: "contest", true %}
{% assign firm_audits = published_audits | where_exp: "a", "a.contest != true" %}
{% assign security_posts = site.posts | where_exp: "p", "p.tags contains 'security-research'" | sort: "date" | reverse %}
{% assign security_projects = site.projects | where_exp: "p", "p.tags contains 'security'" %}

<style>
  /* Hover / focus tooltips for section titles. */
  .tip { position: relative; display: inline-block; margin-left: 0.4rem; vertical-align: middle;
         font-size: 0.7em; color: var(--global-text-color-light); cursor: help; outline: none; }
  .tip:hover, .tip:focus-within, .tip:focus { color: var(--global-theme-color); }
  .tip__panel {
    position: absolute; top: calc(100% + 0.4rem); left: 0;
    width: max(260px, min(420px, 60vw));
    background: var(--global-card-bg-color);
    color: var(--global-text-color);
    border: 1px solid var(--global-divider-color);
    border-radius: 6px;
    padding: 0.75rem 1rem;
    font-size: 0.92rem; font-weight: 400; line-height: 1.45;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
    opacity: 0; visibility: hidden; pointer-events: none;
    transition: opacity 0.15s ease, visibility 0.15s ease;
    z-index: 20;
    text-align: left;
    letter-spacing: normal;
  }
  .tip:hover .tip__panel, .tip:focus-within .tip__panel, .tip:focus .tip__panel {
    opacity: 1; visibility: visible; pointer-events: auto;
  }
  /* Flip the panel to right-anchored for tips that sit near the viewport's right edge. */
  .tip--right .tip__panel { left: auto; right: 0; }

  /* Even vertical rhythm between top-level H2 sections on /security/.
     First H2 hugs the page lede; every H2 after it gets a consistent gap
     and a thin divider line so sections remain visually distinct even
     when their content length varies. */
  .post h2[id] {
    margin-top: 3.5rem;
    margin-bottom: 1rem;
    padding-top: 1.25rem;
    border-top: 1px solid var(--global-divider-color);
  }
  .post h2[id]:first-of-type {
    margin-top: 1.75rem;
    padding-top: 0;
    border-top: 0;
  }
</style>

<p>
  This page collects the security-relevant work I do: the professional audits I've contributed to,
  the certifications and coursework I've completed to keep my toolkit sharp, and the CTFs and
  wargames I practise on. Hover the&nbsp;<i class="fa-solid fa-circle-info" aria-hidden="true" style="color: var(--global-text-color-light);"></i>&nbsp;next to a section title for what it means.
</p>

<h2 id="audits">
  security audits
  <span class="tip" tabindex="0" role="button" aria-label="In a security audit, a client hires an independent firm to review their code for vulnerabilities before (or soon after) it ships. Findings are documented with severity ratings, prioritised, and published as a report. Each entry below links to the public report.">
    <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
    <span class="tip__panel" role="tooltip">
      In a security audit, a client hires an independent firm to review their code for
      vulnerabilities before (or soon after) it ships. Findings are documented with severity
      ratings, prioritised, and published as a report. Each entry below links to the public report.
    </span>
  </span>
</h2>

{% if firm_audits.size > 0 %}
  <div class="row row-cols-1 row-cols-md-2">
    {% for audit in firm_audits %}
      {% include audits_horizontal.liquid %}
    {% endfor %}
  </div>
{% else %}
  <p class="text-muted"><em>Public audit entries will appear here as they are published.</em></p>
{% endif %}

{%- comment -%}
  ============================================================
  HIDDEN WHILE EMPTY — restore when there is real content.
  ============================================================

  Audit contest findings: activates as soon as any _audits/*.md entry has
    contest: true
    published: true
  (e.g. Code4rena / Sherlock / Cantina / Immunefi). Until then the H2 and
  "coming soon" placeholder add noise, so they're commented out.

  <h2 id="contests">audit contest findings</h2>
  {% if contest_audits.size > 0 %}
    <div class="row row-cols-1 row-cols-md-2">
      {% for audit in contest_audits %}
        {% include audits_horizontal.liquid %}
      {% endfor %}
    </div>
  {% else %}
    <p class="text-muted"><em>Code4rena / Sherlock / Cantina contest entries will appear here.</em></p>
  {% endif %}

  Writeups & research posts: activates as soon as any _posts/*.md is tagged
  `security-research` (and is not in _drafts/). The 5 shells under _drafts/
  are the first candidates — move them to _posts/ after review. Until then
  this section is hidden.

  <h2 id="writeups">writeups &amp; research posts</h2>
  {% if security_posts.size > 0 %}
    <ul class="post-list">
      {% for post in security_posts limit: 20 %}
        <li>
          <h3>
            <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
          </h3>
          <p class="post-meta">
            {{ post.date | date: "%b %e, %Y" }}
            {% if post.tags.size > 0 %}·
              {% for t in post.tags %}{% unless t == "security-research" %}<span class="badge badge-secondary">{{ t }}</span> {% endunless %}{% endfor %}
            {% endif %}
          </p>
          {% if post.description %}<p>{{ post.description }}</p>{% endif %}
        </li>
      {% endfor %}
    </ul>
  {% else %}
    <p class="text-muted"><em>Writeups tagged <code>security-research</code> will appear here.</em></p>
  {% endif %}
{%- endcomment -%}

<h2 id="certifications">
  certifications &amp; coursework
  <span class="tip" tabindex="0" role="button" aria-label="Public certificates of completion for security- and smart-contract-focused courses I've taken. Each badge links to the course page; the Verify link goes to my public Cyfrin Profile so the completion can be confirmed by anyone.">
    <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
    <span class="tip__panel" role="tooltip">
      Public certificates of completion for security- and smart-contract-focused courses I've taken.
      Each badge links to the course page; the <em>Verify</em> link goes to my public Cyfrin Profile
      so the completion can be confirmed by anyone.
    </span>
  </span>
</h2>

{% include certifications.liquid %}

<h2 id="progress">
  CTF &amp; wargames
  <span class="tip" tabindex="0" role="button" aria-label="CTFs (Capture The Flag) are competitive security challenge events — teams attack deliberately vulnerable code under a time limit, scoring points per flag captured. Wargames are the self-paced equivalent: public challenge sets with structured levels. Team CTFs and solo wargame progress are tracked separately below.">
    <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
    <span class="tip__panel" role="tooltip">
      <strong>CTFs</strong> (Capture The Flag) are competitive security challenge events — teams
      attack deliberately vulnerable code under a time limit, scoring points per flag captured.
      <strong>Wargames</strong> are the self-paced equivalent: public challenge sets with structured
      levels. Team CTFs and solo wargame progress are tracked separately below because they carry
      different signal.
    </span>
  </span>
</h2>

{% include ctf_progress.liquid %}

{%- comment -%}
  The security-tagged projects grid (Sand Walker, etc.) used to live
  here under a "tools & contributions" H2. Hidden behind an if-false
  wrapper below. To restore, flip the wrapping condition to "if true"
  (or delete the wrapping if/endif tags entirely). Data untouched —
  tag a project with `security` and it surfaces instantly.
{%- endcomment -%}
{%- if false -%}
<h2 id="tools">tools &amp; contributions</h2>

{% if security_projects.size > 0 %}
  <div class="row row-cols-1 row-cols-md-2">
    {% for project in security_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
  </div>
{% else %}
  <p class="text-muted"><em>Security-related projects and tooling will surface here (tag a project with <code>security</code> to include it).</em></p>
{% endif %}
{%- endif -%}
