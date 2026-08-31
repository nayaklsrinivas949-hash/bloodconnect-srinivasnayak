/**
 * BloodConnect 3D - Web Audio API Synthesizer
 * Generates procedural, low-latency audio effects without external asset dependencies.
 */

class SoundFX {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('bloodconnect_audio_muted') === 'true';
  }

  _initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('bloodconnect_audio_muted', String(this.isMuted));
    return this.isMuted;
  }

  /**
   * Heartbeat sound effect (lub-dub)
   */
  playHeartbeat() {
    if (this.isMuted) return;
    this._initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Lub (Low tone)
    this._playThump(now, 65, 0.12, 0.25);
    // Dub (Slightly higher, delayed)
    this._playThump(now + 0.18, 85, 0.10, 0.2);
  }

  _playThump(time, freq, duration, gainVal) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + duration);

    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  /**
   * Radar Sonar Sweep Ping
   */
  playRadarPing() {
    if (this.isMuted) return;
    this._initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(450, now + 0.4);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  }

  /**
   * High-Intensity Emergency SOS Alert Siren
   * Generates a realistic multi-cycle dual-tone emergency ambulance/hospital siren
   */
  playEmergencySiren(repeatCycles = 3) {
    if (this.isMuted) return;
    this._initContext();
    if (!this.ctx) return;

    const startTime = this.ctx.currentTime;
    const cycleDuration = 0.45;

    for (let i = 0; i < repeatCycles; i++) {
      const cycleStart = startTime + (i * cycleDuration);

      // Primary Siren Oscillator (High-Low Modulated Sawtooth)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(680, cycleStart);
      osc1.frequency.linearRampToValueAtTime(1180, cycleStart + (cycleDuration * 0.5));
      osc1.frequency.linearRampToValueAtTime(680, cycleStart + cycleDuration);

      gain1.gain.setValueAtTime(0.22, cycleStart);
      gain1.gain.linearRampToValueAtTime(0.28, cycleStart + (cycleDuration * 0.5));
      gain1.gain.exponentialRampToValueAtTime(0.001, cycleStart + cycleDuration);

      // Secondary Harmonized Warning Tone (Sine Wave Layer)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, cycleStart);
      osc2.frequency.linearRampToValueAtTime(1350, cycleStart + (cycleDuration * 0.5));
      osc2.frequency.linearRampToValueAtTime(880, cycleStart + cycleDuration);

      gain2.gain.setValueAtTime(0.18, cycleStart);
      gain2.gain.linearRampToValueAtTime(0.22, cycleStart + (cycleDuration * 0.5));
      gain2.gain.exponentialRampToValueAtTime(0.001, cycleStart + cycleDuration);

      // Audio Routing
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc1.start(cycleStart);
      osc1.stop(cycleStart + cycleDuration);
      osc2.start(cycleStart);
      osc2.stop(cycleStart + cycleDuration);
    }
  }

  /**
   * Success / Points Awarded Chime (Arpeggio)
   */
  playSuccessChime() {
    if (this.isMuted) return;
    this._initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const time = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.18, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + 0.35);
    });
  }

  /**
   * Coin / Voucher Redeem Sound
   */
  playCoinClink() {
    if (this.isMuted) return;
    this._initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [1500, 2200];
    freqs.forEach(f => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    });
  }
}

window.soundFX = new SoundFX();
