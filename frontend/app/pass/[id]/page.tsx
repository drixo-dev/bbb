"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Download, QrCode, CheckCircle, XCircle, Clock, User, Ticket } from 'lucide-react';
import QRCode from 'qrcode';
import { apiGetPass, Participant } from '@/lib/api';

function PassContent() {
  const params = useParams();
  const id = params?.id as string;
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    apiGetPass(id)
      .then(async (res) => {
        if (res.success && res.participant) {
          if (res.participant.paymentStatus === 'Approved') {
            setParticipant(res.participant);
            // Generate QR code for the pass
            try {
              const url = await QRCode.toDataURL(
                JSON.stringify({ registrationId: id, event: 'BBB2026', passType: res.participant.passType }),
                { width: 200, margin: 2, color: { dark: '#3B0811', light: '#F8F3EB' } }
              );
              setQrCodeUrl(url);
            } catch (e) {
              console.error('QR generation error:', e);
            }
          } else {
            setParticipant(null);
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  const downloadPass = async () => {
    if (!participant) return;
    try {
      const el = document.getElementById('epass-card');
      if (!el) return;
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#3B0811' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: [100, 160] });
      pdf.addImage(imgData, 'PNG', 0, 0, 100, 160);
      pdf.save(`BBB2026_EPass_${participant.registrationId}.pdf`);
    } catch (e) {
      console.error('PDF error:', e);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-maroon-900 flex items-center justify-center">
        <div className="text-center text-gold-champagne font-marcellus">
          <div className="w-10 h-10 rounded-full border-2 border-gold-antique border-t-transparent animate-spin mx-auto mb-3" />
          Fetching Royal E-Pass...
        </div>
      </div>
    );
  }

  if (!participant) {
    return (
      <div className="min-h-screen bg-maroon-900 flex items-center justify-center px-4">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="font-cinzel text-2xl text-gold-gradient mb-2">Pass Not Found</h2>
          <p className="font-poppins text-sm text-royal-ivory/70 mb-6">Invalid or expired E-Pass link.</p>
          <Link href="/" className="px-6 py-2.5 rounded-full bg-gold-antique text-maroon-900 font-marcellus font-bold text-sm">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const isCollected = participant.ticketCollected;

  const statusBadge = isCollected 
    ? { icon: CheckCircle, text: 'PASS COLLECTED', color: 'text-purple-400 border-purple-500/50 bg-purple-900/30' }
    : {
        'Approved': { icon: CheckCircle, text: 'VALID PASS', color: 'text-emerald-400 border-emerald-500/50 bg-emerald-900/30' },
        'Pending Verification': { icon: Clock, text: 'PENDING VERIFICATION', color: 'text-yellow-300 border-yellow-500/50 bg-yellow-900/30' },
        'Rejected': { icon: XCircle, text: 'PAYMENT REJECTED', color: 'text-red-400 border-red-500/50 bg-red-900/30' },
        'Not Submitted': { icon: Clock, text: 'NOT SUBMITTED', color: 'text-gray-400 border-gray-500/50 bg-gray-900/30' },
      }[participant.paymentStatus] || { icon: Clock, text: 'PENDING VERIFICATION', color: 'text-yellow-300 border-yellow-500/50 bg-yellow-900/30' };

  const StatusIcon = statusBadge.icon;

  return (
    <div className="min-h-screen bg-maroon-900 royal-damask-bg flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm">
        {/* E-Pass Card */}
        <div id="epass-card" className="box-gold-frame rounded-3xl overflow-hidden bg-maroon-800 shadow-2xl">
          {/* Header Band */}
          <div className="bg-gradient-to-r from-maroon-900 via-maroon-700 to-maroon-900 p-5 text-center border-b border-gold-antique/50">
            <div className="flex items-center justify-center gap-2 mb-1">
              <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain object-contain text-gold-champagne" />
            </div>
            <h2 className="font-cinzel text-xl font-bold text-gold-gradient tracking-wider">
              BAND BAAJA BAARAT
            </h2>
            <p className="font-marcellus text-xs text-gold-antique uppercase tracking-widest">
              Freshers 2026 • Royal E-Pass
            </p>
          </div>

          <div className="p-6 space-y-5">
            {/* Status Badge */}
            <div className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-marcellus font-bold uppercase tracking-wider ${statusBadge.color}`}>
              <StatusIcon className="w-4 h-4" />
              {statusBadge.text}
            </div>

            {/* QR Code */}
            <div className="flex flex-col items-center relative">
              {isCollected && (
                <div className="absolute inset-0 z-10 flex items-center justify-center top-0 left-0 right-0 h-48 mt-0 bg-maroon-900/80 rounded-2xl border-4 border-purple-500/50 backdrop-blur-sm">
                  <div className="transform -rotate-12 border-4 border-purple-500 text-purple-400 font-cinzel font-bold text-xl px-4 py-2 rounded-lg tracking-widest bg-maroon-950/90 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                    REDEEMED
                  </div>
                </div>
              )}
              {qrCodeUrl ? (
                <img
                  src={qrCodeUrl}
                  alt="E-Pass QR Code"
                  className={`w-48 h-48 rounded-2xl border-4 border-gold-antique shadow-gold-glow ${isCollected ? 'opacity-30 grayscale' : ''}`}
                />
              ) : (
                <div className="w-48 h-48 rounded-2xl border-4 border-gold-antique/40 flex items-center justify-center bg-maroon-900">
                  <QrCode className="w-16 h-16 text-gold-antique/60" />
                </div>
              )}
              <p className="font-mono text-xs text-gold-champagne mt-2 tracking-widest">
                {participant.registrationId}
              </p>
            </div>

            {/* Participant Info */}
            <div className="space-y-2.5 font-poppins text-xs text-royal-ivory/80 bg-maroon-900/60 rounded-xl p-4 border border-gold-antique/20">
              <div className="flex items-start gap-2">
                <User className="w-3.5 h-3.5 text-gold-antique mt-0.5 shrink-0" />
                <div>
                  <span className="text-gold-antique font-semibold block">Name</span>
                  <span className="font-medium text-royal-ivory">{participant.name}</span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Ticket className="w-3.5 h-3.5 text-gold-antique mt-0.5 shrink-0" />
                <div>
                  <span className="text-gold-antique font-semibold block">Pass</span>
                  <span>{participant.passType} — ₹{participant.amount}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gold-antique/10">
                <div>
                  <span className="text-gold-antique font-semibold block text-[10px]">Roll Number</span>
                  <span>{participant.rollNumber}</span>
                </div>
                <div>
                  <span className="text-gold-antique font-semibold block text-[10px]">School</span>
                  <span>{participant.school}</span>
                </div>
              </div>
              <div className="pt-1.5 border-t border-gold-antique/10">
                <span className="text-gold-antique font-semibold block text-[10px]">Registration Time</span>
                <span className="font-mono text-[10px] text-gold-bright">
                  {participant.createdAt ? new Date(participant.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A'}
                </span>
              </div>
              <div className="text-[10px] text-gold-champagne/80 pt-2 text-center border-t border-gold-antique/10 font-marcellus tracking-wider">
                Aug 22 2026 • 5:00 PM • <a href="https://maps.app.goo.gl/PzGUtiguipyvSKdD9" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold-antique transition-colors">The Serene Garden</a>
              </div>
            </div>

            {/* Members list */}
            {participant.members && participant.members.length > 0 && (
              <div className="rounded-xl bg-maroon-900/60 border border-gold-antique/20 p-4 space-y-1">
                <p className="font-marcellus text-xs text-gold-antique uppercase tracking-wider mb-2">Group Members</p>
                {participant.members.map((m, i) => (
                  <p key={i} className="font-poppins text-xs text-royal-ivory/80">
                    {i + 2}. {m.name} ({m.rollNumber})
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="bg-maroon-900/90 border-t border-gold-antique/30 p-3 text-center">
            <p className="font-marcellus text-[10px] text-gold-antique/70 uppercase tracking-widest">
              Show this QR at the event gate for entry
            </p>
          </div>
        </div>

        {/* Download Button */}
        <button
          onClick={downloadPass}
          className="mt-6 w-full py-3.5 rounded-full bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique text-maroon-900 font-marcellus font-bold text-sm tracking-widest uppercase shadow-gold-glow hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download Royal E-Pass PDF
        </button>

        <Link
          href="/"
          className="mt-3 block w-full py-3.5 rounded-full bg-maroon-900/80 border border-gold-antique/40 text-gold-champagne font-marcellus font-bold text-sm tracking-widest uppercase text-center hover:bg-maroon-800 transition-all"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default function PassPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-maroon-900 flex items-center justify-center text-gold-champagne font-marcellus">
        Loading E-Pass...
      </div>
    }>
      <PassContent />
    </Suspense>
  );
}
