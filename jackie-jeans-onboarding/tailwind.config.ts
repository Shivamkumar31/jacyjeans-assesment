import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#f5f5f5',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui'],
      },
    },
  },
  plugins: [],
}
export default config
