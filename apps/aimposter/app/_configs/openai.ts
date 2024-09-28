import OpenAI from 'openai';

import { env } from '~/_configs/env';

export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});
