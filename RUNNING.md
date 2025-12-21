# How to Run Nortiq Forms - Complete Guide

This guide provides step-by-step instructions to run the application with all API features working.

## Prerequisites

Before starting, ensure you have:
- ✅ Node.js (v16+) and npm installed
- ✅ Python 3.8+ installed
- ✅ Google Cloud Project with Sheets API enabled
- ✅ Gmail account with 2-Step Verification enabled
- ✅ All environment variables configured (see `README.md`)

## Step-by-Step Running Instructions

### Step 1: Verify Environment Setup

**Check Frontend `.env` file exists** (in root directory):
```bash
cat .env
```
Should contain:
```
VITE_BACKEND_URL=http://localhost:5001
```

**Check Backend `.env` file exists** (in `backend/` directory):
```bash
cat backend/.env
```
Should contain:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
GOOGLE_SHEET_KEY=your-sheet-id
GOOGLE_CREDENTIALS_PATH=credentials.json
PORT=5001
```

**Check `credentials.json` exists**:
```bash
ls backend/credentials.json
```

### Step 2: Start the Backend Server

Open **Terminal 1**:

```bash
# Navigate to project directory
cd /path/to/Nortiq-Forms

# Navigate to backend directory
cd backend

# Start the Flask server
python3 app.py
```

**Expected Output:**
```
 * Running on http://0.0.0.0:5001
 * Debug mode: on
WARNING: This is a development server. Do not use it in a production deployment.
```

**✅ Verify Backend is Running:**
- Open browser and visit: `http://localhost:5001/health`
- You should see: `{"status":"ok"}`
- If you see an error, check the terminal for error messages

**⚠️ Keep this terminal open!** The backend must stay running.

### Step 3: Start the Frontend Development Server

Open **Terminal 2** (new terminal window):

```bash
# Navigate to project root directory
cd /path/to/Nortiq-Forms

# Start the development server
npm run dev
```

**Expected Output:**
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

**✅ Verify Frontend is Running:**
- Open browser and visit: `http://localhost:5173`
- The registration form should load
- If you see errors, check the terminal for messages

**⚠️ Keep this terminal open!** The frontend must stay running.

### Step 4: Test the Application

1. **Open the Form:**
   - Visit `http://localhost:5173` in your browser
   - The registration form should be visible

2. **Fill Out the Form:**
   - Enter all required fields
   - Select at least one interest
   - Click "Submit / 送信"

3. **Verify Submission:**
   
   **Check Browser Console (F12):**
   - Open Developer Tools (F12 or Right-click → Inspect)
   - Go to "Console" tab
   - Should see: `Successfully submitted to backend`
   - If you see errors, note them down

   **Check Backend Terminal:**
   - Look at Terminal 1 (backend)
   - Should see submission logs
   - If you see errors (like "Error connecting to Google Sheets"), check your configuration

   **Check Google Sheet:**
   - Open your Google Sheet
   - A new row should appear with the form data
   - If no data appears, check:
     - `GOOGLE_SHEET_KEY` is correct in `backend/.env`
     - Service account email has access to the sheet
     - Backend terminal for error messages

   **Check Email:**
   - Check your email inbox (and spam folder)
   - Confirmation email should arrive within a few seconds
   - If no email arrives, check:
     - `EMAIL_USER` and `EMAIL_PASSWORD` in `backend/.env`
     - You're using App Password (not regular password)
     - Backend terminal for SMTP errors

## Testing API Endpoints Directly

### Test Health Endpoint

```bash
curl http://localhost:5001/health
```

**Expected Response:**
```json
{"status":"ok"}
```

### Test Form Submission Endpoint

```bash
curl -X POST http://localhost:5001/submit \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "furigana": "テストユーザー",
    "university": "Test University",
    "faculty": "Engineering",
    "academicYear": "year1",
    "age": "25",
    "email": "test@example.com",
    "interests": ["Full-time Employment"],
    "comments": "Test submission"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Form submitted successfully"
}
```

## Common Running Issues

### Issue: Backend Won't Start

**Error:** `ModuleNotFoundError: No module named 'flask'`

**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

**Error:** `Address already in use`

**Solution:**
- Port 5001 is already in use
- Change `PORT=5002` in `backend/.env`
- Update `VITE_BACKEND_URL=http://localhost:5002` in frontend `.env`
- Restart both servers

### Issue: Frontend Can't Connect to Backend

**Error in Browser Console:** `Failed to fetch` or `Network error`

**Solutions:**
1. Verify backend is running: `curl http://localhost:5001/health`
2. Check `VITE_BACKEND_URL` in frontend `.env` matches backend port
3. Restart frontend dev server after changing `.env`
4. Check for CORS errors (backend should handle this automatically)

### Issue: Form Submits but No Data in Google Sheets

**Check:**
1. Backend terminal for error messages
2. `GOOGLE_SHEET_KEY` in `backend/.env` is correct
3. Google Sheet is shared with service account email
4. Service account has "Editor" permissions

### Issue: Form Submits but No Email Sent

**Check:**
1. Backend terminal for SMTP errors
2. `EMAIL_PASSWORD` is App Password (16 characters), not regular password
3. 2-Step Verification is enabled on Google Account
4. Check spam/junk folder

## Stopping the Servers

**To Stop Backend:**
- Go to Terminal 1
- Press `Ctrl + C`

**To Stop Frontend:**
- Go to Terminal 2
- Press `Ctrl + C`

## Production Deployment Notes

For production deployment:
- Use a production WSGI server (like Gunicorn) instead of Flask's development server
- Set up proper environment variables on your hosting platform
- Configure CORS for your production domain
- Use HTTPS for secure connections

## Need Help?

- Check `README.md` for detailed setup instructions
- Check `backend/README.md` for backend-specific setup
- Review error messages in browser console and backend terminal
- Verify all environment variables are correctly set

