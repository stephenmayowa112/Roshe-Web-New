import { Metadata } from 'next';
import AnalyticsManagement from '@/components/admin/AnalyticsManagement';

export const metadata: Metadata = {
  title: 'Analytics | Admin Dashboard',
  description: 'Platform analytics and insights',
};

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <AnalyticsManagement />
    </div>
  );
}