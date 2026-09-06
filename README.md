# Bundle — Website Redesign

A full redesign of [bundleims.com](https://bundleims.com) for **Bundle**, a Kuwait-based
full-service agency combining advertising, marketing and public relations under one roof.

**Live:** https://mohamed-sr-designer.github.io/bundle-redesign/

## What's here

Six static pages, no build step:

| Page | Purpose |
|---|---|
| `index.html` | Hero, client marquee, integration diagram, six services, why Bundle, sectors, production reel, process, insights |
| `services.html` | The six disciplines in depth, engagement models, FAQ |
| `work.html` | Filterable work by sector, production reel |
| `about.html` | Story, principles, team structure, inside the studio |
| `insights.html` | Articles + newsletter |
| `contact.html` | Full project brief form |

## Design

- **Brand-locked palette** carried over from the original site — yellow `#FFD400`, ink `#0C1020`, indigo `#4D5C9E`.
- **Bilingual EN / AR** with a real RTL flip, driven by `data-en` / `data-ar` attributes and persisted in `localStorage`.
- **Minimal header**: three primary links plus a full-screen menu overlay.
- Type: Archivo (display) · Inter (body) · IBM Plex Mono (labels) · IBM Plex Sans Arabic.
- No framework. `css/style.css` + `js/app.js`, ~1000 lines of CSS and 200 of JS.

## Assets

- `assets/clients/` — the 32 client logos, sliced out of the original site's single combined JPG.
- `assets/work/` — production stills taken from the original site.

## Run locally

```bash
node serve.js      # http://localhost:4580
```

## Still needed from the client

- The studio's full street address (currently "Kuwait City, Kuwait").
- Real social profile URLs (currently `#`).
- Case-study copy and imagery for individual projects.
