import { Metadata } from 'next';
import SchoolsManagement from '@/components/admin/SchoolsManagement';

export const metadata: Metadata = {
  title: 'Schools Management | Admin Dashboard',
  description: 'Manage all schools and their details',
};

export default function SchoolsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Schools Management</h1>
        <p className="text-gray-600 mt-2">
          View, edit, and manage all registered schools
        </p>
      </div>
      
      <SchoolsManagement />
    </div>
  );
}