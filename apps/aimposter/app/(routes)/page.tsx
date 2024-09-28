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
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { createBrowserClient } from '~/_configs/supabase/browser';

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: '이름은 최소 2글자 이상이어야 합니다.',
    })
    .max(30, {
      message: '이름은 최대 10글자 이하여야 합니다.',
    }),
});

type FormValues = z.infer<typeof formSchema>;

const supabase = createBrowserClient();

export default function Index() {
  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    await supabase.channel('chat').send({
      event: 'message',
      payload: values,
      type: 'broadcast',
    });
  };

  const router = useRouter();

  return (
    <div className="flex grow flex-col items-center justify-center gap-4">
      <p className="text-xl">채팅방에서 사용할 이름을 입력하세요.</p>
      <Form {...form}>
        <form
          className="flex w-full items-start justify-center gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="h-14 text-2xl" {...field} />
                </FormControl>
                <div className="min-h-5">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <Button
            className="h-14"
            onClick={() => {
              router.push(`/chat?name=${form.getValues().name}`);
            }}
            type="submit"
            variant="outline"
          >
            입장
          </Button>
        </form>
      </Form>
    </div>
  );
}
