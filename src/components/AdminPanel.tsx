import { useState, useEffect } from 'react'
import QRCodeDisplay from './QRCodeDisplay'

/**
 * Admin Panel Component
 * This can be shown on a separate admin page or as a component
 * for viewing QR code and form URL
 */
const AdminPanel = () => {
  const [formUrl, setFormUrl] = useState('')

  useEffect(() => {
    // Get the current form URL
    setFormUrl(window.location.origin)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            管理者パネル / Admin Panel
          </h1>

          <div className="space-y-8">
            {/* QR Code Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                QRコード / QR Code
              </h2>
              <div className="flex justify-center">
                <QRCodeDisplay formUrl={formUrl} size={300} />
              </div>
            </section>

            {/* Form URL Section */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                フォームURL / Form URL
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <input
                  type="text"
                  value={formUrl}
                  readOnly
                  className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md font-mono text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(formUrl)
                    alert('URLをコピーしました / URL copied to clipboard')
                  }}
                  className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  コピー / Copy
                </button>
              </div>
            </section>

            {/* Instructions */}
            <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                使用方法 / How to Use
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>QRコードを印刷するか、画面に表示します / Print or display the QR code</li>
                <li>学生にQRコードをスキャンしてもらいます / Students scan the QR code</li>
                <li>フォームにアクセスして情報を入力してもらいます / They access the form and enter their information</li>
                <li>データは自動的にGoogleスプレッドシートに保存されます / Data is automatically saved to Google Sheets</li>
                <li>確認メールが自動送信されます / Confirmation email is automatically sent</li>
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel

