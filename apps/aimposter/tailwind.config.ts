import defaultConfig from '@hyunmin-dev/ui/tailwind.config';
import { type Config } from 'tailwindcss';

const config: Config = {
  content: defaultConfig.content,
  presets: [defaultConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans-mono)'],
      },
    },
  },
};

export default config;
