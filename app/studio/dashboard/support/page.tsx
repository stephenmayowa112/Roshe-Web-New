"use client";

import { Mail, Phone, MessageCircle, FileText, HelpCircle } from 'lucide-react';

export default function SupportPage() {
  const handleContactSupport = (method: string) => {
    // TODO: Implement contact functionality
    console.log('Contacting support via:', method);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Support */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Support</h2>
          
          <div className="space-y-4">
            <button
              onClick={() => handleContactSupport('email')}
              className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-[#f5bf05] rounded-full flex items-center justify-center">
                <Mail className="h-5 w-5 text-black" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Email Support</h3>
                <p className="text-sm text-gray-600">roshestudios.com@gmail.com</p>
              </div>
            </button>

            <button
              onClick={() => handleContactSupport('phone')}
              className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-[#f5bf05] rounded-full flex items-center justify-center">
                <Phone className="h-5 w-5 text-black" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Phone Support</h3>
                <p className="text-sm text-gray-600">+447584834000</p>
              </div>
            </button>

            <button
              onClick={() => handleContactSupport('chat')}
              className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-[#f5bf05] rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-black" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Live Chat</h3>
                <p className="text-sm text-gray-600">Available during business hours</p>
              </div>
            </button>
          </div>
        </div>

        {/* Resources */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Help Resources</h2>
          
          <div className="space-y-4">
            <a
              href="#"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">User Guide</h3>
                <p className="text-sm text-gray-600">Complete guide to using the platform</p>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">FAQ</h3>
                <p className="text-sm text-gray-600">Frequently asked questions</p>
              </div>
            </a>

            <a
              href="#"
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Community Forum</h3>
                <p className="text-sm text-gray-600">Connect with other educators</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-gray-900 mb-2">Report an Issue</h3>
            <p className="text-sm text-gray-600">Having technical problems?</p>
          </button>
          
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-gray-900 mb-2">Request Feature</h3>
            <p className="text-sm text-gray-600">Suggest new functionality</p>
          </button>
          
          <button className="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <h3 className="font-medium text-gray-900 mb-2">Training Request</h3>
            <p className="text-sm text-gray-600">Schedule a training session</p>
          </button>
        </div>
      </div>
    </div>
  );
}