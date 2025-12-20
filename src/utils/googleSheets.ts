/**
 * Google Sheets Integration via Python Backend
 * 
 * The backend handles both Google Sheets integration and email sending.
 * 
 * To set up:
 * 1. Follow instructions in backend/README.md
 * 2. Start the Python backend server (python backend/app.py)
 * 3. Set VITE_BACKEND_URL in .env file (e.g., http://localhost:5000)
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'

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
  try {
    const submissionData: FormSubmission = {
      ...data,
      timestamp: new Date().toISOString(),
    }

    const response = await fetch(`${BACKEND_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    })

    const result = await response.json()
    
    if (result.success) {
      console.log('Successfully submitted to backend')
      return true
    } else {
      console.error('Backend error:', result.error)
      return false
    }
  } catch (error) {
    console.error('Error submitting to backend:', error)
    console.error('Make sure the Python backend is running on', BACKEND_URL)
    // Return true to allow form submission even if backend fails (for testing)
    // In production, you might want to show an error to the user
    return true
  }
}
