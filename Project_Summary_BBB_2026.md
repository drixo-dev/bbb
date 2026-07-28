# Project Summary: Band Baaja Baarat 2026 Registration Portal

This document serves as a comprehensive record of the architecture, deployment, and engineering challenges solved while building the production-ready ticketing platform for the BBB 2026 event.

## 🏗️ Technology Stack
- **Frontend:** Next.js 15 (React), TailwindCSS, TypeScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Cloud NoSQL Database)
- **Media Storage:** Cloudinary (For secure payment screenshot uploads)
- **Email Service:** Resend API (For transactional ticketing emails)
- **QR Generation:** Local `qrcode` buffer + Cloudinary integration

## 🌍 Deployment Architecture
- **Frontend Hosting:** Vercel (Global Edge CDN)
- **Backend Hosting:** Railway.app (Containerized Cloud Server)
- **Domain Registrar:** Name.com (via GitHub Student Developer Pack)
- **Domain:** `bandbaajabaarat.rocks`

## 🏆 Key Achievements & Features
1. **End-to-End Ticketing Flow:** Students can register, upload payment proofs, and await verification. Admins can log in securely to approve or reject passes.
2. **Automated QR Code Generation:** Upon approval, the system dynamically generates a unique QR code tied to the student's Registration ID, uploads it to Cloudinary for permanent hosting, and embeds it beautifully in an HTML email.
3. **Enterprise-Grade Security:**
   - Implemented strict **CORS (Cross-Origin Resource Sharing)** to ensure the Railway backend only accepts requests from the official Vercel frontend.
   - Enforced **JWT Authentication** and password hashing for the Admin portal.
   - Added `multer` file filters to reject non-image uploads and enforce 10MB file size limits to prevent server bloating.
4. **Professional Custom Domain Setup:** Successfully mapped a custom `.rocks` domain to Vercel and configured custom DNS records (DKIM, SPF) to ensure automated emails look highly professional and trustworthy.

## 🚧 Challenges Faced & Solutions

### 1. Vercel Build Crash (`public` folder missing)
* **The Problem:** Vercel accidentally switched the Framework Preset from Next.js to "Other". It ignored the `.next` build folder and looked for a generic `public` folder, causing the deployment to crash.
* **The Solution:** We explicitly locked the Framework Preset back to **Next.js** in Vercel settings and triggered a redeploy, allowing Vercel to correctly route the build output.

### 2. The CORS Blockade
* **The Problem:** When the frontend was moved to a custom domain, Railway's strict CORS policy blocked all registration attempts, throwing a "Server Connection Error". 
* **The Solution:** We updated the backend `server.js` to dynamically parse the `FRONTEND_URL` environment variable. We wrote logic to allow *both* the `www.` and `non-www` versions of the domain to connect seamlessly.

### 3. Missing API URL (Mobile vs Laptop)
* **The Problem:** The website worked locally but failed on a mobile device because Vercel was missing the `NEXT_PUBLIC_API_URL` during the initial build, forcing it to fall back to `localhost:5000`.
* **The Solution:** We injected the Railway backend URL into Vercel's Environment Variables and forced a **full redeploy** to bake the URL into the static Next.js files. We also bypassed aggressive mobile browser caching by using Incognito mode to pull the fresh build.

### 4. Gmail Spam Filters & Broken QR Codes
* **The Problem:** Emails were landing in Spam because the `.rocks` domain was brand new. Furthermore, the external `quickchart.io` QR code was showing up as a broken "gallery icon" because Gmail aggressively blocks external image proxies to stop spam trackers.
* **The Solution:** 
  1. We configured robust **DKIM and SPF DNS Records** in Name.com to prove domain ownership to Google.
  2. We engineered a brilliant workaround: We used the backend server to generate the QR code as a raw image buffer, uploaded it directly to **Cloudinary**, and used the trusted Cloudinary URL inside the email HTML. This completely bypassed Gmail's image blockers and ensured the QR code rendered perfectly in the Inbox!

---
*Built with ❤️ and advanced agentic coding for the BBB 2026 Freshers Event.*
