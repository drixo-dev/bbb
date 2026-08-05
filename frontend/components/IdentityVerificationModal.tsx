"use client";

import React, { useState } from 'react';
import { ShieldCheck, X, ArrowRight } from 'lucide-react';
import { apiVerifyIdentity } from '@/lib/api';

interface ModalProps {
  isOpen: boolean;
  registrationId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function IdentityVerificationModal({ isOpen, registrationId, onClose, onSuccess }: ModalProps) {
  const [identityValue, setIdentityValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identityValue.trim()) {
      setError('Please enter a value to verify.');
      return;
    }

    setLoading(true);
    try {
      const res = await apiVerifyIdentity({ registrationId, identityValue });
      if (res.success) {
        onSuccess();
      } else {
        setError(res.message || 'Verification failed. Please check your details.');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative box-gold-frame rounded-3xl w-full max-w-md bg-maroon-900 shadow-2xl p-6 sm:p-8 transform transition-all">
        <button onClick={onClose} className="absolute top-4 right-4 text-gold-champagne/60 hover:text-gold-champagne transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-gold-gradient mb-1">
            Verify Your Identity
          </h2>
          <p className="font-poppins text-xs text-royal-ivory/80">
            For your security, please verify your identity before accessing your E-Pass.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-poppins text-center whitespace-pre-wrap">
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="bg-maroon-950/50 p-4 rounded-xl border border-gold-antique/30">
            <p className="font-poppins text-xs font-bold text-gold-champagne mb-2">Enter ANY ONE of the following:</p>
            <ul className="list-disc list-inside font-poppins text-xs text-royal-ivory/80 space-y-1 ml-1">
              <li>Registration ID</li>
              <li>Registered Email Address</li>
              <li>Registered Phone Number</li>
            </ul>
          </div>

          <div>
            <input
              type="text"
              required
              placeholder="Registration ID / Email / Phone Number"
              value={identityValue}
              onChange={(e) => setIdentityValue(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-maroon-900/60 border border-gold-antique/40 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne focus:outline-none focus:ring-1 focus:ring-gold-champagne font-poppins text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3.5 rounded-full border border-gold-champagne/50 text-gold-champagne font-marcellus font-bold tracking-widest uppercase hover:bg-gold-champagne/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3.5 rounded-full bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-900 font-marcellus font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
            >
              {loading ? 'Verifying...' : (
                <>
                  <span>Verify</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
