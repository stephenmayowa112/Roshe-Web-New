'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '@/components/studio/Sidebar';
import DashboardHeader from '@/components/studio/DashboardHeader';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/studio/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f5bf05] mx-auto mb-4" />
          <p className="text-gray-600 text-sm">Loading your dashboard…</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

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
