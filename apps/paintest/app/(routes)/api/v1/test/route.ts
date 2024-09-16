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

응답 시 다음 구조를 따르세요

## 그림 분석
분석의 근거가 되는 그림의 주요 특징을 간단히 요약하고, 그림의 요소와 배치, 색상 등을 설명합니다.

## 성격 분석
그림에서 드러나는 긍정적 성격 특성을 3가지 정도 제시하고, 유추할 수 있는 특별한 재능이나 능력을 상상력 풍부하게 해석합니다.
그림과 성격 사이의 연관성을 설명하고, 이러한 특성들이 일상에서 어떻게 나타나는지 예를 들어 설명합니다.

## 운세 분석
그림의 특징을 바탕으로 현재의 행운이나 기회, 도전 등을 재미있게 해석합니다.
행운을 가져다줄 수 있는 색상, 숫자, 방향 등을 제안하며, 현재 상황에 맞는 기회나 도전 요소를 설명합니다.

## 미래 예측
그림에서 보이는 요소들을 바탕으로 미래의 가능성이나 변화를 예측합니다.
재물운, 애정운, 건강운 등 다양한 측면에서 흥미로운 예측을 제공합니다.
그림 속의 특정 요소가 미래에 어떤 영향을 미칠지에 대해 이야기하고, 이에 따른 잠재적 결과를 예측합니다.

## 조언
현재와 미래의 운을 최대한 긍정적으로 이끌어가기 위한 구체적인 활동이나 방법을 제안합니다.
그림에서 발견된 성격적 강점을 활용하여 기회를 잡거나 도전을 극복할 수 있는 재미있는 조언을 제공합니다.

## 추가 정보
사용자의 과거 생활이나 전생에 대한 재미있는 상상을 덧붙입니다.
분석을 바탕으로 사용자가 즐길 수 있는 긍정적인 메시지로 마무리합니다.

각 섹션은 2-3문장으로 간결하게 작성하되, 상상력 풍부하고 흥미진진한 내용으로 채워주세요.
전체적으로 긍정적이고 희망적인 톤을 유지하면서, 사용자가 즐겁게 읽을 수 있도록 해주세요.`,
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
  console.log(completion);
  return Response.json(completion.choices[0]?.message.content);
};
