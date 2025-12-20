/**
 * Google Apps Script for Google Sheets Integration
 * 
 * Instructions:
 * 1. Open your Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code
 * 4. Save the project
 * 5. Deploy > New deployment > Web app
 * 6. Execute as: Me
 * 7. Who has access: Anyone
 * 8. Copy the web app URL and use it in your .env file
 */

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // If this is the first row, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'Furigana',
        'University',
        'Faculty',
        'Academic Year of PhD',
        'Email',
        'Interests',
        'Comments'
      ]);
    }
    
    // Parse the JSON data - handle both JSON and FormData
    let data;
    if (e.postData && e.postData.contents) {
      // JSON in postData.contents
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      // FormData with 'data' parameter
      data = JSON.parse(e.parameter.data);
    } else {
      throw new Error('No data received');
    }
    
    // Prepare row data
    const row = [
      new Date(data.timestamp || new Date()), // Timestamp
      data.fullName || '',
      data.furigana || '',
      data.university || '',
      data.faculty || '',
      data.academicYear || '',
      data.email || '',
      Array.isArray(data.interests) ? data.interests.join(', ') : (data.interests || ''), // Join array with comma
      data.comments || ''
    ];
    
    // Append the row to the sheet
    sheet.appendRow(row);
    
    // Send auto-reply email
    if (data.email && data.email.includes('@')) {
      sendAutoReplyEmail(data.email, data.fullName || 'User');
    }
    
    // Return success response with CORS headers
    return ContentService.createTextOutput(
      JSON.stringify({ success: true, message: 'Data submitted successfully' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Send auto-reply email
 */
function sendAutoReplyEmail(email, name) {
  const subject = 'ご登録ありがとうございます / Thank you for your registration';
  
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2>ご登録ありがとうございます</h2>
      <p>${name} 様</p>
      
      <p>この度は、展示会来訪者入力フォームにご登録いただき、誠にありがとうございます。</p>
      <p>ご入力いただいた内容を確認させていただきました。</p>
      <p>後日、担当者よりご連絡させていただきますので、今しばらくお待ちください。</p>
      
      <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
      
      <h2>Thank you for your registration</h2>
      <p>Dear ${name},</p>
      
      <p>Thank you for filling out the form.</p>
      <p>We have received your information and will review it carefully.</p>
      <p>Our team will contact you in the near future. Please wait for our response.</p>
      
      <p style="margin-top: 30px; font-size: 12px; color: #666;">
        このメールは自動送信されています。<br>
        This is an automated email.
      </p>
    </div>
  `;
  
  try {
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

