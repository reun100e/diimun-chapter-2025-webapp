import React from 'react'
import { motion } from 'framer-motion'
import { EVENT_INFO, ASSETS } from '../utils/constants'
import { smoothScrollTo } from '../animations/parallax'
import { Phone, MapPin, Calendar } from 'lucide-react'

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
            Get Ready to Participate
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know before joining this groundbreaking experience
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-midnight-600 to-cognac-600 mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Organizer Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 shadow-2xl border border-white/20"
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-6">
              Organized by DNA
            </h3>
            <div className="flex justify-center mb-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-24 h-24 rounded-2xl overflow-hidden bg-white shadow-strong p-3"
              >
                <img 
                  src={ASSETS.dnaLogo} 
                  alt="DNA Logo" 
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </div>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto">
              Doctors Nexus Amity (DNA) is committed to advancing homoeopathic education and fostering meaningful discourse within the community.
            </p>
          </div>
        </motion.div>

        {/* Essential FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 mb-16 shadow-2xl border border-white/20"
        >
          <h3 className="text-2xl md:text-3xl font-bold gradient-text text-center mb-8">
            Quick Answers
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-midnight-50 to-cognac-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-midnight-800 mb-3">
                  Team Format?
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Teams of 2 required. No limit per institution, but Great Homoeopathic Assembly has limited spots.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-midnight-50 to-cognac-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-midnight-800 mb-3">
                  Free Workshop?
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  3-day "Art of Communication" workshop plus competition format explanation - completely FREE!
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-midnight-50 to-cognac-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-midnight-800 mb-3">
                  Committee Choice?
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  WHO Committee for global healthcare debates or Great Homoeopathic Assembly for philosophical discussions.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-midnight-50 to-cognac-50 rounded-2xl p-6">
                <h4 className="text-lg font-semibold text-midnight-800 mb-3">
                  How it Works?
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Role-play as legendary stalwarts, debate contemporary issues, and shape the event flow through participation.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-midnight-800 to-cognac-700 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              Ready to Join the Conversation?
            </h3>
            <p className="text-lg text-cognac-200 mb-8 max-w-2xl mx-auto">
              Have questions? Need clarification? Our team is here to help you prepare for this unique experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+919442308824"
                className="bg-white text-midnight-800 font-bold py-3 px-8 rounded-full hover:bg-cognac-50 transition-colors duration-300 inline-flex items-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Contact Us</span>
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => smoothScrollTo('#register', 100)}
                className="border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors duration-300"
              >
                Register Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EventDetails
