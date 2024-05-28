/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit',
  content: ['./src/**/*.{ts,tsx,css}'],
  theme: {
    fontFamily: {
      HindSiliguri: ['var(--font-hind-siliguri)', ...fontFamily.sans]
    },
    screens: {
      xs: { min: '475px' },
      ...defaultTheme.screens,
      'max-md': { max: '768px' },
      'max-xs': { max: '475px' }
    },
    colors: {
      black: '#000000',
      white: '#ffffff'
    },
    aspectRatio: {
      '1/1': '1 / 1'
    },
    extend: {
      backgroundImage: {
        hacker: "url('/public/hacker.png')"
      },
      containers: {
        '2xs': '16rem'
      }
    }
  },
  daisyui: {
    themes: [
      {
        'kyc-wonder': {
          primary: '#22C55E',
          'primary-focus': '#D31B5D',
          'primary-content': '#F8F8F8',
          secondary: '#000',
          'secondary-focus': '#000',
          'secondary-content': '#000',
          neutral: '#F8F8F8',
          'neutral-focus': '#D6D6D6',
          'neutral-content': '#24252B',
          'base-100': '#F8F8F8',
          'base-200': '#D6D6D6',
          'base-300': '#24252B',
          'base-content': '#F8F8F8',
          info: '#1DA1F2',
          'info-content': '#F8F8F8',
          success: '#1ECDBC',
          'success-content': '#F8F8F8',
          warning: '#FBBD23',
          'warning-content': '#F8F8F8',
          error: '#F87272',
          'error-content': '#F8F8F8',
          '--rounded-btn': '0.5rem',
          '--border-btn': '1px',
          '--btn-focus-scale': '',
          '--animation-btn': '',
          '--btn-text-case': '',
          '--animation-input': '0.3s'
        }
      }
    ],
    styled: true,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: ''
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *')
    },
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
    require('daisyui')
  ]
}
