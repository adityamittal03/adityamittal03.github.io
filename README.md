# Personal Website - Aditya Mittal

This repository contains Aditya Mittal's personal website, built with
[Hugo](https://gohugo.io/) and deployed to GitHub Pages. The site includes the homepage,
experience pages, project/blog posts, static media, and a customized Maverick theme.

Live site: <https://adityamittal03.github.io/>

## Local Development

Use Hugo Extended. The deployed site is built by GitHub Actions with `hugo --minify`, but
local development usually uses the Hugo server:

```sh
hugo server -D --bind 127.0.0.1 --port 1315 --disableFastRender
```

Then open:

```text
http://localhost:1315/
```

For a quick build check without starting a server:

```sh
hugo --quiet
```

## Repository Layout

- `content/` contains Markdown content for the site.
- `content/_index.md` is the homepage body.
- `content/blog/` contains blog posts.
- `content/blog/recreating-craft-hand.md` is the CRAFT hand build post.
- `static/` contains files served directly at the site root.
- `static/blog/craft-hand/` contains only images and videos currently used by the CRAFT
  blog post.
- `static/unused/` contains media exports that are not currently used by any page.
- `static/unused/craft-hand/` contains alternate CRAFT images, old setup exports, and
  other CRAFT-related media that should not be served by the active blog post.
- `static/unused/craft-hand/videos/` contains older CRAFT video clips that are not
  referenced by the current post.
- `static/unused/screenshots/` contains scratch screenshots.
- `static/models/` and `static/visualizations/` contain model/viewer assets for robot
  visualizations.
- `themes/maverick/` contains the site theme and custom SCSS.
- `themes/maverick/assets/scss/styles.scss` contains most custom styling for the CRAFT
  blog layout, media grids, captions, and video switchers.
- `layouts/partials/` contains local template overrides.
- `static/js/main.js` contains client-side behavior such as dark mode, CRAFT video
  switchers, and video playback-rate setup.

## Asset Rules

Do not leave media files in the repository root. Root-level screenshots, image exports,
and videos are ignored by `.gitignore` so they do not accidentally get published from the
wrong location.

Use these locations instead:

- Active CRAFT blog images: `static/blog/craft-hand/`
- Active CRAFT blog videos: `static/blog/craft-hand/videos/`
- Unused exports and scratch media: `static/unused/`
- Unused CRAFT images: `static/unused/craft-hand/`
- Unused CRAFT videos: `static/unused/craft-hand/videos/`
- Site-wide images such as the avatar and icon: `static/`

Use lowercase kebab-case filenames that describe the asset, such as
`craft-completed-hand.png` or `craft-cup-pick-place-teleop.mp4`. Avoid spaces,
underscores, numbered scratch names, and extensions that do not match the actual file
type.

Files under `static/unused/` are not referenced by current pages, but they are still
deployed because Hugo serves everything under `static/`. Only keep unused assets there if
they are okay to remain publicly accessible by direct URL.

When replacing a visible image or video, copy or move the new file into `static/`, update
the Markdown reference, and add a cache-busting query such as `?v=20260709e` when browser
or GitHub Pages caching may otherwise show the old asset.

## CRAFT Blog Workflow

The main CRAFT post lives at:

```text
content/blog/recreating-craft-hand.md
```

The post uses inline HTML for richer layouts that Markdown alone does not handle well:

- teaser image/video grid
- side-by-side CRAFT setup and wrist-mount figures
- three-image compliant-finger process gallery
- two-video tendon/teleop gallery
- Quest teleoperation video layout
- task video switcher for cup pick-and-place and wine pouring

When editing the CRAFT post, keep the source Markdown and the served assets in sync.
`aditya-text.md` is the local working draft for the post and is intentionally ignored by
git. It should stay aligned with the blog's prose and captions, while
`content/blog/recreating-craft-hand.md` remains the version that controls the live page
layout, media, and inline HTML. Copy draft edits into the content file before expecting
them to appear on the site.

## Deployment

GitHub Pages deployment is configured in:

```text
.github/workflows/hugo.yml
```

On pushes to `main`, the workflow installs Hugo Extended, runs:

```sh
hugo --minify
```

and deploys the generated `public/` directory to GitHub Pages.
