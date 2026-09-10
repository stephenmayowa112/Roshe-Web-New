"use client";

import { useState, useEffect } from 'react';
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

interface Payment {
  id: string;
  stripePaymentIntentId: string | null;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string | null;
  last4: string | null;
  brand: string | null;
  description: string | null;
  failureMessage: string | null;
  refundAmount: number | null;
  createdAt: string;
  paidAt: string | null;
  school: {
    name: string;
  } | null;
  license: {
    type: string;
  } | null;
}

interface PaymentStats {
  totalRevenue: number;
  successfulPayments: number;
  failedPayments: number;
  refundedPayments: number;
}

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
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('30');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [stats, setStats] = useState<PaymentStats>({
    totalRevenue: 0,
    successfulPayments: 0,
    failedPayments: 0,
    refundedPayments: 0,
  });

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        search: searchTerm,
        status: selectedStatus,
        dateRange: selectedDateRange,
      });

      // For now, we'll use mock data since the API endpoint doesn't exist yet
      // Replace this with actual API call once implemented
      const mockData = {
        payments: [
          {
            id: 'pay_1234567890',
            stripePaymentIntentId: 'pi_3abcdef123',
            amount: 20000,
            currency: 'GBP',
            status: 'SUCCEEDED',
            paymentMethod: 'card',
            brand: 'visa',
            last4: '4242',
            description: 'Single School License - Annual',
            createdAt: '2024-01-15T10:30:00Z',
            paidAt: '2024-01-15T10:30:15Z',
            failureMessage: null,
            refundAmount: null,
            school: { name: 'St. Mary\'s Primary School' },
            license: { type: 'SINGLE_SCHOOL' },
          },
          {
            id: 'pay_2345678901',
            stripePaymentIntentId: 'pi_3bcdefg456',
            amount: 70000,
            currency: 'GBP',
            status: 'SUCCEEDED',
            paymentMethod: 'card',
            brand: 'mastercard',
            last4: '5555',
            description: 'Multi-School License - Annual',
            createdAt: '2024-01-10T14:20:00Z',
            paidAt: '2024-01-10T14:20:08Z',
            failureMessage: null,
            refundAmount: null,
            school: { name: 'Greenfield Academy' },
            license: { type: 'MULTI_SCHOOL' },
          },
        ],
        totalPages: 1,
        stats: {
          totalRevenue: 90000,
          successfulPayments: 2,
          failedPayments: 0,
          refundedPayments: 0,
        }
      };

      setPayments(mockData.payments);
      setTotalPages(mockData.totalPages);
      setStats(mockData.stats);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [currentPage, selectedStatus, selectedDateRange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchPayments();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Payments</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchPayments}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

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
          <button
            onClick={fetchPayments}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
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
              <div className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</div>
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
              <div className="text-2xl font-bold text-gray-900">{payments.length}</div>
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
              <div className="text-2xl font-bold text-green-600">{stats.successfulPayments}</div>
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
              <div className="text-2xl font-bold text-red-600">{stats.failedPayments}</div>
              <div className="text-sm text-gray-600">Failed</div>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
            </div>
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
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 px-4 text-center text-gray-500">
                    No payments found
                  </td>
                </tr>
              ) : (
                payments.map((payment) => {
                  const StatusIcon = statusIcons[payment.status as keyof typeof statusIcons] || Clock;
                  const actualStatus = payment.refundAmount ? 'REFUNDED' : payment.status;
                  
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{payment.id}</div>
                          <div className="text-sm text-gray-500">{payment.stripePaymentIntentId || 'N/A'}</div>
                          <div className="text-xs text-gray-400">{payment.description || 'No description'}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-900">{payment.school?.name || 'Unknown School'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{formatCurrency(payment.amount)}</div>
                          {payment.refundAmount && (
                            <div className="text-red-600 text-xs">Refunded: {formatCurrency(payment.refundAmount)}</div>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className={`w-4 h-4 ${brandColors[payment.brand as keyof typeof brandColors] || 'text-gray-400'}`} />
                          <div className="text-sm">
                            <div className="text-gray-900 capitalize">{payment.brand || 'Card'}</div>
                            <div className="text-gray-500">•••• {payment.last4 || '****'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          statusColors[actualStatus as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
                        }`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {actualStatus}
                        </span>
                        {payment.failureMessage && (
                          <div className="text-xs text-red-600 mt-1">{payment.failureMessage}</div>
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
                          <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing payments
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}