/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ASA Brand Colors
        'asa-green': '#7AC143',
        'asa-green-dark': '#5A9A2F',
        'asa-blue': '#97B3CA',
        'asa-blue-light': '#C5D6E5',
        'asa-yellow': '#FFD100',
        'asa-yellow-light': '#FFF0A0',
        'asa-grey': '#455560',
        'asa-grey-light': '#808080',

        // UI Colors
        'cream': '#FFFDF8',
        'paper': '#F7F4EE',
        'ink': '#2D3436',

        // IUCN Status colors - kid-friendly vibrant
        'status-lc': '#27AE60',
        'status-nt': '#F1C40F',
        'status-vu': '#F39C12',
        'status-en': '#E74C3C',
        'status-cr': '#C0392B',
        'status-ew': '#8E44AD',
        'status-ex': '#2C3E50',
        'status-dd': '#95A5A6',
      },
      fontFamily: {
        'display': ['"Lilita One"', '"Archivo Black"', 'cursive'],
        'body': ['"Nunito"', '"Segoe UI"', 'sans-serif'],
        'handwritten': ['"Patrick Hand"', 'cursive'],
        'fun': ['"Fredoka"', 'sans-serif'],
      },
      maxWidth: {
        'mobile': '430px',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-top': 'env(safe-area-inset-top)',
        'nav': '72px',
      },
      animation: {
        'bounce-in': 'bounce-in 0.5s ease-out',
        'wiggle': 'wiggle 0.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'stamp-collect': 'stamp-collect 0.6s ease-out',
        'confetti': 'confetti 1s ease-out forwards',
      },
      boxShadow: {
        'glow-green': '0 0 24px rgba(122, 193, 67, 0.4)',
        'glow-yellow': '0 0 24px rgba(255, 209, 0, 0.4)',
        'card': '0 4px 16px rgba(69, 85, 96, 0.12)',
        'card-hover': '0 8px 32px rgba(69, 85, 96, 0.18)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
