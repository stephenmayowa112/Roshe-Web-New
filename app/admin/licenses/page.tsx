import { Metadata } from 'next';
import LicensesManagement from '@/components/admin/LicensesManagement';

export const metadata: Metadata = {
  title: 'Licenses Management | Admin Dashboard',
  description: 'Manage all licenses and subscriptions',
};

export default function LicensesPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Licenses Management</h1>
        <p className="text-gray-600 mt-2">
          View, manage, and control all school licenses
        </p>
      </div>
      
      <LicensesManagement />
    </div>
  );
}