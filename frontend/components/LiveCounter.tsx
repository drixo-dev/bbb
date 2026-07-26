"use client";

import React, { useEffect, useState } from 'react';
import { Users, ShieldCheck } from 'lucide-react';

export default function LiveCounter() {
  const [count, setCount] = useState(342);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live registered baaratis incremental counter
      setCount((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-maroon-900/90 border border-gold-antique/50 shadow-gold-glow">
      <div className="w-8 h-8 rounded-full bg-gold-antique/20 flex items-center justify-center text-gold-champagne">
        <Users className="w-4 h-4 animate-pulse" />
      </div>
      <div className="text-left">
        <div className="flex items-center gap-1.5 font-playfair text-lg font-bold text-gold-bright">
          <span>{count} Baaratis Joined</span>
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
        </div>
        <p className="font-poppins text-[10px] text-royal-ivory/70 tracking-wide uppercase">
          Live Registrations • Passes Filling Fast!
        </p>
      </div>
    </div>
  );
}
