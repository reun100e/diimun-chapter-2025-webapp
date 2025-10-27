import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Camera, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  Info,
  Clock,
  Mic,
  Shield,
  BookOpen,
  Target,
  Laptop,
  PenTool,
  Users,
  Newspaper,
  Download,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import { ASSETS } from '../../utils/constants'
import { smoothScrollTo } from '../../animations/parallax'

const IPCGuidelines = () => {
  const [activeTab, setActiveTab] = useState('essay')
  const [expandedSections, setExpandedSections] = useState({})

  // Auto-scroll to top of tabs on load with 2-second delay
  useEffect(() => {
    const timer = setTimeout(() => {
      const tabsElement = document.getElementById('overview-section')
      if (tabsElement) {
        tabsElement.scrollIntoView({ behavior: 'smooth' })
      }
    }, 2000)
    
    return () => clearTimeout(timer)
  }, [])

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }
  const sharedRules = [
    {
      title: 'Neutrality',
      description: 'Maintain strict neutrality - no personal, political, or national bias',
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: 'Respect',
      description: 'Behave respectfully toward all delegates, chairs, and organizers',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'ID Badge',
      description: 'Carry official press ID card visibly at all times',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      title: 'Access',
      description: 'Committee access requires Chair/Presiding Officer approval',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      title: 'Gear',
      description: 'Use recording devices discreetly during sessions',
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: 'Dress',
      description: 'Professional attire that allows active coverage',
      icon: <Users className="w-5 h-5" />
    }
  ]

  const essayStructure = [
    'Headline: Catchy title (e.g., "Homoeopathy Pioneers Clash on Future of Medicine")',
    'Introduction: Hook with the event\'s big question',
    'Context: Quick MUN intro',
    'Discussion: Key quotes, arguments, and "mood"',
    'Conclusion: What it means for health'
  ]

  const photographyTips = [
    'Ethics: Ask permission, no flash during speeches',
    'Balance: 2-3 photos per committee',
    'Captions: Meaningful descriptions (e.g., "Pioneers debate vaccine ethics...")',
    'Quality: Minimum 1080p resolution',
    'Diversity: Equal representation of all delegates'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pearl-50 via-purple-50/30 to-pearl-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/90 via-purple-800/80 to-purple-900/90 text-white py-16">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-15">
          <img 
            src={ASSETS.ipcImage} 
            alt="IPC Background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-purple-600/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              International Press Corps Guidelines
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Join as a reporter or photojournalist in our Model United Nations event. No experience needed—just your passion for health stories!
            </p>
                    </motion.div>
        </div>
      </div>


      <div 
      id="overview-section"
      className="container mx-auto px-4 py-16">
        {/* Quick Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              What is International Press Corps? (IPC)
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
              The International Press Corps (IPC) lets you cover our Model United Nations event like a real journalist. You'll document debates and discussions happening in our committees, just like news reporters cover important events.
            </p>
            <p className="text-gray-600 max-w-3xl mx-auto mb-6">
              Our event takes place on November 4th at GHMCT, featuring two committees: the World Health Organization (WHO) Committee discussing global health policies, and the Great Homoeopathic Assembly where delegates represent famous homoeopathy pioneers like Kent.
            </p>
            <p className="text-gray-600 max-w-3xl mx-auto">
              You can choose to participate as either an Essay Writer (create a news-style report) or a Photographer (capture 5 key moments) or both but you will have registered twice. Both competitions offer ₹1,000 for first place!
            </p>
          </div>

                {/* Register Now Button */}
      <div className="container mx-auto px-4 pb-8">
        <div className="text-center">
          <motion.a
            href="/#register"
            onClick={(e) => {
              e.preventDefault()
              
              // First, navigate to home page
              window.history.pushState({ page: 'home' }, '', '/#register')
              
              // Trigger a popstate event to update the app's state
              window.dispatchEvent(new PopStateEvent('popstate'))
              
              // Wait for page navigation animation to complete, then scroll
              setTimeout(() => {
                smoothScrollTo('#register', 100)
              }, 650) // Match the fade-out + fade-in animation duration
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-semibold py-4 px-10 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/25 text-lg"
          >
            <Target className="w-6 h-6" />
            <span>Register Now</span>
          </motion.a>
        </div>
      </div>

          <div className="grid md:grid-cols-2 gap-6">
                          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Newspaper className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-emerald-800">Essay Competition</h3>
              </div>
              <p className="text-emerald-700 text-sm">
                Write 1 news-style report on the debates. Submit between 3-4 PM.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-800">Photography Competition</h3>
              </div>
              <p className="text-blue-700 text-sm">
                Submit up to 5 photos with captions. Capture the event's energy!
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabbed Tracks Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 mb-16"
        >
                    {/* Tab Bar */}
          <div className="mb-8">
            <div className="bg-gray-100 rounded-2xl p-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setActiveTab('essay')}
                className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'essay'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
              >
                <Newspaper className="w-5 h-5" />
                <span className="text-sm sm:text-base">Essay Competition</span>
              </button>
              <button
                onClick={() => setActiveTab('photography')}
                className={`flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === 'photography'
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Camera className="w-5 h-5" />
                <span className="text-sm sm:text-base">Photography Competition</span>
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                {activeTab === 'essay' ? '📝 Write a news-style report about the debates' : '📸 Capture 5 key moments with captions'}
              </p>
            </div>
          </div>

          {/* Tab Content */}
                <motion.div
            key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'essay' ? (
              <div className="space-y-6">
                                {/* Essay Intro Card */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Newspaper className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-800">Essay Competition Guidelines</h3>
                  </div>
                  <p className="text-emerald-700 mb-4">
                    Act as a health journalist! Cover debates from WHO (global health policies) or Great Homoeopathic Assembly (pioneers like Hahnemann). No MUN knowledge needed—focus on storytelling.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>1st Prize: ₹1,000</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Deliverable: 1 news article (500-800 words)</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>Time: Write during the event; submit between 3-4 PM</span>
                    </div>
                  </div>
                </div>

                {/* Report Structure */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-gray-600" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800">Report Structure (Easy Template)</h4>
                      </div>
                  <ol className="space-y-3 pl-6">
                    {essayStructure.map((item, index) => (
                      <li key={index} className="text-gray-700 text-sm">
                        <span className="font-semibold text-emerald-600">{index + 1}.</span> {item}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-4 p-4 bg-emerald-50 rounded-xl">
                    <p className="text-emerald-700 text-sm italic">
                      <strong>Tips:</strong> Use neutral tone—no opinions. Quote delegates (ask permission). Fact-check everything.
                    </p>
                  </div>
                </div>

                                {/* Submission CTA */}
                <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold">How to Submit</h4>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-emerald-100 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Submit via our online portal</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-100 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Only 1 PDF document accepted</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-100 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Enter your IPC code (provided on event day)</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-100 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Submission portal opens at 3 PM on November 4th</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-100 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>One submission per IPC code only</span>
                    </div>
                  </div>
                  <motion.a
                    href="https://dna.aghosh.in/ipc-submission"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 block text-center"
                  >
                    Go to Submission Portal
                  </motion.a>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                                {/* Photography Intro Card */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Camera className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-800">Photography Competition Guidelines</h3>
                  </div>
                  <p className="text-blue-700 mb-4">
                    Be the event's visual storyteller! Snap moments from WHO debates or homoeopathy pioneer role-plays. Focus on energy, diversity, and health themes.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-blue-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>1st Prize: ₹1,000</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>Deliverable: Max 5 photos (min 1080p) + captions</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-700 text-sm">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span>Time: Shoot during event; submit between 3-4 PM</span>
                    </div>
                  </div>
                </div>

                {/* Photography Tips */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Camera className="w-5 h-5 text-gray-600" />
                      </div>
                    <h4 className="text-lg font-bold text-gray-800">Capture Tips & Ethics</h4>
                  </div>
                  <div className="space-y-3">
                    {photographyTips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{tip}</span>
                      </div>
              ))}
            </div>
          </div>

                                {/* Submission CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Download className="w-5 h-5" />
                    </div>
                    <h4 className="text-lg font-bold">How to Submit</h4>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-blue-100 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Submit via our online portal</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>JPG/PNG format, &lt;10MB each</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Include meaningful captions</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Enter your IPC code (provided on event day)</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>Submission portal opens at 3 PM on November 4th</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-100 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>One submission per IPC code only</span>
                    </div>
                  </div>
                  <motion.a
                    href="https://dna.aghosh.in/ipc-submission"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-xl font-semibold transition-all duration-300 block text-center"
                  >
                    Go to Submission Portal
                  </motion.a>
                </div>
          </div>
            )}
          </motion.div>
        </motion.div>

        {/* Strategic Register Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl p-8 text-white text-center mb-16 shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Join the Competition?
          </h3>
          <p className="text-lg text-purple-100 mb-6 max-w-2xl mx-auto">
            Register now to participate in either the Essay Competition or Photography Competition. Both offer ₹1,000 for first place!
          </p>
          <motion.a
            href="/#register"
            onClick={(e) => {
              e.preventDefault()
              
              // First, navigate to home page
              window.history.pushState({ page: 'home' }, '', '/#register')
              
              // Trigger a popstate event to update the app's state
              window.dispatchEvent(new PopStateEvent('popstate'))
              
              // Wait for page navigation animation to complete, then scroll
              setTimeout(() => {
                smoothScrollTo('#register', 100)
              }, 650) // Match the fade-out + fade-in animation duration
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <Users className="w-6 h-6" />
            Register Now
          </motion.a>
        </motion.div>


        {/* Equipment & Prep Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-100 mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">What to Bring & Prep</h2>
          </div>
          
          <div className="space-y-4">
            {/* Essentials */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <button
                onClick={() => toggleSection('essentials')}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Laptop className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="font-semibold text-gray-800">Essentials (Both Tracks)</span>
                </div>
                {expandedSections.essentials ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </button>
              {expandedSections.essentials && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-2"
                >
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-gray-500" />
                    <span>Laptop/Tablet</span>
                    </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-gray-500" />
                    <span>Chargers</span>
                    </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-gray-500" />
                    <span>Notebook/Pen</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Essay Writers */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <button
                onClick={() => toggleSection('essay')}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-200 rounded-lg flex items-center justify-center">
                    <PenTool className="w-4 h-4 text-emerald-600" />
              </div>
                  <span className="font-semibold text-gray-800">For Essay Writers</span>
          </div>
                {expandedSections.essay ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </button>
              {expandedSections.essay && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-2"
                >
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Google Docs/Word</span>
                    </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span>Backup USB/Cloud</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Photographers */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <button
                onClick={() => toggleSection('photography')}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
                    <Camera className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-semibold text-gray-800">For Photographers</span>
                </div>
                {expandedSections.photography ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
              </button>
              {expandedSections.photography && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-2"
                >
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>Phone/Camera (1080p+)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span>No flash</span>
          </div>
        </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* FAQ & Contact Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-3xl p-8 text-white text-center shadow-2xl"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Questions? We're Here!
          </h3>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Contact for clarifications on IPC rules or prep.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            <motion.a
              href="mailto:dna@aghosh.in"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">Email Us</span>
            </motion.a>
            <motion.a
              href="tel:+919442308824"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 bg-white/20 hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">Call Us</span>
            </motion.a>
          </div>
          <div className="text-purple-200 text-sm">
            <p>© 2025 DIIMUN Esperanza 4.0 | 
              <a href="/schedule" className="hover:text-white mx-2">Schedule</a> | 
              <a href="/awards" className="hover:text-white mx-2">Awards</a> | 
              <a href="/terms" className="hover:text-white mx-2">Terms</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default IPCGuidelines
