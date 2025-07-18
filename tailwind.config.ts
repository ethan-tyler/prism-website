import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#635bff",
          600: "#5046e5",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        secondary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
        },
        accent: {
          50: "#f0fdff",
          100: "#ccfbff",
          200: "#99f6ff",
          300: "#66f0ff",
          400: "#33eaff",
          500: "#00d4ff",
          600: "#00aacc",
          700: "#008099",
          800: "#005566",
          900: "#002b33",
        },
        success: "#00d924",
        warning: "#ffbb00",
        danger: "#ff4747",
        "text-primary": "#0a2540",
        "text-secondary": "#425466",
        "text-muted": "#697386",
        "text-light": "#8792a2",
        "bg-secondary": "#f6f9fc",
        "bg-tertiary": "#fafbfc",
        "bg-dark": "#0a2540",
        border: "#e3e8ee",
        "border-light": "#f0f3f7",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeInUp: "fadeInUp 0.8s ease-out forwards",
        fadeInRight: "fadeInRight 0.8s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite",
        growBar: "growBar 1.5s ease-out forwards",
        slideIn: "slideIn 0.5s ease forwards",
        shimmer: "shimmer 1.5s infinite",
        rotate: "rotate 30s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "0.8" },
        },
        growBar: {
          "0%": { transform: "scaleY(0)", opacity: "0" },
          "100%": { transform: "scaleY(1)", opacity: "1" },
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 0 48px rgba(99,91,255,0.12)",
        xl: "0 24px 48px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
} satisfies Config;
