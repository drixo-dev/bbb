const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.init();
  }

  init() {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      console.log('✅ Nodemailer service initialized.');
    } else {
      console.log('ℹ️ Email credentials not found in .env. Email notifications will be logged to terminal.');
    }
  }

  async sendConfirmationEmail(participant) {
    const passUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/pass/${participant.registrationId}`;

    const htmlContent = `
      <div style="background-color: #3B0811; padding: 40px 20px; font-family: 'Georgia', serif; color: #FFF5E6; text-align: center;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #5D0F1D; border: 3px solid #D4AF37; border-radius: 12px; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Royal Decorative Header -->
          <h2 style="color: #E8C96B; font-size: 28px; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 2px;">
            ✦ Band Baaja Baarat 2026 ✦
          </h2>
          <p style="color: #D4AF37; font-size: 16px; font-style: italic; margin-top: 0;">Freshers 2026 - The Royal Welcome</p>

          <hr style="border: 0; height: 1px; background: linear-gradient(to right, transparent, #D4AF37, transparent); margin: 20px 0;" />

          <h3 style="color: #FFFFFF; font-size: 22px;">Greetings, ${participant.name}!</h3>
          <p style="color: #F8F3EB; font-size: 16px; line-height: 1.6;">
            We are thrilled to confirm your registration for the most grand celebration of the year! You are officially a <strong>Baarati</strong>.
          </p>

          <div style="background-color: #4A0B17; border: 1px dashed #D4AF37; border-radius: 8px; padding: 20px; margin: 25px 0; text-align: left;">
            <p style="margin: 8px 0; color: #FFF5E6;"><strong>Registration ID:</strong> <span style="color: #E8C96B; font-family: monospace; font-size: 18px;">${participant.registrationId}</span></p>
            <p style="margin: 8px 0; color: #FFF5E6;"><strong>Pass Type:</strong> ${participant.passType}</p>
            <p style="margin: 8px 0; color: #FFF5E6;"><strong>Payment Status:</strong> <span style="color: ${participant.paymentStatus === 'Approved' ? '#4ADE80' : '#FBBF24'};">${participant.paymentStatus}</span></p>
            <p style="margin: 8px 0; color: #FFF5E6;"><strong>School & Roll:</strong> ${participant.school} (${participant.rollNumber})</p>
          </div>

          <p style="color: #E8C96B; font-size: 15px;">
            Access your personalized Royal E-Pass & Event QR Code below:
          </p>

          <a href="${passUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #D4AF37, #E8C96B); color: #3B0811; font-weight: bold; text-decoration: none; padding: 14px 28px; border-radius: 30px; margin-top: 10px; font-size: 16px; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);">
            👑 View & Download Royal E-Pass
          </a>

          <hr style="border: 0; height: 1px; background: linear-gradient(to right, transparent, #D4AF37, transparent); margin: 30px 0 20px 0;" />

          <p style="color: #D4AF37; font-size: 13px;">
            Band Baaja Baarat Team • College Campus Celebration 2026<br/>
            For any queries, reply directly to this email or reach out on Instagram.
          </p>
        </div>
      </div>
    `;

    if (this.transporter && participant.email) {
      try {
        await this.transporter.sendMail({
          from: `"Band Baaja Baarat 2026" <${process.env.EMAIL_USER}>`,
          to: participant.email,
          subject: `👑 Royal Confirmation: Baarati Pass (${participant.registrationId}) - Band Baaja Baarat 2026`,
          html: htmlContent
        });
        console.log(`✅ Confirmation email sent to ${participant.email}`);
        return true;
      } catch (err) {
        console.error('❌ Error sending email:', err.message);
        return false;
      }
    } else {
      console.log(`[Email Mock Log] To: ${participant.email || 'N/A (No email provided)'} | Subject: Confirmation BBB2026 | RegID: ${participant.registrationId}`);
      return true;
    }
  }
}

module.exports = new EmailService();
