import QRCodeDisplay from './QRCodeDisplay'

/**
 * QR Code Page Component
 * Displays the QR code for the form URL
 * Access this at /qr or similar route
 */
const QRCodePage = () => {
  const formUrl = window.location.origin

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            QR Code for Job Fair Registration Form
          </h1>
          <div className="flex justify-center mb-6">
            <QRCodeDisplay formUrl={formUrl} size={300} />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-4">
              Form URL:
            </p>
            <p className="text-blue-600 font-mono text-sm break-all">
              {formUrl}
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(formUrl)
                alert('URL copied to clipboard!')
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Copy URL
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QRCodePage

