'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, PencilRuler, History, TrendingUp, User, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'داشبورد', icon: LayoutDashboard },
  { href: '/subjects', label: 'درس‌ها', icon: BookOpen },
  { href: '/practice', label: 'تمرین', icon: PencilRuler },
  { href: '/history', label: 'تاریخچه', icon: History },
  { href: '/progress', label: 'پیشرفت', icon: TrendingUp },
  { href: '/profile', label: 'پروفایل', icon: User },
];

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 border-r border-border bg-white lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Rocket className="h-5 w-5" />
        </div>
        <span className="text-lg font-bold tracking-tight">آپولو</span>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border p-4">
        <Link
          href="/admin"
          className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          ورود به پنل مدیریت
        </Link>
      </div>
    </aside>
  );
}
