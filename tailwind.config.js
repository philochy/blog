import tailwindForms from '@tailwindcss/forms';
import daisyui from 'daisyui';
import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,ts,tsx}'],
  safelist: [{ pattern: /^swiper-/ }],
  theme: {
    extend: {
      screens: {
        md: '750px',
      },
      colors: {
        'primary-blue': 'var(--primary-blue)',
        'primary-dark-blue': 'var(--primary-dark-blue)',
        'secondary-blue': 'var(--secondary-blue)',
        'text-white': 'var(--text-white)',
        'dark': 'var(--text-dark)',
        'gray-light': 'var(--gray-light)',
        'gray-dark': 'var(--gray-dark)',
        'icon-gray': 'var(--icon-gray)',
        'primary': 'var(--primary-color)',
        'medium-grey': 'var(--medium-grey)',
        'dark-grey': 'var(--dark-grey)',
        'light-grey': 'var(--light-grey)',
        'border-grey': 'var(--border-grey)',
      },
      fontFamily: {
        sans: [
          'var(--font-sans, ui-sans-serif)',
          ...defaultTheme.fontFamily.sans,
        ],
        serif: [
          'var(--font-serif, ui-serif)',
          ...defaultTheme.fontFamily.serif,
        ],
        heading: [
          'var(--font-heading, ui-sans-serif)',
          ...defaultTheme.fontFamily.sans,
        ],
      },
      fontSize: {
        'banner-title': 'var(--font-size-banner-title)',
        'banner-desc': 'var(--font-size-banner-desc)',
        'card-title': 'var(--font-size-card-title)',
        'card-desc': 'var(--font-size-card-desc)',
        'card-tag': 'var(--font-size-card-tag)',
        'card-person-name': 'var(--font-size-card-person-name)',
        'card-time': 'var(--font-size-card-time)',
        'tabs': 'var(--font-size-tab)',
        'breadcrumb': 'var(--font-size-breadcrumb)',
        'banner-btn': 'var(--font-size-banner-btn)',
        'base': [
          'var(--font-size-heading)',
          {
            lineHeight: 'var(--line-height-base)',
            fontWeight: '400',
          },
        ],
        'lg': [
          'var(--font-size-large)',
          {
            lineHeight: 'var(--line-height-base)',
            fontWeight: '400',
          },
        ],
      },
      lineHeight: {
        'banner-title': 'var(--line-height-banner-title)',
        'banner-desc': 'var(--line-height-banner-desc)',
        'card-title': 'var(--line-height-card-title)',
        'card-desc': 'var(--line-height-card-desc)',
        'card-tag': 'var(--line-height-card-tag)',
        'card-person-name': 'var(--line-height-card-person-name)',
        'card-time': 'var(--line-height-card-time)',
        'tabs': 'var(--line-height-tab)',
        'breadcrumb': 'var(--line-height-breadcrumb)',
        'banner-btn': 'var(--line-height-banner-btn)',
      },
      spacing: {
        small: 'var(--gap-size-small)',
        large: 'var(--gap-size-large)',
      },
      padding: {
        'small': 'var(--spacing-small)',
        'medium': 'var(--spacing-medium)',
        'large': 'var(--spacing-large)',
        'xlarge': 'var(--padding-xlarge)',
        'card-x-tag': 'var(--padding-x-card-tag)',
        'card-y-tag': 'var(--padding-y-card-tag)',
        'tab-x': 'var(--padding-x-tab)',
        'tab-y': 'var(--padding-y-tab)',
        'banner-btn-x': 'var(--padding-x-banner-btn)',
        'banner-btn-y': 'var(--padding-y-banner-btn)',
      },
      animation: {
        fade: 'fadeInUp 1s both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
    tailwindForms,
    daisyui,
  ],
  darkMode: 'class',
};
