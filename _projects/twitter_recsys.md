---
layout: page
title: Twitter 2021 RecSys Challenge
description: "Implementation of a Recommender System that predicts interactions for Twitter users. Reached 14th place overall and 8th position in the Like leaderboard."
project_date: "Jun. 2021 — Universitat de Barcelona"
github: "https://github.com/0xAdriaTorralba/RecSys2021"
importance: 4
sort_date: 2021-06
category: project
---

Final project for the **MSc in Fundamental Principles of Data Science** at the Universitat de Barcelona — a participation in the [RecSys Challenge 2021](http://www.recsyschallenge.com/2021/), organised by Politecnico di Bari, ETH Zurich, and Jönköping University, with data provided by Twitter.

## The Challenge

The task was to predict the probability that a Twitter user engages with a tweet in their home timeline — covering four engagement types: **Like**, **Retweet**, **Reply**, and **Quote**. The dataset consisted of roughly 1 billion user–tweet interaction pairs.

## Approach

The solution is based on **Gradient Boosting Trees** with hand-crafted features representing user interaction history, tweet content characteristics, and user relationship signals. Three model variants were developed:

- **Text-Based Model** — features derived from tweet text
- **Non-Text-Based Model** — features from metadata and interaction history
- **Mixed Model** — a combination of both, which achieved the best performance

## Results

| Metric              | Position            |
| ------------------- | ------------------- |
| Overall leaderboard | **14th place**      |
| Like category       | **7th – 9th place** |

## Tech Stack

| Layer               | Technology                                   |
| ------------------- | -------------------------------------------- |
| Language            | Python                                       |
| Models              | Gradient Boosting Trees (XGBoost / LightGBM) |
| Notebooks           | Jupyter                                      |
| Feature engineering | Custom text + non-text features              |

## Contributors

Developed with [Marcos Moreno Blanco](https://github.com/MarcosMorenoBlanco).
