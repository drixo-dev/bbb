# Troubleshooting Guide

## Common Issues & Resolutions

### 1. Participant didn't receive email
- **Symptoms:** Payment was approved, but participant claims no email arrived.
- **Cause:** Email bounced, went to spam, or Resend API quota was exceeded.
- **Resolution:** 
  1. Ask the participant to check their Spam/Junk folder.
  2. The Admin can click the "Edit" button on the participant in the dashboard and click "Resend Email".
  3. Check backend terminal logs to see if the Resend API returned an error.

### 2. QR doesn't scan
- **Symptoms:** Volunteer camera is on, but scanning the participant's phone does nothing.
- **Cause:** Screen brightness is too low, screen is cracked, or camera autofocus is struggling.
- **Resolution:**
  1. Ask the participant to turn their phone brightness to maximum.
  2. Move to an area with better lighting.
  3. If it still fails, the Volunteer can manually type the Registration ID (printed below the QR code) into the manual search bar.

### 3. Payment rejected accidentally
- **Symptoms:** An Admin clicked "Reject" by mistake.
- **Cause:** Human error.
- **Resolution:** 
  1. Have the Admin click "Edit" on the participant.
  2. Change the Payment Status back to "Approved".
  3. Save the changes. This will re-trigger the approval email.

### 4. Email sending failed
- **Symptoms:** Backend logs show `Error sending approval email`.
- **Cause:** Invalid `RESEND_API_KEY` or unverified `RESEND_FROM_EMAIL`.
- **Resolution:** Verify the environment variables in the `.env` file match the Resend dashboard.

### 5. MongoDB disconnected
- **Symptoms:** API requests return `500 Server Error`, backend logs show connection timeouts.
- **Cause:** Database server is down, or IP Whitelist on MongoDB Atlas blocked the server.
- **Resolution:** 
  1. Check MongoDB Atlas status.
  2. Ensure the backend server's IP address is added to the MongoDB Atlas Network Access list.

### 6. JWT expired / Permission denied
- **Symptoms:** Clicking buttons in the Admin dashboard abruptly logs the user out or shows `Access denied`.
- **Cause:** The authentication token expired (tokens last 24 hours).
- **Resolution:** Log out and log back in.

### 7. Rate limit exceeded
- **Symptoms:** Public users see "Too many requests from this IP".
- **Cause:** A user refreshed the page too many times, or a spam attack is occurring.
- **Resolution:** Wait 15 minutes. The rate limit resets automatically.

### 8. Uploads folder error (Deployment issues)
- **Symptoms:** Submitting payment fails with `Error uploading file`.
- **Cause:** The backend server lacks write permissions to the `backend/uploads` directory.
- **Resolution:** Run `mkdir -p uploads && chmod 755 uploads` in the backend root.
