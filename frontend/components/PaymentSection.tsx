"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Crown, QrCode, Upload, CheckCircle2, ShieldCheck, Copy, ArrowRight } from 'lucide-react';
import { apiGetPass, apiSubmitPayment, Participant } from '@/lib/api';

export default function PaymentSection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const regId = searchParams?.get('regId');

  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loadingPass, setLoadingPass] = useState(true);
  const [transactionId, setTransactionId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (regId) {
      apiGetPass(regId)
        .then((res) => {
          if (res.success && res.participant) {
            setParticipant(res.participant);
          } else {
            setErrorMessage('Invalid or expired registration reference ID.');
          }
        })
        .catch(() => setErrorMessage('Error connecting to database server.'))
        .finally(() => setLoadingPass(false));
    } else {
      setLoadingPass(false);
      setErrorMessage('No Registration ID specified in payment request.');
    }
  }, [regId]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const copyUPI = () => {
    navigator.clipboard.writeText('bbb2026@upi');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!transactionId.trim()) {
      setErrorMessage('Please enter the 12-digit UPI Transaction ID / UTR Number.');
      return;
    }

    if (!file && !participant?.screenshotUrl) {
      setErrorMessage('Please upload your payment screenshot image as proof.');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('registrationId', regId || '');
      formData.append('transactionId', transactionId);
      if (file) {
        formData.append('screenshot', file);
      }

      const response = await apiSubmitPayment(formData);

      if (response.success) {
        router.push(`/success?regId=${regId}`);
      } else {
        setErrorMessage(response.message || 'Payment submission failed.');
      }
    } catch (err) {
      setErrorMessage('Error submitting payment. Please ensure file size is under 10MB.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingPass) {
    return (
      <div className="text-center py-16 text-gold-champagne font-marcellus text-lg">
        Loading Royal Payment Gateway...
      </div>
    );
  }

  return (
    <div className="box-gold-frame rounded-3xl p-6 sm:p-10 bg-maroon-800/90 shadow-2xl relative">
      <div className="corner-ornament corner-tl" />
      <div className="corner-ornament corner-tr" />
      <div className="corner-ornament corner-bl" />
      <div className="corner-ornament corner-br" />

      <div className="text-center mb-8">
        <Crown className="w-10 h-10 text-gold-champagne mx-auto mb-2 animate-float" />
        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-gold-gradient mb-1">
          ROYAL PAYMENT GATEWAY
        </h2>
        <p className="font-poppins text-xs sm:text-sm text-gold-warm">
          Scan the QR Code via GPay / PhonePe / Paytm & submit your UTR Transaction ID
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs sm:text-sm font-poppins text-center">
          ⚠️ {errorMessage}
        </div>
      )}

      {participant && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Order Summary & QR Code */}
          <div className="space-y-6">
            {/* Registration Summary Card */}
            <div className="p-5 rounded-2xl bg-maroon-900/80 border border-gold-antique/30 space-y-3">
              <h3 className="font-marcellus text-sm font-bold text-gold-champagne uppercase tracking-wider">
                Registration Summary
              </h3>
              <div className="space-y-1.5 font-poppins text-xs text-royal-ivory/80">
                <p><strong>Registration ID:</strong> <span className="text-gold-bright font-mono">{participant.registrationId}</span></p>
                <p><strong>Name:</strong> {participant.name}</p>
                <p><strong>Pass Category:</strong> {participant.passType}</p>
                <p><strong>School & Roll:</strong> {participant.school} ({participant.rollNumber})</p>
              </div>

              <div className="pt-3 border-t border-gold-antique/20 flex items-center justify-between">
                <span className="font-marcellus text-sm text-royal-ivory">Total Payable:</span>
                <span className="font-playfair text-3xl font-extrabold text-gold-bright">
                  ₹{participant.amount}
                </span>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-maroon-900 to-maroon-950 border border-gold-antique/50 text-center shadow-xl">
              <p className="font-marcellus text-xs text-gold-champagne uppercase tracking-wider mb-4">
                Official Event UPI QR Code
              </p>

              {/* QR Code Graphic Box */}
              <div className="relative w-48 h-48 mx-auto bg-white p-3 rounded-2xl border-4 border-gold-antique shadow-gold-glow flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Decorative QR Lines */}
                  <rect x="5" y="5" width="30" height="30" fill="#3B0811" />
                  <rect x="10" y="10" width="20" height="20" fill="#FFFFFF" />
                  <rect x="14" y="14" width="12" height="12" fill="#D4AF37" />

                  <rect x="65" y="5" width="30" height="30" fill="#3B0811" />
                  <rect x="70" y="10" width="20" height="20" fill="#FFFFFF" />
                  <rect x="74" y="14" width="12" height="12" fill="#D4AF37" />

                  <rect x="5" y="65" width="30" height="30" fill="#3B0811" />
                  <rect x="10" y="70" width="20" height="20" fill="#FFFFFF" />
                  <rect x="14" y="74" width="12" height="12" fill="#D4AF37" />

                  {/* Random QR pattern fill */}
                  <rect x="40" y="10" width="10" height="10" fill="#3B0811" />
                  <rect x="45" y="25" width="15" height="10" fill="#6E1529" />
                  <rect x="10" y="40" width="15" height="15" fill="#3B0811" />
                  <rect x="35" y="40" width="25" height="25" fill="#D4AF37" />
                  <rect x="70" y="45" width="20" height="15" fill="#3B0811" />
                  <rect x="45" y="70" width="15" height="20" fill="#6E1529" />
                  <rect x="70" y="75" width="15" height="15" fill="#D4AF37" />
                </svg>

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-maroon-900 border-2 border-gold-antique flex items-center justify-center text-gold-champagne font-cinzel font-bold text-xs">
                    BBB
                  </div>
                </div>
              </div>

              {/* UPI ID Info */}
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-maroon-800 border border-gold-antique/40 text-xs font-poppins text-gold-champagne">
                <span>UPI VPA: <strong>bbb2026@upi</strong></span>
                <button
                  type="button"
                  onClick={copyUPI}
                  className="p-1 text-gold-antique hover:text-white transition-colors"
                  title="Copy UPI VPA"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {copied && <span className="text-emerald-400 font-bold text-[10px]">Copied!</span>}
              </div>
            </div>
          </div>

          {/* Right Column: UTR & Screenshot Upload Form or Status */}
          <div>
            {participant.paymentStatus === 'Pending Verification' || participant.paymentStatus === 'Approved' ? (
              <div className="p-8 rounded-2xl bg-maroon-900/60 border border-gold-antique/30 text-center space-y-4">
                <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-marcellus text-xl font-bold text-gold-bright">
                  Payment Submitted
                </h3>
                <p className="font-poppins text-sm text-royal-ivory/80">
                  Current Status: <strong className="text-gold-champagne">{participant.paymentStatus}</strong>
                </p>
                {participant.paymentStatus === 'Pending Verification' && (
                  <p className="font-poppins text-xs text-royal-ivory/60 mt-2">
                    Your payment is currently being verified by our team. Please check back later.
                  </p>
                )}
                {participant.paymentStatus === 'Approved' && (
                  <button
                    onClick={() => router.push(`/success?regId=${regId}`)}
                    className="mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-900 font-bold tracking-widest text-sm"
                  >
                    View E-Pass
                  </button>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {participant.paymentStatus === 'Rejected' && participant.rejectionReason && (
                  <div className="mb-4 p-4 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-sm font-poppins text-center">
                    <strong>Admin Rejection Reason:</strong> {participant.rejectionReason}
                  </div>
                )}
                <div className="p-5 rounded-2xl bg-maroon-900/60 border border-gold-antique/30 space-y-4">
                  <h3 className="font-marcellus text-sm font-bold text-gold-bright flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Submit Payment Verification Details
                  </h3>

                  <div>
                    <label className="font-poppins text-xs text-royal-ivory/80 block mb-1">
                      UPI Transaction ID / UTR Number * (12 Digits)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 429810982312"
                      value={transactionId}
                      onChange={(e) => setTransactionId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-maroon-900/60 border border-gold-antique/40 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne focus:outline-none focus:ring-1 focus:ring-gold-champagne font-poppins text-sm tracking-wider font-mono"
                    />
                    <p className="font-poppins text-[10px] text-gold-champagne/70 mt-1">
                      Found in your GPay / PhonePe / Paytm payment status details
                    </p>
                  </div>

                  <div>
                    <label className="font-poppins text-xs text-royal-ivory/80 block mb-1">
                      Upload Payment Screenshot *
                    </label>
                    <div className="relative border-2 border-dashed border-gold-antique/40 rounded-2xl p-4 text-center bg-maroon-950/60 hover:border-gold-champagne transition-colors cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      {previewUrl ? (
                        <div className="space-y-2">
                          <img src={previewUrl} alt="Screenshot preview" className="max-h-32 mx-auto rounded-lg border border-gold-antique shadow-md" />
                          <p className="font-poppins text-xs text-emerald-400 flex items-center justify-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> Screenshot attached! Click to change.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2 py-3">
                          <Upload className="w-8 h-8 text-gold-champagne mx-auto group-hover:scale-110 transition-transform" />
                          <p className="font-marcellus text-xs text-gold-champagne">
                            Click or Drag to Upload Payment Screenshot
                          </p>
                          <p className="font-poppins text-[10px] text-royal-ivory/50">
                            Supports JPG, PNG, WebP up to 10MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique text-maroon-900 font-marcellus font-bold text-base tracking-widest uppercase shadow-gold-intense hover:scale-[1.02] transition-all duration-300 border border-gold-champagne flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Saving Payment Details...</span>
                  ) : (
                    <>
                      <span>Confirm & Finish Registration</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                
                {participant.paymentStatus === 'Not Submitted' && (
                  <div className="text-center mt-4">
                    <p className="text-xs text-royal-ivory/60 font-poppins mb-2">Need to change something?</p>
                    <button 
                      type="button"
                      onClick={() => router.push(`/register?edit=${regId}`)}
                      className="text-sm text-gold-champagne hover:text-white underline font-marcellus transition-colors"
                    >
                      Edit Registration
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
