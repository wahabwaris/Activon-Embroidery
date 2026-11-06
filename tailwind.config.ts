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
        ink: {
          DEFAULT: "#0d0d0f",
          900: "#0d0d0f",
          800: "#151518",
          700: "#1d1d21",
          600: "#2a2a30",
        },
        brand: {
          DEFAULT: "#e1251b",
          600: "#c81e15",
          400: "#ff4a3d",
        },
        silver: {
          DEFAULT: "#a9adb5",
          100: "#f2f3f5",
          200: "#e1e3e7",
          300: "#c9ccd2",
          500: "#8b9099",
          700: "#5b6068",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "metal": "linear-gradient(135deg,#f5f6f8 0%,#c9ccd2 35%,#8b9099 50%,#d9dce1 65%,#a9adb5 100%)",
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
