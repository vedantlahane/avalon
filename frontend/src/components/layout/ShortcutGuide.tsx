import React from 'react';
import { X, Command, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShortcutGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutGuide: React.FC<ShortcutGuideProps> = ({ isOpen, onClose }) => {
  const shortcuts = [
    { key: '?', label: 'Show shortcut overlay' },
    { key: '⌘ K', label: 'Command palette' },
    { key: '⌘ N', label: 'New contact' },
    { key: '⌘ D', label: 'New deal' },
    { key: '⌘ T', label: 'New task' },
    { key: '⌘ E', label: 'Compose email' },
    { key: '⌘ /', label: 'Focus AI assistant' },
    { key: 'Esc', label: 'Close modal/panel' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Keyboard size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Keyboard Shortcuts</h2>
                  <p className="text-sm text-muted-foreground">Boost your productivity with quick actions</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {shortcuts.map((shortcut, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border/50">
                    <span className="text-sm font-medium text-foreground">{shortcut.label}</span>
                    <div className="flex items-center gap-1">
                      {shortcut.key.split(' ').map((k, i) => (
                        <kbd key={i} className="px-2 py-1 bg-card border border-border rounded text-xs font-bold shadow-sm min-w-[24px] text-center">
                          {k === '⌘' ? <Command size={10} className="inline mr-0.5" /> : k}
                          {k === '⌘' ? '' : k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex items-center justify-center p-4 rounded-xl bg-primary/5 border border-primary/10 text-center">
                <p className="text-xs text-primary font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Pro Tip: Most shortcuts work globally across all pages
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
