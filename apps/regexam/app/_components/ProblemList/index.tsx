'use client';

import { useEffect, useState } from 'react';
import { type Control, useWatch } from 'react-hook-form';

import type { RegexFormInputs } from '~/_types/schemas';

import { checkIsValidRegex } from '~/utils';

interface Properties {
  control: Control<RegexFormInputs>;
}

const LIST = ['apple', 'banana', 'cherry'];

export function ProblemList({ control }: Readonly<Properties>) {
  const regex = useWatch({
    control,
    name: 'regex',
  });
  const [validRegExp, setValidRegExp] = useState<RegExp>();

  useEffect(() => {
    if (!regex) {
      const regExp = new RegExp(/^(?=a)(?!a)/);
      setValidRegExp(regExp);
      return;
    }
    if (checkIsValidRegex(regex)) {
      const regExp = new RegExp(regex);
      setValidRegExp(regExp);
    }
  }, [regex]);

  return (
    <ul>
      {LIST.map((item) => (
        <li key={item}>
          {item} {validRegExp?.test(item) ? '✅' : '❌'}
        </li>
      ))}
    </ul>
  );
}
