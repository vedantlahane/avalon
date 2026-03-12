import React, { useState } from 'react';
import { Plus, User, BadgeDollarSign, ClipboardList, Mail, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useModalStore } from '../../lib/modal-store';
import { composerStore } from '../../lib/composer-store';

export const MobileFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { contactModal, dealModal, taskModal } = useModalStore();

  const actions = [
    { icon: User, label: 'Contact', action: () => contactModal.open() },
    { icon: BadgeDollarSign, label: 'Deal', action: () => dealModal.open() },
    { icon: ClipboardList, label: 'Task', action: () => taskModal.open() },
    { icon: Mail, label: 'Email', action: () => composerStore.open() },
    { icon: FileText, label: 'Note', action: () => {} },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[48] md:hidden"
          />
        )}
      </AnimatePresence>

      <div className="fixed bottom-[80px] right-6 z-[49] md:hidden flex flex-col items-end gap-3">
        <AnimatePresence>
          {isOpen && (
            <div className="flex flex-col items-end gap-3 mb-2">
              {actions.map((action, i) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.5, y: 20 }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: (actions.length - i - 1) * 0.05 
                  }}
                  onClick={() => {
                    action.action();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-3 group"
                >
                  <span className="px-3 py-1.5 bg-card border border-border text-foreground text-xs font-bold rounded-xl shadow-xl whitespace-nowrap">
                    {action.label}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white shadow-xl flex items-center justify-center transform active:scale-90 transition-transform">
                    <action.icon size={20} />
                  </div>
                </motion.button>
              ))}
            </div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          animate={{ rotate: isOpen ? 45 : 0 }}
          className={cn(
            "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-colors transform active:scale-95",
            isOpen ? "bg-card text-foreground" : "bg-indigo-600 text-white"
          )}
        >
          <Plus size={32} />
        </motion.button>
      </div>
    </>
  );
};
