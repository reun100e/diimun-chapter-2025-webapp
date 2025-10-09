import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Award, 
  Trophy, 
  Medal, 
  Users, 
  Camera, 
  FileText, 
  CheckCircle,
  Info,
  Gift
} from 'lucide-react'
import { AWARDS, CONTACT_INFO } from '../../utils/content'

const Awards = () => {
  // Auto-scroll on page load to reveal navigation
  useEffect(() => {
    const scrollToRevealNav = () => {
      // Detect if mobile or desktop
      const isMobile = window.innerWidth < 768
      const scrollAmount = isMobile ? 400 : 350

      // Smooth scroll after 2 second delay
      setTimeout(() => {
        window.scrollTo({
          top: scrollAmount,
          behavior: 'smooth'
        })
      }, 2000)
    }

    scrollToRevealNav()
  }, [])

  // Use content from our constants
  const evaluationCriteria = AWARDS.evaluation;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Awards & Recognition
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-6">
              Celebrating excellence in debate, journalism, and participation at DIIMUN 2025
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <div className="text-center">
                <p className="text-purple-200 text-sm mb-2">Total Prize Pool of</p>
                <p className="text-3xl font-bold text-white">{AWARDS.prizePool}</p>
                <p className="text-purple-200 text-sm mt-2"> with {AWARDS.totalAwards} Awards</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Award Categories */}
      <div className="container-custom py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Award Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Awards are given based on performance, research, diplomacy, and adherence to rules. 
            Cash prizes are available for top performers!
          </p>
        </motion.div>

        {/* Delegate Awards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Best Delegate */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-yellow-500 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Best Delegate
              </h3>
              <div className="text-3xl font-bold text-yellow-600 mb-3">
                ₹1500 each
              </div>
              <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full mb-3">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-700">2 Awards: WHO & GHA</span>
              </div>
              <p className="text-gray-600 text-sm">
                Awarded to delegates who demonstrate exceptional performance in committee debates, research, diplomacy, and adherence to rules.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">Evaluation Criteria:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Quality of debate and argumentation
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Resolution writing skills
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Caucusing and negotiation abilities
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Overall participation and engagement
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Adherence to MUN procedures and decorum
                </li>
              </ul>
            </div>
          </motion.div>

          {/* High Commendation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-500 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Medal className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                High Commendation
              </h3>
              <div className="text-3xl font-bold text-blue-600 mb-3">
                ₹1000 each
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-3">
                <Medal className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">2 Awards: WHO & GHA</span>
              </div>
              <p className="text-gray-600 text-sm">
                Awarded to delegates who demonstrate outstanding performance but fall just short of the best delegate award.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">Evaluation Criteria:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Strong performance in multiple areas
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Consistent engagement throughout sessions
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Positive contribution to committee work
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Respectful conduct and diplomacy
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* IPC Awards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Best Essay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-500 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Best Essay - IPC
              </h3>
              <div className="text-3xl font-bold text-green-600 mb-3">
                ₹1000
              </div>
              <p className="text-gray-600 text-sm">
                Awarded to the International Press Corps member who demonstrates exceptional journalistic skills and essay writing.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">Evaluation Criteria:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Article quality and journalistic integrity
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Coverage of committee proceedings
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Creativity and professionalism
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Timely submission of reports
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Unbiased and comprehensive reporting
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Best Photographer */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-purple-500 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Best Photographer - IPC
              </h3>
              <div className="text-3xl font-bold text-purple-600 mb-3">
                ₹1000
              </div>
              <p className="text-gray-600 text-sm">
                Awarded to the IPC member who captures the best photographs of the event without disrupting proceedings.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-700">Evaluation Criteria:</h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Photographic quality and composition
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Coverage of key moments
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Professional conduct during photography
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Creativity and artistic merit
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Adherence to photography guidelines
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Evaluation Criteria */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Evaluation Criteria
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Delegates Evaluation Criteria */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  Delegate Evaluation
                </h3>
              </div>
              
              <ul className="space-y-3">
                {evaluationCriteria.delegates.map((criterion, criterionIndex) => (
                  <li key={criterionIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{criterion}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* IPC Evaluation Criteria */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  IPC Evaluation
                </h3>
              </div>
              
              <ul className="space-y-3">
                {evaluationCriteria.ipc.map((criterion, criterionIndex) => (
                  <li key={criterionIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{criterion}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-8 mb-16"
        >
          <h3 className="text-2xl font-bold text-purple-800 mb-6 flex items-center gap-3">
            <Info className="w-6 h-6" />
            Award Ceremony Details
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">Ceremony Schedule</h4>
                <ul className="text-purple-700 space-y-1.5 text-sm">
                  <li>• Awards announced at 5:00 PM</li>
                  <li>• Venue: Seminar Stage</li>
                  <li>• All delegates must be present during closing ceremony</li>
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-purple-800 mb-2">Evaluation Basis</h4>
                <ul className="text-purple-700 space-y-1.5 text-sm">
                  <li>• Performance throughout the event</li>
                  <li>• Research quality and preparation</li>
                  <li>• Adherence to rules and procedures</li>
                  <li>• Overall participation and engagement</li>
                </ul>
              </div>
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
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Questions About Awards?</h3>
            <p className="text-purple-100 mb-6">
              Contact our organizing committee for any clarifications about awards and evaluation criteria.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <motion.a
                href={`mailto:${CONTACT_INFO.email}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300"
              >
                <Award className="w-5 h-5" />
                <span className="font-medium">{CONTACT_INFO.email}</span>
              </motion.a>
              <motion.a
                href={`tel:${CONTACT_INFO.phone}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300"
              >
                <Gift className="w-5 h-5" />
                <span className="font-medium">{CONTACT_INFO.phone}</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Awards