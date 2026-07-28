"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is the date, time, and venue for Band Baaja Baarat 2026?",
      a: "The event takes place on Saturday, October 24, 2026 starting at 6:00 PM onwards at the Grand Palace Auditorium, Campus Grounds."
    },
    {
      q: "What is included with the Band Baaja Baarat Passes?",
      a: "All passes include grand red carpet welcome, Dhol entry, live DJ performance, full multi-course royal dinner feast, mocktails, cultural competitions, and a digital QR E-Pass."
    },
    {
      q: "How do Couple & Group Passes work during registration?",
      a: "When selecting Couple Pass (2 people) or Group Pass (4 people), you only register once as the Lead Participant and enter the Name and Roll Number of your partner/group members. Separate QR E-Passes are generated for each member!"
    },
    {
      q: "How do I receive my E-Pass after payment?",
      a: "Once you upload your UPI payment transaction ID (UTR) and screenshot, your registration ID is generated immediately. You can view, print, or download your PDF E-pass directly from the success screen or via email!"
    },
    {
      q: "What is the expected dress code?",
      a: "The dress code is Traditional Royal Indian. Come dressed in your finest ethnic wear!"
    }
  ];

  return (
    <section id="faq" className="py-20 px-4 relative bg-maroon-900 border-t border-gold-antique/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <div className="flex justify-center mb-2 text-gold-champagne">
            <HelpCircle className="w-8 h-8 animate-float" />
          </div>
          <p className="font-marcellus text-xs sm:text-sm tracking-[0.3em] text-gold-antique uppercase mb-1">
            Got Questions?
          </p>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-gold-gradient">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="box-gold-frame rounded-2xl bg-maroon-800/90 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-marcellus text-base sm:text-lg text-gold-champagne hover:text-gold-bright transition-colors"
              >
                <span className="font-semibold">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gold-antique shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? 'rotate-180 text-gold-champagne' : ''
                  }`}
                />
              </button>

              {openIdx === idx && (
                <div className="px-6 pb-6 pt-0 font-poppins text-xs sm:text-sm text-royal-ivory/85 border-t border-gold-antique/20 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
