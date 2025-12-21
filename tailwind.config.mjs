/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
            DEFAULT: '#ff6b35', 
            dark: '#e55a2b', 
            light: '#ff8555',},
        secondary: {
            DEFAULT: '#00e5ff',
            dark: '#00b4cc',
            light: '#33ebff',
        },
        accent: {
            DEFAULT: '#ff1744',
            dark: '#cc1236',
            light: '#ff4569',
        },
        neutral: {
            900: '#0d0d0d',
            800: '#1a1a1a',
            700: '#2d2d2d',
            600: '#404040',
            500: '#6b7280',
            400: '#9ca3af',
            300: '#d1d5db',
            200: '#e5e7eb',
            100: '#f3f4f6',
            50: '#f9fafb',
        },
        background: {
            DEFAULT: '#0d0d0d',
            elevated: '#1a1a1a',
            overlay: 'rgba(0, 0, 0, 0.5)',
        },
        surface: {
            DEFAULT: 'rgba(255, 255, 255, 0.03)',
            hover: 'rgba(255, 255, 255, 0.05)',
        },
        border: {
            DEFAULT: 'rgba(255, 107, 53, 0.2)',
            focus: '#ff6b35',
        },
        text: {
            primary: '#f5f1e8',
            secondary: '#9ca3af',
            muted: '#6b7280',
        },
        status: {
            success: '#00e5ff',
            warning: '#fbbf24',
            error: '#ff1744',
            info: '#00b4ff',
        },
      },
       fontFamily: {
        mono: ['"Courier Prime"', 'monospace'],
        display: ['Orbitron', 'monospace'],
      },
      animation: {
            'fade-in': 'fade-in 0.3s ease-out',
            'slide-up': 'slide-up 0.5s ease-out',
      },
      keyframes: {
            'fade-in': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
        },
        'slide-up': {
            '0%': { transform: 'translateY(20px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
