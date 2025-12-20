/**
 * Google Sheets Integration
 * 
 * To use this, you need to:
 * 1. Create a Google Sheet
 * 2. Set up a Google Apps Script web app
 * 3. Configure the script URL below
 * 
 * Instructions:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste the script from scripts/google-apps-script.js
 * 4. Deploy as web app (Execute as: Me, Who has access: Anyone)
 * 5. Copy the web app URL and set it as GOOGLE_SCRIPT_URL
 */

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'YOUR_GOOGLE_SCRIPT_URL_HERE'

export interface FormSubmission {
  fullName: string
  furigana: string
  university: string
  faculty: string
  academicYear: string
  email: string
  interests: string[]
  comments: string
  timestamp: string
}

export const submitToGoogleSheets = async (data: Omit<FormSubmission, 'timestamp'>): Promise<boolean> => {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
    console.warn('Google Script URL not configured. Please set VITE_GOOGLE_SCRIPT_URL in .env')
    // Return true to allow form submission even without Sheets integration (for testing)
    return true
  }

  try {
    const submissionData: FormSubmission = {
      ...data,
      timestamp: new Date().toISOString(),
    }

    // Send as JSON - Google Apps Script can handle this
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    })

    // Try to read response if possible
    try {
      const result = await response.json()
      return result.success !== false
    } catch {
      // If we can't parse response (CORS issue), assume success if status is ok or 0
      return response.ok || response.status === 0
    }
  } catch (error) {
    console.error('Error submitting to Google Sheets:', error)
    // Don't block form submission if Sheets fails - just log the error
    // Return true so user still sees success message
    // In production, you might want to queue failed submissions for retry
    return true
  }
}

