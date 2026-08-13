"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function Sponsors() {
  return (
    <section className="relative py-24 px-4 overflow-hidden royal-damask-bg z-10" id="sponsors">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-maroon-900/80 via-transparent to-maroon-900/80 pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto z-20 text-center">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-gold-antique" />
            <span className="font-cormorant text-2xl sm:text-3xl text-gold-champagne italic font-semibold tracking-widest">
              The BBB Sponsor Reveal
            </span>
            <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-gold-antique" />
          </div>
          
          <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-gold-gradient tracking-wider leading-tight uppercase drop-shadow-xl mb-6">
            🚨 BARAATIS, MEET THE PEOPLE MAKING<br className="hidden sm:block" />
            <span className="text-gold-bright"> BBB 2026 EVEN BIGGER! 💍🔥</span>
          </h2>
        </motion.div>

        {/* Presenting Sponsor */}
        <div className="mb-24">
          <div className="flex items-center justify-center gap-4 mb-10">
             <div className="h-[2px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-gold-antique" />
             <h3 className="font-cinzel text-3xl sm:text-4xl text-gold-champagne font-extrabold tracking-widest uppercase text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]">
               Presenting Sponsor
             </h3>
             <div className="h-[2px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-gold-antique" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="box-gold-frame rounded-3xl p-10 sm:p-14 backdrop-blur-md bg-maroon-900/60 shadow-2xl relative group max-w-3xl mx-auto border-[3px] border-gold-antique/60 hover:border-gold-champagne transition-colors"
          >
            <div className="corner-ornament corner-tl scale-125" />
            <div className="corner-ornament corner-tr scale-125" />
            <div className="corner-ornament corner-bl scale-125" />
            <div className="corner-ornament corner-br scale-125" />
            
            <div className="absolute inset-0 bg-gold-champagne rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" />
            
            <div className="bg-white/95 rounded-2xl p-8 mb-8 shadow-[0_15px_40px_rgba(212,175,55,0.3)] flex items-center justify-center h-56 sm:h-72 border-[3px] border-gold-antique/80 group-hover:border-gold-bright transition-colors relative z-10">
              <img src="/images/teranovas.png" alt="BBB by Taranova Pizza" className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110" />
            </div>
            
            <h4 className="font-marcellus text-3xl sm:text-4xl text-gold-bright mb-4 tracking-widest uppercase font-extrabold drop-shadow-md">BBB by Taranova Pizza</h4>
            <p className="font-poppins text-lg sm:text-xl text-royal-ivory/90 italic">"The baraat just got a whole lot cheesier. 🍕🔥"</p>
          </motion.div>
        </div>

        {/* Title Sponsor */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-4 mb-10">
             <div className="h-[2px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-gold-antique" />
             <h3 className="font-cinzel text-2xl sm:text-3xl text-gold-champagne font-bold tracking-widest uppercase text-center drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)]">
               Title Sponsor
             </h3>
             <div className="h-[2px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-gold-antique" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="box-gold-frame rounded-3xl p-8 backdrop-blur-sm bg-maroon-900/40 shadow-2xl relative group max-w-xl mx-auto"
          >
            <div className="corner-ornament corner-tl" />
            <div className="corner-ornament corner-tr" />
            <div className="corner-ornament corner-bl" />
            <div className="corner-ornament corner-br" />
            
            <div className="absolute inset-0 bg-gold-champagne rounded-3xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
            
            <div className="bg-white/95 rounded-2xl p-6 mb-6 shadow-[0_10px_30px_rgba(212,175,55,0.2)] flex items-center justify-center h-48 border-[2px] border-gold-antique/60 group-hover:border-gold-champagne transition-colors">
              <img src="/images/mdfit.png" alt="MD Fitness" className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" />
            </div>
            
            <h4 className="font-marcellus text-xl text-gold-bright mb-3 tracking-widest uppercase font-bold drop-shadow-md">MD Fitness</h4>
            <p className="font-poppins text-sm text-royal-ivory/90 italic">"Strong enough to survive the baraat. Fit enough to own the dance floor. 💪🥁"</p>
          </motion.div>
        </div>

        {/* Co-Sponsors */}
        <div className="mb-20">
          <div className="flex items-center justify-center gap-4 mb-10">
             <div className="h-[2px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-gold-antique opacity-70" />
             <h3 className="font-cinzel text-xl sm:text-2xl text-gold-champagne/90 font-bold tracking-widest uppercase text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
               Co-Sponsors
             </h3>
             <div className="h-[2px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-gold-antique opacity-70" />
          </div>

          <div className="flex flex-wrap justify-center items-stretch gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border border-gold-antique/30 rounded-2xl p-6 backdrop-blur-sm bg-maroon-900/30 hover:bg-maroon-900/50 transition-colors shadow-lg relative group flex-1 min-w-[280px] max-w-[320px]"
            >
               <div className="bg-white/95 rounded-xl p-4 mb-4 shadow-inner flex items-center justify-center h-32 border border-gold-antique/20 group-hover:border-gold-champagne/60 transition-colors">
                 <img src="/images/dragon-logo.png" alt="Dragon Tattoo" className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
               </div>
               <h4 className="font-marcellus text-lg text-gold-champagne mb-2 uppercase font-semibold">Dragon Tattoo</h4>
               <p className="font-poppins text-xs text-royal-ivory/80 italic">"A little ink, a little attitude, a lot of BBB. 🖤🔥"</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="border border-gold-antique/30 rounded-2xl p-6 backdrop-blur-sm bg-maroon-900/30 hover:bg-maroon-900/50 transition-colors shadow-lg relative group flex-1 min-w-[280px] max-w-[320px]"
            >
               <div className="bg-white/95 rounded-xl p-4 mb-4 shadow-inner flex items-center justify-center h-32 border border-gold-antique/20 group-hover:border-gold-champagne/60 transition-colors">
                 <img src="/images/drlaundry.png" alt="Dr. Laundry" className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
               </div>
               <h4 className="font-marcellus text-lg text-gold-champagne mb-2 uppercase font-semibold">Dr. Laundry</h4>
               <p className="font-poppins text-xs text-royal-ivory/80 italic">"Keeping your baraat outfits spotless and fresh! ✨"</p>
            </motion.div>
          </div>
        </div>

        {/* Partners */}
        <div className="mb-10">
          <div className="flex items-center justify-center gap-4 mb-10">
             <div className="h-[2px] w-6 sm:w-12 bg-gradient-to-r from-transparent to-gold-antique opacity-70" />
             <h3 className="font-cinzel text-xl sm:text-2xl text-gold-champagne/90 font-bold tracking-widest uppercase text-center drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
               Royal Partners
             </h3>
             <div className="h-[2px] w-6 sm:w-12 bg-gradient-to-l from-transparent to-gold-antique opacity-70" />
          </div>

          <div className="flex flex-wrap justify-center items-stretch gap-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="border border-gold-antique/20 rounded-2xl p-5 backdrop-blur-sm bg-black/10 hover:bg-black/20 transition-colors shadow-md group flex-1 min-w-[250px] max-w-[280px]"
            >
               <div className="bg-transparent rounded-lg mb-4 flex items-center justify-center h-28 relative">
                  <div className="absolute inset-0 bg-gold-champagne rounded-xl blur-lg opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
                 <img src="/images/piclelo-logo.png" alt="Picelo" className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105 relative z-10" />
               </div>
               <h4 className="font-marcellus text-base text-gold-champagne mb-2 uppercase font-semibold">Photobooth Partner</h4>
               <p className="font-poppins text-xs text-royal-ivory/80 italic">"Pose. Click. Repeat. 📸✨ Because some baraat moments deserve to be kept forever! 💍"</p>
            </motion.div>

            {/*
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border border-gold-antique/20 rounded-2xl p-5 backdrop-blur-sm bg-black/10 hover:bg-black/20 transition-colors shadow-md group flex-1 min-w-[250px] max-w-[280px]"
            >
               <div className="bg-white/95 rounded-lg mb-4 shadow-inner flex items-center justify-center h-28 border border-gold-antique/10 group-hover:border-gold-champagne/40 transition-colors">
                 <img src="/images/lavish.png" alt="Lavish Hair Salon" className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" />
               </div>
               <h4 className="font-marcellus text-base text-gold-champagne mb-2 uppercase font-semibold">Hair Salon Partner</h4>
               <p className="font-poppins text-xs text-royal-ivory/80 italic">"Because the baraat deserves hair that makes heads turn. 👀✨"</p>
            </motion.div>
            */}

            {/* Surprise Partner */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="border border-gold-champagne/60 border-dashed rounded-2xl p-5 backdrop-blur-sm bg-gold-antique/5 shadow-md group flex-1 min-w-[250px] max-w-[280px] relative overflow-hidden hover:bg-gold-antique/10 transition-colors cursor-help"
            >
               <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-gold-bright to-transparent opacity-40 blur-xl"></div>
               <div className="bg-black/40 rounded-lg mb-4 flex items-center justify-center h-28 border border-gold-antique/30 relative">
                 <span className="text-5xl text-gold-champagne opacity-60 animate-pulse font-cinzel">?</span>
               </div>
               <h4 className="font-marcellus text-base text-gold-bright mb-2 uppercase font-semibold">Beverage Partner</h4>
               <p className="font-poppins text-xs text-royal-ivory/90 italic">"Our BEVERAGE PARTNER is joining the baraat soon! 🍹💍 REVEAL COMING SOON. 👀🔥"</p>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
