'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Send } from '@hyunmin-dev/ui/components/icons';
import { Button } from '@hyunmin-dev/ui/components/ui/button';
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from '@hyunmin-dev/ui/components/ui/chat/chat-bubble';
import { ChatMessageList } from '@hyunmin-dev/ui/components/ui/chat/chat-message-list';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@hyunmin-dev/ui/components/ui/form';
import { Input } from '@hyunmin-dev/ui/components/ui/input';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMount } from 'react-use';
import { z } from 'zod';

import { createBrowserClient } from '~/_configs/supabase/browser';

const formSchema = z.object({
  message: z
    .string()
    .min(2, {
      message: '메시지는 최소 2글자 이상이어야 합니다.',
    })
    .max(30, {
      message: '메시지는 최대 30글자 이하여야 합니다.',
    }),
});

type FormValues = z.infer<typeof formSchema>;

const supabase = createBrowserClient();

export default function Chat() {
  const form = useForm<FormValues>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(formSchema),
  });
  const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);

  useMount(() => {
    supabase
      .channel('chat')
      .on<{ id: string; text: string }>(
        'broadcast',
        { event: 'message' },
        ({ payload }) => {
          setMessages((previousMessages) => [...previousMessages, payload]);
        },
      )
      .subscribe();
  });

  const onSubmit = async (values: FormValues) => {
    await supabase.channel('chat').send({
      event: 'message',
      payload: { id: nanoid(), text: values.message },
      type: 'broadcast',
    });
  };

  return (
    <>
      <ChatMessageList className="grow">
        <ChatBubble variant="sent">
          <ChatBubbleAvatar fallback="US" />
          <ChatBubbleMessage variant="sent">
            Hello, how has your day been? I hope you are doing well.
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleAvatar fallback="AI" />
          <ChatBubbleMessage variant="received">
            Hi, I am doing well, thank you for asking. How can I help you today?
          </ChatBubbleMessage>
        </ChatBubble>
        <ChatBubble variant="received">
          <ChatBubbleAvatar fallback="AI" />
          <ChatBubbleMessage isLoading />
        </ChatBubble>
        {messages.map(({ id, text }) => (
          <ChatBubble
            key={id}
            variant="sent"
          >
            <ChatBubbleAvatar fallback="A" />
            <ChatBubbleMessage>{text}</ChatBubbleMessage>
          </ChatBubble>
        ))}
      </ChatMessageList>
      <Form {...form}>
        <form
          className="flex w-full items-end gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="grow">
                <FormMessage />
                <FormControl>
                  <Input
                    className="h-14 text-2xl"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="h-14"
            type="submit"
            variant="outline"
          >
            <Send className="stroke-muted-foreground" />
          </Button>
        </form>
      </Form>
    </>
  );
}
