import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
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
  Target,
  GraduationCap,
  Star
} from 'lucide-react'
import { ASSETS } from '../../utils/constants'

const GreatAssemblyGuidelines = () => {
  // Auto-scroll down when page loads with 2-second delay (310px on desktop, 350px on mobile)
  useEffect(() => {
    const timer = setTimeout(() => {
      const scrollDistance = window.innerWidth >= 768 ? 310 : 390
      window.scrollTo({
        top: scrollDistance,
        behavior: 'smooth'
      })
    }, 2000) // 2-second delay
    
    return () => clearTimeout(timer)
  }, [])
  const dressCodeRequirements = [
    {
      title: 'Traditional Formal Attire',
      description: 'Traditional formal attire representing historical homoeopathic masters is encouraged',
      type: 'recommended'
    },
    {
      title: 'Period-Appropriate Clothing',
      description: 'Clothing that reflects the era of your assigned homoeopathic master',
      type: 'recommended'
    },
    {
      title: 'Professional Presentation',
      description: 'Maintain formal standards even in traditional attire',
      type: 'mandatory'
    },
    {
      title: 'Master Representation',
      description: 'Dress to embody the dignity and professionalism of your assigned master',
      type: 'mandatory'
    }
  ]

  const conductRules = [
    {
      title: 'Philosophical Discourse',
      description: 'Engage in deep philosophical discussions about homoeopathic principles and master teachings',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: 'Historical Perspective',
      description: 'Present arguments from the perspective of your assigned homoeopathic master',
      icon: <GraduationCap className="w-5 h-5" />
    },
    {
      title: 'Intellectual Rigor',
      description: 'Maintain high intellectual standards in all philosophical discussions',
      icon: <Target className="w-5 h-5" />
    },
    {
      title: 'Respectful Debate',
      description: 'Engage in respectful, scholarly debates about homoeopathic philosophy',
      icon: <Shield className="w-5 h-5" />
    }
  ]

  const assemblySpecifics = [
    {
      title: 'Master Embodiment',
      description: 'Step into the shoes of legendary homoeopathic masters and present their philosophies',
      requirements: ['Deep knowledge of assigned master', 'Understanding of historical context', 'Philosophical interpretation skills']
    },
    {
      title: 'Philosophical Debates',
      description: 'Engage in discussions about unspoken philosophies and hidden truths in homoeopathy',
      requirements: ['Philosophical reasoning', 'Historical knowledge', 'Critical thinking abilities']
    },
    {
      title: 'Future Vision',
      description: 'Address future concerns and evolution of homoeopathic practice',
      requirements: ['Forward-thinking approach', 'Innovation mindset', 'Visionary perspective']
    }
  ]

  const masters = [
    { name: 'Boenninghausen', period: '1785-1864', focus: 'Repertorization & Systematic Case Taking' },
    { name: 'Kent', period: '1849-1916', focus: 'Constitutional Prescribing & Philosophy' },
    { name: 'Hering', period: '1800-1880', focus: 'Hering\'s Law & American Homoeopathy' },
    { name: 'Boger', period: '1861-1935', focus: 'Repertory & Keynote Prescribing' },
    { name: 'Boericke Brothers', period: '1849-1929', focus: 'Materia Medica Development' },
    { name: 'Carroll Dunham', period: '1828-1877', focus: 'Education & Clinical Practice' },
    { name: 'Stuart Close', period: '1860-1929', focus: 'Teaching & Philosophical Writing' }
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'mandatory':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'required':
        return 'bg-orange-50 border-orange-200 text-orange-800'
      case 'recommended':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      case 'bonus':
        return 'bg-purple-50 border-purple-200 text-purple-800'
      default:
        return 'bg-green-50 border-green-200 text-green-800'
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
      case 'bonus':
        return <Star className="w-5 h-5 text-purple-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />
    }
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-cognac-50/90 via-amber-50/80 to-cognac-100/90">
      {/* Background Image with Gradient Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-15">
          <img 
            src={ASSETS.greatAssemblyImage} 
            alt="Great Assembly Background" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-cognac-700 to-cognac-800 text-white py-20">
        {/* Background Image for Header */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src={ASSETS.greatAssemblyImage} 
            alt="Great Assembly Header Background" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-cognac-700/60 to-cognac-800/60"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Great Homoeopathic Assembly Guidelines
            </h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto">
              Exclusive guidelines for the most prestigious committee - embody the great homoeopathic masters
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
              The Most Prestigious Committee
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              The Great Homoeopathic Assembly is an exclusive committee where participants embody legendary homoeopathic 
              masters. Engage in philosophical debates, explore unspoken philosophies, and address future concerns while 
              evolving from critical thinkers to master practitioners.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {assemblySpecifics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                <div>
                  <h4 className="font-semibold text-green-700 mb-2">Key Requirements:</h4>
                  <ul className="space-y-1">
                    {item.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Homoeopathic Masters */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              Legendary Homoeopathic Masters
            </h2>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {masters.map((master, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {master.name}
                  </h3>
                  <p className="text-green-600 text-sm mb-3">
                    {master.period}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {master.focus}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div> */}


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
              Information such as <span className="font-semibold">Dress Code</span>, <span className="font-semibold">Rules of Procedure</span>, <span className="font-semibold"> Stalwarts</span>, and more will be added soon.
            </p>
            <p className="text-base text-yellow-700 text-center">
              Please check back later for detailed guidelines and updates for the Great Homoeopathic Assembly.
            </p>
          </div>
        </motion.div>

        {/* Dress Code */}
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
                <Award className="w-6 h-6" />
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
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
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
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
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
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-purple-50 border border-purple-200 rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      {rule.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-purple-800 mb-2">
                        {rule.title}
                      </h3>
                      <p className="text-purple-700 leading-relaxed">
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
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 mb-16"
        >
          <div className="flex items-start gap-4">
            <Star className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-yellow-800 mb-3">Exclusive Assembly Privileges</h3>
              <ul className="text-yellow-700 space-y-2">
                <li>• Limited teams on first-come-first-serve basis - secure your spot early</li>
                <li>• Deep dive into philosophical aspects often overlooked in mainstream homoeopathy</li>
                <li>• Opportunity to challenge and debate exaggerated claims in the field</li>
                <li>• Access to exclusive discussions about future evolution of homoeopathic practice</li>
                <li>• Special recognition for outstanding philosophical contributions</li>
              </ul>
            </div>
          </div>
        </motion.div> */}

        {/* Contact Information */}
        {/* <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Questions About Great Assembly?
          </h3>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Contact our organizing committee for any clarifications about the Great Homoeopathic Assembly requirements and guidelines.
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

export default GreatAssemblyGuidelines
