# Practice audio assets

Mixwise does not include copyrighted or generated practice stems. Add appropriately licensed, original, or public-domain files under `public/audio/` using the exact scenario folders and filenames below.

The browser-visible paths become `./audio/<scenario-id>/<filename>` after Vite copies `public/` into the build output.

## Required manifest

| Scenario | Channel | File path |
| --- | --- | --- |
| Muddy acoustic set | Acoustic guitar | `public/audio/muddy-acoustic/acoustic-guitar.wav` |
| Muddy acoustic set | Bass | `public/audio/muddy-acoustic/bass.wav` |
| Muddy acoustic set | Kick | `public/audio/muddy-acoustic/kick.wav` |
| Muddy acoustic set | Lead vocal | `public/audio/muddy-acoustic/lead-vocal.wav` |
| Muddy acoustic set | Pad | `public/audio/muddy-acoustic/pad.wav` |
| Uncontrolled vocal | Lead vocal | `public/audio/uncontrolled-vocal/lead-vocal.wav` |
| Uncontrolled vocal | Supporting vocal | `public/audio/uncontrolled-vocal/supporting-vocal.wav` |
| Uncontrolled vocal | Electric guitar | `public/audio/uncontrolled-vocal/electric-guitar.wav` |
| Uncontrolled vocal | Bass | `public/audio/uncontrolled-vocal/bass.wav` |
| Uncontrolled vocal | Drums | `public/audio/uncontrolled-vocal/drums.wav` |
| Kick and bass conflict | Kick | `public/audio/kick-bass/kick.wav` |
| Kick and bass conflict | Bass | `public/audio/kick-bass/bass.wav` |
| Kick and bass conflict | Drums | `public/audio/kick-bass/drums.wav` |
| Kick and bass conflict | Lead vocal | `public/audio/kick-bass/lead-vocal.wav` |
| Kick and bass conflict | Guitar | `public/audio/kick-bass/guitar.wav` |

## Format and naming

- Use uncompressed PCM WAV for the first supported asset set.
- Use lowercase kebab-case filenames exactly as listed.
- Keep one file per scenario channel; do not combine a scenario into one stereo bounce.
- Prefer the same sample rate, channel layout, start time, and duration for every stem in a scenario.
- Stems should start at the same musical zero. The loader starts all `AudioBufferSourceNode`s with one shared start call and offset.
- The current loader uses the longest stem as the scenario duration. It does not pad shorter files, so mismatched durations can cause channels to end early.

## Local testing

For a local test, use only audio you created or are licensed to use. Place it at the exact paths above, run `npm run dev`, and open the Practice mix page. The startup validator reports every missing channel by label and path. There is no fake-tone fallback.
