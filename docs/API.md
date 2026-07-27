# API Documentation

Base URL: `/api`

---

## Public Endpoints

### 1. Register Participant
- **Method:** `POST`
- **URL:** `/register`
- **Authentication:** None
- **Purpose:** Creates a new participant registration.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "rollNumber": "12345",
    "email": "john@example.com",
    "phone": "9876543210",
    "school": "Engineering",
    "passType": "Single Pass",
    "members": []
  }
  ```
- **Response:**
  - `201 Created`: `{ "success": true, "registrationId": "BBB-...", "message": "..." }`
  - `400 Bad Request`: Roll number/email already in use.

### 2. Resume Registration
- **Method:** `POST`
- **URL:** `/resume-registration`
- **Authentication:** None
- **Purpose:** Fetches a registration via roll number to allow payment submission.
- **Request Body:**
  ```json
  { "rollNumber": "12345" }
  ```
- **Response:**
  - `200 OK`: `{ "success": true, "participant": { ... } }`

### 3. Edit Registration
- **Method:** `PUT`
- **URL:** `/registration/:registrationId`
- **Authentication:** None
- **Purpose:** Allows a user to edit details before payment is approved.
- **Request Body:** Partial participant payload.

### 4. Submit Payment
- **Method:** `POST`
- **URL:** `/payment`
- **Authentication:** None
- **Purpose:** Submits payment details and screenshot.
- **Headers:** `Content-Type: multipart/form-data`
- **Form Data:**
  - `registrationId`: string
  - `transactionId`: string
  - `screenshot`: File (image)
- **Response:**
  - `200 OK`: `{ "success": true, "message": "Payment submitted" }`

### 5. Get Pass
- **Method:** `GET`
- **URL:** `/pass/:id`
- **Authentication:** None
- **Purpose:** Fetches public pass details for the E-Pass page. Returns only if approved.

---

## Admin Endpoints

*All endpoints below require `Authorization: Bearer <token>`.*

### 6. Admin Login
- **Method:** `POST`
- **URL:** `/admin/login`
- **Authentication:** None
- **Purpose:** Authenticates admin and returns JWT.
- **Request Body:** `{ "username": "admin@example.com", "password": "password" }`
- **Response:** `{ "success": true, "token": "...", "role": "admin" }`

### 7. Get Dashboard Stats
- **Method:** `GET`
- **URL:** `/admin/dashboard`
- **Authorization:** `super_admin`, `admin`
- **Purpose:** Retrieves aggregated metrics (counts, revenue).

### 8. Get Participants
- **Method:** `GET`
- **URL:** `/admin/participants?search=&passType=All&paymentStatus=All`
- **Authorization:** `super_admin`, `admin`
- **Purpose:** Fetches filtered and sorted list of participants.

### 9. Update Payment Status
- **Method:** `PUT`
- **URL:** `/admin/update-status`
- **Authorization:** `super_admin`, `admin`
- **Purpose:** Approves or rejects a payment. Triggers email sending.
- **Request Body:**
  ```json
  {
    "registrationId": "BBB-...",
    "paymentStatus": "Approved", // or "Rejected"
    "rejectionReason": "Blurry screenshot" // Optional, required if rejected
  }
  ```

### 10. Edit Participant (Admin)
- **Method:** `PUT`
- **URL:** `/admin/participant/:registrationId`
- **Authorization:** `super_admin`, `admin`
- **Purpose:** Directly edit participant details from the dashboard.

### 11. Delete Participant
- **Method:** `DELETE`
- **URL:** `/admin/participant/:registrationId`
- **Authorization:** `super_admin` only
- **Purpose:** Soft deletes a participant.

### 12. Export CSV
- **Method:** `GET`
- **URL:** `/admin/export-csv`
- **Authorization:** `super_admin` only
- **Purpose:** Downloads a CSV file of all non-deleted participants.

### 13. Resend Approval Email
- **Method:** `POST`
- **URL:** `/admin/resend-approval-email/:participantId`
- **Authorization:** `super_admin`, `admin`
- **Purpose:** Manually re-triggers the approval email for an already approved participant.

---

## Volunteer Endpoints

*All endpoints below require `Authorization: Bearer <token>`.*

### 14. Get Participant for Volunteer
- **Method:** `GET`
- **URL:** `/volunteer/participant/:registrationId`
- **Authorization:** `super_admin`, `admin`, `volunteer`
- **Purpose:** Fetches a participant to display in the volunteer portal prior to collection.

### 15. Collect Pass
- **Method:** `POST`
- **URL:** `/volunteer/collect-pass`
- **Authorization:** `super_admin`, `admin`, `volunteer`
- **Purpose:** Marks a physical pass as collected.
- **Request Body:** `{ "registrationId": "BBB-..." }`
- **Response:**
  - `200 OK`: Pass collected.
  - `400 Bad Request`: If already collected or payment not approved.
