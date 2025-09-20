import React from 'react'
import { motion } from 'framer-motion'
import { BENEFITS } from '../utils/constants'
import { smoothScrollTo } from '../animations/parallax'
import { 
  User, 
  Zap, 
  MessageSquare, 
  BookOpen, 
  Users, 
  GraduationCap,
  Award,
  Globe,
  Heart,
  Lightbulb,
  Target,
  Mail,
  Calendar,
  Handshake
} from 'lucide-react'

const WhyJoin = () => {
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
    <section id="why-join" className="section-padding bg-white">
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
            Why Join DIIMUN?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the unique opportunities and benefits that await you in this groundbreaking homoeopathic MUN experience
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-midnight-600 to-cognac-600 mx-auto rounded-full mt-6"></div>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="card p-8 text-center group cursor-pointer"
            >
              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-midnight-600 to-cognac-600 text-white shadow-medium"
              >
                {(() => {
                  const IconComponent = iconMap[benefit.icon]
                  return IconComponent ? <IconComponent className="w-8 h-8" /> : <Users className="w-8 h-8" />
                })()}
              </motion.div>
              
              {/* Title */}
              <h3 className="text-xl font-bold text-midnight-800 mb-4 group-hover:text-midnight-900 transition-colors duration-300">
                {benefit.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {benefit.description}
              </p>

              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-midnight-50/0 to-cognac-50/0 group-hover:from-midnight-50/50 group-hover:to-cognac-50/50 rounded-2xl transition-all duration-300 -z-10"></div>
            </motion.div>
          ))}
        </div>

        {/* Special Training Program Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-midnight-800 to-cognac-700 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 border border-white/20 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 border border-white/20 rounded-full translate-x-20 translate-y-20"></div>
            </div>
            
            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-gold-500 to-copper-500 text-white shadow-strong"
              >
                <GraduationCap className="w-10 h-10" />
              </motion.div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                FREE Online Training Program
              </h3>
              
              <p className="text-lg md:text-xl text-cognac-100 mb-6 max-w-2xl mx-auto">
                Enhance your communication skills with our comprehensive training program that dives deep into effective communication strategies - completely free for all participants!
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-midnight-800 font-bold py-3 px-8 rounded-full hover:bg-cognac-50 transition-colors duration-300"
              >
                Learn More About Training
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-6">
            Ready to Make Your Mark?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join fellow homoeopathy enthusiasts in this unique intellectual journey where tradition meets innovation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScrollTo('#highlights', 100)}
              className="btn-primary"
            >
              Explore Event Highlights
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScrollTo('#register', 100)}
              className="btn-secondary"
            >
              Register Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyJoin
