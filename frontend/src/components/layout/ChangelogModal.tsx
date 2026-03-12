import React, { useState, useEffect } from 'react';
import { X, Sparkles, Zap, Smartphone, HelpCircle } from 'lucide-react';

const CHANGELOG = [
  {
    title: 'Mobile App Layout',
    description: 'Completely redesigned mobile experience with bottom navigation and swipe gestures.',
    icon: Smartphone,
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    title: 'Advanced AI Assistant',
    description: 'New conversational AI that can analyze deals, generate emails, and suggest tasks.',
    icon: Zap,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
  },
  {
    title: 'Interactive Chart Library',
    description: 'Beautiful new charts for revenue forecasting, pipeline funnel, and lead distribution.',
    icon: Sparkles,
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    title: 'Help & Documentation',
    description: 'Comprehensive help center with articles, guides, and keyboard shortcut reference.',
    icon: HelpCircle,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
];

export const ChangelogModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenChangelog = localStorage.getItem('nexus_crm_seen_changelog_v1');
    if (!hasSeenChangelog) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('nexus_crm_seen_changelog_v1', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What's New in NexusCRM AI</h2>
          </div>

          <div className="space-y-6">
            {CHANGELOG.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full ${item.bg} dark:bg-slate-800 flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={handleClose}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
