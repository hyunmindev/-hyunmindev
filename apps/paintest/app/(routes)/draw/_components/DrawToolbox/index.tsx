import {
  Eraser,
  Pencil,
  Redo,
  Trash2,
  Undo,
} from '@hyunmin-dev/ui/components/icons';
import { Button } from '@hyunmin-dev/ui/components/ui/button';
import { cn } from '@hyunmin-dev/ui/libs/utils';

import { type DrawMode } from '~/_types';

interface Properties {
  mode: DrawMode;
  onChangeMode: (mode: DrawMode) => void;
  onChangeStrokeColor: (color: string) => void;
  onRedo?: () => void;
  onReset?: () => void;
  onUndo?: () => void;
  strokeColor: string;
}

export function DrawToolbox({
  mode,
  onChangeMode,
  onChangeStrokeColor,
  onRedo,
  onReset,
  onUndo,
  strokeColor,
}: Readonly<Properties>) {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="simple-border size-10">
        <input
          className="size-[200%] -translate-x-1/4 -translate-y-1/4 appearance-none"
          onBlur={() => {
            onChangeMode('stroke');
          }}
          onChange={(event) => {
            onChangeStrokeColor(event.target.value);
          }}
          type="color"
          value={strokeColor}
        />
      </div>
      <Button
        className={cn({
          'bg-muted border-muted-foreground border': mode === 'stroke',
        })}
        onClick={() => {
          onChangeMode('stroke');
        }}
        size="icon"
        variant="outline"
      >
        <Pencil
          className={cn('stroke-border', {
            'stroke-muted-foreground': mode === 'stroke',
          })}
        />
      </Button>
      <Button
        className={cn({
          'bg-muted border-muted-foreground border': mode === 'erase',
        })}
        onClick={() => {
          onChangeMode('erase');
        }}
        size="icon"
        variant="outline"
      >
        <Eraser
          className={cn('stroke-border', {
            'stroke-muted-foreground': mode === 'erase',
          })}
        />
      </Button>
      <div className="grow" />
      <Button
        onClick={() => {
          onUndo?.();
        }}
        size="icon"
        variant="outline"
      >
        <Undo className="stroke-muted-foreground" />
      </Button>
      <Button
        onClick={() => {
          onRedo?.();
        }}
        size="icon"
        variant="outline"
      >
        <Redo className="stroke-muted-foreground" />
      </Button>
      <Button
        className="border-destructive"
        onClick={() => {
          onReset?.();
        }}
        size="icon"
        variant="outline"
      >
        <Trash2 className="stroke-destructive" />
      </Button>
    </div>
  );
}
