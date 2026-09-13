const item = (id, title, explanation, whyItMatters, options = {}) => ({
  id, title, explanation, whyItMatters, completionCriteria: 'The check is complete when the result is confirmed in the room or on the console.', problemResponse: 'Pause, name the problem you can hear, and make the smallest safe adjustment before checking again.', required: false, safety: false, notesEnabled: true, issueFlaggingEnabled: true, order: 1, ...options
});

export const checklists = [
  {
    id: 'preservice', type: 'preservice', title: 'Preservice', description: 'Prepare the room, system, and team before soundcheck.', sections: [
      { id: 'room-safety', title: 'Room and safety', order: 1, items: [
        item('pre-safety-001', 'Clear cable paths and trip hazards', 'Walk the room and stage before cases are opened.', 'A calm, clear stage protects the team and the congregation.', { required: true, safety: true, order: 1 }),
        item('pre-power-001', 'Check power and system state', 'Confirm the console, stagebox, amplifiers, and powered speakers are ready.', 'Unexpected power or routing changes can create unsafe surprises.', { required: true, order: 2 })
      ] },
      { id: 'stage-inputs', title: 'Stage and inputs', order: 2, items: [
        item('pre-input-001', 'Match labels to the planned stage set', 'Compare channel labels with the actual microphones, instruments, and DI boxes.', 'Correct labels make every later decision faster and safer.', { required: true, order: 1 }),
        item('pre-mic-001', 'Place microphones for natural performance', 'Give each source a usable starting position before detailed adjustment.', 'Good placement reduces the need for aggressive processing.', { order: 2 })
      ] }
    ]
  },
  {
    id: 'soundcheck', type: 'soundcheck', title: 'Soundcheck', description: 'Check each source, then listen to the whole mix.', sections: [
      { id: 'line-check', title: 'Line check', order: 1, items: [
        item('sound-line-001', 'Confirm every expected input', 'Ask for a natural sound and confirm the expected channel meter moves.', 'This catches wrong cables, muted channels, and routing mistakes early.', { required: true, order: 1 }),
        item('sound-gain-001', 'Set gain for the loudest expected moment', 'Ask the musician or speaker to perform at realistic volume, then leave headroom.', 'Healthy gain staging prevents clipping and keeps later fader decisions predictable.', { required: true, safety: true, order: 2 })
      ] },
      { id: 'source-checks', title: 'Source checks', order: 2, items: [
        item('sound-vocal-001', 'Check vocal clarity and feedback risk', 'Listen for rumble, muddiness, harshness, sibilance, and monitor feedback.', 'Clear words help people participate and reduce unnecessary volume.', { instrumentId: 'lead-vocal', guidanceArticleId: 'vocal-eq', required: true, order: 1 }),
        item('sound-guitar-001', 'Check guitars in context', 'Listen for low-mid buildup, pick noise, hum, and masking with vocals.', 'Small changes can create space without removing musical character.', { instrumentId: 'acoustic-guitar', guidanceArticleId: 'acoustic-guitar-eq', order: 2 }),
        item('sound-low-001', 'Balance kick and bass', 'Listen for weight and definition together in the full mix.', 'The low end should feel stable rather than compete for the same space.', { instrumentId: 'bass', guidanceArticleId: 'bass-guidance', order: 3 })
      ] },
      { id: 'full-mix', title: 'Full mix', order: 3, items: [
        item('sound-mix-001', 'Listen through the first song', 'Make only small adjustments while the whole band is playing.', 'The right setting is the one that serves the song, not the isolated channel.', { required: true, order: 1 })
      ] }
    ]
  },
  {
    id: 'service-operation', type: 'service-operation', title: 'Service operation', description: 'Stay attentive and make safe, purposeful changes during the service.', sections: [
      { id: 'during-service', title: 'During the service', order: 1, items: [
        item('service-focus-001', 'Follow the service plan and cues', 'Keep the run sheet visible and anticipate transitions.', 'Prepared transitions reduce distractions for the congregation and team.', { required: true, order: 1 }),
        item('service-level-001', 'Watch levels without chasing every movement', 'Keep an eye on clipping, feedback, and unexpected changes.', 'Small, calm decisions preserve musical dynamics and safety.', { required: true, safety: true, order: 2 }),
        item('service-speech-001', 'Check speech intelligibility', 'Make sure announcements, prayer, and teaching remain understandable.', 'The spoken message needs consistent clarity more than extra loudness.', { instrumentId: 'speech', guidanceArticleId: 'speech-guidance', order: 3 })
      ] }
    ]
  },
  {
    id: 'postservice', type: 'postservice', title: 'Postservice', description: 'Leave the room safe, documented, and ready for the next team.', sections: [
      { id: 'close-down', title: 'Close down', order: 1, items: [
        item('post-save-001', 'Record useful changes and issues', 'Note anything the next team should know, including noisy channels or missing equipment.', 'Good notes turn one service into shared team learning.', { required: true, order: 1 }),
        item('post-mute-001', 'Mute and power down safely', 'Follow the local shutdown order before disconnecting equipment.', 'Correct shutdown protects people, speakers, and equipment.', { required: true, safety: true, order: 2 }),
        item('post-reset-001', 'Return the stage and room to a clear state', 'Coil cables, return stands, and leave the space ready for its next use.', 'A clean handoff makes the next setup faster and safer.', { order: 3 })
      ] }
    ]
  }
];
