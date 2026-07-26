"use client";

import React from 'react';
import Link from 'next/link';
import { Check, Crown, Sparkles, Star } from 'lucide-react';

export default function PassCards() {
  const passes = [
    {
      id: 'Single',
      name: 'Single Pass',
      tagline: 'Individual Royal Entry',
      price: 499,
      originalPrice: 699,
      popular: false,
      benefits: [
        'Single Entry to Band Baaja Baarat 2026',
        'Welcome Royal Tilak & Floral Shower',
        'Full Multi-Course Royal Banquet Dinner',
        'Access to Live DJ & Cultural Stage Shows',
        'Digital QR E-Pass & Physical Badge'
      ]
    },
    {
      id: 'Couple',
      name: 'Couple Pass',
      tagline: 'Entry for 2 Baaratis',
      price: 899,
      originalPrice: 1199,
      popular: true,
      benefits: [
        'Entry for 2 People (Couple / Duo)',
        'VIP Red Carpet Welcome & Photo Booth Access',
        'Full Multi-Course Royal Banquet Dinner for 2',
        'Front-Row Stage Access & Couple Dance Floor',
        'Eligible for Best Dressed Couple Awards',
        'Digital QR E-Passes for Both Members'
      ]
    },
    {
      id: 'Group',
      name: 'Group Pass (4 People)',
      tagline: 'Squad Entry for 4 Friends',
      price: 1599,
      originalPrice: 1999,
      popular: false,
      benefits: [
        'Entry for 4 Friends in a Single Pass',
        'Reserved Squad Table & Welcome Drinks',
        'Full Multi-Course Royal Banquet Dinner for 4',
        'Complimentary Souvenir Photo Frame',
        'Exclusive Squad Dance Floor Access',
        'Digital QR E-Passes for All 4 Members'
      ]
    }
  ];

  return (
    <section id="passes" className="py-20 px-4 relative bg-maroon-900 border-t border-gold-antique/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-marcellus text-xs sm:text-sm tracking-[0.3em] text-gold-antique uppercase mb-2">
            Select Your Baarati Pass
          </p>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-gold-gradient mb-4">
            ROYAL PASS TIERS
          </h2>
          <p className="font-poppins text-sm text-royal-ivory/80 max-w-xl mx-auto">
            Choose the perfect pass for you, your partner, or your entire squad. Limited passes available!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {passes.map((pass) => (
            <div
              key={pass.id}
              className={`box-gold-frame rounded-3xl p-8 bg-maroon-800/90 relative flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 ${
                pass.popular
                  ? 'border-2 border-gold-champagne shadow-gold-intense bg-gradient-to-b from-maroon-800 to-maroon-900 scale-105 z-10'
                  : 'hover:shadow-gold-glow'
              }`}
            >
              <div className="corner-ornament corner-tl" />
              <div className="corner-ornament corner-tr" />
              <div className="corner-ornament corner-bl" />
              <div className="corner-ornament corner-br" />

              {/* Popular Ribbon */}
              {pass.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique text-maroon-900 font-marcellus text-xs font-bold uppercase tracking-widest shadow-md flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-maroon-900" />
                  Most Popular Pass
                </div>
              )}

              <div>
                <div className="text-center pb-6 border-b border-gold-antique/30">
                  <Crown className="w-8 h-8 text-gold-champagne mx-auto mb-2" />
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

                {/* Benefits List */}
                <ul className="py-6 space-y-3.5">
                  {pass.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-poppins text-xs sm:text-sm text-royal-ivory/90">
                      <div className="w-4 h-4 rounded-full bg-gold-antique/20 border border-gold-antique flex items-center justify-center text-gold-champagne shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
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
