"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Crown, LayoutDashboard, Users, DollarSign, Clock, CheckCircle, XCircle,
  Search, Filter, Download, Eye, Trash2, Edit3, QrCode, ChevronDown, LogOut, ShieldCheck, Mail
} from 'lucide-react';
import {
  apiAdminLogin, apiAdminGetStats, apiAdminGetParticipants,
  apiAdminUpdateStatus, apiAdminDeleteParticipant, getExportCSVUrl,
  apiAdminVerifyPass, Participant, apiAdminEditParticipant, apiAdminResendEmail
} from '@/lib/api';

export default function AdminPage() {
  const router = useRouter();
  const [token, setToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);

  // Dashboard data
  const [stats, setStats] = useState<Record<string, number>>({});
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [filterPass, setFilterPass] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // QR Scanner
  const [showQR, setShowQR] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [scanMessage, setScanMessage] = useState<{ text: string; success: boolean } | null>(null);
  const qrManualRef = useRef<HTMLInputElement>(null);

  // Viewing Screenshot
  const [viewingScreenshot, setViewingScreenshot] = useState<string | null>(null);

  // Rejection Modal
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReasonText, setRejectReasonText] = useState<string>('');

  // Editing Participant
  const [editingParticipant, setEditingParticipant] = useState<Participant | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', phone: '', rollNumber: '' });

  // Check token in sessionStorage on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('bbb_admin_token');
    const savedRole = sessionStorage.getItem('bbb_admin_role');
    if (savedToken) {
      if (savedRole === 'volunteer') {
        router.push('/volunteer');
        return;
      }
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const fetchData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const [statsRes, partRes] = await Promise.all([
        apiAdminGetStats(token),
        apiAdminGetParticipants(token, search, filterPass, filterStatus)
      ]);
      if (statsRes.success) setStats(statsRes.stats);
      if (partRes.success) setParticipants(partRes.participants || []);
    } catch (e) {
      console.error('Error fetching admin data:', e);
    } finally {
      setLoading(false);
    }
  }, [token, search, filterPass, filterStatus]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoggingIn(true);
    try {
      const res = await apiAdminLogin(username, password);
      if (res.success && res.token) {
        sessionStorage.setItem('bbb_admin_token', res.token);
        sessionStorage.setItem('bbb_admin_role', res.role);
        if (res.role === 'volunteer') {
            router.push('/volunteer');
            return;
        }
        setToken(res.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(res.message || 'Invalid credentials. Default: admin / admin123');
      }
    } catch {
      setLoginError('Cannot connect to backend server. Ensure it is running on port 5000.');
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('bbb_admin_token');
    sessionStorage.removeItem('bbb_admin_role');
    setToken('');
    setIsAuthenticated(false);
  };

  const handleStatusChange = async (registrationId: string, status: string) => {
    if (status === 'Rejected') {
      setRejectingId(registrationId);
      setRejectReasonText('');
      return;
    }
    const res = await apiAdminUpdateStatus(token, registrationId, status);
    if (res.success) fetchData();
  };

  const submitRejection = async () => {
    if (!rejectingId) return;
    const res = await apiAdminUpdateStatus(token, rejectingId, 'Rejected', rejectReasonText);
    if (res.success) fetchData();
    setRejectingId(null);
  };

  const handleDelete = async (registrationId: string) => {
    if (!confirm(`Delete registration ${registrationId}? This cannot be undone.`)) return;
    const res = await apiAdminDeleteParticipant(token, registrationId);
    if (res.success) fetchData();
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingParticipant) return;
    const res = await apiAdminEditParticipant(token, editingParticipant.registrationId, editForm);
    if (res.success) {
      setEditingParticipant(null);
      fetchData();
    } else {
      alert(res.message || 'Error updating participant');
    }
  };

  const handleResendEmail = async (registrationId: string) => {
    if (!confirm('Resend approval email to this participant?')) return;
    const res = await apiAdminResendEmail(token, registrationId);
    if (res.success) {
      alert('Email sent successfully!');
    } else {
      alert(res.message || 'Failed to resend email.');
    }
  };

  const handleQRVerify = async () => {
    if (!scanResult.trim()) return;
    const res = await apiAdminVerifyPass(token, scanResult.trim());
    setScanMessage({ text: res.message, success: res.valid });
    setScanResult('');
    fetchData();
  };

  // ============ LOGIN SCREEN ============
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-maroon-900 royal-damask-bg flex items-center justify-center px-4">
        <div className="max-w-md w-full box-gold-frame rounded-3xl p-8 sm:p-10 bg-maroon-800/95 shadow-2xl text-center">
          <div className="corner-ornament corner-tl" />
          <div className="corner-ornament corner-tr" />
          <div className="corner-ornament corner-bl" />
          <div className="corner-ornament corner-br" />

          <Crown className="w-12 h-12 text-gold-champagne mx-auto mb-3 animate-float" />
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-gold-gradient mb-1">
            ADMIN DASHBOARD
          </h1>
          <p className="font-poppins text-xs text-gold-warm mb-8">Band Baaja Baarat 2026 • Secure Access</p>

          {loginError && (
            <div className="mb-5 p-3 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs font-poppins">
              ⚠️ {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              required
              placeholder="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-maroon-900/60 border border-gold-antique/40 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne focus:outline-none font-poppins text-sm"
            />
            <input
              type="password"
              required
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-maroon-900/60 border border-gold-antique/40 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne focus:outline-none font-poppins text-sm"
            />
            <button
              type="submit"
              disabled={loggingIn}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique text-maroon-900 font-marcellus font-bold text-sm tracking-widest uppercase shadow-gold-glow hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5" />
              {loggingIn ? 'Authenticating...' : 'Access Royal Dashboard'}
            </button>
          </form>
          <p className="mt-4 font-poppins text-[10px] text-gold-antique/50">
            Default credentials: admin / admin123
          </p>
          <Link href="/" className="mt-3 block font-poppins text-xs text-gold-champagne/60 hover:text-gold-champagne">
            ← Back to Website
          </Link>
        </div>
      </div>
    );
  }

  // ============ DASHBOARD ============
  const statCards = [
    { label: 'Total Registered', value: stats.totalRegistrations || 0, icon: Users, color: 'text-blue-400' },
    { label: 'Revenue (Approved)', value: `₹${stats.totalRevenue || 0}`, icon: DollarSign, color: 'text-emerald-400' },
    { label: 'Pending Payments', value: stats.pendingPayments || 0, icon: Clock, color: 'text-yellow-300' },
    { label: 'Approved Payments', value: stats.approvedPayments || 0, icon: CheckCircle, color: 'text-emerald-400' },
    { label: 'Rejected Payments', value: stats.rejectedPayments || 0, icon: XCircle, color: 'text-red-400' },
    { label: 'Checked In', value: stats.checkedInCount || 0, icon: QrCode, color: 'text-purple-400' },
  ];

  return (
    <div className="min-h-screen bg-maroon-950 text-royal-ivory">
      {/* Admin Header Bar */}
      <div className="bg-maroon-900 border-b border-gold-antique/40 px-4 sm:px-6 py-4 flex items-center justify-between shadow-gold-glow sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <Crown className="w-8 h-8 text-gold-champagne" />
          <div>
            <span className="font-cinzel font-bold text-lg text-gold-gradient block">BBB 2026 Admin</span>
            <span className="font-poppins text-[10px] text-gold-champagne/60">Royal Dashboard Panel</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={getExportCSVUrl(token)}
            download
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gold-antique/50 text-gold-champagne font-marcellus text-xs hover:bg-maroon-800 transition-all"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-500/40 text-red-400 font-marcellus text-xs hover:bg-red-950/30 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((card) => (
            <div key={card.label} className="box-gold-frame rounded-2xl p-4 bg-maroon-900/80 text-center hover:shadow-gold-glow transition-all">
              <card.icon className={`w-6 h-6 ${card.color} mx-auto mb-2`} />
              <div className={`font-playfair text-2xl font-bold ${card.color}`}>{card.value}</div>
              <div className="font-poppins text-[9px] sm:text-[10px] text-royal-ivory/60 uppercase tracking-wider mt-1">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Pass Collection link */}
        <div className="box-gold-frame rounded-2xl p-6 bg-maroon-900/80">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-cinzel text-lg font-bold text-gold-gradient flex items-center gap-2">
              <QrCode className="w-5 h-5 text-gold-champagne" />
              Volunteer Pass Collection
            </h2>
            <Link
              href="/volunteer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-900 font-marcellus font-bold text-xs shadow-gold-glow hover:scale-105 transition-all whitespace-nowrap"
            >
              Pass Collection
            </Link>
          </div>
          <p className="font-poppins text-xs text-gold-warm/60">
            Navigate to the dedicated volunteer page to scan QR codes and distribute passes.
          </p>
        </div>

        {/* Participants Table */}
        <div className="box-gold-frame rounded-2xl bg-maroon-900/80">
          <div className="p-5 border-b border-gold-antique/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="font-cinzel text-lg font-bold text-gold-gradient flex items-center gap-2">
              <Users className="w-5 h-5 text-gold-champagne" />
              Registered Participants ({participants.length})
            </h2>
          </div>

          {/* Filters Bar */}
          <div className="p-4 border-b border-gold-antique/20 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-antique" />
              <input
                type="text"
                placeholder="Search name, email, roll no, reg ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-maroon-900/60 border border-gold-antique/30 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne focus:outline-none font-poppins text-xs"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterPass}
                onChange={(e) => setFilterPass(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-maroon-900/60 border border-gold-antique/30 text-royal-ivory focus:border-gold-champagne focus:outline-none font-poppins text-xs"
              >
                <option value="All">All Passes</option>
                <option value="Single Pass">Single</option>
                <option value="Couple Pass">Couple</option>
                <option value="Group Pass (4 People)">Group</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-maroon-900/60 border border-gold-antique/30 text-royal-ivory focus:border-gold-champagne focus:outline-none font-poppins text-xs"
              >
                <option value="All">All Status</option>
                <option value="Pending Verification">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
              <button
                onClick={fetchData}
                className="px-4 py-2.5 rounded-xl bg-gold-antique/20 border border-gold-antique/40 text-gold-champagne font-marcellus text-xs hover:bg-gold-antique/30 transition-all"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="py-16 text-center">
                <div className="w-8 h-8 rounded-full border-2 border-gold-antique border-t-transparent animate-spin mx-auto mb-3" />
                <p className="font-poppins text-xs text-gold-champagne/60">Loading participants...</p>
              </div>
            ) : participants.length === 0 ? (
              <div className="py-16 text-center">
                <Users className="w-12 h-12 text-gold-antique/30 mx-auto mb-3" />
                <p className="font-marcellus text-sm text-gold-champagne/60">No participants found matching filters.</p>
              </div>
            ) : (
              <table className="w-full font-poppins text-xs">
                <thead>
                  <tr className="border-b border-gold-antique/20 text-gold-antique uppercase tracking-wider text-[10px]">
                    <th className="px-4 py-3 text-left">Reg ID</th>
                    <th className="px-4 py-3 text-left">Identity</th>
                    <th className="px-4 py-3 text-left">Pass & School</th>
                    <th className="px-4 py-3 text-left">Reg Time</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Payment Details</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p) => (
                    <tr key={p.registrationId} className="border-b border-gold-antique/10 hover:bg-maroon-800/40 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono text-gold-champagne text-[11px]">{p.registrationId}</span>
                        {p.checkedIn && <span className="ml-1.5 text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-900/50 text-emerald-400">✓ In</span>}
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="text-royal-ivory font-semibold">{p.name}</p>
                          <p className="text-gold-antique/70 text-[10px]">{p.rollNumber}</p>
                          <p className="text-gold-antique/50 text-[9px]">{p.email}</p>
                          <p className="text-gold-antique/50 text-[9px]">{p.phone}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <span className="px-2.5 py-1 rounded-full bg-maroon-950 border border-gold-antique/30 text-gold-champagne text-[10px] inline-block">
                            {p.passType.replace(' (4 People)', '')}
                          </span>
                          <p className="text-gold-bright text-[10px] font-semibold">{p.school}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-royal-ivory/80">
                        {p.createdAt ? new Date(p.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }) : 'N/A'}
                      </td>
                      <td className="px-4 py-3 font-semibold text-gold-bright">₹{p.amount}</td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <span className={`px-2.5 py-1 rounded-full font-semibold text-[10px] inline-block ${
                            p.paymentStatus === 'Approved' ? 'bg-emerald-900/60 text-emerald-300' :
                            p.paymentStatus === 'Rejected' ? 'bg-red-900/60 text-red-300' :
                            'bg-yellow-900/60 text-yellow-300'
                          }`}>
                            {p.paymentStatus}
                          </span>
                          {p.paymentStatus === 'Rejected' && p.rejectionReason && (
                            <p className="text-red-400 text-[9px] max-w-[120px] truncate" title={p.rejectionReason}>
                              Reason: {p.rejectionReason}
                            </p>
                          )}
                          {p.transactionId && (
                            <p className="text-gold-antique/70 text-[9px] font-mono">UTR: {p.transactionId}</p>
                          )}
                          {(p.screenshotUrl || p.driveScreenshotUrl) && (
                            <button
                              onClick={() => {
                                const raw = p.driveScreenshotUrl || p.screenshotUrl || '';
                                const url = raw.startsWith('http') ? raw : `http://localhost:5000${raw}`;
                                setViewingScreenshot(url);
                              }}
                              className="flex items-center gap-1 text-gold-antique hover:text-gold-bright transition-colors text-[10px]"
                            >
                              <Eye className="w-3.5 h-3.5" /> View SS
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            onClick={() => handleStatusChange(p.registrationId, 'Approved')}
                            className="p-1.5 rounded-lg bg-emerald-900/40 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-800/60 transition-all"
                            title="Approve Payment"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(p.registrationId, 'Rejected')}
                            className="p-1.5 rounded-lg bg-red-900/40 border border-red-500/40 text-red-400 hover:bg-red-800/60 transition-all"
                            title="Reject Payment"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingParticipant(p);
                              setEditForm({ name: p.name, email: p.email, phone: p.phone, rollNumber: p.rollNumber });
                            }}
                            className="p-1.5 rounded-lg bg-blue-900/40 border border-blue-500/40 text-blue-400 hover:bg-blue-800/60 transition-all"
                            title="Edit Participant"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          {p.paymentStatus === 'Approved' && (
                            <>
                              <Link
                                href={`/pass/${p.registrationId}`}
                                target="_blank"
                                className="p-1.5 rounded-lg bg-purple-900/40 border border-purple-500/40 text-purple-400 hover:bg-purple-800/60 transition-all"
                                title="View E-Pass"
                              >
                                <QrCode className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => handleResendEmail(p.registrationId)}
                                className="p-1.5 rounded-lg bg-indigo-900/40 border border-indigo-500/40 text-indigo-400 hover:bg-indigo-800/60 transition-all"
                                title="Resend Approval Email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDelete(p.registrationId)}
                            className="p-1.5 rounded-lg bg-red-950/60 border border-red-900/60 text-red-600 hover:bg-red-900/40 transition-all"
                            title="Delete Registration"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Screenshot Preview Modal */}
      {viewingScreenshot && (
        <div
          onClick={() => setViewingScreenshot(null)}
          className="fixed inset-0 z-50 bg-maroon-950/95 flex items-center justify-center p-4"
        >
          <div className="relative max-w-2xl w-full box-gold-frame rounded-2xl overflow-hidden bg-maroon-900 p-4">
            <button onClick={() => setViewingScreenshot(null)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-maroon-800 border border-gold-antique/40 text-gold-champagne flex items-center justify-center hover:scale-110 transition-transform z-10">✕</button>
            <img src={viewingScreenshot} alt="Payment Screenshot" className="w-full max-h-[75vh] object-contain rounded-xl" />
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-50 bg-maroon-950/95 flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full box-gold-frame rounded-2xl overflow-hidden bg-maroon-900 p-6">
            <h3 className="text-xl font-bold text-red-400 mb-4">Reject Payment</h3>
            <p className="text-gold-champagne/80 mb-4 text-sm">
              Please provide a reason for rejecting this registration. This will be sent in the email to the participant.
            </p>
            <textarea
              className="w-full bg-maroon-900/60 border border-gold-antique/30 rounded-xl p-3 text-royal-ivory placeholder-royal-ivory/40 focus:outline-none focus:border-gold-champagne h-32 resize-none font-poppins text-sm"
              placeholder="e.g., The screenshot is blurry, please re-upload a clear image showing the UTR number."
              value={rejectReasonText}
              onChange={(e) => setRejectReasonText(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setRejectingId(null)}
                className="px-4 py-2 rounded-xl border border-gold-antique/30 text-gold-champagne hover:bg-gold-antique/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitRejection}
                className="px-4 py-2 rounded-xl bg-red-900/60 border border-red-500/40 text-red-100 hover:bg-red-800 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Participant Modal */}
      {editingParticipant && (
        <div className="fixed inset-0 z-50 bg-maroon-950/95 flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full box-gold-frame rounded-2xl overflow-hidden bg-maroon-900 p-6">
            <h3 className="text-xl font-bold text-gold-gradient mb-4">Edit Participant</h3>
            <form onSubmit={handleEditSubmit} className="space-y-4 font-poppins text-sm">
              <div>
                <label className="block text-gold-antique/80 mb-1 text-xs">Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-maroon-900/60 border border-gold-antique/30 rounded-xl p-3 text-royal-ivory placeholder-royal-ivory/40 focus:outline-none focus:border-gold-champagne"
                />
              </div>
              <div>
                <label className="block text-gold-antique/80 mb-1 text-xs">Email</label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-maroon-900/60 border border-gold-antique/30 rounded-xl p-3 text-royal-ivory placeholder-royal-ivory/40 focus:outline-none focus:border-gold-champagne"
                />
              </div>
              <div>
                <label className="block text-gold-antique/80 mb-1 text-xs">Phone</label>
                <input
                  type="text"
                  required
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full bg-maroon-900/60 border border-gold-antique/30 rounded-xl p-3 text-royal-ivory placeholder-royal-ivory/40 focus:outline-none focus:border-gold-champagne"
                />
              </div>
              <div>
                <label className="block text-gold-antique/80 mb-1 text-xs">Roll Number</label>
                <input
                  type="text"
                  required
                  value={editForm.rollNumber}
                  onChange={(e) => setEditForm({ ...editForm, rollNumber: e.target.value })}
                  className="w-full bg-maroon-900/60 border border-gold-antique/30 rounded-xl p-3 text-royal-ivory placeholder-royal-ivory/40 focus:outline-none focus:border-gold-champagne"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setEditingParticipant(null)}
                  className="px-4 py-2 rounded-xl border border-gold-antique/30 text-gold-champagne hover:bg-gold-antique/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-900 font-bold hover:scale-105 transition-all shadow-gold-glow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
