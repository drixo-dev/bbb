"use client";

import React from 'react';
import Link from 'next/link';
import { Instagram, MessageCircle, Mail, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-maroon-950 text-royal-ivory pt-16 pb-8 px-4 border-t-2 border-gold-antique/50 royal-damask-bg overflow-hidden">
      {/* Traditional Floral Border Top Strip */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique shadow-gold-glow" />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gold-antique/20">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Logo" className="w-20 h-20 object-contain object-contain group-hover:scale-105 transition-transform" />
              <div>
                <span className="font-cinzel font-bold text-xl text-gold-gradient tracking-wider block">
                  BAND BAAJA BAARAT
                </span>
                <span className="font-marcellus text-xs text-gold-champagne/80 tracking-widest uppercase">
                  Freshers Celebration 2026
                </span>
              </div>
            </div>

            <p className="font-poppins text-xs sm:text-sm text-royal-ivory/75 leading-relaxed max-w-md">
              The premier royal wedding invitation styled college event. Designed with love, royal aesthetics, traditional motifs, and unforgettable beats.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/band.baaja.baarat_?igsh=MWp0a3V3OXBpejFmMg=="
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-maroon-900 border border-gold-antique/50 flex items-center justify-center text-gold-champagne hover:scale-110 hover:bg-gold-antique hover:text-maroon-900 transition-all shadow-md"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://chat.whatsapp.com/ELjBMd3g9v6JRFtZGhKDPZ?s=cl&p=i&mlu=0"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-maroon-900 border border-gold-antique/50 flex items-center justify-center text-gold-champagne hover:scale-110 hover:bg-gold-antique hover:text-maroon-900 transition-all shadow-md"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="mailto:inquiry.envisiongroup@gmail.com"
                className="w-10 h-10 rounded-full bg-maroon-900 border border-gold-antique/50 flex items-center justify-center text-gold-champagne hover:scale-110 hover:bg-gold-antique hover:text-maroon-900 transition-all shadow-md"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-cinzel font-bold text-base text-gold-bright uppercase tracking-wider mb-2">
              Navigation
            </h4>
            <ul className="space-y-2 font-marcellus text-sm text-royal-ivory/80">
              <li><Link href="/#hero" className="hover:text-gold-champagne transition-colors">Home</Link></li>
              <li><Link href="/#about" className="hover:text-gold-champagne transition-colors">About Event</Link></li>
              <li><Link href="/#passes" className="hover:text-gold-champagne transition-colors">Pass Tiers</Link></li>
              <li><Link href="/#gallery" className="hover:text-gold-champagne transition-colors">Gallery</Link></li>
              <li><Link href="/register" className="hover:text-gold-champagne transition-colors">Register</Link></li>
            </ul>
          </div>

          {/* Contact & Help */}
          <div className="space-y-3">
            <h4 className="font-cinzel font-bold text-base text-gold-bright uppercase tracking-wider mb-2">
              Event Helpdesk
            </h4>
            <p className="font-poppins text-xs text-royal-ivory/80 leading-relaxed">
              Grand Palace Auditorium, Campus Grounds
            </p>
            <p className="font-poppins text-xs text-gold-warm">
              Helpline: +91 97233 48341<br/>
              Helpline: +91 98982 82783
            </p>
            <p className="font-poppins text-xs text-gold-warm">
              Email: inquiry.envisiongroup@gmail.com
            </p>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-poppins text-royal-ivory/60">
          <p className="flex items-center gap-1">
            © 2026 Band Baaja Baarat Team. Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for Freshers 2026.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-maroon-900 border border-gold-antique/40 text-gold-champagne hover:scale-105 transition-all duration-300"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
