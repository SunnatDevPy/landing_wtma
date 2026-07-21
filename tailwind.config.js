/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f6fb",
          100: "#e8ecf5",
          200: "#c5cfe3",
          300: "#9aabcf",
          400: "#6b82b5",
          500: "#e62e52",
          600: "#3b548d",
          700: "#2f4575",
          800: "#243a6e",
          900: "#1a2d52",
          950: "#0f1a30",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "Segoe UI", "system-ui", "sans-serif"],
        heading: ["IBM Plex Sans", "Segoe UI", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "mesh-shift": {
          "0%, 100%": { opacity: "0.5", transform: "translate(0, 0) scale(1)" },
          "50%": { opacity: "0.8", transform: "translate(2%, -1%) scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -8px, 0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "mesh-shift": "mesh-shift 8s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #1a2d52 0%, #2f4575 50%, #3b548d 100%)",
      },
    },
  },
  plugins: [],
};
