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
          900: "#3B0811",
          800: "#4A0B17",
          700: "#5D0F1D",
          600: "#6E1529",
          500: "#8B1E34",
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
          card: "#4A0B17",
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
        'royal-maroon-gradient': 'radial-gradient(circle at center, #6E1529 0%, #5D0F1D 60%, #3B0811 100%)',
        'royal-card-gradient': 'linear-gradient(180deg, rgba(110, 21, 41, 0.95) 0%, rgba(61, 9, 21, 0.98) 100%)',
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
