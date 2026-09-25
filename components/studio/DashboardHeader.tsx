'use client';

import { ChevronDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import { handleSignOut } from '@/lib/auth-client';

interface DashboardHeaderProps {
  userName: string;
  schoolName: string;
  userInitials: string;
}

export default function DashboardHeader({ userName, schoolName, userInitials }: DashboardHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        {/* Left: Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-0.5">{schoolName}</p>
        </div>

        {/* Right: school selector + avatar menu */}
        <div className="flex items-center gap-3">
          {/* School selector */}
          <button className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 transition-colors">
            <span className="font-medium">{schoolName}</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>

          {/* Avatar dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="w-10 h-10 bg-[#f5bf05] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:ring-offset-2"
              aria-label="User menu"
            >
              <span className="font-bold text-black text-sm select-none">{userInitials}</span>
            </button>

            {menuOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setMenuOpen(false)}
                />
                {/* Dropdown */}
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 z-20 py-1">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{schoolName}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
