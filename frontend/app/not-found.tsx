import Link from 'next/link';
import { Crown } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-maroon-900 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-royal-maroon-gradient opacity-90 z-0" />

      <div className="relative z-10 text-center max-w-lg mx-auto flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-gold-antique to-gold-champagne flex items-center justify-center text-maroon-900 shadow-gold-glow mb-8 animate-float">
          <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain" />
        </div>
        
        <h1 className="font-cinzel text-8xl font-bold text-gold-gradient mb-4 drop-shadow-lg">
          404
        </h1>
        
        <h2 className="font-marcellus text-2xl text-royal-ivory mb-6 tracking-wider">
          Page Not Found
        </h2>
        
        <p className="font-poppins text-royal-ivory/70 mb-10 text-center leading-relaxed">
          The royal chambers you are looking for do not exist or have been moved. 
          Please return to the grand hall.
        </p>

        <Link 
          href="/" 
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique text-maroon-900 font-marcellus font-bold tracking-widest shadow-gold-glow hover:scale-105 hover:shadow-gold-intense transition-all duration-300 border border-gold-champagne uppercase"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
