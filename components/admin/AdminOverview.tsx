"use client";

import { useState, useEffect } from 'react';
import { 
  Users, 
  Building2, 
  CreditCard, 
  FileText, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalSchools: number;
  activeLicenses: number;
  totalRevenue: number;
  userGrowth: number;
  schoolGrowth: number;
  licenseGrowth: number;
  revenueGrowth: number;
  recentActivity: {
    users: Array<{
      id: string;
      firstName: string | null;
      lastName: string | null;
      email: string;
      role: string;
      createdAt: string;
      school?: {
        name: string;
      } | null;
    }>;
    schools: Array<{
      id: string;
      name: string;
      type: string;
      createdAt: string;
      _count: {
        users: number;
      };
    }>;
    payments: Array<{
      id: string;
      amount: number;
      status: string;
      createdAt: string;
      school: {
        name: string;
      } | null;
    }>;
  };
}

export default function AdminOverview() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/stats');
      
      if (!response.ok) {
        throw new Error('Failed to fetch admin statistics');
      }
      
      const data = await response.json();
      setStats(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount / 100);
  };

  const formatDateTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  const formatGrowth = (growth: number) => {
    const sign = growth >= 0 ? '+' : '';
    return `${sign}${growth.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Loading Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-16 mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="animate-pulse">
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to Load Dashboard</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchStats}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor your platform performance and activity</p>
        </div>
        <button
          onClick={fetchStats}
          className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <p className={`text-sm mt-1 ${stats.userGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatGrowth(stats.userGrowth)} vs last month
              </p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Schools</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalSchools.toLocaleString()}</p>
              <p className={`text-sm mt-1 ${stats.schoolGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatGrowth(stats.schoolGrowth)} vs last month
              </p>
            </div>
            <Building2 className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Licenses</p>
              <p className="text-3xl font-bold text-gray-900">{stats.activeLicenses.toLocaleString()}</p>
              <p className={`text-sm mt-1 ${stats.licenseGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatGrowth(stats.licenseGrowth)} vs last month
              </p>
            </div>
            <FileText className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
              <p className={`text-sm mt-1 ${stats.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatGrowth(stats.revenueGrowth)} vs last month
              </p>
            </div>
            <CreditCard className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
          </div>
          <div className="p-6">
            {stats.recentActivity.users.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent users</p>
            ) : (
              <div className="space-y-4">
                {stats.recentActivity.users.map((user) => (
                  <div key={user.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {user.firstName && user.lastName 
                          ? `${user.firstName} ${user.lastName}` 
                          : user.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.email} • {user.role}
                        {user.school && ` • ${user.school.name}`}
                      </p>
                      <p className="text-xs text-gray-400">{formatDateTime(user.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent Schools */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Schools</h3>
          </div>
          <div className="p-6">
            {stats.recentActivity.schools.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent schools</p>
            ) : (
              <div className="space-y-4">
                {stats.recentActivity.schools.map((school) => (
                  <div key={school.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{school.name}</p>
                      <p className="text-xs text-gray-500">
                        {school.type} • {school._count.users} users
                      </p>
                      <p className="text-xs text-gray-400">{formatDateTime(school.createdAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      {stats.recentActivity.payments.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Payments</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.recentActivity.payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      payment.status === 'SUCCEEDED' 
                        ? 'bg-green-100' 
                        : payment.status === 'FAILED' 
                        ? 'bg-red-100' 
                        : 'bg-yellow-100'
                    }`}>
                      <CreditCard className={`w-4 h-4 ${
                        payment.status === 'SUCCEEDED' 
                          ? 'text-green-600' 
                          : payment.status === 'FAILED' 
                          ? 'text-red-600' 
                          : 'text-yellow-600'
                      }`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {payment.school?.name || 'Unknown School'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {payment.status} • {formatDateTime(payment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">{formatCurrency(payment.amount)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}