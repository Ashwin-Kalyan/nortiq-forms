# Python Backend for Job Fair Registration Form

This Flask backend handles form submissions, Google Sheets integration, and email notifications.

## Features

- ✅ Receives form submissions from React frontend
- ✅ Writes data to Google Sheets
- ✅ Sends confirmation emails automatically
- ✅ CORS enabled for frontend communication

## Setup

See `../SETUP_INSTRUCTIONS.md` for complete setup instructions.

## Quick Start

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Configure `.env` file (see `.env.example`)

3. Run the server:
   ```bash
   python app.py
   ```

4. Server runs on `http://localhost:5000`

## Environment Variables

Create a `.env` file with:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
GOOGLE_SHEET_KEY=your-google-sheet-id
GOOGLE_CREDENTIALS_PATH=credentials.json
```

## API Endpoints

### POST /submit

Submit form data.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "furigana": "ジョン ドウ",
  "university": "Thai-Nichi Institute",
  "faculty": "Engineering",
  "academicYear": "Year 2",
  "email": "john@example.com",
  "interests": ["Full-time Employment", "Internship"],
  "comments": "Optional comment"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully"
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Google Sheets Setup

1. Create a Google Sheet
2. Set up Google Cloud Project and Service Account
3. Download service account credentials as `credentials.json`
4. Share the Google Sheet with the service account email
5. Copy the Sheet ID from the URL

## Email Setup

Uses Gmail SMTP:
1. Enable 2-Factor Authentication on Gmail
2. Create App Password (16 characters)
3. Use the app password in `EMAIL_PASSWORD`

## Deployment Options

### Heroku

1. Install Heroku CLI
2. Create `Procfile`:
   ```
   web: python app.py
   ```
3. Set environment variables in Heroku dashboard
4. Deploy:
   ```bash
   heroku create your-app-name
   git push heroku main
   ```

### PythonAnywhere

1. Upload code to PythonAnywhere
2. Create a web app
3. Set environment variables in web app configuration
4. Upload `credentials.json` file

### AWS/DigitalOcean

1. Set up a Linux server
2. Install Python and dependencies
3. Use systemd or supervisor to run the app
4. Set up reverse proxy (nginx) if needed
5. Configure environment variables

## Troubleshooting

See main `SETUP_INSTRUCTIONS.md` for common issues and solutions.
