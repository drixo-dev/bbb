const { Resend } = require('resend');
const QRCode = require('qrcode');
const { v2: cloudinary } = require('cloudinary');
const approvalEmailTemplate = require('../templates/approvalEmail');
const rejectionEmailTemplate = require('../templates/rejectionEmail');
const submissionEmailTemplate = require('../templates/submissionEmail');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

class EmailService {
  constructor() {
    this.resend = null;
    this.init();
  }

  init() {
    if (process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY);

    } else {

    }
  }

  async sendApprovalEmail(participant) {
    if (!this.resend) {
      console.warn('❌ Resend API Key is missing. Email not sent.');
      return { success: false, error: 'Missing Resend API Key' };
    }

    try {
      // Generate the QR Code directly on the server as a base64 string
      const qrBase64 = await QRCode.toDataURL(participant.registrationId.toString(), {
        width: 300,
        margin: 2,
        color: {
          dark: '#5D0F1D', // BBB dark red
          light: '#FFFFFF'
        }
      });
      
      // Upload to Cloudinary to get a permanent, trusted image URL that Gmail won't block
      const uploadResponse = await cloudinary.uploader.upload(qrBase64, {
        folder: 'qrcodes',
        public_id: participant.registrationId
      });

      const htmlContent = approvalEmailTemplate({
        name: participant.name,
        registrationId: participant.registrationId,
        passType: participant.passType,
        qrCode: uploadResponse.secure_url
      });

      const { data, error } = await this.resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'BBB 2026 <onboarding@resend.dev>',
        to: participant.email,
        subject: '🎉 BBB 2026 Registration Approved',
        html: htmlContent
      });

      if (error) {
        console.error(`[EMAIL] Participant ${participant.name} | Registration ID ${participant.registrationId} | Reason ${error.message} | Timestamp ${new Date().toISOString()}`);
        return { success: false, error: error.message };
      }
      

      return { success: true };

    } catch (err) {
      console.error(`[EMAIL] Participant ${participant.name} | Registration ID ${participant.registrationId} | Reason ${err.message} | Timestamp ${new Date().toISOString()}`);
      return { success: false, error: err.message };
    }
  }

  async sendRejectionEmail(participant) {
    if (!this.resend) {
      console.warn('❌ Resend API Key is missing. Rejection email not sent.');
      return { success: false, error: 'Missing Resend API Key' };
    }

    try {
      const htmlContent = rejectionEmailTemplate({
        name: participant.name,
        rejectionReason: participant.rejectionReason
      });

      const { data, error } = await this.resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'BBB 2026 <onboarding@resend.dev>',
        to: participant.email,
        subject: 'BBB 2026 Payment Requires Attention',
        html: htmlContent
      });

      if (error) {
        console.error(`[EMAIL] Participant ${participant.name} | Registration ID ${participant.registrationId} | Reason ${error.message} | Timestamp ${new Date().toISOString()}`);
        return { success: false, error: error.message };
      }
      

      return { success: true };

    } catch (err) {
      console.error(`[EMAIL] Participant ${participant.name} | Registration ID ${participant.registrationId} | Reason ${err.message} | Timestamp ${new Date().toISOString()}`);
      return { success: false, error: err.message };
    }
  }

  async sendSubmissionEmail(participant) {
    if (!this.resend) {
      console.warn('❌ Resend API Key is missing. Submission email not sent.');
      return { success: false, error: 'Missing Resend API Key' };
    }

    try {
      const htmlContent = submissionEmailTemplate({
        name: participant.name,
        registrationId: participant.registrationId,
        passType: participant.passType
      });

      const { data, error } = await this.resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || 'BBB 2026 <onboarding@resend.dev>',
        to: participant.email,
        subject: '⏳ BBB 2026 Payment Submitted',
        html: htmlContent
      });

      if (error) {
        console.error(`[EMAIL] Participant ${participant.name} | Registration ID ${participant.registrationId} | Reason ${error.message} | Timestamp ${new Date().toISOString()}`);
        return { success: false, error: error.message };
      }
      

      return { success: true };

    } catch (err) {
      console.error(`[EMAIL] Participant ${participant.name} | Registration ID ${participant.registrationId} | Reason ${err.message} | Timestamp ${new Date().toISOString()}`);
      return { success: false, error: err.message };
    }
  }
}

module.exports = new EmailService();
