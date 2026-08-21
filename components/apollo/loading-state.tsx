import { cn } from '@/lib/utils';

export function LoadingState({ className, text = 'در حال بارگذاری...' }: { className?: string; text?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-3 py-16 text-muted-foreground', className)}>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      <span className="text-sm">{text}</span>
    </div>
  );
}
