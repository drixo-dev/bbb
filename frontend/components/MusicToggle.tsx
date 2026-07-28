"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  const startMusic = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const stepTime = 0.18; // Upbeat tempo
      let nextNoteTime = ctx.currentTime + 0.05;
      let currentStep = 0;

      const scheduleStep = (step: number, time: number) => {
        const drumStep = step % 8;
        
        // --- DHOL BASS (Dum) on beats 1, 4, 5 ---
        if (drumStep === 0 || drumStep === 3 || drumStep === 4) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.frequency.setValueAtTime(150, time);
          osc.frequency.exponentialRampToValueAtTime(30, time + 0.2);
          gain.gain.setValueAtTime(1, time);
          gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(time);
          osc.stop(time + 0.2);
        }
        
        // --- DHOL TREBLE (Ta) on beats 3, 7 ---
        if (drumStep === 2 || drumStep === 6) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(450, time);
          gain.gain.setValueAtTime(0.4, time);
          gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(time);
          osc.stop(time + 0.1);
        }
        
        // --- EXCITING & UPBEAT BARAAT MELODY ---
        // 32-step sequence. Fast, bouncy, and high-energy! (Pitched down for comfort)
        const melody = [
          // Part 1: High energy syncopated jump
          { step: 0,  note: 329.63, length: 3 },  // E4 (da--)
          { step: 3,  note: 392.00, length: 1 },  // G4 (da)
          { step: 4,  note: 440.00, length: 4 },  // A4 (daa--)
          { step: 8,  note: 523.25, length: 2 },  // C5 (da)
          { step: 10, note: 440.00, length: 2 },  // A4 (da)
          { step: 12, note: 392.00, length: 4 },  // G4 (daa--)
          
          // Part 2: Joyful descending resolve
          { step: 16, note: 329.63, length: 3 },  // E4 (da--)
          { step: 19, note: 293.66, length: 1 },  // D4 (da)
          { step: 20, note: 261.63, length: 4 },  // C4 (daa--)
          { step: 24, note: 293.66, length: 2 },  // D4 (da)
          { step: 26, note: 329.63, length: 2 },  // E4 (da)
          { step: 28, note: 293.66, length: 4 }   // D4 (daa--)
        ];
        
        const noteObj = melody.find(m => m.step === step);
        if (noteObj) {
          const duration = noteObj.length * stepTime; // Calculate exact hold time
          
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sawtooth'; // Sawtooth for the reedy, nasal tone
          osc.frequency.setValueAtTime(noteObj.note, time);
          
          // Vibrato LFO (Meend/Gamak effect)
          const lfo = ctx.createOscillator();
          lfo.type = 'sine';
          lfo.frequency.setValueAtTime(5, time); // 5 Hz vibrato speed
          const lfoGain = ctx.createGain();
          lfoGain.gain.setValueAtTime(6, time); // Depth of vibrato
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency); // Modulate oscillator frequency
          lfo.start(time);
          lfo.stop(time + duration);
          
          // Legato Envelope (___ ___)
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.03, time + 0.15); // Softer volume
          gain.gain.setValueAtTime(0.03, time + duration - 0.2); // Sustain the note!
          gain.gain.exponentialRampToValueAtTime(0.001, time + duration); // Smooth release
          
          // Bandpass filter for distinct acoustic resonance (lowered frequency to reduce harshness)
          const filter = ctx.createBiquadFilter();
          filter.type = 'bandpass';
          filter.frequency.value = 1100; // Softer, warmer nasal frequency
          filter.Q.value = 1.0; // Less piercing resonance
          
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(time);
          osc.stop(time + duration);
        }
      };

      const scheduler = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        // Schedule notes slightly ahead of current time to ensure no gaps
        while (nextNoteTime < audioCtxRef.current.currentTime + 0.1) {
          scheduleStep(currentStep, nextNoteTime);
          nextNoteTime += stepTime;
          currentStep = (currentStep + 1) % 32;
        }
      };

      // Run scheduler frequently
      intervalRef.current = setInterval(scheduler, 25);
      setIsPlaying(true);
    } catch (e) {
      console.warn('Audio Context init error:', e);
    }
  };

  const stopMusic = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const hasStarted = useRef(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasStarted.current) {
        hasStarted.current = true;
        startMusic();
        
        // Remove listeners once audio is triggered
        window.removeEventListener('click', handleFirstInteraction);
        window.removeEventListener('scroll', handleFirstInteraction);
        window.removeEventListener('keydown', handleFirstInteraction);
        window.removeEventListener('touchstart', handleFirstInteraction);
      }
    };

    // Listen for any user interaction to bypass browser autoplay policy
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('scroll', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      stopMusic();
    };
  }, []);

  // Return nothing, making the music permanent with no mute button
  return null;
}
