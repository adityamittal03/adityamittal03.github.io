---
title: "Home"
description: "Aditya Mittal is a master's student in Computer Science at UC Irvine, researching robot learning and dexterous manipulation with Unnat Jain."
---

<div class="home-intro">
<div class="home-intro-copy">
<h1>Aditya Mittal</h1>
<p>I am a Master’s student in Computer Science at <strong>UC Irvine</strong>, working with <a href="https://unnat.github.io/">Unnat Jain</a> on <strong>robot learning and dexterous manipulation</strong>.</p>
<p>I earned my BS in Statistics with highest honors at <strong>UC Davis</strong> and completed my undergraduate thesis with <a href="https://faculty.engineering.ucdavis.edu/matloff/">Norman Matloff</a>. I received an Honorable Mention for the <em>CRA Outstanding Undergraduate Researcher</em> award (2025).</p>
<nav class="profile-links" aria-label="Contact and profiles">
    <a href="/aditya-mittal-cv.pdf">CV</a>
    <a href="mailto:mittalaa@uci.edu">Email</a>
    <a href="https://scholar.google.com/citations?hl=en&amp;user=uCLks14AAAAJ">Google Scholar</a>
    <a href="https://github.com/adityamittal03">GitHub</a>
    <a href="https://www.linkedin.com/in/aditya-mittal-ucdavis/">LinkedIn</a>
</nav>
</div>
<img class="avatar" src="/aditya-mittal-headshot.png" alt="Aditya Mittal" width="155" height="165">
</div>

## Papers

<article class="publication">
    <h3><a href="https://arxiv.org/abs/2609.24996">Learning Beyond What Humans Can Demonstrate</a></h3>
    <p class="publication-authors">Yuchen Song, <strong>Aditya Mittal</strong>, and Unnat Jain</p>
    <p class="publication-venue">Conference on Robot Learning (CoRL), 2026</p>
    <p class="publication-summary">GLIDE generates and refines executable guardrails for data collection and policy deployment on robot manipulation tasks that are difficult for humans to demonstrate.</p>
    <div class="publication-links">
        <a href="https://arxiv.org/abs/2609.24996">Paper</a>
        <a href="https://guardrail-policy.github.io/">Project</a>
    </div>
</article>

<article class="publication">
    <h3>The Surprising Effectiveness of Few-Step Adaptation for Robotic Manipulation</h3>
    <p class="publication-authors">Basavasagar Patil, <strong>Aditya Mittal</strong>, and Unnat Jain</p>
    <p class="publication-venue"><em>In submission.</em></p>
</article>

<article class="publication">
    <h3><a href="https://arxiv.org/abs/2411.08297">TowerDebias: A Novel Unfairness Removal Method Based on the Tower Property</a></h3>
    <p class="publication-authors"><strong>Aditya Mittal</strong> and Norman Matloff</p>
    <p class="publication-venue">arXiv preprint, 2024</p>
    <p class="publication-summary">A post-processing method that uses the tower property to improve the fairness of black-box predictions without retraining the model.</p>
    <div class="publication-links">
        <a href="https://arxiv.org/abs/2411.08297">Paper</a>
        <a href="https://github.com/matloff/towerDebias">Code</a>
    </div>
    <details class="publication-abstract">
        <summary>Abstract</summary>
        <p>Decision-making processes have increasingly come to rely on sophisticated machine learning tools, raising critical concerns about the fairness of their predictions with respect to sensitive groups. The widespread adoption of commercial "black-box" models necessitates careful consideration of their legal and ethical implications for consumers. When users interact with such black-box models, a key challenge arises: how can the influence of sensitive attributes, such as race or gender, be mitigated or removed from its predictions? We propose towerDebias (tDB), a novel post-processing method designed to reduce the influence of sensitive attributes in predictions made by black-box models. Our tDB approach leverages the Tower Property from probability theory to improve prediction fairness without requiring retraining of the original model. This method is highly versatile, as it requires no prior knowledge of the original algorithm's internal structure and is adaptable to a diverse range of applications. We present a formal fairness improvement theorem for tDB and showcase its effectiveness in both regression and classification tasks using multiple real-world datasets.</p>
    </details>
</article>

<article class="publication">
    <h3><a href="https://arxiv.org/abs/2411.04228">dsld: A Socially Relevant Tool for Teaching Statistics</a></h3>
    <p class="publication-authors"><strong>Aditya Mittal</strong>, Taha Abdullah, Arjun Ashok, Brandon Zarate Estrada, Shubhada Martha, Billy Ouattara, Jonathan Tran, and Norman Matloff</p>
    <p class="publication-venue">Technical report, 2024</p>
    <p class="publication-summary">R and Python tools for exploring discrimination and teaching statistical concepts through real-world fairness analysis.</p>
    <div class="publication-links">
        <a href="https://arxiv.org/abs/2411.04228">Paper</a>
        <a href="https://github.com/matloff/dsld">Code</a>
        <a href="https://htmlpreview.github.io/?https://github.com/matloff/dsldBook/blob/main/_book/index.html">Book</a>
    </div>
    <details class="publication-abstract">
        <summary>Abstract</summary>
        <p>The growing influence of data science in statistics education requires tools that make key concepts accessible through real-world applications. We introduce "Data Science Looks At Discrimination" (dsld), an R package that provides a comprehensive set of analytical and graphical methods for examining issues of discrimination involving attributes such as race, gender, and age. By positioning fairness analysis as a teaching tool, the package enables instructors to demonstrate confounder effects, model bias, and related topics through applied examples. An accompanying 80-page Quarto book guides students and legal professionals in understanding these principles and applying them to real data. We describe the implementation of the package functions and illustrate their use with examples. Python interfaces are also available.</p>
    </details>
</article>

## Talks & posters {#talks}

<details class="detail-entry">
    <summary><span>A Mathematical Approach to Algorithmic Fairness</span><span class="entry-date">December 2024</span></summary>
    <div class="detail-body">
        <p class="entry-meta">Poster · Directed Reading Program, UC Davis Department of Mathematics</p>
        <p>Presented mathematical foundations of algorithmic fairness and methods to reduce bias in model predictions across demographic groups.</p>
        <a href="/machine-learning-fairness-poster.pdf">Poster</a>
    </div>
</details>

<details class="detail-entry">
    <summary><span>Discrimination Analysis in a Box: an R Package</span><span class="entry-date">August 2024</span></summary>
    <div class="detail-body">
        <p class="entry-meta">Talk · Joint Statistical Meetings, Portland, Oregon</p>
        <p>Presented the dsld R package for discrimination analysis in education, emphasizing how it teaches statistical concepts through real-world fairness and bias examples.</p>
        <a href="/dsld-jsm-2024-slides.pdf">Slides</a>
    </div>
</details>

<details class="detail-entry">
    <summary><span>TowerDebias: A Novel Unfairness Removal Method Based on the Tower Property</span><span class="entry-date">April 2024</span></summary>
    <div class="detail-body">
        <p class="entry-meta">Talk · UC Davis Undergraduate Research Conference</p>
        <p>Presented TowerDebias, a post-processing method that improves the fairness of black-box predictions without retraining.</p>
        <a href="/towerdebias-ursca-2024-slides.pdf">Slides</a>
    </div>
</details>

<details class="detail-entry">
    <summary><span>Discrimination Analysis in a Box: a Machine Learning Package for Teaching</span><span class="entry-date">December 2023</span></summary>
    <div class="detail-body">
        <p class="entry-meta">Poster · UC Davis Scholarship of Teaching and Learning</p>
        <p>Presented the dsld package for discrimination analysis in education, showing how it supports teaching statistical concepts through real-world fairness examples.</p>
        <a href="/dsld-research-poster.pdf">Poster</a>
    </div>
</details>
