---
layout: page
permalink: /projects/
title: (side)projects
description: Research and engineering projects.
nav: true
nav_order: 4
---

<div class="row row-cols-1 row-cols-md-2">
  {%- assign sorted_projects = site.projects | where: "category", "project" | sort: "sort_date" | reverse -%}
  {%- for project in sorted_projects -%}
    {% include projects_horizontal.liquid %}
  {%- endfor -%}
</div>
