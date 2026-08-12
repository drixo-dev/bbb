"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, MapPin, ChevronDown, RefreshCw } from 'lucide-react';
import ResumeRegistrationModal from './ResumeRegistrationModal';
import RegistrationClosedModal from './RegistrationClosedModal';

export default function Hero() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isClosedModalOpen, setIsClosedModalOpen] = useState(false);

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
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900/60 border border-emerald-700/50">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-100">August 22, 2026</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900/60 border border-emerald-700/50">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <a href="https://maps.app.goo.gl/PzGUtiguipyvSKdD9" target="_blank" rel="noopener noreferrer" className="text-emerald-100 underline hover:text-emerald-200 transition-colors">The Serene Garden</a>
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

            <button
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('passes')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-maroon-900/80 hover:bg-maroon-800 text-gold-champagne font-marcellus font-semibold text-base tracking-widest uppercase border border-gold-antique/50 hover:border-gold-champagne transition-all duration-300"
            >
              Explore Passes
            </button>
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

        {/* Sponsors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 mb-4 flex flex-col sm:flex-row items-center justify-center gap-16 sm:gap-32 relative z-20 w-full"
        >
          {/* Co-sponsor */}
          <div className="flex flex-col items-center group">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 w-full">
              <div className="h-[2px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-gold-antique opacity-80" />
              <h3 className="font-cinzel text-2xl sm:text-3xl text-gold-gradient font-extrabold tracking-widest uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)] text-center whitespace-nowrap">
                Co-Sponsor
              </h3>
              <div className="h-[2px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-gold-antique opacity-80" />
            </div>
            <div className="relative transition-transform duration-500 hover:-translate-y-2">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gold-champagne rounded-2xl blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
              {/* Image Container */}
              <div className="relative bg-white/95 p-3 sm:p-4 rounded-2xl border-[3px] border-gold-antique/60 group-hover:border-gold-champagne shadow-[0_10px_30px_rgba(212,175,55,0.3)] flex items-center justify-center overflow-hidden">
                <img src="/images/dragon-logo.png" alt="Dragon Tattoo Logo" className="h-32 sm:h-48 w-auto object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply scale-110 sm:scale-125" />
              </div>
            </div>
          </div>

          {/* Photobooth partner */}
          <div className="flex flex-col items-center group mt-4 sm:mt-0">
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 w-full">
              <div className="h-[2px] w-4 sm:w-8 bg-gradient-to-r from-transparent to-gold-antique opacity-80" />
              <h3 className="font-cinzel text-2xl sm:text-3xl text-gold-gradient font-extrabold tracking-widest uppercase drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)] text-center whitespace-nowrap">
                Photobooth Partner
              </h3>
              <div className="h-[2px] w-4 sm:w-8 bg-gradient-to-l from-transparent to-gold-antique opacity-80" />
            </div>
            <div className="relative transition-transform duration-500 hover:-translate-y-2">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gold-champagne rounded-2xl blur-xl opacity-20 group-hover:opacity-60 transition-opacity duration-500"></div>
              {/* Image directly with styling to avoid white border. The image acts as its own container. */}
              <img 
                src="/images/piclelo-logo.png" 
                alt="Piclelo Logo" 
                className="relative h-[152px] sm:h-[224px] w-auto rounded-2xl border-[3px] border-gold-antique/60 group-hover:border-gold-champagne shadow-[0_10px_30px_rgba(212,175,55,0.3)] object-contain transition-transform duration-500 group-hover:scale-105" 
                style={{ backgroundColor: 'transparent' }} 
              />
            </div>
          </div>
        </motion.div>

      </div>

      <ResumeRegistrationModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />

      <RegistrationClosedModal
        isOpen={isClosedModalOpen}
        onClose={() => setIsClosedModalOpen(false)}
      />
    </section>
  );
}
