"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Petal {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

export default function FloatingFlowers() {
  const [petals, setPetals] = useState<Petal[]>([]);

  useEffect(() => {
    const generatedPetals: Petal[] = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 14 + 10,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 8,
      color: i % 3 === 0 ? '#D97706' : i % 3 === 1 ? '#E8C96B' : '#D4AF37'
    }));
    setPetals(generatedPetals);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{
            y: -50,
            x: `${petal.x}vw`,
            rotate: 0,
            opacity: 0
          }}
          animate={{
            y: '105vh',
            x: [`${petal.x}vw`, `${petal.x + 5}vw`, `${petal.x - 5}vw`, `${petal.x}vw`],
            rotate: 360,
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{
            duration: petal.duration,
            repeat: Infinity,
            delay: petal.delay,
            ease: "easeInOut"
          }}
          className="absolute"
          style={{ width: petal.size, height: petal.size }}
        >
          {/* Marigold Petal / Golden Sparkle SVG Shape */}
          <svg viewBox="0 0 24 24" fill={petal.color} className="w-full h-full drop-shadow-md">
            <path d="M12,2 C13,6 17,7 20,8 C17,11 16,15 17,19 C13,17 9,18 7,20 C8,16 6,13 2,12 C6,10 7,6 8,2 C10,5 11,2 12,2 Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
