'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, GraduationCap, BookOpen, FolderTree, FileText, FileQuestion, Youtube, BarChart3, Rocket, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin', label: 'داشبورد', icon: LayoutDashboard },
  { href: '/admin/students', label: 'دانش‌آموزان', icon: Users },
  { href: '/admin/grades', label: 'پایه‌ها', icon: GraduationCap },
  { href: '/admin/subjects', label: 'درس‌ها', icon: BookOpen },
  { href: '/admin/chapters', label: 'فصل‌ها', icon: FolderTree },
  { href: '/admin/topics', label: 'مباحث', icon: FileText },
  { href: '/admin/questions', label: 'سؤالات', icon: FileQuestion },
  { href: '/admin/videos', label: 'ویدیوها', icon: Youtube },
  { href: '/admin/learning', label: 'داده‌های یادگیری', icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 border-r border-border bg-white lg:flex lg:flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
          <Rocket className="h-5 w-5" />
        </div>
        <div>
          <span className="block text-sm font-bold leading-tight">آپولو</span>
          <span className="block text-xs text-muted-foreground">پنل مدیریت</span>
        </div>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-slate-900 text-white'
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
        <Link href="/" className="flex items-center justify-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
          بازگشت به سایت
        </Link>
      </div>
    </aside>
  );
}
