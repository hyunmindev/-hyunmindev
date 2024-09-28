import type { AnalyzeParameters } from '~/_types/schemas';

import { openai } from '~/_configs/openai';
import { SYSTEM_MESSAGE } from '~/_constants/openai';

export const analyze = async ({
  image,
  sketchingTime,
  strokeCount,
}: AnalyzeParameters) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        content: SYSTEM_MESSAGE,
        role: 'system',
      },
      {
        content: [
          {
            image_url: { url: image },
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
  const result = completion.choices[0]?.message.content;
  if (!result) {
    throw new Error('분석 결과를 생성할 수 없습니다.');
  }
  return result;
};
