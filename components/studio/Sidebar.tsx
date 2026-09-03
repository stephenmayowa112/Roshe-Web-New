"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  School, 
  Settings, 
  CreditCard, 
  HelpCircle 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/studio/dashboard', icon: LayoutDashboard },
  { name: 'My School', href: '/studio/dashboard/school', icon: School },
  { name: 'Account & Settings', href: '/studio/dashboard/settings', icon: Settings },
  { name: 'Subscription', href: '/studio/dashboard/subscription', icon: CreditCard },
  { name: 'Support', href: '/studio/dashboard/support', icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-black text-white flex flex-col h-screen">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">❤️</span>
          </div>
          <div>
            <h1 className="font-bold text-sm">REMEMBER ME</h1>
            <p className="text-xs text-gray-400">The Animated Film</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}