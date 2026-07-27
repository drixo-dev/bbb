const approvalEmailTemplate = (data) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <meta name="supported-color-schemes" content="light dark">
</head>
<body style="margin: 0; padding: 20px; background-color: #1a1a1a;">
    <div style="font-family: 'Georgia', serif; color: #FFFFFF; max-width: 600px; margin: 0 auto; background-color: #5D0F1D; padding: 30px 20px; border-radius: 8px;">
      <div style="background-color: #7A1326; border: 3px solid #FADB5F; border-radius: 12px; padding: 30px;">
        
        <h2 style="color: #FADB5F; text-align: center; font-size: 24px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px;">✦ Registration Approved ✦</h2>
        <hr style="border: 0; height: 1px; background-color: #FADB5F; margin: 20px 0;" />
        
        <p style="font-size: 16px; color: #FFFFFF; line-height: 1.5;">Greetings, ${data.name}!</p>
        <p style="font-size: 16px; color: #FFFFFF; line-height: 1.5;">Your payment has been successfully verified, and your registration has been <strong>approved</strong>.</p>
        
        <div style="background-color: #8C182F; padding: 20px; border-radius: 8px; border: 1px dashed #FADB5F; margin: 25px 0;">
          <h3 style="margin-top: 0; color: #FADB5F; text-transform: uppercase; font-size: 14px; letter-spacing: 1px;">Registration Details</h3>
          <p style="margin: 10px 0; font-size: 16px; color: #FFFFFF;">
            <span style="color: #FADB5F;">Registration ID:</span><br>
            <strong style="font-size: 20px; letter-spacing: 2px;">${data.registrationId}</strong>
          </p>
          <p style="margin: 10px 0; font-size: 16px; color: #FFFFFF;">
            <span style="color: #FADB5F;">Pass Type:</span><br>
            <strong>${data.passType}</strong>
          </p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #FADB5F; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Your Royal QR Code</p>
          <img src="${data.qrCode}" alt="QR Code" width="256" height="256" style="border: 3px solid #FADB5F; padding: 10px; background-color: #ffffff; border-radius: 8px;" />
        </div>

        <div style="background-color: #8C182F; padding: 15px; border-radius: 8px; font-size: 14px; border-left: 4px solid #FADB5F;">
          <p style="margin-top: 0; font-weight: bold; color: #FADB5F;">Instructions:</p>
          <ul style="margin-bottom: 0; color: #FFFFFF; padding-left: 20px;">
            <li>Show this QR while collecting your physical pass.</li>
            <li>Keep this email for reference.</li>
            <li><strong style="color: #FADB5F;">Do not share this QR with others.</strong></li>
          </ul>
        </div>
        
        <hr style="border: 0; height: 1px; background-color: #FADB5F; margin: 30px 0 20px 0;" />
        <p style="margin-top: 20px; font-size: 14px; color: #FADB5F; text-align: center;">
          Regards,<br>
          <strong>BBB 2026 Organizing Team</strong>
        </p>
      </div>
    </div>
</body>
</html>
  `;
};

module.exports = approvalEmailTemplate;
