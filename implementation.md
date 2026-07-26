# Band Baaja Baarat (BBB) Implementation Plan

## 1. Database Integration (MongoDB)
- [ ] Set up a free MongoDB Atlas cluster online.
- [ ] Fully wire up the backend controllers to use Mongoose instead of the temporary `storage.js` JSON file.
- [ ] Ensure the registration form correctly saves all data (lead details, extra members, pass type) directly into the MongoDB database.

## 2. Payment & Screenshot Upload Pipeline
- [ ] Configure `multer` to handle the screenshot image uploads when the user submits their payment proof.
- [ ] Integrate a free image hosting service like Cloudinary instead of saving images on the server.
- [ ] Update the user's database record with the `screenshotUrl` and change their `paymentStatus` to `"Pending"`.

## 3. Admin Dashboard (The Core Management Hub)
- [ ] Complete the Admin API routes to fetch all registered participants from MongoDB.
- [ ] Create a secure Admin Login page on the frontend.
- [ ] Build the Admin Dashboard UI where the organizers can:
  - See a table of all registrations.
  - Filter by `Pending`, `Approved`, or `Rejected`.
  - Click on a row to **view the uploaded payment screenshot**.
  - Click an **"Approve"** or **"Reject"** button to update the user's status.

## 4. Automated Ticketing (E-Pass Generation & Email)
- [ ] Set up `nodemailer` with a free Gmail account.
- [ ] When the admin clicks **"Approve"**, automatically trigger an email to the participant containing a success message and their unique Registration ID/Ticket.
- [ ] Generate a dynamic QR code on the frontend ticket page so users can show it at the event entrance.

## 5. Event Day Check-in System (Bonus/Final Step)
- [ ] Create a hidden page (e.g., `/admin/scanner`) that accesses the phone camera.
- [ ] Organizers at the entrance can scan the user's QR code.
- [ ] The system checks the database, validates if the ticket is `Approved`, and marks the user as `checkedIn = true` so the ticket cannot be used twice.
