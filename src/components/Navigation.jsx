import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, ASSETS } from '../utils/constants'
import { smoothScrollTo, scrollToElement } from '../animations/parallax'

const Navigation = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar only when scrolled down (50px)
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      if (currentPage === 'home') {
        const sections = ['hero', 'about', 'highlights', 'details', 'register', 'faq']
        const scrollPosition = window.scrollY + 150 // Offset for better detection
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const element = document.getElementById(sections[i])
          if (element) {
            const offsetTop = element.offsetTop
            if (scrollPosition >= offsetTop) {
              setActiveSection(sections[i])
              break
            }
          }
        }
      }
    }

    const handleResize = () => {
      // Close mobile menu on resize to prevent layout issues
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)
    
    // Initial check
    handleScroll()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [currentPage])

  const handleNavigation = (href) => {
    // Close mobile menu first
    setIsMobileMenuOpen(false)
    
    // Check if it's a hash link (section on same page) or a new page
    if (href.startsWith('#')) {
      // If we're not on the home page, navigate to home first, then scroll
      if (currentPage !== 'home') {
        onNavigate('home')
        // Wait for page navigation to complete, then scroll
        setTimeout(() => {
          const isMobile = window.innerWidth < 768
          const offset = isMobile ? 60 : 100
          
          try {
            scrollToElement(href, offset)
          } catch (error) {
            console.warn('scrollToElement failed, using fallback:', error)
            smoothScrollTo(href, offset)
          }
        }, 300) // Increased delay to allow page navigation
      } else {
        // We're already on home page, just scroll to section
        setTimeout(() => {
          const isMobile = window.innerWidth < 768
          const offset = isMobile ? 60 : 100
          
          try {
            scrollToElement(href, offset)
          } catch (error) {
            console.warn('scrollToElement failed, using fallback:', error)
            smoothScrollTo(href, offset)
          }
        }, 150)
      }
    } else {
      // Handle page navigation
      const page = href.substring(1) // Remove the leading slash
      onNavigate(page)
      
      // Special case: Schedule page should scroll to timeline section
      if (page === 'schedule') {
        setTimeout(() => {
          const isMobile = window.innerWidth < 768
          const offset = isMobile ? 100 : 100
          
          try {
            scrollToElement('#timeline', offset)
          } catch (error) {
            console.warn('scrollToElement failed for timeline, using fallback:', error)
            smoothScrollTo('#timeline', offset)
          }
        }, 500) // Wait for page to load and render
      }
    }
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
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation('#hero')}
            className="flex items-center space-x-4 cursor-pointer"
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
            {NAV_LINKS.filter(link => link.href !== '#register').map((link) => {
              // Check if link is active based on current page or current section
              const isActive = link.href.startsWith('#') 
                ? (currentPage === 'home' && link.href === `#${activeSection}`)
                : (link.href === `/${currentPage}`)
              return (
                <motion.button
                  key={link.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation(link.href)}
                  className={`font-semibold transition-all duration-300 hover:scale-105 ${
                    isScrolled 
                      ? `text-slate-700 hover:text-midnight-800 ${isActive ? 'text-emerald-600' : ''}` 
                      : `text-pearl-100 hover:text-gold-300 ${isActive ? 'text-gold-300' : ''}`
                  }`}
                >
                  {link.label}
                </motion.button>
              )
            })}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('#register')}
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
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center relative">
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 0 : -4
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-6 h-0.5 bg-current absolute"
              />
              <motion.span
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                  scale: isMobileMenuOpen ? 0.8 : 1
                }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="w-6 h-0.5 bg-current absolute"
              />
              <motion.span
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? 0 : 4
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-6 h-0.5 bg-current absolute"
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
                {NAV_LINKS.filter(link => link.href !== '#register').map((link) => {
                  // Check if link is active based on current page or current section
                  const isActive = link.href.startsWith('#') 
                    ? (currentPage === 'home' && link.href === `#${activeSection}`)
                    : (link.href === `/${currentPage}`)
                  return (
                    <motion.button
                      key={link.href}
                      whileHover={{ x: 10 }}
                      onClick={() => handleNavigation(link.href)}
                      className={`text-left font-semibold py-3 transition-all duration-300 hover:scale-105 ${
                        isActive 
                          ? 'text-emerald-600' 
                          : 'text-slate-700 hover:text-midnight-800'
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  )
                })}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleNavigation('#register')}
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
