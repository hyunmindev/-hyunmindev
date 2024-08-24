import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },
  emptyStringAsUndefined: true,
  runtimeEnv: {
    // DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  server: {
    // DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  },
  // skipValidation: Boolean(process.env.SKIP_ENV_VALIDATION),
});
