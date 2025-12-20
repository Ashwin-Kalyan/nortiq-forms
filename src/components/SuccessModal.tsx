interface SuccessModalProps {
  onClose: () => void
  data: {
    fullName: string
    email: string
    [key: string]: any
  }
}

const SuccessModal = ({ onClose, data }: SuccessModalProps) => {
  return (
    <div 
      className="modal fade show d-block" 
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      onClick={onClose}
      tabIndex={-1}
    >
      <div 
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title w-100 text-center">
              送信完了 / Registration Complete
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* Success Icon */}
            <div className="text-center mb-4">
              <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                <svg
                  className="text-success"
                  width="32"
                  height="32"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Thank you message */}
            <div className="alert alert-info">
              <p className="mb-2">
                <strong>{data.fullName}</strong> 様
              </p>
              <p className="mb-2">
                この度は、展示会来訪者入力フォームにご登録いただき、誠にありがとうございます。
              </p>
              <p className="mb-2">
                ご入力いただいた内容を確認させていただきました。後日、担当者よりご連絡させていただきますので、今しばらくお待ちください。
              </p>
              <hr className="my-3" />
              <p className="mb-2">
                Dear <strong>{data.fullName}</strong>,
              </p>
              <p className="mb-2">
                Thank you for registering through our Job Fair Visitor Registration Form.
              </p>
              <p className="mb-0">
                We have received your information and will review it carefully. Our team will contact you in the near future.
              </p>
            </div>

            {/* Email notification */}
            <div className="alert alert-warning">
              <p className="mb-0 small">
                <strong>確認メール / Confirmation Email:</strong>
                <br />
                登録されたメールアドレス（<strong>{data.email}</strong>）に確認メールが送信されます。
                <br />
                <span className="text-muted">
                  A confirmation email has been sent to your registered email address.
                </span>
              </p>
            </div>
          </div>
          <div className="modal-footer border-0 justify-content-center">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClose}
            >
              閉じる / Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
