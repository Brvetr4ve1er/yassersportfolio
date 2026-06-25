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
      padding: { DEFAULT: "1.25rem", sm: "1.5rem", lg: "2.5rem" },
      screens: { "2xl": "1360px" },
    },
    extend: {
      colors: {
        // ─── OXYGEN ISLAND DZ — lagoon-in-the-forest palette ──────────
        // The mood: turquoise water sunk into Bouchaoui forest, palm
        // canopy filtering Algerian afternoon light, terracotta tile
        // bar shelves, sun-bleached sand.
        lagoon: {
          DEFAULT: "#1d8da0",
          50: "#e9f7f9",
          100: "#c3e8ed",
          200: "#8fd2dc",
          300: "#5fb9c6",
          400: "#3aa3b4",
          500: "#1d8da0",
          600: "#147385",
          700: "#0e596a",
          800: "#093d4b",
          900: "#04252f",
        },
        deepwater: {
          DEFAULT: "#0c2a30",
          light: "#15464f",
          dark: "#06161a",
        },
        sand: {
          DEFAULT: "#ebd9b5",
          50: "#fbf6ec",
          100: "#f4e8d0",
          200: "#ebd9b5",
          300: "#dec291",
          400: "#cba66b",
          500: "#b08c4d",
        },
        palm: {
          DEFAULT: "#5a7a45",
          50: "#eef3e8",
          100: "#d3e0c1",
          200: "#a8c08a",
          300: "#7da05a",
          400: "#5a7a45",
          500: "#43602f",
          600: "#324821",
          700: "#243415",
          800: "#15200c",
          900: "#0a1006",
        },
        coral: {
          DEFAULT: "#ec6e4f",
          light: "#f49174",
          dark: "#b94c30",
        },
        ink: {
          DEFAULT: "#0c1a1d",
          soft: "#222e30",
          muted: "#6b7a7d",
          inverse: "#f4e8d0",
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
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        // Modern grotesque display + body. Arabic in Cairo.
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        arabic: ["var(--font-cairo)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      fontSize: {
        "display-1": [
          "clamp(3.5rem, 11vw, 10rem)",
          { lineHeight: "0.88", letterSpacing: "-0.04em" },
        ],
        "display-2": [
          "clamp(2.5rem, 7vw, 6rem)",
          { lineHeight: "0.92", letterSpacing: "-0.03em" },
        ],
        headline: [
          "clamp(2rem, 5vw, 4rem)",
          { lineHeight: "0.95", letterSpacing: "-0.025em" },
        ],
        editorial: [
          "clamp(1.5rem, 3vw, 2.5rem)",
          { lineHeight: "1.15", letterSpacing: "-0.01em" },
        ],
        title: ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.15" }],
        stat: [
          "clamp(2.5rem, 4vw, 3.75rem)",
          { lineHeight: "1", letterSpacing: "-0.02em" },
        ],
        eyebrow: ["0.7rem", { letterSpacing: "0.26em", lineHeight: "1" }],
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest: "0.25em",
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
        "slow-zoom": {
          "0%": { transform: "scale(1.02)" },
          "100%": { transform: "scale(1.12)" },
        },
        "water-shimmer": {
          "0%, 100%": { transform: "translateX(0) translateY(0)" },
          "50%": { transform: "translateX(8px) translateY(-4px)" },
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
        "slow-zoom": "slow-zoom 24s ease-out infinite alternate",
        "water-shimmer": "water-shimmer 8s ease-in-out infinite",
      },
      backgroundImage: {
        "lagoon-gradient":
          "linear-gradient(180deg, #15464f 0%, #1d8da0 60%, #5fb9c6 100%)",
        "sunset-gradient":
          "linear-gradient(180deg, #ec6e4f 0%, #b94c30 60%, #0c2a30 100%)",
        "forest-vignette":
          "radial-gradient(ellipse at center, transparent 0%, rgba(10, 16, 6, 0.6) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
