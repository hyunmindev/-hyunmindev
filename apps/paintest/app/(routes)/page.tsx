import { Button } from '@hyunmin-dev/ui/components/ui/button';
import Link from 'next/link';

import { TITLE } from '~/_constants/meta';

export default function Index() {
  return (
    <div className="flex h-full grow flex-col items-center justify-center gap-4">
      <h1>{TITLE}</h1>
      <p>나무 그림을 그리면 당신의 심리를 분석해드립니다.</p>
      <Link href="/draw">
        <Button>테스트하기</Button>
      </Link>
    </div>
  );
}
