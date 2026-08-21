import { StudentSidebar } from '@/components/apollo/student-sidebar';
import { StudentBottomNav } from '@/components/apollo/student-bottom-nav';
import { StudentHeader } from '@/components/apollo/student-header';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <StudentSidebar />
      <div className="lg:pr-64">
        <StudentHeader />
        <main className="px-4 pb-24 pt-6 lg:px-8 lg:pb-8">
          <div className="mx-auto max-w-5xl animate-fade-in">{children}</div>
        </main>
      </div>
      <StudentBottomNav />
    </div>
  );
}
