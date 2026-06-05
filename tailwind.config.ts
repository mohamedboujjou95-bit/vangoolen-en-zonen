import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Primary: Deep Royal Blue ─────────────────────────
        primary: {
          50:  "#eff4ff",
          100: "#dce6fd",
          200: "#c0d0fc",
          300: "#95b0fa",
          400: "#6285f5",
          500: "#1a3a6b",   // main royal blue
          600: "#163162",
          700: "#122754",
          800: "#0e1f42",
          900: "#091530",
          950: "#05091a",
          DEFAULT: "#1a3a6b",
          foreground: "#FDFAF6",
        },
        // ── Accent: Brass / Messing Goud ────────────────────
        gold: {
          50:  "#fdf9ed",
          100: "#faf0d0",
          200: "#f4df9f",
          300: "#edc96b",
          400: "#C5A059",   // main brass
          500: "#b8893d",
          600: "#9a6f2e",
          700: "#7d5522",
          800: "#68431d",
          900: "#58371a",
          DEFAULT: "#C5A059",
          foreground: "#1a3a6b",
          light: "#E8D5A3",
          dark:  "#9a6f2e",
        },
        // ── Background: Antique Cream ────────────────────────
        cream: {
          50:  "#ffffff",
          100: "#FDFAF6",   // main antique cream
          200: "#f7f1e4",
          300: "#efe5ce",
          400: "#e3d2ae",
          DEFAULT: "#FDFAF6",
        },
        // ── Secondary: Warm Slate ────────────────────────────
        secondary: {
          50:  "#f8f7f5",
          100: "#eeece8",
          200: "#ddd9d2",
          300: "#c5bfb4",
          400: "#a89e90",
          500: "#8c7f70",
          600: "#6e6257",
          700: "#564e45",
          800: "#3d3830",
          900: "#252220",
          DEFAULT: "#6e6257",
          foreground: "#FDFAF6",
        },
        // ── Semantic ─────────────────────────────────────────
        success: {
          DEFAULT: "#2d6a4f",
          foreground: "#ffffff",
          light: "#d8f3dc",
        },
        danger: {
          DEFAULT: "#9b2226",
          foreground: "#ffffff",
          light: "#fde8e8",
        },
        warn: {
          DEFAULT: "#b5451b",
          foreground: "#ffffff",
          light: "#fef3c7",
        },
        // ── Base ─────────────────────────────────────────────
        background: "#FDFAF6",
        foreground: "#1a1512",
        muted: {
          DEFAULT: "#f7f1e4",
          foreground: "#6e6257",
        },
        border:  "#e3d2ae",
        ring:    "#C5A059",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#1a1512",
        },
        input: "#e3d2ae",
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#1a1512",
        },
        destructive: {
          DEFAULT: "#9b2226",
          foreground: "#ffffff",
        },
      },

      fontFamily: {
        serif:   ["var(--font-display)", "Georgia", "Cambria", "serif"],
        sans:    ["var(--font-body)",    "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)",    "system-ui", "sans-serif"],
      },

      fontSize: {
        "display-2xl": ["4.5rem",  { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-xl":  ["3.75rem", { lineHeight: "1.1",  letterSpacing: "-0.02em" }],
        "display-lg":  ["3rem",    { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        "display-md":  ["2.25rem", { lineHeight: "1.2",  letterSpacing: "-0.01em" }],
        "display-sm":  ["1.875rem",{ lineHeight: "1.25" }],
      },

      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "section": "6rem",
      },

      borderRadius: {
        sm:   "0.25rem",
        DEFAULT: "0.375rem",
        md:   "0.5rem",
        lg:   "0.625rem",
        xl:   "0.875rem",
        "2xl":"1.25rem",
        "3xl":"1.75rem",
      },

      boxShadow: {
        // Warm, classic shadows — not cold blue
        card:       "0 1px 4px 0 rgba(26,21,18,0.08), 0 1px 2px -1px rgba(26,21,18,0.06)",
        "card-md":  "0 4px 16px -2px rgba(26,21,18,0.1), 0 2px 4px -1px rgba(26,21,18,0.06)",
        "card-lg":  "0 12px 36px -6px rgba(26,21,18,0.14), 0 4px 8px -2px rgba(26,21,18,0.08)",
        "gold":     "0 4px 20px rgba(197,160,89,0.3)",
        "gold-lg":  "0 8px 40px rgba(197,160,89,0.4)",
        "blue":     "0 4px 20px rgba(26,58,107,0.25)",
        "blue-lg":  "0 8px 40px rgba(26,58,107,0.35)",
        "inset":    "inset 0 1px 3px rgba(26,21,18,0.12)",
        "emergency":"0 4px 24px rgba(155,34,38,0.3)",
      },

      animation: {
        "fade-up":        "fadeUp 0.6s ease-out forwards",
        "fade-in":        "fadeIn 0.5s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "pulse-gold":     "pulseGold 2.5s ease-in-out infinite",
        "spin-slow":      "spin 8s linear infinite",
        "shimmer":        "shimmer 2s linear infinite",
      },

      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%":   { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(197,160,89,0.4)" },
          "50%":      { boxShadow: "0 0 0 12px rgba(197,160,89,0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },

      backgroundImage: {
        // Deep navy-blue hero — authoritative
        "hero-gradient":   "linear-gradient(160deg, #0e1f42 0%, #1a3a6b 55%, #163162 100%)",
        // Subtle cream texture for sections
        "cream-texture":   "linear-gradient(180deg, #FDFAF6 0%, #f7f1e4 100%)",
        // Gold shimmer for buttons/badges
        "gold-shimmer":    "linear-gradient(90deg, #C5A059 0%, #E8D5A3 40%, #C5A059 60%, #9a6f2e 100%)",
        // Diagonal pattern for decorative elements
        "hatch-pattern":   "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(197,160,89,0.08) 4px, rgba(197,160,89,0.08) 8px)",
        // Section separator
        "divider-gold":    "linear-gradient(90deg, transparent, #C5A059, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
