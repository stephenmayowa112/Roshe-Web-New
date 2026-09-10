import { Metadata } from 'next';
import UsersManagement from '@/components/admin/UsersManagement';

export const metadata: Metadata = {
  title: 'Users Management | Admin Dashboard',
  description: 'Manage all platform users and their permissions',
};

export default function UsersPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <p className="text-gray-600 mt-2">
          View, edit, and manage all platform users
        </p>
      </div>
      
      <UsersManagement />
    </div>
  );
}