import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, Headphones, Pause, Play, RotateCcw } from 'lucide-react';
import { scenarios } from '../data/scenarios.js';
import { validateScenarioAssets } from '../data/audioManifest.js';
import { AudioEngine } from '../audio/audioEngine.js';
import { startVisuals } from '../audio/visualizers.js';
import { ActionButton } from './shared/ActionButton.jsx';

export default function Practice() {
  const [selectedId, setSelectedId] = useState(scenarios[0].id);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const engine = useRef(new AudioEngine()).current;
  const canvas = useRef(null);
  useEffect(() => { let active = true; const scenario = scenarios.find(candidate => candidate.id === selectedId); setLoaded(false); setError(''); validateScenarioAssets(scenario).then(async report => { if (!active) return; if (report.missing.length) { engine.stop(); engine.channels = []; setError(report.missing.map(item => `${item.label}: ${item.path}`).join('\n')); return; } try { await engine.loadScenario(scenario); if (active) setLoaded(true); } catch (loadError) { if (active) setError(loadError.message); } }); return () => { active = false; engine.stop(); }; }, [selectedId, engine]);
  useEffect(() => { if (!canvas.current || !engine.masterAnalyser) return undefined; return startVisuals(engine, canvas.current, null, null); }, [loaded, engine]);
  const scenario = scenarios.find(candidate => candidate.id === selectedId);
  return <main className="page narrow"><div className="page-intro"><div><p className="eyebrow">Audio practice</p><h1>Practice mix, separately.</h1></div><p className="intro-copy">Optional multitrack practice for listening skills. It never blocks checklist completion.</p></div><section className="practice-panel surface"><Headphones size={32} /><h2>{scenario.name}</h2><p>{scenario.objective}</p><div className="practice-tabs">{scenarios.map(candidate => <button className={candidate.id === selectedId ? 'active' : ''} onClick={() => setSelectedId(candidate.id)} key={candidate.id}>{candidate.name}</button>)}</div>{error ? <div className="ui-alert warning" role="alert"><AlertTriangle size={17} /><span><strong>Practice audio is unavailable.</strong><br />{error.split('\n').map(line => <React.Fragment key={line}>{line}<br /></React.Fragment>)}<small>Add licensed stems under <code>public/audio/{scenario.id}/</code>.</small></span></div> : <><div className="audio-controls"><ActionButton onClick={() => engine.playing ? engine.pause() : engine.play()} icon={engine.playing ? Pause : Play}>{engine.playing ? 'Pause' : 'Play'}</ActionButton><ActionButton onClick={() => engine.reset()} icon={RotateCcw} variant="secondary">Reset mix</ActionButton><span>{loaded ? `${engine.channels.length} channels loaded` : 'Checking audio assets...'}</span></div><canvas ref={canvas} className="practice-canvas" width="900" height="220" aria-label="Live practice frequency display" /></>}</section></main>;
}
