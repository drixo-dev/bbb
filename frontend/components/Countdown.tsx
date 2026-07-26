"use client";

import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-08-22T17:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="py-16 px-4 relative bg-maroon-900 border-y border-gold-antique/30">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-marcellus text-xs sm:text-sm tracking-[0.3em] text-gold-antique uppercase mb-2">
          The Grand Celebration Begins In
        </p>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-gradient mb-8">
          COUNTDOWN TO THE BAARAT
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {timeBlocks.map((item) => (
            <div
              key={item.label}
              className="box-gold-frame rounded-2xl p-4 sm:p-6 text-center bg-maroon-800 shadow-xl group hover:scale-105 transition-transform duration-300"
            >
              <div className="corner-ornament corner-tl" />
              <div className="corner-ornament corner-tr" />
              <div className="corner-ornament corner-bl" />
              <div className="corner-ornament corner-br" />

              <span className="font-playfair text-3xl sm:text-5xl font-extrabold text-gold-bright block mb-1">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-marcellus text-xs uppercase text-gold-champagne tracking-widest block">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
