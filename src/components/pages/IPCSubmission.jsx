import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  FileText, 
  Image as ImageIcon,
  Shield,
  X,
  ArrowLeft,
  Clock
} from 'lucide-react'
import { supabase } from '../../supabaseClient'

// Portal timing constants (November 4, 2025)
const PORTAL_OPEN_DATE = new Date('2025-11-04T12:00:00+05:30') // 12pm IST on Nov 4, 2025
const PORTAL_CLOSE_DATE = new Date('2025-11-04T16:00:00+05:30') // 4pm IST on Nov 4, 2025

const IPCSubmission = () => {
  // State management
  const [currentStep, setCurrentStep] = useState('code-entry') // 'code-entry', 'submission-form', 'success'
  const [ipcCode, setIpcCode] = useState('')
  const [submissionType, setSubmissionType] = useState(null) // 'photography' or 'essay'
  const [isValidating, setIsValidating] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [validationError, setValidationError] = useState('')
  
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [portalStatus, setPortalStatus] = useState('before-open') // 'before-open', 'open', 'closed'
  
  // Photo submission state
  const [photo1, setPhoto1] = useState(null)
  const [photo1Preview, setPhoto1Preview] = useState(null)
  const [description1, setDescription1] = useState('')
  const [photo2, setPhoto2] = useState(null)
  const [photo2Preview, setPhoto2Preview] = useState(null)
  const [description2, setDescription2] = useState('')
  
  // Essay submission state
  const [essayPdf, setEssayPdf] = useState(null)

  // Upload progress state
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadingFile, setUploadingFile] = useState('') // Current file being uploaded

  // Validation constants
  const MAX_PHOTO_SIZE = 10 * 1024 * 1024 // 10MB
  const MAX_PDF_SIZE = 5 * 1024 * 1024 // 5MB
  const MAX_CAPTION_LENGTH = 250 // Maximum characters for photo captions
  const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif']
  const ALLOWED_PDF_TYPE = 'application/pdf'

  // Countdown timer effect
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const openTime = PORTAL_OPEN_DATE.getTime()
      const closeTime = PORTAL_CLOSE_DATE.getTime()

      if (now < openTime) {
        // Before portal opens - countdown to opening
        setPortalStatus('before-open')
        const difference = openTime - now
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        setTimeLeft({ days, hours, minutes, seconds })
      } else if (now >= openTime && now < closeTime) {
        // Portal is open - countdown to closing
        setPortalStatus('open')
        const difference = closeTime - now
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        // Portal is closed
        setPortalStatus('closed')
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [])

  // Scroll to show navbar on page load
  useEffect(() => {
    window.scrollTo({
      top: 200,
      behavior: 'smooth'
    })
  }, [])

  // Scroll to show navbar when success message appears
  useEffect(() => {
    if (currentStep === 'success') {
      window.scrollTo({
        top: 200,
        behavior: 'smooth'
      })
    }
  }, [currentStep])

  // Helper function to validate file type and size
  const validateFile = (file, type) => {
    if (type === 'image') {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
        return 'Please upload a JPG, PNG, or HEIC image file'
      }
      if (file.size > MAX_PHOTO_SIZE) {
        return 'Image size must be less than 10MB'
      }
    } else if (type === 'pdf') {
      if (file.type !== ALLOWED_PDF_TYPE) {
        return 'Please upload a PDF file only'
      }
      if (file.size > MAX_PDF_SIZE) {
        return 'PDF size must be less than 5MB'
      }
    }
    return null
  }

  // Handle IPC code verification
  const handleCodeVerification = async (e) => {
    e.preventDefault()
    
    // Check if portal is open
    if (portalStatus !== 'open') {
      if (portalStatus === 'before-open') {
        setValidationError('The submission portal is not yet open. Please wait until 12:00 PM on November 4th, 2025.')
      } else {
        setValidationError('The submission portal has closed. Submissions were only accepted between 12:00 PM and 4:00 PM on November 4th, 2025.')
      }
      return
    }
    
    setValidationError('')
    setIsValidating(true)

    try {
      // Check if code exists and is valid
      const { data: codeData, error: codeError } = await supabase
        .from('ipc_codes')
        .select('category, is_used')
        .eq('ipc_code', ipcCode.trim())
        .single()

      if (codeError || !codeData) {
        setValidationError('Invalid IPC Code. Please check the code provided to you on the event day.')
        setIsValidating(false)
        return
      }

      if (codeData.is_used) {
        setValidationError('This IPC Code has already been used for a submission.')
        setIsValidating(false)
        return
      }

      // Valid code - proceed to submission form
      setSubmissionType(codeData.category)
      setCurrentStep('submission-form')
      setIsValidating(false)
    } catch (err) {
      console.error('Validation error:', err)
      setValidationError('An error occurred. Please try again.')
      setIsValidating(false)
    }
  }

  // Handle photo file selection
  const handlePhotoChange = (fileNumber, e) => {
    const file = e.target.files[0]
    if (!file) return

    const error = validateFile(file, 'image')
    if (error) {
      setError(error)
      return
    }

    setError('')
    
    if (fileNumber === 1) {
      setPhoto1(file)
      const reader = new FileReader()
      reader.onloadend = () => setPhoto1Preview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setPhoto2(file)
      const reader = new FileReader()
      reader.onloadend = () => setPhoto2Preview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  // Handle PDF file selection
  const handlePdfChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const error = validateFile(file, 'pdf')
    if (error) {
      setError(error)
      return
    }

    setError('')
    setEssayPdf(file)
  }

  // Upload file to Supabase storage with progress tracking
  const uploadFileToStorage = async (file, fileName, fileLabel) => {
    setUploadingFile(fileLabel)
    setUploadProgress(0)

    // Simulate progress for better UX (Supabase doesn't provide native upload progress)
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 100)

    try {
      const { data, error } = await supabase.storage
        .from('ipc-submissions')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      clearInterval(progressInterval)

      if (error) throw error

      // Set to 100% after successful upload
      setUploadProgress(100)

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('ipc-submissions')
        .getPublicUrl(fileName)

      return publicUrl
    } catch (error) {
      clearInterval(progressInterval)
      throw error
    }
  }

  // Handle photo submission
  const handlePhotoSubmission = async (e) => {
    e.preventDefault()
    
    if (!photo1) {
      setError('Please upload at least one photo')
      return
    }

    if (!description1 || description1.trim() === '') {
      setError('Please provide a caption for Photo 1')
      return
    }

    if (photo2 && (!description2 || description2.trim() === '')) {
      setError('Please provide a caption for Photo 2')
      return
    }

    // Check if portal is still open
    if (portalStatus !== 'open') {
      setError('The submission portal has closed. Please try again during the submission window.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Upload photos to storage with progress tracking
      const timestamp = Date.now()
      const file1Ext = photo1.name.split('.').pop()
      const fileName1 = `photo_${ipcCode}_${timestamp}_1.${file1Ext}`
      const fileUrl1 = await uploadFileToStorage(photo1, fileName1, 'Photo 1')

      let fileUrl2 = null
      if (photo2) {
        const file2Ext = photo2.name.split('.').pop()
        const fileName2 = `photo_${ipcCode}_${timestamp}_2.${file2Ext}`
        fileUrl2 = await uploadFileToStorage(photo2, fileName2, 'Photo 2')
      }

      // Insert submission record (this triggers the webhook)
      const { error: insertError } = await supabase
        .from('ipc_submissions')
        .insert({
          ipc_code: ipcCode.trim(),
          submission_type: 'photography',
          file_url_1: fileUrl1,
          description_1: description1.trim(),
          file_url_2: fileUrl2,
          description_2: description2.trim(),
          status: 'submitted'
        })

      if (insertError) throw insertError

      // Mark code as used
      await supabase
        .from('ipc_codes')
        .update({ is_used: true })
        .eq('ipc_code', ipcCode.trim())

      setCurrentStep('success')
      setIsSubmitting(false)
    } catch (err) {
      console.error('Submission error:', err)
      setError('An error occurred during submission. Please try again.')
      setIsSubmitting(false)
    }
  }

  // Handle essay submission
  const handleEssaySubmission = async (e) => {
    e.preventDefault()
    
    if (!essayPdf) {
      setError('Please upload your essay PDF')
      return
    }

    // Check if portal is still open
    if (portalStatus !== 'open') {
      setError('The submission portal has closed. Please try again during the submission window.')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      // Upload PDF to storage with progress tracking
      const timestamp = Date.now()
      const fileName = `essay_${ipcCode}_${timestamp}.pdf`
      const fileUrl = await uploadFileToStorage(essayPdf, fileName, 'Essay PDF')

      // Insert submission record (this triggers the webhook)
      const { error: insertError } = await supabase
        .from('ipc_submissions')
        .insert({
          ipc_code: ipcCode.trim(),
          submission_type: 'essay',
          file_url_pdf: fileUrl,
          status: 'submitted'
        })

      if (insertError) throw insertError

      // Mark code as used
      await supabase
        .from('ipc_codes')
        .update({ is_used: true })
        .eq('ipc_code', ipcCode.trim())

      setCurrentStep('success')
      setIsSubmitting(false)
    } catch (err) {
      console.error('Submission error:', err)
      setError('An error occurred during submission. Please try again.')
      setIsSubmitting(false)
    }
  }

  // Remove photo
  const removePhoto = (photoNumber) => {
    if (photoNumber === 1) {
      setPhoto1(null)
      setPhoto1Preview(null)
      setDescription1('')
    } else {
      setPhoto2(null)
      setPhoto2Preview(null)
      setDescription2('')
    }
  }

  // Reset form
  const resetForm = () => {
    setCurrentStep('code-entry')
    setIpcCode('')
    setSubmissionType(null)
    setError('')
    setValidationError('')
    setPhoto1(null)
    setPhoto1Preview(null)
    setDescription1('')
    setPhoto2(null)
    setPhoto2Preview(null)
    setDescription2('')
    setEssayPdf(null)
    setUploadProgress(0)
    setUploadingFile('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-24 pb-16">
      <div className="container-custom max-w-4xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-2 rounded-full mb-6">
            <Shield className="w-5 h-5" />
            <span className="font-semibold text-sm tracking-wide">SECURE SUBMISSION PORTAL</span>
          </div>
          <h1 className="heading-display text-4xl md:text-5xl lg:text-6xl gradient-text mb-4">
            International Press Corps
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Submit your entries for evaluation
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="card p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  portalStatus === 'open' 
                    ? 'bg-emerald-100 text-emerald-600' 
                    : portalStatus === 'before-open'
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-sm font-semibold ${
                    portalStatus === 'open'
                      ? 'text-emerald-700'
                      : portalStatus === 'before-open'
                      ? 'text-blue-700'
                      : 'text-red-700'
                  }`}>
                    {portalStatus === 'open' 
                      ? 'Portal Closes In'
                      : portalStatus === 'before-open'
                      ? 'Portal Opens In'
                      : 'Portal Closed'}
                  </p>
                  <p className="text-xs text-slate-500">
                    {portalStatus === 'open'
                      ? 'Submissions close at 4:00 PM'
                      : portalStatus === 'before-open'
                      ? 'Submissions open at 12:00 PM on Nov 4'
                      : 'Submission window has ended'}
                  </p>
                </div>
              </div>
              
              {portalStatus !== 'closed' && (
                <div className="flex items-center gap-3 md:gap-4">
                  {timeLeft.days > 0 && (
                    <div className="text-center">
                      <div className="text-2xl md:text-3xl font-bold text-slate-800 tabular-nums">
                        {timeLeft.days.toString().padStart(2, '0')}
                      </div>
                      <div className="text-xs text-slate-500 font-medium">Days</div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-slate-800 tabular-nums">
                      {timeLeft.hours.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">Hours</div>
                  </div>
                  <div className="text-slate-400 text-xl font-bold">:</div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-slate-800 tabular-nums">
                      {timeLeft.minutes.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">Minutes</div>
                  </div>
                  <div className="text-slate-400 text-xl font-bold">:</div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-slate-800 tabular-nums">
                      {timeLeft.seconds.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">Seconds</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Step 1: Code Entry */}
          {currentStep === 'code-entry' && (
            <motion.div
              key="code-entry"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="card p-8 md:p-12"
            >
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-3">
                  Enter Your IPC Code
                </h2>
                <p className="text-slate-600">
                  Please enter the unique IPC Code provided to you
                </p>
              </div>

              <form onSubmit={handleCodeVerification} className="max-w-md mx-auto">
                <div className="mb-6">
                  <input
                    type="text"
                    value={ipcCode}
                    onChange={(e) => {
                      setIpcCode(e.target.value)
                      setValidationError('')
                    }}
                    placeholder={portalStatus === 'open' ? "Enter your IPC Code" : portalStatus === 'before-open' ? "Portal not yet open" : "Portal closed"}
                    className={`w-full px-6 py-4 text-lg border-2 rounded-xl transition-all duration-300 text-center font-semibold tracking-wider ${
                      portalStatus === 'open'
                        ? 'border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100'
                        : 'border-slate-300 bg-slate-100 cursor-not-allowed opacity-60'
                    }`}
                    disabled={isValidating || portalStatus !== 'open'}
                    required
                  />
                </div>

                {validationError && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3"
                  >
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-700 text-sm">{validationError}</p>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isValidating || !ipcCode.trim() || portalStatus !== 'open'}
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                >
                  {isValidating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : portalStatus !== 'open' ? (
                    portalStatus === 'before-open' ? 'Portal Not Yet Open' : 'Portal Closed'
                  ) : (
                    'Verify Code & Proceed'
                  )}
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 2: Submission Form */}
          {currentStep === 'submission-form' && (
            <motion.div
              key="submission-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Header with IPC Code */}
              <div className="card p-6 mb-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Submission for</p>
                    <h3 className="text-2xl font-bold text-slate-800">
                      IPC Code: <span className="text-indigo-600">{ipcCode}</span>
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 capitalize">
                      Category: {submissionType === 'photography' ? 'Photography' : 'Essay'}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Countdown on submission form */}
                    {portalStatus === 'open' && (
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-semibold text-emerald-700 tabular-nums">
                          {timeLeft.hours}h {timeLeft.minutes}m left
                        </span>
                      </div>
                    )}
                    <button
                      onClick={resetForm}
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      <span className="hidden sm:inline">Change Code</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Anonymity Warning - Subtle Version */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-amber-50/50 border border-amber-200 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <p className="text-amber-900 text-xs">
                    <strong>Note:</strong> Do not include your name or any identifying information in {submissionType === 'photography' ? 'photos/captions' : 'PDF/filename'}.
                  </p>
                </div>
              </motion.div>

              {/* Photography Form */}
              {submissionType === 'photography' && (
                <form onSubmit={handlePhotoSubmission} className="space-y-6">
                  {/* Photo 1 */}
                  <div className="card p-6">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-indigo-600" />
                      Photo 1 <span className="text-red-500">*</span>
                    </h4>
                    
                    {!photo1Preview ? (
                      <label className="block cursor-pointer">
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-300 text-center">
                          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                          <p className="text-slate-600 font-medium mb-2">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-sm text-slate-500">
                            JPG, PNG, or HEIC (Max 10MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.heic,.heif"
                          onChange={(e) => handlePhotoChange(1, e)}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="relative">
                        <img
                          src={photo1Preview}
                          alt="Photo 1 Preview"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(1)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}

                    {photo1 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-slate-700">
                            Caption <span className="text-red-500">*</span>
                          </label>
                          <span className={`text-xs font-medium ${
                            description1.length > MAX_CAPTION_LENGTH 
                              ? 'text-red-600' 
                              : description1.length > MAX_CAPTION_LENGTH * 0.9 
                                ? 'text-amber-600' 
                                : 'text-slate-500'
                          }`}>
                            {description1.length}/{MAX_CAPTION_LENGTH}
                          </span>
                        </div>
                        <textarea
                          value={description1}
                          onChange={(e) => {
                            if (e.target.value.length <= MAX_CAPTION_LENGTH) {
                              setDescription1(e.target.value)
                            }
                          }}
                          placeholder="Enter a journalistic caption for Photo 1... (Required)"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                          rows="3"
                          required
                        />
                      </div>
                    )}
                  </div>

                  {/* Photo 2 */}
                  <div className="card p-6">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-indigo-600" />
                      Photo 2 (Optional)
                    </h4>
                    
                    {!photo2Preview ? (
                      <label className="block cursor-pointer">
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-300 text-center">
                          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                          <p className="text-slate-600 font-medium mb-2">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-sm text-slate-500">
                            JPG, PNG, or HEIC (Max 10MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.heic,.heif"
                          onChange={(e) => handlePhotoChange(2, e)}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="relative">
                        <img
                          src={photo2Preview}
                          alt="Photo 2 Preview"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(2)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    )}

                    {photo2 && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-slate-700">
                            Caption <span className="text-red-500">*</span>
                          </label>
                          <span className={`text-xs font-medium ${
                            description2.length > MAX_CAPTION_LENGTH 
                              ? 'text-red-600' 
                              : description2.length > MAX_CAPTION_LENGTH * 0.9 
                                ? 'text-amber-600' 
                                : 'text-slate-500'
                          }`}>
                            {description2.length}/{MAX_CAPTION_LENGTH}
                          </span>
                        </div>
                        <textarea
                          value={description2}
                          onChange={(e) => {
                            if (e.target.value.length <= MAX_CAPTION_LENGTH) {
                              setDescription2(e.target.value)
                            }
                          }}
                          placeholder="Enter a journalistic caption for Photo 2... (Required)"
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none"
                          rows="3"
                          required
                        />
                      </div>
                    )}
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700 text-sm">{error}</p>
                    </motion.div>
                  )}

                  {/* Upload Progress Bar */}
                  {isSubmitting && uploadProgress > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 font-medium">
                          Uploading {uploadingFile}...
                        </span>
                        <span className="text-indigo-600 font-bold">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.3 }}
                          className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-full relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !photo1 || portalStatus !== 'open'}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {uploadProgress === 100 ? 'Processing...' : 'Uploading...'}
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Submit Photos
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Essay Form */}
              {submissionType === 'essay' && (
                <form onSubmit={handleEssaySubmission} className="space-y-6">
                  <div className="card p-6">
                    <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5 text-indigo-600" />
                      Upload Essay (PDF) <span className="text-red-500">*</span>
                    </h4>

                    {/* Formatting Requirements */}
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                      <p className="font-semibold text-blue-900 mb-2">Formatting Requirements:</p>
                      <ul className="space-y-1 text-sm text-blue-800">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          PDF Format Only
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          500-700 Word Limit
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          Font: Times New Roman, Size 12
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-blue-600" />
                          Line Spacing: 1.15
                        </li>
                      </ul>
                    </div>

                    {!essayPdf ? (
                      <label className="block cursor-pointer">
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all duration-300 text-center">
                          <Upload className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                          <p className="text-slate-600 font-medium mb-2 text-lg">
                            Click to upload your essay
                          </p>
                          <p className="text-sm text-slate-500">
                            PDF only (Max 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handlePdfChange}
                          className="hidden"
                        />
                      </label>
                    ) : (
                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-8 h-8 text-green-600" />
                          <div>
                            <p className="font-medium text-green-900">{essayPdf.name}</p>
                            <p className="text-sm text-green-700">
                              {(essayPdf.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEssayPdf(null)}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                    )}
                  </div>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-red-700 text-sm">{error}</p>
                    </motion.div>
                  )}

                  {/* Upload Progress Bar */}
                  {isSubmitting && uploadProgress > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 font-medium">
                          Uploading {uploadingFile}...
                        </span>
                        <span className="text-indigo-600 font-bold">{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.3 }}
                          className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-full relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !essayPdf || portalStatus !== 'open'}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {uploadProgress === 100 ? 'Processing...' : 'Uploading...'}
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-5 h-5" />
                        Submit Your Essay
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          )}

          {/* Step 3: Success */}
          {currentStep === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Submission Successful!
              </h2>
              
              <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
                Your {submissionType === 'photography' ? 'photos have' : 'essay has'} been received for IPC Code <span className="font-bold text-indigo-600">{ipcCode}</span>. 
                Thank you for participating in the International Press Corps!
              </p>

              <div className="p-6 bg-blue-50 rounded-xl mb-8 max-w-lg mx-auto">
                <p className="text-sm text-blue-800">
                  Your submission will be evaluated by our expert panel. Results will be announced during the awards ceremony.
                </p>
              </div>

              <button
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Return to Home
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default IPCSubmission

