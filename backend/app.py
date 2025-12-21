"""
Simple Python Flask backend for form submission
Handles Google Sheets and email sending
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import gspread
from google.oauth2.service_account import Credentials
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow React app to call this API

# Google Sheets setup
SCOPE = [
    "https://spreadsheets.google.com/feeds",
    "https://www.googleapis.com/auth/drive"
]

# Email configuration (using Gmail SMTP)
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587
EMAIL_USER = os.getenv("EMAIL_USER", "")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD", "")  # App password, not regular password
GOOGLE_SHEET_KEY = os.getenv("GOOGLE_SHEET_KEY", "")
GOOGLE_CREDENTIALS_PATH = os.getenv("GOOGLE_CREDENTIALS_PATH", "credentials.json")

def get_sheet():
    """Connect to Google Sheets"""
    try:
        creds = Credentials.from_service_account_file(GOOGLE_CREDENTIALS_PATH, scopes=SCOPE)
        client = gspread.authorize(creds)
        sheet = client.open_by_key(GOOGLE_SHEET_KEY).sheet1
        return sheet
    except Exception as e:
        print(f"Error connecting to Google Sheets: {e}")
        return None

def send_email(to_email, name):
    """Send confirmation email"""
    if not EMAIL_USER or not EMAIL_PASSWORD:
        print("Email credentials not configured")
        return False
    
    try:
        subject = "ご登録ありがとうございます / Thank you for your registration"
        
        html_body = f"""
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>ご登録ありがとうございます</h2>
            <p>{name} 様</p>
            
            <p>この度は、展示会来訪者入力フォームにご登録いただき、誠にありがとうございます。</p>
            <p>ご入力いただいた内容を確認させていただきました。</p>
            <p>後日、担当者よりご連絡させていただきますので、今しばらくお待ちください。</p>
            
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            
            <h2>Thank you for your registration</h2>
            <p>Dear {name},</p>
            
            <p>Thank you for filling out the form.</p>
            <p>We have received your information and will review it carefully.</p>
            <p>Our team will contact you in the near future. Please wait for our response.</p>
            
            <p style="margin-top: 30px; font-size: 12px; color: #666;">
                このメールは自動送信されています。<br>
                This is an automated email.
            </p>
        </div>
        """
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = subject
        msg['From'] = EMAIL_USER
        msg['To'] = to_email
        
        html_part = MIMEText(html_body, 'html')
        msg.attach(html_part)
        
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

@app.route('/submit', methods=['POST'])
def submit_form():
    """Handle form submission"""
    try:
        data = request.json
        
        # Prepare row data for Google Sheets
        row_data = [
            datetime.now().isoformat(),  # Timestamp
            data.get('fullName', ''),
            data.get('furigana', ''),
            data.get('university', ''),
            data.get('faculty', ''),
            data.get('academicYear', ''),
            data.get('age', ''),
            data.get('email', ''),
            ', '.join(data.get('interests', [])) if isinstance(data.get('interests'), list) else data.get('interests', ''),
            data.get('comments', ''),
        ]
        
        # Write to Google Sheets
        sheet = get_sheet()
        if sheet:
            # Check if headers exist, if not add them
            if sheet.row_count == 0 or sheet.cell(1, 1).value != 'Timestamp':
                headers = [
                    'Timestamp',
                    'Full Name',
                    'Furigana',
                    'University',
                    'Faculty',
                    'Academic Year of PhD',
                    'Age',
                    'Email',
                    'Interests',
                    'Comments'
                ]
                sheet.append_row(headers)
            else:
                # Check if Age column exists, if not add it
                try:
                    header_row = sheet.row_values(1)
                    if 'Age' not in header_row:
                        # Find the position after 'Academic Year of PhD' (column index 6, so insert at 7)
                        # gspread uses 1-based indexing
                        age_col_index = 7
                        sheet.insert_cols([['Age']], age_col_index)
                        print("Added Age column to existing sheet")
                        # Update existing rows to have empty Age value to maintain column alignment
                        num_rows = sheet.row_count
                        if num_rows > 1:  # If there are data rows
                            for row_num in range(2, num_rows + 1):
                                sheet.update_cell(row_num, age_col_index, '')
                except Exception as e:
                    print(f"Error checking/adding Age column: {e}")
            
            sheet.append_row(row_data)
        
        # Send confirmation email
        email = data.get('email', '')
        name = data.get('fullName', 'User')
        if email:
            send_email(email, name)
        
        return jsonify({
            'success': True,
            'message': 'Form submitted successfully'
        }), 200
        
    except Exception as e:
        print(f"Error processing submission: {e}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok'}), 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))  # Use 5001 to avoid macOS AirPlay conflict
    app.run(debug=True, port=port, host='0.0.0.0')

