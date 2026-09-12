# Mixwise

Mixwise is a static, beginner-friendly worship audio learning app. It uses vanilla JavaScript and CSS so it can be deployed to GitHub Pages under a repository subpath without server-side routing.

## Run locally

```bash
npm install
npm run dev
```

`npm run build` creates the deployable `dist` folder. Publish that folder with GitHub Pages (for example via the official Pages artifact workflow). All app links and assets are relative.

## Audio note

Practice scenarios use real multitrack stems loaded through `AudioBufferSourceNode`. This repository intentionally does not include copyrighted or fabricated audio. Add appropriately licensed files under:

```text
public/audio/<scenario-id>/<stem-file>.wav
```

The expected filenames are defined in `src/data/scenarios.js`. If a file is missing, the app shows the failed path and disables playback rather than substituting a fake tone.

See [AUDIO_ASSETS.md](./AUDIO_ASSETS.md) for the complete channel-by-channel manifest, naming convention, format guidance, and local testing instructions. `src/data/audioManifest.js` performs a startup `HEAD` check and reports every missing channel before the loader attempts to decode audio.

Each stem is routed through gain, pan, EQ, compression, a per-channel analyser, and a shared master bus. The master analyser drives the live frequency/waveform canvas and level meter.

## Adding content

Instrument guides are stored in the `instruments` object and practice scenarios are represented by the `scenario` branches in `practice()`. A future extraction into `src/data/` is straightforward as the content grows.

## Data and privacy

Selected stage channels and sound-check progress are stored only in this browser using localStorage. No account, backend, microphone permission, or external runtime service is required.
