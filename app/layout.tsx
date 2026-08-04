import type {Metadata} from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Roshe Studios',
  description: 'Roshe Studios Animated Short Films',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50" suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
