import { useEffect, useState, Suspense, lazy } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import SEO from './components/common/SEO'
import { ASSETS } from './utils/constants'

// Lazy load page components for better performance
const Schedule = lazy(() => import('./components/pages/Schedule'))
const Awards = lazy(() => import('./components/pages/Awards'))
const Terms = lazy(() => import('./components/pages/Terms'))
const TechnologyPolicy = lazy(() => import('./components/pages/TechnologyPolicy'))
const RegistrationGuide = lazy(() => import('./components/pages/RegistrationGuide'))
const IPCSubmission = lazy(() => import('./components/pages/IPCSubmission'))

// Committee-specific guideline pages
const WHOCommitteeGuidelines = lazy(() => import('./components/pages/WHOCommitteeGuidelines'))
const GreatAssemblyGuidelines = lazy(() => import('./components/pages/GreatAssemblyGuidelines'))
const IPCGuidelines = lazy(() => import('./components/pages/IPCGuidelines'))

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
      // Scroll to top when using browser back/forward buttons
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      })
      
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
    // Scroll to top immediately when navigating to any page
    window.scrollTo({
      top: 0,
      behavior: 'instant' // Instant scroll to top, no smooth animation
    })
    
    setCurrentPage(page)
    // Update browser URL without page reload
    const url = page === 'home' ? '/' : `/${page}`
    window.history.pushState({ page }, '', url)
  }

  // Loading component for lazy-loaded pages with DNA logo
  const PageLoader = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pearl-50 via-cognac-50 to-midnight-50"
    >
      <div className="text-center">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mx-auto mb-6"
        >
          <img 
            src={ASSETS.dnaLogo} 
            alt="DNA Logo" 
            className="w-24 h-24 mx-auto"
          />
        </motion.div>
        <motion.p
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-cognac-600 font-medium text-lg"
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  )

  // Render the appropriate page
  const renderPage = () => {
    switch(currentPage) {
      case 'schedule':
        return (
          <Suspense fallback={<PageLoader />}>
            <Schedule />
          </Suspense>
        )
      case 'awards':
        return (
          <Suspense fallback={<PageLoader />}>
            <Awards />
          </Suspense>
        )
      case 'terms':
        return (
          <Suspense fallback={<PageLoader />}>
            <Terms />
          </Suspense>
        )
      case 'technology-policy':
        return (
          <Suspense fallback={<PageLoader />}>
            <TechnologyPolicy />
          </Suspense>
        )
      case 'registration-guide':
        return (
          <Suspense fallback={<PageLoader />}>
            <RegistrationGuide />
          </Suspense>
        )
      case 'who-committee-guidelines':
        return (
          <Suspense fallback={<PageLoader />}>
            <WHOCommitteeGuidelines />
          </Suspense>
        )
      case 'great-assembly-guidelines':
        return (
          <Suspense fallback={<PageLoader />}>
            <GreatAssemblyGuidelines />
          </Suspense>
        )
      case 'ipc-guidelines':
        return (
          <Suspense fallback={<PageLoader />}>
            <IPCGuidelines />
          </Suspense>
        )
      case 'ipc-submission':
        return (
          <Suspense fallback={<PageLoader />}>
            <IPCSubmission />
          </Suspense>
        )
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
      <SEO page={currentPage} />
      <Navigation onNavigate={navigateToPage} currentPage={currentPage} />
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
      <Footer onNavigate={navigateToPage} />
    </div>
  )
}

export default App
