import React, { useEffect } from 'react'
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

function App() {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    })
  }, [])

  return (
    <div className="min-h-screen bg-pearl-50 overflow-x-hidden">
      <Navigation />
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
      <Footer />
    </div>
  )
}

export default App
