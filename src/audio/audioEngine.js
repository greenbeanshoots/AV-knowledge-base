import { stemUrl } from '../data/scenarios.js';

export class AudioEngine {
  constructor(){ this.ctx=null; this.masterGain=null; this.masterAnalyser=null; this.channels=[]; this.duration=0; this.startedAt=0; this.offset=0; this.playing=false; }
  async loadScenario(scenario){
    this.stop(); this.channels=[]; this.duration=0;
    this.ctx ||= new (window.AudioContext || window.webkitAudioContext)();
    this.masterGain ||= this.ctx.createGain(); this.masterGain.gain.value=0.8;
    this.masterAnalyser ||= this.ctx.createAnalyser(); this.masterAnalyser.fftSize=2048;
    this.masterGain.connect(this.masterAnalyser).connect(this.ctx.destination);
    const results=await Promise.all(scenario.stems.map(async ([id,label,file])=>{
      const response=await fetch(stemUrl(scenario.id,file));
      if(!response.ok) throw new Error(`${label}: audio file not found (${response.status})`);
      const buffer=await this.ctx.decodeAudioData(await response.arrayBuffer());
      return {id,label,file,buffer,volume:.75,pan:0,mute:false,solo:false,eq:0,compression:0};
    }));
    this.channels=results; this.duration=Math.max(...results.map(c=>c.buffer.duration)); return results;
  }
  createChannelGraph(channel){
    const source=this.ctx.createBufferSource(); source.buffer=channel.buffer;
    const gain=this.ctx.createGain(); const pan=this.ctx.createStereoPanner();
    const eq=this.ctx.createBiquadFilter(); eq.type='peaking'; eq.frequency.value=350; eq.Q.value=.7; eq.gain.value=channel.eq;
    const comp=this.ctx.createDynamicsCompressor(); comp.threshold.value=-24; comp.ratio.value=1+channel.compression*3; comp.attack.value=.02; comp.release.value=.18;
    const analyser=this.ctx.createAnalyser(); analyser.fftSize=1024;
    source.connect(gain).connect(pan).connect(eq).connect(comp).connect(analyser).connect(this.masterGain);
    channel.nodes={source,gain,pan,eq,comp,analyser};
    source.onended=()=>{ if(this.playing && this.ctx.currentTime-this.startedAt>=this.duration-this.offset-.05){this.playing=false;this.offset=0;window.dispatchEvent(new Event('mixwise-audio-ended'));} };
    return source;
  }
  applyChannelState(){ const anySolo=this.channels.some(c=>c.solo); this.channels.forEach(c=>{if(!c.nodes)return; c.nodes.gain.gain.setTargetAtTime(c.mute || (anySolo&&!c.solo) ? 0 : c.volume, this.ctx.currentTime, .01); c.nodes.pan.pan.setTargetAtTime(c.pan,this.ctx.currentTime,.01); c.nodes.eq.gain.setTargetAtTime(c.eq,this.ctx.currentTime,.01); c.nodes.comp.ratio.setTargetAtTime(1+c.compression*3,this.ctx.currentTime,.01);}); }
  async play(offset=this.offset){ if(!this.channels.length)return; await this.ctx.resume(); this.stopSources(); this.offset=Math.max(0,Math.min(offset,this.duration-.01)); this.startedAt=this.ctx.currentTime-this.offset; this.playing=true; this.channels.forEach(c=>this.createChannelGraph(c).start(0,this.offset)); this.applyChannelState(); }
  stopSources(){ this.channels.forEach(c=>{try{c.nodes?.source.stop()}catch{}}); this.channels.forEach(c=>delete c.nodes); }
  stop(){ if(this.ctx)this.stopSources(); this.playing=false; }
  pause(){ if(!this.playing)return; this.offset=Math.max(0,this.ctx.currentTime-this.startedAt); this.stop(); }
  seek(seconds){ const wasPlaying=this.playing; this.offset=seconds; if(wasPlaying)this.play(seconds); }
  setMaster(value){ if(this.masterGain)this.masterGain.gain.setTargetAtTime(value,this.ctx.currentTime,.01); }
  setChannel(id,patch){ const c=this.channels.find(x=>x.id===id); if(!c)return; Object.assign(c,patch); this.applyChannelState(); }
  reset(){ this.channels.forEach(c=>Object.assign(c,{volume:.75,pan:0,mute:false,solo:false,eq:0,compression:0})); this.applyChannelState(); }
}
