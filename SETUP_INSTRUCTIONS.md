# Setup Instructions for Email and Google Sheets

This project uses a Python Flask backend to handle form submissions, Google Sheets integration, and email sending.

## Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

## Step 1: Install Python Dependencies

```bash
cd backend
pip install -r requirements.txt
```

Or if you prefer using a virtual environment:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

## Step 2: Set Up Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable APIs:
   - Search for "Google Sheets API" and enable it
   - Search for "Google Drive API" and enable it
4. Create Service Account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Give it a name (e.g., "form-backend") and click "Create and Continue"
   - Skip role assignment (optional) and click "Done"
5. Create Key:
   - Click on the service account you just created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format
   - Download the JSON file and save it as `credentials.json` in the `backend/` folder
6. Get Service Account Email:
   - In the service account details, copy the email address (looks like: `xxx@xxx.iam.gserviceaccount.com`)
7. Share Google Sheet with Service Account:
   - Create a new Google Sheet or open an existing one
   - Click "Share" button
   - Paste the service account email address
   - Give it "Editor" access
   - Click "Send"

## Step 3: Get Google Sheet ID

1. Open your Google Sheet
2. The Sheet ID is in the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
3. Copy the `SHEET_ID_HERE` part (it's a long string of letters, numbers, and dashes)

## Step 4: Set Up Gmail App Password

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Enable 2-Factor Authentication if not already enabled:
   - Go to "Security"
   - Under "How you sign in to Google", enable "2-Step Verification"
3. Create App Password:
   - Still in Security settings, find "App passwords" (you may need to search for it)
   - Click "App passwords"
   - Select "Mail" as the app and "Other" as device
   - Enter "Form Backend" as the name
   - Click "Generate"
   - Copy the 16-character password (you'll only see it once!)

## Step 5: Configure Environment Variables

1. In the `backend/` folder, copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file and fill in your values:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   GOOGLE_SHEET_KEY=your-sheet-id-from-step-3
   GOOGLE_CREDENTIALS_PATH=credentials.json
   ```

## Step 6: Run the Backend Server

```bash
cd backend
python app.py
```

The server will start on `http://localhost:5000`

You should see:
```
 * Running on http://127.0.0.1:5000
```

Keep this terminal window open while testing.

## Step 7: Configure Frontend

1. Create a `.env` file in the project root (same folder as `package.json`):
   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

2. For production, update this to your deployed backend URL.

## Step 8: Start Frontend

In a new terminal window:

```bash
npm run dev
```

## Step 9: Test

1. Fill out and submit the form
2. Check your Google Sheet - you should see a new row with the data
3. Check the email you entered - you should receive a confirmation email

## Viewing Your Data

Once submissions start coming in:

1. Open your Google Sheet
2. You'll see columns:
   - Timestamp
   - Full Name
   - Furigana
   - University
   - Faculty
   - Academic Year of PhD
   - Email
   - Interests
   - Comments

3. You can:
   - Filter and sort data
   - Export to CSV (File > Download > Comma-separated values)
   - Share with team members
   - Set up notifications for new submissions

## Troubleshooting

### Backend won't start
- Make sure all dependencies are installed: `pip install -r requirements.txt`
- Check that Python 3.7+ is installed: `python --version`
- Make sure port 5000 is not already in use

### Email not sending
- Verify Gmail app password is correct (16 characters, no spaces)
- Make sure 2-Factor Authentication is enabled
- Check backend logs for error messages
- Verify EMAIL_USER and EMAIL_PASSWORD in `.env`

### Data not appearing in Sheets
- Verify GOOGLE_SHEET_KEY is correct in `.env`
- Make sure the sheet is shared with the service account email
- Check that `credentials.json` is in the `backend/` folder
- Check backend logs for error messages

### Frontend can't connect to backend
- Make sure backend is running (`python backend/app.py`)
- Verify VITE_BACKEND_URL in frontend `.env` matches backend URL
- Check browser console for CORS errors
- Make sure both are running (backend on port 5000, frontend on port 5173)

### CORS errors
- The backend has CORS enabled for all origins
- If you still get CORS errors, make sure `flask-cors` is installed

## Production Deployment

For production, you'll need to:

1. Deploy the Python backend to a server (Heroku, AWS, DigitalOcean, etc.)
2. Update `VITE_BACKEND_URL` in frontend `.env` to your production backend URL
3. Set environment variables on your hosting platform
4. Make sure `credentials.json` is securely stored on your server

See `backend/README.md` for more deployment options.
