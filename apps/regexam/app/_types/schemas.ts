import { z } from 'zod';

import { checkIsValidRegex } from '~/_utils';

export const regexFormSchema = z.object({
  regex: z.string().max(50).refine(checkIsValidRegex, {
    message: 'String must be a valid regular expression',
  }),
});

export type RegexFormInputs = z.infer<typeof regexFormSchema>;
