import React, { useEffect } from 'react'
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
  Users
} from 'lucide-react'
import { ASSETS } from '../../utils/constants'

const IPCGuidelines = () => {
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
  const coreResponsibilities = [
    {
      title: 'Unbiased Reporting',
      description: 'Provide unbiased reports, editorials, and features covering all committee proceedings',
      icon: <FileText className="w-5 h-5" />
    },
    {
      title: 'Visual Narratives',
      description: 'Capture compelling visual narratives through professional photography',
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: 'Journalistic Integrity',
      description: 'Uphold the principles of journalistic integrity, neutrality, and professionalism at all times',
      icon: <Shield className="w-5 h-5" />
    }
  ]

  const accessAndConduct = [
    {
      title: 'Neutrality',
      description: 'All journalists and photographers must maintain strict neutrality and refrain from expressing personal, political, or national bias in any form.',
      icon: <Shield className="w-5 h-5" />,
      type: 'mandatory'
    },
    {
      title: 'Professional Decorum',
      description: 'Members of IP (International Press) shall behave respectfully toward all delegates, chairs, and organizers. Any disruptive behavior can lead to suspension of credentials.',
      icon: <Users className="w-5 h-5" />,
      type: 'mandatory'
    },
    {
      title: 'Identification',
      description: 'Each journalist and photographer must carry their official press ID card visibly within committee sessions and during inter-committee movements.',
      icon: <CheckCircle className="w-5 h-5" />,
      type: 'mandatory'
    },
    {
      title: 'Committee Access',
      description: 'Access is subject to Chair/Presiding Officer approval. Journalists may observe but not participate in debate or voting procedures. Recording devices must be used discreetly.',
      icon: <AlertTriangle className="w-5 h-5" />,
      type: 'mandatory'
    }
  ]

  const journalistGuidelines = [
    {
      title: 'Daily Reporting',
      description: 'Each journalist must submit at least one report summarizing the key events, motions, and debates of their assigned committee. Reports should include quotes, delegate stances, and committee mood — written in a neutral and engaging manner.',
      requirements: [
        'Minimum one report per assigned committee',
        'Include key events, motions, and debates',
        'Add quotes and delegate stances',
        'Capture committee mood and atmosphere',
        'Written in neutral and engaging tone'
      ]
    },
    {
      title: 'Structure & Style',
      description: 'All articles should follow a clear structure with professional journalistic tone.',
      requirements: [
        'Structure: Headline, Introduction, Context, Discussion, Conclusion',
        'Use professional journalistic tone',
        'Avoid slang, exaggeration, or personal commentary',
        'Maintain objectivity throughout',
        'Engage readers with clear, concise writing'
      ]
    },
    {
      title: 'Accuracy & Verification',
      description: 'Cross-check all facts, quotes, and delegate names. Misinformation or misquoting will be treated as a serious violation.',
      requirements: [
        'Cross-check all facts and quotes',
        'Verify delegate names and positions',
        'Confirm information from multiple sources',
        'No misinformation or misquoting',
        'Fact-check before submission'
      ]
    },
    {
      title: 'Sources & Citations',
      description: 'If external references are used, cite sources clearly. Do not plagiarize or copy content from existing media outlets.',
      requirements: [
        'Cite all external references clearly',
        'No plagiarism from any source',
        'No copying from existing media outlets',
        'Original content only',
        'Proper attribution when required'
      ]
    }
  ]

  const photographerGuidelines = [
    {
      title: 'Photo Ethics',
      description: 'Capture moments that reflect the essence of the debate, diplomacy, and diversity. Avoid photos that may demean, embarrass, or misrepresent delegates or staff.',
      icon: <Camera className="w-5 h-5" />
    },
    {
      title: 'Equal Representation',
      description: 'Ensure equal representation of all committees and delegates, not just popular ones.',
      icon: <Users className="w-5 h-5" />
    },
    {
      title: 'Quality Standards',
      description: 'Maintain high-quality images (minimum 1080p resolution). Avoid excessive filters or manipulative edits that distort context.',
      icon: <CheckCircle className="w-5 h-5" />
    },
    {
      title: 'Permission & Consent',
      description: 'Ask for permission before close-up shots or backstage photography. Avoid flash photography during ongoing speeches or debates.',
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      title: 'Daily Submissions',
      description: 'Photographers must submit a minimum of 5 curated images daily, categorized (e.g., Committee, Break, Ceremony). Artistic or conceptual shots are encouraged for closing-day displays or media showcases, provided they adhere to UN ethics.',
      icon: <FileText className="w-5 h-5" />
    }
  ]

  const dressCodeRequirements = [
    {
      title: 'Professional Media Attire',
      description: 'Formal business attire appropriate for media professionals covering international events',
      type: 'mandatory'
    },
    {
      title: 'Press Badge Display',
      description: 'Visible press identification and professional credentials must be worn at all times',
      type: 'mandatory'
    },
    {
      title: 'Comfortable Work Clothing',
      description: 'Professional attire that allows for active coverage and documentation',
      type: 'recommended'
    },
    {
      title: 'Media Professional Standards',
      description: 'Maintain the dignity and professionalism expected of international press corps',
      type: 'mandatory'
    }
  ]

  const ipcSpecifics = [
    {
      title: 'Live Event Coverage',
      description: 'Document and report on all committee proceedings in real-time',
      requirements: ['Laptop/tablet for essay writing', 'Note-taking skills', 'Real-time documentation abilities']
    },
    {
      title: 'Comprehensive Reporting',
      description: 'Create detailed reports covering debates, decisions, and outcomes',
      requirements: ['Writing and editing skills', 'Photo documentation', 'Video recording capabilities']
    },
    {
      title: 'Media Coordination',
      description: 'Coordinate with other IPC members to ensure complete coverage',
      requirements: ['Team collaboration', 'Communication skills', 'Project management abilities']
    }
  ]

  const equipmentRequirements = [
    {
      title: 'Essential Equipment',
      items: ['Laptop or tablet (mandatory)', 'Smartphone with camera', 'Notebook and pens', 'Power bank/charger']
    },
    {
      title: 'Recommended Equipment',
      items: ['Digital camera', 'Voice recorder', 'Tripod', 'External microphone', 'Additional storage devices']
    },
    {
      title: 'Software Requirements',
      items: ['Word processor', 'Image editing software', 'Video editing software (optional)', 'Cloud storage access']
    }
  ]

  const reportingFormats = [
    {
      title: 'Live Updates',
      description: 'Real-time updates during committee sessions',
      format: 'Short posts, bullet points, key quotes',
      deadline: 'During sessions'
    },
    {
      title: 'Session Reports',
      description: 'Comprehensive reports after each committee session',
      format: 'Detailed written reports with photos',
      deadline: 'Within 30 minutes of session end'
    },
    {
      title: 'Final Summary',
      description: 'Complete coverage summary of all proceedings',
      format: 'Comprehensive report with multimedia elements',
      deadline: 'End of event day'
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
        return <Award className="w-5 h-5 text-purple-500" />
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />
    }
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-purple-50/90 via-purple-100/80 to-indigo-50/90">
      {/* Background Image with Gradient Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 opacity-15">
          <img 
            src={ASSETS.ipcImage} 
            alt="IPC Background" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-700 to-purple-800 text-white py-20">
        {/* Background Image for Header */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src={ASSETS.ipcImage} 
            alt="IPC Header Background" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700/60 to-purple-800/60"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              International Press Corps Guidelines
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Comprehensive guidelines for media professionals covering DIIMUN 2025 proceedings
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
              Media Coverage Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              The International Press Corps serves as the official media coverage team for all committee proceedings. 
              Your role is to document debates, create comprehensive reports, and maintain unbiased coverage of the 
              entire event with journalistic integrity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ipcSpecifics.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {item.description}
                </p>
                <div>
                  <h4 className="font-semibold text-purple-700 mb-2">Key Requirements:</h4>
                  <ul className="space-y-1">
                    {item.requirements.map((req, reqIndex) => (
                      <li key={reqIndex} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Core Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              Core Responsibilities
            </h2>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {coreResponsibilities.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Access and Conduct Rules */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-red-600 to-orange-600 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              Rules and Regulations
            </h2>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              {accessAndConduct.map((rule, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="border-2 border-red-200 rounded-2xl p-6 bg-red-50"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      {rule.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-red-900">
                          {rule.title}
                        </h3>
                        <span className="px-3 py-1 bg-red-200 text-red-800 text-xs font-bold rounded-full uppercase">
                          {rule.type}
                        </span>
                      </div>
                      <p className="text-red-800 leading-relaxed">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Journalist Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <PenTool className="w-6 h-6" />
              </div>
              Journalist Guidelines
            </h2>
          </div>
          <div className="p-8">
            <div className="space-y-8">
              {journalistGuidelines.map((guideline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-blue-900 mb-3">
                    {guideline.title}
                  </h3>
                  <p className="text-blue-800 mb-4 leading-relaxed">
                    {guideline.description}
                  </p>
                  <div className="space-y-2">
                    {guideline.requirements.map((req, reqIndex) => (
                      <div key={reqIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-sm text-blue-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Photographer Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              Photographer Guidelines
            </h2>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {photographerGuidelines.map((guideline, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      {guideline.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-emerald-900 mb-2">
                        {guideline.title}
                      </h3>
                      <p className="text-emerald-800 leading-relaxed text-sm">
                        {guideline.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Equipment Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Laptop className="w-6 h-6" />
              </div>
              Equipment Requirements
            </h2>
          </div>
          <div className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              {equipmentRequirements.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl p-6"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-4">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Dress Code */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-slate-600 to-gray-600 px-8 py-6">
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
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
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
        </motion.div>

        {/* Reporting Formats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-8 py-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              Reporting Formats & Deadlines
            </h2>
          </div>
          <div className="p-8">
            <div className="space-y-6">
              {reportingFormats.map((format, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.3 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-6"
                >
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-cyan-800 mb-2">
                        {format.title}
                      </h3>
                      <p className="text-cyan-600 text-sm">
                        {format.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-cyan-700 mb-2">Format:</h4>
                      <p className="text-cyan-600 text-sm">
                        {format.format}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-cyan-700 mb-2">Deadline:</h4>
                      <p className="text-cyan-600 text-sm">
                        {format.deadline}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                      <span className="ml-2 text-cyan-600 text-sm">Active</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Important Reminders */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-2xl p-8 mb-16"
        >
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-orange-800 mb-3">Critical IPC Requirements & Reminders</h3>
              <ul className="text-orange-700 space-y-2">
                <li>• Laptop/tablet is MANDATORY for all journalists - no exceptions</li>
                <li>• Press ID card must be visibly displayed at all times during sessions</li>
                <li>• Committee access requires Chair/Presiding Officer approval</li>
                <li>• Maintain strict neutrality - no personal, political, or national bias</li>
                <li>• Minimum one report per assigned committee (journalists)</li>
                <li>• Minimum 5 curated images daily, categorized (photographers)</li>
                <li>• All images must be minimum 1080p resolution</li>
                <li>• Cross-check all facts, quotes, and delegate names before submission</li>
                <li>• No flash photography during speeches or debates</li>
                <li>• Ask permission before close-up or backstage photography</li>
                <li>• Submit all reports in the specified format and timeline</li>
                <li>• Disruptive behavior may lead to suspension of credentials</li>
                <li>• Maintain backup of all work throughout the event</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Questions About IPC Guidelines?
          </h3>
          <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
            Contact our organizing committee for any clarifications about International Press Corps requirements and guidelines.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.a
              href="mailto:dna@aghosh.in"
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
              <Mic className="w-5 h-5" />
              <span className="font-medium">Call Us</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  )
}

export default IPCGuidelines
