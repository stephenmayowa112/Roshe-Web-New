"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function StudioSignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    region: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign up logic
    console.log('Sign up data:', formData);
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google sign up
    console.log('Google sign up');
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

      {/* Right Panel - Sign Up Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/newRosheLogo.png"
                alt="Roshe Studios Logo"
                width={50}
                height={50}
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sign Up for Roshe</h1>
          </div>

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignUp}
            className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="text-center text-gray-500 mb-6">or</div>

          {/* Manual Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="schoolName" className="block text-sm font-medium text-gray-700 mb-1">
                  School Name
                </label>
                <input
                  type="text"
                  id="schoolName"
                  value={formData.schoolName}
                  onChange={(e) => setFormData(prev => ({ ...prev, schoolName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
                  Region
                </label>
                <input
                  type="text"
                  id="region"
                  value={formData.region}
                  onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f5bf05] focus:border-transparent"
                  placeholder="8+ strong characters including symbols, uppercase, numbers"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                8+ strong characters including symbols, uppercase, numbers
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-[#f5bf05] text-black font-semibold py-3 rounded-lg hover:bg-[#e6b100] transition-colors"
            >
              Sign up
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 mt-6">
            By submitting your information, you agree to Roshe&apos;s{' '}
            <Link href="/terms" className="text-[#f5bf05] hover:underline">
              Terms of service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-[#f5bf05] hover:underline">
              Privacy Policy
            </Link>
          </div>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already a member?{' '}
            <Link href="/studio/signin" className="font-semibold text-black hover:underline">
              Login to account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}