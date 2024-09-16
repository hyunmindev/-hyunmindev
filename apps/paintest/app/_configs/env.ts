import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  emptyStringAsUndefined: true,
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  },
  server: {
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    OPENAI_API_KEY: z.string(),
  },
});
