import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      colors: {
        gray: {
          50: 'rgb(var(--gray-50) / <alpha-value>)',
          100: 'rgb(var(--gray-100) / <alpha-value>)',
          200: 'rgb(var(--gray-200) / <alpha-value>)',
          300: 'rgb(var(--gray-300) / <alpha-value>)',
          400: 'rgb(var(--gray-400) / <alpha-value>)',
          500: 'rgb(var(--gray-500) / <alpha-value>)',
          600: 'rgb(var(--gray-600) / <alpha-value>)',
          700: 'rgb(var(--gray-700) / <alpha-value>)',
          800: 'rgb(var(--gray-800) / <alpha-value>)',
          900: 'rgb(var(--gray-900) / <alpha-value>)',
          950: 'rgb(var(--gray-950) / <alpha-value>)',
        },
        strong: 'rgb(var(--gray-50) / <alpha-value>)',
        primary: 'rgb(var(--gray-100) / <alpha-value>)',
        secondary: 'rgb(var(--gray-200) / <alpha-value>)',
        default: 'rgb(var(--gray-300) / <alpha-value>)',
        label: 'rgb(var(--gray-400) / <alpha-value>)',
        muted: 'rgb(var(--gray-500) / <alpha-value>)',
        subtle: 'rgb(var(--gray-600) / <alpha-value>)',
        divider: 'rgb(var(--gray-700) / <alpha-value>)',
        panel: 'rgb(var(--gray-800) / <alpha-value>)',
        surface: 'rgb(var(--gray-900) / <alpha-value>)',
        page: 'rgb(var(--gray-950) / <alpha-value>)',
        semantic: {
          up: 'rgb(var(--semantic-up) / <alpha-value>)',
          'up-dark': 'rgb(var(--semantic-up-dark) / <alpha-value>)',
          down: 'rgb(var(--semantic-down) / <alpha-value>)',
          'down-dark': 'rgb(var(--semantic-down-dark) / <alpha-value>)',
          neutral: 'rgb(var(--semantic-neutral) / <alpha-value>)',
          maker: 'rgb(var(--semantic-maker) / <alpha-value>)',
          taker: 'rgb(var(--semantic-taker) / <alpha-value>)',
          'status-success': 'rgb(var(--semantic-status-success) / <alpha-value>)',
          'status-pending': 'rgb(var(--semantic-status-pending) / <alpha-value>)',
          'status-info': 'rgb(var(--semantic-status-info) / <alpha-value>)',
          'status-critical': 'rgb(var(--semantic-status-critical) / <alpha-value>)',
          'status-warning': 'rgb(var(--semantic-status-warning) / <alpha-value>)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
