"use client";

import { 
  Users, 
  Building2, 
  CreditCard, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

// Mock data - will be replaced with real API calls
const mockStats = {
  totalUsers: 156,
  totalSchools: 42,
  activeLicenses: 38,
  totalRevenue: 47800, // £478.00
  recentSignups: 12,
  pendingVerifications: 5,
  failedPayments: 2,
  supportTickets: 3,
};

const mockRecentActivity = [
  {
    id: 1,
    type: 'user_signup',
    message: 'New user registered: john.doe@example.com',
    timestamp: '2 minutes ago',
    status: 'success'
  },
  {
    id: 2,
    type: 'payment_success',
    message: 'Payment completed: St. Mary\'s School - £200',
    timestamp: '15 minutes ago',
    status: 'success'
  },
  {
    id: 3,
    type: 'license_activated',
    message: 'License activated: Greenfield Academy',
    timestamp: '1 hour ago',
    status: 'success'
  },
  {
    id: 4,
    type: 'payment_failed',
    message: 'Payment failed: Riverside Primary - £700',
    timestamp: '2 hours ago',
    status: 'error'
  },
];

const mockTopSchools = [
  { name: 'St. Mary\'s Primary School', licenses: 2, revenue: 900, status: 'Active' },
  { name: 'Greenfield Academy', licenses: 1, revenue: 700, status: 'Active' },
  { name: 'Riverside Primary', licenses: 1, revenue: 200, status: 'Pending' },
  { name: 'Oak Tree School', licenses: 3, revenue: 1400, status: 'Active' },
];

export default function AdminOverview() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{mockStats.totalUsers}</p>
              <p className="text-sm text-green-600 mt-1">+{mockStats.recentSignups} this week</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Schools</p>
              <p className="text-3xl font-bold text-gray-900">{mockStats.totalSchools}</p>
              <p className="text-sm text-gray-500 mt-1">{mockStats.activeLicenses} with licenses</p>
            </div>
            <Building2 className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Licenses</p>
              <p className="text-3xl font-bold text-gray-900">{mockStats.activeLicenses}</p>
              <p className="text-sm text-gray-500 mt-1">of {mockStats.totalSchools} schools</p>
            </div>
            <FileText className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">£{(mockStats.totalRevenue / 100).toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+12% this month</p>
            </div>
            <CreditCard className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <div>
              <p className="font-medium text-red-900">Pending Verifications</p>
              <p className="text-2xl font-bold text-red-900">{mockStats.pendingVerifications}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-500" />
            <div>
              <p className="font-medium text-orange-900">Failed Payments</p>
              <p className="text-2xl font-bold text-orange-900">{mockStats.failedPayments}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-500" />
            <div>
              <p className="font-medium text-blue-900">Support Tickets</p>
              <p className="text-2xl font-bold text-blue-900">{mockStats.supportTickets}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-green-900">System Status</p>
              <p className="text-sm font-bold text-green-900">All Systems Operational</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.status === 'success' ? 'bg-green-500' : 
                    activity.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Schools */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Schools by Revenue</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockTopSchools.map((school, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{school.name}</p>
                    <p className="text-sm text-gray-500">{school.licenses} license(s)</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">£{school.revenue}</p>
                    <p className={`text-sm ${
                      school.status === 'Active' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {school.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}