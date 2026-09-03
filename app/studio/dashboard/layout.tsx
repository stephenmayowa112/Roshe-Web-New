import Sidebar from '@/components/studio/Sidebar';
import DashboardHeader from '@/components/studio/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Replace with actual user data from authentication
  const mockUserData = {
    schoolName: "St. Mary's primary School",
    userInitials: "MS"
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader 
          schoolName={mockUserData.schoolName}
          userInitials={mockUserData.userInitials}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}