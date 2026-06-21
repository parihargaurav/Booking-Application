/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Booking.com inspired palette
        primary: {
          DEFAULT: '#003580', // deep navy - header / brand / headings
          dark: '#002a66',
          light: '#06408f',
        },
        secondary: {
          DEFAULT: '#0071c2', // action blue - buttons / links / CTAs
          dark: '#00487a',
          light: '#1a8cd8',
        },
        accent: {
          DEFAULT: '#febb02', // highlight yellow - badges / ratings
          dark: '#e2a800',
        },
        surface: '#f5f5f7',
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(0,0,0,0.10)',
        'card-hover': '0 4px 16px 0 rgba(0,0,0,0.16)',
        dialog: '0 16px 40px -8px rgba(0,53,128,0.35)',
      },
      borderRadius: {
        card: '8px',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
