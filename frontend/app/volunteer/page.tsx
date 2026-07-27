"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { QrCode, Search, ShieldCheck, Ticket } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';
import { apiAdminLogin, apiVolunteerGetParticipant, apiVolunteerCollectPass, Participant } from '@/lib/api';

export default function VolunteerPage() {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Scanner state
  const [scanResult, setScanResult] = useState<string>('');
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [participant, setParticipant] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ text: string; success: boolean } | null>(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem('bbb_admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const res = await apiAdminLogin(username, password);
      if (res.success && res.token) {
        sessionStorage.setItem('bbb_admin_token', res.token);
        sessionStorage.setItem('bbb_admin_role', res.role);
        setToken(res.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(res.message || 'Invalid credentials.');
      }
    } catch {
      setLoginError('Cannot connect to backend server. If a deployment is in progress, please wait 1-2 minutes and try again.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('bbb_admin_token');
    sessionStorage.removeItem('bbb_admin_role');
    setToken('');
    setIsAuthenticated(false);
    setParticipant(null);
  };

  useEffect(() => {
    if (!isAuthenticated || !showScanner) {
      if (scannerRef.current) {
        if (scannerRef.current.isScanning) {
          scannerRef.current.stop().then(() => {
            scannerRef.current?.clear();
            scannerRef.current = null;
          }).catch(console.error);
        } else {
          scannerRef.current.clear();
          scannerRef.current = null;
        }
      }
      return;
    }

    const startScanner = async () => {
      try {
        const html5QrCode = new Html5Qrcode("reader");
        scannerRef.current = html5QrCode;
        
        // This directly triggers the browser native permission prompt
        await html5QrCode.start(
          { facingMode: "environment" }, // Prefer back camera
          {
            fps: 10,
            qrbox: { width: 250, height: 250 }
          },
          (decodedText) => {
            setScanResult(decodedText);
            setShowScanner(false); // Stop scanner on success
            verifyRegistration(decodedText);
          },
          (errorMessage) => {
            // Ignored frame-level scan errors
          }
        );
      } catch (err) {
        console.error("Scanner init error", err);
        setActionMessage({ text: "Camera access denied or unavailable. Please ensure permissions are granted.", success: false });
        setShowScanner(false);
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current) {
        if (scannerRef.current.isScanning) {
          scannerRef.current.stop().then(() => {
            scannerRef.current?.clear();
          }).catch(console.error);
        } else {
          try { scannerRef.current.clear(); } catch(e) {}
        }
        scannerRef.current = null;
      }
    };
  }, [isAuthenticated, showScanner]);

  const verifyRegistration = async (id: string) => {
    if (!id) return;
    setLoading(true);
    setActionMessage(null);
    setParticipant(null);
    try {
      const res = await apiVolunteerGetParticipant(token, id);
      if (res.success) {
        setParticipant(res.participant);
      } else {
        setActionMessage({ text: res.message || 'Registration not found', success: false });
      }
    } catch (err) {
      setActionMessage({ text: 'Error verifying registration', success: false });
    } finally {
      setLoading(false);
    }
  };

  const handleCollectPass = async () => {
    if (!participant) return;
    if (!confirm(`Are you sure you want to mark the pass for ${participant.name} as COLLECTED?`)) return;

    setLoading(true);
    setActionMessage(null);
    try {
      const res = await apiVolunteerCollectPass(token, participant.registrationId);
      if (res.success) {
        setParticipant(res.participant);
        setActionMessage({ text: 'Pass successfully collected!', success: true });
      } else {
        setActionMessage({ text: res.message || 'Failed to collect pass', success: false });
        if (res.participant) {
            setParticipant({ ...participant, ...res.participant });
        }
      }
    } catch (err) {
      setActionMessage({ text: 'Error collecting pass', success: false });
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-maroon-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold-antique/5 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gold-champagne/10 blur-[120px]"></div>
        </div>

        <div className="w-full max-w-md box-gold-frame rounded-3xl p-8 sm:p-12 bg-maroon-900/80 backdrop-blur-xl relative z-10 shadow-2xl">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-antique to-gold-champagne flex items-center justify-center shadow-gold-glow">
              <ShieldCheck className="w-8 h-8 text-maroon-900" />
            </div>
          </div>
          
          <h1 className="font-cinzel text-2xl font-bold text-center text-gold-gradient mb-2 uppercase">
            Volunteer Access
          </h1>
          <p className="text-center text-gold-warm/70 font-poppins text-sm mb-8">
            Authenticate to access Pass Collection
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gold-warm/80 font-poppins text-xs font-semibold mb-2 uppercase tracking-wider">Email</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-maroon-900/60 border border-gold-antique/30 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne/50 outline-none transition-all font-poppins"
                placeholder="volunteer@bbb.com"
                required
              />
            </div>
            <div>
              <label className="block text-gold-warm/80 font-poppins text-xs font-semibold mb-2 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-maroon-900/60 border border-gold-antique/30 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne/50 outline-none transition-all font-poppins"
                placeholder="••••••••"
                required
              />
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-red-950/50 border border-red-500/30 text-red-300 text-xs font-poppins text-center">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-900 font-marcellus font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-gold-glow flex justify-center items-center mt-4"
            >
              {loggingIn ? (
                <div className="w-6 h-6 border-2 border-maroon-900 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                'Authenticate'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-maroon-950 relative overflow-hidden flex flex-col">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #E5C07B 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-champagne/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gold-antique/20 bg-maroon-950/80 backdrop-blur-md sticky top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-antique to-gold-champagne flex items-center justify-center">
              <Ticket className="w-5 h-5 text-maroon-900" />
            </div>
            <div>
              <h1 className="font-cinzel text-lg sm:text-xl font-bold text-gold-gradient tracking-wider">
                BBB 2026 PASS COLLECTION
              </h1>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="px-4 py-2 rounded-full border border-gold-antique/40 text-gold-champagne font-poppins text-xs hover:bg-maroon-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-4 py-8 flex flex-col gap-8">
        
        {/* Scanner Section */}
        <div className="box-gold-frame rounded-2xl p-6 bg-maroon-900/80 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="font-cinzel text-xl font-bold text-gold-gradient flex items-center gap-2">
              <QrCode className="w-6 h-6 text-gold-champagne" />
              Scan QR Code
            </h2>
            <button
              onClick={() => setShowScanner(!showScanner)}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-900 font-marcellus font-bold text-sm hover:scale-105 transition-all shadow-gold-glow"
            >
              {showScanner ? 'Hide Scanner' : 'Open Scanner'}
            </button>
          </div>

          {showScanner && (
            <div className="w-full max-w-sm mx-auto overflow-hidden rounded-xl border border-gold-antique/40 bg-maroon-950/50">
              <div id="reader" className="w-full h-full"></div>
            </div>
          )}

          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-gold-antique/20"></div>
            <span className="font-cinzel text-gold-warm/60 text-xs">OR</span>
            <div className="flex-1 border-t border-gold-antique/20"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter Reg ID, Email, or Roll No..."
              value={scanResult}
              onChange={(e) => setScanResult(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && verifyRegistration(scanResult)}
              className="flex-1 px-5 py-4 rounded-xl bg-maroon-900/60 border border-gold-antique/30 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne outline-none font-poppins text-sm"
            />
            <button
              onClick={() => verifyRegistration(scanResult)}
              disabled={loading}
              className="px-8 py-4 rounded-xl bg-maroon-800 border border-gold-antique/40 text-gold-champagne font-marcellus font-bold hover:bg-maroon-700 transition-colors flex items-center justify-center"
            >
              Verify
            </button>
          </div>
        </div>

        {/* Status Messages */}
        {actionMessage && (
          <div className={`p-5 rounded-xl border flex items-center gap-3 font-poppins text-sm ${
            actionMessage.success 
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' 
              : 'bg-red-950/40 border-red-500/40 text-red-300'
          }`}>
            <div className={`w-2 h-2 rounded-full ${actionMessage.success ? 'bg-emerald-400' : 'bg-red-400'}`}></div>
            {actionMessage.text}
          </div>
        )}

        {/* Participant Details */}
        {participant && (
          <div className="box-gold-frame rounded-2xl bg-maroon-900/80 overflow-hidden">
            <div className="p-6 border-b border-gold-antique/20 bg-maroon-950/30">
              <h3 className="font-cinzel text-xl font-bold text-gold-gradient mb-1">
                {participant.name}
              </h3>
              <p className="font-mono text-sm text-gold-warm/70">
                {participant.registrationId}
              </p>
            </div>
            
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] uppercase tracking-wider font-poppins text-gold-warm/50 mb-1">Roll Number</div>
                <div className="font-mono text-royal-ivory">{participant.rollNumber}</div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider font-poppins text-gold-warm/50 mb-1">Contact Details</div>
                <div className="font-poppins text-royal-ivory text-sm truncate">{participant.email}</div>
                <div className="font-poppins text-royal-ivory text-sm">{participant.phone}</div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-wider font-poppins text-gold-warm/50 mb-1">Institution</div>
                <div className="font-poppins text-royal-ivory text-sm">{participant.school}</div>
              </div>
              
              <div>
                <div className="text-[10px] uppercase tracking-wider font-poppins text-gold-warm/50 mb-1">Pass Type</div>
                <div className="font-poppins text-royal-ivory">{participant.passType}</div>
                {participant.members && participant.members.length > 0 && (
                  <div className="text-xs text-gold-warm/70 mt-1">
                    Members: {participant.members.map((m: any) => `${m.name} (${m.rollNumber})`).join(', ')}
                  </div>
                )}
              </div>
              
              <div>
                <div className="text-[10px] uppercase tracking-wider font-poppins text-gold-warm/50 mb-1">Payment Status</div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  participant.paymentStatus === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                  participant.paymentStatus === 'Rejected' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                  'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                }`}>
                  {participant.paymentStatus}
                </div>
              </div>
              
              <div>
                <div className="text-[10px] uppercase tracking-wider font-poppins text-gold-warm/50 mb-1">Pass Collection</div>
                {participant.ticketCollected ? (
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                      Pass already collected
                    </div>
                    <div className="text-xs text-gold-warm/60 font-poppins mt-1">
                      Collected At: {new Date(participant.collectedAt).toLocaleString()}
                    </div>
                    <div className="text-xs text-gold-warm/60 font-poppins mt-1">
                      Collected By: {participant.collectedBy || 'Unknown'}
                    </div>
                  </div>
                ) : (
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/10 text-gray-400 border border-gray-500/20">
                    Not Collected
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-maroon-950/40 border-t border-gold-antique/20 flex justify-end">
              <button
                onClick={handleCollectPass}
                disabled={loading || participant.paymentStatus !== 'Approved' || participant.ticketCollected}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-900 font-marcellus font-bold text-sm uppercase shadow-gold-glow hover:scale-[1.02] transition-all disabled:opacity-50 disabled:grayscale disabled:pointer-events-none"
              >
                Mark Pass Collected
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
