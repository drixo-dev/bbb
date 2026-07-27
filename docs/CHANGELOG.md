# Changelog

All notable changes to the BBB 2026 project will be documented in this file.

## [v1.0.0] - 2026-07-27

### Added
- **Public Registration:** Complete multi-step registration flow.
- **Payment Upload:** Ability for participants to resume registration and upload payment screenshots.
- **Admin Dashboard:** Comprehensive dashboard for `super_admin` and `admin` to verify payments.
- **Volunteer Dashboard:** Mobile-friendly portal with HTML5-QRCode integration to scan and distribute passes.
- **Email Notifications:** Automated emails for Submission, Approval, and Rejection using Resend API.
- **QR Pass Collection:** Auto-generated E-Pass pages with client-side PDF downloads.
- **Audit Logs:** Backend console logs and database tracking fields (`approvedBy`, `collectedBy`) for accountability.
- **CSV Export:** Super Admins can download the full database.
- **RBAC:** Strict server-side Role-Based Access Control protecting routes.
- **Soft Delete:** Safe deletion of participants.
- **Rate Limiting:** Protection against spam and brute-force attacks.
- **Production Build:** Fully optimized Next.js frontend and Express backend.
