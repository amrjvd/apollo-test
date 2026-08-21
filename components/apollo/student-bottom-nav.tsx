'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, PencilRuler, TrendingUp, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { href: '/dashboard', label: 'خانه', icon: LayoutDashboard },
  { href: '/subjects', label: 'درس‌ها', icon: BookOpen },
  { href: '/practice', label: 'تمرین', icon: PencilRuler },
  { href: '/progress', label: 'پیشرفت', icon: TrendingUp },
  { href: '/profile', label: 'پروفایل', icon: User },
];

export function StudentBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur-sm lg:hidden">
      <div className="flex items-center justify-around px-2 py-1.5">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[11px] font-medium transition-colors',
                active ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon className={cn('h-5 w-5', active && 'fill-primary/10')} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
