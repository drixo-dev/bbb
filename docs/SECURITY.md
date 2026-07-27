# Security

The BBB 2026 system incorporates several layers of security to protect participant data and ensure the integrity of the registration process.

## 1. Authentication (JWT)
All administrative and volunteer actions require a valid JSON Web Token (JWT).
- Tokens are generated upon successful login at `/api/admin/login`.
- Tokens are signed using `JWT_SECRET`.
- Tokens expire in 24 hours.
- The token payload contains the user's `id` and `role`.

## 2. Role-Based Access Control (RBAC)
Role checks are strictly enforced **server-side**.
- **Middleware:** `roleMiddleware.js` intercepts requests and verifies the `req.admin.role` against the allowed roles for that route.
- Even if a frontend user manipulated their local state to appear as a `super_admin`, the backend will reject the request with `403 Forbidden` if their signed JWT states they are a `volunteer`.

## 3. Password Hashing
- Admin passwords are NEVER stored in plaintext.
- The `bcryptjs` library is used to salt and hash passwords before saving them to MongoDB.
- Login attempts compare the plaintext input against the stored hash using `bcrypt.compare`.

## 4. Rate Limiting
Public endpoints are susceptible to spam and brute-force attacks. `express-rate-limit` is deployed globally on the API routes.
- **Global Public Limit:** 100 requests per 15 minutes per IP.
- **Submission Limit:** `/register` and `/payment` are restricted to 10 requests per 1 hour per IP.
- **Login Limit:** `/api/admin/login` is restricted to 10 attempts per 15 minutes per IP.

## 5. Soft Delete
To prevent accidental or malicious permanent data loss, deleting a participant via the Admin Dashboard does not drop the record from the database.
- It simply sets the boolean flag `isDeleted: true`.
- All queries explicitly exclude `isDeleted: true` records.

## 6. QR Security
- QR codes do not contain sensitive personal data (like phone numbers or emails) in plaintext.
- They contain a JSON payload with the unique `registrationId`.
- The physical pass can only be collected if the database confirms `paymentStatus: 'Approved'` and `ticketCollected: false`. Forging a QR code with a random ID will fail validation at the scanning desk.

## 7. MongoDB Security
- Protection against NoSQL injection is generally handled by Mongoose's strict schema casting.
- Accidental unique index conflicts (e.g., null transaction IDs) were resolved in `server.js` by explicitly dropping conflicting indexes on startup.

## Future Recommendations
- Implement email verification (OTP) during initial registration to prevent fake signups.
- Migrate from local `/uploads` to a secure cloud bucket (S3) with signed URLs to prevent direct access to uploaded images.
- Enforce strict CORS policies by setting `app.use(cors({ origin: 'https://yourdomain.com' }))` in production.
