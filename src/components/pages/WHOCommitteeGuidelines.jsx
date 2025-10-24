import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, 
  Users, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Clock,
  FileText,
  Mic,
  Shield,
  BookOpen,
  Target
} from 'lucide-react'
import { ASSETS } from '../../utils/constants'

const WHOCommitteeGuidelines = () => {
  // Auto-scroll down when page loads with 2-second delay (310px on desktop, 350px on mobile)
  useEffect(() => {
    const timer = setTimeout(() => {
      const scrollDistance = window.innerWidth >= 768 ? 310 : 360
      window.scrollTo({
        top: scrollDistance,
        behavior: 'smooth'
      })
    }, 2000) // 2-second delay
    
    return () => clearTimeout(timer)
  }, [])
  const dressCodeRequirements = [
    {
      title: 'Western Formals Preferred',
      description: 'Western formals preferred but not mandatory. Complete formal suit with tie for male delegates, formal pantsuit or business dress for female delegates. Smart casual attire also acceptable.',
      type: 'recommended'
    },
    {
      title: 'Professional Grooming',
      description: 'Well-groomed appearance with clean, professional presentation',
      type: 'mandatory'
    },
    {
      title: 'Country Representation',
      description: 'Traditional formal attire representing your assigned country is permitted',
      type: 'allowed'
    },
    {
      title: 'Best Dressed Recognition',
      description: 'Special recognition for outstanding professional attire',
      type: 'bonus'
    }
  ]

  const conductRules = [
    {
      title: 'Diplomatic Language',
      description: 'Use formal, diplomatic language appropriate for international healthcare policy discussions',
      icon: <Mic className="w-5 h-5" />
    },
    {
      title: 'Research-Based Arguments',
      description: 'Support all statements with credible healthcare research and WHO guidelines',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: 'Professional Behavior',
      description: 'Maintain decorum befitting international healthcare representatives',
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: 'Collaborative Approach',
      description: 'Focus on finding consensus and global healthcare solutions',
      icon: <Users className="w-5 h-5" />
    }
  ]

  const committeeSpecifics = [
    {
      title: 'Global Healthcare Focus',
      description: 'Debate contemporary issues in Homoeopathy within global healthcare frameworks',
      requirements: ['Understanding of WHO guidelines', 'Knowledge of global health policies', 'Research on Homoeopathy in different countries']
    },
    {
      title: 'Policy Development',
      description: 'Contribute to policy recommendations for Homoeopathy integration in healthcare systems',
      requirements: ['Policy analysis skills', 'Understanding of healthcare systems', 'Ability to draft formal recommendations']
    },
    {
      title: 'International Perspective',
      description: 'Represent assigned countries and their healthcare challenges and opportunities',
      requirements: ['Country-specific research', 'Understanding of cultural healthcare practices', 'Global health awareness']
    }
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'mandatory':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'required':
        return 'bg-orange-50 border-orange-200 text-orange-800'
      case 'allowed':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'bonus':
        return 'bg-purple-50 border-purple-200 text-purple-800'
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'mandatory':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'required':
        return <CheckCircle className="w-5 h-5 text-orange-500" />
      case 'allowed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'bonus':
        return <Award className="w-5 h-5 text-purple-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-midnight-50/90 via-midnight-100/80 to-blue-50/90">
      {/* Background Image with Gradient Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-15">
          <img 
            src={ASSETS.whoLogo} 
            alt="WHO Background" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-midnight-700 to-midnight-800 text-white py-20">
        {/* Background Image for Header */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src={ASSETS.whoLogo} 
            alt="WHO Header Background" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-midnight-700/60 to-midnight-800/60"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              WHO Committee Guidelines
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Specific guidelines for World Health Organization Committee participants
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-16">
        {/* Committee Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Committee Overview
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              The WHO Committee focuses on global healthcare policy discussions, particularly around the integration 
              and recognition of Homoeopathy in international healthcare systems. Participants will debate contemporary 
              issues and develop policy recommendations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {committeeSpecifics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Key Requirements:</h4>
                  <ul className="space-y-1">
                    {item.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Page Under Construction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-yellow-50 to-orange-100 border border-yellow-200 rounded-3xl shadow-2xl p-8 md:p-12 mb-16 flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4 shadow-md">
              <Info className="w-10 h-10 text-yellow-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-700 mb-2 text-center">
              Page Under Construction
            </h2>
            <p className="text-lg text-yellow-800 text-center max-w-2xl mb-2">
              Information such as <span className="font-semibold">Dress Code</span>, <span className="font-semibold">Rules of Procedure</span>, and more will be added soon.
            </p>
            <p className="text-base text-yellow-700 text-center">
              Please check back later for detailed guidelines and updates for the WHO Committee.
            </p>
          </div>
        </motion.div>

        {/* Dress Code */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              Dress Code Requirements
            </h2>
          </div>
          <div className="p-8">
            <div className="grid gap-6">
              {dressCodeRequirements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
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
        </motion.div> */}

        {/* Conduct Rules */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              Conduct & Behavior Rules
            </h2>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {conductRules.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
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
        </motion.div> */}

        {/* Important Reminders */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8 mb-16"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-red-800 mb-3">Important Reminders for WHO Committee</h3>
              <ul className="text-red-700 space-y-2">
                <li>• Research your assigned country's healthcare system and Homoeopathy status</li>
                <li>• Prepare policy recommendations based on WHO guidelines</li>
                <li>• Maintain diplomatic language throughout all discussions</li>
                <li>• Focus on global health equity and universal healthcare access</li>
                <li>• Document all proceedings for final report submission</li>
              </ul>
            </div>
          </div>
        </motion.div> */}

        {/* Contact Information */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Questions About WHO Committee?
          </h3>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Contact our organizing committee for any clarifications about WHO Committee requirements and guidelines.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="mailto:contact@diimun2025.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300"
            >
              <FileText className="w-5 h-5" />
              <span className="font-medium">Email Us</span>
            </motion.a>
            <motion.a
              href="tel:+919442308824"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300"
            >
              <Users className="w-5 h-5" />
              <span className="font-medium">Call Us</span>
            </motion.a>
          </div>
        </motion.div> */}
      </div>
      </div>
    </div>
  )
}

export default WHOCommitteeGuidelines
