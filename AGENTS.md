# Website maintenance

## Scope and working style

This is Aditya Mittal’s personal research website, published at
https://adityamittal03.github.io/ from the `main` branch. Read this guide before
editing. The README is intentionally casual: the site link and source credits.
Keep implementation details here. Respect the parent workspace instructions when
using its research materials or approved PDFs.

The user wants quick, concrete edits and sensible file organization. Do not turn a
wording change into a redesign or an exhaustive testing exercise. Make the requested
change, run checks proportionate to it, and finish. When a push is requested or
already authorized for the active work, commit and push without another confirmation.
Never send messages or submit applications as part of website maintenance.

## Current content decisions

- Introduction: Master’s student in Computer Science at UC Irvine, working with
  Unnat Jain on **robot learning and dexterous manipulation**.
- Homepage papers, in order: Learning Beyond What Humans Can Demonstrate; The
  Surprising Effectiveness of Few-Step Adaptation for Robotic Manipulation;
  TowerDebias; dsld.
- GLIDE: Yuchen Song, Aditya Mittal, Unnat Jain; CoRL 2026. Use the current title
  “Learning Beyond What Humans Can Demonstrate,” arXiv 2609.24996, and
  https://guardrail-policy.github.io/. Do not restore anonymous-review placeholders.
- Few-step adaptation: Basavasagar Patil, Aditya Mittal, Unnat Jain. Keep italicized
  “In submission.” No public link, venue, year, or extra results have been supplied.
- TowerDebias: Aditya Mittal first, then Norman Matloff. The user explicitly chose
  the website label **“Undergraduate thesis, 2024”**, retaining the paper/code links.
- dsld: retain the full eight-author list and the website label
  **“Technical report, 2024.”** Do not change these two labels to “arXiv preprint.”
- Keep papers’ authors, status, and links visible; optional abstracts use native
  `<details>`. Talks and web-CV entries also use native disclosures.
- Header links: **Papers** and **Blog** only. Keep CV with the colored profile links
  below the introduction. Do not add a header CV link or a “From the lab” section.
- Dark mode is the default: black background and red accents. Light mode has the
  existing warm background and green accents. Preserve the `theme` localStorage
  key and respect an explicitly saved light-mode preference.

## Files and ownership

- `content/_index.md`: homepage biography, publications, talks, and profile links.
- `content/cv.md`: web CV. Its explicit `/experience/` URL preserves existing links.
- `content/blog/`: blog landing page and posts. The CRAFT post is
  `recreating-craft-hand.md`; keep its media references and captions synchronized.
- `assets/js/theme.js`: preference restoration before paint and theme toggle.
- `assets/js/main.js`: CRAFT video tabs, playback rates, viewport autoplay.
- `assets/scss/styles.scss`: stylesheet entry point. Imports `_tokens`, `_base`,
  `_blog-cards`, `_research`, and `_craft` in cascade order.
- `_tokens.scss`: shared color variables; `_research.scss`: homepage, publication,
  navigation, and CV layouts; `_craft.scss`: CRAFT image and video grids.
- `layouts/_default/baseof.html`: shared document shell and default dark theme.
- `layouts/_default/list.html`, `single.html`, and `_markup/render-image.html`:
  list pages, content pages, and Markdown images. All pages need one main heading.
- `layouts/index.html`, `404.html`, `index.xml`, `robots.txt`: homepage, error page,
  RSS feed, and crawler rules. The sitemap URL must use this site’s base URL.
- `layouts/partials/`: head, header, footer, metadata, and icons.
- `layouts/shortcodes/icon.html`: the icon shortcode used by the web CV.
- `hugo.toml`: production URL, site metadata, navigation, and markup settings.
- `config/development/hugo.toml`: localhost preview URL, port 1315.
- `.github/workflows/hugo.yml`: pinned Hugo build and GitHub Pages deployment.
- `licenses/maverick.txt`: original MIT notice for adapted theme code. Keep the
  attribution. The unused vendor theme, demos, and duplicate templates were removed;
  the site is now self-contained and does not require a theme checkout.

## Public files versus local working material

Everything in `static/` is published. Keep only intentional public assets there.
Source, maintenance documentation, and licenses are tracked but are not web pages.
GitHub Actions builds a clean checkout, so ignored local files must never be required.

- Keep existing root-level public PDFs and identity images at their stable URLs.
  The older resume endpoint is retained for existing external links; the homepage
  links to the current two-page `aditya-mittal-cv.pdf`.
- `static/blog/craft-hand/` holds active images; all post videos belong in `videos/`.
- `static/visualizations/` holds the two standalone robot viewers. Preserve these
  working endpoints even when they are not embedded in the current blog post.
- `static/models/yam-ultra-gripper/assets/` is the single shared set of YAM arm
  meshes used by both viewers. The CRAFT hand and adapter meshes live under
  `static/models/yam-ultra-craft-hand/`. Do not reintroduce duplicate arm meshes.
- Viewer JavaScript explicitly names model files. Keep upstream mesh names intact
  unless every reference is updated; our adapter exports use `mount-part-1.stl` and
  `mount-part-2.stl`. Case matters on GitHub Pages even if macOS accepts a mismatch.
- Unused exports and screenshots are preserved in ignored `local/media/`.
  Simulation XML/URDF, previews, and working notes are in `local/model-sources/`.
  These are local source material, not browser dependencies.
- `.gitignore` excludes local working files, archives, generated outputs, caches,
  secrets, and CAD authoring files. It must not ignore `assets/`, `layouts/`,
  `AGENTS.md`, or intentional public media. Ignoring a previously tracked file alone
  does not untrack it: review and stage the index removal while retaining local files.
- Do not commit build output, screenshots of QA sessions, model previews, or old
  theme demos. Do not rewrite remote Git history during routine cleanup.

Use descriptive lowercase kebab-case names for new files. Group files by purpose,
not by editing session. Preserve useful local work; move unused files out of the
published/tracked tree rather than discarding them without reason.

## Sources and attribution

The publication links in the homepage and the citations at the end of the CRAFT
post are the public sources. The applicant’s approved CV and research-source notes
in the parent workspace support biography and contribution details. Public papers
support team methods/results, not sole implementation ownership.

Do not invent venues, results, dates, authors, or submission status. CRAFT is a
reproduction/integration project: credit the original authors. GLIDE wording should
refer to data collection and policy deployment. OpenVAU concerns open-world anomaly
detection without predefined categories; retain its Qwen implementation details.

`static/aditya-mittal-cv.pdf` is an exact copy of the parent workspace’s approved
`CV-Resume/Aditya-Mittal-CV.pdf`. Do not edit the approved CV/resume or regenerate
those PDFs for website-only work. Website-specific publication labels do not imply
authorization to change the PDF. Never copy transcripts, identifiers, or private
application material into the public repository.

## Build, validation, and deployment

Use **Hugo Extended 0.148.2**, matching CI. No npm installation is needed.

```sh
hugo server --bind 127.0.0.1 --port 1315 --disableFastRender
hugo --environment production --minify
```

Open http://localhost:1315/ for local preview. CSS and JavaScript are minified and
fingerprinted by Hugo. Keep styles external: Sass’s UTF-8 marker can break the first
selector when compiled CSS is inlined. Keep early theme loading synchronous to avoid
a light flash, and load video behavior with `defer`.

For small text edits, a build is sufficient. For file moves or structural cleanup,
build once from the staged tracked files in a temporary directory. Check local
links/assets and any renamed model references; confirm ignored working files are
absent and that no localhost or unrelated sitemap URL reaches production. Visually
check desktop/mobile only when layout changes warrant it. Do not add a large test
suite for a static-content edit.

Review the staged diff for unrelated files, commit, and push `main` when authorized.
Wait for the matching GitHub Pages workflow. Confirm the live homepage, current
fingerprinted CSS/JS, and any affected URLs load before saying the change is live.
Remove disposable verification files and builds; report the deployed link and any
remaining blocker. Do not describe a successful push alone as a verified deployment.
