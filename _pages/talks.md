---
layout: page
permalink: /talks/
title: talks
description: Invited talks and presentations.
nav: true
nav_order: 5
---

<div class="publications">

{%- assign sorted_talks = site.talks | where: "category", "talk" | sort: "sort_date" | reverse -%}
{%- assign current_year = "" -%}
{%- for talk in sorted_talks -%}
  {%- assign talk_year = talk.sort_date | slice: 0, 4 -%}
  {%- if talk_year != current_year -%}
    {%- assign current_year = talk_year -%}
    <h2 class="bibliography">{{ current_year }}</h2>
  {%- endif -%}
  <div class="row row-cols-1">
    {% include talks_horizontal.liquid %}
  </div>
{%- endfor -%}

</div>
