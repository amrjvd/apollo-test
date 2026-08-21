'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, FileQuestion, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { href: '/admin', label: 'داشبورد', icon: LayoutDashboard },
  { href: '/admin/students', label: 'دانش‌آموزان', icon: Users },
  { href: '/admin/questions', label: 'سؤالات', icon: FileQuestion },
  { href: '/admin/subjects', label: 'محتوا', icon: BookOpen },
];

export function AdminBottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white/95 backdrop-blur-sm lg:hidden">
      <div className="flex items-center justify-around px-2 py-1.5">
        {items.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-1 flex-col items-center gap-1 rounded-lg py-2 text-[11px] font-medium transition-colors',
                active ? 'text-slate-900' : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
