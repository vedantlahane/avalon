import React from 'react';
import { User, Bell, Lock, Globe, Shield, CreditCard } from 'lucide-react';

export const Settings: React.FC = () => {
  const sections = [
    { icon: User, label: 'Profile', desc: 'Manage your public profile and personal info' },
    { icon: Bell, label: 'Notifications', desc: 'Configure how you receive alerts' },
    { icon: Globe, label: 'Language & Region', desc: 'Set your preferred language and timezone' },
    { icon: Lock, label: 'Security', desc: 'Password management and 2FA' },
    { icon: Shield, label: 'Privacy', desc: 'Control your data and sharing' },
    { icon: CreditCard, label: 'Billing', desc: 'Manage your subscription and invoices' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences and application configuration.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
        {sections.map((section, i) => (
          <button key={i} className="w-full p-6 flex items-center gap-6 hover:bg-gray-50 transition-colors text-left group">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
              <section.icon size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{section.label}</h3>
              <p className="text-sm text-gray-500">{section.desc}</p>
            </div>
            <div className="text-gray-300 group-hover:text-indigo-600 transition-colors">
              <ChevronRight size={20} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const ChevronRight = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);
