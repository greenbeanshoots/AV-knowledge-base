export const instrumentCatalog = [
  { id:'lead-vocal', name:'Lead vocal', category:'Voice', eq:'Listen for rumble, muddiness, nasal tone, harshness, and sibilance. Start with a small high-pass or low-mid cut only when you hear the problem.', comp:'Gentle compression can reduce large level jumps after gain and fader level are stable. Keep the vocal expressive.' },
  { id:'supporting-vocal', name:'Supporting vocal', category:'Voice', eq:'Prioritize blend and consonants. Make room for the lead instead of making every voice equally loud.', comp:'Light control may help a blend. Heavy compression can bring breaths and noise forward.' },
  { id:'acoustic', name:'Acoustic guitar', category:'Strings', eq:'Listen for body boom, low-mid muddiness, pick noise, and presence that competes with the vocal. Try a small cut before boosting.', comp:'Use gentle control if strums jump out; preserve natural movement.' },
  { id:'electric', name:'Electric guitar', category:'Strings', eq:'Shape around the part being played. Check hum, harsh pick attack, and masking before adding brightness.', comp:'Compression may be unnecessary when the amp and playing are already consistent.' },
  { id:'bass', name:'Bass', category:'Low end', eq:'Listen for a solid foundation, unclear low end, and conflict with the kick. Decide in the full mix.', comp:'Moderate control can smooth uneven notes, but too much can make bass flat.' },
  { id:'kick', name:'Kick', category:'Drums', eq:'Listen for weight, ring, and beater definition. Balance against bass rather than boosting low end by default.', comp:'Compression can add consistency, but too much removes impact.' },
  { id:'snare', name:'Snare', category:'Drums', eq:'Check body, crack, ring, and harshness. Keep the backbeat clear without chasing brightness.', comp:'Use only enough control to help consistency while preserving snap.' },
  { id:'electronic-drums', name:'Electronic drums', category:'Drums', eq:'Start conservatively: the kit may already be processed. Check stereo width and how it sits with vocals.', comp:'Compression may not be needed at all.' },
  { id:'keys', name:'Keys', category:'Keys', eq:'Listen for low-end buildup and whether stereo width supports or distracts from the arrangement.', comp:'Control only if the patch or performance is uneven.' },
  { id:'speech', name:'Speech microphone', category:'Voice', eq:'Clarity matters more than sounding big. Check plosives, handling noise, rumble, and feedback risk.', comp:'Gentle compression may help emphasis, but leave headroom for unexpected peaks.' }
];

export const prepItems = [
  ['input','Correct input','Confirm the channel label and cable or receiver before changing controls.'],
  ['signal','Signal check','Ask for a natural sound and confirm the meter moves on the channel you expect.'],
  ['gain','Gain staging','Ask for the loudest expected performance. Raise input gain carefully and stop before clipping.'],
  ['level','Level check','Set a sensible starting fader, then check the source quietly and loudly.'],
  ['problems','Listen for problems','Listen solo briefly, then in context for rumble, hum, harshness, noise, and feedback risk.'],
  ['eq','EQ guidance','Make one small, audible change only when you can name the problem you are solving.'],
  ['compression','Compression guidance','Use compression only when level movement needs control; compare at similar loudness.'],
  ['mix','Full-mix check','Bring the full band back and check whether the source helps the song without taking over.']
].map(([id,title,description])=>({id,title,description}));
