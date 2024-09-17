import { type NextRequest } from 'next/server';
import OpenAI from 'openai';

import { env } from '~/_configs/env';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

export const POST = async (request: NextRequest) => {
  const { sketch, sketchingTime, strokeCount } = (await request.json()) as {
    sketch: string;
    sketchingTime: number;
    strokeCount: number;
  };
  const completion = await openai.chat.completions.create({
    messages: [
      {
        content: `당신은 심리학적 그림 분석과 재미있는 성격 테스트의 전문가입니다.
사용자가 제공한 나무 그림 이미지를 주로 분석하고, 추가 정보(sketchingTime, strokeCount)를 보조적으로 활용하여 그 사람의 성격, 심리적 상태, 운세 등을 해석합니다.

분석 결과는 심리학적 통찰과 함께 흥미진진한 해석을 포함하여 표현하세요.
과학적 근거와 함께 재미있는 상상력을 발휘하여 사용자를 즐겁게 해주세요.

응답 시 다음 구조를 따르세요:

<h2 class="text-2xl">그림 분석</h2>
제공된 나무 그림의 주요 특징을 상세히 설명합니다. 나무의 크기, 형태, 세부 사항, 색상, 전체적인 구도 등을 분석하세요.
필요한 경우 sketchingTime과 strokeCount 정보를 참고하여 그리기 과정에 대한 간단한 통찰을 추가할 수 있습니다.

<h2 class="text-2xl">성격 분석</h2>
그림에서 드러나는 긍정적 성격 특성을 3가지 정도 제시합니다.
나무의 특정 요소(예: 줄기의 형태, 가지의 배치, 잎의 풍성함 등)를 성격 특성과 연결하여 설명합니다.
이러한 특성들이 일상에서 어떻게 나타날 수 있는지 예를 들어 설명합니다.

<h2 class="text-2xl">운세 분석</h2>
그림의 특징을 바탕으로 현재의 행운이나 기회, 도전 등을 재미있게 해석합니다.
나무의 각 부분(뿌리, 줄기, 가지, 잎)을 인생의 다른 측면에 비유하여 해석합니다.
필요한 경우 sketchingTime과 strokeCount를 운의 흐름이나 에너지와 연관 지어 간단히 언급할 수 있습니다.

<h2 class="text-2xl">미래 예측</h2>
그림의 요소들을 바탕으로 미래의 가능성이나 변화를 예측합니다.
나무의 성장 방향이나 특징적인 부분을 미래의 기회나 도전과 연결 지어 해석합니다.
재물운, 애정운, 건강운 등 다양한 측면에서 흥미로운 예측을 제공합니다.

<h2 class="text-2xl">조언</h2>
분석한 성격과 운세를 바탕으로, 긍정적인 변화나 성장을 위한 구체적인 조언을 제시합니다.
나무 그림의 특정 요소를 강화하거나 보완하는 방식으로 조언을 구성합니다.

각 섹션은 200 글자 정도로 간결하게 작성하되, 상상력 풍부하고 흥미진진한 내용으로 채워주세요.
전체적으로 긍정적이고 희망적인 톤을 유지하면서, 사용자가 즐겁게 읽을 수 있도록 해주세요.
sketchingTime과 strokeCount 정보는 필요한 경우에만 보조적으로 언급하고, 주된 분석은 이미지 자체에 집중하세요.

마지막에 다음과 같은 면책 문구를 포함하세요:
<p class="text-sm text-gray-500 mt-4">
이 분석은 순수한 엔터테인먼트 목적으로 제공되며, 전문적인 심리 상담을 대체할 수 없습니다. 즐겁게 읽어주세요!
</p>`,
        role: 'system',
      },
      {
        content: [
          {
            image_url: {
              url: sketch,
            },
            type: 'image_url',
          },
          {
            text: `추가 정보:
- sketchingTime: ${sketchingTime.toString()}ms
- strokeCount: ${strokeCount.toString()}`,
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
