'use client';

import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { Input } from '@hyunmin-dev/ui/components/ui/input';
import { cn } from '@hyunmin-dev/ui/libs/utils';
import { useState } from 'react';

export default function Page() {
  const [result, setResult] = useState<string>();
  const [image, setImage] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex size-full flex-col items-center gap-4 p-6">
      <Input
        accept="image/*"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            setImage(file);
          } else {
            setImage(undefined);
          }
        }}
        type="file"
      />
      {!!image && (
        <>
          <img alt={String(image)} src={URL.createObjectURL(image)} />
          <Button
            className={cn({
              'animate-spin': isLoading,
            })}
            disabled={isLoading}
            onClick={async () => {
              setIsLoading(true);
              const formData = new FormData();
              formData.append('image', image);
              const result2 = await fetch('/api/v1/test', {
                body: formData,
                method: 'POST',
              }).then<string>((response) => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error('Network response was not ok');
              });
              setResult(result2);
              setIsLoading(false);
            }}
          >
            Submit
          </Button>
        </>
      )}
      {!!result && (
        <p className="whitespace-pre-wrap rounded-md border p-4">{result}</p>
      )}
    </div>
  );
}
