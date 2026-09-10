import { Metadata } from 'next';
import SettingsManagement from '@/components/admin/SettingsManagement';

export const metadata: Metadata = {
  title: 'Settings | Admin Dashboard',
  description: 'System configuration and settings',
};

export default function SettingsPage() {
  return (
    <div className="p-6">
      <SettingsManagement />
    </div>
  );
}