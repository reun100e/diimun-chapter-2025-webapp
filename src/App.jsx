import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Components
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import WhyJoin from './components/WhyJoin'
import EventHighlights from './components/EventHighlights'
import EventDetails from './components/EventDetails'
import RegistrationForm from './components/RegistrationForm'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

// New Page Components
import Schedule from './components/pages/Schedule'
import Guidelines from './components/pages/Guidelines'
import Awards from './components/pages/Awards'
import Terms from './components/pages/Terms'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    })

    // Handle browser navigation (back/forward buttons)
    const handlePopState = () => {
      const path = window.location.pathname
      setCurrentPage(path === '/' ? 'home' : path.substring(1))
    }

    // Listen for popstate events
    window.addEventListener('popstate', handlePopState)

    // Set initial page based on URL
    handlePopState()

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  // Function to handle page navigation
  const navigateToPage = (page) => {
    setCurrentPage(page)
    // Update browser URL without page reload
    const url = page === 'home' ? '/' : `/${page}`
    window.history.pushState({ page }, '', url)
  }

  // Render the appropriate page
  const renderPage = () => {
    switch(currentPage) {
      case 'schedule':
        return <Schedule />
      case 'guidelines':
        return <Guidelines />
      case 'awards':
        return <Awards />
      case 'terms':
        return <Terms />
      case 'home':
      default:
        return (
          <main className="overflow-x-hidden">
            <Hero />
            <About />
            <EventHighlights />
            <WhyJoin />
            <EventDetails />
            <section id="register">
              <RegistrationForm />
            </section>
            <section id="faq">
              <FAQ />
            </section>
          </main>
        )
    }
  }

  return (
    <div className="min-h-screen bg-pearl-50 overflow-x-hidden">
      <Navigation onNavigate={navigateToPage} currentPage={currentPage} />
      {renderPage()}
      <Footer onNavigate={navigateToPage} />
    </div>
  )
}

export default App
