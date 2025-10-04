// Parallax scroll effects utility functions

export const initParallax = () => {
  const parallaxElements = document.querySelectorAll('.parallax')
  
  const handleScroll = () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * -0.5
    
    parallaxElements.forEach((element) => {
      const speed = element.dataset.speed || 0.5
      const yPos = -(scrolled * speed)
      element.style.transform = `translateY(${yPos}px)`
    })
  }
  
  // Throttle scroll events for better performance
  let ticking = false
  const throttledScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll()
        ticking = false
      })
      ticking = true
    }
  }
  
  window.addEventListener('scroll', throttledScroll)
  
  // Cleanup function
  return () => {
    window.removeEventListener('scroll', throttledScroll)
  }
}

// Intersection Observer for scroll-triggered animations
export const initScrollAnimations = () => {
  const animateElements = document.querySelectorAll('.animate-on-scroll')
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate')
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })
  
  animateElements.forEach((element) => {
    observer.observe(element)
  })
  
  // Cleanup function
  return () => {
    observer.disconnect()
  }
}

// Enhanced smooth scroll utility
export const smoothScrollTo = (targetId, offset = 80) => {
  const target = document.getElementById(targetId.replace('#', ''))
  if (target) {
    // Get the current scroll position
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
    
    // Calculate target position with proper offset
    const targetPosition = target.offsetTop - offset
    
    // Ensure we don't scroll to negative positions
    const finalPosition = Math.max(0, targetPosition)
    
    // Check if browser supports smooth scrolling
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: finalPosition,
        behavior: 'smooth'
      })
    } else {
      // Fallback for browsers that don't support smooth scrolling
      const startPosition = currentScrollY
      const distance = finalPosition - startPosition
      const duration = 800
      let start = null

      const step = (timestamp) => {
        if (!start) start = timestamp
        const progress = Math.min((timestamp - start) / duration, 1)
        const ease = easeInOutCubic(progress)
        
        window.scrollTo(0, startPosition + distance * ease)
        
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      
      window.requestAnimationFrame(step)
    }
  }
}

// Alternative scroll function with better mobile support
export const scrollToElement = (elementId, offset = 80) => {
  const element = document.getElementById(elementId.replace('#', ''))
  if (!element) return

  // Get element position relative to viewport
  const elementRect = element.getBoundingClientRect()
  const elementTop = elementRect.top + window.pageYOffset
  const offsetPosition = elementTop - offset

  // Use native smooth scroll if available
  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo({
      top: Math.max(0, offsetPosition),
      behavior: 'smooth'
    })
  } else {
    // Manual smooth scroll fallback
    const startPosition = window.pageYOffset
    const distance = Math.max(0, offsetPosition) - startPosition
    const duration = 1000
    let start = null

    const animation = (currentTime) => {
      if (start === null) start = currentTime
      const timeElapsed = currentTime - start
      const progress = Math.min(timeElapsed / duration, 1)
      
      // Use easeOutCubic for smoother animation
      const ease = 1 - Math.pow(1 - progress, 3)
      
      window.scrollTo(0, startPosition + distance * ease)
      
      if (progress < 1) {
        requestAnimationFrame(animation)
      }
    }
    
    requestAnimationFrame(animation)
  }
}

// Easing function for smooth animation fallback
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

// Mouse move parallax effect for hero elements
export const initMouseParallax = (selector = '.mouse-parallax') => {
  const elements = document.querySelectorAll(selector)
  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2
    
    elements.forEach((element) => {
      const speed = element.dataset.speed || 0.1
      const x = (clientX - centerX) * speed
      const y = (clientY - centerY) * speed
      
      element.style.transform = `translate(${x}px, ${y}px)`
    })
  }
  
  document.addEventListener('mousemove', handleMouseMove)
  
  // Cleanup function
  return () => {
    document.removeEventListener('mousemove', handleMouseMove)
  }
}
