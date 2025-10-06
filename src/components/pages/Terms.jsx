import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Calendar, 
  CreditCard, 
  Users, 
  Shield, 
  Phone, 
  Mail,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react'

const Terms = () => {
  const termsSections = [
    {
      id: 'registration',
      title: 'Registration Terms',
      icon: <Users className="w-6 h-6" />,
      content: [
        {
          title: 'Registration Deadline',
          description: 'October 25th, 2025',
          type: 'deadline'
        },
        {
          title: 'No Late Registrations',
          description: 'Registrations after the deadline will not be accepted under any circumstances.',
          type: 'warning'
        },
        {
          title: 'Team Changes',
          description: 'No changes in committee and teams after October 29th, 2025.',
          type: 'info'
        },
        {
          title: 'Individual Registration',
          description: 'Each team member must register separately. Team details will be collected later.',
          type: 'info'
        }
      ]
    },
    {
      id: 'payment',
      title: 'Payment Terms',
      icon: <CreditCard className="w-6 h-6" />,
      content: [
        {
          title: 'Registration Fee',
          description: '₹499 (₹347 for Esperanza 4.0 participants)',
          type: 'info'
        },
        {
          title: 'Payment Method',
          description: 'UPI only - aghoshbprasad100@okaxis',
          type: 'info'
        },
        {
          title: 'Refund Policy',
          description: 'No refunds after October 25th, 2025. Refunds before deadline subject to processing fees.',
          type: 'warning'
        },
        {
          title: 'Payment Verification',
          description: '24-48 hours for payment verification. Confirmation email will be sent after verification.',
          type: 'info'
        },
        {
          title: 'Fee Includes',
          description: 'Participation, food, and refreshments only. Travel and accommodation not included.',
          type: 'info'
        }
      ]
    },
    {
      id: 'participation',
      title: 'Event Participation Terms',
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          title: 'Mandatory Attendance',
          description: 'All registered participants must attend the event. Absence without prior notice may result in blacklisting.',
          type: 'warning'
        },
        {
          title: 'Dress Code',
          description: 'Formal Western Business Attire is mandatory. Casual wear will not be permitted.',
          type: 'warning'
        },
        {
          title: 'Conduct',
          description: 'Professional behavior required at all times. Unparliamentary language or disruptive behavior will result in immediate expulsion.',
          type: 'warning'
        },
        {
          title: 'Technology Policy',
          description: 'Devices must be on silent mode. Use for personal entertainment is prohibited.',
          type: 'info'
        },
        {
          title: 'Recording Policy',
          description: 'No unauthorized recording allowed. Violation results in device confiscation and event ban.',
          type: 'warning'
        },
        {
          title: 'Disciplinary Action',
          description: 'Violations may result in expulsion from the event without refund.',
          type: 'warning'
        }
      ]
    },
    {
      id: 'communication',
      title: 'Communication Terms',
      icon: <Mail className="w-6 h-6" />,
      content: [
        {
          title: 'Notification Consent',
          description: 'Agreement to receive emails, WhatsApp messages, and calls from DNA regarding the event.',
          type: 'info'
        },
        {
          title: 'Future Events',
          description: 'Consent to be notified about future DNA events and activities.',
          type: 'info'
        },
        {
          title: 'Voluntary Participation',
          description: 'Participation is voluntary and not forced by any person or institutional body.',
          type: 'info'
        },
        {
          title: 'Rule Compliance',
          description: 'Agreement to follow all rules and decisions by the executive board before, during, and after the event.',
          type: 'info'
        }
      ]
    },
    {
      id: 'liability',
      title: 'Liability Terms',
      icon: <AlertTriangle className="w-6 h-6" />,
      content: [
        {
          title: 'Personal Responsibility',
          description: 'Participants are responsible for their own safety and well-being during the event.',
          type: 'warning'
        },
        {
          title: 'Property Damage',
          description: 'Participants are liable for any property damage caused by their actions.',
          type: 'warning'
        },
        {
          title: 'Medical Emergencies',
          description: 'Organizers are not responsible for medical emergencies. Participants should have appropriate insurance.',
          type: 'warning'
        },
        {
          title: 'Travel',
          description: 'Participants are responsible for their own travel arrangements and safety.',
          type: 'info'
        },
        {
          title: 'Accommodation',
          description: 'Participants are responsible for their own accommodation arrangements.',
          type: 'info'
        }
      ]
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property',
      icon: <FileText className="w-6 h-6" />,
      content: [
        {
          title: 'Content Usage',
          description: 'Organizers may use event photos/videos for promotional purposes without additional consent.',
          type: 'info'
        },
        {
          title: 'Participant Content',
          description: 'Participants retain rights to their own content but grant usage rights to organizers.',
          type: 'info'
        },
        {
          title: 'Committee Materials',
          description: 'All committee materials and resources are proprietary to DNA and cannot be shared externally.',
          type: 'warning'
        }
      ]
    },
    {
      id: 'force-majeure',
      title: 'Force Majeure',
      icon: <AlertTriangle className="w-6 h-6" />,
      content: [
        {
          title: 'Event Cancellation',
          description: 'Organizers reserve the right to cancel the event due to unforeseen circumstances.',
          type: 'warning'
        },
        {
          title: 'Refund Policy',
          description: 'In case of cancellation, refunds will be processed as per the refund policy.',
          type: 'info'
        },
        {
          title: 'Rescheduling',
          description: 'Event may be rescheduled with prior notice. Participants will be informed of new dates.',
          type: 'info'
        }
      ]
    },
    {
      id: 'governing',
      title: 'Governing Law',
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          title: 'Jurisdiction',
          description: 'All disputes are subject to local jurisdiction and Indian law.',
          type: 'info'
        },
        {
          title: 'Legal Compliance',
          description: 'All participants must comply with local laws and regulations.',
          type: 'info'
        },
        {
          title: 'Dispute Resolution',
          description: 'Disputes will be resolved through arbitration in accordance with Indian law.',
          type: 'info'
        }
      ]
    }
  ]

  const getIconForType = (type) => {
    switch (type) {
      case 'deadline':
        return <Calendar className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />
    }
  }

  const getBgColorForType = (type) => {
    switch (type) {
      case 'deadline':
        return 'bg-red-50 border-red-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200'
      case 'info':
        return 'bg-blue-50 border-blue-200'
      default:
        return 'bg-green-50 border-green-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-midnight-100 to-cognac-100 text-midnight-800 px-6 py-3 rounded-full font-semibold mb-6">
            <FileText className="w-6 h-6" />
            Terms & Conditions
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-midnight-800 to-cognac-600 bg-clip-text text-transparent mb-6">
            DIIMUN 2025 Terms & Conditions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Please read these terms and conditions carefully before registering for DIIMUN 2025. 
            By registering, you agree to be bound by these terms.
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-midnight-600 via-cognac-600 to-gold-500 mx-auto rounded-full shadow-glow mt-8"></div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 mb-12"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-red-800 mb-3">Important Notice</h3>
              <p className="text-red-700 leading-relaxed">
                These terms and conditions are legally binding. By completing your registration, 
                you acknowledge that you have read, understood, and agree to be bound by all terms 
                and conditions outlined below. If you do not agree with any part of these terms, 
                please do not proceed with registration.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-12">
          {termsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + sectionIndex * 0.1 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Section Header */}
              <div className="bg-gradient-to-r from-midnight-600 to-cognac-600 px-8 py-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    {section.icon}
                  </div>
                  {section.title}
                </h2>
              </div>

              {/* Section Content */}
              <div className="p-8">
                <div className="grid gap-6">
                  {section.content.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + sectionIndex * 0.1 + itemIndex * 0.05 }}
                      className={`border-2 rounded-2xl p-6 ${getBgColorForType(item.type)}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getIconForType(item.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-gray-700 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-midnight-800 to-cognac-700 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Questions About These Terms?
          </h3>
          <p className="text-lg text-cognac-200 mb-8 max-w-2xl mx-auto">
            If you have any questions about these terms and conditions, please contact us before proceeding with registration.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="tel:+919442308824"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-midnight-800 font-bold py-3 px-8 rounded-full hover:bg-cognac-50 transition-colors duration-300 inline-flex items-center gap-3"
            >
              <Phone className="w-5 h-5" />
              <span>Call Us</span>
            </motion.a>
            <motion.a
              href="mailto:contact@diimun2025.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors duration-300 inline-flex items-center gap-3"
            >
              <Mail className="w-5 h-5" />
              <span>Email Us</span>
            </motion.a>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            Last updated: {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Terms
