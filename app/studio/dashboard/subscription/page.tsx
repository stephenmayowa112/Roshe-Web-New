"use client";

import { useState } from 'react';
import { ToggleLeft, ToggleRight } from 'lucide-react';

export default function SubscriptionPage() {
  const [autoRenew, setAutoRenew] = useState(true);

  const handleManagePayment = () => {
    // TODO: Implement payment management
    console.log('Managing payment method');
  };

  const handleViewInvoices = () => {
    // TODO: Implement invoice viewing
    console.log('Viewing invoices');
  };

  const handleChangePlan = () => {
    // TODO: Implement plan change
    console.log('Changing plan');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Subscription - ST. MARY PRIMARY SCHOOL
        </h1>
      </div>

      {/* Current Subscription Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Current Subscription</h2>
        
        <div className="space-y-4">
          {/* Plan Info */}
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-900">Plan: Single School License</span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
              Active
            </span>
          </div>

          {/* Billing Cycle */}
          <div className="text-gray-600">
            <span className="font-medium">Billing cycle:</span> Monthly · Next billing: Sep 20, 2027
          </div>

          {/* Usage Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-900">Monthly minutes</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div className="bg-gray-800 h-2 rounded-full" style={{ width: '24%' }}></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Used: 120</span>
              <span>Remaining: 380</span>
            </div>
          </div>

          {/* Auto-renew Toggle */}
          <div className="flex items-center justify-between py-2">
            <span className="font-medium text-gray-900">Auto-renew</span>
            <button
              onClick={() => setAutoRenew(!autoRenew)}
              className="flex items-center"
            >
              {autoRenew ? (
                <ToggleRight className="h-8 w-8 text-[#f5bf05]" />
              ) : (
                <ToggleLeft className="h-8 w-8 text-gray-400" />
              )}
            </button>
          </div>

          {/* Payment Management */}
          <div className="flex gap-4 text-sm">
            <button
              onClick={handleManagePayment}
              className="text-[#f5bf05] hover:underline font-medium"
            >
              Manage Payment Method
            </button>
            <span className="text-gray-400">·</span>
            <button
              onClick={handleViewInvoices}
              className="text-[#f5bf05] hover:underline font-medium"
            >
              View Invoices
            </button>
          </div>

          {/* Change Plan Button */}
          <div className="pt-4">
            <button
              onClick={handleChangePlan}
              className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Change Plan
            </button>
          </div>
        </div>
      </div>

      {/* Billing History or Additional Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h3>
        <div className="text-gray-600">
          <p className="mb-2">Your subscription includes:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>6 minutes 2D original animation</li>
            <li>Remembrance Day Assembly Script</li>
            <li>Remembrance Day Teachers guide</li>
            <li>Remembrance Day Student Worksheet</li>
            <li>24/7 support and consulting</li>
          </ul>
        </div>
      </div>
    </div>
  );
}