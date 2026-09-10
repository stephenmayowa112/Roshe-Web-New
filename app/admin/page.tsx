import { Metadata } from 'next';
import AdminOverview from '@/components/admin/AdminOverview';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Roshe Studios',
  description: 'Administrative dashboard for Roshe Studios platform management',
};

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Complete system overview and management controls
        </p>
      </div>
      
      <AdminOverview />
    </div>
  );
}