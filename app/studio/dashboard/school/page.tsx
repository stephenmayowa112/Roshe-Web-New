"use client";

import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal } from 'lucide-react';

const mockTeachers = [
  {
    id: 1,
    name: 'Kristin Watson',
    subject: 'Chemistry',
    year: 'YEAR 1',
    email: 'michelle.rivera@example.com',
    gender: 'Female',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: 2,
    name: 'Marvin McKinney',
    subject: 'French',
    year: 'YEAR 2',
    email: 'debbie.baker@example.com',
    gender: 'Female',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: 3,
    name: 'Jane Cooper',
    subject: 'Maths',
    year: 'NURSERY',
    email: 'kenzi.lawson@example.com',
    gender: 'Female',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: 4,
    name: 'Cody Fisher',
    subject: 'English',
    year: 'RECEPTION',
    email: 'nathan.roberts@example.com',
    gender: 'Female',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: 5,
    name: 'Bessie Cooper',
    subject: 'Social studies',
    year: 'YEAR 4',
    email: 'felicia.reid@example.com',
    gender: 'Male',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: 6,
    name: 'Leslie Alexander',
    subject: 'Home economics',
    year: 'YEAR 5',
    email: 'tim.jennings@example.com',
    gender: 'Male',
    avatar: '/api/placeholder/32/32'
  },
  {
    id: 7,
    name: 'Guy Hawkins',
    subject: 'Geography',
    year: 'YEAR 6',
    email: 'alma.lawson@example.com',
    gender: 'Male',
    avatar: '/api/placeholder/32/32'
  }
];

export default function SchoolPage() {
  const [showAddTeacher, setShowAddTeacher] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [teachers, setTeachers] = useState(mockTeachers);
  const [newTeacher, setNewTeacher] = useState({
    fullName: '',
    email: '',
    class: '',
    gender: '',
    password: '',
    phoneNumber: '',
    subject: '',
    designation: ''
  });

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement add teacher functionality
    console.log('Adding teacher:', newTeacher);
    setShowAddTeacher(false);
    setNewTeacher({
      fullName: '',
      email: '',
      class: '',
      gender: '',
      password: '',
      phoneNumber: '',
      subject: '',
      designation: ''
    });
  };

  if (teachers.length === 0) {
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
          <button
            onClick={() => setShowAddTeacher(true)}
            className="bg-[#f5bf05] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#e6b100] transition-colors"
          >
            Add Teacher
          </button>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-20">
          <div className="text-center mb-8">
            <div className="w-32 h-32 mx-auto mb-4 text-gray-300">
              {/* Sleeping character illustration */}
              <svg viewBox="0 0 128 128" className="w-full h-full">
                <circle cx="64" cy="64" r="32" fill="#e5e7eb" />
                <text x="64" y="70" textAnchor="middle" fontSize="20">😴</text>
                <text x="85" y="45" fontSize="12">Z</text>
                <text x="90" y="35" fontSize="14">Z</text>
                <text x="95" y="25" fontSize="16">Z</text>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No teachers at this time</h2>
            <p className="text-gray-600">Teachers will appear here after they are added in your school.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Teachers</h1>
        <button
          onClick={() => setShowAddTeacher(true)}
          className="bg-[#f5bf05] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#e6b100] transition-colors"
        >
          Add Teachers
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search for a teachers by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="h-4 w-4" />
          Add filter
        </button>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <tbody>
            {filteredTeachers.map((teacher) => (
              <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {teacher.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">{teacher.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{teacher.subject}</td>
                <td className="px-6 py-4 text-gray-600">{teacher.year}</td>
                <td className="px-6 py-4 text-gray-600">{teacher.email}</td>
                <td className="px-6 py-4 text-gray-600">{teacher.gender}</td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Teacher Modal */}
      {showAddTeacher && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-bold">Add Teachers</h2>
              <button
                onClick={() => setShowAddTeacher(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              {/* Tab Navigation */}
              <div className="flex gap-4 mb-6 border-b border-gray-200">
                <button className="pb-2 border-b-2 border-[#f5bf05] text-[#f5bf05] font-medium">
                  Manually
                </button>
                <button className="pb-2 text-gray-500 hover:text-gray-700">
                  Import CSV
                </button>
              </div>

              <form onSubmit={handleAddTeacher} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    value={newTeacher.designation}
                    onChange={(e) => setNewTeacher(prev => ({ ...prev, designation: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={newTeacher.fullName}
                    onChange={(e) => setNewTeacher(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) => setNewTeacher(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Class
                    </label>
                    <select
                      value={newTeacher.class}
                      onChange={(e) => setNewTeacher(prev => ({ ...prev, class: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
                    >
                      <option value="">Select class</option>
                      <option value="NURSERY">Nursery</option>
                      <option value="RECEPTION">Reception</option>
                      <option value="YEAR 1">Year 1</option>
                      <option value="YEAR 2">Year 2</option>
                      <option value="YEAR 3">Year 3</option>
                      <option value="YEAR 4">Year 4</option>
                      <option value="YEAR 5">Year 5</option>
                      <option value="YEAR 6">Year 6</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <select
                      value={newTeacher.gender}
                      onChange={(e) => setNewTeacher(prev => ({ ...prev, gender: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={newTeacher.password}
                      onChange={(e) => setNewTeacher(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      value={newTeacher.phoneNumber}
                      onChange={(e) => setNewTeacher(prev => ({ ...prev, phoneNumber: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    value={newTeacher.subject}
                    onChange={(e) => setNewTeacher(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
                  >
                    <option value="">Select subject</option>
                    <option value="English">English</option>
                    <option value="Maths">Maths</option>
                    <option value="Science">Science</option>
                    <option value="History">History</option>
                    <option value="Geography">Geography</option>
                    <option value="Art">Art</option>
                    <option value="PE">PE</option>
                    <option value="Music">Music</option>
                    <option value="Computing">Computing</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                  >
                    <Plus className="h-4 w-4" />
                    Add another
                  </button>
                  <button
                    type="submit"
                    className="bg-[#f5bf05] text-black px-6 py-2 rounded-lg font-semibold hover:bg-[#e6b100] transition-colors ml-auto"
                  >
                    Add Teacher
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}