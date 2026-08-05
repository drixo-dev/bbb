"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, ArrowRight, RefreshCw, FileText, CheckCircle, Search } from 'lucide-react';
import { apiResumeRegistration } from '@/lib/api';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

import IdentityVerificationModal from './IdentityVerificationModal';

export default function ResumeRegistrationModal({ isOpen, onClose }: ModalProps) {
  const router = useRouter();
  const [rollNumber, setRollNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [foundStatus, setFoundStatus] = useState<'IDLE' | 'CONTINUE_PAYMENT' | 'VIEW_STATUS' | 'VIEW_PASS' | 'REUPLOAD_PAYMENT'>('IDLE');
  const [regData, setRegData] = useState<{ id: string; name: string } | null>(null);
  const [showVerification, setShowVerification] = useState(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!rollNumber.trim()) {
      setError('Roll Number is required.');
      return;
    }

    setLoading(true);
    try {
      const res = await apiResumeRegistration({
        rollNumber: rollNumber.trim().toUpperCase()
      });

      if (res.success) {
        if (res.nextAction === 'NOT_FOUND' || res.nextAction === 'EMAIL_MISMATCH') {
          setError(res.message);
        } else {
          setRegData({ id: res.registrationId, name: res.participantName });
          setFoundStatus(res.nextAction as any);
        }
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (err) {
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    if (!regData) return;
    if (foundStatus === 'CONTINUE_PAYMENT' || foundStatus === 'VIEW_STATUS' || foundStatus === 'REUPLOAD_PAYMENT') {
      router.push(`/payment?regId=${regData.id}`);
      onClose();
    } else if (foundStatus === 'VIEW_PASS') {
      setShowVerification(true);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative box-gold-frame rounded-3xl w-full max-w-md bg-maroon-900 shadow-2xl p-6 sm:p-8 transform transition-all">
          <button onClick={onClose} className="absolute top-4 right-4 text-gold-champagne/60 hover:text-gold-champagne transition-colors">
            <X className="w-6 h-6" />
          </button>

          <div className="text-center mb-6">
            <RefreshCw className="w-8 h-8 text-gold-champagne mx-auto mb-3" />
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-gold-gradient mb-1">
              Find My Registration
            </h2>
            <p className="font-poppins text-xs text-royal-ivory/80">
              Enter your Roll Number to find your registration or pass.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-poppins text-center">
              {error}
            </div>
          )}

          {foundStatus === 'IDLE' ? (
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <label className="font-poppins text-xs text-royal-ivory/80 block mb-1">
                  Roll Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 21BCE1042"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-maroon-900/60 border border-gold-antique/40 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne focus:outline-none focus:ring-1 focus:ring-gold-champagne font-poppins text-sm uppercase"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 mt-2 rounded-full bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-900 font-marcellus font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
              >
                {loading ? 'Searching...' : (
                  <>
                    <span>Find My Pass</span>
                    <Search className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-maroon-950/50 p-4 rounded-xl border border-gold-antique/30">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="font-poppins text-sm text-royal-ivory">Welcome back, {regData?.name}!</p>
              </div>
              
              <div className="py-2">
                {foundStatus === 'CONTINUE_PAYMENT' && <p className="font-poppins text-sm text-royal-ivory">Your registration is incomplete. Please finish your payment.</p>}
                {foundStatus === 'VIEW_STATUS' && <p className="font-poppins text-sm text-royal-ivory">Your payment has been submitted. Status: <span className="text-gold-champagne font-bold">Pending Verification</span>.</p>}
                {foundStatus === 'VIEW_PASS' && <p className="font-poppins text-sm text-emerald-400 font-bold">Your registration is Approved!</p>}
                {foundStatus === 'REUPLOAD_PAYMENT' && <p className="font-poppins text-sm text-red-400 font-bold">Your payment was Rejected. Please upload a new proof.</p>}
              </div>

              <button
                onClick={handleNavigate}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-900 font-marcellus font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
              >
                {foundStatus === 'CONTINUE_PAYMENT' && 'Continue Payment'}
                {foundStatus === 'VIEW_STATUS' && 'View Status'}
                {foundStatus === 'VIEW_PASS' && 'View Pass'}
                {foundStatus === 'REUPLOAD_PAYMENT' && 'Re-upload Payment'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {showVerification && regData && (
        <IdentityVerificationModal
          isOpen={showVerification}
          registrationId={regData.id}
          onClose={() => setShowVerification(false)}
          onSuccess={() => {
            router.push(`/success?regId=${regData.id}`);
            onClose();
          }}
        />
      )}
    </>
  );
}
