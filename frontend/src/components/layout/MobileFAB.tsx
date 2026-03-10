import React, { useState } from 'react';
import { Plus, UserPlus, BadgeDollarSign, CheckSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

export const MobileFAB: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { icon: UserPlus, label: 'Add Contact', color: 'bg-blue-600', onClick: () => {} },
    { icon: BadgeDollarSign, label: 'Add Deal', color: 'bg-emerald-600', onClick: () => {} },
    { icon: CheckSquare, label: 'Add Task', color: 'bg-indigo-600', onClick: () => {} },
  ];

  return (
    <div className="fixed bottom-20 right-6 z-40 md:hidden">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-end gap-3 mb-4">
            {actions.map((action, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => {
                  action.onClick();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 group"
              >
                <span className="px-3 py-1 bg-gray-900 text-white text-xs font-bold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {action.label}
                </span>
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl transform active:scale-90 transition-transform",
                  action.color
                )}>
                  <action.icon size={20} />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-2xl flex items-center justify-center transition-all duration-300 transform active:scale-95",
          isOpen ? "rotate-45 bg-gray-900" : "rotate-0"
        )}
      >
        {isOpen ? <X size={28} /> : <Plus size={28} />}
      </button>
    </div>
  );
};
