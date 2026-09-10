import { Metadata } from 'next';
import PaymentsManagement from '@/components/admin/PaymentsManagement';

export const metadata: Metadata = {
  title: 'Payments Management | Admin Dashboard',
  description: 'Monitor and manage all payment transactions',
};

export default function PaymentsPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments Management</h1>
        <p className="text-gray-600 mt-2">
          Monitor all payment transactions and financial data
        </p>
      </div>
      
      <PaymentsManagement />
    </div>
  );
}