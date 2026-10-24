# Aditya Mittal’s website

Personal research website built with Hugo Extended and deployed to GitHub Pages.

**Live site:** <https://adityamittal03.github.io/>

## Development

Use **Hugo Extended 0.148.2**, matching the version in GitHub Actions.

```sh
hugo server --bind 127.0.0.1 --port 1315 --disableFastRender
```

Open <http://localhost:1315/>. For a production build:

```sh
hugo --environment production --minify
```

Hugo generates `public/`; do not edit or commit generated files.

## Structure

```text
assets/
  js/
    theme.js                # Dark default, saved preference, theme toggle
    main.js                 # CRAFT video switching and playback
  scss/
    styles.scss             # Stylesheet entry point and import order
    _tokens.scss            # Light and dark colors
    _base.scss              # Typography, shared elements, footer
    _blog-cards.scss         # Blog listing cards
    _research.scss           # Homepage, publications, CV, disclosures
    _craft.scss              # CRAFT post’s image and video layouts
content/
  _index.md                 # Introduction, papers, talks, profile links
  experience.md             # Web CV
  blog/                     # Blog landing page and posts
layouts/
  _default/baseof.html      # Shared HTML document and page shell
  _default/list.html        # Blog and taxonomy listings
  _default/single.html      # Article and CV pages
  index.html                # Homepage
  404.html                  # Missing-page response
  partials/                 # Head, header, footer, metadata, icons
static/
  blog/craft-hand/          # Published images and videos
  models/                   # Robot model assets used by viewers
  visualizations/           # Standalone robot viewers
  *.pdf, *.png, *.ico, ...  # Existing public documents and identity assets
archive/
  media/                   # Unused exports; excluded from the site build
config/development/        # Local preview URL
.github/workflows/         # GitHub Pages deployment
```

`hugo.toml` contains the production URL, site metadata, and navigation. The top bar
contains **Papers** and **Blog**; the CV link stays with the homepage profile links.
Dark mode uses black and red and is the default. An explicit light-mode choice is
remembered using the existing `theme` browser-storage key.

Site-specific templates and assets belong in `layouts/` and `assets/`.
`themes/maverick/` is the vendored fallback theme, including its upstream examples
and documentation; leave it unchanged. Root-level overrides take precedence.
CSS and JavaScript are built and fingerprinted by Hugo for reliable cache updates.

## Content and media

- Edit source Markdown in `content/`, not generated HTML.
- Paper titles, authors, status, and links remain visible. Optional abstracts,
  talks, and web-CV entries use native `<details>` elements.
- `static/aditya-mittal-cv.pdf` is a copy of the approved two-page CV from the
  parent PhD workspace. Update the copy only when the approved CV changes.
- Keep established document and image URLs stable. Existing root-level public
  assets remain under `static/` so bookmarks and external links keep working.
- Put active CRAFT images in `static/blog/craft-hand/` and videos in its `videos/`
  subfolder. Use descriptive lowercase kebab-case filenames.
- Keep model dependencies beside their existing viewers; update all references
  when moving them.
- Keep unused exports in `archive/media/`. They remain accessible in the Git
  repository but are not deployed by Hugo. Never put private files there.
- Do not leave media exports in the repository root. Generated `public/`,
  `resources/`, editor files, and local CAD source exports are ignored.

The CRAFT post uses inline HTML for media grids, captions, and video tabs.
`content/blog/recreating-craft-hand.md` controls the published page. The ignored
`aditya-text.md` is a local writing draft; keep it aligned when changing the post’s
prose. The visual layout is maintained in `assets/scss/_craft.scss`.

## Deployment

Pushes to `main` run `.github/workflows/hugo.yml`, build the production site, and
deploy `public/` to GitHub Pages. `archive/`, source assets, and theme examples are
not included in the published directory. Confirm the workflow completes and the
live homepage reflects the pushed commit before reporting a deployment as live.
