import React from 'react'
import { motion } from 'framer-motion'
import { EVENT_INFO, ASSETS } from '../utils/constants'
import { EVENT_SCHEDULE } from '../utils/content'
import { smoothScrollTo } from '../animations/parallax'
import { Phone, Calendar, Clock, Shirt, Laptop, Award, Users, AlertTriangle, CheckCircle, FileText } from 'lucide-react'

const EventDetails = () => {
  return (
    <section id="details" className="section-padding bg-gradient-to-br from-midnight-50 to-cognac-50">
      <div className="container-custom">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Event Guidelines
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know before joining this groundbreaking experience
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-midnight-600 to-cognac-600 mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Committee Guidelines Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-3 gap-6">

            {/* IPC */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              onClick={() => window.location.href = '/ipc-guidelines'}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-15 group-hover:opacity-20 transition-opacity duration-500">
                <img 
                  src={ASSETS.ipcImage} 
                  alt="IPC Background" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-purple-800/70 to-purple-900/80 group-hover:from-purple-900/60 group-hover:via-purple-800/50 group-hover:to-purple-900/60 transition-all duration-500"></div>

              {/* Content */}
              <div className="relative z-10 p-6 text-white min-h-[220px] flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-purple-600/90 backdrop-blur-sm">
                    <FileText className="w-3 h-3" />
                    Media Committee
                  </div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">International Press Corps</h4>
                  <p className="text-gray-200 text-sm leading-relaxed mb-4">
                    Media coverage & documentation
                  </p>
                </div>
                
                {/* Clear CTA Button */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg border border-white/20 transition-all duration-300"
                >
                  <span>View Guidelines</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>
            
            {/* WHO Committee */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              onClick={() => window.location.href = '/who-committee-guidelines'}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-15 group-hover:opacity-20 transition-opacity duration-500">
                <img 
                  src={ASSETS.whoLogo} 
                  alt="WHO Background" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-midnight-900/80 via-midnight-800/70 to-midnight-900/80 group-hover:from-midnight-900/60 group-hover:via-midnight-800/50 group-hover:to-midnight-900/60 transition-all duration-500"></div>

              {/* Content */}
              <div className="relative z-10 p-6 text-white min-h-[220px] flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-midnight-600/90 backdrop-blur-sm">
                    <Users className="w-3 h-3" />
                    General Committee
                  </div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">WHO Committee</h4>
                  <p className="text-gray-200 text-sm leading-relaxed mb-4">
                    Global healthcare policy discussions
                  </p>
                </div>
                
                {/* Clear CTA Button */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg border border-white/20 transition-all duration-300"
                >
                  <span>View Guidelines</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

            {/* Great Assembly */}
            <motion.div
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
              onClick={() => window.location.href = '/great-assembly-guidelines'}
            >
              {/* Background Image */}
              <div className="absolute inset-0 opacity-15 group-hover:opacity-20 transition-opacity duration-500">
                <img 
                  src={ASSETS.greatAssemblyImage} 
                  alt="Great Assembly Background" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cognac-900/80 via-cognac-800/70 to-cognac-900/80 group-hover:from-cognac-900/60 group-hover:via-cognac-800/50 group-hover:to-cognac-900/60 transition-all duration-500"></div>

              {/* Content */}
              <div className="relative z-10 p-6 text-white min-h-[220px] flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4 bg-cognac-600/90 backdrop-blur-sm">
                    <Award className="w-3 h-3" />
                    Exclusive Committee
                  </div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">The Great Homoeopathic Assembly</h4>
                  <p className="text-gray-200 text-sm leading-relaxed mb-4">
                    Philosophical discussions as masters
                  </p>
                </div>
                
                {/* Clear CTA Button */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg border border-white/20 transition-all duration-300"
                >
                  <span>View Guidelines</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </motion.div>


        {/* Organizer Info - Subtle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/40 shadow-sm">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-white shadow-sm p-1.5">
                  <img 
                    src={ASSETS.dnaLogo} 
                    alt="DNA Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Organized by</p>
                  <p className="text-sm font-semibold text-gray-700">Doctors Nexus Amity (DNA)</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-gray-300"></div>
              <p className="text-sm text-gray-600">
                Advancing medical education and fostering meaningful discourse
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-midnight-800 to-cognac-700 rounded-2xl p-8 text-white shadow-lg">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Participate?
            </h3>
            <p className="text-cognac-100 mb-6 max-w-2xl mx-auto">
              Register now or contact us for any questions about the event
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => smoothScrollTo('#register', 100)}
                className="bg-white text-midnight-800 font-semibold py-3 px-8 rounded-full hover:bg-cognac-50 transition-colors duration-300"
              >
                Register Now
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+919442308824"
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white/10 transition-colors duration-300 inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Contact Us
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EventDetails
