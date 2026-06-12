/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-surface": "var(--bg-surface)",
        "bg-card": "var(--bg-card)",
        "bg-raised": "var(--bg-raised)",
        gold: "var(--gold)",
        "gold-dim": "var(--gold-dim)",
        vermillion: "var(--vermillion)",
        teal: "var(--teal)",
        "teal-dim": "var(--teal-dim)",
        "text-1": "var(--text-1)",
        "text-2": "var(--text-2)",
        "text-3": "var(--text-3)",
      },
      borderColor: {
        DEFAULT: "var(--border)",
        gold: "var(--border-gold)",
        vermillion: "var(--vermillion)",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        editorial: ["Syne", "sans-serif"],
        body: ["Inter", "sans-serif"],
        sanskrit: ["Noto Serif Devanagari", "serif"],
        ui: ["Inter", "sans-serif"],
      },
      animation: {
        'rotate-slow': 'rotateSlow 120s linear infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'red-thread': 'redThread 6s ease-in-out infinite',
      },
      keyframes: {
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        redThread: {
          '0%, 100%': { transform: 'translateX(0) scaleX(1)' },
          '50%': { transform: 'translateX(2px) scaleX(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
