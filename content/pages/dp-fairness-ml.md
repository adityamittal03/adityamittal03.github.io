---
title: "Differential Privacy and Fairness on COMPAS"
slug: "dp-fairness-ml"
description: "Exploring K-Means with DP noise and fairness metrics (Equalized Odds, Sufficiency) on COMPAS recidivism scores."
date: 2025-09-02
draft: false
tags: [data-science, privacy, fairness, compas]
---

## Overview

This project from MAT180 investigates two key themes in trustworthy ML:

- Differential Privacy (DP): How injecting calibrated noise impacts K-Means clustering objective and cluster quality.
- Algorithmic Fairness: Diagnosing group disparities in recidivism predictions using COMPAS risk scores.

## Goals

- Implement differentially private K-Means variants with Laplace/Gaussian noise.
- Quantify fairness with Equalized Odds and Sufficiency across protected groups in COMPAS.
- Summarize trade-offs and qualitative patterns in a short writeup and poster.

## Data

- COMPAS subset: `/projects/dp-fairness/data/compas-scores.csv`
- Synthetic/teaching data: `/projects/dp-fairness/data/kmeansexample.asc`

## Methods

- DP K-Means: add noise to counts/centroid updates and study objective/cluster assignments vs. baseline.
- Fairness metrics: compute confusion matrices by group; compare error rates and calibration-like statistics.

## Deliverables

- Report: `/projects/dp-fairness/reports/dp_fairness_report.pdf`
- Poster: `/projects/dp-fairness/reports/machine_learning_fairness_poster.pdf`
- Notebooks:
  - DP K-Means: `/projects/dp-fairness/notebooks/differential-privacy.ipynb`
  - Fairness metrics: `/projects/dp-fairness/notebooks/fairness.ipynb`

## Outcomes

- DP noise degrades K-Means objective and cluster stability as privacy increases; moderate noise retains reasonable structure on simple datasets.
- COMPAS analysis highlights group-level differences in error rates and score–outcome relationships, consistent with known fairness concerns.

These artifacts are designed for teaching: the notebooks are concise, with code and outputs that can be reused in coursework or demos.
