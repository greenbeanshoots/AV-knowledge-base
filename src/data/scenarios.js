export const scenarios = [
  { id:'muddy-acoustic', name:'Muddy acoustic set', objective:'Find low-mid buildup and make room for the vocal without removing warmth.', stems:[['acoustic-guitar','Acoustic guitar','acoustic-guitar.wav'],['bass','Bass','bass.wav'],['kick','Kick','kick.wav'],['lead-vocal','Lead vocal','lead-vocal.wav'],['pad','Pad','pad.wav']] },
  { id:'uncontrolled-vocal', name:'Uncontrolled vocal', objective:'Make the lead vocal steadier without flattening its expression.', stems:[['lead-vocal','Lead vocal','lead-vocal.wav'],['supporting-vocal','Supporting vocal','supporting-vocal.wav'],['electric-guitar','Electric guitar','electric-guitar.wav'],['bass','Bass','bass.wav'],['drums','Drums','drums.wav']] },
  { id:'kick-bass', name:'Kick and bass conflict', objective:'Untangle kick and bass by listening to level and frequency together.', stems:[['kick','Kick','kick.wav'],['bass','Bass','bass.wav'],['drums','Drums','drums.wav'],['lead-vocal','Lead vocal','lead-vocal.wav'],['guitar','Guitar','guitar.wav']] }
];

export const stemUrl = (scenarioId, filename) => `./audio/${scenarioId}/${filename}`;
