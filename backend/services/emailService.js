const { Resend } = require('resend');
const QRCode = require('qrcode');
const approvalEmailTemplate = require('../templates/approvalEmail');
const rejectionEmailTemplate = require('../templates/rejectionEmail');
const submissionEmailTemplate = require('../templates/submissionEmail');

class EmailService {
  constructor() {
    this.resend = null;
    this.init();
  }

  init() {
    if (process.env.RESEND_API_KEY) {
      this.resend = new Resend(process.env.RESEND_API_KEY);
      console.log('✅ Resend service initialized.');
    } else {
      console.log('ℹ️ RESEND_API_KEY not found in .env.');
    }
  }

  async sendApprovalEmail(participant) {
    if (!this.resend) {
      console.warn('❌ Resend API Key is missing. Email not sent.');
      return { success: false, error: 'Missing Resend API Key' };
    }

    try {
      // Use quickchart.io to generate a publicly accessible QR code image URL
      const qrImageUrl = `https://quickchart.io/qr?text=${encodeURIComponent(participant.registrationId)}&size=300&margin=2`;

      const htmlContent = approvalEmailTemplate({
        name: participant.name,
        registrationId: participant.registrationId,
        passType: participant.passType,
        qrCode: qrImageUrl
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
      
      console.log(`✅ Approval email sent successfully to ${participant.email}`);
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
      
      console.log(`✅ Rejection email sent successfully to ${participant.email}`);
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
      
      console.log(`✅ Submission email sent successfully to ${participant.email}`);
      return { success: true };

    } catch (err) {
      console.error(`[EMAIL] Participant ${participant.name} | Registration ID ${participant.registrationId} | Reason ${err.message} | Timestamp ${new Date().toISOString()}`);
      return { success: false, error: err.message };
    }
  }
}

module.exports = new EmailService();
