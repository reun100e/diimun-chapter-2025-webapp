import React from 'react'
import { motion } from 'framer-motion'
import { EVENT_INFO, ASSETS } from '../utils/constants'
import { Calendar, MapPin, Target, BookOpen, ChevronDown } from 'lucide-react'
import { smoothScrollTo } from '../animations/parallax'

const Hero = () => {
  const scrollToAbout = () => {
    smoothScrollTo('#about', 100)
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Gradient */}
      <div className="absolute inset-0 gradient-bg-hero"></div>
      
      {/* Enhanced overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"></div>
      
      {/* DNA Logo Background Element */}
      <motion.div
        animate={{ 
          rotate: [0, 5, -5, 0],
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10"
      >
        <img 
          src={ASSETS.dnaLogo} 
          alt="DNA Logo Background" 
          className="w-full h-full object-contain filter blur-xs"
        />
      </motion.div>
      
        {/* Enhanced Animated Background Patterns */}
        <div className="absolute inset-0 opacity-15">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 80, repeat: Infinity, ease: 'linear' },
              scale: { duration: 12, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="absolute top-1/4 left-1/4 w-80 h-80 border-2 border-gold-400/30 rounded-full"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1.1, 1, 1.1]
            }}
            transition={{ 
              rotate: { duration: 100, repeat: Infinity, ease: 'linear' },
              scale: { duration: 15, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="absolute top-3/4 right-1/4 w-64 h-64 border border-copper-400/25 rounded-full"
          />
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            className="absolute top-1/2 right-1/6 w-40 h-40 bg-gradient-to-br from-cognac-500/20 to-gold-500/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ 
              rotate: 180,
              scale: [0.8, 1.3, 0.8]
            }}
            transition={{ 
              rotate: { duration: 120, repeat: Infinity, ease: 'linear' },
              scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="absolute bottom-1/4 left-1/6 w-56 h-56 border border-midnight-300/20 rounded-full"
          />
        </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Collaboration Text */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-accent text-gold-300 mb-6 tracking-wider pt-4"
          >
            Doctors Nexus Amity (DNA) in collaboration with GHMCT presents an Expranza exclusive
          </motion.p>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="heading-display text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight"
          >
            <div className="space-y-2">
              <span className="block gradient-text-elegant text-5xl md:text-7xl lg:text-8xl leading-none">
                Doctors Integrated
              </span>
              <span className="block gradient-text-gold text-5xl md:text-7xl lg:text-8xl leading-none">
                International Model
              </span>
              <span className="block text-pearl-100 text-5xl md:text-7xl lg:text-8xl leading-none">
                United Nations
              </span>
            </div>
          </motion.h1>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-12"
          >
            {/* <h2 className="heading-elegant text-2xl md:text-3xl lg:text-4xl text-cognac-200 mb-6">
              {EVENT_INFO.subtitle}
            </h2> */}
            <p className="text-lg md:text-xl lg:text-2xl text-pearl-200 font-light mb-8 max-w-4xl mx-auto leading-relaxed">
              {EVENT_INFO.tagline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base md:text-lg">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="card-glass px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-2 sm:gap-4 backdrop-blur-md"
              >
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-gold-300" />
                <span className="font-semibold text-gold-200">{EVENT_INFO.date}</span>
              </motion.div>
              <motion.a
                href="https://maps.google.com/?q=GHMC+Trivandrum"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="card-glass px-4 py-3 sm:px-6 sm:py-4 flex items-center gap-2 sm:gap-4 backdrop-blur-md cursor-pointer hover:bg-white/20 transition-all duration-300"
              >
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-copper-300" />
                <span className="font-semibold text-copper-200">GHMC Trivandrum</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScrollTo('#register', 100)}
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-semibold py-4 px-10 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-emerald-500/25 text-lg min-w-[280px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                <Target className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Register Now</span>
              </span>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => smoothScrollTo('#highlights', 100)}
              className="group relative overflow-hidden border-2 border-white/30 text-pearl-100 hover:text-white font-semibold py-4 px-10 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-lg hover:shadow-white/10 text-lg min-w-[280px] backdrop-blur-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                <BookOpen className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Choose Committee</span>
              </span>
            </motion.button>

          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex flex-col items-center"
          >
            <p className="text-accent text-cognac-300 mb-4">Scroll to explore</p>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-10 h-10 border-2 border-gold-400/60 rounded-full flex justify-center items-center relative overflow-hidden"
            >
              <ChevronDown className="w-5 h-5 text-gold-400" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-400/10 to-transparent animate-pulse-soft"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
        className="absolute top-24 left-12 w-24 h-24 bg-gradient-to-br from-gold-400/30 to-copper-400/30 rounded-full blur-lg animate-float"
      />
      <motion.div
        animate={{ 
          y: [0, -25, 0],
          rotate: [0, -12, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: 1.5
        }}
        className="absolute bottom-40 right-20 w-20 h-20 bg-gradient-to-br from-cognac-400/25 to-midnight-400/25 rounded-full blur-lg animate-float"
      />
      <motion.div
        animate={{ 
          y: [0, -18, 0],
          x: [0, 10, 0],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: 'easeInOut',
          delay: 3
        }}
        className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-pearl-400/20 to-gold-400/20 rounded-full blur-md animate-float"
      />
    </section>
  )
}

export default Hero
