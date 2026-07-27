"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, MapPin, ChevronDown, RefreshCw } from 'lucide-react';
import ResumeRegistrationModal from './ResumeRegistrationModal';

export default function Hero() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden royal-damask-bg">
      {/* Soft Ambient Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-maroon-600/40 via-maroon-800/80 to-maroon-900 pointer-events-none" />

      {/* Hanging Indian Umbrellas Decorative Top Graphic */}
      <div className="absolute top-0 left-0 right-0 flex justify-around pointer-events-none z-10 opacity-80">
        {[1, 2, 3, 4, 5].map((item, idx) => (
          <motion.div
            key={item}
            animate={{ rotate: [ -3, 3, -3 ] }}
            transition={{ duration: 5 + idx, repeat: Infinity, ease: 'easeInOut' }}
            className={`flex flex-col items-center origin-top ${idx % 2 === 1 ? 'hidden sm:flex' : 'flex'}`}
          >
            <div className="w-0.5 h-16 sm:h-24 bg-gradient-to-b from-gold-antique/60 to-gold-champagne" />
            <div className="relative -mt-1">
              <svg width="70" height="40" viewBox="0 0 100 60" fill="none" className="drop-shadow-lg">
                <path d="M0 60 C20 10, 80 10, 100 60 Z" fill="url(#umbrellaGrad)" stroke="#D4AF37" strokeWidth="2" />
                <path d="M0 60 C30 50, 70 50, 100 60" fill="none" stroke="#E8C96B" strokeWidth="1.5" />
                <circle cx="50" cy="10" r="4" fill="#D4AF37" />
                <defs>
                  <linearGradient id="umbrellaGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#D4AF37" />
                    <stop offset="50%" stopColor="#6E1529" />
                    <stop offset="100%" stopColor="#D97706" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Tassel */}
              <div className="w-1 h-4 bg-gold-champagne mx-auto rounded-b-full shadow-gold-glow" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hero Central Royal Card */}
      <div className="relative z-20 max-w-4xl w-full mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="box-gold-frame rounded-3xl p-8 sm:p-14 backdrop-blur-md shadow-2xl relative"
        >
          <div className="corner-ornament corner-tl" />
          <div className="corner-ornament corner-tr" />
          <div className="corner-ornament corner-bl" />
          <div className="corner-ornament corner-br" />

          {/* Subheader Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-maroon-900/80 border border-gold-antique/60 mb-6 shadow-inner">
            <Sparkles className="w-4 h-4 text-gold-champagne animate-spin" />
            <span className="font-marcellus text-xs sm:text-sm tracking-[0.3em] text-gold-champagne uppercase">
              The Most Awaited Grand Welcome
            </span>
            <Sparkles className="w-4 h-4 text-gold-champagne animate-spin" />
          </div>

          {/* Main Title: BAND BAAJA BAARAT */}
          <h1 className="font-cinzel text-4xl sm:text-6xl md:text-7xl font-extrabold text-gold-gradient tracking-wider leading-tight mb-2 uppercase drop-shadow-xl">
            BAND BAAJA<br />
            <span className="text-gold-bright">BAARAT</span>
          </h1>

          {/* Subtitle Ornament Banner */}
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-gold-antique" />
            <span className="font-cormorant text-2xl sm:text-3xl text-gold-champagne italic font-semibold tracking-widest">
              FRESHERS 2026
            </span>
            <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-gold-antique" />
          </div>

          <p className="font-poppins text-sm sm:text-base text-royal-ivory/90 max-w-2xl mx-auto mb-8 leading-relaxed">
            Step into an enchanting evening of royal traditions, mesmerizing music, grand feasts, high energy, and unforgettable memories. Dress in your finest ethnic attire and join the Baarat!
          </p>

          {/* Event Details Quick Tags */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-xs sm:text-sm text-gold-champagne font-marcellus">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-maroon-900/60 border border-gold-antique/30">
              <Calendar className="w-4 h-4 text-gold-antique" />
              <span>August 22, 2026 • 5:00 PM onwards</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-maroon-900/60 border border-gold-antique/30">
              <MapPin className="w-4 h-4 text-gold-antique" />
              <span>Grand Palace Auditorium</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 flex-wrap">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique text-maroon-900 font-marcellus font-bold text-base tracking-widest uppercase shadow-gold-intense hover:scale-105 transition-all duration-300 border-2 border-gold-champagne flex items-center justify-center gap-3 group"
            >
              <span>Book Royal Pass Now</span>
              <span className="group-hover:translate-x-1 transition-transform">👑</span>
            </Link>

            <Link
              href="#passes"
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-maroon-900/80 hover:bg-maroon-800 text-gold-champagne font-marcellus font-semibold text-base tracking-widest uppercase border border-gold-antique/50 hover:border-gold-champagne transition-all duration-300"
            >
              Explore Passes
            </Link>
          </div>

          {/* Find My Registration Link */}
          <div className="mt-8 pt-6 border-t border-gold-antique/20">
            <p className="font-poppins text-xs text-royal-ivory/60 mb-2">Already Registered?</p>
            <button 
              onClick={() => setIsResumeModalOpen(true)}
              className="font-marcellus text-sm font-bold text-gold-champagne hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Find My Registration / View Pass
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator Arrow */}
        <div className="mt-8 flex justify-center">
          <Link href="#countdown" className="text-gold-champagne/70 hover:text-gold-champagne animate-bounce p-2">
            <ChevronDown className="w-8 h-8" />
          </Link>
        </div>
      </div>

      <ResumeRegistrationModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </section>
  );
}
