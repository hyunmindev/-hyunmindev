import defaultConfig from '@hyunmin-dev/ui/tailwind.config';
import { type Config } from 'tailwindcss';

const config: Config = {
  content: defaultConfig.content,
  presets: [defaultConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-jooreeletter)'],
      },
    },
  },
};

export default config;
