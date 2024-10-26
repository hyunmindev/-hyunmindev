import { z } from 'zod';

export const chatFormSchema = z.object({
  message: z
    .string()
    .min(2, {
      message: '메시지는 최소 2글자 이상이어야 합니다.',
    })
    .max(30, {
      message: '메시지는 최대 30글자 이하여야 합니다.',
    }),
});

export type ChatFormValues = z.infer<typeof chatFormSchema>;
