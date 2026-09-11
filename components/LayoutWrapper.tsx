"use client";

import { useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  // Keep the initial server and client markup identical while the route is resolved.
  if (!isMounted) {
    return <>{children}</>;
  }

  // Keep app dashboards outside the public site chrome.
  const isDashboard = pathname.startsWith('/studio/dashboard') || pathname.startsWith('/admin');

  if (isDashboard) {
    // Dashboard layout - no navbar/footer, full height
    return (
      <div className="h-screen overflow-hidden">
        {children}
      </div>
    );
  }

  // Regular layout with navbar and footer
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col">
        {children}
      </div>
      <Footer />
    </div>
  );
}