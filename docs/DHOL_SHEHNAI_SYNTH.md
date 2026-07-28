# Synthesized Dhol & Melody Backup

This is the exact Web Audio API sequence logic used for generating the continuous upbeat Dhol and synthetic Shehnai/Melody using the lookahead scheduler. Save this in case you need to revert to this specific beat in the future.

```typescript
      const stepTime = 0.18; // Upbeat tempo
      let nextNoteTime = ctx.currentTime + 0.05;
      let currentStep = 0;

      const scheduleStep = (step: number, time: number) => {
        // --- DHOL BASS (Dum) on beats 1, 4, 5 ---
        if (step === 0 || step === 3 || step === 4) {
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
        if (step === 2 || step === 6) {
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
        
        // --- ENGAGING MELODY (Shehnai/Flute style) ---
        if (step % 2 !== 0 || step === 0) {
          const notes = [392.00, 440.00, 493.88, 587.33, 659.25, 783.99]; 
          const note = notes[Math.floor(Math.random() * notes.length)];
          
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'square';
          osc.frequency.setValueAtTime(note, time);
          
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.06, time + 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);
          
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.value = 2000;
          
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(time);
          osc.stop(time + 0.2);
        }
      };

      const scheduler = () => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        // Schedule notes slightly ahead of current time to ensure no gaps
        while (nextNoteTime < audioCtxRef.current.currentTime + 0.1) {
          scheduleStep(currentStep, nextNoteTime);
          nextNoteTime += stepTime;
          currentStep = (currentStep + 1) % 8;
        }
      };

      // Run scheduler frequently
      intervalRef.current = setInterval(scheduler, 25);
```
