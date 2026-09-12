# Mixwise

Mixwise is a static, beginner-friendly worship audio learning app. It uses vanilla JavaScript and CSS so it can be deployed to GitHub Pages under a repository subpath without server-side routing.

## Run locally

```bash
npm install
npm run dev
```

`npm run build` creates the deployable `dist` folder. Publish that folder with GitHub Pages (for example via the official Pages artifact workflow). All app links and assets are relative.

## Audio note

The practice mixer currently uses generated placeholder practice tones and exposes the expected channel workflow without bundling copyrighted stems. To add licensed stems later, add files under `public/audio/<scenario>/` and replace the generated source in `src/main.js` with `AudioBufferSourceNode` loading paths such as `./audio/muddy-acoustic/acoustic-guitar.wav`.

## Adding content

Instrument guides are stored in the `instruments` object and practice scenarios are represented by the `scenario` branches in `practice()`. A future extraction into `src/data/` is straightforward as the content grows.

## Data and privacy

Selected stage channels and sound-check progress are stored only in this browser using localStorage. No account, backend, microphone permission, or external runtime service is required.
