import { Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Payment Successful',
  description: 'Your license purchase was successful. Check your email for license details.',
};

function SuccessContent() {
  return (
    <main className="w-full bg-white flex flex-col items-center justify-center min-h-[70vh] px-3">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for purchasing a Remember Me license. Your payment has been processed successfully.
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-green-800 mb-3">What's Next?</h2>
          <div className="text-left space-y-2 text-green-700">
            <p>• Check your email for license confirmation and download links</p>
            <p>• Download your educational resources and assembly materials</p>
            <p>• Access our 24/7 support for any questions</p>
            <p>• Start using Remember Me in your educational setting</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            If you don't receive your email within 10 minutes, please check your spam folder or contact us.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Support
            </Link>
            <Link 
              href="/"
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Success() {
  return (
    <Suspense fallback={<div className="min-h-[70vh] flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}