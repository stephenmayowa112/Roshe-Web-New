import { Metadata } from 'next';
import PaymentsManagement from '@/components/admin/PaymentsManagement';

export const metadata: Metadata = {
  title: 'Payments Management | Admin Dashboard',
  description: 'Monitor and manage all payment transactions',
};

export default function PaymentsPage() {
  return (
    <div className="p-6">
      <PaymentsManagement />
    </div>
  );
}