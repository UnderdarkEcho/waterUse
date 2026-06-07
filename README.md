# Water Footprint Calculator

Honest, cited water estimates for AI and daily life — built as a static Next.js app.

**Live site:** [underdarkecho.github.io/waterUse](https://underdarkecho.github.io/waterUse/)

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

Output is written to `out/`. The `basePath` is `/waterUse` when `GITHUB_PAGES=true`.

## Deploy

Pushes to `main` trigger the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages automatically.

Enable Pages in the repo settings with **Source: GitHub Actions**.