"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sparkles, User, Mail, Phone, GraduationCap, Users, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { apiRegister, Member } from '@/lib/api';
import ResumeRegistrationModal from './ResumeRegistrationModal';

export default function RegistrationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const urlPass = searchParams?.get('pass');
  const initialPass = urlPass || 'Single Pass';
  const editRegId = searchParams?.get('edit');
  const [isEditMode, setIsEditMode] = useState(!!editRegId);

  const [passType, setPassType] = useState<string>(initialPass);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    phone: '',
    school: 'SOT',
  });

  const [members, setMembers] = useState<Member[]>([
    { name: '', rollNumber: '' },
    { name: '', rollNumber: '' },
    { name: '', rollNumber: '' },
  ]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    if (searchParams?.get('pass')) {
      const p = searchParams.get('pass');
      setPassType(p || 'Single Pass');
    }
  }, [searchParams]);

  useEffect(() => {
    if (editRegId) {
      import('@/lib/api').then(({ apiGetPass }) => {
        apiGetPass(editRegId).then((res) => {
          if (res.success && res.participant) {
            const p = res.participant;
            setFormData({
              name: p.name,
              rollNumber: p.rollNumber,
              email: p.email,
              phone: p.phone,
              school: p.school
            });
            setPassType(p.passType);
            
            const fetchedMembers = p.members || [];
            const newMembers = [...fetchedMembers];
            while (newMembers.length < 3) {
              newMembers.push({ name: '', rollNumber: '' });
            }
            setMembers(newMembers);
          }
        });
      });
    }
  }, [editRegId]);

  const requiredExtraMembers = passType === 'Couple Pass' ? 1 : passType === 'Group Pass (4 People)' ? 3 : 0;

  const handleMemberChange = (index: number, field: keyof Member, value: string) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!formData.name.trim() || !formData.rollNumber.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in all required lead participant details.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/[^0-9]/g, ''))) {
      setErrorMessage('Please enter a valid 10-digit mobile phone number.');
      return;
    }

    // Member validation if couple or group
    for (let i = 0; i < requiredExtraMembers; i++) {
      if (!members[i].name.trim() || !members[i].rollNumber.trim()) {
        setErrorMessage(`Please provide Name and Roll Number for Member ${i + 2}.`);
        return;
      }
    }

    setLoading(true);

    try {
      const activeMembers = members.slice(0, requiredExtraMembers);
      
      let response;
      if (isEditMode && editRegId) {
        const { apiEditRegistration } = await import('@/lib/api');
        response = await apiEditRegistration(editRegId, {
          ...formData,
          passType: passType as 'Single Pass' | 'Couple Pass' | 'Group Pass (4 People)',
          members: activeMembers
        });
      } else {
        response = await apiRegister({
          ...formData,
          passType: passType as 'Single Pass' | 'Couple Pass' | 'Group Pass (4 People)',
          members: activeMembers
        });
      }

      if (response.success) {
        const regId = response.registrationId || response.data?.registrationId;
        if (isEditMode) {
          router.push(`/payment?regId=${editRegId}`);
        } else if (response.nextAction === 'VIEW_PASS') {
          router.push(`/success?regId=${regId}`);
        } else {
          router.push(`/payment?regId=${regId}`);
        }
      } else {
        setErrorMessage(response.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage('Server connection error. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="box-gold-frame rounded-3xl p-6 sm:p-10 bg-maroon-800/90 shadow-2xl relative">
      <div className="corner-ornament corner-tl" />
      <div className="corner-ornament corner-tr" />
      <div className="corner-ornament corner-bl" />
      <div className="corner-ornament corner-br" />

      <div className="text-center mb-8">
        <img src="/logo.png" alt="Logo" className="w-16 h-16 object-contain text-gold-champagne mx-auto mb-2 animate-float" />
        <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-gold-gradient mb-1">
          {isEditMode ? 'EDIT REGISTRATION' : 'BAARATI REGISTRATION'}
        </h2>
        <p className="font-poppins text-xs sm:text-sm text-gold-warm">
          Fill in your details below to reserve your official event pass
        </p>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/80 border border-red-500/60 text-red-200 text-xs sm:text-sm font-poppins text-center">
          <p className="mb-2">⚠️ {errorMessage}</p>
          {errorMessage.includes('Find My Registration') && (
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="mt-2 px-4 py-2 rounded-full bg-red-900/60 hover:bg-red-800 border border-red-500/40 text-red-100 transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Go to Find My Registration
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Pass Type Selector */}
        <div>
          <label className="font-marcellus text-sm font-bold text-gold-champagne block mb-2 uppercase tracking-wider">
            Select Pass Category *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Single Pass', value: 'Single Pass', price: '₹1200' },
              { label: 'Couple Pass', value: 'Couple Pass', price: '₹2200' },
              { label: 'Group Pass (4 People)', value: 'Group Pass (4 People)', price: '₹4200' }
            ].map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPassType(p.value)}
                className={`p-3.5 rounded-2xl border text-left font-marcellus text-xs sm:text-sm transition-all duration-300 flex flex-col justify-between ${
                  passType === p.value
                    ? 'bg-gradient-to-r from-gold-antique to-gold-champagne text-maroon-900 border-gold-champagne shadow-gold-glow font-bold scale-[1.02]'
                    : 'bg-maroon-900/60 text-royal-ivory border-gold-antique/30 hover:border-gold-antique'
                }`}
              >
                <span>{p.label}</span>
                <span className="font-playfair text-base font-bold mt-1">{p.price}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lead Participant Details */}
        <div className="space-y-4 pt-2 border-t border-gold-antique/20">
          <h3 className="font-marcellus text-base font-bold text-gold-bright flex items-center gap-2">
            <User className="w-4 h-4 text-gold-antique" />
            Lead Participant Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-poppins text-xs text-royal-ivory/80 block mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Aarav Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-maroon-900/60 border border-gold-antique/40 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne focus:outline-none focus:ring-1 focus:ring-gold-champagne font-poppins text-sm"
                />
              </div>
            </div>

            <div>
              <label className="font-poppins text-xs text-royal-ivory/80 block mb-1">
                Roll Number *
              </label>
              <input
                type="text"
                required
                disabled={isEditMode}
                placeholder="e.g. 21BCE1042"
                value={formData.rollNumber}
                onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border border-gold-antique/40 text-royal-ivory font-poppins text-sm uppercase focus:outline-none ${isEditMode ? 'bg-maroon-950/80 text-royal-ivory/50 cursor-not-allowed' : 'bg-maroon-900/60 focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne placeholder-royal-ivory/40'}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-poppins text-xs text-royal-ivory/80 block mb-1">
                Phone Number (WhatsApp) *
              </label>
              <input
                type="tel"
                required
                placeholder="9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-maroon-900/60 border border-gold-antique/40 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne focus:outline-none focus:ring-1 focus:ring-gold-champagne font-poppins text-sm"
              />
            </div>

            <div>
              <label className="font-poppins text-xs text-royal-ivory/80 block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-maroon-900/60 border border-gold-antique/40 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne focus:outline-none focus:ring-1 focus:ring-gold-champagne font-poppins text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-poppins text-xs text-royal-ivory/80 block mb-1">
                School *
              </label>
              <select
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-maroon-900/60 border border-gold-antique/40 text-royal-ivory focus:border-gold-champagne focus:outline-none focus:ring-1 focus:ring-gold-champagne font-poppins text-sm"
              >
                <option value="SOT">SOT</option>
                <option value="SLS">SLS</option>
                <option value="SOET">SOET</option>
                <option value="SOP">SOP</option>
                <option value="SOM">SOM</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Additional Member Details for Couple & Group Passes */}
        {requiredExtraMembers > 0 && (
          <div className="space-y-4 pt-4 border-t border-gold-antique/30">
            <h3 className="font-marcellus text-base font-bold text-gold-bright flex items-center gap-2">
              <Users className="w-4 h-4 text-gold-antique" />
              Additional Members Information ({requiredExtraMembers} Member{requiredExtraMembers > 1 ? 's' : ''})
            </h3>

            {Array.from({ length: requiredExtraMembers }).map((_, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-maroon-900/60 border border-gold-antique/30 space-y-3">
                <p className="font-marcellus text-xs font-bold text-gold-champagne uppercase tracking-wider">
                  Member {idx + 2} Details
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-poppins text-[11px] text-royal-ivory/70 block mb-1">
                      Member {idx + 2} Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={`Name of Member ${idx + 2}`}
                      value={members[idx].name}
                      onChange={(e) => handleMemberChange(idx, 'name', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-maroon-900/60 border border-gold-antique/40 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne focus:outline-none focus:ring-1 focus:ring-gold-champagne font-poppins text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-poppins text-[11px] text-royal-ivory/70 block mb-1">
                      Member {idx + 2} Roll Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={`Roll No of Member ${idx + 2}`}
                      value={members[idx].rollNumber}
                      onChange={(e) => handleMemberChange(idx, 'rollNumber', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-maroon-900/60 border border-gold-antique/40 text-royal-ivory placeholder-royal-ivory/40 focus:border-gold-champagne focus:outline-none focus:ring-1 focus:ring-gold-champagne font-poppins text-sm uppercase"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-full bg-gradient-to-r from-gold-antique via-gold-champagne to-gold-antique text-maroon-900 font-marcellus font-bold text-base tracking-widest uppercase shadow-gold-intense hover:scale-[1.02] transition-all duration-300 border border-gold-champagne flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>Processing Registration...</span>
          ) : (
            <>
              <span>{isEditMode ? 'Save Changes' : 'Proceed to Payment Screen'}</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      <ResumeRegistrationModal 
        isOpen={isResumeModalOpen} 
        onClose={() => setIsResumeModalOpen(false)} 
      />
    </div>
  );
}
