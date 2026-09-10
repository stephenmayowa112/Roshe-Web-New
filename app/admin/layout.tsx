import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add admin authentication check
  const mockAdminData = {
    name: "Admin User",
    email: "admin@roshestudios.co.uk",
    role: "SUPER_ADMIN",
    initials: "AU"
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          adminName={mockAdminData.name}
          adminEmail={mockAdminData.email}
          initials={mockAdminData.initials}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}