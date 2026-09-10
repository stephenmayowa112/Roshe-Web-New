"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  CreditCard, 
  FileText, 
  BarChart3, 
  Settings, 
  Shield,
  Database,
  Mail,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Overview',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'System overview and key metrics'
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
    description: 'Manage all platform users'
  },
  {
    name: 'Schools',
    href: '/admin/schools',
    icon: Building2,
    description: 'Manage registered schools'
  },
  {
    name: 'Licenses',
    href: '/admin/licenses',
    icon: FileText,
    description: 'License management and control'
  },
  {
    name: 'Payments',
    href: '/admin/payments',
    icon: CreditCard,
    description: 'Payment transactions and billing'
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
    description: 'Platform analytics and insights'
  },
  {
    name: 'System Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'Platform configuration'
  },
  {
    name: 'Security',
    href: '/admin/security',
    icon: Shield,
    description: 'Security and access control'
  },
  {
    name: 'Database',
    href: '/admin/database',
    icon: Database,
    description: 'Database management and backups'
  },
  {
    name: 'Communications',
    href: '/admin/communications',
    icon: Mail,
    description: 'Email templates and notifications'
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-gray-900 text-white flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-72"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-black" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="font-bold text-lg">Admin Panel</h1>
              <p className="text-xs text-gray-400">Roshe Studios</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group relative",
                isActive 
                  ? "bg-yellow-500 text-black" 
                  : "hover:bg-gray-800 text-gray-300 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{item.name}</div>
                  <div className={cn(
                    "text-xs truncate",
                    isActive ? "text-black/70" : "text-gray-500"
                  )}>
                    {item.description}
                  </div>
                </div>
              )}
              
              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
        >
          <Globe className="w-5 h-5" />
          {!collapsed && <span className="text-sm">Collapse Sidebar</span>}
        </button>
      </div>
    </div>
  );
}