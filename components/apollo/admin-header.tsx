'use client';

import { Rocket, LogOut, Bell } from 'lucide-react';

export function AdminHeader({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white/80 px-4 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-2.5 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
          <Rocket className="h-4 w-4" />
        </div>
        <span className="font-bold">آپولو مدیریت</span>
      </div>
      {title && <h1 className="hidden text-lg font-semibold lg:block">{title}</h1>}
      <div className="flex items-center gap-3">
        <button className="text-muted-foreground hover:text-foreground" aria-label="اعلان‌ها">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">م</div>
          <span className="hidden text-sm font-medium sm:inline">مدیر سیستم</span>
        </div>
      </div>
    </header>
  );
}
