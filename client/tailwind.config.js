/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          950: '#0B0D10',
          900: '#12151A',
          850: '#171B21',
          800: '#1E232B',
          700: '#2A313C',
          600: '#3D4756',
          500: '#5A667A',
        },
        warmwhite: {
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#EBE5D8',
          300: '#DFD5C2',
        },
        sand: {
          100: '#F3EDE2',
          200: '#E7DCB9',
          300: '#D5C4A1',
          400: '#C2AB82',
          500: '#B09467',
        },
        terracotta: {
          400: '#E7784D',
          500: '#D35B2D',
          600: '#B8461C',
          700: '#943313',
        },
        templegreen: {
          400: '#2E7D5B',
          500: '#1E5E43',
          600: '#134631',
          700: '#0C3122',
        },
        oceanblue: {
          400: '#2F80ED',
          500: '#1E65C9',
          600: '#124B9A',
          700: '#0B336B',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'depth-sm': '0 4px 14px 0 rgba(0, 0, 0, 0.25)',
        'depth-md': '0 12px 28px -4px rgba(0, 0, 0, 0.35), 0 4px 10px -2px rgba(0, 0, 0, 0.2)',
        'depth-lg': '0 24px 48px -12px rgba(0, 0, 0, 0.45), 0 8px 16px -4px rgba(0, 0, 0, 0.3)',
        'depth-3d': '0 30px 60px -15px rgba(18, 21, 26, 0.6), 0 0 0 1px rgba(255, 255, 255, 0.08) inset',
        'glow-terracotta': '0 0 25px rgba(211, 91, 45, 0.35)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.75 },
        },
      },
    },
  },
  plugins: [],
}
