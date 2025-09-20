/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Enhanced Primary Palette - Midnight Blue Series
        'midnight': {
          50: '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d6ff',
          300: '#a5b8ff',
          400: '#818eff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#1e1b4b', // Primary Deep Midnight
          950: '#0f0d2a',
        },
        // Enhanced Secondary Palette - Cognac Series  
        'cognac': {
          50: '#fdf8f3',
          100: '#faf0e4',
          200: '#f4ddc4',
          300: '#ecc49a',
          400: '#e2a06e',
          500: '#d4844c',
          600: '#c06d3a', // Primary Warm Cognac
          700: '#a05530',
          800: '#82442c',
          900: '#6b3a26',
          950: '#3a1d13',
        },
        // Accent Colors
        'gold': {
          50: '#fffdf0',
          100: '#fffadb',
          200: '#fff2b6',
          300: '#ffe686',
          400: '#ffd545',
          500: '#ffc107', // Primary Gold
          600: '#e6a700',
          700: '#cc9500',
          800: '#b8860b',
          900: '#996f02',
        },
        'copper': {
          50: '#fef7f0',
          100: '#feede0',
          200: '#fcd9c0',
          300: '#f9bc95',
          400: '#f59467',
          500: '#f17544',
          600: '#e35d2a', // Primary Copper
          700: '#bd4a20',
          800: '#973e1f',
          900: '#7a351e',
        },
        'pearl': {
          50: '#ffffff',
          100: '#fefefe',
          200: '#fefefe',
          300: '#fdfdfd',
          400: '#fcfcfc',
          500: '#f8f8f8', // Primary Pearl
          600: '#e5e5e5',
          700: '#cccccc',
          800: '#b3b3b3',
          900: '#999999',
        },
        // Enhanced Neutral Palette
        'slate': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        // Primary Typography - Elegant Serif for Headings
        'display': ['Playfair Display', 'Georgia', 'serif'],
        // Secondary Typography - Clean Sans-serif for Body
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // Accent Typography - Modern Monospace for Highlights
        'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Enhanced Typography Scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['6rem', { lineHeight: '1.1' }],
        '9xl': ['8rem', { lineHeight: '1.1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px 0 rgb(0 0 0 / 0.08)',
        'medium': '0 4px 25px 0 rgb(0 0 0 / 0.12)',
        'strong': '0 10px 40px 0 rgb(0 0 0 / 0.15)',
        'glow': '0 0 20px 0 rgb(99 102 241 / 0.3)',
        'glow-cognac': '0 0 20px 0 rgb(192 109 58 / 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        '300%': '300% 300%',
      }
    },
  },
  plugins: [],
}
