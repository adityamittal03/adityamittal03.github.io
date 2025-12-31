---
title: "Home"
description: "Master's student at UC Irvine focused on algorithmic fairness in machine learning."
---

# Aditya Mittal

<img class="avatar" src="/a2.png" alt="Aditya Mittal">

I am a Master's student in Computer Science at **UC Irvine**, working with [Unnat Jain](https://unnat.github.io) on efficient vision-language-action models.

I earned my BS in Statistics with highest honors at **UC Davis** and completed my undergraduate thesis with [Norman Matloff](https://faculty.engineering.ucdavis.edu/matloff/). This work received an Honorable Mention for the *CRA Outstanding Undergraduate Researcher* award (2025).

Contact details below:

<!--  -->
<!-- Social icons -->
<div class="social-icons">
    <a href="/Aditya_Mittal___Resume.pdf" class="social-icon" title="CV">
        {{< icon "cv" >}}
        <span class="email-tooltip">CV</span>
    </a>
    <a href="mailto:mittalaa@uci.edu" class="social-icon" title="Email" id="email-icon">
        {{< icon "email" >}}
        <span class="email-tooltip">mittalaa@uci.edu</span>
    </a>
    <a href="https://github.com/adityamittal03" class="social-icon" title="GitHub">
        {{< icon "github" >}}
        <span class="email-tooltip">GitHub</span>
    </a>
    <a href="https://www.linkedin.com/in/aditya-mittal-ucdavis/" class="social-icon" title="LinkedIn">
        {{< icon "linkedin" >}}
        <span class="email-tooltip">LinkedIn</span>
    </a>
    <a href="https://scholar.google.com/citations?hl=en&user=uCLks14AAAAJ" class="social-icon" title="Google Scholar">
        {{< icon "google scholar" >}}
        <span class="email-tooltip">Google Scholar</span>
    </a>
</div>

<!-- <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
    <h2>Papers & Talks</h2>
    <div style="width: 1px; height: 24px; background-color: var(--border-color);"></div>
</div> -->

##  Papers
<!--     2021-2025     -->
<!-- undergrad papers  -->
<div class="paper-item">
    <div class="paper-title">
        <button class="paper-toggle" data-paper="1">+</button>
        <h3 class="paper-title-text">TowerDebias: A Novel Unfairness Removal Method Based on the Tower Property</h3>  <a href="https://arxiv.org/abs/2411.08297" class="social-icon" title="TowerDebias paper">
        {{< icon "cv" >}}
    </a> 
    </div>
    <div class="paper-content" id="paper-content-1">
        <a href="https://arxiv.org/abs/2411.08297">arXiv</a> | <a href="https://doi.org/10.48550/arXiv.2411.08297">DOI</a>
        <br><br>
        <strong>A. Mittal</strong> and N. Matloff (2025). "TowerDebias: A Novel Unfairness Removal Method Based on the Tower Property." <a href="https://doi.org/10.48550/arXiv.2411.08297">arXiv:2411.08297</a>
        <br> 
    <em>Status: Under review.</em>
    <!--  -->
    <h3> Abstract </h3>
    Decision-making processes have increasingly come to rely on sophisticated machine learning tools, raising critical concerns about the fairness of their predictions with respect to sensitive groups. The widespread adoption of commercial "black-box" models necessitates careful consideration of their legal and ethical implications for consumers. When users interact with such black-box models, a key challenge arises: how can the influence of sensitive attributes, such as race or gender, be mitigated or removed from its predictions? We propose towerDebias (tDB), a novel post-processing method designed to reduce the influence of sensitive attributes in predictions made by black-box models. Our tDB approach leverages the Tower Property from probability theory to improve prediction fairness without requiring retraining of the original model. This method is highly versatile, as it requires no prior knowledge of the original algorithm's internal structure and is adaptable to a diverse range of applications. We present a formal fairness improvement theorem for tDB and showcase its effectiveness in both regression and classification tasks using multiple real-world datasets.
    <!--  -->
    <h3> Code </h3>
    Github Repository: <a href="https://github.com/matloff/towerDebias" class="social-icon" title="GitHub Repository" target="_blank">
        {{< icon "github" >}}
    </a>
    </div>
</div> 

<!--  -->
<div class="paper-item">
    <div class="paper-title">
        <button class="paper-toggle" data-paper="2">+</button>
        <h3 class="paper-title-text">dsld: A Socially Relevant Tool for Teaching Statistics</h3> <a href="https://arxiv.org/abs/2411.04228" class="social-icon" title="DSLD">
        {{< icon "cv" >}}
    </a>
    </div>
    <div class="paper-content" id="paper-content-2">
        <a href="https://arxiv.org/abs/2411.04228">arXiv</a> | <a href="https://doi.org/10.48550/arXiv.2411.04228">DOI</a>
        <br><br>
        <strong>A. Mittal</strong>, T. Abdullah, A. Ashok, B. Zarate Estrada, S. Martha, B. Ouattara, J. Tran, and N. Matloff (2025) "dsld: A Socially Relevant Tool for Teaching Statistics." <a href="https://doi.org/10.48550/arXiv.2411.04228">arXiv:2411.04228</a>
        <br> 
        <em>Status: Under Review.</em>
        <!--  -->
        <h3> Abstract </h3>
        The growing influence of data science in statistics education requires tools that make key concepts accessible through real-world applications. We introduce "Data Science Looks At Discrimination" (dsld), an R package that provides a comprehensive set of analytical and graphical methods for examining issues of discrimination involving attributes such as race, gender, and age. By positioning fairness analysis as a teaching tool, the package enables instructors to demonstrate confounder effects, model bias, and related topics through applied examples. An accompanying 80-page Quarto book guides students and legal professionals in understanding these principles and applying them to real data. We describe the implementation of the package functions and illustrate their use with examples. Python interfaces are also available.
        <!--  -->
        <h3> Code </h3>
        Github Repository: <a href="https://github.com/matloff/dsld" class="social-icon" title="GitHub Repository" target="_blank">
            {{< icon "github" >}}
        </a>
        <br>
        Quarto Book: <a href="https://htmlpreview.github.io/?https://github.com/matloff/dsldBook/blob/main/_book/index.html" class="social-icon" title="Quarto Book" target="_blank">
            {{< icon "cv" >}}
        </a>
    </div>
</div> 


##  Talks
<!--     2021-2025     -->
<!-- undergraduate talks  -->
<!--  -->
<div class="paper-item">
    <div class="paper-title">
        <button class="paper-toggle" data-paper="talk-2">+</button>
        <h3 class="paper-title-text">A Mathematical Approach to Algorithmic Fairness <span style="float: right; font-size: 0.8em; color: var(--accent-color);">December 2024</span></h3>
    </div>
    <div class="paper-content" id="paper-content-talk-2">
        <strong>Conference:</strong> Directed Reading Program - UC Davis Department of Mathematics
        <br>
        <strong>Session:</strong> Poster Session
        <br>
        <strong>Location:</strong> Davis, California, USA
        <br>
        <strong>Date:</strong> December 2024
        <br>
        <h3> Description </h3>
        Presented mathematical foundations of algorithmic fairness and methods to reduce bias in model predictions across demographic groups.
        <br>
        <h3> Materials </h3>
        Poster: <a href="/machine_learning_fairness_poster.pdf" class="social-icon" title="Poster" target="_blank">
            {{< icon "cv" >}}
        </a>
    </div>
</div>

<div class="paper-item">
    <div class="paper-title">
        <button class="paper-toggle" data-paper="talk-1">+</button>
        <h3 class="paper-title-text">Discrimination Analysis in a Box: an R Package <span style="float: right; font-size: 0.8em; color: var(--accent-color);">August 2024</span></h3> 
    </div>
    <div class="paper-content" id="paper-content-talk-1">
        <strong>Conference:</strong> Joint Statistical Meetings (JSM) - 2024
        <br>
        <strong>Session:</strong> Rethinking Statistics and Data Science Education: Incorporating Changing Technology and Encouraging Critical Thinking
        <br>
        <strong>Location:</strong> Portland, Oregon, USA
        <br>
        <strong>Date:</strong> August 2024
        <br>
        <h3> Description </h3>
        Presented the dsld R package for discrimination analysis in education, emphasizing how it teaches statistical concepts through real-world fairness and bias examples.
        <br>
        <h3> Materials </h3>
        Slides: <a href="/dsld_slides.pdf" class="social-icon" title="Presentation Slides" target="_blank">
            {{< icon "cv" >}}
        <!-- </a>
        <br>
        Abstract: <a href="#" class="social-icon" title="Conference Abstract" target="_blank">
            {{< icon "cv" >}} -->
        </a>
    </div>
</div> 

<!--  -->
<div class="paper-item">
    <div class="paper-title">
        <button class="paper-toggle" data-paper="talk-3">+</button>
        <h3 class="paper-title-text">TowerDebias: Eliminating the Effect of Sensitive Variables from Black-Box Machine Learning Models <span style="float: right; font-size: 0.8em; color: var(--accent-color);">April 2024</span></h3>
    </div>
    <div class="paper-content" id="paper-content-talk-3">
        <strong>Conference:</strong> Undergraduate Research, Scholarship, and Creative Activities (URSCA) Conference
        <br>
        <strong>Session:</strong> Oral Session
        <br>
        <strong>Location:</strong> Davis, California, USA
        <br>
        <strong>Date:</strong> April 26-27, 2024
        <br>
        <h3> Description </h3>
        Presented TowerDebias, a post-processing method that removes sensitive-variable effects from black-box models and improves fairness without retraining.
        <br>
        <h3> Materials </h3>
        Slides: <a href="/tdb_slides.pdf" class="social-icon" title="Presentation Slides" target="_blank">
            {{< icon "cv" >}}
        </a>
    </div>
</div>

<!--  -->
<div class="paper-item">
    <div class="paper-title">
        <button class="paper-toggle" data-paper="talk-4">+</button>
        <h3 class="paper-title-text">Discrimination Analysis in a Box: a Machine Learning Package for Teaching <span style="float: right; font-size: 0.8em; color: var(--accent-color);">December 2023</span></h3>
    </div>
    <div class="paper-content" id="paper-content-talk-4">
        <strong>Conference:</strong> UC Davis Scholarship of Teaching and Learning
        <br>
        <strong>Session:</strong> Poster Session
        <br>
        <strong>Location:</strong> Davis, California, USA
        <br>
        <strong>Date:</strong> December 1, 2023
        <br>
        <h3> Description </h3>
        Presented the dsld package for discrimination analysis in education, showing how it supports teaching statistical concepts through real-world fairness examples.
        <br>
        <h3> Materials </h3>
        Poster: <a href="/DSLD_Research_Poster.pdf" class="social-icon" title="Poster" target="_blank">
            {{< icon "cv" >}}
        </a>
    </div>
</div>
