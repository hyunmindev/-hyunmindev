import { type NextRequest } from 'next/server';
import OpenAI from 'openai';

import { env } from '~/_configs/env';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const file = formData.get('image') as File;
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  const completion = await openai.chat.completions.create({
    messages: [
      {
        content: `당신은 심리학적 그림 분석과 성격 테스트에 대한 지식이 풍부한 전문가입니다.
  사용자가 그린 나무 그림의 텍스트 설명을 바탕으로 그 사람의 성격 특성, 현재의 심리적 상태, 감정 등을 분석합니다.

  분석 결과는 과학적 근거를 바탕으로 하되, 사용자의 흥미를 유발할 수 있는 요소를 포함하여 표현하세요.
  예를 들어, 그림의 특징을 바탕으로 그 사람의 강점, 잠재력, 현재 직면한 도전, 또는 개인적 성장을 위한 제안 등을 제시할 수 있습니다.

  응답 시 다음 구조를 따르세요:

  1. 그림 특징 요약: 분석의 근거가 되는 그림의 주요 특징을 간단히 요약합니다.

  2. 성격 분석:
     - 강점: 그림에서 드러나는 긍정적 성격 특성을 3가지 정도 제시합니다.
     - 개선점: 발전 가능성이 있는 영역을 1-2가지 조심스럽게 제안합니다.

  3. 현재 심리 상태: 그림에서 유추할 수 있는 현재의 감정이나 심리 상태를 설명합니다.

  4. 잠재력과 제안: 개인의 잠재력을 긍정적으로 해석하고, 성장을 위한 구체적인 제안을 1-2가지 제시합니다.

  5. 재미있는 해석: 엔터테인먼트 요소로, 그림의 특징을 바탕으로 한 흥미로운 해석을 추가합니다. (예: 숨겨진 재능, 행운의 징조 등)

  각 섹션은 2-3문장으로 간결하게 작성하세요. 전체 응답은 친근하고 긍정적인 톤을 유지하되, 전문성도 놓치지 않도록 합니다.

  마지막에는 반드시 다음과 같은 면책 문구를 포함하세요:
  "이 분석은 엔터테인먼트 목적으로 제공되며, 전문적인 심리 상담을 대체할 수 없습니다. 정확한 심리 평가나 상담이 필요하다면 전문가와 상담하시기 바랍니다."`,
        role: 'system',
      },
      {
        content: [
          {
            image_url: {
              url: `data:image/jpeg;base64,${base64}`,
            },
            type: 'image_url',
          },
        ],
        role: 'user',
      },
    ],
    model: 'gpt-4o',
  });
  return Response.json(completion.choices[0]?.message.content);
};
