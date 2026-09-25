import { requireAuth } from '@/lib/auth-server';
import Sidebar from '@/components/studio/Sidebar';
import DashboardHeader from '@/components/studio/DashboardHeader';

/**
 * Server Component - provides server-side authentication
 * Redirects to sign-in if not authenticated BEFORE rendering anything
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Server-side authentication check - redirects if not authenticated
  const session = await requireAuth();

  // Derive display values from session
  const userName = session.user?.name || session.user?.email || '';
  const schoolName = (session.user as any)?.school?.name || 'Your School';
  const initials = userName
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          userName={userName}
          schoolName={schoolName}
          userInitials={initials}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
