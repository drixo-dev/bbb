"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Maximize2, X } from 'lucide-react';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      src: "/images/uploaded/img-1.jpg",
      title: "Royal Stage Performance",
      category: "Dancers & Shehnai"
    },
    {
      src: "/images/uploaded/img-2.jpg",
      title: "Grand Baarat Procession",
      category: "Celebrations"
    },
    {
      src: "/images/uploaded/ethnic.jpg",
      title: "Ethnic Fashion Gala",
      category: "Royalty"
    },
    {
      src: "/images/uploaded/img-4.jpg",
      title: "DJ Dance Floor Fever",
      category: "High Energy"
    },
    {
      src: "/images/uploaded/gallery-img-5-new.png",
      title: "Feast & Festive Delicacies",
      category: "Banquet"
    },
    {
      src: "/images/uploaded/gallery-img-6.png",
      title: "Crown & Title Ceremony",
      category: "Awards"
    }
  ];

  return (
    <section id="gallery" className="py-20 px-4 relative bg-maroon-950 royal-damask-bg">
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
                alt="Gallery Photo"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Subtle hover overlay for the expand icon */}
              <div className="absolute inset-0 bg-maroon-900/0 group-hover:bg-maroon-900/30 transition-colors duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-maroon-950/60 border border-gold-antique text-gold-champagne flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 backdrop-blur-sm">
                  <Maximize2 className="w-5 h-5" />
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
