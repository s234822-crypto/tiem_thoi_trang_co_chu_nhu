// Web Audio API Sound Synthesizer for cozy casual mobile game

let audioCtx: AudioContext | null = null;
let soundMuted = false;
let bgmInterval: number | null = null;
let bgmStep = 0;
let isBgmPlaying = false;

if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('fashionShop_soundMuted');
    if (saved !== null) {
      soundMuted = JSON.parse(saved);
    }
  } catch {
    // ignore
  }
}

export function isAudioMuted(): boolean {
  return soundMuted;
}

export function setAudioMuted(muted: boolean) {
  soundMuted = muted;
  if (muted) {
    stopBGM();
  } else if (typeof window !== 'undefined') {
    startBGM();
  }
  try {
    localStorage.setItem('fashionShop_soundMuted', JSON.stringify(muted));
  } catch {
    // ignore
  }
}

export function toggleAudio(): boolean {
  const next = !soundMuted;
  setAudioMuted(next);
  return next;
}

function getAudioContext(): AudioContext | null {
  if (soundMuted) return null;
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// ─────────────────────────────────────────────────────────────────────────────
// Cozy Lo-Fi Web Audio Background Music (BGM) Synthesizer
// ─────────────────────────────────────────────────────────────────────────────

// Chord Frequencies (Cmaj7 - Am7 - Fmaj7 - G7)
const CHORDS = [
  // Cmaj7
  { bass: 130.81, notes: [261.63, 329.63, 392.00, 493.88], melody: [523.25, 659.25, 783.99] },
  // Am7
  { bass: 110.00, notes: [220.00, 261.63, 329.63, 392.00], melody: [440.00, 523.25, 659.25] },
  // Fmaj7
  { bass: 87.31,  notes: [174.61, 220.00, 261.63, 329.63], melody: [349.23, 440.00, 523.25] },
  // G7
  { bass: 98.00,  notes: [196.00, 246.94, 293.66, 349.23], melody: [392.00, 493.88, 587.33] },
];

function playBgmMeasure() {
  if (soundMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const chord = CHORDS[bgmStep % CHORDS.length];
    bgmStep++;

    const now = ctx.currentTime;
    const duration = 3.2; // ~75 BPM, 4 beats per measure

    // Low-pass filter for cozy warm lofi sound
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1100, now);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.04, now);

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);

    // 1. Warm Sub Bass
    const bassOsc = ctx.createOscillator();
    const bassGain = ctx.createGain();
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(chord.bass, now);

    bassGain.gain.setValueAtTime(0.001, now);
    bassGain.gain.linearRampToValueAtTime(0.2, now + 0.15);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + duration - 0.1);

    bassOsc.connect(bassGain);
    bassGain.connect(filter);
    bassOsc.start(now);
    bassOsc.stop(now + duration);

    // 2. Soft Electric Piano Chords (sine waves with gentle attack)
    chord.notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);

      gain.gain.setValueAtTime(0.001, now + i * 0.04);
      gain.gain.linearRampToValueAtTime(0.1, now + i * 0.04 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration - 0.2);

      osc.connect(gain);
      gain.connect(filter);
      osc.start(now + i * 0.04);
      osc.stop(now + duration);
    });

    // 3. Arpeggiated Lofi Melody Notes (Marimba / Musicbox style)
    chord.melody.forEach((freq, idx) => {
      const delay = 0.8 + idx * 0.7; // Arpeggio spread across the measure
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + delay);

      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.linearRampToValueAtTime(0.08, now + delay + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.6);

      osc.connect(gain);
      gain.connect(filter);
      osc.start(now + delay);
      osc.stop(now + delay + 0.6);
    });
  } catch {
    // ignore audio failures
  }
}

export function startBGM() {
  if (isBgmPlaying || soundMuted) return;
  isBgmPlaying = true;
  playBgmMeasure();
  bgmInterval = window.setInterval(playBgmMeasure, 3200);
}

export function stopBGM() {
  isBgmPlaying = false;
  if (bgmInterval !== null) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}

export function toggleBGM(): boolean {
  if (isBgmPlaying) {
    stopBGM();
    return false;
  } else {
    startBGM();
    return true;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Sound Effects (SFX)
// ─────────────────────────────────────────────────────────────────────────────

export function playTapSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch {
    // ignore audio failures
  }
}

export function playChimeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.07);

      gain.gain.setValueAtTime(0.1, ctx.currentTime + i * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.07 + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + i * 0.07);
      osc.stop(ctx.currentTime + i * 0.07 + 0.25);
    });
  } catch {
    // ignore
  }
}

export function playAlertSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(240, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch {
    // ignore
  }
}

export function playVipFanfare() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [659.25, 783.99, 987.77, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
    });
  } catch {
    // ignore
  }
}

export function playCoinSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, ctx.currentTime); // B5
    osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08); // E6

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    // ignore
  }
}

export function playSuccessFanfare() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const chords = [523.25, 659.25, 783.99, 1046.5]; // C major
    chords.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.4);
    });
  } catch {
    // ignore
  }
}

export function playMissionCompleteSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const notes = [587.33, 739.99, 880.0, 1174.66]; // D5, F#5, A5, D6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.13, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
    });
  } catch {
    // ignore
  }
}

export function playAchievementSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const arpeggio = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
    arpeggio.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.5);
    });
  } catch {
    // ignore
  }
}
