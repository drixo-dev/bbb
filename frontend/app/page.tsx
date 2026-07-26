"use client";

import React, { useState } from 'react';
import EnvelopeOpening from '@/components/EnvelopeOpening';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import About from '@/components/About';
import PassCards from '@/components/PassCards';
import Gallery from '@/components/Gallery';
import Footer from '@/components/Footer';
import MusicToggle from '@/components/MusicToggle';
import FloatingFlowers from '@/components/FloatingFlowers';
import TraditionalBorders from '@/components/TraditionalBorders';
import GoldenCursor from '@/components/GoldenCursor';

export default function HomePage() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  return (
    <main className="relative overflow-x-hidden">
      {/* Royal Invitation Envelope Opening Overlay */}
      <EnvelopeOpening onOpen={() => setEnvelopeOpened(true)} />

      {/* Global ambient components */}
      <GoldenCursor />
      <TraditionalBorders />
      <FloatingFlowers />
      <MusicToggle />

      {/* Navigation */}
      <Navbar />

      {/* Page Sections */}
      <Hero />
      <Countdown />
      <About />
      <PassCards />
      <Gallery />
      <Footer />
    </main>
  );
}
