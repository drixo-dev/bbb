"use client";

import React from 'react';
import Link from 'next/link';
import { Check, Sparkles, Star } from 'lucide-react';

export default function PassCards() {
  const passes = [
    {
      id: 'Single',
      name: 'Early Bird Pass',
      tagline: 'Individual Royal Entry',
      price: 950,
      originalPrice: 1200,
      popular: false,
      locked: false,
      benefits: [
        'Single Entry to Band Baaja Baarat 2026',
        'Welcome Royal Tilak & Floral Shower',
        'Full Multi-Course Royal Banquet Dinner',
        'Access to Live DJ & Cultural Stage Shows',
        'Digital QR E-Pass & Physical Badge'
      ]
    }
  ];

  return (
    <section id="passes" className="py-20 px-4 relative bg-maroon-950 border-t border-gold-antique/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-marcellus text-xs sm:text-sm tracking-[0.3em] text-gold-antique uppercase mb-2">
            Select Your Baarati Pass
          </p>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-gold-gradient mb-4">
            ROYAL PASS
          </h2>
          <p className="font-poppins text-sm text-royal-ivory/80 max-w-xl mx-auto">
            Secure your Early Bird Pass before they run out! Limited passes available.
          </p>
        </div>

        <div className="grid grid-cols-1 max-w-sm mx-auto gap-8">
          {passes.map((pass) => (
            <div
              key={pass.id}
              className={`box-gold-frame [&::before]:rounded-[20px] rounded-3xl p-8 bg-maroon-900 relative flex flex-col justify-between transition-all duration-300 ${
                pass.locked ? 'opacity-90 grayscale-[50%] pointer-events-none' : 'hover:-translate-y-2'
              } ${
                pass.popular && !pass.locked
                  ? 'border-2 border-gold-champagne shadow-gold-intense bg-gradient-to-b from-maroon-900 to-maroon-950 scale-105 z-10'
                  : !pass.locked ? 'hover:shadow-gold-glow' : ''
              }`}
            >
              {pass.locked && (
                <div className="absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-maroon-950/60 backdrop-blur-sm">
                   <div className="px-6 py-3 rounded-full bg-maroon-900 border border-gold-champagne text-gold-champagne font-marcellus font-bold tracking-widest text-sm shadow-gold-glow rotate-[-5deg]">
                     OPENS IN PHASE 1
                   </div>
                </div>
              )}


              {/* Popular Ribbon */}
              {pass.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique text-maroon-900 font-marcellus text-xs font-bold uppercase tracking-widest shadow-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-maroon-900" />
                  Most Popular Pass
                </div>
              )}

              <div>
                <div className="text-center pb-8">
                  <img src="/logo.png" alt="Logo" className="w-24 h-24 object-contain object-contain text-gold-champagne mx-auto mb-2" />
                  <h3 className="font-cinzel text-2xl font-bold text-gold-gradient mb-1">
                    {pass.name}
                  </h3>
                  <p className="font-poppins text-xs text-gold-warm/80">
                    {pass.tagline}
                  </p>

                  <div className="mt-4 flex items-baseline justify-center gap-2">
                    <span className="font-playfair text-4xl font-extrabold text-gold-bright">
                      ₹{pass.price}
                    </span>
                    <span className="font-poppins text-sm text-royal-ivory/50 line-through">
                      ₹{pass.originalPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Book Pass CTA */}
              <Link
                href={`/register?pass=${encodeURIComponent(pass.name)}`}
                className={`w-full py-3.5 rounded-full font-marcellus font-bold text-sm tracking-widest uppercase text-center block transition-all duration-300 border ${
                  pass.popular
                    ? 'bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique text-maroon-900 shadow-gold-glow hover:scale-105 border-gold-champagne'
                    : 'bg-maroon-900/80 hover:bg-gold-antique text-gold-champagne hover:text-maroon-900 border-gold-antique/50'
                }`}
              >
                Book {pass.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
