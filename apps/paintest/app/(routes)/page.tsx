'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@hyunmin-dev/ui/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@hyunmin-dev/ui/components/ui/form';
import { Input } from '@hyunmin-dev/ui/components/ui/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const descriptionFormSchema = z.object({
  description: z.string().min(5).max(50),
});

type RegexFormInputs = z.infer<typeof descriptionFormSchema>;

export default function Page() {
  const [result, setResult] = useState<string>();

  const form = useForm<RegexFormInputs>({
    defaultValues: {
      description: '',
    },
    resolver: zodResolver(descriptionFormSchema),
  });

  const onSubmit = async (data: RegexFormInputs) => {
    const result2 = await fetch('/api/v1/test', {
      body: JSON.stringify(data),
      method: 'POST',
    }).then(async (response) => {
      if (response.ok) {
        return (await response.json()) as string;
      }
      throw new Error('Network response was not ok');
    });
    setResult(result2);
  };

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4">
      <Form {...form}>
        <form
          className="flex w-96 gap-2"
          onSubmit={(event) => {
            void form.handleSubmit(onSubmit)(event);
          }}
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <div className="h-4">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button>Submit</Button>
        </form>
      </Form>
      <p className="size-96 rounded-md border p-4">{result}</p>
    </div>
  );
}
