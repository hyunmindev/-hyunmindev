import { type NextRequest } from 'next/server';
import OpenAI from 'openai';

import { env } from '~/_configs/env';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const POST = async (request: NextRequest) => {
  const result = (await request.json()) as { description: string };
  const completion = await openai.chat.completions.create({
    messages: [
      {
        content:
          '한글, 반말, 단답으로 대답해. 항상 "쩌부ㅜ" 라는 단어로 답장을 시작해.',
        role: 'system',
      },
      { content: result.description, role: 'user' },
    ],
    model: 'gpt-4o-mini',
  });
  return Response.json(completion.choices[0]?.message.content);
};
