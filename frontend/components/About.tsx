"use client";

import React from 'react';
import { Crown, Sparkles, HeartHandshake, Music, Utensils, Award } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Crown,
      title: "Royal Red Carpet Entry",
      desc: "Receive a magnificent traditional welcome with Dhol beats, floral showers, and royal tilak."
    },
    {
      icon: Music,
      title: "Live DJ & Shehnai Beats",
      desc: "An unforgettable fusion of high-energy Bollywood Freshers beats, Shehnai melodies, and cultural dances."
    },
    {
      icon: Utensils,
      title: "Grand Royal Feast",
      desc: "Indulge in a royal multi-course Indian banquet including rich laddoos, street delicacies, and mocktails."
    },
    {
      icon: Award,
      title: "Mr. & Ms. Baarati 2026",
      desc: "Compete for prestigious titles, royal sashes, crowns, and exciting prizes on stage!"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 relative bg-maroon-800/80 royal-damask-bg">
      <div className="max-w-5xl mx-auto">
        <div className="box-gold-frame rounded-3xl p-8 sm:p-14 bg-maroon-900/90 text-center relative shadow-2xl">
          <div className="corner-ornament corner-tl" />
          <div className="corner-ornament corner-tr" />
          <div className="corner-ornament corner-bl" />
          <div className="corner-ornament corner-br" />

          {/* Header */}
          <div className="flex justify-center mb-3 text-gold-champagne">
            <HeartHandshake className="w-10 h-10 animate-float" />
          </div>

          <p className="font-marcellus text-xs sm:text-sm tracking-[0.3em] text-gold-antique uppercase mb-2">
            Royalty Beckons You
          </p>

          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-gold-gradient mb-6">
            ABOUT THE ROYAL CELEBRATION
          </h2>

          <div className="w-32 h-[1.5px] bg-gradient-to-r from-transparent via-gold-antique to-transparent mx-auto mb-8" />

          <p className="font-cormorant text-xl sm:text-2xl text-royal-ivory italic leading-relaxed max-w-3xl mx-auto mb-10">
            &ldquo;Band Baaja Baarat 2026 is not just a college freshers party; it is a royal extravaganza designed like a timeless Indian royal wedding celebration. We welcome every fresher into our college family with regal grandeur, traditional warmth, and joyous festivities.&rdquo;
          </p>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-maroon-800/80 border border-gold-antique/30 hover:border-gold-champagne transition-all duration-300 flex items-start gap-4 group hover:shadow-gold-glow"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-antique/10 border border-gold-antique/50 flex items-center justify-center text-gold-champagne shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-marcellus text-lg font-bold text-gold-bright mb-1">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-xs sm:text-sm text-royal-ivory/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dress Code Highlight */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-gold-antique/20 via-maroon-800 to-gold-antique/20 border border-gold-antique/60 text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-gold-champagne">
              <Sparkles className="w-5 h-5" />
              <span className="font-marcellus font-bold text-sm tracking-widest uppercase">
                Royal Dress Code
              </span>
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="font-poppins text-xs sm:text-sm text-gold-warm">
              <strong>Gentlemen:</strong> Royal Sherwanis, Kurta Pyjamas, or Nehru Jackets • <strong>Ladies:</strong> Regal Sarees, Lehengas, or Ethnic Anarkalis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
