import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    backgroundColor: {
      primary: '#2c2734',
      orange: '#ff6d12',
    },
    fontFamily: {
      sans: 'var(--font-inter)',
    },
  },
  plugins: [],
};
export default config;
