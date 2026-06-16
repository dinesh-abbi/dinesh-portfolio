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
        "bg-primary": "#0a0e1a",
        "bg-elevated": "#131825",
        "accent-blue": "#3b82f6",
        "accent-soft": "#60a5fa",
        "text-primary": "#e2e8f0",
        "text-muted": "#8b97a8",
        "border-custom": "rgba(255, 255, 255, 0.06)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
