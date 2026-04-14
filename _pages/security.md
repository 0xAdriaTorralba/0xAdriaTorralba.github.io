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

<h2 id="certifications">Certifications &amp; coursework</h2>

{% include certifications.liquid %}

{%- comment -%}
  The security-tagged projects grid (Sand Walker, etc.) used to live
  here under a "Tools & contributions" H2. Hidden behind an if-false
  wrapper below. To restore, flip the wrapping condition to "if true"
  (or delete the wrapping if/endif tags entirely). Data untouched —
  tag a project with `security` and it surfaces instantly.
{%- endcomment -%}
{%- if false -%}
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
{%- endif -%}

{% assign contributions = site.data.contributions.contributions | sort: "date" | reverse %}
{% if contributions and contributions.size > 0 %}
  {% assign merged_count = contributions | where: "state", "merged" | size %}
  {% assign open_count = contributions | where: "state", "open" | size %}
  {% assign closed_count = contributions | where: "state", "closed" | size %}
  <h2 id="contributions" style="margin-top: 1.5rem; margin-bottom: 0.4rem;">Open-Source Contributions</h2>
  <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 1rem;">
    {{ contributions.size }} pull requests across {{ contributions | map: "repo" | uniq | size }} repositories
    &middot; {{ merged_count }} merged{% if open_count > 0 %} &middot; {{ open_count }} open{% endif %}{% if closed_count > 0 %} &middot; {{ closed_count }} closed without merge{% endif %}
  </p>

  <style>
    .pr-state {
      display: inline-flex; align-items: center; gap: 0.3em;
      font-size: 0.7rem; font-weight: 600;
      padding: 1px 8px; border-radius: 999px;
      letter-spacing: 0.03em;
      line-height: 1.25;
    }
    .pr-state--merged { background-color: #e9ddff; color: #5a329d; }
    .pr-state--open   { background-color: #d8f3dc; color: #1a5f36; }
    .pr-state--closed { background-color: #f1d6d6; color: #7a1f1f; }
    .pr-group { margin-top: 1.25rem; }
    .pr-group__header {
      display: flex; align-items: baseline; justify-content: space-between;
      gap: 0.5rem; flex-wrap: wrap;
      padding-bottom: 0.35rem;
      margin-bottom: 0.25rem;
      border-bottom: 2px solid var(--global-theme-color);
    }
    .pr-group__title { margin: 0; font-size: 1.05rem; font-weight: 700; letter-spacing: 0.01em; }
    .pr-group__meta  { color: var(--global-text-color-light); font-size: 0.8rem; }
    .pr-filter { display: flex; gap: 0.35rem; flex-wrap: wrap; margin-bottom: 0.9rem; font-size: 0.8rem; }
    .pr-filter__btn {
      appearance: none; cursor: pointer;
      border: 1px solid var(--global-divider-color);
      background-color: var(--global-card-bg-color);
      color: var(--global-text-color);
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      font-size: inherit; font-weight: 500;
      line-height: 1.2;
    }
    .pr-filter__btn:hover { border-color: var(--global-theme-color); color: var(--global-theme-color); }
    .pr-filter__btn.is-active {
      background-color: var(--global-theme-color);
      color: var(--global-hover-text-color);
      border-color: var(--global-theme-color);
    }
    .pr-filter__btn[data-filter="merged"].is-active { background-color: #5a329d; border-color: #5a329d; }
    .pr-filter__btn[data-filter="open"].is-active   { background-color: #1a5f36; border-color: #1a5f36; }
    .pr-filter__btn[data-filter="closed"].is-active { background-color: #7a1f1f; border-color: #7a1f1f; }
    .pr-filter__btn[data-count]::after {
      content: " · " attr(data-count);
      opacity: 0.75;
      font-weight: 400;
    }
    .pr-group[hidden] { display: none; }
    li[data-pr-state][hidden] { display: none !important; }
  </style>

  <div class="pr-filter" data-pr-filter>
    <button type="button" class="pr-filter__btn is-active" data-filter="all"    data-count="{{ contributions.size }}">all</button>
    <button type="button" class="pr-filter__btn"          data-filter="merged" data-count="{{ merged_count }}">merged</button>
    {% if open_count > 0 %}<button type="button" class="pr-filter__btn" data-filter="open"   data-count="{{ open_count }}">open</button>{% endif %}
    {% if closed_count > 0 %}<button type="button" class="pr-filter__btn" data-filter="closed" data-count="{{ closed_count }}">closed</button>{% endif %}
  </div>

  {%- comment -%}
    Group rendering order. Each entry: [slug, label, one-line description].
    Add / reorder here if a new category appears in _data/contributions.yml.
  {%- endcomment -%}

  {%- assign cat_slugs = "blockchain,ai,tooling,projects,academic,portfolio" | split: "," -%}

  {%- for slug in cat_slugs -%}
    {%- assign group = contributions | where: "category", slug -%}
    {%- if group.size > 0 -%}
      {%- case slug -%}
        {%- when "blockchain" -%}{%- assign label = "Blockchain & ZK" -%}{%- assign blurb = "Ethereum, ZK, and smart-contract ecosystem repos." -%}
        {%- when "ai"         -%}{%- assign label = "AI" -%}{%- assign blurb = "LLM-backed products, agents, and AI-tooling contributions." -%}
        {%- when "tooling"    -%}{%- assign label = "Developer tooling" -%}{%- assign blurb = "Devtools, themes, libraries, and general-purpose OSS." -%}
        {%- when "projects"   -%}{%- assign label = "Personal projects" -%}{%- assign blurb = "Apps, utilities, and side projects I built and ship myself." -%}
        {%- when "portfolio"  -%}{%- assign label = "Portfolio site" -%}{%- assign blurb = "Iterations on this website." -%}
        {%- when "academic"   -%}{%- assign label = "Academic coursework" -%}{%- assign blurb = "University projects and data-visualisation research." -%}
        {%- else              -%}{%- assign label = slug | capitalize -%}{%- assign blurb = "" -%}
      {%- endcase -%}
      {%- assign group_merged = group | where: "state", "merged" | size -%}
      {%- assign group_open = group | where: "state", "open" | size -%}
      {%- assign group_closed = group | where: "state", "closed" | size -%}
      <section class="pr-group" data-pr-group>
        <div class="pr-group__header">
          <h4 class="pr-group__title">{{ label }}</h4>
          <span class="pr-group__meta" data-pr-group-meta
                data-total="{{ group.size }}"
                data-merged="{{ group_merged }}"
                data-open="{{ group_open }}"
                data-closed="{{ group_closed }}">
            {{ group.size }} PR{% if group.size != 1 %}s{% endif %}
            &middot; {{ group_merged }} merged{% if group_open > 0 %} &middot; {{ group_open }} open{% endif %}{% if group_closed > 0 %} &middot; {{ group_closed }} closed{% endif %}
          </span>
        </div>
        {% if blurb != "" %}<p class="text-muted" style="font-size: 0.82rem; margin-top: 0.1rem; margin-bottom: 0.4rem;">{{ blurb }}</p>{% endif %}
        <ul style="list-style: none; padding-left: 0; margin-bottom: 0;">
          {%- for c in group -%}
            <li data-pr-state="{{ c.state | default: 'merged' }}" style="padding: 0.45rem 0; border-bottom: 1px solid var(--global-divider-color);">
              <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.5rem;">
                <div style="flex: 1 1 auto; min-width: 0;">
                  <a href="{{ c.url }}" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-github"></i>
                    <strong>{{ c.repo }}</strong>#{{ c.pr }}
                  </a>
                  <span> — {{ c.title }}</span>
                </div>
                <span style="display: inline-flex; align-items: center; gap: 0.45rem; flex-shrink: 0;">
                  {% if c.scope %}<span class="badge" style="background-color: var(--global-text-color-light); color: var(--global-bg-color); font-weight: 500;">{{ c.scope }}</span>{% endif %}
                  <span class="pr-state pr-state--{{ c.state | default: 'merged' }}">{{ c.state | default: 'merged' }}</span>
                  {% if c.date %}
                    <span class="text-muted" style="font-size: 0.82rem;">{{ c.date | date: "%b %Y" }}</span>
                  {% endif %}
                </span>
              </div>
              {% if c.description %}<div class="text-muted" style="font-size: 0.85rem; margin-top: 0.2rem;">{{ c.description }}</div>{% endif %}
            </li>
          {%- endfor -%}
        </ul>
      </section>
    {%- endif -%}
  {%- endfor -%}

  {%- comment -%} Catch any PRs with an unrecognised (or missing) category. {%- endcomment -%}
  {%- assign uncategorised = contributions | where_exp: "c", "c.category == nil" -%}
  {%- if uncategorised.size > 0 -%}
    <section class="pr-group" data-pr-group>
      <div class="pr-group__header">
        <h4 class="pr-group__title">Other</h4>
        <span class="pr-group__meta">{{ uncategorised.size }} PR{% if uncategorised.size != 1 %}s{% endif %}</span>
      </div>
      <ul style="list-style: none; padding-left: 0; margin-bottom: 0;">
        {%- for c in uncategorised -%}
          <li data-pr-state="{{ c.state | default: 'merged' }}" style="padding: 0.45rem 0; border-bottom: 1px solid var(--global-divider-color);">
            <a href="{{ c.url }}" target="_blank" rel="noopener noreferrer"><strong>{{ c.repo }}</strong>#{{ c.pr }}</a> — {{ c.title }}
          </li>
        {%- endfor -%}
      </ul>
    </section>
  {%- endif -%}

  <script>
    (function () {
      var filterBar = document.querySelector('[data-pr-filter]');
      if (!filterBar) return;
      var btns = filterBar.querySelectorAll('.pr-filter__btn');
      var groups = document.querySelectorAll('[data-pr-group]');

      function setActive(btn) {
        btns.forEach(function (b) { b.classList.toggle('is-active', b === btn); });
      }

      function applyFilter(filter) {
        groups.forEach(function (group) {
          var items = group.querySelectorAll('li[data-pr-state]');
          var visibleCount = 0;
          items.forEach(function (li) {
            var matches = (filter === 'all') || (li.dataset.prState === filter);
            li.hidden = !matches;
            if (matches) visibleCount += 1;
          });
          group.hidden = (visibleCount === 0);

          // Refresh the group's meta line to reflect the active filter.
          var meta = group.querySelector('[data-pr-group-meta]');
          if (meta) {
            if (filter === 'all') {
              meta.textContent = meta.dataset.total + ' PR' + (meta.dataset.total === '1' ? '' : 's')
                + ' · ' + meta.dataset.merged + ' merged'
                + (parseInt(meta.dataset.open, 10) ? ' · ' + meta.dataset.open + ' open' : '')
                + (parseInt(meta.dataset.closed, 10) ? ' · ' + meta.dataset.closed + ' closed' : '');
            } else {
              meta.textContent = visibleCount + ' ' + filter;
            }
          }
        });
      }

      btns.forEach(function (btn) {
        btn.addEventListener('click', function () {
          setActive(btn);
          applyFilter(btn.dataset.filter);
        });
      });
    })();
  </script>
{% endif %}
