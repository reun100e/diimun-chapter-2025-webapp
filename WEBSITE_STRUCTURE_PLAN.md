# DIIMUN 2025 - Website Structure Plan

## Current Website Structure
```
DIIMUN 2025 Website
├── Hero Section (Landing)
├── About Section
├── Event Highlights (Committees)
├── Why Join Section
├── Event Details
├── Registration Form
├── FAQ Section
└── Footer
```

## Enhanced Website Structure Plan

### 1. Main Navigation Structure
```
DIIMUN 2025 Website
├── Home
├── About
│   ├── Event Overview
│   ├── Organizers (DNA)
│   └── Stalwarts Gallery
├── Committees
│   ├── WHO Committee
│   ├── Great Assembly
│   └── International Press
├── Event Info
│   ├── Schedule & Timeline
│   ├── Dress Code & Guidelines
│   ├── Technology Policy
│   ├── Awards & Prizes
│   └── Venue Information
├── Registration
│   ├── Registration Form
│   ├── Registration Guidelines
│   └── Payment Information
├── Support
│   ├── FAQ
│   ├── Contact Us
│   └── Terms & Conditions
└── Footer
```

### 2. New Pages to Create

#### A. Event Schedule Page (`/schedule`)
**Purpose**: Detailed timeline and activities
**Content**:
- Event day schedule (9:00 AM - 5:00 PM)
- Committee session timings
- Break schedules
- Submission deadlines
- Awards ceremony timing
- Visual timeline component

#### B. Dress Code & Guidelines Page (`/guidelines`)
**Purpose**: Comprehensive dress code and conduct rules
**Content**:
- Formal dress code requirements
- Male delegate attire guidelines
- Female delegate attire guidelines
- Traditional attire options
- Prohibited clothing items
- Best Dressed Delegate recognition
- Visual examples/gallery

#### C. Terms & Conditions Page (`/terms`)
**Purpose**: Legal terms and policies
**Content**:
- Registration terms
- Payment terms
- Event participation terms
- Communication terms
- Liability terms
- Intellectual property
- Force majeure
- Governing law

#### D. Awards & Prizes Page (`/awards`)
**Purpose**: Detailed award categories and cash prizes
**Content**:
- Award categories
- Cash prize information
- Evaluation criteria
- Recognition levels
- Best Dressed Delegate
- Committee-specific awards

#### E. Committee Details Page (`/committees`)
**Purpose**: In-depth committee information
**Content**:
- WHO Committee details
- Great Assembly details
- International Press details
- Eligibility requirements
- Team formation rules
- Committee-specific guidelines

#### F. Technology Policy Page (`/technology-policy`)
**Purpose**: Device usage and recording policies
**Content**:
- Allowed devices
- Usage restrictions
- Recording policies
- Violation consequences
- Executive Board approval process

#### G. Registration Guidelines Page (`/registration-guide`)
**Purpose**: Step-by-step registration process
**Content**:
- Registration process overview
- Required documents
- Payment instructions
- Team formation guide
- Deadline information
- Troubleshooting

#### H. Contact & Support Page (`/contact`)
**Purpose**: Multiple contact methods and support
**Content**:
- Contact information
- Support channels
- FAQ integration
- Help desk information
- Emergency contacts

### 3. Enhanced Existing Components

#### A. Hero Section Enhancements
- Add registration deadline countdown timer
- Include key event highlights
- Add "Learn More" sections for new pages
- Include venue and date prominently

#### B. About Section Enhancements
- Add event schedule overview
- Include organizer information
- Add collaboration details (ESPERANZA 4.0)
- Include target audience information

#### C. Event Details Section Enhancements
- Add comprehensive event information
- Include dress code highlights
- Add technology policy summary
- Include awards information

#### D. Registration Form Enhancements
- Add terms acceptance checkbox
- Link to terms & conditions page
- Add registration deadline warnings
- Include document requirements
- Add team formation guidance

#### E. FAQ Section Enhancements
- Add questions based on guide.md
- Include dress code questions
- Add technology policy questions
- Include awards and prizes questions
- Add registration process questions

### 4. New Components to Create

#### A. Countdown Timer Component
```jsx
<CountdownTimer 
  targetDate="2025-10-25T23:59:59"
  title="Registration Deadline"
  showDays={true}
  showHours={true}
  showMinutes={true}
  showSeconds={true}
/>
```

#### B. Event Schedule Timeline Component
```jsx
<EventTimeline 
  events={[
    { time: "9:00 AM", title: "Event Start", description: "..." },
    { time: "10:30 AM", title: "Tea Break", description: "..." },
    // ... more events
  ]}
/>
```

#### C. Dress Code Gallery Component
```jsx
<DressCodeGallery 
  categories={[
    { title: "Male Formal", images: [...], description: "..." },
    { title: "Female Formal", images: [...], description: "..." },
    { title: "Traditional", images: [...], description: "..." }
  ]}
/>
```

#### D. Terms Modal Component
```jsx
<TermsModal 
  isOpen={showTerms}
  onClose={() => setShowTerms(false)}
  onAccept={() => handleTermsAccept()}
  title="Terms & Conditions"
  content={termsContent}
/>
```

#### E. Contact Form Component
```jsx
<ContactForm 
  fields={[
    { name: "name", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "subject", type: "select", options: [...] },
    { name: "message", type: "textarea", required: true }
  ]}
  onSubmit={handleContactSubmit}
/>
```

#### F. Awards Showcase Component
```jsx
<AwardsShowcase 
  awards={[
    { title: "Best Delegate", prize: "₹1000", description: "..." },
    { title: "Best Reporter", prize: "₹1000", description: "..." },
    // ... more awards
  ]}
/>
```

### 5. Navigation Updates

#### A. Main Navigation
```jsx
const navigationItems = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#committees', label: 'Committees' },
  { href: '/schedule', label: 'Schedule' },
  { href: '/guidelines', label: 'Guidelines' },
  { href: '/awards', label: 'Awards' },
  { href: '#register', label: 'Register' },
  { href: '/contact', label: 'Contact' }
];
```

#### B. Footer Navigation
```jsx
const footerSections = [
  {
    title: "Event Info",
    links: [
      { href: '/schedule', label: 'Schedule' },
      { href: '/guidelines', label: 'Guidelines' },
      { href: '/awards', label: 'Awards' },
      { href: '/committees', label: 'Committees' }
    ]
  },
  {
    title: "Support",
    links: [
      { href: '/contact', label: 'Contact' },
      { href: '/terms', label: 'Terms & Conditions' },
      { href: '/registration-guide', label: 'Registration Guide' },
      { href: '#faq', label: 'FAQ' }
    ]
  }
];
```

### 6. Routing Structure

#### A. Single Page Application (SPA) Routes
```jsx
// Main sections (hash routes)
#hero - Hero section
#about - About section
#committees - Committee selection
#why-join - Why join section
#details - Event details
#register - Registration form
#faq - FAQ section

// New pages (separate routes)
/schedule - Event schedule page
/guidelines - Dress code & guidelines
/terms - Terms & conditions
/awards - Awards & prizes
/committees - Committee details
/technology-policy - Technology policy
/registration-guide - Registration guidelines
/contact - Contact & support
```

#### B. Page Components Structure
```
src/
├── components/
│   ├── pages/
│   │   ├── Schedule.jsx
│   │   ├── Guidelines.jsx
│   │   ├── Terms.jsx
│   │   ├── Awards.jsx
│   │   ├── CommitteeDetails.jsx
│   │   ├── TechnologyPolicy.jsx
│   │   ├── RegistrationGuide.jsx
│   │   └── Contact.jsx
│   ├── common/
│   │   ├── CountdownTimer.jsx
│   │   ├── EventTimeline.jsx
│   │   ├── DressCodeGallery.jsx
│   │   ├── TermsModal.jsx
│   │   ├── ContactForm.jsx
│   │   └── AwardsShowcase.jsx
│   └── [existing components]
```

### 7. Content Management

#### A. Content Constants
```jsx
// src/utils/content.js
export const EVENT_SCHEDULE = {
  day: "November 4th, 2025",
  timeline: [
    { time: "9:00 AM", title: "Event Start", description: "..." },
    // ... more events
  ]
};

export const DRESS_CODE = {
  mandatory: "Formal Western Business Attire",
  male: { /* male dress code details */ },
  female: { /* female dress code details */ },
  prohibited: [/* prohibited items */]
};

export const AWARDS = {
  categories: [
    { title: "Best Delegate", prize: "₹1000", description: "..." },
    // ... more awards
  ]
};
```

#### B. Content Updates
- All content from guide.md integrated
- Consistent terminology across all pages
- Professional tone and language
- Clear and concise information
- Visual hierarchy and readability

### 8. User Experience Enhancements

#### A. Information Architecture
- Logical flow from general to specific information
- Clear navigation between related topics
- Consistent page layouts and components
- Mobile-responsive design

#### B. Accessibility
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios

#### C. Performance
- Lazy loading for images
- Code splitting for new pages
- Optimized bundle sizes
- Fast loading times
- Smooth animations

### 9. Implementation Priority

#### Phase 1: Critical Pages (High Priority)
1. Terms & Conditions page
2. Event Schedule page
3. Dress Code & Guidelines page
4. Registration form enhancements

#### Phase 2: Important Pages (Medium Priority)
1. Awards & Prizes page
2. Committee Details page
3. Technology Policy page
4. Contact & Support page

#### Phase 3: Enhancement Pages (Lower Priority)
1. Registration Guidelines page
2. Enhanced FAQ section
3. Additional components
4. Performance optimizations

### 10. Success Metrics

#### A. Information Completeness
- ✅ All guide.md information integrated
- ✅ Terms & conditions properly linked
- ✅ Registration process clearly explained
- ✅ Event details comprehensive

#### B. User Experience
- ✅ Easy navigation between pages
- ✅ Clear information hierarchy
- ✅ Mobile-responsive design
- ✅ Fast loading times

#### C. Legal Compliance
- ✅ Terms acceptance in registration
- ✅ Clear refund and cancellation policies
- ✅ Liability and safety information
- ✅ Privacy and data protection

This website structure plan ensures that all information from guide.md is properly integrated while maintaining a professional, user-friendly experience for DIIMUN 2025 participants.
