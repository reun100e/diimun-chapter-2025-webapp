// Script to generate HTML files with proper meta tags for each route
// This ensures social media crawlers get the correct Open Graph tags

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://dna.aghosh.in';

const META_CONFIG = {
  'registration-guide': {
    title: 'Registration Guide - DIIMUN 2025 | Step-by-Step Instructions',
    description: 'Complete step-by-step guide to register for DIIMUN 2025. Learn about the registration process, payment options, required documents, and important deadlines.',
    image: '/images/hero.webp',
    url: `${BASE_URL}/registration-guide`,
  },
  schedule: {
    title: 'Event Schedule - DIIMUN 2025 | Complete Timeline',
    description: 'View the complete schedule for DIIMUN 2025 on November 4th. Detailed timeline of committee sessions, breaks, meals, and award ceremony at GHMC Trivandrum.',
    image: '/images/hero.webp',
    url: `${BASE_URL}/schedule`,
  },
  awards: {
    title: 'Awards & Recognition - DIIMUN 2025 | ₹6000+ Prize Pool',
    description: 'Compete for 6 prestigious awards with ₹6000+ in prizes. Best Delegate, High Commendation, Best Essay, and Best Photographer awards available.',
    image: '/images/DNA Logo.png',
    url: `${BASE_URL}/awards`,
  },
  'who-committee-guidelines': {
    title: 'WHO Committee Guidelines - DIIMUN 2025 | Delegate Handbook',
    description: 'Complete guidelines for WHO Committee at DIIMUN 2025. Learn about the agenda, rules of procedure, position papers, and what to expect in committee sessions.',
    image: '/images/World Health Organissation.webp',
    url: `${BASE_URL}/who-committee-guidelines`,
  },
  'great-assembly-guidelines': {
    title: 'Great Homoeopathic Assembly Guidelines - DIIMUN 2025',
    description: 'Guidelines for the Great Homoeopathic Assembly at DIIMUN 2025. Explore homoeopathic medicine debates, research discussions, and committee procedures.',
    image: '/images/The Great Homoeopathic Assembly.webp',
    url: `${BASE_URL}/great-assembly-guidelines`,
  },
  'ipc-guidelines': {
    title: 'International Press Corps Guidelines - DIIMUN 2025',
    description: 'Complete guide for International Press Corps members at DIIMUN 2025. Learn about essay writing, photography requirements, submission deadlines, and evaluation criteria.',
    image: '/images/IPC.webp',
    url: `${BASE_URL}/ipc-guidelines`,
  },
  'ipc-submission': {
    title: 'IPC Submission Portal - DIIMUN 2025 | Submit Your Work',
    description: 'Submit your International Press Corps essays and photos for DIIMUN 2025. Upload your work before 3:00 PM on event day to be considered for awards.',
    image: '/images/IPC.webp',
    url: `${BASE_URL}/ipc-submission`,
  },
  terms: {
    title: 'Terms & Conditions - DIIMUN 2025 | Rules & Policies',
    description: 'Terms and conditions for participating in DIIMUN 2025. Important policies, rules, refund guidelines, and code of conduct for all participants.',
    image: '/images/DNA Logo.png',
    url: `${BASE_URL}/terms`,
  },
  'technology-policy': {
    title: 'Technology Policy - DIIMUN 2025 | Device Usage Guidelines',
    description: 'Technology and device usage policy for DIIMUN 2025. Guidelines for laptops, phones, recording devices, and electronic equipment during the event.',
    image: '/images/DNA Logo.png',
    url: `${BASE_URL}/technology-policy`,
  }
};

// Read the built index.html as template (after vite build)
const distPath = path.join(__dirname, '..', 'dist');
const templatePath = path.join(distPath, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('❌ Error: dist/index.html not found. Run "vite build" first.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf-8');

// Generate HTML for each route
Object.entries(META_CONFIG).forEach(([route, meta]) => {
  // Replace meta tags in template
  let html = template;
  
  // Update title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${meta.title}</title>`
  );
  
  // Update meta description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/,
    `<meta name="description" content="${meta.description}" />`
  );
  
  // Update Open Graph tags
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/,
    `<meta property="og:url" content="${meta.url}" />`
  );
  
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/,
    `<meta property="og:title" content="${meta.title}" />`
  );
  
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/,
    `<meta property="og:description" content="${meta.description}" />`
  );
  
  html = html.replace(
    /<meta property="og:image" content=".*?" \/>/,
    `<meta property="og:image" content="${BASE_URL}${meta.image}" />`
  );
  
  // Update Twitter tags
  html = html.replace(
    /<meta property="twitter:url" content=".*?" \/>/,
    `<meta property="twitter:url" content="${meta.url}" />`
  );
  
  html = html.replace(
    /<meta property="twitter:title" content=".*?" \/>/,
    `<meta property="twitter:title" content="${meta.title}" />`
  );
  
  html = html.replace(
    /<meta property="twitter:description" content=".*?" \/>/,
    `<meta property="twitter:description" content="${meta.description}" />`
  );
  
  html = html.replace(
    /<meta property="twitter:image" content=".*?" \/>/,
    `<meta property="twitter:image" content="${BASE_URL}${meta.image}" />`
  );
  
  // Create route directory
  const routePath = path.join(distPath, route);
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
  }
  
  // Write HTML file
  fs.writeFileSync(path.join(routePath, 'index.html'), html);
  console.log(`✓ Generated ${route}/index.html`);
});

console.log('\n✅ All HTML files generated successfully!');

