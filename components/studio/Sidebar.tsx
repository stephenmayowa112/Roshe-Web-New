'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { handleSignOut } from '@/lib/auth-client';
import {
  LayoutDashboard,
  School,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard',          href: '/studio/dashboard',              icon: LayoutDashboard },
  { name: 'My School',          href: '/studio/dashboard/school',       icon: School },
  { name: 'Account & Settings', href: '/studio/dashboard/settings',     icon: Settings },
  { name: 'Subscription',       href: '/studio/dashboard/subscription', icon: CreditCard },
  { name: 'Support',            href: '/studio/dashboard/support',      icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-44 bg-[#1a1a1a] text-white flex flex-col flex-shrink-0 h-screen">
      {/* Brand */}
      <div className="px-4 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
            {/* Heart icon to match the design */}
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                       2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                       C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                       c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-xs leading-tight tracking-wide">REMEMBER ME</p>
            <p className="text-[10px] text-gray-400 leading-tight">The Animated Film</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 overflow-y-auto">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-700 text-white border-l-2 border-[#f5bf05]'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Sign Out at the bottom */}
      <div className="px-3 py-4 border-t border-gray-800">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <LogOut className="h-4 w-4 flex-shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
