---
title: "Spotify Popularity Inference"
slug: "spotify-popularity"
description: "Modeling Spotify track popularity from audio features with R; analysis notebook and report included."
date: 2025-09-02
draft: false
tags: [machine-learning, regression, r, eda]
---

### Overview

Predicting Spotify track popularity from various audio features (danceability, energy, etc.).

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="sp-goals">+</button>
    <h3 class="paper-title-text">Goals</h3>
  </div>
  <div class="paper-content" id="paper-content-sp-goals">
    <ul>
      <li>Explore relationships between audio features and popularity.</li>
      <li>Build predictive models and assess performance.</li>
      <li>Document insights and caveats (e.g., confounding, platform effects).</li>
    </ul>
  </div>
  </div>



### Dataset

13k+ tracks with popularity scores and acoustic features. Source: [Kaggle — Song Popularity Dataset](https://www.kaggle.com/datasets/yasserh/song-popularity-dataset).

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="dataset-1">+</button>
    <h3 class="paper-title-text">Dataset Features Info</h3>
  </div>
  <div class="paper-content" id="paper-content-dataset-1">
    <ul>
      <li>Name: Track title (excluded).</li>
      <li>Popularity: Integer score from 0 to 100.</li>
      <li>Acousticness: Confidence (0.0–1.0) that the track is acoustic.</li>
      <li>Danceability: Suitability for dancing (rhythm stability and beat strength).</li>
      <li>Duration (ms): Track duration in milliseconds.</li>
      <li>Energy: Proxy for intensity and activity (0.0–1.0).</li>
      <li>Instrumentalness: Likelihood the track contains no vocals (0.0–1.0).</li>
      <li>Key: Estimated pitch class (0=C, …, 11=B).</li>
      <li>Liveness: Probability the track was performed live (0.0–1.0).</li>
      <li>Loudness (dB): Overall loudness in decibels.</li>
      <li>Mode: Musical modality (1=major, 0=minor).</li>
      <li>Speechiness: Presence of spoken words (0.0–1.0).</li>
      <li>Tempo (BPM): Estimated beats per minute.</li>
      <li>Time signature: Estimated time signature.</li>
      <li>Valence: Musical positiveness (0.0–1.0).</li>
    </ul>
  </div>
</div>

### Methods

We are conducting supervised statistical learning to see which factors most impact song popularity, our response variable Y. Expand any step below for notes and details.

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="sp-method-1">+</button>
    <h3 class="paper-title-text">Data Cleanup</h3>
  </div>
  <div class="paper-content" id="paper-content-sp-method-1">
    <ul>
      <li>Drop <code>song_name</code> (non‑predictive identifier).</li>
      <li>Encode <code>audio_mode</code> as binary (1 = major, 0 = minor); keep the other 12 covariates continuous.</li>
      <li>No missing values detected.</li>
      <li>Scale <code>song_popularity</code> from 0–100 to 0–1 by dividing by 100 (retains percentage interpretability).</li>
      <li>Since the response is bounded, prepare for a GLM; prefer beta regression over plain OLS.</li>
    </ul>

<p><strong>Dataset head (first 5 rows)</strong></p>

| song_popularity | song_duration_ms | acousticness | danceability | energy | instrumentalness | key | liveness | loudness | audio_mode | speechiness | tempo   | time_signature | audio_valence |
| ---:            | ---:             | ---:         | ---:         | ---:   | ---:             | ---:| ---:     | ---:     | ---:       | ---:        | ---:    | ---:           | ---:          |
| 0.73            | 262333           | 0.005520     | 0.496        | 0.682  | 2.94e-05         | 8   | 0.0589   | -4.095   | 1          | 0.0294      | 167.060 | 4              | 0.474         |
| 0.66            | 216933           | 0.010300     | 0.542        | 0.853  | 0.00e+00         | 3   | 0.1080   | -6.407   | 0          | 0.0498      | 105.256 | 4              | 0.370         |
| 0.76            | 231733           | 0.008170     | 0.737        | 0.463  | 4.47e-01         | 0   | 0.2550   | -7.828   | 1          | 0.0792      | 123.881 | 4              | 0.324         |
| 0.74            | 216933           | 0.026400     | 0.451        | 0.970  | 3.55e-03         | 0   | 0.1020   | -4.938   | 1          | 0.1070      | 122.444 | 4              | 0.198         |
| 0.56            | 223826           | 0.000954     | 0.447        | 0.766  | 0.00e+00         | 10  | 0.1130   | -5.065   | 1          | 0.0313      | 172.011 | 4              | 0.574         |
  </div>
</div>

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="sp-method-2">+</button>
    <h3 class="paper-title-text">Data Visualization</h3>
  </div>
  <div class="paper-content" id="paper-content-sp-method-2">
    <ul>
      <li>Inspect distributions of popularity and key audio features.</li>
      <li>Correlation heatmap and pairwise plots to gauge linear associations.</li>
      <li>Initial residual diagnostics to check variance and functional form.</li>
    </ul>

<p><strong>Summary statistics</strong></p>

| Feature            |   Min   |    Q1    |  Median  |  Mean   |    Q3    |   Max   |
| ------------------ | ------: | -------: | -------: | ------: | -------: | ------: |
| song_popularity    | 0.0000  | 0.3700   | 0.5200   | 0.4875  | 0.6325   | 1.0000  |
| song_duration_ms   | 12000   | 183937   | 211840   | 218949  | 244722   | 1799346 |
| acousticness       | 0.000001| 0.023600 | 0.139000 | 0.270472| 0.458250 | 0.996000|
| danceability       | 0.0000  | 0.5240   | 0.6360   | 0.6246  | 0.7400   | 0.9870  |
| energy             | 0.00107 | 0.49600  | 0.67200  | 0.63973 | 0.81800  | 0.99900 |
| instrumentalness   | 0.000000| 0.000000 | 0.000021 | 0.092079| 0.005112 | 0.997000|
| key                | 0.000   | 2.000    | 5.000    | 5.302   | 8.000    | 11.000  |
| liveness           | 0.0109  | 0.0930   | 0.1220   | 0.1804  | 0.2240   | 0.9860  |
| loudness (dB)      | -38.768 | -9.390   | -6.751   | -7.678  | -4.991   | 1.585   |
| speechiness        | 0.0000  | 0.0372   | 0.0541   | 0.0994  | 0.1130   | 0.9410  |
| tempo (BPM)        | 0.00    | 98.12    | 120.02   | 121.10  | 139.94   | 242.32  |
| time_signature     | 0.000   | 4.000    | 4.000    | 3.953   | 4.000    | 5.000   |
| audio_valence      | 0.000   | 0.332    | 0.527    | 0.527   | 0.728    | 0.984   |

<p style="margin:0.25rem 0 0; color: var(--text-secondary);">
  audio_mode (binary) counts: 0 = 5,493; 1 = 9,431.
  Statistics above omit audio_mode since it’s categorical.
</p>

<br>

| Scatterplot | Correlation Matrix |
| --- | --- |
| ![Feature vs Popularity Scatterplots](/projects/spotify-popularity/plots/scatterplot_data.png) | ![Correlation Matrix](/projects/spotify-popularity/plots/corr_matrix.png) |
  </div>
</div>

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="sp-method-3">+</button>
    <h3 class="paper-title-text">Fitting Linear Regression</h3>
  </div>
  <div class="paper-content" id="paper-content-sp-method-3">
    <ul>
      <li>Baseline OLS; compare with a logit transform of popularity.</li>
      <li>Check multicollinearity (e.g., VIF) and remove/retain predictors accordingly.</li>
      <li>Use cross‑validation to assess out‑of‑sample error.</li>
    </ul>

<div class="r-output">
<pre>
Call:
lm(formula = song_popularity ~ ., data = song.data)

Residuals:
     Min       1Q   Median       3Q      Max 
-0.57788 -0.11272  0.03017  0.14619  0.49295 

Coefficients:
                   Estimate Std. Error t value Pr(>|t|)    
(Intercept)       5.691e-01  2.791e-02  20.391  &lt; 2e-16 ***
song_duration_ms -2.630e-08  2.706e-08  -0.972 0.331038    
acousticness     -2.954e-02  7.903e-03  -3.738 0.000186 ***
danceability      6.503e-02  1.246e-02   5.218 1.83e-07 ***
energy           -9.077e-02  1.464e-02  -6.199 5.83e-10 ***
instrumentalness -7.128e-02  7.711e-03  -9.244  &lt; 2e-16 ***
key               1.426e-05  4.667e-04   0.031 0.975621    
liveness         -4.122e-02  1.169e-02  -3.525 0.000424 ***
loudness          4.162e-03  7.133e-04   5.835 5.50e-09 ***
audio_mode1       5.656e-03  3.520e-03   1.607 0.108093    
speechiness      -3.301e-02  1.667e-02  -1.981 0.047619 *  
tempo            -1.493e-04  5.879e-05  -2.540 0.011095 *  
time_signature    1.107e-02  5.320e-03   2.080 0.037561 *  
audio_valence    -5.777e-02  7.917e-03  -7.297 3.09e-13 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1

Residual standard error: 0.2015 on 14910 degrees of freedom
Multiple R-squared:  0.02341,   Adjusted R-squared:  0.02255 
F-statistic: 27.49 on 13 and 14910 DF,  p-value: &lt; 2.2e-16
</pre>
</div>

<br>

| Residuals vs. Fitted | Density Contours |
| --- | --- |
| ![Residuals vs Fitted](/projects/spotify-popularity/plots/residuals_data.png) | ![Density Contours](/projects/spotify-popularity/plots/density_contour_linear.png) |

<br>

<div class="r-output">
<pre>
studentized Breusch-Pagan test
data:  full_model
BP = 102.81, df = 13, p-value = 4.719e-16
</pre>
</div>

<br>

| Feature           |    VIF    |
| ----------------- | --------: |
| song_duration_ms  | 1.045922  |
| acousticness      | 2.040434  |
| danceability      | 1.425841  |
| energy            | 3.875072  |
| instrumentalness  | 1.263800  |
| key               | 1.033466  |
| liveness          | 1.057927  |
| loudness          | 3.020238  |
| audio_mode        | 1.059304  |
| speechiness       | 1.094461  |
| tempo             | 1.071715  |
| time_signature    | 1.043724  |
| audio_valence     | 1.414254  |

<br>

| Residuals (Transformed) | Density (Transformed) |
| --- | --- |
| ![Residuals (Transformed)](/projects/spotify-popularity/plots/residuals_transford.png) | ![Density (Transformed)](/projects/spotify-popularity/plots/density_transformed.png) |

<br>

<div class="r-output">
<pre>
studentized Breusch-Pagan test
data:  transformed.model
BP = 59.472, df = 13, p-value = 6.528e-08
</pre>
</div>
  </div>
</div>

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="sp-method-4">+</button>
    <h3 class="paper-title-text">Fitting Beta Regression</h3>
  </div>
  <div class="paper-content" id="paper-content-sp-method-4">
    <ul>
      <li>Model popularity (scaled to 0–1) with beta regression.</li>
      <li>Compare full vs. reduced specifications for interpretability.</li>
      <li>Report pseudo R² and cross‑validated performance alongside OLS baselines.</li>
    </ul>
    <br>
    <div class="r-output">
<pre>
Call:
betareg(formula = song_popularity ~ ., data = song.data)

Quantile residuals:
    Min      1Q  Median      3Q     Max 
-5.4128 -0.2457  0.2438  0.6481  5.3982 

Coefficients (mean model with logit link):
                   Estimate Std. Error z value Pr(>|z|)    
(Intercept)       1.232e-01  1.315e-01   0.937 0.348767    
song_duration_ms -4.375e-07  1.279e-07  -3.421 0.000623 ***
acousticness     -2.355e-02  3.717e-02  -0.633 0.526416    
danceability      3.138e-01  5.864e-02   5.350 8.78e-08 ***
energy           -3.089e-01  6.889e-02  -4.484 7.32e-06 ***
instrumentalness -3.617e-01  3.645e-02  -9.922  &lt; 2e-16 ***
key              -2.578e-03  2.195e-03  -1.174 0.240254    
liveness         -1.158e-01  5.505e-02  -2.103 0.035452 *  
loudness          1.069e-02  3.360e-03   3.182 0.001462 ** 
audio_mode1       2.148e-02  1.656e-02   1.297 0.194543    
speechiness      -2.918e-01  7.848e-02  -3.718 0.000201 ***
tempo            -7.231e-04  2.767e-04  -2.614 0.008959 ** 
time_signature    4.393e-02  2.508e-02   1.752 0.079855 .  
audio_valence    -2.306e-01  3.725e-02  -6.190 6.03e-10 ***

Phi coefficients (precision model with identity link):
      Estimate Std. Error z value Pr(>|z|)    
(phi)  3.28336    0.03366   97.54   &lt;2e-16 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1 

Type of estimator: ML (maximum likelihood)
Log-likelihood:  1246 on 15 Df
Pseudo R-squared: 0.01217
Number of iterations: 30 (BFGS) + 2 (Fisher scoring) 
</pre>
    </div>

  <br>

  <div class="r-output">
<pre>
Likelihood ratio test

Model 1: song_popularity ~ . - acousticness - key - audio_mode - time_signature - 
    liveness
Model 2: song_popularity ~ .
  #Df LogLik Df  Chisq Pr(>Chisq)  
1  10 1240.5                       
2  15 1246.4  5 11.827    0.03724 *
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
</pre>
    </div>
    
  <br>

<div class="r-output">
<pre>
Call:
betareg(formula = song_popularity ~ . - acousticness - key - audio_mode - 
    time_signature - liveness, data = song.data)

Quantile residuals:
    Min      1Q  Median      3Q     Max 
-5.3549 -0.2479  0.2450  0.6510  5.4122 

Coefficients (mean model with logit link):
                   Estimate Std. Error z value Pr(>|z|)    
(Intercept)       2.424e-01  8.201e-02   2.956 0.003120 ** 
song_duration_ms -4.397e-07  1.275e-07  -3.449 0.000562 ***
danceability      3.425e-01  5.623e-02   6.091 1.12e-09 ***
energy           -2.942e-01  5.948e-02  -4.946 7.58e-07 ***
instrumentalness -3.653e-01  3.638e-02 -10.041  &lt; 2e-16 ***
loudness          1.062e-02  3.355e-03   3.166 0.001547 ** 
speechiness      -3.199e-01  7.770e-02  -4.118 3.82e-05 ***
tempo            -6.811e-04  2.759e-04  -2.468 0.013569 *  
audio_valence    -2.348e-01  3.650e-02  -6.434 1.24e-10 ***

Phi coefficients (precision model with identity link):
      Estimate Std. Error z value Pr(>|z|)    
(phi)  3.28074    0.03363   97.55   &lt;2e-16 ***
---
Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1 

Type of estimator: ML (maximum likelihood)
Log-likelihood:  1241 on 10 Df
Pseudo R-squared: 0.01167
Number of iterations: 24 (BFGS) + 3 (Fisher scoring)
</pre>
    </div>
   <br>
| Feature           |   VIF    |
| ----------------- | -------: |
| song_duration_ms  | 1.039005 |
| danceability      | 1.309506 |
| energy            | 2.885457 |
| instrumentalness  | 1.257748 |
| loudness          | 3.004867 |
| speechiness       | 1.072703 |
| tempo             | 1.065073 |
| audio_valence     | 1.357336 |

  <br>

  <div class="r-output">
<pre>
"MSE of Full Model: 0.0418216517896375"
"MSE of Reduced Model: 0.0418503691186738"
</pre>
  </div>
  </div>
</div>


### Results

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="drake-results">+</button>
    <h3 class="paper-title-text">Results</h3>
  </div>
  <div class="paper-content" id="paper-content-drake-results">
    <!-- Results content to be added -->
  </div>
</div>


## Drake Career Analysis

### Overview

Story-driven exploration of a decade-plus career: releases, collaborations, and evolving audio profiles. Minimal, skimmable summary below; see materials for the full narrative with visuals.

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="drake-goals">+</button>
    <h3 class="paper-title-text">Goals</h3>
  </div>
  <div class="paper-content" id="paper-content-drake-goals">
    <ul>
      <li>Curate key milestones and summarize quantitative trends.</li>
      <li>Present findings in a digestible, self-contained report and notebook.</li>
    </ul>
  </div>
</div>

### Methods

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="drake-1">+</button>
    <h3 class="paper-title-text">Part One: Motivations</h3>
  </div>
  <div class="paper-content" id="paper-content-drake-1">
    <!-- Add notes/content for motivations -->
  </div>
  </div>

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="drake-2">+</button>
    <h3 class="paper-title-text">Part Two: Visualization of Drake's popularity over the past decade</h3>
  </div>
  <div class="paper-content" id="paper-content-drake-2">
    <!-- Interactive choropleth embed (swap src to specific plot HTML if available) -->
    <iframe
      class="embed-frame"
      src="/projects/drake-career-analysis/html/choropleth.html"
      title="Interactive Choropleth"
      loading="lazy"
    ></iframe>
    <p style="margin:0.25rem 0 0;">
      <a href="/projects/drake-career-analysis/html/choropleth.html" target="_blank" rel="noopener">Open full screen</a>
    </p>
  <br>

  ![Global debut streams — selected albums](/projects/drake-career-analysis/plots/global_streams.png)

  ![Frequency of Top Songs](/projects/drake-career-analysis/plots/frequency_top_songs.png)

  ![Song Popularity Distribution](/projects/drake-career-analysis/plots/song_popularity_dist.png)
  </div>
  </div>

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="drake-3">+</button>
    <h3 class="paper-title-text">Part Three: Clustering Drake's music by song attributes</h3>
  </div>
  <div class="paper-content" id="paper-content-drake-3">
    <ul>
      <li>k-means on standardized audio features (k = 4) to identify style groups.</li>
      <li>Elbow/Knee methods to choose k; inspect cluster profiles (danceability, energy, valence).</li>
      <li>Compare cluster distribution across eras and top-streamed tracks.</li>
    </ul>
  </div>
</div>

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="drake-4">+</button>
    <h3 class="paper-title-text">Part Four: Old vs. new Drake preferences</h3>
  </div>
  <div class="paper-content" id="paper-content-drake-4">
    <!-- Old vs new preferences visuals -->
    
  | Term Frequency | Word Cloud |
  | --- | --- |
  | ![Career Words](/projects/drake-career-analysis/plots/career_words.png) | ![Career Word Cloud](/projects/drake-career-analysis/plots/career_word_cloud.png) |

  <br>

  | Album Term Frequency | Album Word Cloud |
  | --- | --- |
  | ![Album Words](/projects/drake-career-analysis/plots/album_words.png) | ![Album Word Cloud](/projects/drake-career-analysis/plots/album_word_cloud.png) |
  </div>
  </div>

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="drake-5">+</button>
    <h3 class="paper-title-text">Part Five: Sentiment analysis on rising popularity</h3>
  </div>
  <div class="paper-content" id="paper-content-drake-5">
    <!-- Add sentiment analysis summary and links -->

  | Word Cloud (Positive) | Word Cloud (Negative) |
  | --- | --- |
  | ![Positive Word Cloud](/projects/drake-career-analysis/plots/word_cloud_g.png) | ![Negative Word Cloud](/projects/drake-career-analysis/plots/word_cloud_b.png) |

  <br>

  ![Sentiment Scores (YouTube/Reddit)](/projects/drake-career-analysis/plots/sentiment.png)
  </div>
  </div>

### Results

<div class="paper-item">
  <div class="paper-title">
    <button class="paper-toggle" data-paper="drake-results">+</button>
    <h3 class="paper-title-text">Results</h3>
  </div>
  <div class="paper-content" id="paper-content-drake-results">
    <!-- Results content to be added -->
    Highlights notable phases in the discography and shifting audio profiles; discusses limitations and data caveats.
  </div>
</div>



Note: Course projects for (STA 141A - Spotify track popularity inference; STA 141B - Drake Music Career Analysis.)
