import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF5C00', // Cor laranja dos botões
        secondary: '#1E1E1E', // Cor escura do card de objetivo
        tertiary: '#4A0404', // Cor vermelho escuro da seção Contribua
        'text-primary': '#333333',
        'text-secondary': '#666666',
      },
      container: {
        center: true,
        padding: '1rem',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
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
