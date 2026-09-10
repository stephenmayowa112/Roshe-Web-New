"use client";

import { useState } from 'react';
import { 
  Shield, 
  AlertTriangle, 
  Eye, 
  Lock, 
  UserX, 
  Activity, 
  Calendar, 
  Clock, 
  MapPin, 
  Monitor, 
  Smartphone,
  RefreshCw,
  Download,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Ban
} from 'lucide-react';

// Mock security data
const mockSecurityLogs = [
  {
    id: 1,
    type: 'LOGIN_SUCCESS',
    userId: 'user_001',
    userEmail: 'admin@roshe-studios.com',
    timestamp: '2024-01-15T10:30:00Z',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    location: 'London, UK',
    device: 'Desktop',
    riskScore: 1,
  },
  {
    id: 2,
    type: 'LOGIN_FAILED',
    userId: null,
    userEmail: 'attacker@example.com',
    timestamp: '2024-01-15T09:45:00Z',
    ipAddress: '10.0.0.1',
    userAgent: 'curl/7.68.0',
    location: 'Unknown',
    device: 'Bot/Script',
    riskScore: 9,
  },
  {
    id: 3,
    type: 'PASSWORD_CHANGE',
    userId: 'user_002',
    userEmail: 'teacher@school.edu',
    timestamp: '2024-01-14T16:20:00Z',
    ipAddress: '203.0.113.1',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
    location: 'Manchester, UK',
    device: 'Mobile',
    riskScore: 2,
  },
  {
    id: 4,
    type: 'ACCOUNT_LOCKED',
    userId: 'user_003',
    userEmail: 'suspicious@domain.com',
    timestamp: '2024-01-14T14:10:00Z',
    ipAddress: '198.51.100.1',
    userAgent: 'Mozilla/5.0 (compatible; BadBot/1.0)',
    location: 'Prague, CZ',
    device: 'Bot/Script',
    riskScore: 8,
  },
];

const mockFailedLogins = [
  {
    id: 1,
    email: 'admin@roshe-studios.com',
    attempts: 3,
    lastAttempt: '2024-01-15T09:30:00Z',
    ipAddress: '10.0.0.1',
    location: 'Unknown',
    blocked: false,
  },
  {
    id: 2,
    email: 'attacker@example.com',
    attempts: 12,
    lastAttempt: '2024-01-15T09:45:00Z',
    ipAddress: '10.0.0.1',
    location: 'Unknown',
    blocked: true,
  },
];

const mockActiveSessions = [
  {
    id: 1,
    userId: 'user_001',
    userEmail: 'admin@roshe-studios.com',
    ipAddress: '192.168.1.100',
    location: 'London, UK',
    device: 'Desktop - Chrome',
    loginTime: '2024-01-15T08:00:00Z',
    lastActivity: '2024-01-15T10:30:00Z',
    current: true,
  },
  {
    id: 2,
    userId: 'user_002',
    userEmail: 'teacher@school.edu',
    ipAddress: '203.0.113.1',
    location: 'Manchester, UK',
    device: 'iPhone - Safari',
    loginTime: '2024-01-15T09:15:00Z',
    lastActivity: '2024-01-15T10:25:00Z',
    current: false,
  },
];

const eventTypeColors = {
  LOGIN_SUCCESS: 'text-green-700 bg-green-50 border-green-200',
  LOGIN_FAILED: 'text-red-700 bg-red-50 border-red-200',
  PASSWORD_CHANGE: 'text-blue-700 bg-blue-50 border-blue-200',
  ACCOUNT_LOCKED: 'text-orange-700 bg-orange-50 border-orange-200',
  EMAIL_VERIFICATION: 'text-purple-700 bg-purple-50 border-purple-200',
  PERMISSION_DENIED: 'text-red-700 bg-red-50 border-red-200',
};

const riskColors = {
  low: 'text-green-700 bg-green-50',
  medium: 'text-yellow-700 bg-yellow-50',
  high: 'text-red-700 bg-red-50',
};

const getRiskLevel = (score: number) => {
  if (score <= 3) return 'low';
  if (score <= 6) return 'medium';
  return 'high';
};

export default function SecurityManagement() {
  const [activeTab, setActiveTab] = useState('logs');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all');

  const filteredLogs = mockSecurityLogs.filter(log => {
    const matchesSearch = log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ipAddress.includes(searchTerm) ||
                         log.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEventType = selectedEventType === 'all' || log.type === selectedEventType;
    const matchesRisk = selectedRiskLevel === 'all' || getRiskLevel(log.riskScore) === selectedRiskLevel;
    
    return matchesSearch && matchesEventType && matchesRisk;
  });

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatEventType = (type: string) => {
    return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const renderSecurityLogs = () => (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 w-full"
          />
        </div>
        
        <select
          value={selectedEventType}
          onChange={(e) => setSelectedEventType(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="all">All Events</option>
          <option value="LOGIN_SUCCESS">Login Success</option>
          <option value="LOGIN_FAILED">Login Failed</option>
          <option value="PASSWORD_CHANGE">Password Change</option>
          <option value="ACCOUNT_LOCKED">Account Locked</option>
        </select>
        
        <select
          value={selectedRiskLevel}
          onChange={(e) => setSelectedRiskLevel(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
        >
          <option value="all">All Risk Levels</option>
          <option value="low">Low Risk</option>
          <option value="medium">Medium Risk</option>
          <option value="high">High Risk</option>
        </select>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Event</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Device</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Risk</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Time</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                      eventTypeColors[log.type as keyof typeof eventTypeColors]
                    }`}>
                      {formatEventType(log.type)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">{log.userEmail}</div>
                    <div className="text-xs text-gray-500">{log.ipAddress}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <MapPin className="w-3 h-3" />
                      {log.location}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      {log.device.includes('Desktop') ? (
                        <Monitor className="w-4 h-4" />
                      ) : (
                        <Smartphone className="w-4 h-4" />
                      )}
                      {log.device}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      riskColors[getRiskLevel(log.riskScore)]
                    }`}>
                      {log.riskScore}/10
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {formatDateTime(log.timestamp)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFailedLogins = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Failed Login Attempts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Attempts</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Last Attempt</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockFailedLogins.map((attempt) => (
                <tr key={attempt.id} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-900">{attempt.email}</div>
                    <div className="text-xs text-gray-500">{attempt.ipAddress}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      attempt.attempts > 5 ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {attempt.attempts} attempts
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {formatDateTime(attempt.lastAttempt)}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <MapPin className="w-3 h-3" />
                      {attempt.location}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {attempt.blocked ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                        <Ban className="w-3 h-3 mr-1" />
                        Blocked
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Monitoring
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      {!attempt.blocked && (
                        <button className="p-1 text-red-400 hover:text-red-600 rounded" title="Block IP">
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderActiveSessions = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active User Sessions</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Device</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Login Time</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Last Activity</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockActiveSessions.map((session) => (
                <tr key={session.id} className={`hover:bg-gray-50 ${session.current ? 'bg-blue-50' : ''}`}>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-900">{session.userEmail}</div>
                      {session.current && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{session.ipAddress}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      <MapPin className="w-3 h-3" />
                      {session.location}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 text-sm text-gray-900">
                      {session.device.includes('Desktop') ? (
                        <Monitor className="w-4 h-4" />
                      ) : (
                        <Smartphone className="w-4 h-4" />
                      )}
                      {session.device}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {formatDateTime(session.loginTime)}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {formatDateTime(session.lastActivity)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {!session.current && (
                      <button className="p-1 text-red-400 hover:text-red-600 rounded" title="Terminate Session">
                        <UserX className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'logs':
        return renderSecurityLogs();
      case 'failed':
        return renderFailedLogins();
      case 'sessions':
        return renderActiveSessions();
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex items-center gap-4">
          <Shield className="w-8 h-8 text-yellow-500" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Security Center</h1>
            <p className="text-gray-600">Monitor and manage platform security</p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
            <Download className="w-4 h-4" />
            Export Logs
          </button>
        </div>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <div className="text-sm text-gray-600">Security Score</div>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">{mockActiveSessions.length}</div>
              <div className="text-sm text-gray-600">Active Sessions</div>
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">{mockFailedLogins.length}</div>
              <div className="text-sm text-gray-600">Failed Attempts</div>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-orange-600">1</div>
              <div className="text-sm text-gray-600">Blocked IPs</div>
            </div>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Ban className="w-5 h-5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {[
              { id: 'logs', name: 'Security Logs', icon: Activity },
              { id: 'failed', name: 'Failed Logins', icon: AlertTriangle },
              { id: 'sessions', name: 'Active Sessions', icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-yellow-500 text-yellow-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}