import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, ASSETS } from '../utils/constants'
import { smoothScrollTo } from '../animations/parallax'

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only when scrolled down (50px)
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href) => {
    smoothScrollTo(href, 100)
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ 
        y: isScrolled ? 0 : -100,
        opacity: isScrolled ? 1 : 0
      }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-strong border-b border-pearl-200/50' 
          : 'bg-transparent pointer-events-none'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-4"
          >
            <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-medium bg-white p-1">
              <img 
                src={ASSETS.dnaLogo} 
                alt="DNA Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-sx font-bold text-accent">
                <span className="block">Doctors Integrated</span>
                <span className="block">International MUN</span>
              </h1>
              <p className="text-slate-500 text-xs">powered by DNA</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <motion.button
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(link.href)}
                className={`font-semibold transition-all duration-300 hover:scale-105 ${
                  isScrolled 
                    ? 'text-slate-700 hover:text-midnight-800' 
                    : 'text-pearl-100 hover:text-gold-300'
                }`}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('#register')}
              className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Register Now</span>
            </motion.button>
          </div>
          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-3 rounded-2xl transition-all duration-300 ${
              isScrolled 
                ? 'text-slate-700 hover:bg-pearl-100' 
                : 'text-pearl-100 hover:bg-white/10'
            }`}
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 8 : 0
                }}
                className="w-6 h-0.5 bg-current transform origin-center transition-all duration-200"
              />
              <motion.span
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1
                }}
                className="w-6 h-0.5 bg-current transition-all duration-200"
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0
                }}
                className="w-6 h-0.5 bg-current transform origin-center transition-all duration-200"
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/98 backdrop-blur-xl border-t border-pearl-300/50 shadow-strong"
          >
            <div className="container-custom py-4">
              <div className="flex flex-col space-y-4">
                {NAV_LINKS.map((link) => (
                  <motion.button
                    key={link.href}
                    whileHover={{ x: 10 }}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left text-slate-700 hover:text-midnight-800 font-semibold py-3 transition-all duration-300 hover:scale-105"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('#register')}
                  className="group relative overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 mt-4 w-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Register Now</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navigation
