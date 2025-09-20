# DIIMUN Chapter 2025 - Official Website

A modern, responsive web application for the **Delhi Institute of Integrated Medicine Model United Nations (DIIMUN) Chapter 2025** event. Built with React, Vite, and Tailwind CSS, featuring smooth animations and integrated registration system.

## 🌟 Features

- **Modern Landing Page** - Professional hero section with animated DNA logo
- **Event Information** - Comprehensive details about MUN and conference sessions
- **Interactive Registration** - Complete registration form with payment upload
- **Responsive Design** - Optimized for all devices and screen sizes
- **Smooth Animations** - Enhanced UX with Framer Motion and AOS
- **FAQ Section** - Common questions and answers
- **Contact Information** - Easy access to organizer details

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion + AOS (Animate On Scroll)
- **Backend**: Supabase (Database + File Storage)
- **Icons**: Lucide React + React Icons
- **Build Tool**: Vite with hot module replacement

## 🎨 Design System

The website uses a sophisticated color palette and typography:

- **Colors**: Midnight blue, Cognac, Gold accents, Pearl backgrounds
- **Typography**: Playfair Display (headings) + Inter (body text)
- **Components**: Consistent spacing, hover effects, and transitions

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Supabase account (for registration functionality)

## ⚡ Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd diimun-chapter-2025-webapp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory
   VITE_SUPABASE_URL=your-supabase-project-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🗂️ Project Structure

```
src/
├── components/          # React components
│   ├── Hero.jsx        # Main landing section
│   ├── About.jsx       # Event information
│   ├── EventHighlights.jsx
│   ├── EventDetails.jsx
│   ├── RegistrationForm.jsx
│   ├── FAQ.jsx
│   ├── Navigation.jsx
│   └── Footer.jsx
├── animations/         # Animation utilities
├── styles/            # CSS and styling
├── utils/             # Constants and utilities
└── supabaseClient.js  # Database configuration
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🗄️ Database Setup

The registration system requires a Supabase backend. See [SUPABASE_SETUP.md](SUPABASE_SETUP.md) for detailed setup instructions including:

- Database table creation
- File storage configuration
- Environment variable setup
- Security considerations

## 🎯 Registration Features

- **Personal Information**: Name, contact details, academic info
- **Registration Types**: 
  - MUN Only (₹500)
  - MUN + Conference (₹800)
- **Payment Upload**: UPI screenshot with validation
- **Form Validation**: Email, phone, and file format validation
- **Status Tracking**: Automatic status management

## 🌐 Deployment

The project is configured for easy deployment:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting platform
   - Vercel, Netlify, or any static hosting service
   - Ensure environment variables are configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary to DIIMUN Chapter 2025.

## 📧 Contact

For technical issues or questions about the website:
- **Development Team**: [Contact Information]
- **Event Organizers**: [DIIMUN Contact Details]

---

Built with ❤️ for DIIMUN Chapter 2025 | Advancing Healthcare Through Diplomacy