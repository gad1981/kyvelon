import type { CubeFaceId } from "@/lib/cube-faces";

export const FACE_SOUND_KEY = "kyvelon-face-sound";

export type FaceSoundProfile = {
  /** Soft pad fundamentals (Hz). */
  tones: number[];
  /** Low-pass colour. */
  filter: number;
  /** Gentle amplitude LFO rate. */
  breathe: number;
  /** Stereo pan −1…1 */
  pan: number;
  /** Optional soft pulse (automation). */
  pulseHz?: number;
  /** Enter chime frequencies. */
  chime: number[];
};

export const FACE_SOUNDS: Record<CubeFaceId, FaceSoundProfile> = {
  software: {
    tones: [55, 82.5, 110],
    filter: 420,
    breathe: 0.08,
    pan: -0.25,
    chime: [220, 330, 440],
  },
  websites: {
    tones: [65.4, 98, 196],
    filter: 560,
    breathe: 0.11,
    pan: 0.15,
    chime: [261.6, 392, 523.3],
  },
  automation: {
    tones: [49, 73.4, 98],
    filter: 380,
    breathe: 0.14,
    pan: 0,
    pulseHz: 1.25,
    chime: [185, 277, 370],
  },
  services: {
    tones: [61.7, 92.5, 123.5],
    filter: 480,
    breathe: 0.07,
    pan: 0.2,
    chime: [196, 247, 311],
  },
  method: {
    tones: [58.3, 87.3, 174.6],
    filter: 500,
    breathe: 0.09,
    pan: -0.1,
    chime: [174.6, 220, 261.6],
  },
  contact: {
    tones: [52, 78, 156],
    filter: 450,
    breathe: 0.1,
    pan: 0.05,
    chime: [233, 311, 466],
  },
};

export function readSoundPref(): boolean {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(FACE_SOUND_KEY) === "on";
}

export function writeSoundPref(on: boolean) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(FACE_SOUND_KEY, on ? "on" : "off");
}

type Voice = {
  osc: OscillatorNode;
  gain: GainNode;
};

export class FaceSoundEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private voices: Voice[] = [];
  private pulse: OscillatorNode | null = null;
  private pulseGain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private faceId: CubeFaceId | null = null;
  private wanted = false;

  async ensure(): Promise<AudioContext> {
    if (!this.ctx) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }
    return this.ctx;
  }

  async setEnabled(on: boolean) {
    this.wanted = on;
    writeSoundPref(on);
    if (!on) {
      this.fadeOut();
      return;
    }
    await this.ensure();
  }

  isWanted() {
    return this.wanted;
  }

  async enter(faceId: CubeFaceId, opts: { chime?: boolean } = {}) {
    this.faceId = faceId;
    if (!this.wanted) return;

    const ctx = await this.ensure();
    const profile = FACE_SOUNDS[faceId];
    this.stopVoices(0.05);

    const master = this.master!;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = profile.filter;
    filter.Q.value = 0.7;
    this.filter = filter;

    const panner = ctx.createStereoPanner();
    panner.pan.value = profile.pan;

    filter.connect(panner);
    panner.connect(master);

    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = profile.breathe;
    lfoGain.gain.value = 0.012;
    lfo.connect(lfoGain);
    this.lfo = lfo;
    this.lfoGain = lfoGain;
    lfo.start();

    this.voices = profile.tones.map((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === 0 ? "sine" : i === 1 ? "triangle" : "sine";
      osc.frequency.value = freq;
      gain.gain.value = i === 0 ? 0.045 : 0.028;
      lfoGain.connect(gain.gain);
      osc.connect(gain);
      gain.connect(filter);
      osc.start();
      return { osc, gain };
    });

    if (profile.pulseHz) {
      const pulse = ctx.createOscillator();
      const pulseGain = ctx.createGain();
      const pulseLfo = ctx.createOscillator();
      const pulseDepth = ctx.createGain();
      pulse.type = "sine";
      pulse.frequency.value = 880;
      pulseGain.gain.value = 0;
      pulseLfo.frequency.value = profile.pulseHz;
      pulseDepth.gain.value = 0.008;
      pulseLfo.connect(pulseDepth);
      pulseDepth.connect(pulseGain.gain);
      pulse.connect(pulseGain);
      pulseGain.connect(filter);
      pulse.start();
      pulseLfo.start();
      this.pulse = pulse;
      this.pulseGain = pulseGain;
    }

    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0.85, now + 1.4);

    if (opts.chime !== false) {
      this.playChime(profile.chime);
    }
  }

  private playChime(freqs: number[]) {
    if (!this.ctx || !this.master) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      const t0 = now + i * 0.12;
      gain.gain.setValueAtTime(0, t0);
      gain.gain.linearRampToValueAtTime(0.07, t0 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.9);
      osc.connect(gain);
      gain.connect(this.master!);
      osc.start(t0);
      osc.stop(t0 + 1);
    });
  }

  private stopVoices(fade = 0.4) {
    const ctx = this.ctx;
    if (!ctx || !this.master) {
      this.voices = [];
      return;
    }
    const now = ctx.currentTime;
    this.voices.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0.0001, now + fade);
        osc.stop(now + fade + 0.05);
      } catch {
        /* already stopped */
      }
    });
    if (this.pulse) {
      try {
        this.pulse.stop(now + fade);
      } catch {
        /* */
      }
    }
    if (this.lfo) {
      try {
        this.lfo.stop(now + fade);
      } catch {
        /* */
      }
    }
    this.voices = [];
    this.pulse = null;
    this.pulseGain = null;
    this.lfo = null;
    this.lfoGain = null;
    this.filter = null;
  }

  private fadeOut() {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(0, now + 0.5);
    window.setTimeout(() => this.stopVoices(0.1), 520);
  }

  dispose() {
    this.fadeOut();
    window.setTimeout(() => {
      void this.ctx?.close();
      this.ctx = null;
      this.master = null;
    }, 600);
  }
}
