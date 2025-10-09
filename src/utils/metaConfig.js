// Meta tag configurations for each page
// Used for SEO and social media sharing

const BASE_URL = 'https://dna.aghosh.in'

export const META_CONFIG = {
  home: {
    title: 'DIIMUN - ESPERANZA 4.0 Exclusive | November 4th, 2025',
    description: 'Join the comprehensive elocution cum debate competition for homoeopathy professionals. Register now for November 4th, 2025 at GHMC Trivandrum.',
    image: '/images/DNA Logo.png',
    url: BASE_URL,
    keywords: 'DIIMUN, ESPERANZA 4.0, Model United Nations, Homoeopathy, DNA, Debate Competition, WHO Committee, Great Homoeopathic Assembly'
  },
  'registration-guide': {
    title: 'Registration Guide - DIIMUN 2025 | Step-by-Step Instructions',
    description: 'Complete step-by-step guide to register for DIIMUN 2025. Learn about the registration process, payment options, required documents, and important deadlines.',
    image: '/images/hero.webp',
    url: `${BASE_URL}/registration-guide`,
    keywords: 'DIIMUN registration, MUN registration guide, how to register, payment information, registration process'
  },
  schedule: {
    title: 'Event Schedule - DIIMUN 2025 | Complete Timeline',
    description: 'View the complete schedule for DIIMUN 2025 on November 4th. Detailed timeline of committee sessions, breaks, meals, and award ceremony at GHMC Trivandrum.',
    image: '/images/hero.webp',
    url: `${BASE_URL}/schedule`,
    keywords: 'DIIMUN schedule, event timeline, MUN schedule, November 4th schedule, event program'
  },
  awards: {
    title: 'Awards & Recognition - DIIMUN 2025 | ₹6000+ Prize Pool',
    description: 'Compete for 6 prestigious awards with ₹6000+ in prizes. Best Delegate, High Commendation, Best Essay, and Best Photographer awards available.',
    image: '/images/DNA Logo.png',
    url: `${BASE_URL}/awards`,
    keywords: 'DIIMUN awards, MUN prizes, best delegate award, prize money, recognition, certificates'
  },
  'who-committee-guidelines': {
    title: 'WHO Committee Guidelines - DIIMUN 2025 | Delegate Handbook',
    description: 'Complete guidelines for WHO Committee at DIIMUN 2025. Learn about the agenda, rules of procedure, position papers, and what to expect in committee sessions.',
    image: '/images/World Health Organissation.webp',
    url: `${BASE_URL}/who-committee-guidelines`,
    keywords: 'WHO committee, World Health Organization MUN, committee guidelines, rules of procedure, position paper'
  },
  'great-assembly-guidelines': {
    title: 'Great Homoeopathic Assembly Guidelines - DIIMUN 2025',
    description: 'Guidelines for the Great Homoeopathic Assembly at DIIMUN 2025. Explore homoeopathic medicine debates, research discussions, and committee procedures.',
    image: '/images/The Great Homoeopathic Assembly.webp',
    url: `${BASE_URL}/great-assembly-guidelines`,
    keywords: 'Great Homoeopathic Assembly, homoeopathy debate, medical assembly, committee guidelines, homoeopathic medicine'
  },
  'ipc-guidelines': {
    title: 'International Press Corps Guidelines - DIIMUN 2025',
    description: 'Complete guide for International Press Corps members at DIIMUN 2025. Learn about essay writing, photography requirements, submission deadlines, and evaluation criteria.',
    image: '/images/IPC.webp',
    url: `${BASE_URL}/ipc-guidelines`,
    keywords: 'International Press Corps, IPC guidelines, MUN journalism, press corps, photography, essay writing'
  },
  'ipc-submission': {
    title: 'IPC Submission Portal - DIIMUN 2025 | Submit Your Work',
    description: 'Submit your International Press Corps essays and photos for DIIMUN 2025. Upload your work before 3:00 PM on event day to be considered for awards.',
    image: '/images/IPC.webp',
    url: `${BASE_URL}/ipc-submission`,
    keywords: 'IPC submission, upload essay, submit photos, press corps submission, journalism portal'
  },
  terms: {
    title: 'Terms & Conditions - DIIMUN 2025 | Rules & Policies',
    description: 'Terms and conditions for participating in DIIMUN 2025. Important policies, rules, refund guidelines, and code of conduct for all participants.',
    image: '/images/DNA Logo.png',
    url: `${BASE_URL}/terms`,
    keywords: 'DIIMUN terms, rules and regulations, code of conduct, policies, terms and conditions'
  },
  'technology-policy': {
    title: 'Technology Policy - DIIMUN 2025 | Device Usage Guidelines',
    description: 'Technology and device usage policy for DIIMUN 2025. Guidelines for laptops, phones, recording devices, and electronic equipment during the event.',
    image: '/images/DNA Logo.png',
    url: `${BASE_URL}/technology-policy`,
    keywords: 'technology policy, device usage, laptop policy, phone policy, electronic devices, MUN technology rules'
  }
}

// Helper function to get meta config for a page
export const getMetaConfig = (page = 'home') => {
  return META_CONFIG[page] || META_CONFIG.home
}

// Generate Open Graph tags
export const generateOGTags = (config) => ({
  'og:type': 'website',
  'og:url': config.url,
  'og:title': config.title,
  'og:description': config.description,
  'og:image': `${BASE_URL}${config.image}`,
  'og:site_name': 'DIIMUN 2025'
})

// Generate Twitter Card tags
export const generateTwitterTags = (config) => ({
  'twitter:card': 'summary_large_image',
  'twitter:url': config.url,
  'twitter:title': config.title,
  'twitter:description': config.description,
  'twitter:image': `${BASE_URL}${config.image}`
})

