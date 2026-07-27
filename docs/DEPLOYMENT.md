# Deployment Guide

## Backend Deployment
The backend is a Node.js/Express app.

1. **Server Setup:** Use a Linux VPS (e.g., DigitalOcean, AWS EC2) or a PaaS like Render/Heroku.
2. **Node.js:** Ensure Node.js v18+ is installed.
3. **Build Commands:**
   ```bash
   npm install --production
   ```
4. **Production Commands:**
   Use a process manager like PM2 to keep the server running.
   ```bash
   npm install -g pm2
   pm2 start server.js --name "bbb-backend"
   pm2 save
   ```
5. **Static Uploads:** The backend uses local storage for screenshots (`/uploads` folder). If deploying to a serverless environment (like Vercel or Heroku, which have ephemeral filesystems), uploads will be lost on restart. A persistent disk (VPS) is required, or the code must be modified to use AWS S3.

## Frontend Deployment
The frontend is a Next.js application.

1. **Recommended Platform:** Vercel (easiest for Next.js) or any Node.js server.
2. **Build Commands:**
   ```bash
   npm install
   npm run build
   ```
3. **Production Commands:**
   ```bash
   npm start
   ```

## MongoDB Atlas
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Get the connection string.
3. Ensure Network Access (IP Whitelist) allows your backend server's IP (or use `0.0.0.0/0` if necessary).

## Resend (Email Service)
1. Create an account at [Resend](https://resend.com/).
2. Add and verify your domain.
3. Generate an API Key.
4. Set `RESEND_FROM_EMAIL` to a verified domain email (e.g., `onboarding@resend.dev` for testing, `noreply@yourdomain.com` for production).

## HTTPS and CORS
- **Frontend:** Platforms like Vercel provide HTTPS automatically.
- **Backend:** If using a VPS, set up an Nginx reverse proxy with Certbot (Let's Encrypt) to secure the API with HTTPS.
- **CORS:** Ensure the backend `server.js` `cors()` middleware is configured to accept requests *only* from your production frontend URL if you want strict security. Currently, `app.use(cors())` accepts all origins.

## Common Production Issues
- **Image Uploads Failing:** The backend requires write permissions to the `backend/uploads` directory. Run `chmod 755 uploads` if getting permission errors.
- **Emails Not Sending:** The Resend API key might be invalid, or the `RESEND_FROM_EMAIL` is not verified in Resend's dashboard.
- **Mixed Content Warnings:** Ensure both frontend and backend are served over `https://`. If frontend is HTTPS and backend is HTTP, the browser will block API calls.
