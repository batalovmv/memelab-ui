import type { Config } from 'tailwindcss';

/** Helper: wrap a CSS-var (storing space-separated RGB channels) for Tailwind's opacity modifier */
const rgb = (cssVar: string) =>
  `rgb(var(${cssVar}) / <alpha-value>)`;

const memelabPreset: Partial<Config> = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: rgb('--ml-bg'),
          0: rgb('--ml-surface-0'),
          50: rgb('--ml-surface-50'),
          100: rgb('--ml-surface-100'),
          200: rgb('--ml-surface-200'),
          300: rgb('--ml-surface-300'),
          400: rgb('--ml-surface-400'),
        },
        primary: {
          DEFAULT: rgb('--ml-primary'),
          light: rgb('--ml-primary-light'),
          dark: rgb('--ml-primary-dark'),
        },
        accent: {
          DEFAULT: rgb('--ml-accent'),
          light: rgb('--ml-accent-light'),
          dark: rgb('--ml-accent-dark'),
        },
        glow: {
          purple: rgb('--ml-glow-purple'),
          pink: rgb('--ml-glow-pink'),
        },
        success: rgb('--ml-success'),
        warning: rgb('--ml-warning'),
        danger: rgb('--ml-danger'),
      },
      fontFamily: {
        sans: ['var(--ml-font-sans)'],
      },
      borderRadius: {
        surface: 'var(--ml-radius-md)',
      },
      boxShadow: {
        surface: 'var(--ml-shadow-surface)',
        'surface-hover': 'var(--ml-shadow-surface-hover)',
        glow: 'var(--ml-shadow-glow)',
        'glow-lg': 'var(--ml-shadow-glow-lg)',
        'glow-accent': 'var(--ml-shadow-glow-accent)',
      },
      animation: {
        float: 'ml-float 6s ease-in-out infinite',
        'float-delayed': 'ml-float 6s ease-in-out 2s infinite',
        gradient: 'ml-gradient 15s ease infinite',
        'pulse-glow': 'ml-pulse-glow 2s ease-in-out infinite',
        'fade-up': 'ml-fade-up 0.8s ease-out forwards',
        'fade-up-delayed': 'ml-fade-up 0.8s ease-out 0.2s forwards',
        'modal-backdrop': 'ml-modal-backdrop 140ms ease-out both',
        'modal-pop': 'ml-modal-pop 160ms cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'ml-shimmer 2s ease-in-out infinite',
        spin: 'ml-spin 1s linear infinite',
      },
      keyframes: {
        'ml-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'ml-gradient': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'ml-pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'ml-fade-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ml-modal-backdrop': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'ml-modal-pop': {
          from: { opacity: '0', transform: 'translateY(6px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'ml-shimmer': {
          '0%': { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'ml-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  /*
   * Component classes (.glass, .surface, .text-gradient, etc.) are defined in
   * src/styles/components.css and shipped via @memelabui/ui/styles.
   * They are NOT duplicated here to avoid double-injection when consumers
   * use both the preset and the CSS import (the recommended setup).
   */
};

export default memelabPreset;
