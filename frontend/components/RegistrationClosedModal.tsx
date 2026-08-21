import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock } from 'lucide-react';

interface RegistrationClosedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationClosedModal({ isOpen, onClose }: RegistrationClosedModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="box-gold-frame rounded-3xl p-6 sm:p-10 bg-maroon-900 shadow-2xl relative max-w-md w-full pointer-events-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full text-gold-champagne/70 hover:text-gold-bright hover:bg-maroon-950 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-4 pt-4">
                <div className="w-16 h-16 bg-maroon-950 rounded-full border border-gold-champagne/50 flex items-center justify-center mx-auto mb-6 shadow-gold-glow">
                  <Lock className="w-8 h-8 text-gold-champagne" />
                </div>
                
                <h3 className="font-cinzel text-2xl font-bold text-gold-gradient">
                  Registrations Closed
                </h3>
                
                <div className="p-4 rounded-xl bg-maroon-950/50 border border-gold-antique/20 space-y-3">
                  <p className="font-poppins text-sm text-royal-ivory leading-relaxed">
                    Registrations for Band Baaja Baarat 2026 are now officially <strong className="text-red-400">closed</strong>.
                  </p>
                  <hr className="border-gold-antique/20" />
                  <p className="font-poppins text-sm text-gold-champagne font-medium italic">
                    The wait is over. See you at the Baarat! 👑
                  </p>
                </div>
                
                <button
                  onClick={onClose}
                  className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique text-maroon-900 font-marcellus font-bold tracking-widest text-sm uppercase shadow-gold-intense hover:scale-[1.02] transition-transform"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
