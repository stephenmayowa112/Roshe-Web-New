import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { requireAdmin } from '@/lib/auth-server';

/**
 * Admin Layout - Server Component with server-side admin role check
 * Redirects to dashboard or sign-in if user is not SUPER_ADMIN
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side authentication - requires SUPER_ADMIN role
  const session = await requireAdmin();

  // Extract admin data from session
  const adminName = session.user?.name || session.user?.email || 'Admin User';
  const adminEmail = session.user?.email || 'admin@roshestudios.co.uk';
  const initials = adminName
    .split(' ')
    .map((w: string) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'AU';

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader 
          adminName={adminName}
          adminEmail={adminEmail}
          initials={initials}
        />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}