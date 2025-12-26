import { generateQRCodeURL } from '../utils/qrCode'

interface QRCodeDisplayProps {
  formUrl: string
  size?: number
}

const QRCodeDisplay = ({ formUrl, size = 200 }: QRCodeDisplayProps) => {
  const qrCodeUrl = generateQRCodeURL(formUrl, size)

  return (
    <div className="d-flex flex-column align-items-center p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      <h3 className="fw-semibold mb-3" style={{ fontSize: '1.1rem', color: '#333333' }}>
        QRコード / QR Code
      </h3>
      <img
        src={qrCodeUrl}
        alt="QR Code for Job Fair Registration Form"
        style={{ 
          border: '2px solid #dee2e6', 
          borderRadius: '8px',
          maxWidth: '100%',
          height: 'auto'
        }}
      />
      <p className="mt-3 text-center" style={{ fontSize: '0.9rem', color: '#666666', maxWidth: '300px' }}>
        このQRコードをスキャンしてフォームにアクセス / Scan this QR code to access the form
      </p>
      <a
        href={formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-break"
        style={{ fontSize: '0.8rem', color: '#00B7CE' }}
      >
        {formUrl}
      </a>
    </div>
  )
}

export default QRCodeDisplay
