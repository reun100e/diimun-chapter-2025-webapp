import { useEffect, useState, Suspense, lazy } from 'react'
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

  // Loading component for lazy-loaded pages
  const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading page...</p>
      </div>
    </div>
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
      {renderPage()}
      <Footer onNavigate={navigateToPage} />
    </div>
  )
}

export default App
