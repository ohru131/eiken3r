// Web Audio API で合成する効果音（音声ファイル不要）

let ctx: AudioContext | null = null;
let enabled = true;

export function setSfxEnabled(v: boolean) {
  enabled = v;
}

/** ユーザー操作のタイミングで呼び、AudioContext を解錠する */
export function unlockAudio() {
  try {
    if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    if (ctx.state === 'suspended') void ctx.resume();
  } catch {
    ctx = null;
  }
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = 'sine', gain = 0.15, endFreq?: number) {
  if (!ctx) return;
  const t0 = ctx.currentTime + start;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (endFreq) osc.frequency.exponentialRampToValueAtTime(endFreq, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

function noise(start: number, dur: number, gain = 0.2, filterFreq = 800) {
  if (!ctx) return;
  const t0 = ctx.currentTime + start;
  const len = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = 'lowpass';
  f.frequency.value = filterFreq;
  const g = ctx.createGain();
  g.gain.value = gain;
  src.connect(f).connect(g).connect(ctx.destination);
  src.start(t0);
}

export type SfxName =
  | 'knock'
  | 'door'
  | 'micOn'
  | 'micOff'
  | 'tick'
  | 'timeUp'
  | 'flip'
  | 'chime'
  | 'correct'
  | 'good'
  | 'retry'
  | 'fanfare'
  | 'click';

export function playSfx(name: SfxName) {
  if (!enabled) return;
  unlockAudio();
  if (!ctx) return;
  switch (name) {
    case 'knock':
      [0, 0.22, 0.44].forEach((s) => {
        noise(s, 0.09, 0.9, 380);
        tone(110, s, 0.08, 'sine', 0.25, 70);
      });
      break;
    case 'door':
      noise(0, 0.5, 0.35, 500);
      tone(160, 0.32, 0.12, 'square', 0.05, 90);
      break;
    case 'micOn':
      tone(880, 0, 0.09, 'sine', 0.12);
      tone(1320, 0.08, 0.12, 'sine', 0.12);
      break;
    case 'micOff':
      tone(1100, 0, 0.08, 'sine', 0.1);
      tone(740, 0.07, 0.12, 'sine', 0.1);
      break;
    case 'tick':
      tone(1500, 0, 0.04, 'square', 0.04);
      break;
    case 'timeUp':
      tone(660, 0, 0.18, 'triangle', 0.15);
      tone(880, 0.18, 0.28, 'triangle', 0.15);
      break;
    case 'flip':
      noise(0, 0.18, 0.25, 2500);
      break;
    case 'chime':
      tone(784, 0, 0.5, 'sine', 0.12);
      tone(1047, 0.15, 0.6, 'sine', 0.1);
      break;
    case 'correct':
      tone(1047, 0, 0.12, 'triangle', 0.14);
      tone(1319, 0.1, 0.12, 'triangle', 0.14);
      tone(1568, 0.2, 0.3, 'triangle', 0.14);
      break;
    case 'good':
      tone(880, 0, 0.12, 'triangle', 0.12);
      tone(1175, 0.11, 0.25, 'triangle', 0.12);
      break;
    case 'retry':
      tone(440, 0, 0.15, 'triangle', 0.12);
      tone(370, 0.14, 0.3, 'triangle', 0.12);
      break;
    case 'fanfare':
      [523, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.13, 0.25, 'triangle', 0.13));
      tone(1047, 0.55, 0.7, 'triangle', 0.13);
      tone(1319, 0.55, 0.7, 'sine', 0.08);
      break;
    case 'click':
      tone(1200, 0, 0.03, 'square', 0.03);
      break;
  }
}
