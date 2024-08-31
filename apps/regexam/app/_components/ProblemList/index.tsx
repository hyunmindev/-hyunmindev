'use client';

import { cn } from '@hyunmin-dev/ui/libs/utils';
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

  const list = LIST.map((item) => {
    const result = validRegExp?.exec(item);
    if (!result) {
      return { items: [{ isMatch: false, str: item }], key: item };
    }
    const { 0: match, index } = result;
    return {
      items: [
        { isMatch: false, str: item.slice(0, index) },
        { isMatch: true, str: match },
        { isMatch: false, str: item.slice(index + match.length) },
      ].filter(({ str }) => str),
      key: item,
    };
  });

  return (
    <ul className="flex flex-col gap-1 text-xl">
      {list.map(({ items, key }) => (
        <li className="p-2" key={key}>
          {items.map(({ isMatch, str }) => (
            <span
              className={cn({
                'bg-primary': isMatch,
                'text-primary-foreground': isMatch,
              })}
              key={str}
            >
              {str}
            </span>
          ))}
        </li>
      ))}
    </ul>
  );
}
