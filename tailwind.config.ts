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
        // ─────────────────────────────────────────────────────────────────
        // L'Étoile de l'Est — refined brand palette
        // Anchored to actual logos: warm bronze + true noir + antique cream
        // ─────────────────────────────────────────────────────────────────
        noir: {
          DEFAULT: "#0c0d0a",
          50: "#1f201c",
          100: "#1a1b18",
          200: "#161814",
          300: "#121310",
          400: "#0f100d",
          500: "#0c0d0a",
          600: "#080906",
          700: "#050604",
          800: "#020302",
          900: "#000000",
        },
        bronze: {
          DEFAULT: "#c9a35b",
          50: "#fbf6e6",
          100: "#f4e8c4",
          200: "#e8d28d",
          300: "#dcbb52",
          400: "#d2ad48",
          500: "#c9a35b",
          600: "#a78441",
          700: "#7e6231",
          800: "#544122",
          900: "#2a2113",
        },
        cream: {
          DEFAULT: "#f1e9d6",
          50: "#fdfaf2",
          100: "#f8f2e3",
          200: "#f1e9d6",
          300: "#e2d5b2",
          400: "#cfbb87",
          500: "#b89e5f",
        },
        ember: {
          DEFAULT: "#d4633b",
          light: "#e8814e",
          dark: "#a04324",
          glow: "#f5a26d",
        },
        // ─────────────────────────────────────────────────────────────────
        // Warm family palette — sun-warmed, multi-generational, Algerian
        // ─────────────────────────────────────────────────────────────────
        clay: {
          DEFAULT: "#b56e3c",
          50: "#fbf2e8",
          100: "#f4e0c8",
          200: "#e6bf90",
          300: "#d59c5b",
          400: "#c58547",
          500: "#b56e3c",
          600: "#945830",
          700: "#6f4124",
          800: "#4a2c18",
          900: "#26160c",
        },
        olive: {
          DEFAULT: "#6b7a45",
          50: "#f4f6ec",
          100: "#e6ebd0",
          200: "#cdd5a3",
          300: "#a8b676",
          400: "#86955a",
          500: "#6b7a45",
          600: "#566236",
          700: "#414929",
          800: "#2c311b",
          900: "#16180d",
        },
        terracotta: {
          DEFAULT: "#3d2418",
          light: "#5a3625",
          dark: "#28160e",
        },
        sunlit: {
          DEFAULT: "#f5ede0",
          dawn: "#f8e9d0",
          noon: "#fcf6e8",
          dusk: "#f0d9b8",
        },
        // ─────────────────────────────────────────────────────────────────
        // Kept (with refinements) for legacy compatibility on inner routes
        // ─────────────────────────────────────────────────────────────────
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
          DEFAULT: "#c9a35b",
          50: "#fbf6e6",
          100: "#f4e8c4",
          200: "#e8d28d",
          300: "#dcbb52",
          400: "#d2ad48",
          500: "#c9a35b",
          600: "#a78441",
          700: "#7e6231",
          800: "#544122",
          900: "#2a2113",
        },
        parchment: {
          DEFAULT: "#f1e9d6",
          50: "#fdfaf2",
          100: "#f1e9d6",
          200: "#e2d5b2",
          300: "#cfbb87",
          400: "#b89e5f",
          500: "#9a8447",
        },
        ink: {
          DEFAULT: "#0c0d0a",
          soft: "#262722",
          muted: "#6b6b5e",
          inverse: "#f1e9d6",
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
      fontSize: {
        // ── Editorial type scale (extracted from the reference decks) ──
        // Serif display for hero + section titles; tight tracking, low
        // weight. Sans for body. Named so components stop hand-rolling
        // clamp() inline styles.
        "display-1": [
          "clamp(3.25rem, 10vw, 9rem)",
          { lineHeight: "0.9", letterSpacing: "-0.035em" },
        ],
        "display-2": [
          "clamp(2.5rem, 7vw, 6rem)",
          { lineHeight: "0.92", letterSpacing: "-0.03em" },
        ],
        headline: [
          "clamp(2.25rem, 5.5vw, 4.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.025em" },
        ],
        editorial: [
          "clamp(1.75rem, 3.5vw, 3.25rem)",
          { lineHeight: "1.1", letterSpacing: "-0.015em" },
        ],
        title: [
          "clamp(1.5rem, 2.5vw, 2.25rem)",
          { lineHeight: "1.1", letterSpacing: "-0.01em" },
        ],
        stat: [
          "clamp(2.5rem, 4vw, 3.75rem)",
          { lineHeight: "1", letterSpacing: "-0.02em" },
        ],
        "section-index": [
          "clamp(3rem, 7vw, 6.5rem)",
          { lineHeight: "0.8", letterSpacing: "-0.04em" },
        ],
        eyebrow: ["0.7rem", { letterSpacing: "0.24em", lineHeight: "1" }],
        // Kept for back-compat with earlier markup
        display: [
          "clamp(3rem, 9vw, 8rem)",
          { lineHeight: "0.95", letterSpacing: "-0.02em" },
        ],
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
        "shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
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
        "shimmer": "shimmer 3s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "noir-vignette":
          "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.55) 100%)",
        "noir-fade-top":
          "linear-gradient(to bottom, rgba(12,13,10,0.95) 0%, transparent 30%, transparent 70%, rgba(12,13,10,0.95) 100%)",
        "bronze-fade":
          "radial-gradient(circle at top right, rgba(201,163,91,0.18), transparent 55%)",
        "ember-fade":
          "radial-gradient(circle at 30% 50%, rgba(212,99,59,0.32), transparent 60%)",
        "grain":
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95  0 0 0 0 0.91  0 0 0 0 0.84  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
