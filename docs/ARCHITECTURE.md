# Architecture

## Complete Architecture
The BBB 2026 system is composed of a decoupled frontend and backend.
- **Frontend:** A Next.js application served to the client, utilizing Tailwind CSS for styling and client-side state management for the UI.
- **Backend:** A Node.js/Express.js REST API that handles all business logic, data validation, authentication, and third-party API communication.
- **Database:** MongoDB acts as the primary data store, using Mongoose for Object Data Modeling (ODM).

### Frontend
- **Framework:** Next.js (App Router).
- **Styling:** Tailwind CSS.
- **State Management:** React hooks (`useState`, `useEffect`).
- **QR Scanning:** `html5-qrcode` directly manipulates the DOM to access device cameras.
- **PDF Generation:** Combines `html2canvas` and `jspdf` to convert DOM elements to downloadable PDFs.

### Backend
- **Framework:** Express.js.
- **File Uploads:** Handled via `multer` storing files locally in the `/uploads` directory.
- **Rate Limiting:** `express-rate-limit` protects public API endpoints (`/register`, `/payment`, `/login`) from abuse.
- **Email Service:** Integrates with the `resend` Node.js SDK to send transactional emails using custom HTML templates.

### MongoDB
- **Collections:** Two primary collections: `Participant` and `Admin`.
- **Soft Deletion:** Implemented via an `isDeleted` boolean flag on the Participant model rather than hard-deleting records.

### Authentication
- Uses JSON Web Tokens (JWT).
- The `/api/admin/login` endpoint validates credentials and returns a JWT payload containing the user's ID, email, and role.
- The frontend stores this token in `localStorage` and attaches it to the `Authorization: Bearer <token>` header of subsequent protected requests.

### Role Based Access Control (RBAC)
- Enforced strictly on the server via `roleMiddleware.js`.
- **Super Admin:** Full access, including participant deletion and CSV exports.
- **Admin:** Access to dashboard, participant viewing, and payment status updates (Approval/Rejection).
- **Volunteer:** Restricted to fetching individual participant details and triggering the `collect-pass` action.

---

## Data Flow Diagrams

### Participant Lifecycle
```markdown
Registration
↓ (Participant enters details)
Data saved -> Status: 'Submitted', Payment Status: 'Not Submitted'
↓
Payment
↓ (Participant uploads screenshot/transaction ID)
Data updated -> Payment Status: 'Pending Verification'
↓
Admin Review
↓
[If Approved] -> Payment Status: 'Approved' -> Email Sent with E-Pass -> Status: 'Verified'
[If Rejected] -> Payment Status: 'Rejected' -> Email Sent asking for resubmission
↓
Event Day Check-in / Pass Collection
↓ (Volunteer scans QR code)
Marked as Collected -> Completed
```

### Email Flow
```markdown
Admin Clicks 'Approve'
↓
Backend updates MongoDB
↓
Backend triggers `emailService.sendApprovalEmail(participant)`
↓
Resend API receives payload and HTML template
↓
Email delivered to Participant with E-Pass link
↓
Backend updates `approvalEmailSent` boolean
```

### QR Flow
```markdown
Approval Email Sent
↓
Participant clicks E-Pass link -> `pass/[id]`
↓
Frontend fetches Pass Data -> Generates QR code client-side containing Registration ID
↓
Participant presents QR at event
↓
Volunteer scans QR via Volunteer Portal -> Decodes Registration ID
↓
Volunteer portal POSTs to `/api/volunteer/collect-pass`
↓
Backend validates -> Marks `ticketCollected: true`
```
