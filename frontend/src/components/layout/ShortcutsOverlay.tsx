import React from 'react';
import { X, Command } from 'lucide-react';
import { useHelpStore } from '@/lib/help-store';

export const ShortcutsOverlay: React.FC = () => {
  const { isShortcutsOpen, closeShortcuts } = useHelpStore();

  if (!isShortcutsOpen) return null;

  const sections = [
    {
      title: 'NAVIGATION',
      shortcuts: [
        { keys: ['⌘', 'K'], label: 'Command Palette' },
        { keys: ['G', 'D'], label: 'Go to Dashboard' },
        { keys: ['G', 'C'], label: 'Go to Contacts' },
        { keys: ['G', 'P'], label: 'Go to Pipeline' },
        { keys: ['G', 'T'], label: 'Go to Tasks' },
        { keys: ['G', 'R'], label: 'Go to Reports' },
      ]
    },
    {
      title: 'ACTIONS',
      shortcuts: [
        { keys: ['⌘', 'N'], label: 'New Contact' },
        { keys: ['⌘', 'D'], label: 'New Deal' },
        { keys: ['⌘', 'T'], label: 'New Task' },
        { keys: ['⌘', 'E'], label: 'Compose Email' },
        { keys: ['⌘', '/'], label: 'Toggle AI Assistant' },
      ]
    },
    {
      title: 'GENERAL',
      shortcuts: [
        { keys: ['Esc'], label: 'Close modal/panel' },
        { keys: ['⌘', 'S'], label: 'Save current form' },
        { keys: ['⌘', 'Z'], label: 'Undo last action' },
        { keys: ['?'], label: 'Show this shortcuts panel' },
        { keys: ['F1'], label: 'Open Help' },
      ]
    }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={closeShortcuts}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Command className="w-5 h-5 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Keyboard Shortcuts</h2>
          </div>
          <button 
            onClick={closeShortcuts}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {sections.map((section, idx) => (
            <div key={section.title} className={idx === 2 ? "md:col-span-2" : ""}>
              <h3 className="text-xs font-bold text-indigo-600 tracking-widest mb-4">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.shortcuts.map((shortcut) => (
                  <div key={shortcut.label} className="flex items-center justify-between group">
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                      {shortcut.label}
                    </span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key) => (
                        <kbd 
                          key={key}
                          className="min-w-[24px] px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded-md shadow-[0_1px_0_rgba(0,0,0,0.2)]"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 px-8 py-4 border-t flex justify-center">
          <p className="text-xs text-gray-500">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded shadow-sm">Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
};
