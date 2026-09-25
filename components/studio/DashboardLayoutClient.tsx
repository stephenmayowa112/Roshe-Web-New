'use client';

import Sidebar from '@/components/studio/Sidebar';
import DashboardHeader from '@/components/studio/DashboardHeader';

interface DashboardLayoutClientProps {
  userName: string;
  schoolName: string;
  userInitials: string;
  children: React.ReactNode;
}

/**
 * Client Component - handles interactive UI elements
 * Receives authenticated data from server component parent
 */
export default function DashboardLayoutClient({
  userName,
  schoolName,
  userInitials,
  children,
}: DashboardLayoutClientProps) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          userName={userName}
          schoolName={schoolName}
          userInitials={userInitials}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
