---
title: "Multivariate Analysis: MANOVA and Discriminant Methods"
slug: "multivariate-statistical-analysis"
description: "STA135 project on multivariate hypothesis testing and classification for transportation cost data."
date: 2025-09-02
draft: false
tags: [data-science, multivariate, manova, lda]
---

## Overview

Course project (STA135) applying multivariate statistical tools to analyze transportation-cost data. We test for group differences and build discriminant rules for classification.

## Goals

- Conduct MANOVA to assess simultaneous mean differences across groups.
- Examine variable contributions and correlations.
- Fit LDA/QDA/other discriminant models and evaluate classification performance.

## Data & Code

- Primary dataset: `/projects/multivariate-analysis/data/T6-10.dat`
- Additional datasets (UCI Abalone): `/projects/multivariate-analysis/data/abalone/`
- Reproducible script: `/projects/multivariate-analysis/code/code.R`

## Deliverables

- Report: `/projects/multivariate-analysis/reports/report.pdf`

## Outcomes

- MANOVA indicates significant multivariate group effects; follow-up tests identify contributing variables.
- Discriminant analysis yields interpretable decision boundaries, with performance depending on covariance assumptions.
