"use client";

import React, { useEffect, useState } from 'react';

export default function GoldenCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out hidden lg:block"
      style={{
        transform: `translate3d(${pos.x - 12}px, ${pos.y - 12}px, 0)`
      }}
    >
      <div className="w-6 h-6 rounded-full bg-gold-champagne/30 border border-gold-antique blur-[1px] shadow-gold-glow animate-pulse" />
    </div>
  );
}
