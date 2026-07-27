const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Member {
  name: string;
  rollNumber: string;
}

export interface RegisterPayload {
  name: string;
  rollNumber: string;
  email: string;
  phone: string;
  school: string;
  passType: 'Single Pass' | 'Couple Pass' | 'Group Pass (4 People)';
  members?: Member[];
}

export interface Participant {
  registrationId: string;
  name: string;
  rollNumber: string;
  email: string;
  phone: string;
  school: string;
  passType: string;
  amount: number;
  members: Member[];
  transactionId?: string;
  screenshotUrl?: string;
  driveScreenshotUrl?: string;
  paymentStatus: 'Not Submitted' | 'Pending Verification' | 'Approved' | 'Rejected';
  registrationStatus: 'Submitted' | 'Verified' | 'Cancelled';
  checkedIn: boolean;
  checkedInAt?: string;
  rejectionReason?: string;
  createdAt: string;
}

// Public APIs
export async function apiRegister(payload: RegisterPayload) {
  const res = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function apiResumeRegistration(payload: { rollNumber: string }) {
  const res = await fetch(`${API_BASE_URL}/resume-registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function apiEditRegistration(registrationId: string, payload: Partial<RegisterPayload>) {
  const res = await fetch(`${API_BASE_URL}/registration/${registrationId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function apiSubmitPayment(formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/payment`, {
    method: 'POST',
    body: formData,
  });
  return res.json();
}

export async function apiGetPass(registrationId: string) {
  const res = await fetch(`${API_BASE_URL}/pass/${registrationId}`);
  return res.json();
}

// Admin APIs
export async function apiAdminLogin(username: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  return res.json();
}

export async function apiAdminGetStats(token: string) {
  const res = await fetch(`${API_BASE_URL}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function apiAdminGetParticipants(token: string, search = '', passType = 'All', paymentStatus = 'All') {
  const query = new URLSearchParams({ search, passType, paymentStatus });
  const res = await fetch(`${API_BASE_URL}/admin/participants?${query.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function apiAdminUpdateStatus(token: string, registrationId: string, paymentStatus: string, rejectionReason?: string) {
  const res = await fetch(`${API_BASE_URL}/admin/update-status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ registrationId, paymentStatus, rejectionReason }),
  });
  return res.json();
}

export async function apiAdminEditParticipant(token: string, registrationId: string, data: Partial<Participant>) {
  const res = await fetch(`${API_BASE_URL}/admin/participant/${registrationId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function apiAdminDeleteParticipant(token: string, registrationId: string) {
  const res = await fetch(`${API_BASE_URL}/admin/participant/${registrationId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function apiAdminVerifyPass(token: string, registrationId: string) {
  const res = await fetch(`${API_BASE_URL}/admin/verify-pass`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ registrationId }),
  });
  return res.json();
}

export function getExportCSVUrl(token: string) {
  return `${API_BASE_URL}/admin/export-csv?token=${token}`;
}

// Volunteer APIs
export async function apiVolunteerGetParticipant(token: string, registrationId: string) {
  const res = await fetch(`${API_BASE_URL}/volunteer/participant/${registrationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function apiVolunteerCollectPass(token: string, registrationId: string) {
  const res = await fetch(`${API_BASE_URL}/volunteer/collect-pass`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ registrationId }),
  });
  return res.json();
}
