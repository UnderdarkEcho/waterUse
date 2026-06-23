# Water Footprint Calculator

Honest, cited water estimates for AI and daily life — because moving fast is worth it, and the water returns to the cycle.

**Live site:** [underdarkecho.github.io/waterUse](https://underdarkecho.github.io/waterUse/)

## What it does

- **Calculator** — searchable activity picker, live results, presets, copy/export
- **Comparisons** — all activities on a log-scaled impact grid
- **Education** — accordion with citations, water-cycle context, methodology
- **Share** — X + copy link, optional result image export
- **Data** — full activity table, sources, and bibliography at `/data`

Activities span AI queries, streaming, transport, household use, and food (coffee, latte, ribeye industrial vs free-range, salad, TV dinner, vegan meal, almonds, and more). Food figures use virtual water from the [Water Footprint Network](https://www.waterfootprint.org/).

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for GitHub Pages

```bash
GITHUB_PAGES=true npm run build
```

Static output goes to `out/`. `basePath` is `/waterUse` when `GITHUB_PAGES=true`.

## Deploy

Pushes to `main` run [.github/workflows/deploy.yml](.github/workflows/deploy.yml) and publish to GitHub Pages.

Repo settings → **Pages** → **Source: GitHub Actions**.

## Stack

Next.js 15 (static export) · React 19 · Tailwind CSS 4 · TypeScript