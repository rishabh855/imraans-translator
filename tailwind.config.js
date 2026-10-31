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
        bus: {
          yellow: '#FFC837',
          'yellow-light': '#FFE484',
          'yellow-dark': '#E5A600',
          orange: '#FF6B35',
          cream: '#FFFDF6',
          'cream-dark': '#FDF6E2',
          black: '#1E1B18',
          red: '#EF4444',
          green: '#10B981',
          blue: '#3B82F6',
        },
      },
      fontFamily: {
        comic: ['Fredoka', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'comic': '4px 4px 0px 0px #1E1B18',
        'comic-lg': '6px 6px 0px 0px #1E1B18',
        'comic-xl': '8px 8px 0px 0px #1E1B18',
        'comic-sm': '2px 2px 0px 0px #1E1B18',
        'comic-hover': '2px 2px 0px 0px #1E1B18',
      },
      keyframes: {
        busWiggle: {
          '0%, 100%': { transform: 'rotate(-1.5deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
        },
        busDrive: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        }
      },
      animation: {
        'bus-wiggle': 'busWiggle 2.5s ease-in-out infinite',
        'bus-bounce': 'bounceSubtle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
