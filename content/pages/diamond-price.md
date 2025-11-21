---
title: "Diamond Price Prediction (Regression)"
slug: "diamond-price"
description: "ECS171 project comparing regression models to predict diamond prices; includes a demo and Flask app artifacts."
date: 2025-09-02
draft: false
tags: [machine-learning, regression, xgboost, flask]
---

## Overview

An applied regression project on the classic diamonds dataset. We compare multiple models (linear/polynomial regression, random forest, XGBoost), evaluate out-of-sample error, and package a minimal Flask GUI for experimentation.

## Goals

- Build and compare several regression baselines and tree-based methods.
- Explain key drivers of price via features and model diagnostics.
- Provide a demo UI and export trained artifacts for reproducibility.

## Data

- Dataset: `/projects/diamond-price/data/diamonds.csv`

## Methods

- Benchmarks: Linear/Polynomial regression, Random Forest, XGBoost.
- Evaluation: train/validation split, MAE/RMSE, error analysis by feature bins.
- Packaging: simple Flask app with pre-fitted artifacts (scaler + models).

## Deliverables

- Report: `/projects/diamond-price/reports/report.pdf`
- Notebook: `/projects/diamond-price/notebooks/diamond-price.ipynb`
- Demo: `/projects/diamond-price/demo/demo.mp4`
- Flask code: `/projects/diamond-price/code/app.py`
- Artifacts: `/projects/diamond-price/artifacts/`

## Outcomes

- Tree ensembles (especially XGBoost) outperform linear baselines on MAE/RMSE while maintaining reasonable inference latency.
- Feature effects align with domain intuition (cut, color, clarity, carat). The UI demonstrates interactive predictions.

