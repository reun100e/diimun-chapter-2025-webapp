// Site Configuration
export const SITE_CONFIG = {
  title: 'DIIMUN - ESPERANZA 4.0 Exclusive',
  description: 'Doctors Integrated International Model United Nations - A comprehensive elocution cum debate competition',
  url: 'https://diimun2025.com',
}

// Asset Paths
export const ASSETS = {
  dnaLogo: '/images/DNA Logo.png',
  whoLogo: '/images/World Health Organissation.webp',
  greatAssemblyImage: '/images/The Great Homoeopathic Assembly.jpg'
}

// Event Information
export const EVENT_INFO = {
  title: 'Doctors Integrated International Model United Nations',
  subtitle: 'DIIMUN - ESPERANZA 4.0 Exclusive',
  tagline: 'A comprehensive elocution cum debate competition',
  organizer: 'DNA (Doctors Nexus Amity)',
  collaboration: 'ESPERANZA 4.0',
  theme: 'Voice Your Opinions, Shape Healthcare\'s Future',
  targetAudience: 'Homoeopathy students & professionals',
  date: 'November 4th, 2025',
  format: 'Team-based competition (2 members per team)',
  workshop: '3-day online workshop on "Art of Communication" - FREE for all participants',
}

// Stalwarts Information
export const STALWARTS = [
  {
    name: 'Boenninghausen',
    period: '1785-1864',
    contribution: 'Pioneer of repertorization and systematic case taking',
    image: '/images/Bönninghausen.png'
  },
  {
    name: 'Kent',
    period: '1849-1916',
    contribution: 'Master of constitutional prescribing and philosophy',
    image: '/images/James_Tyler_Kent.png'
  },
  {
    name: 'Hering',
    period: '1800-1880',
    contribution: 'Father of American Homoeopathy and Hering\'s Law',
    image: '/images/Constantine Herring.webp'
  },
  {
    name: 'Boger',
    period: '1861-1935',
    contribution: 'Expert in repertory and keynote prescribing',
    image: '/images/Boger.png'
  },
  {
    name: 'O.Boericke',
    period: '1849-1929',
    contribution: 'Contributor to Materia Medica and repertory development',
    image: '/images/Oscar E Boericke.png'
  },
  {
    name: 'W.Boericke',
    period: '1849-1929',
    contribution: 'Notable homoeopathic physician and author',
    image: '/images/William Boaericke.png'
  },
  {
    name: 'C.Dunham',
    period: '1828-1877',
    contribution: 'American homoeopathic physician and educator',
    image: '/images/Carroll Dunham.jpeg'
  },
  {
    name: 'S.Close',
    period: '1860-1929',
    contribution: 'Prominent homoeopathic teacher and writer',
    image: '/images/stuart close.png'
  }
]

// Navigation Links
export const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#highlights', label: 'Committees' },
  { href: '#details', label: 'Details' },
  { href: '#faq', label: 'FAQ' },
]

// Why Join Benefits
export const BENEFITS = [
  {
    icon: 'Users',
    title: 'First-Person Role Playing',
    description: 'Step into the shoes of great homoeopathic stalwarts and experience debates from their unique perspectives.',
  },
  {
    icon: 'Zap',
    title: 'Shape the Event Flow',
    description: 'You get to choose and control the flow of the entire event through your active participation and decisions.',
  },
  {
    icon: 'MessageSquare',
    title: 'Voice Your Opinions',
    description: 'Finally, a platform where homoeopathy gets the highlight it deserves and your voice can make a difference.',
  },
  {
    icon: 'BookOpen',
    title: 'Unearth Hidden Philosophies',
    description: 'Discover and debate the philosophies of stalwarts and masters that have been left unexplored.',
  },
  {
    icon: 'Handshake',
    title: 'Team-Based Learning',
    description: 'Collaborate with a partner in this comprehensive elocution cum debate competition.',
  },
  {
    icon: 'GraduationCap',
    title: 'Free Communication Workshop',
    description: '3-day online workshop on "Art of Communication" plus competition explanation sessions - completely FREE.',
  },
]

// Committee Information
export const COMMITTEES = [
  {
    title: 'The World Health Organization (WHO) Committee',
    description: 'Take leadership in shaping global healthcare policy by representing nations in debates on homoeopathy in the modern world. Explore its applications, challenges, potential, and limitations while developing your leadership skills to contribute to the best possible healthcare outcomes worldwide.',
    icon: 'Globe',
    type: 'General Committee',
    eligibility: 'Open to all homoeopathy students and professionals'
  },
  {
    title: 'The Great Homoeopathic Assembly (DNA Exclusive)',
    description: 'Embody the great homoeopathic masters and engage in debates on critical issues within homoeopathy. Explore unspoken philosophies, challenge exaggerated claims, and uncover lesser-known truths. Address future concerns while evolving from critical thinker to master practitioner, deepening your understanding of homoeopathic principles.',
    icon: 'Users',
    type: 'Exclusive Committee',
    eligibility: 'Preferred for Final Year (4th BHMS), Interns and Postgraduates of all disciplines',
    note: 'Limited teams on first-come-first-serve basis'
  }
]

// Event Highlights
export const HIGHLIGHTS = [
  {
    title: 'Two Prestigious Committees',
    description: 'Choose between WHO Committee for global healthcare debates or the exclusive Great Homoeopathic Assembly for advanced philosophical discussions.',
    icon: 'Building',
  },
  {
    title: 'Team-Based Competition',
    description: 'Participate with a partner in this comprehensive elocution cum debate competition where you control the flow of the entire event.',
    icon: 'Handshake',
  },
  {
    title: 'Free Communication Workshop',
    description: '3-day online workshop on "Art of Communication" plus competition explanation sessions - completely FREE for all participants.',
    icon: 'GraduationCap',
  },
]

// Animation Variants
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  fadeInRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }
}
