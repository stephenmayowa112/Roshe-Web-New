"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before checking pathname to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a basic layout during hydration to avoid mismatch
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex flex-col">
          {children}
        </div>
      </div>
    );
  }

  // Check if current route is dashboard
  const isDashboard = pathname.startsWith('/studio/dashboard');

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