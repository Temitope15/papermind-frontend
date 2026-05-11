import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#60a5fa',
        'on-primary': '#001233',
        'primary-fixed': '#93c5fd',
        background: '#0f1419',
        surface: '#0f1419',
        'surface-container': '#1b2025',
        'surface-container-high': '#252a30',
        'surface-container-highest': '#30353b',
        'surface-container-low': '#171c21',
        'surface-container-lowest': '#0a0f14',
        'on-surface': '#dee3ea',
        'on-surface-variant': '#94a3b8',
        outline: '#88938f',
        'outline-variant': '#3e4946',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'DM Serif Display', 'serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'headline-lg': ['32px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        'headline-md': ['24px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-md': ['12px', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      spacing: {
        gutter: '24px',
        '2xl': '64px',
        'margin-desktop': '48px',
        xl: '40px',
        md: '16px',
        sm: '8px',
        lg: '24px',
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', filter: 'blur(80px)', transform: 'scale(1)' },
          '50%': { opacity: '0.8', filter: 'blur(100px)', transform: 'scale(1.1)' },
        },
        swirl: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.05)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-dot': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.4)', opacity: '0.6' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 8s ease-in-out infinite',
        swirl: 'swirl 20s linear infinite',
        blink: 'blink 1s ease-in-out infinite',
        'scan-line': 'scan-line 2.5s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
      boxShadow: {
        glass: '0 20px 40px rgba(0,0,0,0.3)',
        'mint-glow': '0 0 40px -10px rgba(96,165,250,0.25)',
        'mint-glow-lg': '0 0 60px -10px rgba(96,165,250,0.45)',
      },
      backdropBlur: {
        xs: '4px',
      },
    },
  },
  plugins: [],
}

export default config
