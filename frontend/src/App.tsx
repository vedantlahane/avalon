import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AIPanel } from './components/layout/AIPanel';
import { Breadcrumbs } from './components/layout/Breadcrumbs';
import { Dashboard } from './pages/Dashboard';
import { Deals } from './pages/Deals';
import { DealDetail } from './pages/DealDetail';
import { Contacts } from './pages/Contacts';
import { ContactDetail } from './pages/ContactDetail';
import { Companies } from './pages/Companies';
import { CompanyDetail } from './pages/CompanyDetail';
import { Inbox } from './pages/Inbox';
import { Tasks } from './pages/Tasks';
import { Reports } from './pages/Reports';
import EmailTemplates from './pages/EmailTemplates';
import { SentimentAnalysis } from './pages/SentimentAnalysis';
import { Settings } from './pages/Settings';
import { ToastProvider } from './components/layout/ToastProvider';
import { EmailComposerModal } from './components/layout/EmailComposerModal';
import { CommandPalette } from './components/layout/CommandPalette';
import OnboardingModal from './components/onboarding/OnboardingModal';
import { authService } from './services/auth.service';
import { User } from './types';
import { useNotificationSimulator } from './hooks/useNotificationSimulator';
import { commandPaletteStore } from './lib/command-palette-store';
import { cn } from './lib/utils';
import { MobileFAB } from './components/layout/MobileFAB';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/deals/:id" element={<DealDetail />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/:id" element={<ContactDetail />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/companies/:id" element={<CompanyDetail />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/templates" element={<EmailTemplates />} />
          <Route path="/sentiment" element={<SentimentAnalysis />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);
  useNotificationSimulator();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        if (!currentUser.isOnboarded) {
          setShowOnboarding(true);
        }
      } catch (error) {
        console.error('Failed to fetch user', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        commandPaletteStore.toggle();
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
      <div className="flex h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary overflow-hidden">
        <ToastProvider />
        {/* Accent Line */}
        <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary z-[60]"></div>
        
        <Sidebar />
        
        <div className="flex-1 flex flex-col min-w-0 relative h-full">
          <Header />
          <Breadcrumbs />
          
          <main className="flex-1 overflow-y-auto custom-scrollbar relative bg-background">
            <div className="h-full">
              <AnimatedRoutes />
            </div>
          </main>
          
          {/* AI Toggle Button (Floating) */}
          <button 
            onClick={() => setIsAIPanelOpen(!isAIPanelOpen)}
            className={cn(
                "hidden md:flex fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl items-center justify-center hover:bg-primary/90 transition-all hover:scale-110 active:scale-95 z-40 group overflow-hidden",
                isAIPanelOpen && "right-[416px]"
            )}
          >
            <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
            <span className="text-2xl relative z-10">🤖</span>
          </button>
          
          <MobileFAB />
        </div>

        <AIPanel isOpen={isAIPanelOpen} onClose={() => setIsAIPanelOpen(false)} />
        <EmailComposerModal />
        <CommandPalette />
        
        {showOnboarding && (
          <OnboardingModal 
            onComplete={(updatedUser) => {
              setUser(updatedUser);
              setShowOnboarding(false);
            }} 
            onSkip={() => setShowOnboarding(false)}
          />
        )}
      </div>
    </Router>
  );
};

export default App;