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
        navy: { DEFAULT: '#0B1F3A', light: '#152D52', dark: '#07152A' },
        gold: { DEFAULT: '#B8935A', light: '#CFA96E', dark: '#9A7840' },
        ocean: { DEFAULT: '#1565C0', light: '#4A90D9', dark: '#0D47A1' },
        cream: { DEFAULT: '#F8F4EE', dark: '#F0EAE0', deeper: '#E8E0D4' },
        slate: { DEFAULT: '#5C6478', light: '#8E97A8' },
        ivory: '#FDFBF8',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
        widest3: '0.32em',
      },
      borderRadius: {
        px: '1px',
        '2px': '2px',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
};
export default config;
