import { generateQRCodeURL } from '../utils/qrCode'

interface QRCodeDisplayProps {
  formUrl: string
  size?: number
}

const QRCodeDisplay = ({ formUrl, size = 200 }: QRCodeDisplayProps) => {
  const qrCodeUrl = generateQRCodeURL(formUrl, size)

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        QRコード / QR Code
      </h3>
      <img
        src={qrCodeUrl}
        alt="QR Code for Job Fair Registration Form"
        className="border-2 border-gray-200 rounded"
      />
      <p className="mt-4 text-sm text-gray-600 text-center max-w-xs">
        このQRコードをスキャンしてフォームにアクセス / Scan this QR code to access the form
      </p>
      <a
        href={formUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 text-xs text-blue-600 hover:text-blue-800 break-all"
      >
        {formUrl}
      </a>
    </div>
  )
}

export default QRCodeDisplay

