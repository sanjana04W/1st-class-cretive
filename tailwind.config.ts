import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand color palette – elegant gold, champagne, deep charcoal
        brand: {
          gold: "#C9A84C",
          "gold-light": "#E8C97A",
          "gold-dark": "#9A7A2E",
          champagne: "#F5EDD6",
          cream: "#FBF7F0",
          charcoal: "#2C2C2C",
          "charcoal-light": "#4A4A4A",
          rose: "#C8687A",
          "rose-light": "#E8A0AD",
          teal: "#3A7D8C",
        },
      },
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'Lato'", "sans-serif"],
        accent: ["'Cormorant Garamond'", "serif"],
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)",
        "hero-overlay":
          "linear-gradient(to bottom, rgba(44,44,44,0.5) 0%, rgba(44,44,44,0.3) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.7s ease-out",
        "shimmer": "shimmer 2s infinite linear",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      boxShadow: {
        "gold": "0 4px 24px rgba(201,168,76,0.25)",
        "gold-lg": "0 8px 40px rgba(201,168,76,0.35)",
        "card": "0 4px 20px rgba(0,0,0,0.08)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
