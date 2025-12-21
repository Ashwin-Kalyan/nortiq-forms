# Quick Setup Guide for Nortiq Forms

This is a condensed setup guide. For detailed instructions, see `README.md`.

## Prerequisites Checklist

- [ ] Node.js and npm installed
- [ ] Python 3.8+ installed
- [ ] Google Account with Cloud Console access
- [ ] Gmail account with 2-Step Verification enabled

## Quick Setup Steps

### 1. Install Dependencies

**Frontend:**
```bash
npm install
```

**Backend:**
```bash
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Set Up Google Services

**Google Sheets:**
1. Create service account in Google Cloud Console
2. Download JSON key as `credentials.json` → save to `backend/` directory
3. Create Google Sheet → share with service account email → copy Sheet ID

**Gmail:**
1. Enable 2-Step Verification
2. Generate App Password (16 characters)

### 3. Configure Environment Variables

**Frontend `.env` (root directory):**
```env
VITE_BACKEND_URL=http://localhost:5001
```

**Backend `.env` (backend/ directory):**
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-16-char-app-password
GOOGLE_SHEET_KEY=your-sheet-id
GOOGLE_CREDENTIALS_PATH=credentials.json
PORT=5001
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
python3 app.py
```
✅ Verify: Visit `http://localhost:5001/health` → should see `{"status":"ok"}`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
✅ Verify: Visit `http://localhost:5173` → form should load

### 5. Test Everything Works

1. Fill out and submit the form
2. Check browser console (F12) → should see "Successfully submitted to backend"
3. Check backend terminal → should show submission logs
4. Check Google Sheet → new row should appear
5. Check email inbox → confirmation email should arrive

## Common Issues & Quick Fixes

| Issue | Solution |
|-------|----------|
| Backend not starting | `pip install -r requirements.txt` in backend directory |
| Port 5001 in use | Change `PORT` in `backend/.env` and update frontend `.env` |
| Frontend can't connect | Verify backend is running, check `VITE_BACKEND_URL` matches backend port |
| Google Sheets not updating | Verify Sheet ID is correct, service account has Editor access |
| Emails not sending | Use App Password (not regular password), check 2-Step Verification is enabled |

For detailed troubleshooting, see `README.md`.

