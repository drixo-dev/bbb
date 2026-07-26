"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Crown } from 'lucide-react';

interface EnvelopeOpeningProps {
  onOpen: () => void;
}

export default function EnvelopeOpening({ onOpen }: EnvelopeOpeningProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      onOpen();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-maroon-900/95 backdrop-blur-xl p-4"
        >
          <div className="relative max-w-lg w-full">
            {/* Outer Royal Glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique opacity-75 blur-lg animate-pulse-glow" />

            {/* Envelope Body */}
            <div className="relative box-gold-frame rounded-2xl p-8 text-center bg-maroon-800 shadow-2xl overflow-hidden">
              <div className="corner-ornament corner-tl" />
              <div className="corner-ornament corner-tr" />
              <div className="corner-ornament corner-bl" />
              <div className="corner-ornament corner-br" />

              {/* Decorative Top Crest */}
              <div className="flex justify-center mb-4 text-gold-champagne">
                <Crown className="w-12 h-12 animate-float" />
              </div>

              <p className="font-marcellus text-sm tracking-[0.3em] text-gold-antique uppercase mb-1">
                Cordially Invited To
              </p>
              
              <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient mb-2 tracking-wide">
                BAND BAAJA BAARAT
              </h1>
              
              <p className="font-cormorant text-xl text-royal-ivory italic mb-6">
                Freshers 2026 • Royal Celebration
              </p>

              <div className="my-6 py-4 border-y border-gold-antique/30">
                <p className="font-poppins text-xs text-gold-warm/80 leading-relaxed uppercase tracking-widest">
                  Tap the Royal Wax Seal to Unfold your Invitation
                </p>
              </div>

              {/* Royal Wax Seal Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-gold-dark via-gold-antique to-gold-champagne shadow-gold-intense cursor-pointer group"
              >
                <div className="absolute inset-1 rounded-full border-2 border-dashed border-maroon-900 opacity-60" />
                <div className="flex flex-col items-center justify-center text-maroon-900 font-cinzel font-bold">
                  <Crown className="w-6 h-6 mb-0.5" />
                  <span className="text-xs tracking-tighter">BBB 2026</span>
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-gold-warm animate-spin" />
              </motion.button>

              <p className="mt-4 font-marcellus text-xs text-gold-champagne/70 tracking-widest uppercase">
                Click to Open Invitation
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
