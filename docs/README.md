# BBB 2026

## Project Overview
BBB 2026 (Band Baaja Baarat) is a royal-themed college event registration and pass management system. It provides an end-to-end solution for students to register, submit payments, and receive verifiable E-Passes with QR codes. It includes dedicated portals for Organizers (Admins) to verify payments and Volunteers to scan and distribute physical passes.

## Features
- **Public Portal:** Beautiful, responsive UI for participants to register, resume registrations, and submit payment screenshots.
- **Admin Dashboard:** Comprehensive dashboard for `super_admin` and `admin` roles to view statistics, verify/reject payments, edit participant details, and export data.
- **Volunteer Portal:** Simplified portal with a built-in QR scanner for volunteers to verify E-Passes and mark physical passes as collected.
- **Dynamic E-Passes:** Auto-generated digital passes with QR codes delivered via email upon payment approval.
- **Automated Emails:** Submission confirmations, approval notifications with E-Pass, and rejection alerts with actionable reasons.
- **Role-Based Access Control (RBAC):** Strict segregation of duties between Super Admins, Admins, and Volunteers.

## Tech Stack
- **Frontend:** Next.js 15 (React 18), Tailwind CSS, Framer Motion, HTML5-QRCode.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose).
- **Email:** Resend API.
- **Authentication:** JSON Web Tokens (JWT), bcryptjs.
- **Utilities:** Multer (file uploads), express-rate-limit, html2canvas & jsPDF (client-side PDF generation).

## Architecture Overview
The system follows a classic MERN-stack pattern (with Next.js replacing standard React). The frontend communicates with a RESTful Express API. The backend handles business logic, interfaces with MongoDB for persistence, and uses the Resend API for transactional emails. Rate limiters protect public endpoints, while JWTs and custom middleware protect administrative routes.

## Project Structure
```text
bbb/
├── backend/            # Express.js REST API
│   ├── config/         # Database and app configuration
│   ├── controllers/    # Business logic for routes
│   ├── middleware/     # Auth, role, and upload middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   ├── services/       # External integrations (e.g., Email Service)
│   ├── templates/      # HTML email templates
│   ├── uploads/        # Local storage for payment screenshots
│   └── server.js       # Entry point
├── frontend/           # Next.js Application
│   ├── app/            # App router pages and layouts
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utility functions and API client
│   └── public/         # Static assets
└── docs/               # Documentation
```

## Installation
1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd bbb
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

## Running Development
1. **Start the Backend:**
   Ensure your `.env` is configured (see `ENVIRONMENT.md`).
   ```bash
   cd backend
   npm run dev
   ```

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Access the application at `http://localhost:3000`.

## Running Production
1. **Build the Frontend:**
   ```bash
   cd frontend
   npm run build
   npm start
   ```

2. **Start the Backend:**
   ```bash
   cd backend
   npm start
   ```

## Future Improvements
- Migration of local screenshot uploads to cloud storage (e.g., AWS S3).
- Real-time WebSocket updates for the admin dashboard.
- Advanced analytics and graphical charts on the dashboard.

## License
Private and Confidential. All rights reserved by the BBB 2026 Organizing Committee.
