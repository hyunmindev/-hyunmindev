import { type NextRequest } from 'next/server';
import OpenAI from 'openai';

import { env } from '~/_configs/env';
import { createServerClient } from '~/_configs/supabase';
import { SYSTEM_MESSAGE } from '~/_constants/messages';
import { type AnalyzeBody } from '~/_types/api';
import { base64ToBlob } from '~/_utils';

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

  if (!completion.choices[0]?.message.content) {
    return Response.json('분석 결과를 생성할 수 없습니다.');
  }

  const supabase = createServerClient();
  const { data: records } = await supabase
    .from('sketches')
    .insert({
      result: completion.choices[0]?.message.content ?? '',
      sketchingTime,
      strokeCount,
    })
    .select();
  if (!records?.[0]) {
    return Response.json('분석 결과를 저장할 수 없습니다.');
  }
  const recordId = records[0].id;
  const { data: image } = await supabase.storage
    .from('sketches')
    .upload(`${recordId.toString()}.jpeg`, base64ToBlob(sketch));
  if (!image) {
    return Response.json('분석 결과 이미지를 저장할 수 없습니다.');
  }
  return Response.json(recordId);
};
