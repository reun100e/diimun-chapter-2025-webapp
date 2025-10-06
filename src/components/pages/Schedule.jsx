import React from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Calendar, 
  MapPin, 
  Users, 
  Coffee, 
  Utensils, 
  Award, 
  FileText,
  Camera,
  Mic,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

const Schedule = () => {
  const eventSchedule = [
    {
      time: "8:00 AM",
      title: "Registration & Reporting",
      description: "All delegates must report to the registration desk",
      icon: <Users className="w-6 h-6" />,
      type: "registration",
      requirements: [
        "Valid college ID card",
        "Aadhar card", 
        "MUN registration confirmation"
      ],
      note: "Late arrivals may not be permitted entry"
    },
    {
      time: "9:00 AM",
      title: "Event Start",
      description: "Welcome address and event briefing",
      icon: <Mic className="w-6 h-6" />,
      type: "session",
      requirements: [
        "MUN Delegate ID (provided at registration)",
        "Formal attire mandatory"
      ]
    },
    {
      time: "9:30 AM",
      title: "Committee Sessions Begin",
      description: "WHO Committee and Great Assembly sessions start",
      icon: <Users className="w-6 h-6" />,
      type: "session",
      requirements: [
        "Portfolio research and position papers",
        "Country placard (provided)",
        "Stationery (provided, but delegates can bring their own)"
      ]
    },
    {
      time: "10:30 AM",
      title: "Tea Break",
      description: "10-15 minutes refreshment break",
      icon: <Coffee className="w-6 h-6" />,
      type: "break",
      duration: "10-15 minutes"
    },
    {
      time: "10:45 AM",
      title: "Committee Sessions Resume",
      description: "Continued debate and discussion sessions",
      icon: <Users className="w-6 h-6" />,
      type: "session"
    },
    {
      time: "12:30 PM",
      title: "Lunch Break",
      description: "1 hour lunch break with provided meals",
      icon: <Utensils className="w-6 h-6" />,
      type: "break",
      duration: "1 hour",
      note: "Lunch and refreshments provided by organizing committee"
    },
    {
      time: "1:30 PM",
      title: "Afternoon Sessions",
      description: "Final committee sessions and deliberations",
      icon: <Users className="w-6 h-6" />,
      type: "session"
    },
    {
      time: "3:00 PM",
      title: "IPC Submissions Deadline",
      description: "International Press Corps submissions due",
      icon: <FileText className="w-6 h-6" />,
      type: "deadline",
      requirements: [
        "Articles in PDF format",
        "Times New Roman, Size 12, Line Spacing 1.15",
        "500-700 words",
        "Chest numbers as filename"
      ]
    },
    {
      time: "3:00 PM",
      title: "Results Finalization",
      description: "Committee results and awards finalized",
      icon: <Award className="w-6 h-6" />,
      type: "deadline"
    },
    {
      time: "4:00 PM",
      title: "Event End",
      description: "Committee sessions conclude",
      icon: <CheckCircle className="w-6 h-6" />,
      type: "end"
    },
    {
      time: "5:00 PM",
      title: "Closing Ceremony & Awards",
      description: "Winners announced and prizes awarded at seminar stage",
      icon: <Award className="w-6 h-6" />,
      type: "ceremony",
      requirements: [
        "All delegates must be present",
        "Award categories: Best Delegate/Reporter/Photographer, High Commendation, Special Mention, Best Delegation"
      ],
      note: "Cash prizes for Best Delegate/Reporter/Photographer and High Commendation"
    }
  ]

  const getTypeColor = (type) => {
    switch (type) {
      case 'registration':
        return 'from-blue-500 to-blue-600'
      case 'session':
        return 'from-green-500 to-green-600'
      case 'break':
        return 'from-orange-500 to-orange-600'
      case 'deadline':
        return 'from-red-500 to-red-600'
      case 'ceremony':
        return 'from-purple-500 to-purple-600'
      case 'end':
        return 'from-gray-500 to-gray-600'
      default:
        return 'from-indigo-500 to-indigo-600'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'registration':
        return <Users className="w-5 h-5" />
      case 'session':
        return <Mic className="w-5 h-5" />
      case 'break':
        return <Coffee className="w-5 h-5" />
      case 'deadline':
        return <AlertCircle className="w-5 h-5" />
      case 'ceremony':
        return <Award className="w-5 h-5" />
      case 'end':
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
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
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-6 py-3 rounded-full font-semibold mb-6">
            <Calendar className="w-6 h-6" />
            Event Schedule
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-midnight-800 to-cognac-600 bg-clip-text text-transparent mb-6">
            DIIMUN 2025 Schedule
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Complete timeline of events for November 4th, 2025. Plan your day and ensure you don't miss any important sessions or deadlines.
          </p>
          <div className="w-32 h-1.5 bg-gradient-to-r from-midnight-600 via-cognac-600 to-gold-500 mx-auto rounded-full shadow-glow mt-8"></div>
        </motion.div>

        {/* Event Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Event Date</h3>
                <p className="text-gray-600">November 4th, 2025</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Venue</h3>
                <p className="text-gray-600">GHMC Trivandrum</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Duration</h3>
                <p className="text-gray-600">9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Schedule Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="space-y-6">
            {eventSchedule.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="relative"
              >
                {/* Timeline Line */}
                {index < eventSchedule.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-20 bg-gradient-to-b from-gray-300 to-gray-200"></div>
                )}

                <div className="flex items-start gap-6">
                  {/* Time Badge */}
                  <div className="flex-shrink-0">
                    <div className={`w-16 h-16 bg-gradient-to-r ${getTypeColor(event.type)} rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                      {event.time}
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${getTypeColor(event.type)} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                        {event.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                          {event.duration && (
                            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                              {event.duration}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{event.description}</p>

                        {/* Requirements */}
                        {event.requirements && event.requirements.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-sm font-semibold text-gray-700 mb-2">Requirements:</h4>
                            <ul className="space-y-1">
                              {event.requirements.map((req, reqIndex) => (
                                <li key={reqIndex} className="flex items-start gap-2 text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Note */}
                        {event.note && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                              <p className="text-yellow-800 text-sm font-medium">{event.note}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Important Reminders */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-2xl p-8"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-red-800 mb-4">Important Reminders</h3>
              <ul className="space-y-3 text-red-700">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Arrive at least 30 minutes before the scheduled start time (8:00 AM)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Keep your MUN Delegate ID visible at all times</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>Formal Western Business Attire is mandatory</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>All devices must be on silent mode during committee sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>No food consumption during ongoing committee sessions</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-16 bg-gradient-to-r from-midnight-800 to-cognac-700 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            Questions About the Schedule?
          </h3>
          <p className="text-lg text-cognac-200 mb-8 max-w-2xl mx-auto">
            If you have any questions about the event schedule or need clarification on any timings, please contact us.
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

export default Schedule
