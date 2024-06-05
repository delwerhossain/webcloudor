import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      transitionProperty: {
        'all': 'all',
      },
      transitionTimingFunction: {
        'default': 'ease',
      },
      transitionDuration: {
        'default': '500ms',
      },
      transform: {
        'default': 'scale(1)',
        'hover': 'scale(1.1)',
        'md-hover': 'scale(1.25)',
      },
    },
  },
  plugins: [
    require('daisyui'),
    plugin(({ addUtilities }) => {
      const newUtilities = {
        '.transition-all': {
          transitionProperty: 'all',
          transitionTimingFunction: 'ease',
          transitionDuration: '1000ms',
        },
        '.transform': {
          transform: 'scale(1)',
        },
        '.hover\\:transform': {
          transform: 'scale(1.1)',
        },
        '@screen md': {
          '.hover\\:transform': {
            transform: 'scale(1.25)',
          },
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    }),
  ],
};

export default config;
