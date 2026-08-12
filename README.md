# Band Baaja Baarat 2026 👑

A premier, royal-wedding-styled college event registration system and dashboard. Designed with elegant aesthetics, traditional motifs, and modern robust functionality to manage passes, volunteers, and payments.

## Features
- **Ultra-Dark Royal Themed UI/UX:** An immersive frontend redesigned with a rich, ultra-dark royal maroon palette, accented by subtle emerald and gold touches. Features elegant rounded dotted borders, dynamic glassmorphism, and smooth micro-animations.
- **Pass & Ticketing:** Currently offering Single Pass (₹1200), Couple Pass (₹2200), and Group Pass (₹4200) with a beautifully animated, fully responsive ticketing section.
- **Registration Flow:** Step-by-step registration with payment proof (screenshot) upload using Cloudinary.
- **Admin Dashboard:** Secure authentication for admins to review payments, approve/reject registrations, and view analytics.
- **QR Code E-Passes:** Approved participants receive a unique QR code pass that can be downloaded as a PDF or saved on their devices.
- **Volunteer Check-In System:** Built-in QR scanner for volunteers to validate tickets at the entrance and mark them as collected.
- **Email Notifications:** Automated approval, rejection, and submission notifications using Resend API.
- **Google Sheets Backup:** Seamless fallback and syncing to Google Sheets (optional).
- **Responsive Design:** Completely optimized for both mobile and desktop users.

## Architecture
The platform is split into a **Frontend (Next.js)** and **Backend (Express/Node.js)** architecture:
- **Client (Frontend):** Next.js (App Router), Tailwind CSS for styling, Lucide React for icons, html5-qrcode for scanning, jspdf for pass generation.
- **Server (Backend):** Express API handling authentication, MongoDB connection, Google Sheets integration, Resend email dispatch, and Cloudinary uploads.
- **Database:** MongoDB for robust, scalable data storage of participants and admins.

## Tech Stack
### Frontend
- **Framework:** Next.js (React)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Utilities:** html5-qrcode, jspdf, qrcode.react

### Backend
- **Environment:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **File Storage:** Cloudinary
- **Emails:** Resend API
- **Auth:** JWT (JSON Web Tokens), bcryptjs
- **Additional:** Googleapis (for Sheets/Drive sync)

## Setup

### Prerequisites
- Node.js (v18+)
- MongoDB connection URI
- API Keys for Cloudinary and Resend (optional but recommended)

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd bbb
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Copy `.env.example` to `.env` and fill in your keys.
- Start the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
- Copy `.env.example` to `.env.local` and set your backend API URL (e.g., `NEXT_PUBLIC_API_URL=http://localhost:5000/api`).
- Start the client:
```bash
npm run dev
```

Your frontend should now be running on `http://localhost:3000` and backend on `http://localhost:5000`.
