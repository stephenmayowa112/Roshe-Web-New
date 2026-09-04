"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false);
  
  const handleResend = async () => {
    setIsResending(true);
    // TODO: Implement resend logic
    setTimeout(() => {
      setIsResending(false);
      console.log('Verification email resent');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <div className="flex items-center mb-8">
            <Image
              src="/images/newRosheLogo.png"
              alt="Roshe Studios Logo"
              width={60}
              height={60}
              className="mr-4"
            />
          </div>
          
          <h2 className="text-3xl font-bold mb-8">
            Our Licence gives you everything you need.
          </h2>
          
          <ul className="space-y-4 text-lg">
            <li className="flex items-start">
              <span className="text-[#f5bf05] mr-3">•</span>
              <span>Full access to the animated film and learning resources</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#f5bf05] mr-3">•</span>
              <span>Curriculum-aligned lesson plans and classroom activities</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#f5bf05] mr-3">•</span>
              <span>Ready-to-use SEND, OT and SaLT support resources</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#f5bf05] mr-3">•</span>
              <span>Flexible resources for assemblies, lessons and group activities</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Panel - Verification Message */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/newRosheLogo.png"
              alt="Roshe Studios Logo"
              width={50}
              height={50}
            />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h1>
          
          <p className="text-gray-600 mb-4">
            Use the verification link sent to your email
          </p>
          
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-gray-700 font-mono text-sm">email example</p>
          </div>
          
          <div className="text-sm text-gray-600">
            Didn&apos;t receive a link?{' '}
            <button
              onClick={handleResend}
              disabled={isResending}
              className="font-semibold text-black hover:underline disabled:opacity-50"
            >
              {isResending ? 'Resending...' : 'Resend'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}