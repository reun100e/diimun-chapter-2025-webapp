import React from 'react'
import { motion } from 'framer-motion'
import { STALWARTS, EVENT_INFO, BENEFITS } from '../utils/constants'
import { Users, Zap, MessageSquare, GraduationCap, BookOpen, Handshake } from 'lucide-react'

const About = () => {
  const keyBenefits = BENEFITS.slice(0, 4) // Take first 4 benefits

  // Icon mapping for benefits
  const iconMap = {
    Users,
    Zap,
    MessageSquare,
    GraduationCap,
    BookOpen,
    Handshake
  }

  return (
    <section id="about" className="section-padding bg-white">
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
            {EVENT_INFO.subtitle}
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            {EVENT_INFO.tagline}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-midnight-600 to-cognac-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Main Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8">
            <span className="font-bold gradient-text">DNA</span> presents an <span className="font-bold gradient-text-gold">ESPERANZA 4.0 exclusive</span> - a comprehensive elocution cum debate competition where you embody legendary homoeopathic stalwarts and shape the future of healthcare discourse.
          </p>
          <div className="bg-gradient-to-r from-midnight-50 to-cognac-50 rounded-2xl p-6 md:p-8">
            <p className="text-lg md:text-xl text-slate-700 font-medium">
              Join us on <span className="font-bold gradient-text">{EVENT_INFO.date}</span> to voice your opinions and unearth hidden philosophies in our debate committees.
            </p>
          </div>
        </motion.div>

        {/* Key Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {keyBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="card p-6 text-center group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-midnight-600 to-cognac-600 text-white shadow-medium"
              >
                {(() => {
                  const IconComponent = iconMap[benefit.icon]
                  return IconComponent ? <IconComponent className="w-6 h-6" /> : <Users className="w-6 h-6" />
                })()}
              </motion.div>
              <h3 className="text-lg font-bold text-midnight-800 mb-3 group-hover:text-midnight-900 transition-colors duration-300">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Featured Stalwarts - Auto-scrolling carousel - Full width */}
      <div className="bg-gradient-to-r from-cognac-50 via-white to-cognac-50 py-16 full-width-section">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-8">
              Channel the Wisdom of the Masters
            </h3>
          </motion.div>
        </div>
        
        {/* Auto-scrolling container - Full viewport width */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll gap-10 py-4 px-6 sm:px-8 lg:px-12">
              {/* First set of stalwarts */}
              {STALWARTS.map((stalwart, index) => (
                <motion.div
                  key={`first-${stalwart.name}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="group cursor-pointer flex-shrink-0"
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden shadow-medium group-hover:shadow-glow transition-all duration-500">
                    <img 
                      src={stalwart.image} 
                      alt={`Portrait of ${stalwart.name}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-cognac-600 mb-1 group-hover:text-midnight-900 transition-colors duration-300">
                    {stalwart.name.split(' ')[0]}
                  </h4>
                  {/* <p className="text-xs text-cognac-600 font-semibold">
                    {stalwart.period}
                  </p> */}
                </motion.div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {STALWARTS.map((stalwart, index) => (
                <motion.div
                  key={`second-${stalwart.name}`}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="group cursor-pointer flex-shrink-0"
                >
                  <div className="w-32 h-32 mx-auto mb-4 rounded-2xl overflow-hidden shadow-medium group-hover:shadow-glow transition-all duration-500">
                    <img 
                      src={stalwart.image} 
                      alt={`Portrait of ${stalwart.name}`}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-cognac-600 mb-1 group-hover:text-midnight-900 transition-colors duration-300">
                    {stalwart.name.split(' ')[0]}
                  </h4>
                  {/* <p className="text-xs text-cognac-600 font-semibold">
                    {stalwart.period}
                  </p> */}
                </motion.div>
              ))}
            </div>
        </div>
      </div>
    </section>
  )
}

export default About
