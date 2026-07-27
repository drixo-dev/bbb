const { google } = require('googleapis');
const fs = require('fs');

class GoogleService {
  constructor() {
    this.sheetsId = process.env.GOOGLE_SHEETS_ID;
    this.driveFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    this.clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    this.privateKey = process.env.GOOGLE_PRIVATE_KEY
      ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
      : null;

    this.auth = null;
    this.sheets = null;
    this.drive = null;

    this.initAuth();
  }

  initAuth() {
    if (this.clientEmail && this.privateKey && this.sheetsId) {
      try {
        this.auth = new google.auth.JWT(
          this.clientEmail,
          null,
          this.privateKey,
          [
            'https://www.googleapis.com/auth/spreadsheets',
            'https://www.googleapis.com/auth/drive.file'
          ]
        );
        this.sheets = google.sheets({ version: 'v4', auth: this.auth });
        this.drive = google.drive({ version: 'v3', auth: this.auth });

      } catch (err) {
        console.warn('⚠️ Google Auth initialization error:', err.message);
      }
    } else {

    }
  }

  async appendToSheet(participant) {
    if (!this.sheets || !this.sheetsId) {

      return false;
    }

    try {
      const memberDetails = participant.members && participant.members.length > 0
        ? participant.members.map(m => `${m.name} (${m.rollNumber})`).join(', ')
        : 'N/A';

      const rowValues = [
        participant.createdAt || new Date().toISOString(),
        participant.registrationId,
        participant.name,
        participant.rollNumber,
        participant.email,
        participant.phone,
        participant.school,
        participant.passType,
        memberDetails,
        participant.transactionId || 'Pending',
        participant.driveScreenshotUrl || participant.screenshotUrl || 'Pending Upload',
        participant.paymentStatus || 'Pending Verification',
        participant.registrationStatus || 'Submitted',
        participant.checkedIn ? 'Yes' : 'No'
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.sheetsId,
        range: 'Sheet1!A:N',
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [rowValues]
        }
      });


      return true;
    } catch (err) {
      console.error('❌ Error appending to Google Sheet:', err.message);
      return false;
    }
  }

  async uploadToDrive(filePath, originalFilename) {
    if (!this.drive || !this.driveFolderId) {

      return null;
    }

    try {
      const fileMetadata = {
        name: `BBB2026_${Date.now()}_${originalFilename}`,
        parents: [this.driveFolderId]
      };
      const media = {
        mimeType: 'image/jpeg',
        body: fs.createReadStream(filePath)
      };

      const response = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id, webViewLink, webContentLink'
      });

      // Set permission to anyone with link can view
      await this.drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });


      return response.data.webViewLink;
    } catch (err) {
      console.error('❌ Error uploading to Google Drive:', err.message);
      return null;
    }
  }
}

module.exports = new GoogleService();
