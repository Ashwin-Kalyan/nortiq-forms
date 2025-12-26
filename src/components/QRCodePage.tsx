import QRCodeDisplay from './QRCodeDisplay'

/**
 * QR Code Page Component
 * Displays the QR code for the form URL
 * Access this at /qr or similar route
 */
const QRCodePage = () => {
  // Use environment variable if set, otherwise use the production Vercel URL
  // You can override this by setting VITE_FORM_URL in Vercel environment variables
  const productionUrl = 'https://nortiq-forms-vercel-7z71oitew-ashwin-kalyans-projects.vercel.app'
  const formUrl = import.meta.env.VITE_FORM_URL || productionUrl

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
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card shadow-lg border-0" style={{ borderRadius: '12px', backgroundColor: '#ffffff' }}>
              <div className="card-body p-4 p-md-5">
                <h1 className="text-center mb-4 mb-md-5 fw-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', color: '#333333' }}>
                  QR Code for Job Fair Registration Form
                </h1>
                <div className="d-flex justify-content-center mb-4 mb-md-5">
                  <QRCodeDisplay formUrl={formUrl} size={300} />
                </div>
                <div className="text-center">
                  <p className="mb-3" style={{ fontSize: '0.95rem', color: '#666666' }}>
                    Form URL:
                  </p>
                  <p className="mb-4 text-break" style={{ color: '#00B7CE', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                    {formUrl}
                  </p>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(formUrl)
                      alert('URL copied to clipboard!')
                    }}
                    className="btn btn-primary"
                    style={{ backgroundColor: '#00B7CE', borderColor: '#00B7CE' }}
                  >
                    Copy URL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRCodePage
