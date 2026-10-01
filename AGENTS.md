## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project context

- Personal mountaineering journal: documents alpine routes, climbs and summits. All content is in English.
- Visual direction is Ortovox-inspired: full-width photos, lots of white space, big clean typography, minimal decoration.
- MVP pages: Home (hero + recent routes grid), Route page (gallery, facts, write-up), All routes (filter by difficulty/year), "How I grade routes".

## Stack rules

- Astro 7, static output, file-based routing in `src/pages/`.
- Use `.astro` components for all UI. No React/Vue/other UI frameworks; small interactive bits use vanilla JS in `<script>` tags. Ship zero JS by default.
- All content lives in `src/content/` and is loaded via the Content Layer API (`src/content.config.ts`).
- Styling is Tailwind 4 only. Design tokens (palette: neutrals + one accent, fluid type scale) are defined with `@theme` in `src/styles/global.css`; use those tokens instead of arbitrary values.
- Difficulty uses UIAA grades; all grade parsing, sorting and colour buckets live in `src/lib/grades.ts`.
- Do not add new dependencies without asking first.
- Before finishing, run `npm run check` and `npm run build`.

## Communication

- The owner is new to Astro: briefly explain what you changed and why, in plain terms.
