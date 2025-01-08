/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
      },
      colors: {
        'content-primary': '#1a1f36',
        'content-secondary': '#4f566b',
        dimed: '#f7fafc',
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        'dark-pink': '#be185d',
        error: '#ef4444',
      },
      boxShadow: {
        card: '0px 4px 24px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
