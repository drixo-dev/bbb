"use client";

import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TraditionalBorders from '@/components/TraditionalBorders';
import FloatingFlowers from '@/components/FloatingFlowers';
import PaymentSection from '@/components/PaymentSection';

function PaymentContent() {
  return (
    <div className="min-h-screen bg-maroon-900 royal-damask-bg pt-28 pb-16 px-4 relative overflow-hidden">
      <Navbar />
      <TraditionalBorders />
      <FloatingFlowers />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <p className="font-marcellus text-xs tracking-[0.3em] text-gold-antique uppercase mb-1">
            Step 2 of 2
          </p>
          <h1 className="font-cinzel text-3xl sm:text-5xl font-bold text-gold-gradient">
            COMPLETE PAYMENT
          </h1>
        </div>
        <PaymentSection />
      </div>

      <Footer />
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-maroon-900 flex items-center justify-center">
        <div className="text-center text-gold-champagne font-marcellus">
          <div className="w-10 h-10 rounded-full border-2 border-gold-antique border-t-transparent animate-spin mx-auto mb-3" />
          Loading Royal Payment Gateway...
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
