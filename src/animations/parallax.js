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
    const targetPosition = target.offsetTop - offset
    
    // Check if browser supports smooth scrolling
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    } else {
      // Fallback for browsers that don't support smooth scrolling
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      const duration = 800
      let start = null

      const step = (timestamp) => {
        if (!start) start = timestamp
        const progress = timestamp - start
        const ease = easeInOutCubic(progress / duration)
        
        window.scrollTo(0, startPosition + distance * ease)
        
        if (progress < duration) {
          window.requestAnimationFrame(step)
        }
      }
      
      window.requestAnimationFrame(step)
    }
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
