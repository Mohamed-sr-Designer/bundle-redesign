# Bundle — Creative · Production · Events

Redesign of [bundleims.com](https://bundleims.com) as a creative agency, production house and events company — not a template.

**Live:** https://mohamed-sr-designer.github.io/bundle-redesign/

## Concept

The site behaves like a set: a camera viewfinder hero with a running timecode, a clapperboard, stage-light beams, ticket stubs, a call sheet, a run-of-show with a scroll playhead and an end-credits client roll. No stock or AI imagery — only the five real production stills from the original site; everything else is type, CSS and SVG.

| Page | Idea |
|---|---|
| `index.html` | Viewfinder hero, rotating headline, three department "doors", film strip, call sheet, credits roll |
| `creative.html` | Paper/sketchbook — capabilities, "the set test", Arabic-first writing |
| `production.html` | Camera monitor — capabilities, frame ratios, pre/shoot/post |
| `events.html` | Stage beams + countdown — event tickets, launch-night run-of-show, checklist |
| `work.html` | Case files with department filters and hover peek, full client logo wall |
| `about.html` | The building (floor stack), house rules, facts |
| `contact.html` | Clapper-slate brief form |

`services.html` and `insights.html` redirect old links.

## Build

Pages are generated — edit `tools/pages/*.js` (shared header/footer in `tools/lib.js`), then:

```bash
node tools/build.js
```

Bilingual EN/AR via `data-en` / `data-ar` with full RTL. Fonts: Bricolage Grotesque, Instrument Serif, JetBrains Mono, Alexandria, IBM Plex Sans Arabic.

```bash
node serve.js      # http://localhost:4580
```

## Still needed from the client

Full street address, real social URLs, case-study footage.
