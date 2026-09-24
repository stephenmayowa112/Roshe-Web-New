import { Metadata } from 'next';
import AdminOverview from '@/components/admin/AdminOverview';

export const metadata: Metadata = {
  title: 'Admin Dashboard | Roshe Studios',
  description: 'Administrative dashboard for Roshe Studios platform management',
};

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <AdminOverview />
    </div>
  );
}