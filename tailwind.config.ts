import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Rich Black #101010 · Graphite #202124 · Charcoal #383838
        ink: {
          DEFAULT: "#101010",
          900: "#1c1c1e",
          800: "#202124",
          700: "#2b2b2e",
          600: "#383838",
        },
        // Champagne Gold #D4AF72 (accent). 700 is the text-safe shade for light backgrounds.
        brand: {
          DEFAULT: "#d4af72",
          400: "#e3c896",
          600: "#bf9a5c",
          700: "#7f6033",
        },
        // Platinum Silver #C5C5C5 · Off White #F5F5F3
        silver: {
          DEFAULT: "#c5c5c5",
          100: "#f5f5f3",
          200: "#e4e4e1",
          300: "#c5c5c5",
          500: "#8f8f8f",
          700: "#575757",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "metal": "linear-gradient(135deg,#f5f5f3 0%,#c5c5c5 50%,#e4e4e1 100%)",
      },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        shine: { from: { backgroundPosition: "200% 0" }, to: { backgroundPosition: "-200% 0" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        shine: "shine 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
