/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EDF3F0', 100: '#D5E5DC', 200: '#AAC9B8', 300: '#7FAE95',
          400: '#549271', 500: '#315C4C', 600: '#27503F', 700: '#1E4433',
          800: '#153828', 900: '#0C2C1D', 950: '#061610',
        },
        accent: {
          50: '#FDF6EC', 100: '#FAE9CE', 200: '#F4D09D', 300: '#EDB86C',
          400: '#E5A040', 500: '#D9A16A', 600: '#C8904F', 700: '#A67038',
          800: '#845225', 900: '#623A15',
        },
        stone: {
          25: '#F8F8F5', 50: '#F3F3F0', 100: '#E8EAE3', 200: '#E5E7E2',
          300: '#C8CBBC', 400: '#9EA397', 500: '#737B74', 600: '#5A625B',
          700: '#424942', 800: '#2D332E', 900: '#202622',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'md': '0 4px 12px -2px rgba(0,0,0,0.08), 0 2px 6px -2px rgba(0,0,0,0.04)',
        'lg': '0 8px 24px -4px rgba(0,0,0,0.10), 0 4px 10px -4px rgba(0,0,0,0.05)',
        'card': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'soft': '0 4px 12px -2px rgba(0,0,0,0.08)',
      },
      letterSpacing: {
        tighter: '-0.03em',
        tight: '-0.02em',
      },
    },
  },
  plugins: [],
};
