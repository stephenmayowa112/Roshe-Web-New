'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const errorMessages: Record<string, { title: string; message: string }> = {
  Configuration: {
    title: 'Server Configuration Error',
    message: 'There is a problem with the server configuration. Please contact support.',
  },
  AccessDenied: {
    title: 'Access Denied',
    message: 'You do not have permission to sign in.',
  },
  Verification: {
    title: 'Verification Failed',
    message: 'The verification link has expired or has already been used.',
  },
  OAuthSignin: {
    title: 'Google Sign In Error',
    message: 'Could not start the Google sign-in process. Please try again.',
  },
  OAuthCallback: {
    title: 'Google Callback Error',
    message: 'There was a problem completing the Google sign-in. This is often caused by a browser cookie issue — please try clearing your cookies or using a different browser.',
  },
  OAuthCreateAccount: {
    title: 'Account Creation Failed',
    message: 'We could not create your account. Please try again or sign up with email and password.',
  },
  OAuthAccountNotLinked: {
    title: 'Account Already Exists',
    message: 'An account with this email already exists using a different sign-in method. Please sign in with your email and password.',
  },
  EmailCreateAccount: {
    title: 'Account Creation Failed',
    message: 'Could not create your account. Please try again.',
  },
  Callback: {
    title: 'Sign In Error',
    message: 'There was a problem during sign in. Please try again.',
  },
  Default: {
    title: 'Authentication Error',
    message: 'An unexpected error occurred during authentication. Please try again.',
  },
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('error') ?? 'Default';
  const { title, message } = errorMessages[errorCode] ?? errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/newRosheLogo.png"
            alt="Roshe Studios"
            width={60}
            height={60}
          />
        </div>

        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          {/* Error Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>

          <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
          <p className="text-gray-600 text-sm mb-2">{message}</p>

          {errorCode && (
            <p className="text-xs text-gray-400 mb-6">Error code: {errorCode}</p>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <Link
              href="/studio/signin"
              className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-semibold text-black bg-[#f5bf05] hover:bg-[#e6b100] transition-colors"
            >
              Try Signing In Again
            </Link>

            {errorCode === 'OAuthAccountNotLinked' && (
              <Link
                href="/studio/signin"
                className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-semibold text-white bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                Sign In With Email & Password
              </Link>
            )}

            <Link
              href="/"
              className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Go Home
            </Link>
          </div>

          <p className="mt-6 text-xs text-gray-500">
            Still having trouble?{' '}
            <Link href="/contact" className="text-[#f5bf05] hover:underline font-medium">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#f5bf05]" />
      </div>
    }>
      <AuthErrorContent />
    </Suspense>
  );
}
