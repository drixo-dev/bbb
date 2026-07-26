"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Crown, Download, Sparkles, CheckCircle, Ticket, Share2 } from 'lucide-react';
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

  const downloadReceipt = () => {
    if (!participant) return;

    // Open a clean print window with receipt content
    const printWindow = window.open('', '_blank', 'width=700,height=900');
    if (!printWindow) {
      alert('Pop-up blocked! Please allow pop-ups for this site to download receipt.');
      return;
    }

    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    printWindow.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>BBB 2026 Receipt - ${participant.registrationId}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Poppins:wght@400;600&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: #fff;
      font-family: 'Poppins', sans-serif;
      color: #1a0008;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .receipt {
      max-width: 600px;
      margin: 30px auto;
      border: 3px solid #B8860B;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0,0,0,0.15);
    }

    .header {
      background: linear-gradient(135deg, #3B0811 0%, #5C0E1E 50%, #3B0811 100%);
      padding: 32px 24px;
      text-align: center;
      border-bottom: 3px solid #D4AF37;
    }

    .header h1 {
      font-family: 'Cinzel', serif;
      font-size: 28px;
      font-weight: 900;
      color: #D4AF37;
      letter-spacing: 4px;
      margin-bottom: 4px;
    }

    .header p {
      font-family: 'Cormorant Garamond', serif;
      font-size: 16px;
      color: #E8D5B7;
      font-style: italic;
    }

    .crown-icon {
      font-size: 36px;
      margin-bottom: 10px;
    }

    .badge {
      display: inline-block;
      background: rgba(212,175,55,0.15);
      border: 1px solid #D4AF37;
      color: #D4AF37;
      padding: 4px 16px;
      border-radius: 999px;
      font-size: 11px;
      letter-spacing: 3px;
      font-family: 'Cinzel', serif;
      font-weight: 700;
      margin-top: 10px;
    }

    .body {
      background: #fefefe;
      padding: 28px 32px;
    }

    .status-banner {
      background: ${participant.paymentStatus === 'Approved' ? '#d1fae5' : participant.paymentStatus === 'Rejected' ? '#fee2e2' : '#fef9c3'};
      border: 1px solid ${participant.paymentStatus === 'Approved' ? '#34d399' : participant.paymentStatus === 'Rejected' ? '#f87171' : '#fbbf24'};
      border-radius: 8px;
      padding: 10px 16px;
      margin-bottom: 20px;
      text-align: center;
      font-weight: 600;
      color: ${participant.paymentStatus === 'Approved' ? '#065f46' : participant.paymentStatus === 'Rejected' ? '#7f1d1d' : '#713f12'};
      font-size: 13px;
    }

    .field-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 11px 0;
      border-bottom: 1px solid #f0e6d3;
      font-size: 14px;
    }

    .field-row:last-child { border-bottom: none; }

    .field-label {
      color: #8B5E1A;
      font-weight: 600;
      font-size: 12px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    .field-value {
      color: #1a0008;
      font-weight: 600;
      text-align: right;
      max-width: 60%;
    }

    .reg-id {
      font-family: 'Courier New', monospace;
      font-size: 18px;
      font-weight: 700;
      color: #3B0811;
      letter-spacing: 1px;
    }

    .amount {
      font-size: 18px;
      font-weight: 700;
      color: #B8860B;
    }

    .note {
      background: #fdf8ee;
      border: 1px dashed #D4AF37;
      border-radius: 8px;
      padding: 12px 16px;
      margin-top: 20px;
      font-size: 12px;
      color: #7a5a20;
      text-align: center;
      line-height: 1.6;
    }

    .footer {
      background: #3B0811;
      padding: 16px 24px;
      text-align: center;
      color: #D4AF37;
      font-size: 11px;
      font-family: 'Cinzel', serif;
      letter-spacing: 2px;
    }

    .divider {
      width: 80px;
      height: 2px;
      background: linear-gradient(to right, transparent, #D4AF37, transparent);
      margin: 16px auto;
    }

    .generated-at {
      font-size: 10px;
      color: #9ca3af;
      text-align: center;
      margin-top: 12px;
      font-style: italic;
    }

    @media print {
      body { margin: 0; }
      .receipt { margin: 0; border-radius: 0; box-shadow: none; max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <div class="crown-icon">👑</div>
      <h1>BAND BAAJA BAARAT</h1>
      <p>The Grand Royal Celebration 2026</p>
      <div class="badge">REGISTRATION RECEIPT</div>
    </div>

    <div class="body">
      <div class="status-banner">
        Payment Status: ${participant.paymentStatus}
        ${participant.paymentStatus === 'Approved' ? ' ✓ Verified' : participant.paymentStatus === 'Rejected' ? ' ✗ Please re-submit' : ' ⏳ Awaiting Verification'}
      </div>

      <div class="divider"></div>

      <div class="field-row">
        <span class="field-label">Registration ID</span>
        <span class="field-value reg-id">${participant.registrationId}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Full Name</span>
        <span class="field-value">${participant.name}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Phone</span>
        <span class="field-value">${participant.phone || '—'}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Pass Type</span>
        <span class="field-value">${participant.passType}</span>
      </div>
      <div class="field-row">
        <span class="field-label">School / Branch</span>
        <span class="field-value">${(participant as any).school || '—'} / ${participant.branch || '—'}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Amount Paid</span>
        <span class="field-value amount">₹${participant.amount}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Event Date</span>
        <span class="field-value">22nd August 2026 &mdash; 5:00 PM onwards</span>
      </div>
      ${(participant as any).registeredAt ? `
      <div class="field-row">
        <span class="field-label">Registered At</span>
        <span class="field-value">${new Date((participant as any).registeredAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</span>
      </div>` : ''}

      <div class="note">
        📌 <strong>Important:</strong> Your QR E-Pass will be activated once payment is verified.<br/>
        Keep this receipt and your Registration ID safe for event entry.
      </div>

      <p class="generated-at">Generated on: ${now} IST</p>
    </div>

    <div class="footer">
      BAND BAAJA BAARAT 2026 &bull; OFFICIAL RECEIPT
    </div>
  </div>

  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>
    `);
    printWindow.document.close();
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

              <div className="p-4 rounded-2xl bg-gold-antique/10 border border-gold-antique/30 text-center">
                <Ticket className="w-5 h-5 text-gold-champagne mx-auto mb-2" />
                <p className="font-poppins text-xs text-royal-ivory/80">
                  Your personalized <strong className="text-gold-champagne">QR E-Pass</strong> will be active once payment is verified by admin. Keep your Registration ID safe!
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
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={downloadReceipt}
              className="py-3 rounded-full bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique text-maroon-900 font-marcellus font-bold text-sm tracking-widest uppercase shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </button>

            <Link
              href="/"
              className="py-3 rounded-full bg-maroon-900/80 border border-gold-antique/60 text-gold-champagne font-marcellus font-bold text-sm tracking-widest uppercase hover:bg-maroon-800 transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Back to Home
            </Link>
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
