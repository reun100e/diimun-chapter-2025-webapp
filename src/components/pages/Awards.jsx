import React from 'react'
import { motion } from 'framer-motion'
import { 
  Award, 
  Trophy, 
  Medal, 
  Star, 
  Users, 
  Camera, 
  FileText, 
  Mic,
  CheckCircle,
  Info,
  Gift,
  DollarSign
} from 'lucide-react'

const Awards = () => {
  const awardCategories = [
    {
      title: 'Best Delegate',
      description: 'Outstanding performance in committee debates and discussions',
      icon: <Trophy className="w-8 h-8" />,
      prize: '₹1000',
      criteria: [
        'Quality of debate and argumentation',
        'Resolution writing skills',
        'Caucusing and negotiation abilities',
        'Overall participation and engagement',
        'Adherence to MUN rules and procedures'
      ],
      type: 'cash'
    },
    {
      title: 'Best Reporter',
      description: 'Excellence in International Press Corps reporting',
      icon: <FileText className="w-8 h-8" />,
      prize: '₹1000',
      criteria: [
        'Article quality and journalistic skills',
        'Coverage of committee proceedings',
        'Creativity and professionalism',
        'Timely submission of reports',
        'Unbiased and comprehensive reporting'
      ],
      type: 'cash'
    },
    {
      title: 'Best Photographer',
      description: 'Outstanding photography skills in International Press Corps',
      icon: <Camera className="w-8 h-8" />,
      prize: '₹1000',
      criteria: [
        'Photography quality and composition',
        'Coverage of key moments',
        'Creativity and artistic vision',
        'Professional presentation',
        'Timely submission of photographs'
      ],
      type: 'cash'
    },
    {
      title: 'High Commendation',
      description: 'Exceptional performance deserving special recognition',
      icon: <Medal className="w-8 h-8" />,
      prize: 'Cash Prize',
      criteria: [
        'Outstanding contribution to committee work',
        'Exceptional research and preparation',
        'Leadership and initiative',
        'Diplomatic skills and professionalism',
        'Overall excellence in participation'
      ],
      type: 'cash'
    },
    {
      title: 'Special Mention',
      description: 'Notable contribution and participation',
      icon: <Star className="w-8 h-8" />,
      prize: 'Certificate & Recognition',
      criteria: [
        'Significant contribution to discussions',
        'Good research and preparation',
        'Active participation',
        'Professional conduct',
        'Positive attitude and engagement'
      ],
      type: 'certificate'
    },
    {
      title: 'Best Delegation',
      description: 'Outstanding team performance across all committees',
      icon: <Users className="w-8 h-8" />,
      prize: 'Certificate & Recognition',
      criteria: [
        'Team coordination and collaboration',
        'Collective performance excellence',
        'Consistent high-quality participation',
        'Professional team conduct',
        'Outstanding delegation representation'
      ],
      type: 'certificate'
    }
  ]

  const evaluationCriteria = [
    {
      title: 'For Delegates',
      icon: <Mic className="w-6 h-6" />,
      criteria: [
        'Quality of debate and argumentation',
        'Resolution writing and drafting skills',
        'Caucusing and negotiation abilities',
        'Research depth and preparation',
        'Adherence to MUN rules and procedures',
        'Diplomatic etiquette and professionalism',
        'Overall participation and engagement'
      ]
    },
    {
      title: 'For International Press',
      icon: <FileText className="w-6 h-6" />,
      criteria: [
        'Article quality and journalistic skills',
        'Photography composition and creativity',
        'Coverage of committee proceedings',
        'Timely submission of work',
        'Professional presentation',
        'Unbiased and comprehensive reporting',
        'Creativity and innovation'
      ]
    }
  ]

  const recognitionLevels = [
    {
      level: 'Best Delegate/Reporter/Photographer',
      description: 'Highest individual achievement',
      reward: '₹1000 cash prize + certificate',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      level: 'High Commendation',
      description: 'Exceptional performance',
      reward: 'Cash prize + certificate',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      level: 'Special Mention',
      description: 'Notable contribution',
      reward: 'Certificate + recognition',
      color: 'from-green-500 to-emerald-500'
    },
    {
      level: 'Best Delegation',
      description: 'Outstanding team performance',
      reward: 'Certificate + recognition',
      color: 'from-purple-500 to-pink-500'
    }
  ]

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
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-6 py-3 rounded-full font-semibold mb-6">
            <Award className="w-6 h-6" />
            Awards & Prizes
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-midnight-800 to-cognac-600 bg-clip-text text-transparent mb-6">
            DIIMUN 2025 Awards
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Recognition and rewards for outstanding performance, research, diplomacy, and adherence to rules. 
            Cash prizes and certificates await the best performers.
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-midnight-600 via-cognac-600 to-gold-500 mx-auto rounded-full shadow-glow mt-8"></div>
        </motion.div>

        {/* Cash Prize Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-2xl p-8 mb-16"
        >
          <div className="flex items-start gap-4">
            <DollarSign className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-yellow-800 mb-3">Cash Prizes Available</h3>
              <p className="text-yellow-700 leading-relaxed mb-4">
                <strong>Cash prizes are awarded only for Best Delegate/Reporter/Photographer and High Commendation.</strong> 
                All other awards include certificates and recognition.
              </p>
              <div className="bg-white border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Cash Prize Categories:</h4>
                <ul className="text-yellow-700 space-y-1 text-sm">
                  <li>• Best Delegate: ₹1000</li>
                  <li>• Best Reporter: ₹1000</li>
                  <li>• Best Photographer: ₹1000</li>
                  <li>• High Commendation: Cash prize (amount to be announced)</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Award Categories */}
        <div className="space-y-12 mb-16">
          {awardCategories.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
            >
              {/* Award Header */}
              <div className={`bg-gradient-to-r ${award.type === 'cash' ? 'from-yellow-500 to-orange-500' : 'from-blue-500 to-indigo-500'} px-8 py-6`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      {award.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-white">{award.title}</h2>
                      <p className="text-white/90 mt-1">{award.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{award.prize}</div>
                    <div className="text-white/80 text-sm">
                      {award.type === 'cash' ? 'Cash Prize' : 'Certificate'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Award Content */}
              <div className="p-8">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Evaluation Criteria:</h3>
                <div className="grid gap-3">
                  {award.criteria.map((criterion, criterionIndex) => (
                    <motion.div
                      key={criterionIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 + criterionIndex * 0.05 }}
                      className="flex items-start gap-3 bg-gray-50 rounded-xl p-4"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{criterion}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Evaluation Criteria */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              Evaluation Criteria
            </h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {evaluationCriteria.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className="bg-gray-50 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      {section.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">{section.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {section.criteria.map((criterion, criterionIndex) => (
                      <div key={criterionIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-700 text-sm">{criterion}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recognition Levels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              Recognition Levels
            </h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recognitionLevels.map((level, index) => (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                  className={`bg-gradient-to-r ${level.color} rounded-2xl p-6 text-white`}
                >
                  <h3 className="text-lg font-bold mb-2">{level.level}</h3>
                  <p className="text-white/90 mb-3">{level.description}</p>
                  <div className="bg-white/20 rounded-lg p-3">
                    <p className="text-sm font-semibold">{level.reward}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Important Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-8 mb-16"
        >
          <div className="flex items-start gap-4">
            <Info className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-blue-800 mb-3">Important Information</h3>
              <ul className="text-blue-700 space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>All delegates must be present during the closing ceremony to receive awards</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Awards are based on performance, research, diplomacy, and adherence to rules</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Decisions made by the Executive Board are final and binding</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>Cash prizes will be distributed after the event</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="bg-gradient-to-r from-midnight-800 to-cognac-700 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Questions About Awards?
          </h3>
          <p className="text-lg text-cognac-200 mb-8 max-w-2xl mx-auto">
            If you have any questions about the awards, evaluation criteria, or prize distribution, please contact us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="tel:+919442308824"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-midnight-800 font-bold py-3 px-8 rounded-full hover:bg-cognac-50 transition-colors duration-300 inline-flex items-center gap-3"
            >
              <Award className="w-5 h-5" />
              <span>Contact Us</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Awards
