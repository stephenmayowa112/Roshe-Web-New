"use client";

import { useState } from 'react';
import { 
  Save, 
  RefreshCw, 
  Settings, 
  Mail, 
  CreditCard, 
  Shield, 
  Bell, 
  Globe, 
  Database,
  Key,
  AlertTriangle,
  Check,
  X,
  Upload,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: any;
}

const settingSections: SettingSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    description: 'Basic platform configuration',
    icon: Settings
  },
  {
    id: 'email',
    title: 'Email Configuration',
    description: 'SMTP and email template settings',
    icon: Mail
  },
  {
    id: 'payments',
    title: 'Payment Settings',
    description: 'Stripe configuration and pricing',
    icon: CreditCard
  },
  {
    id: 'security',
    title: 'Security & Auth',
    description: 'Authentication and security policies',
    icon: Shield
  },
  {
    id: 'notifications',
    title: 'Notifications',
    description: 'System alerts and communication',
    icon: Bell
  },
  {
    id: 'backup',
    title: 'Backup & Recovery',
    description: 'Data backup and restoration',
    icon: Database
  }
];

export default function SettingsManagement() {
  const [activeSection, setActiveSection] = useState('general');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  
  // Mock settings state
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Roshe Studios',
      siteUrl: 'https://roshe-studios.com',
      supportEmail: 'support@roshe-studios.com',
      adminEmail: 'admin@roshe-studios.com',
      timezone: 'Europe/London',
      dateFormat: 'DD/MM/YYYY',
      language: 'en-GB',
      maintenanceMode: false,
    },
    email: {
      smtpHost: 'smtp.gmail.com',
      smtpPort: '587',
      smtpUsername: 'noreply@roshe-studios.com',
      smtpPassword: '••••••••••••',
      fromName: 'Roshe Studios',
      fromEmail: 'noreply@roshe-studios.com',
      enableTls: true,
    },
    payments: {
      stripePublishableKey: 'pk_test_••••••••••••',
      stripeSecretKey: 'sk_test_••••••••••••',
      webhookSecret: 'whsec_••••••••••••',
      currency: 'GBP',
      singleSchoolPrice: 200.00,
      multiSchoolPrice: 700.00,
      testMode: true,
    },
    security: {
      jwtSecret: '••••••••••••',
      jwtExpiry: '7d',
      sessionTimeout: 24,
      maxLoginAttempts: 5,
      lockoutDuration: 15,
      requireEmailVerification: true,
      enable2FA: false,
      passwordMinLength: 8,
      passwordRequireSpecial: true,
    },
    notifications: {
      emailNewUser: true,
      emailNewSchool: true,
      emailPaymentSuccess: true,
      emailPaymentFailed: true,
      emailLicenseExpiry: true,
      emailSystemAlerts: true,
      slackWebhook: '',
      discordWebhook: '',
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionDays: 30,
      backupLocation: 's3',
      s3Bucket: 'roshe-backups',
      s3Region: 'eu-west-2',
      lastBackup: '2024-01-15T10:30:00Z',
    }
  });

  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setUnsavedChanges(true);
  };

  const handleSave = async () => {
    // Here you would make API calls to save settings
    console.log('Saving settings:', settings);
    setUnsavedChanges(false);
    // Show success message
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
          <input
            type="url"
            value={settings.general.siteUrl}
            onChange={(e) => handleSettingChange('general', 'siteUrl', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
          <input
            type="email"
            value={settings.general.supportEmail}
            onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
          <input
            type="email"
            value={settings.general.adminEmail}
            onChange={(e) => handleSettingChange('general', 'adminEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="Europe/London">Europe/London</option>
            <option value="America/New_York">America/New_York</option>
            <option value="America/Los_Angeles">America/Los_Angeles</option>
            <option value="Australia/Sydney">Australia/Sydney</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
          <select
            value={settings.general.dateFormat}
            onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="YYYY-MM-DD">YYYY-MM-DD</option>
          </select>
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="maintenanceMode"
          checked={settings.general.maintenanceMode}
          onChange={(e) => handleSettingChange('general', 'maintenanceMode', e.target.checked)}
          className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
        />
        <label htmlFor="maintenanceMode" className="ml-2 text-sm text-gray-700">
          Enable Maintenance Mode
        </label>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => handleSettingChange('email', 'smtpHost', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
          <input
            type="text"
            value={settings.email.smtpPort}
            onChange={(e) => handleSettingChange('email', 'smtpPort', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
          <input
            type="text"
            value={settings.email.smtpUsername}
            onChange={(e) => handleSettingChange('email', 'smtpUsername', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={settings.email.smtpPassword}
              onChange={(e) => handleSettingChange('email', 'smtpPassword', e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
          <input
            type="text"
            value={settings.email.fromName}
            onChange={(e) => handleSettingChange('email', 'fromName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
          <input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) => handleSettingChange('email', 'fromEmail', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          id="enableTls"
          checked={settings.email.enableTls}
          onChange={(e) => handleSettingChange('email', 'enableTls', e.target.checked)}
          className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
        />
        <label htmlFor="enableTls" className="ml-2 text-sm text-gray-700">
          Enable TLS/SSL
        </label>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          <h4 className="text-sm font-medium text-yellow-800">Security Notice</h4>
        </div>
        <p className="text-sm text-yellow-700 mt-1">
          API keys are sensitive. Only update them if necessary and ensure they&apos;re kept secure.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="testMode"
              checked={settings.payments.testMode}
              onChange={(e) => handleSettingChange('payments', 'testMode', e.target.checked)}
              className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label htmlFor="testMode" className="text-sm font-medium text-gray-700">
              Test Mode (Use Stripe test keys)
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Publishable Key</label>
          <input
            type="text"
            value={settings.payments.stripePublishableKey}
            onChange={(e) => handleSettingChange('payments', 'stripePublishableKey', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Secret Key</label>
          <div className="relative">
            <input
              type={showApiKey ? 'text' : 'password'}
              value={settings.payments.stripeSecretKey}
              onChange={(e) => handleSettingChange('payments', 'stripeSecretKey', e.target.value)}
              className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Single School Price (£)</label>
          <input
            type="number"
            step="0.01"
            value={settings.payments.singleSchoolPrice}
            onChange={(e) => handleSettingChange('payments', 'singleSchoolPrice', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Multi-School Price (£)</label>
          <input
            type="number"
            step="0.01"
            value={settings.payments.multiSchoolPrice}
            onChange={(e) => handleSettingChange('payments', 'multiSchoolPrice', parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">JWT Expiry</label>
          <select
            value={settings.security.jwtExpiry}
            onChange={(e) => handleSettingChange('security', 'jwtExpiry', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="1d">1 Day</option>
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (hours)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lockout Duration (minutes)</label>
          <input
            type="number"
            value={settings.security.lockoutDuration}
            onChange={(e) => handleSettingChange('security', 'lockoutDuration', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password Min Length</label>
          <input
            type="number"
            value={settings.security.passwordMinLength}
            onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="requireEmailVerification"
            checked={settings.security.requireEmailVerification}
            onChange={(e) => handleSettingChange('security', 'requireEmailVerification', e.target.checked)}
            className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
          />
          <label htmlFor="requireEmailVerification" className="ml-2 text-sm text-gray-700">
            Require Email Verification
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enable2FA"
            checked={settings.security.enable2FA}
            onChange={(e) => handleSettingChange('security', 'enable2FA', e.target.checked)}
            className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
          />
          <label htmlFor="enable2FA" className="ml-2 text-sm text-gray-700">
            Enable Two-Factor Authentication
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="passwordRequireSpecial"
            checked={settings.security.passwordRequireSpecial}
            onChange={(e) => handleSettingChange('security', 'passwordRequireSpecial', e.target.checked)}
            className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
          />
          <label htmlFor="passwordRequireSpecial" className="ml-2 text-sm text-gray-700">
            Require Special Characters in Passwords
          </label>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'email':
        return renderEmailSettings();
      case 'payments':
        return renderPaymentSettings();
      case 'security':
        return renderSecuritySettings();
      default:
        return <div className="text-center text-gray-500 py-8">Select a section to configure</div>;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <div className="w-full lg:w-1/4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
          <nav className="space-y-1">
            {settingSections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{section.title}</div>
                      <div className="text-xs text-gray-500">{section.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-semibold text-gray-900">
              {settingSections.find(s => s.id === activeSection)?.title}
            </h1>
            <div className="flex gap-3">
              {unsavedChanges && (
                <div className="flex items-center gap-2 text-orange-600 text-sm">
                  <AlertTriangle className="w-4 h-4" />
                  Unsaved changes
                </div>
              )}
              <button
                onClick={handleSave}
                disabled={!unsavedChanges}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-black px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
          
          {renderContent()}
        </div>
      </div>
    </div>
  );
}