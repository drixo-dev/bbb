"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-maroon-950 p-4"
        >
          <Image 
            src="/images/invitation-bg.jpeg" 
            alt="Invitation Background" 
            fill 
            className="object-cover opacity-15 z-0"
            priority
          />
          <div className="relative z-10 max-w-lg w-full">
            {/* Outer Royal Glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique opacity-75 blur-lg animate-pulse-glow" />

            {/* Envelope Body */}
            <div className="relative box-gold-frame rounded-2xl p-8 text-center bg-maroon-950 shadow-2xl overflow-hidden">
              {/* Background Photo for the Invitation */}
              <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
                <Image 
                  src="/images/uploaded/img-8.jpg" 
                  alt="Royal Background" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/80 to-maroon-950/90 z-0" />
              
              <div className="relative z-10">
                <div className="corner-ornament corner-tl" />
                <div className="corner-ornament corner-tr" />
                <div className="corner-ornament corner-bl" />
                <div className="corner-ornament corner-br" />

              {/* Decorative Top Crest */}
              <div className="flex justify-center mb-4 text-gold-champagne">
                <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain animate-float" />
              </div>

              <p className="font-marcellus text-sm tracking-[0.3em] text-gold-antique uppercase mb-1">
                Cordially Invited To
              </p>
              
              <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-gold-gradient mb-1 tracking-wide">
                BAND BAAJA BAARAT
              </h1>
              <p className="font-marcellus text-sm sm:text-base text-gold-champagne tracking-widest uppercase mb-3">
                By Taranova Pizza
              </p>
              
              <p className="font-cormorant text-xl text-royal-ivory italic mb-6">
                Freshers 2026 • Royal Celebration
              </p>


              {/* Royal Wax Seal Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-gold-dark via-gold-antique to-gold-champagne shadow-gold-intense cursor-pointer group"
              >
                <div className="absolute inset-1 rounded-full border-2 border-dashed border-maroon-900 opacity-60" />
                <div className="flex flex-col items-center justify-center text-maroon-900 font-cinzel font-bold">
                  <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain object-contain mb-0.5" />
                  <span className="text-xs tracking-tighter">BBB 2026</span>
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-gold-warm animate-spin" />
              </motion.button>

              <p className="mt-4 font-marcellus text-xs text-gold-champagne/70 tracking-widest uppercase">
                Click to Open Invitation
              </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
