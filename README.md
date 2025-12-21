# Nortiq Forms

A bilingual (English/Japanese) mobile-first registration form for job fair visitors. Allows quick submission on smartphones via QR code scanning, automatically saves data to Google Sheets, and sends confirmation emails.

# Author
Name: Ashwin Kalyan
Date: 12-20-2025
Organization: Nortiq Labs

## Features

- Mobile-optimized design for quick registration at booths
- Bilingual support (Japanese/English)
- Automatic data collection to Google Sheets
- Auto-reply confirmation emails

## Tech Stack

React, TypeScript, Tailwind CSS, Bootstrap, Flask

## Prerequisites

Before running the application, ensure you have:

- **Node.js** (v16 or higher) and **npm** installed
- **Python 3.8+** installed
- **Google Account** with access to Google Cloud Console
- **Gmail Account** with 2-Step Verification enabled

## Installation & Setup

### Step 1: Clone and Install Frontend Dependencies

```bash
# Navigate to project directory
cd Nortiq-Forms

# Install Node.js dependencies
npm install
```

### Step 2: Set Up Google Sheets API

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Google Sheets API
   - Google Drive API
4. Create a Service Account:
   - Navigate to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Name it (e.g., "nortiq-sheets-service")
   - Click "Create and Continue"
   - Skip role assignment, click "Done"
5. Create and download credentials:
   - Click on the service account you created
   - Go to "Keys" tab
   - Click "Add Key" > "Create new key"
   - Choose "JSON" format
   - Download the file and save it as `credentials.json` in the `backend/` directory
6. Create a Google Sheet:
   - Create a new Google Sheet
   - Share it with the service account email (found in `credentials.json`, looks like `xxx@xxx.iam.gserviceaccount.com`)
   - Give it "Editor" permissions
   - Copy the Sheet ID from the URL:
     - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
     - The `SHEET_ID_HERE` is your `GOOGLE_SHEET_KEY`

### Step 3: Set Up Gmail for Email Sending

1. Go to your [Google Account Security Settings](https://myaccount.google.com/security)
2. Enable 2-Step Verification (if not already enabled)
3. Generate an App Password:
   - Go to "Security" > "2-Step Verification" > "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Enter "Nortiq Forms" as the name
   - Click "Generate"
   - Copy the 16-character password (you'll need this for `EMAIL_PASSWORD`)

### Step 4: Configure Environment Variables

#### Frontend Configuration

Create a `.env` file in the **root directory** (`Nortiq-Forms/.env`):

```env
VITE_BACKEND_URL=http://localhost:5001
```

#### Backend Configuration

Create a `.env` file in the `backend/` directory (`Nortiq-Forms/backend/.env`):

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-character-app-password
GOOGLE_SHEET_KEY=your-google-sheet-id-from-url
GOOGLE_CREDENTIALS_PATH=credentials.json
PORT=5001
```

**Important Notes:**
- `EMAIL_PASSWORD` must be the App Password (16 characters), NOT your regular Gmail password
- `GOOGLE_SHEET_KEY` is the Sheet ID from the Google Sheets URL
- Make sure `credentials.json` is in the `backend/` directory

### Step 5: Install Backend Dependencies

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Or if using pip3:
pip3 install -r requirements.txt
```

## How to Run the Application

### Running the Backend Server

**Terminal 1 - Backend:**

```bash
# Navigate to backend directory
cd backend

# Start the Flask server
python app.py

# Or if using python3:
python3 app.py
```

You should see output like:
```
 * Running on http://0.0.0.0:5001
 * Debug mode: on
```

**Verify backend is running:**
- Open your browser and visit: `http://localhost:5001/health`
- You should see: `{"status":"ok"}`

### Running the Frontend Development Server

**Terminal 2 - Frontend:**

```bash
# Navigate to project root (if not already there)
cd Nortiq-Forms

# Start the development server
npm run dev
```

You should see output like:
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**Open the application:**
- Open your browser and visit: `http://localhost:5173`
- The registration form should load

### Complete Running Instructions Summary

1. **Start Backend** (Terminal 1):
   ```bash
   cd backend
   python3 app.py
   ```
   - Keep this terminal open
   - Backend runs on `http://localhost:5001`

2. **Start Frontend** (Terminal 2):
   ```bash
   npm run dev
   ```
   - Keep this terminal open
   - Frontend runs on `http://localhost:5173`

3. **Test the Application**:
   - Open `http://localhost:5173` in your browser
   - Fill out and submit the registration form
   - Check backend terminal for submission logs
   - Verify data appears in your Google Sheet
   - Check email inbox for confirmation email

## Testing API Features

### Test Backend Health Endpoint

```bash
curl http://localhost:5001/health
```

Expected response: `{"status":"ok"}`

### Test Form Submission

1. Fill out the form on the frontend
2. Submit the form
3. Check the following:
   - **Browser Console** (F12): Should show "Successfully submitted to backend"
   - **Backend Terminal**: Should show submission logs
   - **Google Sheet**: New row should appear with form data
   - **Email Inbox**: Confirmation email should arrive

## Troubleshooting

### Backend Not Starting

**Issue**: `ModuleNotFoundError` or import errors
- **Solution**: Make sure all dependencies are installed:
  ```bash
  cd backend
  pip install -r requirements.txt
  ```

**Issue**: Port 5001 already in use
- **Solution**: Change `PORT` in `backend/.env` to a different port (e.g., `5002`), and update `VITE_BACKEND_URL` in frontend `.env` accordingly

**Issue**: `credentials.json` not found
- **Solution**: Make sure `credentials.json` is in the `backend/` directory

### Frontend Not Connecting to Backend

**Issue**: "Backend not responding" errors in browser console
- **Solution**: 
  - Verify backend is running (`http://localhost:5001/health`)
  - Check `VITE_BACKEND_URL` in frontend `.env` matches backend port
  - Restart frontend dev server after changing `.env` file

**Issue**: CORS errors
- **Solution**: Backend has CORS enabled. If issues persist, check that backend is running and accessible

### Google Sheets Not Updating

**Issue**: Data not appearing in Google Sheet
- **Solution**:
  - Verify `GOOGLE_SHEET_KEY` in `backend/.env` is correct (Sheet ID from URL)
  - Check that Google Sheet is shared with service account email (from `credentials.json`)
  - Verify service account has "Editor" permissions
  - Check backend terminal for error messages

### Emails Not Sending

**Issue**: No confirmation emails received
- **Solution**:
  - Verify `EMAIL_USER` and `EMAIL_PASSWORD` in `backend/.env` are correct
  - Make sure you're using App Password (16 characters), not regular password
  - Verify 2-Step Verification is enabled on Google Account
  - Check backend terminal for SMTP error messages
  - Check spam/junk folder

## Requirements

### Frontend Dependencies

**Production:**
- react: ^18.2.0
- react-dom: ^18.2.0

**Development:**
- @types/react: ^18.2.43
- @types/react-dom: ^18.2.17
- @typescript-eslint/eslint-plugin: ^6.14.0
- @typescript-eslint/parser: ^6.14.0
- @vitejs/plugin-react: ^4.2.1
- autoprefixer: ^10.4.16
- eslint: ^8.55.0
- eslint-plugin-react-hooks: ^4.6.0
- eslint-plugin-react-refresh: ^0.4.5
- postcss: ^8.4.32
- tailwindcss: ^3.3.6
- typescript: ^5.2.2
- vite: ^5.0.8

### Backend Dependencies

- flask: 3.0.0
- flask-cors: 4.0.0
- gspread: 5.12.0
- google-auth: 2.23.4
- google-auth-oauthlib: 1.1.0
- google-auth-httplib2: 0.1.1
- python-dotenv: 1.0.0

