"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

const oauthErrorMessages: Record<string, string> = {
  OAuthCallback:        'Google sign-in failed. Please try again.',
  OAuthCreateAccount:   'Could not create your account with Google. Please try again.',
  OAuthAccountNotLinked:'An account with this email already exists. Please sign in with your email and password.',
  OAuthSignin:          'Could not start Google sign-in. Please try again.',
  Callback:             'Sign-in callback failed. Please try again.',
  Default:              'An authentication error occurred. Please try again.',
};

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();
  const searchParams = useSearchParams();

  // Show toast for any OAuth error redirected back to this page
  useEffect(() => {
    const errorCode = searchParams.get('error');
    if (errorCode) {
      const msg = oauthErrorMessages[errorCode] ?? oauthErrorMessages.Default;
      toast.error(msg, { duration: 5000 });
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        // NextAuth passes error messages through result.error
        toast.error(result.error === 'CredentialsSignin'
          ? 'Invalid email or password.'
          : result.error);
      } else if (result?.ok) {
        toast.success('Signed in successfully!');
        router.push('/studio/dashboard');
        router.refresh();
      }
    } catch {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn('google', { callbackUrl: '/studio/dashboard' });
      // page will redirect — no need to setIsLoading(false)
    } catch {
      toast.error('Could not start Google sign-in. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-black text-white p-12 flex-col justify-center">
        <div className="max-w-md mx-auto">
          <Image src="/images/newRosheLogo.png" alt="Roshe Studios" width={60} height={60} className="mb-8" />
          <h2 className="text-3xl font-bold mb-8">Our Licence gives you everything you need.</h2>
          <ul className="space-y-4 text-lg">
            {[
              'Full access to the animated film and learning resources',
              'Curriculum-aligned lesson plans and classroom activities',
              'Ready-to-use SEND, OT and SaLT support resources',
              'Flexible resources for assemblies, lessons and group activities',
            ].map((item) => (
              <li key={item} className="flex items-start">
                <span className="text-[#f5bf05] mr-3">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image src="/images/newRosheLogo.png" alt="Roshe Studios" width={50} height={50} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Sign in to Roshe</h1>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors mb-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {isLoading ? 'Redirecting...' : 'Continue with Google'}
          </button>

          <div className="text-center text-gray-500 mb-6">or</div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="name@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword
                    ? <EyeOff className="h-5 w-5 text-gray-400" />
                    : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/studio/forgot-password" className="text-sm text-[#f5bf05] hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#f5bf05] text-black font-semibold py-3 rounded-lg hover:bg-[#e6b100] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in…' : 'Log in'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/studio/signup" className="font-semibold text-black hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function StudioSignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#f5bf05]" />
      </div>
    }>
      <SignInForm />
    </Suspense>
  );
}
