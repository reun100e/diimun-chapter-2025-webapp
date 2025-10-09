import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  CreditCard, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Phone, 
  Mail,
  Calendar,
  MapPin,
  Camera,
  Laptop,
  PenTool,
  Shield,
  Info
} from 'lucide-react'
import { REGISTRATION_REQUIREMENTS, EVENT_SCHEDULE, CONTACT_INFO } from '../../utils/content'

const RegistrationGuide = () => {
  // Auto-scroll down when page loads with 2-second delay (310px on desktop, 360px on mobile)
  useEffect(() => {
    const timer = setTimeout(() => {
      const scrollDistance = window.innerWidth >= 768 ? 200 : 220
      window.scrollTo({
        top: scrollDistance,
        behavior: 'smooth'
      })
    }, 2000) // 2-second delay
    
    return () => clearTimeout(timer)
  }, [])


  const steps = [
    {
      number: 1,
      title: "Choose Your Role",
      description: "Select between Delegate or International Press Corps participation",
      icon: <Users className="w-6 h-6" />,
      details: [
        "Delegate: Participate in WHO Committee or Great Assembly of Homoeopaths",
        "International Press: Cover the event with journalism and photography"
      ]
    },
    {
      number: 2,
      title: "Select Committee",
      description: "Choose your preferred committee (for delegates) or IP role",
      icon: <FileText className="w-6 h-6" />,
      details: [
        "WHO Committee: Global health policy discussions",
        "Great Assembly: Homoeopathic medicine and research",
        "IP - Photography: Event photography and coverage",
        "IP - Essay: Written articles and reporting"
      ]
    },
    {
      number: 3,
      title: "Fill Personal Details",
      description: "Provide your personal information and academic details",
      icon: <PenTool className="w-6 h-6" />,
      details: [
        "Full name, email, and WhatsApp number",
        "College/institution name and year of study",
        "Valid contact information for communication"
      ]
    },
    {
      number: 4,
      title: "Make Payment",
      description: "Complete payment through UPI or other methods",
      icon: <CreditCard className="w-6 h-6" />,
      details: [
        "MUN Only: ₹499 per person",
        "MUN + Esperanza: ₹347 per person (with Esperanza registration)",
        "UPI ID: aghoshbprasad100@okaxis"
      ]
    },
    {
      number: 5,
      title: "Upload Screenshots",
      description: "Upload payment confirmation screenshots",
      icon: <Camera className="w-6 h-6" />,
      details: [
        "MUN payment screenshot (required)",
        "Esperanza payment screenshot (if applicable)",
        "Clear, readable images for verification"
      ]
    },
    {
      number: 6,
      title: "Confirmation",
      description: "Receive confirmation and event details",
      icon: <CheckCircle className="w-6 h-6" />,
      details: [
        "Email confirmation within 24-48 hours",
        "Committee assignments and event details",
        "Access to free communication workshop"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Registration Guide
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Step-by-step guide to register for DIIMUN 2025 and prepare for the event
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-16">
        {/* Registration Steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Registration Process
          </h2>
          
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-start gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {step.number}
                  </div>
                </div>
                
                <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Required Documents */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Required Documents & Items
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                For All Delegates
              </h3>
              <ul className="space-y-3">
                {REGISTRATION_REQUIREMENTS.mandatory.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Laptop className="w-5 h-5" />
                For International Press Corps
              </h3>
              <ul className="space-y-3">
                {REGISTRATION_REQUIREMENTS.ipc.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Payment Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Payment Information
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Methods
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">UPI Payment (Recommended)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">UPI ID: aghoshbprasad100@okaxis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Other payment methods available</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Payment Amounts
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">MUN Only: ₹499 per person</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">MUN + Esperanza: ₹347 per person</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Includes participation, food, and refreshments</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Important Deadlines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6" />
              Important Deadlines
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-700 mb-3">Registration Deadlines:</h4>
                <ul className="space-y-2 text-red-600">
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Registration closes: {EVENT_SCHEDULE.registrationDeadline}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Committee changes: {EVENT_SCHEDULE.committeeChangeDeadline}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>No refunds after: {EVENT_SCHEDULE.registrationDeadline}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 mb-3">Event Day:</h4>
                <ul className="space-y-2 text-red-600">
                  <li className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Registration: {REGISTRATION_REQUIREMENTS.reporting.time}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Venue: {EVENT_SCHEDULE.venue}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    <span>Late arrivals may not be permitted entry</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Troubleshooting */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Troubleshooting
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Common Issues
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Payment screenshot not clear - resubmit with better quality</span>
                </li>
                <li className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Committee preference not available - contact organizers</span>
                </li>
                <li className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Registration confirmation delayed - check spam folder</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Solutions
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Contact organizers immediately for assistance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Keep payment receipts and screenshots safe</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-600 text-sm">Check email regularly for updates</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Help with Registration?</h3>
            <p className="text-green-100 mb-6">
              Contact our organizing committee for any assistance with the registration process.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                href={`mailto:${CONTACT_INFO.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                <span className="font-medium">{CONTACT_INFO.email}</span>
              </motion.a>
              <motion.a
                href={`tel:${CONTACT_INFO.phone}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                <span className="font-medium">{CONTACT_INFO.phone}</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default RegistrationGuide
