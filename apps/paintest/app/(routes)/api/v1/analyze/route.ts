import { type NextRequest } from 'next/server';
import OpenAI from 'openai';

import { env } from '~/_configs/env';
import { SYSTEM_MESSAGE } from '~/_constants/messages';
import { type AnalyzeBody } from '~/_types/api';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const POST = async (request: NextRequest) => {
  const { sketch, sketchingTime, strokeCount } =
    (await request.json()) as AnalyzeBody;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        content: SYSTEM_MESSAGE,
        role: 'system',
      },
      {
        content: [
          {
            image_url: { url: sketch },
            type: 'image_url',
          },
          {
            text: `스케치 시간: ${sketchingTime.toString()}ms, 획수: ${strokeCount.toString()}개`,
            type: 'text',
          },
        ],
        role: 'user',
      },
    ],
    model: 'gpt-4o-2024-08-06',
  });
  return Response.json(completion.choices[0]?.message.content);
};
