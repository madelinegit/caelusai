import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        tensile: {
          black: '#0d0f12',
          white: '#f5f5f3',
          volt: '#c8ff3e',
          surface: '#1c1f26',
          steel: '#3d4352',
          textPrimary: '#f5f5f3',
          textSecondary: '#e8e8e5',
          textTertiary: '#7a8194'
        }
      }
    }
  },
  plugins: [],
};

export default config;
