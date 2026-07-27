# Environment Variables

This document lists all environment variables required to run the BBB 2026 project.

## Backend (`backend/.env`)

| Variable | Required | Default | Purpose | Example |
|---|---|---|---|---|
| `PORT` | No | `5000` | The port the Express server runs on. | `5000` |
| `MONGODB_URI` | **Yes** | `mongodb://localhost:27017/bbb2026` | The connection string for the MongoDB database. | `mongodb+srv://user:pass@cluster.mongodb.net/bbb` |
| `JWT_SECRET` | **Yes** | *fallback string in code* | The secret key used to sign and verify JSON Web Tokens for authentication. | `my_super_secret_jwt_key_123` |
| `ADMIN_USERNAME` | No | `admin` | The default email/username for the first Super Admin seeded into the database. | `superadmin@bbb.com` |
| `ADMIN_PASSWORD` | No | `admin123` | The default password for the first Super Admin. | `SecurePass!2026` |
| `RESEND_API_KEY` | **Yes** | `none` | API key from Resend.com used to send transactional emails. | `re_1234567890abcdef` |
| `RESEND_FROM_EMAIL` | **Yes** | `none` | The email address that emails will be sent from. Must be verified in Resend. | `noreply@bbb2026.com` |

## Frontend (`frontend/.env.local`)

| Variable | Required | Default | Purpose | Example |
|---|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | **Yes** | `http://localhost:5000/api` | The base URL pointing to the backend API. Used by the browser client. | `https://api.bbb2026.com/api` |
