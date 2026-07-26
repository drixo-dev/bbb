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

      // Pentatonic Raag Bhupali frequencies for authentic royal Indian vibe (Sa Re Ga Pa Dha)
      const ragaNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33];

      const playNote = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const note = ragaNotes[Math.floor(Math.random() * ragaNotes.length)];
        osc.type = 'triangle'; // Santoor-like metallic pluck tone
        osc.frequency.setValueAtTime(note, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 2.0);
      };

      playNote();
      intervalRef.current = setInterval(playNote, 600);
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

  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full bg-maroon-700/90 border border-gold-antique text-gold-champagne shadow-gold-glow hover:scale-105 transition-all duration-300 backdrop-blur-md group"
      title={isPlaying ? "Mute Royal Background Music" : "Play Royal Indian Ambiance"}
    >
      <div className="relative">
        <Music className={`w-5 h-5 ${isPlaying ? 'animate-bounce text-gold-warm' : 'text-gold-antique'}`} />
        {isPlaying && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold-champagne rounded-full animate-ping" />
        )}
      </div>
      <span className="font-marcellus text-sm font-semibold tracking-wider hidden sm:inline">
        {isPlaying ? "Santoor Ambiance ON" : "Play Shehnai / Santoor"}
      </span>
      {isPlaying ? (
        <Volume2 className="w-4 h-4 text-emerald-400" />
      ) : (
        <VolumeX className="w-4 h-4 text-maroon-400 group-hover:text-gold-champagne" />
      )}
    </button>
  );
}
