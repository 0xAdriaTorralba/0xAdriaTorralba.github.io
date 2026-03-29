---
layout: page
permalink: /talks/
title: talks
description: Invited talks and presentations.
nav: true
nav_order: 3
---

<div class="row row-cols-1 row-cols-md-2">
  {%- assign sorted_talks = site.talks | where: "category", "talk" | sort: "sort_date" | reverse -%}
  {%- for talk in sorted_talks -%}
    {% include talks_horizontal.liquid %}
  {%- endfor -%}
</div>
