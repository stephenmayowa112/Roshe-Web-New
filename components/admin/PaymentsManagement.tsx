"use client";

import { useState } from 'react';
import { 
  Search, 
  Download, 
  Filter,
  MoreHorizontal, 
  Eye,
  RefreshCw,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Calendar,
  Building2,
  DollarSign
} from 'lucide-react';

// Mock data - will be replaced with real API calls
const mockPayments = [
  {
    id: 'pay_1234567890',
    stripePaymentId: 'pi_3abcdef123',
    schoolName: 'St. Mary\'s Primary School',
    schoolId: 'school_001',
    licenseId: 'lic_001',
    amount: 20000, // £200 in pence
    currency: 'GBP',
    status: 'SUCCEEDED',
    method: 'card',
    brand: 'visa',
    last4: '4242',
    description: 'Single School License - Annual',
    createdAt: '2024-01-15T10:30:00Z',
    paidAt: '2024-01-15T10:30:15Z',
    failureReason: null,
    refunded: false,
    refundAmount: 0,
    fees: 89, // Stripe fees in pence
    net: 19911,
  },
  {
    id: 'pay_2345678901',
    stripePaymentId: 'pi_3bcdefg456',
    schoolName: 'Greenfield Academy',
    schoolId: 'school_002',
    licenseId: 'lic_002',
    amount: 70000, // £700 in pence
    currency: 'GBP',
    status: 'SUCCEEDED',
    method: 'card',
    brand: 'mastercard',
    last4: '5555',
    description: 'Multi-School License - Annual',
    createdAt: '2024-01-10T14:20:00Z',
    paidAt: '2024-01-10T14:20:08Z',
    failureReason: null,
    refunded: false,
    refundAmount: 0,
    fees: 208,
    net: 69792,
  },
  {
    id: 'pay_3456789012',
    stripePaymentId: 'pi_3cdefgh789',
    schoolName: 'Riverside Primary',
    schoolId: 'school_003',
    licenseId: 'lic_003',
    amount: 20000,
    currency: 'GBP',
    status: 'FAILED',
    method: 'card',
    brand: 'visa',
    last4: '0002',
    description: 'Single School License - Annual',
    createdAt: '2024-01-08T16:45:00Z',
    paidAt: null,
    failureReason: 'Your card was declined.',
    refunded: false,
    refundAmount: 0,
    fees: 0,
    net: 0,
  },
  {
    id: 'pay_4567890123',
    stripePaymentId: 'pi_3defghi012',
    schoolName: 'Oak Tree School',
    schoolId: 'school_004',
    licenseId: 'lic_004',
    amount: 20000,
    currency: 'GBP',
    status: 'SUCCEEDED',
    method: 'card',
    brand: 'amex',
    last4: '8431',
    description: 'Single School License - Annual',
    createdAt: '2023-12-20T11:15:00Z',
    paidAt: '2023-12-20T11:15:12Z',
    failureReason: null,
    refunded: true,
    refundAmount: 20000,
    fees: 89,
    net: -89,
  },
];

const statusColors = {
  SUCCEEDED: 'bg-green-100 text-green-800',
  FAILED: 'bg-red-100 text-red-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
  REFUNDED: 'bg-purple-100 text-purple-800',
};

const statusIcons = {
  SUCCEEDED: CheckCircle,
  FAILED: XCircle,
  PENDING: Clock,
  CANCELLED: XCircle,
  REFUNDED: RefreshCw,
};

const brandColors = {
  visa: 'text-blue-600',
  mastercard: 'text-red-600',
  amex: 'text-green-600',
  discover: 'text-orange-600',
};

export default function PaymentsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('30');

  const filteredPayments = mockPayments.filter(payment => {
    const matchesSearch = payment.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.stripePaymentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || payment.status === selectedStatus;
    
    // Date range filter (simplified)
    const paymentDate = new Date(payment.createdAt);
    const now = new Date();
    const daysAgo = parseInt(selectedDateRange);
    const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    const matchesDateRange = selectedDateRange === 'all' || paymentDate >= cutoffDate;
    
    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount / 100);
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const totalRevenue = filteredPayments.reduce((sum, p) => sum + (p.status === 'SUCCEEDED' ? p.amount : 0), 0);
  const totalFees = filteredPayments.reduce((sum, p) => sum + (p.status === 'SUCCEEDED' ? p.fees : 0), 0);
  const successfulPayments = filteredPayments.filter(p => p.status === 'SUCCEEDED').length;
  const failedPayments = filteredPayments.filter(p => p.status === 'FAILED').length;

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-full sm:w-64"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="all">All Status</option>
              <option value="SUCCEEDED">Succeeded</option>
              <option value="FAILED">Failed</option>
              <option value="PENDING">Pending</option>
              <option value="REFUNDED">Refunded</option>
            </select>

            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
              <option value="all">All time</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</div>
              <div className="text-sm text-gray-600">Total Revenue</div>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-900">{filteredPayments.length}</div>
              <div className="text-sm text-gray-600">Total Transactions</div>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">{successfulPayments}</div>
              <div className="text-sm text-gray-600">Successful</div>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">{failedPayments}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(totalRevenue)}</div>
            <div className="text-sm text-gray-600">Gross Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">-{formatCurrency(totalFees)}</div>
            <div className="text-sm text-gray-600">Processing Fees</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalRevenue - totalFees)}</div>
            <div className="text-sm text-gray-600">Net Revenue</div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Payment</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">School</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Method</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => {
                const StatusIcon = statusIcons[payment.status as keyof typeof statusIcons];
                const actualStatus = payment.refunded ? 'REFUNDED' : payment.status;
                
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{payment.id}</div>
                        <div className="text-sm text-gray-500">{payment.stripePaymentId}</div>
                        <div className="text-xs text-gray-400">{payment.description}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{payment.schoolName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                        {payment.refunded && (
                          <div className="text-red-600 text-xs">Refunded: {formatCurrency(payment.refundAmount)}</div>
                        )}
                        {payment.status === 'SUCCEEDED' && (
                          <div className="text-gray-500 text-xs">Fee: {formatCurrency(payment.fees)}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <CreditCard className={`w-4 h-4 ${brandColors[payment.brand as keyof typeof brandColors] || 'text-gray-400'}`} />
                        <div className="text-sm">
                          <div className="text-gray-900 capitalize">{payment.brand}</div>
                          <div className="text-gray-500">•••• {payment.last4}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[actualStatus as keyof typeof statusColors]
                      }`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {actualStatus}
                      </span>
                      {payment.failureReason && (
                        <div className="text-xs text-red-600 mt-1">{payment.failureReason}</div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="text-gray-900">{formatDateTime(payment.createdAt)}</div>
                        {payment.paidAt && (
                          <div className="text-gray-500 text-xs">Paid: {formatDateTime(payment.paidAt)}</div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        {payment.status === 'SUCCEEDED' && !payment.refunded && (
                          <button className="p-1 text-gray-400 hover:text-gray-600 rounded" title="Refund">
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}