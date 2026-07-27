'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-maroon-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-royal-maroon-gradient opacity-90 z-0" />

      <div className="relative z-10 text-center max-w-lg mx-auto flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gold-antique to-gold-champagne flex items-center justify-center text-maroon-900 shadow-gold-glow mb-8 animate-pulse-glow">
          <AlertTriangle className="w-10 h-10" />
        </div>
        
        <h1 className="font-cinzel text-8xl font-bold text-gold-gradient mb-4 drop-shadow-lg">
          500
        </h1>
        
        <h2 className="font-marcellus text-2xl text-royal-ivory mb-6 tracking-wider">
          Internal Server Error
        </h2>
        
        <p className="font-poppins text-royal-ivory/70 mb-10 text-center leading-relaxed">
          A disruption has occurred in the royal court. Our scribes have been notified and are working diligently to resolve the issue.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => reset()}
            className="px-8 py-3.5 rounded-full bg-transparent text-gold-champagne font-marcellus font-bold tracking-widest hover:bg-gold-antique/10 transition-all duration-300 border border-gold-champagne uppercase"
          >
            Try Again
          </button>

          <Link 
            href="/" 
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique text-maroon-900 font-marcellus font-bold tracking-widest shadow-gold-glow hover:scale-105 hover:shadow-gold-intense transition-all duration-300 border border-gold-champagne uppercase"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
