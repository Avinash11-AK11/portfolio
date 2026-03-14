module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#F5F1E8",
          100: "#E0B66F",
          200: "#D4AF6D",
          300: "#C9A96F",
          400: "#B89860",
          500: "#A0864D",
          600: "#8B7543",
        },
        brown: {
          50: "#F5F1E8",
          100: "#EFE8E0",
          200: "#D3D0CA",
          300: "#C9C6BE",
          400: "#A0664D",
          500: "#805543",
          600: "#6B4B43",
          700: "#5A3F39",
        },
        charcoal: "#2C2C2C",
      },
      fontFamily: {
        serif: ["Merriweather", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-in-out",
        slideUp: "slideUp 0.6s ease-out",
        scaleIn: "scaleIn 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      boxShadow: {
        luxury: "0 20px 60px rgba(0, 0, 0, 0.15)",
        "luxury-sm": "0 10px 30px rgba(212, 175, 55, 0.1)",
      },
    },
  },
  plugins: [],
}
