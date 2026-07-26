"use client";

import React, { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TraditionalBorders from '@/components/TraditionalBorders';
import FloatingFlowers from '@/components/FloatingFlowers';
import RegistrationForm from '@/components/RegistrationForm';

function RegisterContent() {
  return (
    <div className="min-h-screen bg-maroon-900 royal-damask-bg pt-28 pb-16 px-4 relative overflow-hidden">
      <Navbar />
      <TraditionalBorders />
      <FloatingFlowers />

      <div className="max-w-3xl mx-auto relative z-10">
        <RegistrationForm />
      </div>

      <Footer />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-maroon-900 flex items-center justify-center text-gold-champagne font-marcellus">Loading Royal Registration...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
