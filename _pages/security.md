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

<h2 id="audits">Audit engagements</h2>

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

  <h2 id="contests">Audit contest findings</h2>
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

  <h2 id="writeups">Writeups &amp; research posts</h2>
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

<h2 id="progress">CTF &amp; wargames</h2>

{% include ctf_progress.liquid %}

<h2 id="tools">Tools &amp; contributions</h2>

{% if security_projects.size > 0 %}
  <div class="row row-cols-1 row-cols-md-2">
    {% for project in security_projects %}
      {% include projects_horizontal.liquid %}
    {% endfor %}
  </div>
{% else %}
  <p class="text-muted"><em>Security-related projects and tooling will surface here (tag a project with <code>security</code> to include it).</em></p>
{% endif %}

{% assign contributions = site.data.contributions.contributions | sort: "merged" | reverse %}
{% if contributions and contributions.size > 0 %}
  <h3 style="margin-top: 1.5rem;">Relevant Open-Source Contributions</h3>
  <ul style="list-style: none; padding-left: 0;">
    {% for c in contributions %}
      <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--global-divider-color);">
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.5rem;">
          <div style="flex: 1 1 auto; min-width: 0;">
            <a href="{{ c.url }}" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-github"></i>
              <strong>{{ c.repo }}</strong>#{{ c.pr }}
            </a>
            <span> — {{ c.title }}</span>
          </div>
          <span class="text-muted" style="font-size: 0.85rem;">
            {% if c.scope %}<span class="badge" style="background-color: var(--global-text-color-light); color: var(--global-bg-color); font-weight: 500;">{{ c.scope }}</span>{% endif %}
            {% if c.merged %} · merged {{ c.merged | date: "%b %Y" }}{% endif %}
          </span>
        </div>
        {% if c.description %}<div class="text-muted" style="font-size: 0.85rem; margin-top: 0.2rem;">{{ c.description }}</div>{% endif %}
      </li>
    {% endfor %}
  </ul>
{% endif %}
