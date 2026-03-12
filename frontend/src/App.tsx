import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AIPanel } from './components/layout/AIPanel';
import { Breadcrumbs } from './components/layout/Breadcrumbs';
import { ToastProvider } from './components/layout/ToastProvider';
import { EmailComposerModal } from './components/layout/EmailComposerModal';
import { CommandPalette } from './components/layout/CommandPalette';
import { ShortcutGuide } from './components/layout/ShortcutGuide';
import { LogActivityModal } from './components/activities/LogActivityModal';
import { useActivityStore } from './lib/activity-store';
import { useModalStore } from './lib/modal-store';
import { ContactModal } from './components/contacts/ContactModal';
import { DealModal } from './components/deals/DealModal';
import { TaskModal } from './components/tasks/TaskModal';
import { composerStore } from './lib/composer-store';
import OnboardingModal from './components/onboarding/OnboardingModal';
import { authService } from './services/auth.service';
import { User } from './types';
import { useNotificationSimulator } from './hooks/useNotificationSimulator';
import { commandPaletteStore } from './lib/command-palette-store';
import { cn } from './lib/utils';
import { MobileFAB } from './components/layout/MobileFAB';
import { BottomNav } from './components/layout/BottomNav';
import { NotFound } from './pages/NotFound';

// Lazy load pages
const Auth = lazy(() => import('./pages/Auth'));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Deals = lazy(() => import('./pages/Deals').then(m => ({ default: m.Deals })));
const DealDetail = lazy(() => import('./pages/DealDetail').then(m => ({ default: m.DealDetail })));
const Contacts = lazy(() => import('./pages/Contacts').then(m => ({ default: m.Contacts })));
const ContactDetail = lazy(() => import('./pages/ContactDetail').then(m => ({ default: m.ContactDetail })));
const Companies = lazy(() => import('./pages/Companies').then(m => ({ default: m.Companies })));
const CompanyDetail = lazy(() => import('./pages/CompanyDetail').then(m => ({ default: m.CompanyDetail })));
const Inbox = lazy(() => import('./pages/Inbox').then(m => ({ default: m.Inbox })));
const Tasks = lazy(() => import('./pages/Tasks').then(m => ({ default: m.Tasks })));
const Reports = lazy(() => import('./pages/Reports').then(m => ({ default: m.Reports })));
const AIInsights = lazy(() => import('./pages/AIInsights'));
const EmailTemplates = lazy(() => import('./pages/EmailTemplates').then(m => ({ default: m.EmailTemplates })));
const SentimentAnalysis = lazy(() => import('./pages/SentimentAnalysis').then(m => ({ default: m.SentimentAnalysis })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const Automations = lazy(() => import('./pages/Automations'));

const PageLoader = () => (
  <div className="flex flex-col items-center justify-center h-full space-y-4 animate-pulse">
    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold text-xl">
      N
    </div>
    <div className="h-2 w-32 bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-primary animate-[shimmer_2s_infinite]"></div>
    </div>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode; user: User | null }> = ({ children, user }) => {
  if (!user && !localStorage.getItem('auth_token')) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

const HelpRedirect = () => {
  const { openHelp } = useHelpStore();
  const navigate = useNavigate();
  useEffect(() => {
    openHelp();
    navigate('/', { replace: true });
  }, [openHelp, navigate]);
  return null;
};

const AnimatedRoutes: React.FC<{ user: User | null }> = ({ user }) => {
  const location = useLocation();
  
  // Update page title
  useEffect(() => {
    const path = location.pathname;
    let title = "NexusCRM AI";
    
    if (path === '/') title = "NexusCRM AI | Dashboard";
    else if (path === '/auth') title = "NexusCRM AI | Sign In";
    else if (path.startsWith('/deals')) title = "NexusCRM AI | Deals";
    else if (path.startsWith('/contacts')) title = "NexusCRM AI | Contacts";
    else if (path.startsWith('/companies')) title = "NexusCRM AI | Companies";
    else if (path.startsWith('/inbox')) title = "NexusCRM AI | Inbox";
    else if (path.startsWith('/templates')) title = "NexusCRM AI | Email Templates";
    else if (path.startsWith('/sentiment')) title = "NexusCRM AI | Sentiment Analysis";
    else if (path.startsWith('/tasks')) title = "NexusCRM AI | Tasks";
    else if (path.startsWith('/reports')) title = "NexusCRM AI | Reports";
    else if (path.startsWith('/ai-insights')) title = "NexusCRM AI | AI Insights";
    else if (path.startsWith('/automations')) title = "NexusCRM AI | Automations";
    else if (path.startsWith('/settings')) title = "NexusCRM AI | Settings";
    
    document.title = title;
  }, [location.pathname]);
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="h-full"
      >
        <Suspense fallback={<PageLoader />}>
          <Routes location={location}>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>} />
            <Route path="/deals" element={<ProtectedRoute user={user}><Deals /></ProtectedRoute>} />
            <Route path="/deals/:id" element={<ProtectedRoute user={user}><DealDetail /></ProtectedRoute>} />
            <Route path="/contacts" element={<ProtectedRoute user={user}><Contacts /></ProtectedRoute>} />
            <Route path="/contacts/:id" element={<ProtectedRoute user={user}><ContactDetail /></ProtectedRoute>} />
            <Route path="/companies" element={<ProtectedRoute user={user}><Companies /></ProtectedRoute>} />
            <Route path="/companies/:id" element={<ProtectedRoute user={user}><CompanyDetail /></ProtectedRoute>} />
            <Route path="/inbox" element={<ProtectedRoute user={user}><Inbox /></ProtectedRoute>} />
            <Route path="/templates" element={<ProtectedRoute user={user}><EmailTemplates /></ProtectedRoute>} />
            <Route path="/sentiment" element={<ProtectedRoute user={user}><SentimentAnalysis /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute user={user}><Tasks /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute user={user}><Reports /></ProtectedRoute>} />
            <Route path="/ai-insights" element={<ProtectedRoute user={user}><AIInsights /></ProtectedRoute>} />
            <Route path="/insights" element={<Navigate to="/ai-insights" replace />} />
            <Route path="/automations" element={<ProtectedRoute user={user}><Automations /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute user={user}><Settings /></ProtectedRoute>} />
            <Route path="/help" element={<ProtectedRoute user={user}><HelpRedirect /></ProtectedRoute>} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
};

import { HelpDrawer } from './components/layout/HelpDrawer';
import { ShortcutsOverlay } from './components/layout/ShortcutsOverlay';
import { useHelpStore } from './lib/help-store';
import { ChangelogModal } from './components/layout/ChangelogModal';
import { Info } from 'lucide-react';

const AppContent: React.FC<{ user: User | null; showOnboarding: boolean; setShowOnboarding: (show: boolean) => void; setUser: (user: User | null) => void }> = ({ user, showOnboarding, setShowOnboarding, setUser }) => {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const { openShortcuts, openHelp, closeShortcuts, closeHelp, isShortcutsOpen, isHelpOpen } = useHelpStore();
  const { isOpen: isActivityOpen, close: closeActivity, contactId, dealId } = useActivityStore();
  const { contactModal, dealModal, taskModal } = useModalStore();
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Common meta check
      const isMeta = e.ctrlKey || e.metaKey;

      if (isMeta && e.key === 'k') {
        e.preventDefault();
        commandPaletteStore.toggle();
      }
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        isShortcutsOpen ? closeShortcuts() : openShortcuts();
      }
      if (e.key === 'F1') {
        e.preventDefault();
        isHelpOpen ? closeHelp() : openHelp();
      }
      if (e.key === 'Escape') {
        closeShortcuts();
        closeHelp();
        setIsAIPanelOpen(false);
      }
      if (isMeta && e.key === '/') {
        e.preventDefault();
        setIsAIPanelOpen(true);
      }
      
      // Additional shortcuts
      if (isMeta && e.key === 'n') {
        e.preventDefault();
        contactModal.open();
      }
      if (isMeta && e.key === 'd') {
        e.preventDefault();
        dealModal.open();
      }
      if (isMeta && e.key === 't') {
        e.preventDefault();
        taskModal.open();
      }
      if (isMeta && e.key === 'e') {
        e.preventDefault();
        composerStore.open();
      }
    };
    const handleToggleAI = () => setIsAIPanelOpen(prev => !prev);
    const handleOpenPalette = () => commandPaletteStore.open();
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('toggle-ai-panel', handleToggleAI);
    window.addEventListener('open-command-palette', handleOpenPalette);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('toggle-ai-panel', handleToggleAI);
      window.removeEventListener('open-command-palette', handleOpenPalette);
    };
  }, [contactModal, dealModal, taskModal, isShortcutsOpen, isHelpOpen, openShortcuts, closeShortcuts, openHelp, closeHelp]);

  if (isAuthPage) {
    return (
      <div className="h-screen bg-background">
        <ToastProvider />
        <AnimatedRoutes user={user} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary overflow-hidden">
      <ToastProvider />
      {/* Accent Line */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-secondary z-[60]"></div>
      
      {/* Demo Mode Banner */}
      <div className="fixed top-[3px] left-0 right-0 bg-amber-500/10 border-b border-amber-500/20 text-amber-600 dark:text-amber-400 py-1.5 px-4 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest z-[55] backdrop-blur-md">
        <Info size={12} />
        <span>This is a demo of NexusCRM AI - All data is pre-loaded for demonstration purposes</span>
      </div>

      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 relative h-full pt-[31px]">
        <Header />
        <Breadcrumbs />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar relative bg-background">
          <div className="h-full">
            <AnimatedRoutes user={user} />
          </div>
          
          {/* Subtle Watermark */}
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 pointer-events-none opacity-10 select-none hidden md:block z-0">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <span className="text-xl font-black uppercase tracking-[0.3em]">NexusCRM</span>
              <span className="text-xs font-medium bg-foreground text-background px-1.5 py-0.5 rounded">AI POWERED</span>
            </div>
          </div>
        </main>
        
        {/* AI Toggle Button (Floating) */}
        <button 
          onClick={() => setIsAIPanelOpen(!isAIPanelOpen)}
          className={cn(
              "hidden md:flex fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl items-center justify-center hover:bg-primary/90 transition-all hover:scale-110 active:scale-95 z-40 group overflow-hidden shadow-primary/30",
              isAIPanelOpen && "right-[416px]"
          )}
        >
          <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
          <span className="text-2xl relative z-10">🤖</span>
        </button>
        
        <MobileFAB />
        <BottomNav />
      </div>

      <AIPanel isOpen={isAIPanelOpen} onClose={() => setIsAIPanelOpen(false)} />
      <EmailComposerModal />
      <LogActivityModal 
        isOpen={isActivityOpen} 
        onClose={closeActivity}
        contactId={contactId}
        dealId={dealId}
      />
      <CommandPalette />
      <ShortcutsOverlay />
      <HelpDrawer />
      <ChangelogModal />
      
      {/* Global Modals */}
      <ContactModal 
        isOpen={contactModal.isOpen} 
        onClose={contactModal.close} 
        contactId={contactModal.contactId}
        onSuccess={() => {}}
      />
      <DealModal 
        isOpen={dealModal.isOpen} 
        onClose={dealModal.close} 
        dealId={dealModal.dealId}
        initialStage={dealModal.initialStage as any}
        onSuccess={() => {}}
      />
      <TaskModal 
        isOpen={taskModal.isOpen} 
        onClose={taskModal.close} 
        taskId={taskModal.taskId}
        initialData={taskModal.initialData}
        onSuccess={() => {}}
      />
      
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
  );
}

const App: React.FC = () => {
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
        setTimeout(() => setLoading(false), 1500); // Artificial delay for visual effect
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-background">
        <div className="relative">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 bg-primary rounded-2xl shadow-2xl flex items-center justify-center text-white font-bold text-4xl shadow-primary/20"
          >
            N
          </motion.div>
          <div className="absolute inset-0 bg-primary/20 rounded-2xl animate-ping"></div>
        </div>
        <div className="mt-12 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">NexusCRM AI</h1>
          <p className="text-muted-foreground mt-2 animate-pulse font-medium">Loading your AI-powered CRM...</p>
        </div>
        <div className="mt-8 w-48 h-1.5 bg-muted rounded-full overflow-hidden relative">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <AppContent user={user} showOnboarding={showOnboarding} setShowOnboarding={setShowOnboarding} setUser={setUser} />
    </Router>
  );
};

export default App;