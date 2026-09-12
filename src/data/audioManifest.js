import { scenarios, stemUrl } from './scenarios.js';

// This is a source-of-truth manifest for licensed/local testing assets.
// It intentionally contains paths only; no audio is fabricated or bundled here.
export const audioAssetManifest = scenarios.flatMap(scenario => scenario.stems.map(([channelId, label, filename]) => ({
  scenarioId: scenario.id,
  scenarioName: scenario.name,
  channelId,
  label,
  filename,
  path: stemUrl(scenario.id, filename)
})));

export async function validateScenarioAssets(scenario) {
  const checks = await Promise.all(scenario.stems.map(async ([channelId, label, filename]) => {
    const path = stemUrl(scenario.id, filename);
    try {
      const response = await fetch(path, { method: 'HEAD' });
      return { channelId, label, filename, path, ok: response.ok, status: response.status };
    } catch (error) {
      return { channelId, label, filename, path, ok: false, status: 0, error: error.message };
    }
  }));
  return { scenario, checks, missing: checks.filter(check => !check.ok) };
}
