/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#FF6B35',
          light: '#FF8C5A',
          dark: '#E55A2B',
        },
        'secondary': {
          DEFAULT: '#00E5FF',
          light: '#6EFFFF',
          dark: '#00B8D4',
        },
        'accent': {
          DEFAULT: '#FF1744',
          light: '#FF4569',
          dark: '#D50032',
        },
        'background': {
          DEFAULT: '#0D0D0D',
          light: '#1A1A1A',
          lighter: '#252525',
        },
        'text': {
          DEFAULT: '#F5F1E8',
          muted: '#A0998A',
          dark: '#4A5568',
        },
        'neutral': {
          DEFAULT: '#4A5568',
          light: '#718096',
          dark: '#2D3748',
        },
      },
      fontFamily: {
        'display': ['Orbitron', 'Consolas', 'Monaco', 'sans-serif'],
        'mono': ['"JetBrains Mono"', '"Courier Prime"', '"Courier New"', 'monospace'],
        'body': ['"Courier Prime"', '"Courier New"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flicker': 'flicker 0.15s infinite',
        'scan': 'scan 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typing': 'typing 3.5s steps(40, end)',
        'blink': 'blink 1s step-end infinite',
        'float': 'float 6s ease-in-out infinite',
        'burn': 'burn 2s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 107, 53, 0.4), 0 0 10px rgba(255, 107, 53, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(255, 107, 53, 0.6), 0 0 20px rgba(255, 107, 53, 0.4), 0 0 30px rgba(255, 107, 53, 0.2)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        burn: {
          '0%, 100%': { textShadow: '0 0 4px #FF6B35, 0 0 8px #FF6B35' },
          '50%': { textShadow: '0 0 8px #FF1744, 0 0 16px #FF1744, 0 0 24px #FF1744' },
        },
      },
    },
  },
  plugins: [],
}
