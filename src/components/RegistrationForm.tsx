import { useState, FormEvent } from 'react'

interface FormData {
  firstName: string
  lastName: string
  furigana: string
  university: string
  universityOther: string
  faculty: string
  facultyOther: string
  academicYear: string
  email: string
  interests: string[]
  comments: string
}

interface RegistrationFormProps {
  onSubmit: (data: any) => void
}

const RegistrationForm = ({ onSubmit }: RegistrationFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    furigana: '',
    university: '',
    universityOther: '',
    faculty: '',
    facultyOther: '',
    academicYear: '',
    email: '',
    interests: [],
    comments: '',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const currentInterests = prev.interests || []
      if (currentInterests.includes(interest)) {
        return { ...prev, interests: currentInterests.filter(i => i !== interest) }
      } else {
        return { ...prev, interests: [...currentInterests, interest] }
      }
    })
    if (errors.interests) {
      setErrors(prev => ({ ...prev, interests: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required'
    }
    if (!formData.furigana.trim()) {
      newErrors.furigana = 'Furigana is required'
    }
    if (!formData.university && !formData.universityOther.trim()) {
      newErrors.university = 'University is required'
    }
    if (!formData.faculty && !formData.facultyOther.trim()) {
      newErrors.faculty = 'Faculty is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Valid email is required'
    }
    if (!formData.interests || formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        const submissionData = {
          fullName: `${formData.firstName} ${formData.lastName}`,
          furigana: formData.furigana,
          university: formData.university === 'other' ? formData.universityOther : formData.university,
          faculty: formData.faculty === 'other' ? formData.facultyOther : formData.faculty,
          academicYear: formData.academicYear,
          email: formData.email,
          interests: formData.interests,
          comments: formData.comments,
        }
        await onSubmit(submissionData)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const facultyOptions = [
    'Engineering / 工学部',
    'Computer Science / コンピュータサイエンス',
    'Business / 経営学部',
    'Economics / 経済学部',
    'Science / 理学部',
    'Arts / 文学部',
    'Law / 法学部',
    'Medicine / 医学部',
    'other',
  ]

  return (
    <div>
      {/* Title */}
      <h2 className="text-center mb-4 mb-md-5 fw-bold" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
        展示会来訪者入力フォーム
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Full Name - Two fields side by side */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold">
            Full Name
          </label>
          <div className="row g-3">
            <div className="col-12 col-sm-6">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                placeholder="First Name"
              />
              <div className="form-text">First Name</div>
              {errors.firstName && (
                <div className="invalid-feedback">{errors.firstName}</div>
              )}
            </div>
            <div className="col-12 col-sm-6">
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                placeholder="Last Name"
              />
              <div className="form-text">Last Name</div>
              {errors.lastName && (
                <div className="invalid-feedback">{errors.lastName}</div>
              )}
            </div>
          </div>
        </div>

        {/* Furigana */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold">
            Furigana / ふりがな
          </label>
          <input
            type="text"
            value={formData.furigana}
            onChange={(e) => handleChange('furigana', e.target.value)}
            className={`form-control ${errors.furigana ? 'is-invalid' : ''}`}
            placeholder="Furigana"
          />
          {errors.furigana && (
            <div className="invalid-feedback">{errors.furigana}</div>
          )}
        </div>

        {/* University - Dropdown with "If Other" field to the RIGHT */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold">
            University
          </label>
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <select
                value={formData.university}
                onChange={(e) => handleChange('university', e.target.value)}
                className={`form-select ${errors.university ? 'is-invalid' : ''}`}
              >
                <option value="">Please Select</option>
                <option value="tni">Thai-Nichi Institute of Technology (TNI)</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="col-12 col-md-6">
              <input
                type="text"
                value={formData.universityOther}
                onChange={(e) => handleChange('universityOther', e.target.value)}
                className="form-control"
                placeholder="If Other - Please Specify"
              />
              <div className="form-text">If Other - Please Specify</div>
            </div>
          </div>
          {errors.university && (
            <div className="text-danger small mt-1">{errors.university}</div>
          )}
        </div>

        {/* Faculty - Dropdown with "If Other" field to the RIGHT */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold">
            Faculty
          </label>
          <div className="row g-2">
            <div className="col-12 col-md-6">
              <select
                value={formData.faculty}
                onChange={(e) => handleChange('faculty', e.target.value)}
                className={`form-select ${errors.faculty ? 'is-invalid' : ''}`}
              >
                <option value="">Please Select</option>
                {facultyOptions.map((faculty, index) => (
                  <option key={index} value={faculty}>
                    {faculty === 'other' ? 'Other' : faculty}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-12 col-md-6">
              <input
                type="text"
                value={formData.facultyOther}
                onChange={(e) => handleChange('facultyOther', e.target.value)}
                className="form-control"
                placeholder="If Other - Please Specify"
              />
              <div className="form-text">If Other - Please Specify</div>
            </div>
          </div>
          {errors.faculty && (
            <div className="text-danger small mt-1">{errors.faculty}</div>
          )}
        </div>

        {/* Academic Year of PhD */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold">
            Academic year of PhD
          </label>
          <div className="w-50">
            <select
              value={formData.academicYear}
              onChange={(e) => handleChange('academicYear', e.target.value)}
              className="form-select"
            >
              <option value="">Please Select</option>
              <option value="year1">Year 1</option>
              <option value="year2">Year 2</option>
              <option value="year3">Year 3</option>
              <option value="year4">Year 4</option>
              <option value="year5+">Year 5+</option>
            </select>
          </div>
        </div>

        {/* Email */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            placeholder="example@email.com"
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Interests */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold">
            What are you interested in? / どのようなことに興味がありますか？
          </label>
          <div className="d-flex flex-column gap-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.interests.includes('Full-time Employment / 正社員')}
                onChange={() => handleInterestToggle('Full-time Employment / 正社員')}
                id="interest-ft"
              />
              <label className="form-check-label" htmlFor="interest-ft">
                Full-time Employment / 正社員
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.interests.includes('Part-time Job / アルバイト')}
                onChange={() => handleInterestToggle('Part-time Job / アルバイト')}
                id="interest-pt"
              />
              <label className="form-check-label" htmlFor="interest-pt">
                Part-time Job / アルバイト
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.interests.includes('Internship / インターンシップ')}
                onChange={() => handleInterestToggle('Internship / インターンシップ')}
                id="interest-int"
              />
              <label className="form-check-label" htmlFor="interest-int">
                Internship / インターンシップ
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.interests.includes('Career Consultation / キャリア相談')}
                onChange={() => handleInterestToggle('Career Consultation / キャリア相談')}
                id="interest-cc"
              />
              <label className="form-check-label" htmlFor="interest-cc">
                Career Consultation / キャリア相談
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.interests.includes('Company Information / 会社情報')}
                onChange={() => handleInterestToggle('Company Information / 会社情報')}
                id="interest-ci"
              />
              <label className="form-check-label" htmlFor="interest-ci">
                Company Information / 会社情報
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={formData.interests.includes('Other / その他')}
                onChange={() => handleInterestToggle('Other / その他')}
                id="interest-other"
              />
              <label className="form-check-label" htmlFor="interest-other">
                Other / その他
              </label>
            </div>
          </div>
          {errors.interests && (
            <div className="text-danger small mt-2">{errors.interests}</div>
          )}
        </div>

        {/* Optional Comments */}
        <div className="mb-3 mb-md-4">
          <label className="form-label fw-semibold">
            Optional Comments / その他・ご質問
          </label>
          <textarea
            value={formData.comments}
            onChange={(e) => handleChange('comments', e.target.value)}
            rows={4}
            maxLength={500}
            className="form-control"
            placeholder="Please enter any requests or comments"
          />
          <div className="form-text text-end">
            {formData.comments.length}/500
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-100"
          >
            {isSubmitting ? 'Submitting...' : 'Submit / 送信'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default RegistrationForm
