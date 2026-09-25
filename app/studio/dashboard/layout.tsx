import { requireAuth } from '@/lib/auth-server';
import DashboardLayoutClient from '@/components/studio/DashboardLayoutClient';

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

  // Pass data to client component for interactivity
  return (
    <DashboardLayoutClient
      userName={userName}
      schoolName={schoolName}
      userInitials={initials}
    >
      {children}
    </DashboardLayoutClient>
  );
}
