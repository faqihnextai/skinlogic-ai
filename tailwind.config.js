/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
      },
      colors: {
        // Cool "tech/AI" accent — kept separate from the warm rose/amber
        // skincare brand palette so AI-specific UI (badges, processing
        // states, analysis steps) reads as distinctly "system-driven".
        ai: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
      },
    },
  },
  plugins: [],
}
