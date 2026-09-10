"use client";

import { useState } from 'react';
import { 
  Calendar,
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  CreditCard,
  Eye,
  Download,
  RefreshCw,
  BarChart3,
  PieChart,
  LineChart,
  DollarSign,
  UserPlus,
  FileText,
  Activity
} from 'lucide-react';

// Mock analytics data - will be replaced with real API calls
const analyticsData = {
  overview: {
    totalRevenue: 289000, // £2,890 in pence
    revenueGrowth: 12.5,
    totalUsers: 1247,
    userGrowth: 8.3,
    totalSchools: 156,
    schoolGrowth: 15.2,
    activeLicenses: 89,
    licenseGrowth: -2.1,
  },
  revenueByMonth: [
    { month: 'Jan', revenue: 45000, licenses: 12 },
    { month: 'Feb', revenue: 52000, licenses: 15 },
    { month: 'Mar', revenue: 48000, licenses: 13 },
    { month: 'Apr', revenue: 65000, licenses: 18 },
    { month: 'May', revenue: 71000, licenses: 21 },
    { month: 'Jun', revenue: 58000, licenses: 16 },
  ],
  licenseTypes: [
    { type: 'Single School', count: 67, revenue: 134000, percentage: 75.3 },
    { type: 'Multi-School', count: 22, revenue: 154000, percentage: 24.7 },
  ],
  topSchools: [
    { name: 'Greenfield Academy', revenue: 70000, licenses: 1, users: 12 },
    { name: 'St. Mary\'s Primary', revenue: 20000, licenses: 1, users: 8 },
    { name: 'Oak Tree School', revenue: 20000, licenses: 1, users: 6 },
    { name: 'Riverside Primary', revenue: 20000, licenses: 1, users: 5 },
    { name: 'Sunny Hill School', revenue: 20000, licenses: 1, users: 4 },
  ],
  userActivity: [
    { date: '2024-01-01', newUsers: 15, activeUsers: 234 },
    { date: '2024-01-02', newUsers: 8, activeUsers: 245 },
    { date: '2024-01-03', newUsers: 12, activeUsers: 251 },
    { date: '2024-01-04', newUsers: 18, activeUsers: 267 },
    { date: '2024-01-05', newUsers: 22, activeUsers: 284 },
    { date: '2024-01-06', newUsers: 16, activeUsers: 298 },
    { date: '2024-01-07', newUsers: 19, activeUsers: 312 },
  ],
  geographicData: [
    { region: 'London', schools: 45, revenue: 98000 },
    { region: 'Manchester', schools: 23, revenue: 52000 },
    { region: 'Birmingham', schools: 18, revenue: 41000 },
    { region: 'Leeds', schools: 15, revenue: 32000 },
    { region: 'Liverpool', schools: 12, revenue: 28000 },
    { region: 'Other', schools: 43, revenue: 89000 },
  ],
};

export default function AnalyticsManagement() {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(amount / 100);
  };

  const formatPercentage = (value: number) => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(analyticsData.overview.totalRevenue)}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            {analyticsData.overview.revenueGrowth >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${
              analyticsData.overview.revenueGrowth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatPercentage(analyticsData.overview.revenueGrowth)}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalUsers.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            {analyticsData.overview.userGrowth >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${
              analyticsData.overview.userGrowth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatPercentage(analyticsData.overview.userGrowth)}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Schools</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.totalSchools}</p>
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            {analyticsData.overview.schoolGrowth >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${
              analyticsData.overview.schoolGrowth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatPercentage(analyticsData.overview.schoolGrowth)}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Licenses</p>
              <p className="text-2xl font-bold text-gray-900">{analyticsData.overview.activeLicenses}</p>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center mt-2">
            {analyticsData.overview.licenseGrowth >= 0 ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${
              analyticsData.overview.licenseGrowth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {formatPercentage(analyticsData.overview.licenseGrowth)}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Over Time</h3>
            <LineChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {analyticsData.revenueByMonth.map((item, index) => (
              <div key={item.month} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{item.month}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{formatCurrency(item.revenue)}</div>
                  <div className="text-xs text-gray-500">{item.licenses} licenses</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* License Type Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">License Distribution</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {analyticsData.licenseTypes.map((type, index) => (
              <div key={type.type} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{type.type}</span>
                  <span className="text-sm font-semibold text-gray-900">{type.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-purple-500'}`}
                    style={{ width: `${type.percentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{type.count} licenses</span>
                  <span>{formatCurrency(type.revenue)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Schools */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Schools by Revenue</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-700">School</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-700">Revenue</th>
                  <th className="text-right py-2 text-sm font-medium text-gray-700">Users</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {analyticsData.topSchools.map((school, index) => (
                  <tr key={school.name}>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium text-gray-900">{school.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-right text-sm font-semibold text-gray-900">
                      {formatCurrency(school.revenue)}
                    </td>
                    <td className="py-3 text-right text-sm text-gray-600">
                      {school.users}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Geographic Distribution</h3>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {analyticsData.geographicData.map((region, index) => (
              <div key={region.region} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-yellow-500' :
                    index === 3 ? 'bg-purple-500' :
                    index === 4 ? 'bg-red-500' : 'bg-gray-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-700">{region.region}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">{formatCurrency(region.revenue)}</div>
                  <div className="text-xs text-gray-500">{region.schools} schools</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Activity Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">User Activity Trend</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">New Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Active Users</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {analyticsData.userActivity.map((day, index) => (
            <div key={day.date} className="text-center">
              <div className="text-xs text-gray-500 mb-2">
                {new Date(day.date).toLocaleDateString('en-GB', { weekday: 'short' })}
              </div>
              <div className="space-y-1">
                <div className="bg-blue-100 rounded px-2 py-1">
                  <div className="text-xs font-medium text-blue-800">+{day.newUsers}</div>
                </div>
                <div className="bg-green-100 rounded px-2 py-1">
                  <div className="text-xs font-medium text-green-800">{day.activeUsers}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}