"use client";

import React from 'react';
import Image from 'next/image';
import { Crown, Sparkles, HeartHandshake, Music, Utensils, Award } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Crown,
      title: "Phoolon Ki Holi",
      desc: "Receive a magnificent traditional welcome with vibrant floral showers, Dhol beats, and a royal tilak."
    },
    {
      icon: Music,
      title: "A Fake Wedding Setup Like No Other",
      desc: "Experience the ultimate Baarat vibes with a high-energy DJ and Dhol that will absolutely make you dance all night."
    },
    {
      icon: Utensils,
      title: "Grand Royal Feast",
      desc: "Indulge in a royal multi-course Indian banquet including rich laddoos, street delicacies, and mocktails."
    },
    {
      icon: Award,
      title: "Mr. & Ms. Baarati 2026",
      desc: "Bring your best energy and attire to compete for the prestigious Mr. & Ms. Baarati titles and exciting awards!"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 relative bg-maroon-950 royal-damask-bg">
      <div className="max-w-5xl mx-auto">
        <div className="box-gold-frame rounded-3xl p-8 sm:p-14 bg-maroon-900/95 text-center relative shadow-2xl">
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
                className="p-6 rounded-2xl bg-maroon-800 border border-gold-antique/30 hover:border-gold-champagne transition-all duration-300 flex flex-col sm:flex-row items-start gap-4 group hover:shadow-gold-glow"
              >
                <div className="w-12 h-12 rounded-xl bg-gold-antique/10 border border-gold-antique/50 flex items-center justify-center text-gold-champagne shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-marcellus text-lg font-bold text-gold-bright mb-1">
                    {item.title}
                  </h3>
                  <p className="font-poppins text-xs sm:text-sm text-royal-ivory/80 leading-relaxed mb-3">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Previous Winners Spotlight */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl border border-gold-antique/30 bg-maroon-800 shadow-inner">
            <h3 className="font-marcellus text-xl sm:text-2xl font-bold text-gold-champagne mb-6 text-center tracking-wide">
              The Legacy of Mr. & Ms. Baarati
            </h3>
            <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden border-2 border-gold-antique/50 shadow-2xl mx-auto max-w-4xl group">
              <Image 
                src="/images/uploaded/winners.jpg" 
                alt="Previous Year Winners" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-maroon-950 via-maroon-950/70 to-transparent pt-16 pb-4 text-center">
                <span className="font-marcellus text-sm sm:text-base text-gold-warm tracking-[0.2em] uppercase drop-shadow-md">Previous Year Winners</span>
              </div>
            </div>
          </div>

          {/* Dress Code Highlight */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-gold-antique/10 via-maroon-800 to-gold-antique/10 border border-gold-antique/60 text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-gold-champagne">
              <Sparkles className="w-5 h-5" />
              <span className="font-marcellus font-bold text-sm tracking-widest uppercase">
                Royal Dress Code
              </span>
              <Sparkles className="w-5 h-5" />
            </div>
            <p className="font-poppins text-xs sm:text-sm text-gold-warm">
              Embrace the elegance of the evening in stunning <strong>Traditional Attire</strong>. Come dressed in your finest ethnic wear to celebrate the grand festivities!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
