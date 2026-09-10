"use client";

import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  Building2,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';

// Mock data - will be replaced with real API calls
const mockLicenses = [
  {
    id: 'lic_001',
    schoolName: 'St. Mary\'s Primary School',
    schoolId: 'school_001',
    type: 'SINGLE_SCHOOL',
    status: 'ACTIVE',
    amount: 20000, // £200 in pence
    currency: 'GBP',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    autoRenewal: true,
    stripeSubscriptionId: 'sub_abc123',
    createdAt: '2024-01-01',
    lastPaymentDate: '2024-01-01',
    nextPaymentDate: '2025-01-01',
    paymentCount: 1,
    totalRevenue: 20000,
  },
  {
    id: 'lic_002',
    schoolName: 'Greenfield Academy',
    schoolId: 'school_002',
    type: 'MULTI_SCHOOL',
    status: 'ACTIVE',
    amount: 70000, // £700 in pence
    currency: 'GBP',
    startDate: '2024-01-05',
    endDate: '2024-12-31',
    autoRenewal: false,
    stripeSubscriptionId: 'sub_def456',
    createdAt: '2024-01-05',
    lastPaymentDate: '2024-01-05',
    nextPaymentDate: '2025-01-05',
    paymentCount: 1,
    totalRevenue: 70000,
  },
  {
    id: 'lic_003',
    schoolName: 'Oak Tree School',
    schoolId: 'school_003',
    type: 'SINGLE_SCHOOL',
    status: 'EXPIRED',
    amount: 20000,
    currency: 'GBP',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    autoRenewal: false,
    stripeSubscriptionId: null,
    createdAt: '2023-01-01',
    lastPaymentDate: '2023-01-01',
    nextPaymentDate: null,
    paymentCount: 1,
    totalRevenue: 20000,
  },
  {
    id: 'lic_004',
    schoolName: 'Riverside Primary',
    schoolId: 'school_004',
    type: 'TRIAL',
    status: 'PENDING',
    amount: 0,
    currency: 'GBP',
    startDate: '2024-01-20',
    endDate: '2024-02-20',
    autoRenewal: false,
    stripeSubscriptionId: null,
    createdAt: '2024-01-20',
    lastPaymentDate: null,
    nextPaymentDate: null,
    paymentCount: 0,
    totalRevenue: 0,
  },
];

const licenseTypeColors = {
  SINGLE_SCHOOL: 'bg-blue-100 text-blue-800',
  MULTI_SCHOOL: 'bg-purple-100 text-purple-800',
  TRIAL: 'bg-gray-100 text-gray-800',
};

const statusColors = {
  ACTIVE: 'bg-green-100 text-green-800',
  EXPIRED: 'bg-red-100 text-red-800',
  CANCELLED: 'bg-gray-100 text-gray-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
};

const statusIcons = {
  ACTIVE: CheckCircle,
  EXPIRED: XCircle,
  CANCELLED: XCircle,
  PENDING: Clock,
};

export default function LicensesManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredLicenses = mockLicenses.filter(license => {
    const matchesSearch = license.schoolName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         license.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || license.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || license.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount / 100);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  const getDaysUntilExpiry = (endDate: string | null) => {
    if (!endDate) return null;
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
              placeholder="Search licenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-full sm:w-64"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="all">All Types</option>
              <option value="SINGLE_SCHOOL">Single School</option>
              <option value="MULTI_SCHOOL">Multi-School</option>
              <option value="TRIAL">Trial</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="all">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="EXPIRED">Expired</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
        </div>

        <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Create License
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{mockLicenses.length}</div>
          <div className="text-sm text-gray-600">Total Licenses</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">{mockLicenses.filter(l => l.status === 'ACTIVE').length}</div>
          <div className="text-sm text-gray-600">Active Licenses</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-red-600">{mockLicenses.filter(l => l.status === 'EXPIRED').length}</div>
          <div className="text-sm text-gray-600">Expired Licenses</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">{formatCurrency(mockLicenses.reduce((sum, l) => sum + l.totalRevenue, 0))}</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-yellow-600">{mockLicenses.filter(l => getDaysUntilExpiry(l.endDate) !== null && getDaysUntilExpiry(l.endDate)! <= 30).length}</div>
          <div className="text-sm text-gray-600">Expiring Soon</div>
        </div>
      </div>

      {/* Expiring Soon Alert */}
      {mockLicenses.some(l => getDaysUntilExpiry(l.endDate) !== null && getDaysUntilExpiry(l.endDate)! <= 30) && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <div>
              <h3 className="font-medium text-yellow-900">Licenses Expiring Soon</h3>
              <p className="text-sm text-yellow-700 mt-1">
                Some licenses are expiring within the next 30 days. Consider reaching out for renewal.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Licenses Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">License</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">School</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Period</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Renewal</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLicenses.map((license) => {
                const StatusIcon = statusIcons[license.status as keyof typeof statusIcons];
                const daysUntilExpiry = getDaysUntilExpiry(license.endDate);
                
                return (
                  <tr key={license.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{license.id}</div>
                        <div className="text-sm text-gray-500">Created {formatDate(license.createdAt)}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{license.schoolName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        licenseTypeColors[license.type as keyof typeof licenseTypeColors]
                      }`}>
                        {license.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[license.status as keyof typeof statusColors]
                      }`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {license.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="text-gray-900">{formatDate(license.startDate)} - {formatDate(license.endDate)}</div>
                        {daysUntilExpiry !== null && (
                          <div className={`text-xs ${
                            daysUntilExpiry <= 7 ? 'text-red-600' : 
                            daysUntilExpiry <= 30 ? 'text-yellow-600' : 'text-gray-500'
                          }`}>
                            {daysUntilExpiry > 0 ? `${daysUntilExpiry} days left` : 'Expired'}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{formatCurrency(license.totalRevenue)}</div>
                        <div className="text-gray-500">{license.paymentCount} payment(s)</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        {license.autoRenewal ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-3 h-3" />
                            <span>Auto</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-gray-500">
                            <XCircle className="w-3 h-3" />
                            <span>Manual</span>
                          </div>
                        )}
                        {license.nextPaymentDate && (
                          <div className="text-gray-500 text-xs">
                            Next: {formatDate(license.nextPaymentDate)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                          <CreditCard className="w-4 h-4" />
                        </button>
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