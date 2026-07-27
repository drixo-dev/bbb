"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Crown, Sparkles, CheckCircle, Ticket, Share2 } from 'lucide-react';
import { apiGetPass, Participant } from '@/lib/api';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const regId = searchParams?.get('regId');
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!regId) {
      router.replace('/');
      return;
    }

    apiGetPass(regId)
      .then((res) => {
        if (res.success && res.participant) {
          setParticipant(res.participant);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    const timer = setTimeout(() => {
      launchConfetti();
    }, 500);

    return () => clearTimeout(timer);
  }, [regId, router]);

  const launchConfetti = () => {
    import('canvas-confetti').then((module) => {
      const confetti = module.default;
      const count = 200;
      const defaults = { origin: { y: 0.7 }, colors: ['#D4AF37', '#E8C96B', '#FFF5E6', '#D97706', '#FFFFFF'] };

      function fire(particleRatio: number, opts: object) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }).catch(() => {});
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-maroon-900 flex items-center justify-center">
        <div className="text-center text-gold-champagne font-marcellus">
          <div className="w-10 h-10 rounded-full border-2 border-gold-antique border-t-transparent animate-spin mx-auto mb-3" />
          Preparing your Royal E-Pass...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-maroon-900 royal-damask-bg flex items-center justify-center py-16 px-4">
      <div className="max-w-2xl w-full">
        {/* Main Success Card */}
        <div ref={printRef} className="box-gold-frame rounded-3xl p-8 sm:p-12 bg-maroon-800/95 text-center relative shadow-2xl">
          <div className="corner-ornament corner-tl" />
          <div className="corner-ornament corner-tr" />
          <div className="corner-ornament corner-bl" />
          <div className="corner-ornament corner-br" />

          {/* Animated Crown Icon */}
          <div className="relative inline-block mb-4">
            <Crown className="w-14 h-14 text-gold-champagne animate-float mx-auto" />
            <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-gold-antique animate-spin" />
          </div>

          <h1 className="font-cinzel text-2xl sm:text-4xl font-bold text-gold-gradient mb-2">
            CONGRATULATIONS!
          </h1>
          <p className="font-cormorant text-xl sm:text-2xl text-royal-ivory italic mb-6">
            You are officially a <strong className="text-gold-bright">Baarati!</strong> 🎉
          </p>

          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-antique to-transparent mx-auto mb-8" />

          {participant ? (
            <div className="space-y-4 text-left">
              <div className="p-6 rounded-2xl bg-maroon-900/80 border border-gold-antique/30 space-y-3 font-poppins text-sm">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="font-marcellus text-emerald-400 font-semibold text-base">Registration Successful</span>
                </div>
                <p><span className="text-gold-antique font-semibold">Registration ID:</span> <span className="text-gold-bright font-mono text-lg">{participant.registrationId}</span></p>
                <p><span className="text-gold-antique font-semibold">Name:</span> {participant.name}</p>
                <p><span className="text-gold-antique font-semibold">Pass Type:</span> {participant.passType}</p>
                <p><span className="text-gold-antique font-semibold">Amount:</span> ₹{participant.amount}</p>
                <p>
                  <span className="text-gold-antique font-semibold">Payment Status:</span>{' '}
                  <span className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${
                    participant.paymentStatus === 'Approved' ? 'bg-emerald-900/60 text-emerald-400' :
                    participant.paymentStatus === 'Rejected' ? 'bg-red-900/60 text-red-400' :
                    'bg-yellow-900/60 text-yellow-300'
                  }`}>
                    {participant.paymentStatus}
                  </span>
                </p>
              </div>

            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-maroon-900/80 border border-gold-antique/30 text-center">
              <p className="font-poppins text-sm text-royal-ivory/80">
                Reg ID: <span className="text-gold-bright font-mono">{regId}</span>
              </p>
              <p className="font-poppins text-xs text-gold-warm/70 mt-2">
                Check back soon for payment status confirmation.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 text-center space-y-4">
            <p className="font-poppins text-sm text-gold-champagne font-medium">
              We'll notify you once your payment is verified.
            </p>
            <div className="flex justify-center pt-2">
              <Link
                href="/"
                className="py-3 px-8 rounded-full bg-maroon-900/80 border border-gold-antique/60 text-gold-champagne font-marcellus font-bold text-sm tracking-widest uppercase hover:bg-maroon-800 transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-maroon-900 flex items-center justify-center text-gold-champagne font-marcellus">
        Loading your Royal E-Pass...
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
