"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { QrCode, Upload, CheckCircle2, ShieldCheck, ArrowRight, Copy, Hourglass } from 'lucide-react';
import { apiGetPass, apiSubmitPayment, Participant } from '@/lib/api';
import IdentityVerificationModal from './IdentityVerificationModal';


export default function PaymentSection({ onStatusChange }: { onStatusChange?: (status: string) => void }) {
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
  const [showVerification, setShowVerification] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CASH'>('UPI');
  const [copied, setCopied] = useState(false);

  const handleCopyUPI = () => {
    navigator.clipboard.writeText('k4838447-1@okhdfcbank');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (regId) {
      apiGetPass(regId)
        .then((res) => {
          if (res.success && res.participant) {
            setParticipant(res.participant);
            onStatusChange?.(res.participant.paymentStatus);
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



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (paymentMethod === 'UPI' && !transactionId.trim()) {
      setErrorMessage('Please enter the 12-digit UPI Transaction ID / UTR Number.');
      return;
    }

    if (paymentMethod === 'UPI' && !file && !participant?.screenshotUrl) {
      setErrorMessage('Please upload your payment screenshot image as proof.');
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('registrationId', regId || '');
      
      if (paymentMethod === 'CASH') {
        formData.append('transactionId', `CASH-${regId}`);
      } else {
        formData.append('transactionId', transactionId);
        if (file) {
          formData.append('screenshot', file);
        }
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
        <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain text-gold-champagne mx-auto mb-2 animate-float" />
        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-gold-gradient mb-1">
          {(!participant || participant.paymentStatus === 'Not Submitted') ? 'ROYAL PAYMENT GATEWAY' : 'REGISTRATION STATUS'}
        </h2>
        <p className="font-poppins text-xs sm:text-sm text-gold-warm">
          {(!participant || participant.paymentStatus === 'Not Submitted')
            ? 'Scan the QR Code via GPay / PhonePe / Paytm & submit your UTR Transaction ID'
            : 'Track your registration and payment verification status.'}
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs sm:text-sm font-poppins text-center">
          ⚠️ {errorMessage}
        </div>
      )}

      {participant && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {participant.paymentStatus === 'Not Submitted' ? (
              <>
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

                  <div className="relative w-48 h-48 mx-auto bg-white p-3 rounded-2xl border-4 border-gold-antique shadow-gold-glow flex items-center justify-center">
                    <img src="/qr-code.png" alt="Payment QR Code" className="w-full h-full object-contain rounded-lg" />
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-3 bg-maroon-950/50 py-2.5 px-4 mx-auto w-max rounded-xl border border-gold-antique/20">
                    <span className="font-mono text-royal-ivory text-sm tracking-wider">k4838447-1@okhdfcbank</span>
                    <button 
                      type="button"
                      onClick={handleCopyUPI}
                      className="text-gold-champagne hover:text-white transition-colors p-1.5 rounded-lg hover:bg-maroon-800"
                      title="Copy UPI ID"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-5 rounded-2xl bg-maroon-900/80 border border-gold-antique/30 space-y-3">
                <h3 className="font-marcellus text-sm font-bold text-gold-champagne uppercase tracking-wider">
                  Registration Details
                </h3>
                <div className="space-y-2 font-poppins text-xs text-royal-ivory/80">
                  <p><strong>Name:</strong> {participant.name}</p>
                  <p><strong>Pass Type:</strong> {participant.passType}</p>
                  <p><strong>School:</strong> {participant.school}</p>
                  <p><strong>Payment Method:</strong> {participant.transactionId?.startsWith('CASH-') ? 'Cash' : 'Online (UPI)'}</p>
                  
                  <div className="pt-3 mt-3 border-t border-gold-antique/20 space-y-2">
                    <p><strong>Amount Paid:</strong> ₹{participant.amount}</p>
                    {participant.updatedAt && (
                      <div>
                        <strong>Submitted At:</strong>
                        <div className="mt-1 text-royal-ivory/70">
                          {new Date(participant.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })} <br/>
                          {new Date(participant.updatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: UTR & Screenshot Upload Form or Status */}
          <div>
            {participant.paymentStatus === 'Pending Verification' && (
              <div className="p-8 rounded-2xl bg-maroon-900/60 border border-gold-antique/30 text-center space-y-4">
                <Hourglass className="w-12 h-12 text-yellow-400 mx-auto animate-pulse" />
                <h3 className="font-marcellus text-xl font-bold text-gold-bright">
                  Payment Received
                </h3>
                <p className="font-poppins text-sm text-royal-ivory/80">
                  Current Status: <strong className="text-yellow-400">Pending Verification</strong>
                </p>
                <div className="pt-4 border-t border-gold-antique/20 space-y-3">
                  <p className="font-poppins text-xs text-royal-ivory/80 leading-relaxed">
                    Your payment details have been received successfully.
                  </p>
                  <p className="font-poppins text-xs text-royal-ivory/80 leading-relaxed">
                    Our team is currently verifying your payment.
                  </p>
                  <p className="font-poppins text-xs text-royal-ivory/60 leading-relaxed">
                    Verification may take some time depending on the number of registrations.
                  </p>
                  <p className="font-poppins text-xs font-medium text-gold-champagne leading-relaxed pt-2">
                    You can safely close this page and check your status later.
                  </p>
                </div>
              </div>
            )}

            {participant.paymentStatus === 'Approved' && (
              <div className="p-8 rounded-2xl bg-maroon-900/60 border border-gold-antique/30 text-center space-y-4">
                <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="font-marcellus text-xl font-bold text-emerald-400">
                  Payment Verified
                </h3>
                <p className="font-poppins text-sm text-royal-ivory/80">
                  Current Status: <strong className="text-emerald-400">Approved</strong>
                </p>
                <div className="pt-4 border-t border-gold-antique/20">
                  <p className="font-poppins text-xs text-royal-ivory/80">
                    Your registration has been successfully verified.
                  </p>
                </div>
                <button
                  onClick={() => setShowVerification(true)}
                  className="mt-6 w-full py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400 text-maroon-900 font-bold tracking-widest text-sm uppercase shadow-lg hover:scale-[1.02] transition-transform"
                >
                  View E-Pass
                </button>
              </div>
            )}

            {(participant.paymentStatus === 'Not Submitted' || participant.paymentStatus === 'Rejected') && (
              <div className="space-y-6">
                {participant.paymentStatus === 'Rejected' && (
                  <div className="p-6 rounded-2xl bg-red-950/40 border border-red-500/30 text-center space-y-4">
                    <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2 text-red-400">
                      <span className="text-3xl font-bold">×</span>
                    </div>
                    <h3 className="font-marcellus text-xl font-bold text-red-400">
                      Verification Failed
                    </h3>
                    <p className="font-poppins text-sm text-royal-ivory/80">
                      Current Status: <strong className="text-red-400">Rejected</strong>
                    </p>
                    <div className="pt-4 border-t border-red-500/20 text-left bg-red-950/30 p-4 rounded-xl mt-4">
                      <p className="font-poppins text-xs font-semibold text-red-300 mb-1">Reason:</p>
                      <p className="font-poppins text-sm text-red-200">{participant.rejectionReason || 'Invalid proof of payment'}</p>
                    </div>
                    <p className="font-poppins text-xs text-royal-ivory/60 mt-4">
                      Please correct the issue and submit again.
                    </p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="p-5 rounded-2xl bg-maroon-900/60 border border-gold-antique/30 space-y-4">
                    <h3 className="font-marcellus text-sm font-bold text-gold-bright flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      Submit Payment Verification Details
                    </h3>

                    <div className="flex gap-4 mb-4">
                      <label className={`flex-1 p-3 rounded-xl border cursor-pointer text-center transition-colors ${paymentMethod === 'UPI' ? 'bg-maroon-800 border-gold-champagne text-gold-champagne' : 'bg-maroon-900/40 border-gold-antique/20 text-royal-ivory/60'}`}>
                        <input type="radio" name="paymentMethod" value="UPI" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="hidden" />
                        <span className="font-marcellus text-sm font-bold tracking-wider">Pay via UPI</span>
                      </label>
                      <label className={`flex-1 p-3 rounded-xl border cursor-pointer text-center transition-colors ${paymentMethod === 'CASH' ? 'bg-maroon-800 border-gold-champagne text-gold-champagne' : 'bg-maroon-900/40 border-gold-antique/20 text-royal-ivory/60'}`}>
                        <input type="radio" name="paymentMethod" value="CASH" checked={paymentMethod === 'CASH'} onChange={() => setPaymentMethod('CASH')} className="hidden" />
                        <span className="font-marcellus text-sm font-bold tracking-wider">Pay in Cash</span>
                      </label>
                    </div>

                    {paymentMethod === 'UPI' && (
                      <>
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
                      </>
                    )}
                    {paymentMethod === 'CASH' && (
                      <div className="p-4 rounded-xl bg-maroon-800/50 border border-gold-antique/30 text-center">
                        <p className="font-poppins text-sm text-royal-ivory/90 leading-relaxed">
                          You have selected <strong>Cash Payment</strong>.
                          <br/><br/>
                          Please pay the total amount of <strong className="text-gold-champagne font-playfair text-lg">₹{participant.amount}</strong> to our registration team.
                          <br/><br/>
                          Once paid, your E-Pass QR code will be approved and sent to your email!
                        </p>
                      </div>
                    )}
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
              </div>
            )}
          </div>
        </div>
      )}

      {showVerification && participant && (
        <IdentityVerificationModal
          isOpen={showVerification}
          registrationId={participant.registrationId}
          onClose={() => setShowVerification(false)}
          onSuccess={() => {
            router.push(`/success?regId=${participant.registrationId}`);
            setShowVerification(false);
          }}
        />
      )}
    </div>
  );
}
