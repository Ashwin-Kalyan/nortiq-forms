# 展示会来訪者入力フォーム / Job Fair Visitor Registration Form

A bilingual (English/Japanese) mobile-first registration form for job fair visitors. Designed for quick submission on smartphones while standing at a booth.

## Features

- **Mobile-First Design**: Optimized for smartphone use while standing at a booth
- **Bilingual Support**: Japanese with English translations
- **Google Sheets Integration**: Automatic data collection to Google Sheets
- **Auto-Reply Email**: Automatic confirmation email sent after submission
- **QR Code Generation**: Easy access via QR code scanning
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Form Validation**: Simple validation with clear error messages
- **Clean UI**: Simple, clean layout with large tap targets and readable fonts

## Form Fields

The form includes approximately 5-6 questions for quick completion:

1. **Full Name (お名前)** - Text input in Japanese
2. **Furigana (ふりがな)** - Phonetic reading of the name
3. **University Name (大学名)** - Text input
4. **Faculty / Major (学部・学科)** - Dropdown selection
5. **Email Address (メールアドレス)** - Required, with basic validation
6. **What are you interested in? (どのようなことに興味がありますか？)** - Multi-select checkboxes
7. **Optional Comments (その他・ご質問)** - Optional textarea (500 character limit)

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The form will be available at `http://localhost:5173`

## Google Sheets Integration Setup

### Step 1: Create a Google Sheet
1. Create a new Google Sheet
2. Name it (e.g., "Job Fair Registrations")

### Step 2: Set up Google Apps Script
1. Open your Google Sheet
2. Go to **Extensions** > **Apps Script**
3. Copy the code from `scripts/google-apps-script.js` and paste it into the script editor
4. Save the project (Ctrl+S or Cmd+S)

### Step 3: Deploy as Web App
1. Click **Deploy** > **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure:
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/.../exec`)

### Step 4: Configure Environment Variable
1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```
2. Add your Google Script URL:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   VITE_FORM_URL=http://localhost:5173
   ```
3. For production, update `VITE_FORM_URL` to your deployed URL

### Step 5: Test the Integration
1. Run `npm run dev`
2. Fill out and submit the form
3. Check your Google Sheet - data should appear automatically
4. Check the email address you used - confirmation email should arrive

## Auto-Reply Email Configuration

The auto-reply email is handled automatically by the Google Apps Script. The email includes:
- Bilingual thank-you message
- Confirmation of registration
- Next steps information

You can customize the email template in `scripts/google-apps-script.js` in the `sendAutoReplyEmail` function.

## QR Code Generation

### Generate QR Code for the Form

1. Once your form is deployed, get the form URL
2. You can use the Admin Panel component to display the QR code:
   - Access `/admin` route (if you set up routing)
   - Or use the `QRCodeDisplay` component anywhere in your app

### Using QR Code at the Job Fair

1. Display the QR code on a tablet or printed poster
2. Students scan with their smartphone camera
3. Form opens automatically
4. Students fill out and submit

The QR code component automatically generates using the QR Server API (no API key required).

## Data Collection

All submitted data is automatically:
- ✅ Saved to Google Sheets (with timestamp)
- ✅ Used to send auto-reply email
- ✅ Organizable (filter, sort, export from Google Sheets)

### Google Sheets Columns

The script creates the following columns:
- Timestamp
- Full Name
- Furigana
- University
- Faculty
- Email
- Interests (comma-separated)
- Comments

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory. Deploy this to your hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── RegistrationForm.tsx    # Main form component
│   │   ├── SuccessModal.tsx        # Success message modal
│   │   ├── QRCodeDisplay.tsx       # QR code display component
│   │   └── AdminPanel.tsx          # Admin panel for QR code
│   ├── utils/
│   │   ├── googleSheets.ts         # Google Sheets integration
│   │   └── qrCode.ts               # QR code utilities
│   ├── App.tsx                     # Main app component
│   └── main.tsx                    # Entry point
├── scripts/
│   └── google-apps-script.js       # Google Apps Script code
└── README.md
```

## Customization

### Update Form Fields

Edit `src/components/RegistrationForm.tsx`:
- Modify `interestOptions` array for different interest choices
- Modify `facultyOptions` array for different faculty options
- Adjust validation rules in `validateForm()`

### Update Email Template

Edit `scripts/google-apps-script.js`:
- Modify the `sendAutoReplyEmail` function
- Update the HTML email template

### Update Styling

The form uses Tailwind CSS. All styling can be modified directly in the component files.

## Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **Google Apps Script** - Backend (Sheets + Email)

## Notes

- Form is optimized for mobile use (large buttons, readable fonts, adequate spacing)
- Validation is simple (required fields + basic email format check)
- Data is stored in Google Sheets for easy access and export
- Auto-reply emails are sent immediately after form submission
- QR code makes form access quick and easy at the job fair booth

## Troubleshooting

### Data not appearing in Google Sheets
- Check that the Google Script URL is correct in `.env`
- Verify the Google Apps Script is deployed as "Web app" with "Anyone" access
- Check the browser console for errors

### Emails not being sent
- Verify the email address in the form is valid
- Check Google Apps Script execution logs
- Ensure the script has permission to send emails

### QR code not working
- Verify `VITE_FORM_URL` in `.env` matches your deployed URL
- Check that the form URL is accessible from mobile devices
