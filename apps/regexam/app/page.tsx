import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@hyunmin-dev/ui/components/ui/avatar';
import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { Input } from '@hyunmin-dev/ui/components/ui/input';

export default function Page() {
  return (
    <>
      <h1>page</h1>
      <Button variant="destructive">test</Button>
      <Avatar>
        <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Input />
    </>
  );
}
