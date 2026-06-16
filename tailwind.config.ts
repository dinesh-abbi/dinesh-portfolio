import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Castimedia cinematic palette — deep blue + warm orange
        "bg-primary": "#080c14",
        "bg-elevated": "#0d1422",
        "bg-glass": "rgba(13, 20, 34, 0.7)",
        "accent-blue": "#3b82f6",
        "accent-orange": "#f97316",
        "accent-soft": "#60a5fa",
        "text-primary": "#f1f5f9",
        "text-muted": "#64748b",
        "text-subtle": "#94a3b8",
        "border-glass": "rgba(255, 255, 255, 0.06)",
        "border-blue": "rgba(59, 130, 246, 0.2)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "cinematic-hero": "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(249, 115, 22, 0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 20% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 60%)",
        "gradient-card": "linear-gradient(135deg, rgba(59,130,246,0.04) 0%, rgba(249,115,22,0.03) 100%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
