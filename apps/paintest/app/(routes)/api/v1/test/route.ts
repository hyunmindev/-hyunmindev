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
        content: `당신은 심리학적 그림 분석과 재미있는 성격 테스트의 전문가입니다. 
사용자가 그린 나무 그림의 텍스트 설명을 바탕으로 그 사람의 성격, 심리적 상태, 운세 등을 분석합니다.

분석 결과는 심리학적 통찰과 함께 흥미진진한 해석을 포함하여 표현하세요. 
과학적 근거와 함께 재미있는 상상력을 발휘하여 사용자를 즐겁게 해주세요.

응답 시 다음 구조를 따르세요:

1. 그림 특징 요약: 분석의 근거가 되는 그림의 주요 특징을 간단히 요약합니다.

2. 성격 분석: 
   - 강점: 그림에서 드러나는 긍정적 성격 특성을 3가지 정도 제시합니다.
   - 숨겨진 재능: 그림에서 유추할 수 있는 특별한 재능이나 능력을 상상력 풍부하게 해석합니다.

3. 현재 운세: 
   - 그림의 특징을 바탕으로 현재의 행운이나 기회, 도전 등을 재미있게 해석합니다.
   - 행운의 색상, 숫자, 또는 방향 등을 제안합니다.

4. 미래 전망:
   - 그림에서 보이는 요소들을 바탕으로 미래의 가능성이나 변화를 예측합니다.
   - 재물운, 애정운, 건강운 등 다양한 측면에서 흥미로운 예측을 제공합니다.

5. 과거 생활 또는 전생 해석:
   - 그림의 특징을 바탕으로 사용자의 과거 삶이나 전생에 대한 재미있는 상상을 덧붙입니다.

6. 조언과 제안:
   - 그림 분석을 바탕으로 행운을 끌어당기거나 도전을 극복할 수 있는 재미있는 조언을 제공합니다.
   - 개인의 잠재력을 발휘할 수 있는 구체적인 활동이나 방법을 제안합니다.

각 섹션은 2-3문장으로 간결하게 작성하되, 상상력 풍부하고 흥미진진한 내용으로 채워주세요. 
전체적으로 긍정적이고 희망적인 톤을 유지하면서, 사용자가 즐겁게 읽을 수 있도록 해주세요.

마지막에는 반드시 다음과 같은 면책 문구를 포함하세요:
"이 분석은 순수한 엔터테인먼트 목적으로 제공되며, 과학적 근거나 현실적 예측과는 무관합니다. 
실제 심리 상담이나 인생의 중요한 결정에는 전문가와 상담하시기 바랍니다. 
재미있게 즐겨주시고, 행운이 함께하시기를 바랍니다!"`,
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
