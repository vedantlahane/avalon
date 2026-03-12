import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Contacts = lazy(() => import('./pages/Contacts'));
const ContactDetail = lazy(() => import('./pages/ContactDetail'));
const Companies = lazy(() => import('./pages/Companies'));
const CompanyDetail = lazy(() => import('./pages/CompanyDetail'));
const Deals = lazy(() => import('./pages/Deals'));
const DealDetail = lazy(() => import('./pages/DealDetail'));
const Inbox = lazy(() => import('./pages/Inbox'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Reports = lazy(() => import('./pages/Reports'));
const AIInsights = lazy(() => import('./pages/AIInsights'));
const Automations = lazy(() => import('./pages/Automations'));
const Settings = lazy(() => import('./pages/Settings'));
const Auth = lazy(() => import('./pages/Auth'));
const NotFound = lazy(() => import('./pages/NotFound'));

const PagePlaceholder: React.FC<{ name: string }> = ({ name }) => (
  <div className="h-full w-full flex flex-col items-center justify-center">
    <h2 className="text-[24px] font-semibold text-[var(--text-primary)]">{name}</h2>
    <p className="text-[14px] text-[var(--text-muted)] mt-2">Coming soon</p>
  </div>
);

const AppLayout: React.FC = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-[var(--bg-primary)] overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-[24px_32px] relative z-0">
          <Suspense fallback={<div className="h-full w-full flex items-center justify-center text-[var(--text-muted)]">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/contacts/:id" element={<ContactDetail />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/:id" element={<CompanyDetail />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/deals/:id" element={<DealDetail />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/insights" element={<AIInsights />} />
              <Route path="/automations" element={<Automations />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Suspense fallback={null}><Auth /></Suspense>} />
        <Route path="/auth" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
