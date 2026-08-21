import { AdminSidebar } from '@/components/apollo/admin-sidebar';
import { AdminBottomNav } from '@/components/apollo/admin-bottom-nav';
import { AdminHeader } from '@/components/apollo/admin-header';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar />
      <div className="lg:pr-64">
        <AdminHeader />
        <main className="px-4 pb-24 pt-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-6xl animate-fade-in">{children}</div>
        </main>
      </div>
      <AdminBottomNav />
    </div>
  );
}
