import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  accent?: 'primary' | 'success' | 'warning' | 'destructive';
}

const accentStyles = {
  primary: 'bg-primary/10 text-primary',
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  destructive: 'bg-destructive/10 text-destructive',
};

export function StatCard({ label, value, icon: Icon, trend, trendUp, accent = 'primary' }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
        </div>
        <div className={cn('flex h-11 w-11 items-center justify-center rounded-xl', accentStyles[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && (
        <p className={cn('mt-3 text-xs font-medium', trendUp ? 'text-success' : 'text-destructive')}>
          {trend}
        </p>
      )}
    </Card>
  );
}
