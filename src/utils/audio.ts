/**
 * Web Audio API based Procedural Ambient Piano & Cinematic Soundscape.
 * Generates an emotional, soft, nostalgic musical piece without requiring external audio downloads,
 * while also allowing custom audio file playback if uploaded!
 */

class SoundscapeEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private masterGain: GainNode | null = null;
  private volume: number = 0.6;
  private customAudio: HTMLAudioElement | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();

  private chordProgression = [
    // Emotional progression: Cmaj9 -> G6/B -> Am9 -> Fadd9 -> Dm9 -> Gsus4 -> Cmaj7
    [261.63, 329.63, 392.00, 493.88, 587.33], // Cmaj9 (C4, E4, G4, B4, D5)
    [246.94, 293.66, 392.00, 440.00, 587.33], // G6/B (B3, D4, G4, A4, D5)
    [220.00, 261.63, 329.63, 392.00, 493.88], // Am9 (A3, C4, E4, G4, B4)
    [174.61, 261.63, 329.63, 392.00, 523.25], // Fadd9 (F3, C4, E4, G4, C5)
    [146.83, 220.00, 261.63, 349.23, 440.00], // Dm9 (D3, A3, C4, F4, A4)
    [196.00, 261.63, 293.66, 392.00, 587.33], // Gsus4 (G3, C4, D4, G4, D5)
    [261.63, 329.63, 392.00, 493.88, 659.25], // Cmaj7 (C4, E4, G4, B4, E5)
    [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj7 (F3, A3, C4, E4, G4)
  ];

  private currentChordIndex = 0;

  public subscribe(fn: (playing: boolean) => void): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.volume;
    }
  }

  public setCustomAudioUrl(url: string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
    }
    if (url) {
      this.customAudio = new Audio(url);
      this.customAudio.loop = true;
      this.customAudio.volume = this.volume;
      if (this.isPlaying) {
        this.stopSynthesizer();
        this.customAudio.play().catch(() => {});
      }
    }
  }

  private initAudioContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

      // Low pass filter for soft dreaminess
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      this.masterGain.connect(filter);
      filter.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, startTime: number, duration: number, gainValue: number, isBass = false) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Warm sine + subtle triangle overtone
    osc.type = isBass ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    // Piano-like decay envelope
    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.exponentialRampToValueAtTime(gainValue, startTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(gainValue * 0.4, startTime + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  private stepProgression() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    const chord = this.chordProgression[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chordProgression.length;

    // Play root bass
    this.playTone(chord[0] / 2, now, 6.5, 0.28, true);

    // Arpeggiate chord notes with soft humanized delays
    chord.forEach((freq, idx) => {
      const delay = idx === 0 ? 0.05 : idx * 0.45 + (Math.random() * 0.05);
      const noteGain = 0.08 / (idx + 1) + 0.04;
      this.playTone(freq, now + delay, 5.0, noteGain);
    });

    // High shimmer note
    if (Math.random() > 0.4) {
      const shimmerFreq = chord[chord.length - 1] * 2;
      this.playTone(shimmerFreq, now + 2.2, 4.0, 0.03);
    }
  }

  private startSynthesizer() {
    this.stepProgression();
    // Advance every 4.8 seconds for slow, breathing cinematic tempo
    this.timer = window.setInterval(() => {
      this.stepProgression();
    }, 4800);
  }

  private stopSynthesizer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public play() {
    this.initAudioContext();
    this.isPlaying = true;
    this.notify();

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (this.customAudio) {
      this.customAudio.play().catch(() => {});
    } else {
      this.startSynthesizer();
    }
  }

  public startAutoplay() {
    if (this.isPlaying) return;

    // Attempt direct play immediately upon arriving at site
    try {
      this.play();
    } catch {
      // ignore
    }

    // Modern browsers require a user gesture if they block unprompted audio autoplay.
    // Register one-time touch/click/scroll listeners to automatically resume/start music on the first user action.
    const unlockEvents = ['click', 'touchstart', 'pointerdown', 'keydown', 'scroll'];
    const handleUnlock = () => {
      try {
        if (!this.isPlaying) {
          this.play();
        } else if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
      } catch {
        // ignore
      }
      unlockEvents.forEach((evt) => window.removeEventListener(evt, handleUnlock));
    };

    unlockEvents.forEach((evt) => window.addEventListener(evt, handleUnlock, { passive: true, once: true }));
  }

  public pause() {
    this.isPlaying = false;
    this.notify();

    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.stopSynthesizer();
  }

  public toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  // Play a soft wind chime / blessing bell on special interaction
  public playChime() {
    try {
      this.initAudioContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        this.playTone(freq, now + idx * 0.12, 3.5, 0.07);
      });
    } catch {
      // ignore
    }
  }

  // Play a subtle candle blow effect sound
  public playBlowSound() {
    try {
      this.initAudioContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      
      // White noise buffer for gentle breath
      const bufferSize = this.ctx.sampleRate * 1.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, now);
      filter.Q.setValueAtTime(1.5, now);
      
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      
      noise.start(now);
      noise.stop(now + 1.3);

      // Followed by sweet chime
      setTimeout(() => {
        this.playChime();
      }, 500);
    } catch {
      // ignore
    }
  }

  // Play realistic culinary cake slice sound & celebratory chime
  public playCakeCutSound() {
    try {
      this.initAudioContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      // Crisp clean culinary slice swish sound
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.45);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.1));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(350, now + 0.35);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      noise.start(now);
      noise.stop(now + 0.42);

      // Sweet celebratory ascending chime tones
      const notes = [659.25, 783.99, 987.77, 1318.51]; // E5, G5, B5, E6
      notes.forEach((freq, idx) => {
        this.playTone(freq, now + 0.18 + idx * 0.09, 2.5, 0.07);
      });
    } catch {
      // ignore
    }
  }

  // Play satisfying bite / eating sound effect + joyful chime
  public playEatSound() {
    try {
      this.initAudioContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      // Soft culinary bite / crunch burst
      const biteTimes = [0, 0.14, 0.28];
      biteTimes.forEach((bt) => {
        if (!this.ctx || !this.masterGain) return;
        const bSize = Math.floor(this.ctx.sampleRate * 0.09);
        const bBuffer = this.ctx.createBuffer(1, bSize, this.ctx.sampleRate);
        const bData = bBuffer.getChannelData(0);
        for (let i = 0; i < bSize; i++) {
          bData[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.02));
        }
        const bSource = this.ctx.createBufferSource();
        bSource.buffer = bBuffer;

        const bFilter = this.ctx.createBiquadFilter();
        bFilter.type = 'bandpass';
        bFilter.frequency.setValueAtTime(850 + Math.random() * 300, now + bt);
        bFilter.Q.setValueAtTime(3.0, now + bt);

        const bGain = this.ctx.createGain();
        bGain.gain.setValueAtTime(0.001, now + bt);
        bGain.gain.exponentialRampToValueAtTime(0.16, now + bt + 0.015);
        bGain.gain.exponentialRampToValueAtTime(0.001, now + bt + 0.08);

        bSource.connect(bFilter);
        bFilter.connect(bGain);
        bGain.connect(this.masterGain);
        bSource.start(now + bt);
        bSource.stop(now + bt + 0.09);
      });

      // Joyful ascending sparkle chime (C6, E6, G6)
      const chimes = [1046.50, 1318.51, 1567.98];
      chimes.forEach((f, i) => {
        this.playTone(f, now + 0.35 + i * 0.08, 2.0, 0.06);
      });
    } catch {
      // ignore
    }
  }

  // Realistic Jet Turbine Ascent & Contrail Wind for Airplane Transition
  public playPlaneTakeoffSound() {
    try {
      this.initAudioContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;

      // 1. Jet engine whoosh / filtered noise
      const bufferSize = Math.floor(this.ctx.sampleRate * 2.2);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(220, now);
      bandpass.frequency.exponentialRampToValueAtTime(1600, now + 1.2);
      bandpass.frequency.exponentialRampToValueAtTime(450, now + 2.0);
      bandpass.Q.setValueAtTime(2.2, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.25, now + 0.5);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 2.1);

      noise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      noise.start(now);
      noise.stop(now + 2.15);

      // 2. Rising turbine pitch
      const turbineOsc = this.ctx.createOscillator();
      const turbineGain = this.ctx.createGain();
      turbineOsc.type = 'sawtooth';
      turbineOsc.frequency.setValueAtTime(140, now);
      turbineOsc.frequency.exponentialRampToValueAtTime(480, now + 1.1);

      const turbineFilter = this.ctx.createBiquadFilter();
      turbineFilter.type = 'lowpass';
      turbineFilter.frequency.setValueAtTime(300, now);
      turbineFilter.frequency.exponentialRampToValueAtTime(1200, now + 1.1);

      turbineGain.gain.setValueAtTime(0.001, now);
      turbineGain.gain.exponentialRampToValueAtTime(0.09, now + 0.4);
      turbineGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      turbineOsc.connect(turbineFilter);
      turbineFilter.connect(turbineGain);
      turbineGain.connect(this.masterGain);
      turbineOsc.start(now);
      turbineOsc.stop(now + 1.6);

      // 3. Cabin Announcement 'Ding-Dong'
      const chimeTones = [587.33, 880]; // D5, A5
      chimeTones.forEach((freq, idx) => {
        this.playTone(freq, now + 0.15 + idx * 0.25, 2.5, 0.08);
      });
    } catch {
      // ignore
    }
  }

  // Triumphant Success Fanfare
  public playSuccessChime() {
    try {
      this.initAudioContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        this.playTone(freq, now + idx * 0.07, 3.0, 0.08);
      });
    } catch {
      // ignore
    }
  }

  // Card Flip Swish
  public playCardFlipSound() {
    try {
      this.initAudioContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(850, now + 0.08);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.06, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // ignore
    }
  }

  // Soft Bubble Pop / Tap Sound
  public playBubblePopSound() {
    try {
      this.initAudioContext();
      if (!this.ctx || !this.masterGain) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.06);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // ignore
    }
  }
}

export const soundscape = new SoundscapeEngine();
