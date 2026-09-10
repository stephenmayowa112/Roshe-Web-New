import { Metadata } from 'next';
import AnalyticsManagement from '@/components/admin/AnalyticsManagement';

export const metadata: Metadata = {
  title: 'Analytics | Admin Dashboard',
  description: 'Platform analytics and insights',
};

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
        <p className="text-gray-600 mt-2">
          Detailed insights and analytics for the entire platform
        </p>
      </div>
      
      <AnalyticsManagement />
    </div>
  );
}