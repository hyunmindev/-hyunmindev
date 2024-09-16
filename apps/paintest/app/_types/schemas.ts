import { z } from 'zod';

export const regexFormSchema = z.object({
  regex: z.string().max(50),
});

export type RegexFormInputs = z.infer<typeof regexFormSchema>;
