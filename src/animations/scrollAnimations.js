// Advanced scroll animation utilities using Intersection Observer

// Stagger animation for multiple elements
export const initStaggerAnimation = (selector, delay = 100) => {
  const elements = document.querySelectorAll(selector)
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate')
        }, index * delay)
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })
  
  elements.forEach((element) => {
    observer.observe(element)
  })
  
  return () => observer.disconnect()
}

// Counter animation
export const animateCounter = (element, target, duration = 2000) => {
  const start = 0
  const increment = target / (duration / 16)
  let current = start
  
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current)
  }, 16)
}

// Progress bar animation
export const animateProgressBar = (element, targetWidth, duration = 1000) => {
  const startWidth = 0
  const increment = targetWidth / (duration / 16)
  let currentWidth = startWidth
  
  const timer = setInterval(() => {
    currentWidth += increment
    if (currentWidth >= targetWidth) {
      currentWidth = targetWidth
      clearInterval(timer)
    }
    element.style.width = `${currentWidth}%`
  }, 16)
}

// Text reveal animation
export const initTextReveal = (selector = '.text-reveal') => {
  const elements = document.querySelectorAll(selector)
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const text = entry.target.textContent
        entry.target.innerHTML = ''
        
        // Split text into spans
        text.split('').forEach((char, index) => {
          const span = document.createElement('span')
          span.textContent = char === ' ' ? '\u00A0' : char
          span.style.opacity = '0'
          span.style.transform = 'translateY(20px)'
          span.style.transition = `all 0.3s ease ${index * 0.02}s`
          entry.target.appendChild(span)
          
          // Trigger animation
          setTimeout(() => {
            span.style.opacity = '1'
            span.style.transform = 'translateY(0)'
          }, 10)
        })
        
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.5
  })
  
  elements.forEach((element) => {
    observer.observe(element)
  })
  
  return () => observer.disconnect()
}

// Scroll progress indicator
export const initScrollProgress = (selector = '.scroll-progress') => {
  const progressBar = document.querySelector(selector)
  if (!progressBar) return
  
  const updateProgress = () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.body.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100
    
    progressBar.style.width = `${Math.min(scrollPercent, 100)}%`
  }
  
  window.addEventListener('scroll', updateProgress)
  updateProgress() // Initial call
  
  return () => window.removeEventListener('scroll', updateProgress)
}

// Floating elements animation
export const initFloatingElements = (selector = '.floating-element') => {
  const elements = document.querySelectorAll(selector)
  
  elements.forEach((element, index) => {
    const amplitude = parseFloat(element.dataset.amplitude) || 20
    const speed = parseFloat(element.dataset.speed) || 2
    const offset = index * 0.5
    
    const animate = () => {
      const time = Date.now() * 0.001
      const y = Math.sin(time * speed + offset) * amplitude
      element.style.transform = `translateY(${y}px)`
      requestAnimationFrame(animate)
    }
    
    animate()
  })
}
