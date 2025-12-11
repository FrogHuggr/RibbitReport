/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ═══════════════════════════════════════════════════════════════
        // ASA BRAND COLORS
        // ═══════════════════════════════════════════════════════════════
        'asa-green': '#7AC143',
        'asa-green-dark': '#5A9A2F',
        'asa-green-light': '#9ED36B',
        'asa-blue': '#97B3CA',
        'asa-blue-light': '#C5D6E5',
        'asa-blue-dark': '#6A8FAB',
        'asa-yellow': '#FFD100',
        'asa-yellow-light': '#FFF0A0',
        'asa-yellow-dark': '#D4AF00',
        'asa-grey': '#455560',
        'asa-grey-light': '#808080',

        // ═══════════════════════════════════════════════════════════════
        // ADVENTURE PALETTE
        // ═══════════════════════════════════════════════════════════════

        // Leather & Wood
        'leather': {
          DEFAULT: '#3D2317',
          dark: '#2C1810',
          light: '#5D3A2A',
        },
        'mahogany': '#4A2C2A',
        'walnut': '#5C4033',

        // Parchment & Paper
        'parchment': {
          DEFAULT: '#F5F0E6',
          light: '#FFFEF7',
          dark: '#E8DCC8',
        },
        'aged-paper': '#FBF8F1',
        'manila': '#F2E2C4',

        // Gold & Brass
        'gold': {
          DEFAULT: '#D4AF37',
          light: '#F4D03F',
          dark: '#B8860B',
        },
        'brass': '#B5A642',
        'bronze': '#CD7F32',

        // Amber & Sepia
        'sepia': {
          DEFAULT: '#704214',
          light: '#8B6914',
        },

        // Ink colors
        'ink': {
          DEFAULT: '#2D3436',
          black: '#1A1A1A',
          brown: '#3D2914',
          blue: '#1E3A5F',
          faded: '#6B5B4D',
        },

        // Wax Seal
        'wax': {
          DEFAULT: '#C41E3A',
          dark: '#8B0000',
          light: '#DC3545',
        },

        // ═══════════════════════════════════════════════════════════════
        // UI COLORS
        // ═══════════════════════════════════════════════════════════════
        'cream': '#FFFDF8',
        'paper': '#F7F4EE',

        // ═══════════════════════════════════════════════════════════════
        // IUCN STATUS COLORS
        // ═══════════════════════════════════════════════════════════════
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
        // Display - Bold headlines
        'display': ['"Lilita One"', '"Archivo Black"', 'cursive'],

        // Body - Readable content
        'body': ['"Nunito"', '"Segoe UI"', 'sans-serif'],

        // Serif - Explorer's journal, naturalist notes
        'serif': ['"Libre Baskerville"', 'Georgia', 'serif'],

        // Typewriter - Expedition logs, dates
        'typewriter': ['"Special Elite"', '"Courier New"', 'monospace'],

        // Handwritten - Personal notes
        'handwritten': ['"Patrick Hand"', 'cursive'],

        // Fun - Buttons, badges
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
        'shimmer': 'shimmer 2s linear infinite',
        'paper-flutter': 'paper-flutter 4s ease-in-out infinite',
      },

      boxShadow: {
        // Standard shadows
        'glow-green': '0 0 24px rgba(122, 193, 67, 0.4)',
        'glow-yellow': '0 0 24px rgba(255, 209, 0, 0.4)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.3)',
        'card': '0 4px 16px rgba(69, 85, 96, 0.12)',
        'card-hover': '0 8px 32px rgba(69, 85, 96, 0.18)',

        // Adventure shadows
        'leather': '0 10px 40px rgba(44, 24, 16, 0.5)',
        'paper': '0 4px 20px rgba(139, 90, 43, 0.15)',
        'emboss': 'inset 0 2px 4px rgba(255, 255, 255, 0.1), inset 0 -2px 4px rgba(0, 0, 0, 0.2)',
        'inset-paper': 'inset 0 0 30px rgba(139, 90, 43, 0.05)',
        'wax-seal': '0 4px 15px rgba(0, 0, 0, 0.4), inset 0 2px 10px rgba(255, 255, 255, 0.2)',
      },

      backgroundImage: {
        // Gradient backgrounds
        'leather-gradient': 'linear-gradient(135deg, #2C1810 0%, #3D2317 50%, #2C1810 100%)',
        'parchment-gradient': 'linear-gradient(135deg, #FFFEF7 0%, #FBF8F1 50%, #F5F0E6 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F4D03F 50%, #D4AF37 100%)',
        'wax-gradient': 'radial-gradient(circle at 30% 30%, #C41E3A 0%, #8B0000 100%)',

        // Texture patterns (pure CSS)
        'paper-lines': 'linear-gradient(transparent 27px, #E8E4D9 27px, #E8E4D9 28px, transparent 28px)',
        'aged-texture': 'radial-gradient(ellipse at 20% 80%, rgba(139, 90, 43, 0.1) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139, 90, 43, 0.08) 0%, transparent 50%)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
