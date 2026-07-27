const rejectionEmailTemplate = (data) => {
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
        
        <h2 style="color: #ff6b6b; text-align: center; font-size: 24px; margin-top: 0; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px;">✦ Payment Requires Attention ✦</h2>
        <hr style="border: 0; height: 1px; background-color: #FADB5F; margin: 20px 0;" />
        
        <p style="font-size: 16px; color: #FFFFFF; line-height: 1.5;">Greetings, ${data.name}!</p>
        <p style="font-size: 16px; color: #FFFFFF; line-height: 1.5;">Unfortunately, we couldn't verify your payment for the BBB 2026 event.</p>
        
        <div style="background-color: #8C182F; padding: 20px; border-radius: 8px; border: 1px dashed #ff6b6b; margin: 25px 0;">
          <p style="margin-top: 0; font-weight: bold; color: #ff8787;">Reason:</p>
          <p style="color: #ffc9c9; margin-bottom: 0;">${data.rejectionReason || 'Invalid or missing payment details.'}</p>
        </div>

        <p style="font-size: 16px; color: #FFFFFF; line-height: 1.5;">
          Please upload a new payment screenshot by logging into your portal from <strong>Find My Registration</strong>.
        </p>
        
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

module.exports = rejectionEmailTemplate;
