'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@hyunmin-dev/ui/components/ui/form';
import { Input } from '@hyunmin-dev/ui/components/ui/input';
import { useForm } from 'react-hook-form';

import { ProblemList } from '~/_components/ProblemList';
import { type RegexFormInputs, regexFormSchema } from '~/_types/schemas';

export function RegexForm() {
  const form = useForm<RegexFormInputs>({
    defaultValues: {
      regex: '',
    },
    mode: 'onChange',
    resolver: zodResolver(regexFormSchema),
  });

  return (
    <Form {...form}>
      <form className="flex w-96 flex-col gap-4">
        <ProblemList control={form.control} />
        <FormField
          control={form.control}
          name="regex"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="h-16 text-4xl"
                />
              </FormControl>
              <div className="h-4">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
