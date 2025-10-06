import React from 'react'
import { motion } from 'framer-motion'
import { 
  Shirt, 
  Users, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Info,
  Camera,
  Mic,
  Shield,
  Clock,
  FileText
} from 'lucide-react'

const Guidelines = () => {
  const dressCodeSections = [
    {
      title: 'General Requirements',
      icon: <Shirt className="w-6 h-6" />,
      content: [
        {
          title: 'Formal Western Business Attire is MANDATORY',
          description: 'All participants must adhere to formal dress code standards',
          type: 'mandatory'
        },
        {
          title: 'Professional Grooming Required',
          description: 'Maintain a well-groomed and professional appearance',
          type: 'required'
        },
        {
          title: 'Best Dressed Delegate Recognition',
          description: 'Special recognition and appreciation for best dressed participants',
          type: 'bonus'
        }
      ]
    },
    {
      title: 'Male Delegates',
      icon: <Users className="w-6 h-6" />,
      content: [
        {
          title: 'Full Formal Suit with Tie',
          description: 'Complete formal suit with matching tie and dress shirt',
          type: 'option1'
        },
        {
          title: 'Formal Shirt with Tie',
          description: 'Formal shirt with tie, dress trousers, and formal shoes',
          type: 'option2'
        },
        {
          title: 'Blazer/Coat (Recommended)',
          description: 'Professional blazer or coat for enhanced formal appearance',
          type: 'recommended'
        },
        {
          title: 'Well-Groomed Appearance',
          description: 'Clean, professional grooming and personal hygiene',
          type: 'required'
        }
      ]
    },
    {
      title: 'Female Delegates',
      icon: <Users className="w-6 h-6" />,
      content: [
        {
          title: 'Formal Pantsuit',
          description: 'Professional pantsuit with formal blouse',
          type: 'option1'
        },
        {
          title: 'Formal Business Dress/Skirt Suit',
          description: 'Professional dress or skirt suit with formal blouse',
          type: 'option2'
        },
        {
          title: 'Formal Saree with Formal Blouse',
          description: 'Traditional formal saree with professional blouse',
          type: 'option3'
        },
        {
          title: 'Closed Formal Footwear',
          description: 'Professional closed-toe shoes or formal footwear',
          type: 'required'
        },
        {
          title: 'Professional Grooming',
          description: 'Clean, professional grooming and personal hygiene',
          type: 'required'
        }
      ]
    },
    {
      title: 'Traditional Attire Option',
      icon: <Award className="w-6 h-6" />,
      content: [
        {
          title: 'Country Representation',
          description: 'Traditional formal attire representing your assigned country is permitted',
          type: 'allowed'
        },
        {
          title: 'Formal Standards Maintained',
          description: 'Must maintain formal standards even in traditional attire',
          type: 'required'
        }
      ]
    }
  ]

  const prohibitedItems = [
    'Jeans (any type)',
    'T-shirts or casual shirts',
    'Sneakers or casual footwear',
    'Ethnic casual wear',
    'Shorts or casual pants',
    'Flip-flops or sandals',
    'Casual accessories',
    'Sports or athletic wear',
    'Torn or damaged clothing',
    'Overly casual or revealing attire'
  ]

  const conductRules = [
    {
      title: 'Professional Behavior',
      icon: <Shield className="w-6 h-6" />,
      description: 'Maintain professional conduct at all times during the event',
      type: 'mandatory'
    },
    {
      title: 'Respectful Communication',
      icon: <Mic className="w-6 h-6" />,
      description: 'Use respectful and diplomatic language during debates and discussions',
      type: 'mandatory'
    },
    {
      title: 'Committee Decorum',
      icon: <Users className="w-6 h-6" />,
      description: 'Maintain proper decorum during committee sessions',
      type: 'mandatory'
    },
    {
      title: 'Technology Policy',
      icon: <Camera className="w-6 h-6" />,
      description: 'All devices must be on silent mode during sessions',
      type: 'mandatory'
    },
    {
      title: 'Attendance Requirements',
      icon: <Clock className="w-6 h-6" />,
      description: 'Remain within designated venue during sessions',
      type: 'mandatory'
    },
    {
      title: 'Documentation',
      icon: <FileText className="w-6 h-6" />,
      description: 'Follow all documentation and submission requirements',
      type: 'mandatory'
    }
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'mandatory':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'required':
        return 'bg-orange-50 border-orange-200 text-orange-800'
      case 'recommended':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'allowed':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'bonus':
        return 'bg-purple-50 border-purple-200 text-purple-800'
      case 'option1':
      case 'option2':
      case 'option3':
        return 'bg-gray-50 border-gray-200 text-gray-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'mandatory':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'required':
        return <CheckCircle className="w-5 h-5 text-orange-500" />
      case 'recommended':
        return <Info className="w-5 h-5 text-blue-500" />
      case 'allowed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'bonus':
        return <Award className="w-5 h-5 text-purple-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-gray-500" />
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
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-6 py-3 rounded-full font-semibold mb-6">
            <Shirt className="w-6 h-6" />
            Dress Code & Guidelines
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-midnight-800 to-cognac-600 bg-clip-text text-transparent mb-6">
            DIIMUN 2025 Guidelines
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive dress code requirements and conduct guidelines to ensure a professional and respectful environment for all participants.
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-midnight-600 via-cognac-600 to-gold-500 mx-auto rounded-full shadow-glow mt-8"></div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 mb-16"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-red-800 mb-3">Important Notice</h3>
              <p className="text-red-700 leading-relaxed">
                <strong>Formal Western Business Attire is MANDATORY</strong> for all participants. 
                Casual wear including jeans, t-shirts, sneakers, and ethnic casual wear will NOT be allowed. 
                Please follow the dress code guidelines carefully to ensure entry to the event.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Dress Code Sections */}
        <div className="space-y-12 mb-16">
          {dressCodeSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
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
                      className={`border-2 rounded-2xl p-6 ${getTypeColor(item.type)}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {getTypeIcon(item.type)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold mb-2">
                            {item.title}
                          </h3>
                          <p className="leading-relaxed">
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

        {/* Prohibited Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <XCircle className="w-6 h-6" />
              </div>
              Prohibited Items
            </h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prohibitedItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                  className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4"
                >
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-red-800 font-medium">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Conduct Rules */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              Conduct & Behavior Rules
            </h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {conductRules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className="bg-green-50 border border-green-200 rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      {rule.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-green-800 mb-2">
                        {rule.title}
                      </h3>
                      <p className="text-green-700 leading-relaxed">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Best Dressed Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-2xl p-8 mb-16"
        >
          <div className="flex items-start gap-4">
            <Award className="w-8 h-8 text-purple-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-purple-800 mb-3">Best Dressed Delegate Recognition</h3>
              <p className="text-purple-700 leading-relaxed mb-4">
                We appreciate and recognize participants who go above and beyond in maintaining professional attire. 
                Special recognition will be given to the best dressed delegate during the closing ceremony.
              </p>
              <div className="bg-white border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Recognition Criteria:</h4>
                <ul className="text-purple-700 space-y-1 text-sm">
                  <li>• Adherence to formal dress code requirements</li>
                  <li>• Professional grooming and presentation</li>
                  <li>• Attention to detail in attire</li>
                  <li>• Overall professional appearance</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-gradient-to-r from-midnight-800 to-cognac-700 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Questions About Dress Code?
          </h3>
          <p className="text-lg text-cognac-200 mb-8 max-w-2xl mx-auto">
            If you have any questions about the dress code requirements or need clarification on appropriate attire, please contact us before the event.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="tel:+919442308824"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-midnight-800 font-bold py-3 px-8 rounded-full hover:bg-cognac-50 transition-colors duration-300 inline-flex items-center gap-3"
            >
              <Users className="w-5 h-5" />
              <span>Contact Us</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Guidelines
