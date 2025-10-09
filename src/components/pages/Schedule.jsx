import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  Calendar, 
  MapPin, 
  Users, 
  Coffee, 
  Utensils, 
  Award, 
  FileText,
  CheckCircle,
  AlertCircle,
  Play,
  Flag,
  Info,
  List,
  Music
} from 'lucide-react'
import { EVENT_SCHEDULE, CONTACT_INFO } from '../../utils/content'

const Schedule = () => {
  const [activeView, setActiveView] = useState('timeline')
  const eventSchedule = EVENT_SCHEDULE.timeline

  // Auto-scroll on page load to reveal navigation
  useEffect(() => {
    const scrollToRevealNav = () => {
      // Detect if mobile or desktop
      const isMobile = window.innerWidth < 768
      const scrollAmount = isMobile ? 250 : 150

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

  const getIconComponent = (iconName) => {
    const iconMap = {
      'Users': Users,
      'Play': Play,
      'Coffee': Coffee,
      'Utensils': Utensils,
      'FileText': FileText,
      'Award': Award,
      'Flag': Flag,
      'Music': Music,
      'Clock': Clock
    }
    const IconComponent = iconMap[iconName] || Clock
    return <IconComponent className="w-5 h-5" />
  }

  const getEventType = (event) => {
    const title = event.title.toLowerCase()
    
    if (title.includes('break') || title.includes('lunch') || title.includes('tea')) {
      return { type: 'break', color: 'amber' }
    } else if (title.includes('registration') || title.includes('reporting')) {
      return { type: 'registration', color: 'blue' }
    } else if (title.includes('award') || title.includes('ceremony') || title.includes('cultural') || title.includes('dj')) {
      return { type: 'ceremony', color: 'purple' }
    } else if (title.includes('submission') || title.includes('deadline')) {
      return { type: 'deadline', color: 'red' }
    } else {
      return { type: 'session', color: 'slate' }
    }
  }

  const getEventColor = (event) => {
    const eventType = getEventType(event)
    
    const colorSchemes = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-600', text: 'text-blue-700', icon: 'bg-blue-100', iconText: 'text-blue-700' },
      slate: { bg: 'bg-slate-50', border: 'border-slate-600', text: 'text-slate-700', icon: 'bg-slate-100', iconText: 'text-slate-700' },
      amber: { bg: 'bg-amber-50', border: 'border-amber-600', text: 'text-amber-700', icon: 'bg-amber-100', iconText: 'text-amber-700' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-600', text: 'text-purple-700', icon: 'bg-purple-100', iconText: 'text-purple-700' },
      red: { bg: 'bg-red-50', border: 'border-red-600', text: 'text-red-700', icon: 'bg-red-100', iconText: 'text-red-700' }
    }
    
    return colorSchemes[eventType.color]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Compact Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Event Schedule</h1>
            <p className="text-base text-blue-100">DIIMUN 2025 • {EVENT_SCHEDULE.date}</p>
          </motion.div>

          {/* Quick Info Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 flex flex-wrap justify-center gap-4 text-sm"
          >
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4" />
              <span>{EVENT_SCHEDULE.venue}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Clock className="w-4 h-4" />
              <span>8:00 AM - 7:00 PM+</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Users className="w-4 h-4" />
              <span>Floor 3, Lecture Hall 3 & 4</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-full p-1 shadow-lg inline-flex">
            <button
              onClick={() => setActiveView('timeline')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeView === 'timeline'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <List className="w-4 h-4" />
                Timeline
              </span>
            </button>
            <button
              onClick={() => setActiveView('quick')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeView === 'quick'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Quick View
              </span>
            </button>
            <button
              onClick={() => setActiveView('important')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeView === 'important'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                Important
              </span>
            </button>
          </div>
        </motion.div>

        {/* Content Views */}
        <AnimatePresence mode="wait">
          {activeView === 'timeline' && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl mx-auto"
            >
              {/* Professional Timeline */}
              <div className="space-y-3">
                {eventSchedule.map((event, index) => {
                  const colors = getEventColor(event)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="bg-white border-l-4 border-slate-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start gap-4 p-4">
                        {/* Time & Icon */}
                        <div className="flex-shrink-0 text-center">
                          <div className={`${colors.icon} w-11 h-11 rounded-lg flex items-center justify-center mb-1.5`}>
                            <div className={colors.iconText}>
                              {getIconComponent(event.icon)}
                            </div>
                          </div>
                          <div className="text-xs font-bold text-slate-700">
                            {event.time}
                          </div>
                          {event.duration && (
                            <div className="text-xs text-gray-500 mt-0.5">
                              {event.duration}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-slate-800 mb-1.5 text-base">
                            {event.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {event.description}
                          </p>
                          {event.note && (
                            <div className="mt-3 p-2.5 bg-amber-50 border-l-2 border-amber-500 rounded text-xs text-amber-800">
                              <div className="flex items-start gap-2">
                                <AlertCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                                <span>{event.note}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {activeView === 'quick' && (
            <motion.div
              key="quick"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {/* Compact Table View */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Time</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Event</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider hidden md:table-cell">Duration</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider hidden lg:table-cell">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {eventSchedule.map((event, index) => {
                        const colors = getEventColor(event)
                        return (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="px-4 py-3 whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <div className={`${colors.icon} w-8 h-8 rounded flex items-center justify-center flex-shrink-0`}>
                                  <div className={`${colors.iconText} scale-75`}>
                                    {getIconComponent(event.icon)}
                                  </div>
                                </div>
                                <span className="font-semibold text-slate-800 text-sm">{event.time}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="font-medium text-slate-800 text-sm">{event.title}</div>
                              <div className="text-xs text-gray-500 mt-0.5 lg:hidden">{event.duration}</div>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">
                              {event.duration}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600 hidden lg:table-cell max-w-md">
                              <p className="line-clamp-2">{event.description}</p>
                            </td>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              
            </motion.div>
          )}

          {activeView === 'important' && (
            <motion.div
              key="important"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto space-y-5"
            >
              {/* Key Deadlines */}
              <div className="bg-white border-l-4 border-red-600 rounded-lg shadow-md p-5">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Critical Deadlines
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="text-slate-600 text-xs font-medium mb-1 uppercase tracking-wide">Registration</div>
                    <div className="text-xl font-bold text-slate-800">{EVENT_SCHEDULE.registrationDeadline}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="text-slate-600 text-xs font-medium mb-1 uppercase tracking-wide">Committee Changes</div>
                    <div className="text-xl font-bold text-slate-800">{EVENT_SCHEDULE.committeeChangeDeadline}</div>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="text-slate-600 text-xs font-medium mb-1 uppercase tracking-wide">IP Submissions</div>
                    <div className="text-xl font-bold text-slate-800">3:00 PM</div>
                    <div className="text-xs text-slate-500 mt-0.5">Event Day</div>
                  </div>
                </div>
              </div>

              {/* Must Know */}
              <div className="grid md:grid-cols-2 gap-5">
                <div className="bg-white rounded-lg shadow-md p-5 border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-base">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    Registration Checklist
                  </h4>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs">✓</span>
                      </div>
                      <span>Report by 8:00 AM sharp</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs">✓</span>
                      </div>
                      <span>Valid College ID</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs">✓</span>
                      </div>
                      <span>MUN Registration Confirmation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs">✓</span>
                      </div>
                      <span>Formal Western Business Attire</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-5 border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-base">
                    <Coffee className="w-5 h-5 text-amber-600" />
                    Breaks & Meals
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="font-medium text-slate-700">Tea Break</span>
                      <span className="text-slate-800 font-bold">10:30 AM</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <span className="font-medium text-slate-700">Lunch</span>
                      <span className="text-slate-800 font-bold">12:30 PM</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-3 px-1">
                      All meals and refreshments provided by organizing committee
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-slate-800 rounded-lg p-5 text-white shadow-md">
                <h4 className="font-bold mb-3 text-base">Need Assistance?</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg transition-colors text-sm border border-white/20"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{CONTACT_INFO.email}</span>
                  </a>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-lg transition-colors text-sm border border-white/20"
                  >
                    <Clock className="w-4 h-4" />
                    <span>{CONTACT_INFO.phone}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Schedule