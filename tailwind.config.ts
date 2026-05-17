import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        forest: {
          DEFAULT: "#0a1f0e",
          50: "#eef4ef",
          100: "#d2e2d4",
          200: "#a4c4a8",
          300: "#76a67c",
          400: "#488851",
          500: "#2d6a36",
          600: "#1f5028",
          700: "#15391c",
          800: "#0a1f0e",
          900: "#050f07",
        },
        gold: {
          DEFAULT: "#b08d3e",
          50: "#fbf6e9",
          100: "#f5ebc8",
          200: "#ead68f",
          300: "#dfc057",
          400: "#cfaa3b",
          500: "#b08d3e",
          600: "#8c6f30",
          700: "#695224",
          800: "#46361a",
          900: "#2a2010",
        },
        parchment: {
          DEFAULT: "#f5f0e8",
          50: "#fdfbf6",
          100: "#f5f0e8",
          200: "#ebe2cf",
          300: "#dccaa3",
          400: "#c9ac77",
          500: "#b58e51",
        },
        ink: {
          DEFAULT: "#1a1a16",
          soft: "#3a3a32",
          muted: "#6b6b5e",
          inverse: "#f0ece0",
        },
        success: "#2d7a4f",
        warning: "#e07b1a",
        danger: "#c4391a",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        arabic: ["var(--font-cairo)", "system-ui", "sans-serif"],
        mono: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "orchard-gradient":
          "linear-gradient(135deg, #0a1f0e 0%, #15391c 60%, #1f5028 100%)",
        "sunlight-fade":
          "radial-gradient(circle at top, rgba(176,141,62,0.18), transparent 60%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
