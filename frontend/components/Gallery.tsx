"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Maximize2, X } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
      title: "Royal Stage Performance",
      category: "Dancers & Shehnai"
    },
    {
      src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
      title: "Grand Baarat Procession",
      category: "Celebrations"
    },
    {
      src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
      title: "Ethnic Fashion Gala",
      category: "Royalty"
    },
    {
      src: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      title: "DJ Dance Floor Fever",
      category: "High Energy"
    },
    {
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
      title: "Feast & Festive Delicacies",
      category: "Banquet"
    },
    {
      src: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80",
      title: "Crown & Title Ceremony",
      category: "Awards"
    }
  ];

  return (
    <section id="gallery" className="py-20 px-4 relative bg-maroon-800/60 royal-damask-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-marcellus text-xs sm:text-sm tracking-[0.3em] text-gold-antique uppercase mb-2">
            Memories From Previous Celebrations
          </p>
          <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-gold-gradient mb-4">
            ROYAL GALLERY
          </h2>
          <p className="font-poppins text-sm text-royal-ivory/80 max-w-xl mx-auto">
            Glimpses of vibrant energy, ethnic attire, music, laughter, and royal welcomes.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedImage(item.src)}
              className="box-gold-frame rounded-2xl overflow-hidden group cursor-pointer relative h-64 sm:h-72 shadow-xl"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-900 via-maroon-900/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

              {/* Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
                <div>
                  <span className="font-marcellus text-[10px] text-gold-champagne uppercase tracking-widest block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-cinzel text-lg font-bold text-royal-ivory group-hover:text-gold-bright transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-full bg-gold-antique/20 border border-gold-antique flex items-center justify-center text-gold-champagne group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-maroon-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl w-full box-gold-frame rounded-3xl overflow-hidden p-2 bg-maroon-900">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-maroon-800 border border-gold-antique text-gold-champagne flex items-center justify-center hover:scale-110 transition-transform"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative h-[65vh] w-full rounded-2xl overflow-hidden">
              <Image src={selectedImage} alt="Expanded preview" fill className="object-contain" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
