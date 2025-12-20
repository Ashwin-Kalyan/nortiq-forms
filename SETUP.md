# Setup Instructions

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Google Sheets integration:**
   - Follow the Google Sheets Integration Setup section in README.md
   - Create `.env` file with your Google Script URL

3. **Run development server:**
   ```bash
   npm run dev
   ```

## Detailed Setup Guide

### 1. Google Sheets Setup

**Create the Google Sheet:**
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it (e.g., "Job Fair 2024 Registrations")

**Set up the Script:**
1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. Delete any default code
3. Copy the entire contents of `scripts/google-apps-script.js`
4. Paste into the Apps Script editor
5. Save (Ctrl+S or Cmd+S)

**Deploy the Script:**
1. Click **Deploy** button
2. Select **New deployment**
3. Click the gear icon ⚙️ and choose **Web app**
4. Set:
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Authorize** the script when prompted:
   - Review permissions
   - Click "Advanced" if you see warnings
   - Click "Go to [Project Name] (unsafe)" if needed
   - Click "Allow"
7. Copy the **Web app URL**

**Configure Environment:**
1. Create `.env` file in project root:
   ```bash
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec
   VITE_FORM_URL=http://localhost:5173
   ```
2. Replace `YOUR_SCRIPT_ID_HERE` with your actual script ID from the URL

**Test:**
1. Run `npm run dev`
2. Submit a test form entry
3. Check your Google Sheet - should see data appear
4. Check the email you used - should receive confirmation email

### 2. Form Deployment

**Development:**
```bash
npm run dev
```
Access at `http://localhost:5173`

**Production Build:**
```bash
npm run build
```
Deploy the `dist` folder to your hosting service.

**Recommended Hosting:**
- **Netlify**: Drag and drop `dist` folder
- **Vercel**: Connect GitHub repo and deploy
- **GitHub Pages**: Use GitHub Actions to deploy

**Update Production URL:**
After deploying, update `.env` (or environment variables in your hosting service):
```
VITE_FORM_URL=https://your-deployed-url.com
```

### 3. QR Code Setup

**Option 1: Use Admin Panel**
- Create a route to display `AdminPanel` component
- Shows QR code and form URL
- Access at `/admin` or similar

**Option 2: Generate Manually**
- Use the form URL
- Use any QR code generator with the form URL
- Or use: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=YOUR_FORM_URL`

### 4. Testing Checklist

- [ ] Form displays correctly on mobile device
- [ ] All fields are visible and usable
- [ ] Validation works (try submitting empty form)
- [ ] Form submission works
- [ ] Data appears in Google Sheet
- [ ] Confirmation email is received
- [ ] QR code scans correctly and opens form
- [ ] Form works on different mobile browsers (Chrome, Safari, etc.)

## Common Issues

### Issue: CORS Error
**Solution**: Google Apps Script should be deployed with "Anyone" access, and use `mode: 'no-cors'` in fetch (already implemented).

### Issue: Data not saving to Sheets
**Check:**
- Google Script URL is correct
- Script is deployed (not just saved)
- Script has "Anyone" access
- Browser console for error messages

### Issue: Email not sending
**Check:**
- Email address in form is valid
- Apps Script execution logs (View > Logs)
- Script has email sending permissions

### Issue: QR code not scanning
**Check:**
- Form URL is accessible from mobile network
- URL is correct in `.env`
- QR code is clear and large enough

## Support

For issues or questions, check:
1. Browser console for errors
2. Google Apps Script execution logs
3. Network tab in browser DevTools
4. Google Sheets for data entries

