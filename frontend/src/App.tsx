import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AIPanel } from './components/layout/AIPanel';
import { Dashboard } from './pages/Dashboard';
import { Deals } from './pages/Deals';
import { DealDetail } from './pages/DealDetail';
import { Contacts } from './pages/Contacts';
import { ContactDetail } from './pages/ContactDetail';
import { Companies } from './pages/Companies';
import { Inbox } from './pages/Inbox';
import { Tasks } from './pages/Tasks';
import { Reports } from './pages/Reports';
import EmailTemplates from './pages/EmailTemplates';
import { SentimentAnalysis } from './pages/SentimentAnalysis';
import { Settings } from './pages/Settings';
import { Toaster } from 'react-hot-toast';
import { EmailComposerModal } from './components/layout/EmailComposerModal';
import { cn } from './lib/utils';

const App: React.FC = () => {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsAIPanelOpen(prev => !prev);
      }
    };
    const handleToggleAI = () => setIsAIPanelOpen(prev => !prev);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-ai-panel', handleToggleAI);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-ai-panel', handleToggleAI);
    };
  }, []);

  return (
    <Router>
      <div className="flex h-screen bg-[#F9FAFB] text-[#111827] font-sans selection:bg-indigo-100 selection:text-indigo-900">
        <Toaster position="top-right" />
        {/* Accent Line */}
        <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] z-[60]"></div>
        
        <Sidebar />
        
        <div className="flex-1 flex flex-col min-w-0 relative">
          <Header />
          
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/deals/:id" element={<DealDetail />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/contacts/:id" element={<ContactDetail />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/inbox" element={<Inbox />} />
                        <Route path="/templates" element={<EmailTemplates />} />
                        <Route path="/sentiment" element={<SentimentAnalysis />} />
                        <Route path="/tasks" element={<Tasks />} />              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          
          {/* AI Toggle Button (Floating) */}
          <button 
            onClick={() => setIsAIPanelOpen(!isAIPanelOpen)}
            className={cn(
                "fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-indigo-700 transition-all hover:scale-110 active:scale-95 z-40 group overflow-hidden",
                isAIPanelOpen && "right-[366px] sm:right-[366px]" // Adjust based on panel width
            )}
          >
            <div className="absolute inset-0 bg-indigo-400 rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
            <span className="text-2xl relative z-10">🤖</span>
          </button>
        </div>

        <AIPanel isOpen={isAIPanelOpen} onClose={() => setIsAIPanelOpen(false)} />
        <EmailComposerModal />
      </div>
    </Router>
    );
  };
  
  export default App;
  