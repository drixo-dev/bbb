"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Crown, Menu, X } from 'lucide-react';
import ResumeRegistrationModal from './ResumeRegistrationModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Passes', href: '/#passes' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Admin', href: '/admin' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled || mobileMenuOpen
          ? 'bg-maroon-900/95 backdrop-blur-md border-b border-gold-antique/40 py-3 shadow-gold-glow'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Royal Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gold-antique to-gold-champagne flex items-center justify-center text-maroon-900 shadow-gold-glow group-hover:scale-105 transition-transform">
            <Crown className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-cinzel font-bold text-lg sm:text-xl text-gold-gradient tracking-wider">
              BAND BAAJA BAARAT
            </span>
            <span className="font-marcellus text-[10px] text-gold-champagne/80 tracking-[0.2em] uppercase">
              Freshers 2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-marcellus text-sm tracking-widest text-royal-ivory hover:text-gold-champagne transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold-antique hover:after:w-full after:transition-all after:duration-300"
            >
              {link.name}
            </Link>
          ))}

          {/* Find My Registration */}
          <button
            onClick={() => setIsResumeModalOpen(true)}
            className="font-marcellus text-sm tracking-widest text-gold-champagne hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-gold-champagne hover:after:w-full after:transition-all after:duration-300"
          >
            Find My Registration
          </button>

          {/* CTA Register Button */}
          <Link
            href="/register"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique text-maroon-900 font-marcellus font-bold text-sm tracking-wider shadow-gold-glow hover:scale-105 hover:shadow-gold-intense transition-all duration-300 border border-gold-champagne"
          >
            Register Now 👑
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gold-champagne p-2 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-maroon-900/95 border-b border-gold-antique/40 px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-marcellus text-lg text-royal-ivory hover:text-gold-champagne py-1"
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setIsResumeModalOpen(true);
            }}
            className="block w-full text-left font-marcellus text-lg text-gold-champagne hover:text-white py-1"
          >
            Find My Registration
          </button>

          <Link
            href="/register"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center w-full py-3 rounded-full bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-900 font-marcellus font-bold tracking-wider shadow-gold-glow"
          >
            Register Now 👑
          </Link>
        </div>
      )}
      </nav>

      <ResumeRegistrationModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </>
  );
}
