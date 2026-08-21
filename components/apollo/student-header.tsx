'use client';

import Link from 'next/link';
import { Rocket, LogOut } from 'lucide-react';

export function StudentHeader({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white/80 px-4 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-2.5 lg:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Rocket className="h-4 w-4" />
        </div>
        <span className="font-bold">آپولو</span>
      </div>
      {title && <h1 className="hidden text-lg font-semibold lg:block">{title}</h1>}
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
            ام
          </div>
          <span className="hidden sm:inline">امیر محمدی</span>
        </Link>
        <Link
          href="/login"
          className="text-muted-foreground hover:text-foreground"
          aria-label="خروج"
        >
          <LogOut className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}
