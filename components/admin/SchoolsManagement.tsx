"use client";

import { useState } from 'react';
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  Users,
  CreditCard,
  Calendar,
  Building2,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

// Mock data - will be replaced with real API calls
const mockSchools = [
  {
    id: '1',
    name: 'St. Mary\'s Primary School',
    type: 'PRIMARY',
    address: '123 High Street, London, SW1A 1AA',
    phone: '+44 20 7946 0958',
    email: 'admin@stmarys.edu',
    website: 'www.stmarys.edu',
    headTeacher: 'Mrs. Elizabeth Wilson',
    studentCount: 420,
    establishedYear: 1965,
    status: 'active',
    licenseCount: 2,
    totalRevenue: 900,
    lastPayment: '2024-01-15',
    createdAt: '2024-01-01',
    userCount: 8,
  },
  {
    id: '2',
    name: 'Greenfield Academy',
    type: 'ACADEMY',
    address: '456 Academy Road, Manchester, M1 1AA',
    phone: '+44 161 234 5678',
    email: 'office@greenfield.ac.uk',
    website: 'www.greenfield.ac.uk',
    headTeacher: 'Mr. James Thompson',
    studentCount: 850,
    establishedYear: 2010,
    status: 'active',
    licenseCount: 1,
    totalRevenue: 700,
    lastPayment: '2024-01-10',
    createdAt: '2024-01-05',
    userCount: 12,
  },
  {
    id: '3',
    name: 'Riverside Primary',
    type: 'PRIMARY',
    address: '789 River Lane, Birmingham, B1 2CD',
    phone: '+44 121 345 6789',
    email: 'head@riverside.edu',
    website: null,
    headTeacher: 'Ms. Sarah Davies',
    studentCount: 280,
    establishedYear: 1958,
    status: 'pending',
    licenseCount: 0,
    totalRevenue: 0,
    lastPayment: null,
    createdAt: '2024-01-20',
    userCount: 3,
  },
];

const schoolTypeColors = {
  PRIMARY: 'bg-blue-100 text-blue-800',
  SECONDARY: 'bg-green-100 text-green-800',
  ACADEMY: 'bg-purple-100 text-purple-800',
  INDEPENDENT: 'bg-yellow-100 text-yellow-800',
  FREE_SCHOOL: 'bg-pink-100 text-pink-800',
  SPECIAL: 'bg-orange-100 text-orange-800',
  NURSERY: 'bg-cyan-100 text-cyan-800',
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  suspended: 'bg-red-100 text-red-800',
};

export default function SchoolsManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const filteredSchools = mockSchools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         school.headTeacher.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || school.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || school.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

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
              placeholder="Search schools..."
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
              <option value="PRIMARY">Primary</option>
              <option value="SECONDARY">Secondary</option>
              <option value="ACADEMY">Academy</option>
              <option value="INDEPENDENT">Independent</option>
              <option value="FREE_SCHOOL">Free School</option>
              <option value="SPECIAL">Special</option>
              <option value="NURSERY">Nursery</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'table' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              Table
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                viewMode === 'cards' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
              }`}
            >
              Cards
            </button>
          </div>
          
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Add School
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-gray-900">{mockSchools.length}</div>
          <div className="text-sm text-gray-600">Total Schools</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-green-600">{mockSchools.filter(s => s.status === 'active').length}</div>
          <div className="text-sm text-gray-600">Active Schools</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-blue-600">{mockSchools.reduce((sum, s) => sum + s.licenseCount, 0)}</div>
          <div className="text-sm text-gray-600">Total Licenses</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-purple-600">£{mockSchools.reduce((sum, s) => sum + s.totalRevenue, 0)}</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl font-bold text-orange-600">{mockSchools.reduce((sum, s) => sum + s.studentCount, 0).toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Students</div>
        </div>
      </div>

      {/* Schools Display */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">School</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Students</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Licenses</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSchools.map((school) => (
                  <tr key={school.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{school.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {school.address.split(',')[0]}
                        </div>
                        <div className="text-sm text-gray-500">{school.headTeacher}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        schoolTypeColors[school.type as keyof typeof schoolTypeColors]
                      }`}>
                        {school.type}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{school.studentCount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">{school.licenseCount}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-900">£{school.totalRevenue}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        statusColors[school.status as keyof typeof statusColors]
                      }`}>
                        {school.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center gap-2 justify-end">
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                          <Trash2 className="w-4 h-4" />
                        </button>
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <div key={school.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{school.name}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    schoolTypeColors[school.type as keyof typeof schoolTypeColors]
                  }`}>
                    {school.type}
                  </span>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  statusColors[school.status as keyof typeof statusColors]
                }`}>
                  {school.status}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{school.address.split(',').slice(0, 2).join(', ')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{school.studentCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building2 className="w-4 h-4" />
                  <span>{school.headTeacher}</span>
                </div>
                {school.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{school.email}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="text-sm">
                  <span className="font-medium">{school.licenseCount}</span>
                  <span className="text-gray-500 ml-1">licenses</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">£{school.totalRevenue}</span>
                  <span className="text-gray-500 ml-1">revenue</span>
                </div>
                <div className="flex gap-1">
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}