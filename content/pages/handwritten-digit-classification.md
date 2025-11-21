---
title: "Handwritten Digit Classification: LR, SVM, and SVD"
slug: "handwritten-digit-classification"
description: "Comparing logistic regression, SVMs, and SVD-based classifiers for recognizing handwritten digits."
date: 2025-09-02
draft: false
tags: [data-science, classification, svm, svd]
---

## Overview

Course project (MAT167, Applied Linear Algebra). We compare classic classifiers (logistic regression, linear SVM) for handwritten digits and a linear-algebraic approach (SVD). Below are a brief dataset intro and the confusion matrices rendered directly for a quick skim.

### Dataset

- USPS digits (10 classes), 16x16 grayscale images.
- Pre-split train/test; flattened to 256-dim vectors; z-score standardized.

<figure style="max-width:520px; margin: 0 0 1rem 0;">
  <img src="/projects/handwritten-digits/usps_examples.png" alt="Sample USPS digits (0–9)">
  <figcaption style="color:var(--text-secondary); font-size:0.9rem; margin-top:0.25rem;">Example 16x16 grayscale digits.</figcaption>
</figure>

### SVD (Main Method)

- For each digit class, compute a rank-k SVD basis U_k on that class’s training images.
- For a test image x, compute reconstruction error ||x − U_k U_k^T x|| for each class and predict the class with minimal error.

<figure style="max-width:640px; margin: 0 0 1rem 0;">
  <img src="/projects/handwritten-digits/acc_vs_k.png" alt="Accuracy vs. rank k for SVD-based classifier">
  <figcaption style="color:var(--text-secondary); font-size:0.9rem; margin-top:0.25rem;">SVD classifier accuracy across ranks k (teaser of the trade-off).</figcaption>
</figure>

<figure style="max-width:520px; margin: 0 0 1rem 0;">
  <img src="/projects/handwritten-digits/plots/svd_k17_confusion.png" alt="SVD (k=17) confusion matrix">
  <figcaption style="color:var(--text-secondary); font-size:0.9rem; margin-top:0.25rem;">SVD (k=17) — Confusion Matrix (Acc ≈ 0.966).</figcaption>
</figure>

### Confusion Matrices

<div style="display:flex; gap:1rem; flex-wrap:wrap; align-items:flex-start;">
  <figure style="flex:1 1 320px; min-width:280px; margin:0;">
    <img src="/projects/handwritten-digits/plots/logreg_confusion.png" alt="Logistic Regression confusion matrix">
    <figcaption style="color:var(--text-secondary); font-size:0.9rem; margin-top:0.25rem;">Logistic Regression — Acc ≈ 0.943</figcaption>
  </figure>
  <figure style="flex:1 1 320px; min-width:280px; margin:0;">
    <img src="/projects/handwritten-digits/plots/svm_confusion.png" alt="Linear SVM confusion matrix">
    <figcaption style="color:var(--text-secondary); font-size:0.9rem; margin-top:0.25rem;">Linear SVM — Acc ≈ 0.931</figcaption>
  </figure>
</div>

## Results Summary

- Logistic Regression (one-vs-rest) accuracy: ~0.943
- Support Vector Machine (linear kernel) accuracy: ~0.931
- SVD-based classifier (k=17, reconstruction error): ~0.966

Metrics shown are from the current run; small variation is expected across seeds/hyperparameters.

## Takeaways

- SVM yields the best accuracy on this USPS split.
- SVD offers compact, interpretable low-rank structure, trading accuracy for speed and dimensionality reduction.
- Regularization, scaling, and rank choice materially affect outcomes.
