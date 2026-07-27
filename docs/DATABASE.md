# Database Schema

The BBB 2026 system utilizes MongoDB with two primary collections.

## 1. Participant Collection

Stores all data regarding student registrations, payment statuses, and pass collection.

| Field | Type | Required | Description |
|---|---|---|---|
| `registrationId` | String | Yes | Unique 6-character alphanumeric ID prefixed with `BBB-` (e.g., `BBB-A1B2C3`). **Index: Unique**. |
| `name` | String | Yes | Full name of the primary participant. |
| `rollNumber` | String | Yes | University Roll Number of the primary participant. **Index: Unique**. |
| `email` | String | Yes | Contact email. **Index: Unique**. |
| `phone` | String | Yes | Contact phone number. |
| `school` | String | Yes | School or Department of the participant. |
| `passType` | String | Yes | Enum: `'Single Pass'`, `'Couple Pass'`, `'Group Pass (4 People)'`. |
| `amount` | Number | Yes | Calculated cost based on `passType`. |
| `members` | Array | No | Subdocument array containing `{ name: String, rollNumber: String }` for additional group members. |
| `transactionId` | String | No | UTR or Transaction ID provided during payment submission. |
| `screenshotUrl` | String | No | Path to the uploaded payment screenshot (e.g., `/uploads/filename.jpg`). |
| `paymentStatus` | String | Yes | Enum: `'Not Submitted'`, `'Pending Verification'`, `'Approved'`, `'Rejected'`. Default: `'Not Submitted'`. |
| `registrationStatus` | String | Yes | Enum: `'Submitted'`, `'Verified'`, `'Cancelled'`. Default: `'Submitted'`. |
| `rejectionReason` | String | No | Text reason provided by Admin if payment is rejected. |
| `approvalEmailSent`| Boolean| No | Indicates if the system successfully sent the Resend email. Default: `false`. |
| `approvalEmailSentAt`| Date | No | Timestamp of when the email was sent. |
| `checkedIn` | Boolean| No | *Legacy/Duplicate field.* Indicates check-in. |
| `checkedInAt` | Date | No | Timestamp of check-in. |
| `ticketCollected`| Boolean| No | Indicates if the physical pass was handed over by a volunteer. Default: `false`. |
| `collectedAt` | Date | No | Timestamp of when the physical pass was collected. |
| `collectedBy` | ObjectId| No | Reference to the `Admin` who scanned the QR and handed over the pass. |
| `approvedBy` | ObjectId| No | Reference to the `Admin` who approved the payment. |
| `approvedAt` | Date | No | Timestamp of payment approval. |
| `rejectedBy` | ObjectId| No | Reference to the `Admin` who rejected the payment. |
| `rejectedAt` | Date | No | Timestamp of payment rejection. |
| `isDeleted` | Boolean| No | Soft delete flag. Default: `false`. |

*Note: All Mongoose schemas include `timestamps: true` which automatically adds `createdAt` and `updatedAt`.*

## 2. Admin Collection

Stores credentials and roles for event organizers and volunteers.

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | String | Yes | Full name of the organizer. |
| `email` | String | Yes | Login email/username. **Index: Unique**. |
| `password` | String | Yes | Bcrypt hashed password. |
| `role` | String | Yes | Enum: `'super_admin'`, `'admin'`, `'volunteer'`. Default: `'volunteer'`. |
| `isActive` | Boolean| No | If false, prevents login. Default: `true`. |
| `lastLogin` | Date | No | Timestamp of the last successful login. |

*Note: Includes `timestamps: true`.*
