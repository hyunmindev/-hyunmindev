import { openai } from '~/_configs/openai';

export const analyze = async () => {
  const completion = await openai.chat.completions.create({
    messages: [],
    model: 'gpt-4o-2024-08-06',
  });
  const result = completion.choices[0]?.message.content;
  if (!result) {
    throw new Error('분석 결과를 생성할 수 없습니다.');
  }
  return result;
};
