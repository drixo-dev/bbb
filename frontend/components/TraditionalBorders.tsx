"use client";

import React from 'react';

export default function TraditionalBorders() {
  return (
    <>
      {/* Left Floral Border Banner */}
      <div className="fixed top-0 left-0 bottom-0 w-8 sm:w-16 pointer-events-none z-30 opacity-70 hidden md:block">
        <div className="h-full w-full bg-gradient-to-r from-gold-antique/20 via-maroon-700/40 to-transparent border-r border-gold-antique/30 flex flex-col justify-between py-6 items-center">
          <div className="text-gold-antique font-cinzel text-xs rotate-90 origin-center whitespace-nowrap tracking-[0.4em] uppercase opacity-75">
            ✦ Band Baaja Baarat 2026 ✦
          </div>
          <div className="w-6 h-48 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-champagne/40 via-gold-antique/20 to-transparent rounded-full blur-sm" />
          <div className="text-gold-antique font-cinzel text-xs -rotate-90 origin-center whitespace-nowrap tracking-[0.4em] uppercase opacity-75">
            ✦ Freshers Celebration ✦
          </div>
        </div>
      </div>

      {/* Right Floral Border Banner */}
      <div className="fixed top-0 right-0 bottom-0 w-8 sm:w-16 pointer-events-none z-30 opacity-70 hidden md:block">
        <div className="h-full w-full bg-gradient-to-l from-gold-antique/20 via-maroon-700/40 to-transparent border-l border-gold-antique/30 flex flex-col justify-between py-6 items-center">
          <div className="text-gold-antique font-cinzel text-xs -rotate-90 origin-center whitespace-nowrap tracking-[0.4em] uppercase opacity-75">
            ✦ Band Baaja Baarat 2026 ✦
          </div>
          <div className="w-6 h-48 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-champagne/40 via-gold-antique/20 to-transparent rounded-full blur-sm" />
          <div className="text-gold-antique font-cinzel text-xs rotate-90 origin-center whitespace-nowrap tracking-[0.4em] uppercase opacity-75">
            ✦ Royal Invitation ✦
          </div>
        </div>
      </div>
    </>
  );
}
