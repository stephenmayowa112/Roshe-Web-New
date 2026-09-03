"use client";

import { ChevronDown } from 'lucide-react';

interface DashboardHeaderProps {
  schoolName: string;
  userInitials: string;
}

export default function DashboardHeader({ schoolName, userInitials }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* School Selector */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{schoolName}</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          
          {/* User Avatar */}
          <div className="w-10 h-10 bg-[#f5bf05] rounded-full flex items-center justify-center">
            <span className="font-bold text-black text-sm">{userInitials}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-2">
        <p className="text-gray-600">{schoolName}</p>
      </div>
    </header>
  );
}