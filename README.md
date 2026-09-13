# Soundcheck

Soundcheck is a structured worship audio checklist application for youth and beginner audio teams. Checklist content is stored as validated data, while sessions and notes stay local to the browser.

## Run locally

```bash
npm install
npm run dev
```

`npm run validate:content` checks IDs, references, types, titles, and ordering. `npm run build` creates the deployable `dist` folder. `npm run validate:build` checks that the generated HTML has relative, existing asset references. Hash routing keeps GitHub Pages repository subpaths working without server-side rewrites.

## GitHub Pages

Public demo: [https://greenbeanshoots.github.io/AV-knowledge-base/](https://greenbeanshoots.github.io/AV-knowledge-base/)

The existing workflow in `.github/workflows/deploy.yml` deploys the same `dist` output used by Docker. It runs content validation, builds with Vite, validates the generated artifact, and uploads the result through GitHub Pages. The relative Vite base and hash routes support repository project paths such as:

```text
https://<account>.github.io/<repository>/#/checklists
```

Refreshes remain on the hash route and do not require server-side rewrites.

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**. If Pages is set to deploy from the `main` branch root instead, GitHub serves the development `index.html` and attempts to load `src/main.jsx` as `text/jsx`, which will not run in production. After changing the source, use the `Deploy to GitHub Pages` workflow or push to `main`.

## Docker

```bash
docker compose up --build
```

Open `http://localhost:8080`. The production container serves the Vite output through Nginx on port 80 and exposes `/health` for the container health check.

Docker runs the same `npm run build` command as GitHub Pages. Nginx serves the resulting static files, preserves the hash-based client routes, and returns 404 for missing files under `/audio/` instead of falling back to the application shell.

## Future static hosting

Firebase Hosting or another static host can deploy the `dist` folder without a second frontend implementation. Keep `base: "./"`, retain hash routing, and configure the host to serve `index.html` for the root document. Future Firebase Authentication, Firestore, Storage, or progress adapters should remain behind the existing repository and domain boundaries.

## Checklist content

Checklist definitions live in `src/content/checklists.js`. Instrument metadata and EQ/compression guidance live in `src/content/instruments.js` and `src/content/guidance.js`. Add stable IDs and preserve source-document order with `order` fields. Content validation runs during the app build and through `npm run validate:content`.

## Audio practice

The existing multitrack audio feature remains isolated and optional. It does not block checklist completion. Practice scenarios use real, licensed stems loaded through `AudioBufferSourceNode`. Add appropriately licensed files under:

```text
public/audio/<scenario-id>/<stem-file>.wav
```

See [AUDIO_ASSETS.md](./AUDIO_ASSETS.md) for the manifest and naming conventions.

## Data and privacy

Sessions, notes, and issue flags are stored only in this browser through `LocalChecklistRepository`. Settings provides JSON export, import, and reset. The repository interface is asynchronous so a future Firebase adapter can replace local storage without coupling Firebase APIs to presentation components.
