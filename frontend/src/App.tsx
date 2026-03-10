import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AIPanel } from './components/layout/AIPanel';
import { Dashboard } from './pages/Dashboard';
import { Deals } from './pages/Deals';
import { Contacts } from './pages/Contacts';
import { Companies } from './pages/Companies';
import { Inbox } from './pages/Inbox';
import { Tasks } from './pages/Tasks';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { ContactDetail } from './pages/ContactDetail';

const App: React.FC = () => {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-[#F9FAFB] text-[#111827] font-sans selection:bg-indigo-100 selection:text-indigo-900">
        {/* Accent Line */}
        <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] z-[60]"></div>
        
        <Sidebar />
        
        <div className="flex-1 flex flex-col min-w-0 relative">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/contacts/:id" element={<ContactDetail />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/ai" element={<div className="p-8 text-center"><BotIcon size={48} className="mx-auto text-indigo-500 mb-4" />Open the side panel for the full AI experience</div>} />
            </Routes>
          </main>
          
          {/* AI Toggle Button (Floating) */}
          {!isAIPanelOpen && (
            <button 
              onClick={() => setIsAIPanelOpen(true)}
              className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 transition-all hover:scale-110 active:scale-95 z-40 group"
            >
              <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
              <SparklesIcon size={24} />
            </button>
          )}
        </div>

        <AIPanel isOpen={isAIPanelOpen} onClose={() => setIsAIPanelOpen(false)} />
      </div>
    </Router>
  );
};

const BotIcon = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

const SparklesIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

export default App;