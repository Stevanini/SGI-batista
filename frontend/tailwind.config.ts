import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: 'var(--font-inter)',
    },
    extend: {
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '50%': { transform: 'scale(0.75)', opacity: '0.5' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        scaleUp: 'scaleUp 0.5s ease-in-out forwards', // Duração e easing definidos aqui
      },
    },
  },
  plugins: [],
};
export default config;
