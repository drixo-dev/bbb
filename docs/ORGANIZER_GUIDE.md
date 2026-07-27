# Organizer Guide

Welcome to the BBB 2026 Admin & Volunteer Portal guide. This document explains how non-developers can manage registrations and physical passes.

## Admin Dashboard

The Admin Dashboard is the central hub for managing the event.

### Step 1: Admin Login
1. Navigate to `/admin` in your browser.
2. Enter your assigned Email and Password.
3. Click **Login**.

### Step 2: Dashboard Overview
Once logged in, you will see real-time statistics:
- Total Registrations
- Pending / Approved / Rejected Payments
- Total Revenue
- Total Checked-in (Passes Collected)

### Step 3: Registration Verification (Approving/Rejecting Payments)
1. Scroll down to the **Participant Management** table.
2. Use the **Search** bar or filters (Pass Type, Payment Status) to find a specific student.
3. Locate a participant with **Pending Verification** status.
4. Click **View Image** to inspect their uploaded payment screenshot.
5. If valid:
   - Click **Approve**.
   - The participant will automatically receive an email containing their **Royal E-Pass**.
6. If invalid (blurry, fake, wrong amount):
   - Click **Reject**.
   - A modal will prompt you for a **Rejection Reason** (e.g., "Amount is incorrect").
   - The participant will receive an email asking them to log back in and upload a new screenshot.

### Step 4: Resending Emails
If a participant claims they didn't receive their E-Pass email:
1. Find them in the table.
2. Click the **Edit/View** button.
3. Click the **Resend Email** button.

### Step 5: Exporting CSV
Super Admins can download the entire database to a spreadsheet.
1. Click the **Export CSV** button at the top of the participant list.
2. The CSV includes all details, including Group Members and who collected their pass.

---

## Volunteer Portal

The Volunteer portal is strictly for use at the physical desk to hand out physical wristbands/passes.

### Step 1: Volunteer Login
1. Navigate to `/volunteer` on a mobile device or laptop with a camera.
2. Log in using the Volunteer credentials provided by the Super Admin.

### Step 2: Scanning QR Codes
1. When a participant arrives, ask to see their **E-Pass QR Code** on their phone.
2. On your device, click **Request Camera Permissions** (if prompted).
3. Point your camera at the participant's QR code.
4. The system will instantly scan the QR and pull up their details.

### Step 3: Collecting Passes
1. After scanning, verify the name on the screen matches the person in front of you.
2. Hand them their physical pass/wristband.
3. Click **Mark Pass as Collected**.
4. The system will record that *you* handed out the pass, and the pass cannot be collected a second time.

*(Note: Resetting collection status is not implemented via the UI to prevent fraud. If a reset is required, an Admin must contact the database administrator).*
