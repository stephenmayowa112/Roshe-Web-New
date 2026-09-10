import { Metadata } from 'next';
import SecurityManagement from '@/components/admin/SecurityManagement';

export const metadata: Metadata = {
  title: 'Security Center | Admin Dashboard',
  description: 'Security monitoring and management',
};

export default function SecurityPage() {
  return (
    <div className="p-6">
      <SecurityManagement />
    </div>
  );
}