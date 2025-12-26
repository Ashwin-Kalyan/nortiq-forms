"""
Simple Python Flask backend for form submission
Handles Google Sheets and email sending
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os
from dotenv import load_dotenv

# Try to import Google Sheets libraries, but handle errors gracefully
try:
    import gspread
    from google.oauth2.service_account import Credentials
    SHEETS_AVAILABLE = True
except Exception as e:
    print(f"Warning: Google Sheets libraries not available: {e}")
    print("The server will start, but Google Sheets integration will be disabled.")
    SHEETS_AVAILABLE = False
    gspread = None
    Credentials = None

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
    if not SHEETS_AVAILABLE:
        print("Google Sheets libraries not available - skipping Sheets integration")
        return None
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
        print("=" * 50)
        print("ERROR: Email credentials not configured!")
        print("Please set EMAIL_USER and EMAIL_PASSWORD in backend/.env file")
        print("Make sure EMAIL_PASSWORD is an App Password, not your regular Gmail password")
        print("=" * 50)
        return False
    
    try:
        subject = "本日のブース訪問、ありがとうございます / Thanks for visiting our booth today!"
        
        html_body = f"""
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="margin-bottom: 30px;">
                <h2 style="color: #333; margin-bottom: 15px;">本日のブース訪問、ありがとうございます。</h2>
                
                <p>貴方のご回答、確かに拝見しました。</p>
                <p>担当者より改めてご連絡いたします。</p>
                
                <p style="margin-top: 20px;">私たちは日本で、決して止まってはいけない社会インフラを支える通信技術に取り組んでいます。</p>
                
                <p>日本で学び、経験を積み、将来その力をタイで活かしたい方との出会いを楽しみにしています。</p>
                
                <div style="margin-top: 30px;">
                    <p style="margin-bottom: 5px;"><strong>CEO 十河元太郎</strong></p>
                    <p style="margin-bottom: 5px;"><strong>協和テクノロジィズ株式会社</strong></p>
                    <p style="margin-bottom: 5px;">採用専用メールアドレス: <a href="mailto:r-hirata@star.kyotec.co.jp">r-hirata@star.kyotec.co.jp</a></p>
                </div>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            
            <div>
                <h2 style="color: #333; margin-bottom: 15px;">Dear All,</h2>
                
                <p><strong>Thanks for visiting our booth today!</strong></p>
                <p><strong>we'll be in touch soon!</strong></p>
                
                <p style="margin-top: 20px;">Our mission is engineering the critical communication technologies that keep essential infrastructure running in Japan.</p>
                
                <p><strong>Join us in Japan and grow with us!</strong></p>
                <p><strong>We guide you and we learn together!</strong></p>
                
                <div style="margin-top: 30px;">
                    <p style="margin-bottom: 5px;">Yours sincerely,</p>
                    <p style="margin-bottom: 5px;"><strong>Gentaro Sogo</strong></p>
                    <p style="margin-bottom: 5px;"><strong>CEO Kyowa Technologies Co., Ltd.</strong></p>
                    <p style="margin-bottom: 5px;">Continued contact: <a href="mailto:r-hirata@star.kyotec.co.jp">r-hirata@star.kyotec.co.jp</a></p>
                </div>
            </div>
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
        
        print(f"Email sent successfully to {to_email}")
        return True
    except smtplib.SMTPAuthenticationError as e:
        print("=" * 50)
        print(f"ERROR: SMTP Authentication failed!")
        print(f"Details: {e}")
        print("This usually means:")
        print("1. EMAIL_PASSWORD is incorrect (make sure it's an App Password, not your regular password)")
        print("2. 2-Step Verification is not enabled on your Google Account")
        print("3. App Password was not generated correctly")
        print("=" * 50)
        return False
    except smtplib.SMTPException as e:
        print("=" * 50)
        print(f"ERROR: SMTP error occurred!")
        print(f"Details: {e}")
        print("=" * 50)
        return False
    except Exception as e:
        print("=" * 50)
        print(f"ERROR: Failed to send email to {to_email}")
        print(f"Error type: {type(e).__name__}")
        print(f"Error details: {e}")
        print("=" * 50)
        return False

@app.route('/submit', methods=['POST'])
def submit_form():
    """Handle form submission"""
    try:
        data = request.json
        
        # Prepare row data for Google Sheets
        interests_str = ', '.join(data.get('interests', [])) if isinstance(data.get('interests'), list) else data.get('interests', '')
        
        row_data = [
            datetime.now().isoformat(),  # Timestamp
            data.get('fullName', ''),  # Full Name
            data.get('furigana', ''),
            data.get('gender', ''),
            data.get('faculty', ''),
            data.get('desiredYear', ''),  # Year
            data.get('email', ''),
            interests_str,  # Interest
            data.get('comments', ''),  # Note
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
                    'Gender',
                    'Faculty',
                    'Year',
                    'Email',
                    'Interest',
                    'Note'
                ]
                sheet.append_row(headers)
            
            sheet.append_row(row_data)
        
        # Send confirmation email
        email = data.get('email', '')
        name = data.get('fullName', 'User')
        if email:
            email_result = send_email(email, name)
            if not email_result:
                print(f"WARNING: Failed to send email to {email}. Check email configuration and server logs.")
            else:
                print(f"Successfully sent confirmation email to {email}")
        
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

