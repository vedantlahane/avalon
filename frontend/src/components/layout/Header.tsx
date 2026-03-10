import React from 'react';
import { Search, Bell, User, Plus, Mail } from 'lucide-react';
import { composerStore } from '../../lib/composer-store';

export const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search contacts, deals, or tasks... (⌘K)"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={() => composerStore.open()}
          className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors shadow-sm"
        >
          <Mail size={18} className="text-indigo-600" />
          <span>Compose</span>
        </button>

        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus size={18} />
          <span>New Entry</span>
        </button>
        
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
        
        <button className="flex items-center gap-3 pl-2 pr-1 py-1 hover:bg-gray-100 rounded-lg transition-colors">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-semibold text-gray-900">Alex Rivers</div>
            <div className="text-xs text-gray-500">Sales Lead</div>
          </div>
          <div className="w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm border border-indigo-200">
            AR
          </div>
        </button>
      </div>
    </header>
  );
};
