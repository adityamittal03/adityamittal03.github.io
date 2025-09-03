---
title: "Home"
description: "I am a Masters student at UC Irvine, and my research interests are in machine learning fairness."
---

# Aditya Mittal

<img class="avatar" src="/a2.png" alt="Aditya Mittal">

I am currently a Masters student in Computer Science at **UC Irvine**, and my research interests are in algorithmic fairness in machine learning. I am also open to exploring new research directions!

I completed my undergraduate degree in Statistics at **UC Davis**, where I was advised by 
[Norman Matloff](https://faculty.engineering.ucdavis.edu/matloff/) for my senior thesis. My work received an 
Honorable Mention for the *CRA Outstanding Undergraduate Researcher* award (2025).

Contact details attached below:

<!--  -->
<!-- Social icons -->
<div class="social-icons">
    <a href="/Mittal_Aditya_Resume.pdf" class="social-icon" title="CV">
        {{< icon "cv" >}}
        <span class="email-tooltip">CV</span>
    </a>
    <a href="mailto:mittalaal@uci.edu" class="social-icon" title="Email" id="email-icon">
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
        <em>Status: To be submitted.</em>
        <!--  -->
        <h3> Abstract </h3>
        The growing influence of data science in decision-making requires rigorous quantitative methods to understand and address social discrimination. We introduce "Data Science Looks At Discrimination" (dsld), an R package that provides a comprehensive set of statistical and graphical tools for analyzing potential discrimination involving sensitive attributes such as race, gender, and age. The package addresses several key fairness challenges, including confounder analysis and bias reduction against protected groups in predictive models. Python interfaces are also available.
        <br><br>
        In educational settings, dsld offers instructors powerful methods to teach key statistical concepts through motivating practical examples of discrimination analysis. The inclusion of an 80-page Quarto book further supports users, ranging from statistics educators to legal professionals, in effectively applying these methods on real-world applications. We show the implementation details of the package functions and illustrate their use with several examples.
        <!--  -->
        <h3> Code </h3>
        Github Repository: <a href="https://github.com/matloff/dsld" class="social-icon" title="GitHub Repository" target="_blank">
            {{< icon "github" >}}
        </a>
        <br>
        Quarto Book: <a href="#" class="social-icon" title="Quarto Book" target="https://htmlpreview.github.io/?https://github.com/matloff/dsldBook/blob/main/_book/index.html">
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
        Presented mathematical foundations of algorithmic fairness, exploring theoretical approaches to ensure machine learning models make unbiased predictions across different demographic groups.
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
        Presented our work on the dsld R package for discrimination analysis in educational settings. The talk focused on how the package can be used to teach statistical concepts through real-world examples of fairness and bias analysis.
        <br>
        <h3> Materials </h3>
        Slides: <a href="#" class="social-icon" title="Presentation Slides" target="_blank">
            {{< icon "cv" >}}
        </a>
        <br>
        Abstract: <a href="#" class="social-icon" title="Conference Abstract" target="_blank">
            {{< icon "cv" >}}
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
        Presented our novel TowerDebias method for removing sensitive variable effects from black-box machine learning models, demonstrating its effectiveness in improving fairness without model retraining.
        <br>
        <h3> Materials </h3>
        Slides: <a href="#" class="social-icon" title="Presentation Slides" target="_blank">
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
        Presented our dsld package for discrimination analysis in educational settings, showcasing how it can be used to teach statistical concepts through real-world fairness examples.
        <br>
        <h3> Materials </h3>
        Poster: <a href="/DSLD_Research_Poster.pdf" class="social-icon" title="Poster" target="_blank">
            {{< icon "cv" >}}
        </a>
    </div>
</div>

