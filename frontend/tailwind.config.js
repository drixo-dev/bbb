/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          950: "#150006",
          900: "#2A000D",
          800: "#400014",
          700: "#5C001C",
          600: "#780025",
          500: "#9C0030",
        },
        emerald: {
          900: "#022B1A",
          800: "#03472C",
          700: "#046942",
          600: "#068F5A",
          500: "#08B874",
        },
        gold: {
          antique: "#D4AF37",
          champagne: "#E8C96B",
          warm: "#F3E5AB",
          light: "#FFF5E6",
          dark: "#AA820A",
        },
        royal: {
          ivory: "#F8F3EB",
          cream: "#FFF5E6",
          orange: "#D97706",
          card: "#400014",
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel Decorative"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        marcellus: ['"Marcellus"', 'serif'],
        poppins: ['"Poppins"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.35)',
        'gold-intense': '0 0 40px rgba(232, 201, 107, 0.5)',
        'royal-card': '0 15px 35px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'gold-foil': 'linear-gradient(135deg, #D4AF37 0%, #FFF5E6 50%, #D4AF37 100%)',
        'gold-foil-soft': 'linear-gradient(135deg, #E8C96B 0%, #F3E5AB 50%, #D4AF37 100%)',
        'royal-maroon-gradient': 'radial-gradient(circle at center, #780025 0%, #5C001C 60%, #2A000D 100%)',
        'royal-card-gradient': 'linear-gradient(180deg, rgba(120, 0, 37, 0.95) 0%, rgba(42, 0, 13, 0.98) 100%)',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        }
      },
      animation: {
        sway: 'sway 6s ease-in-out infinite',
        shimmer: 'shimmer 4s infinite linear',
        float: 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
