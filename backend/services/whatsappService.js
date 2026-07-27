class WhatsAppService {
  async sendWhatsAppMessage(participant) {
    const passUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/pass/${participant.registrationId}`;

    const messagePayload = {
      phone: participant.phone,
      message: `🎉 *Band Baaja Baarat 2026 - Official Invitation Confirmation* 🎉\n\nGreetings *${participant.name}*!\n\nYou are officially registered for the grandest celebration of the year!\n\n👑 *Registration ID:* ${participant.registrationId}\n🎟️ *Pass Type:* ${participant.passType}\n💳 *Payment Status:* ${participant.paymentStatus}\n\n👇 Download your Royal QR E-Pass here:\n${passUrl}\n\nGet ready for an unforgettable royal experience! 🎺🪘✨`
    };



    // Integration ready for WhatsApp Webhook / Twilio / UltraMsg / Wati
    return true;
  }
}

module.exports = new WhatsAppService();
