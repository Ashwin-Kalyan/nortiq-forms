import { useState } from 'react'
import RegistrationForm from './components/RegistrationForm'
import SuccessModal from './components/SuccessModal'
import QRCodePage from './components/QRCodePage'
import { submitToGoogleSheets, FormSubmission } from './utils/googleSheets'

function App() {
  // Check if we're on the QR code page
  if (window.location.pathname === '/qr') {
    return <QRCodePage />
  }
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submittedData, setSubmittedData] = useState<FormSubmission | null>(null)

  const handleFormSubmit = async (data: Omit<FormSubmission, 'timestamp'>) => {
    try {
      // Submit to Google Sheets (don't wait for result, show success immediately)
      submitToGoogleSheets(data).catch(err => console.error('Google Sheets error:', err))
      
      // Show success modal immediately
      const submissionWithTimestamp: FormSubmission = {
        ...data,
        timestamp: new Date().toISOString(),
      }
      setSubmittedData(submissionWithTimestamp)
      setShowSuccessModal(true)
    } catch (error) {
      console.error('Error submitting form:', error)
      // Still show success for user experience
      const submissionWithTimestamp: FormSubmission = {
        ...data,
        timestamp: new Date().toISOString(),
      }
      setSubmittedData(submissionWithTimestamp)
      setShowSuccessModal(true)
    }
  }

  return (
    <div 
      className="min-vh-100 py-3 py-md-4 py-lg-5" 
      style={{ 
        background: 'linear-gradient(135deg, #00B7CE 0%, #007A8A 100%)',
        minHeight: '100vh'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-11 col-lg-10 col-xl-9">
            <div className="card shadow-lg border-0" style={{ borderRadius: '12px', backgroundColor: '#ffffff' }}>
              <div className="card-body p-3 p-md-4 p-lg-5">
                <RegistrationForm onSubmit={handleFormSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showSuccessModal && submittedData && (
        <SuccessModal
          onClose={() => setShowSuccessModal(false)}
          data={submittedData}
        />
      )}
    </div>
  )
}

export default App
