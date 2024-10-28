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
} from '@hyunmin-dev/ui/components/ui/form';
import { Input } from '@hyunmin-dev/ui/components/ui/input';
import { ScrollArea } from '@hyunmin-dev/ui/components/ui/scroll-area';
import { cn } from '@hyunmin-dev/ui/libs/utils';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSessionStorage } from 'react-use';

import { createBrowserClient } from '~/_configs/supabase/browser';
import { type Message } from '~/_types';
import { chatFormSchema, type ChatFormValues } from '~/_types/schemas';

const supabase = createBrowserClient();

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [user] = useSessionStorage('user', nanoid());

  const form = useForm<ChatFormValues>({
    defaultValues: { message: '' },
    resolver: zodResolver(chatFormSchema),
  });

  useEffect(() => {
    const channel = supabase
      .channel('chat')
      .on<Message>('broadcast', { event: 'message' }, ({ payload }) => {
        if (payload.user === user) {
          return;
        }
        setMessages((previousMessages) => [...previousMessages, payload]);
      })
      .subscribe();
    return () => {
      void channel.unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight });
  }, [messages.length]);

  const onSubmit = async (values: ChatFormValues) => {
    const id = nanoid();
    const text = values.message;
    const newMessage = { id, text, user };
    setMessages([...messages, newMessage]);
    form.reset();
    await supabase
      .channel('chat')
      .send({ event: 'message', payload: newMessage, type: 'broadcast' });
  };

  return (
    <>
      <ScrollArea className="mb-16">
        <ChatMessageList>
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.user === user ? 'sent' : 'received'}
            >
              <ChatBubbleAvatar
                fallback={message.user === user ? 'ME' : 'AI'}
              />
              <ChatBubbleMessage>{message.text}</ChatBubbleMessage>
            </ChatBubble>
          ))}
        </ChatMessageList>
      </ScrollArea>
      <Form {...form}>
        <form
          className="fixed inset-x-0 bottom-0 flex items-end gap-2 p-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="grow">
                <FormControl>
                  <Input
                    className="h-14 bg-background/80 text-xl backdrop-blur focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="h-14 bg-background/80 backdrop-blur"
            type="submit"
            variant="outline"
          >
            <Send
              className={cn({
                'stroke-muted': !form.formState.isValid,
                'stroke-muted-foreground': form.formState.isValid,
              })}
            />
          </Button>
        </form>
      </Form>
    </>
  );
}
