import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  BadgeDollarSign, 
  Tags, 
  Mail, 
  Brain, 
  Link as LinkIcon, 
  Target, 
  Bell, 
  Download,
  Upload,
  Plus,
  Trash2,
  GripVertical,
  Camera,
  Check,
  Save,
  Search,
  FileText,
  Bot,
  Sun,
  Moon,
  Laptop,
  Info
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useTheme } from '../hooks/useTheme';
import { toastStore } from '../lib/toast-store';

import { ImportWizard } from '../components/common/ImportWizard';
import { ExportModal } from '../components/common/ExportModal';

type SettingsTab = 'Profile' | 'Organization' | 'Pipeline' | 'Tags' | 'Email' | 'AI Configuration' | 'Integrations' | 'Goals' | 'Notifications' | 'Import/Export';

const TABS: { id: SettingsTab; icon: any }[] = [
  { id: 'Profile', icon: User },
  { id: 'Organization', icon: Building2 },
  { id: 'Pipeline', icon: BadgeDollarSign },
  { id: 'Tags', icon: Tags },
  { id: 'Email', icon: Mail },
  { id: 'AI Configuration', icon: Brain },
  { id: 'Integrations', icon: LinkIcon },
  { id: 'Goals', icon: Target },
  { id: 'Notifications', icon: Bell },
  { id: 'Import/Export', icon: Download },
];

/* --- SECTIONS --- */
const ProfileSection = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8 page-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Profile</h2>
        <p className="text-muted-foreground">Update your personal information and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="relative group">
          <div className="h-24 w-24 rounded-3xl bg-primary flex items-center justify-center text-primary-foreground font-black text-3xl shadow-xl shadow-primary/20 ring-4 ring-card">
            AR
          </div>
          <button className="absolute -bottom-2 -right-2 p-2 bg-card border border-border rounded-xl text-muted-foreground hover:text-primary shadow-lg transition-all ripple">
            <Camera size={16} />
          </button>
        </div>

        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/70">Full Name</label>
            <input type="text" className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-foreground transition-all" defaultValue="Alex Rivera" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/70">Email Address</label>
            <input type="email" className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-foreground transition-all" defaultValue="alex@nexus.ai" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/70">Role</label>
            <input type="text" className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-foreground transition-all" defaultValue="System Administrator" disabled />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground/70">Timezone</label>
            <select className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 text-foreground transition-all appearance-none">
              <option>Pacific Time (PT)</option>
              <option>Eastern Time (ET)</option>
              <option>Universal Coordinated Time (UTC)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Appearance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'light', label: 'Light', icon: Sun, desc: 'Classic bright look' },
            { id: 'dark', label: 'Dark', icon: Moon, desc: 'Easier on the eyes' },
            { id: 'system', label: 'System', icon: Laptop, desc: 'Match your OS' },
          ].map((option) => (
            <button
              key={option.id}
              onClick={() => setTheme(option.id as any)}
              className={cn(
                "flex items-start gap-4 p-4 rounded-2xl border transition-all text-left ripple h-24",
                theme === option.id
                  ? "bg-primary/10 border-primary text-primary shadow-sm"
                  : "bg-muted/30 border-border text-muted-foreground hover:bg-muted"
              )}
            >
              <div className={cn(
                "p-2 rounded-xl",
                theme === option.id ? "bg-primary text-white" : "bg-card border border-border"
              )}>
                <option.icon size={20} />
              </div>
              <div>
                <p className="text-sm font-bold leading-none">{option.label}</p>
                <p className="text-[11px] mt-1 opacity-70 font-medium">{option.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-border">
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 btn-hover ripple">
          <Save size={18} />
          Save Preferences
        </button>
      </div>
    </div>
  );
};

const PipelineSection = () => (
  <div className="space-y-8 page-fade-in">
    <div>
      <h2 className="text-2xl font-bold text-foreground">Pipeline Configuration</h2>
      <p className="text-muted-foreground">Customize your sales stages and probabilities.</p>
    </div>
    <div className="space-y-4">
      {['Lead', 'Qualified', 'Discovery', 'Proposal', 'Negotiation', 'Closed Won'].map((stage, i) => (
        <div key={stage} className="flex items-center gap-4 bg-muted/30 p-4 rounded-2xl border border-border group hover:border-primary/50 transition-colors">
          <GripVertical size={20} className="text-muted-foreground/30" />
          <div className="flex-1">
            <p className="text-sm font-bold text-foreground">{stage}</p>
          </div>
          <div className="w-24 px-3 py-1 bg-card border border-border rounded-lg text-center text-xs font-bold text-foreground">
            {Math.min(100, (i + 1) * 20)}%
          </div>
          <button className="p-2 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
            <Trash2 size={18} />
          </button>
        </div>
      ))}
    </div>
    <button className="w-full py-4 border-2 border-dashed border-border rounded-2xl text-muted-foreground font-bold hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all">
      + Add New Stage
    </button>
  </div>
);

const AIConfigSection = () => (
  <div className="space-y-8 page-fade-in">
    <div>
      <h2 className="text-2xl font-bold text-foreground">AI Configuration</h2>
      <p className="text-muted-foreground">Fine-tune your AI assistant's behavior and intelligence.</p>
    </div>
    <div className="bg-muted/30 p-6 rounded-3xl space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'AI Daily Briefing', active: true },
          { label: 'AI Deal Scoring', active: true },
          { label: 'AI Email Analysis', active: true },
          { label: 'AI Task Suggestions', active: true },
        ].map(item => (
          <label key={item.label} className="flex items-center justify-between p-4 bg-card rounded-2xl border border-border cursor-pointer hover:border-primary/30 transition-all">
            <span className="text-sm font-bold text-foreground">{item.label}</span>
            <input type="checkbox" defaultChecked={item.active} className="w-10 h-5 rounded-full bg-muted appearance-none checked:bg-primary transition-all cursor-pointer relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all checked:after:translate-x-5" />
          </label>
        ))}
      </div>
    </div>
  </div>
);

const IntegrationsSection = () => {
  const integrations = [
    { id: 'gmail', name: 'Gmail', icon: Mail, connected: true, color: 'text-red-500' },
    { id: 'gcal', name: 'Google Cal', icon: Target, connected: false, color: 'text-blue-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: FileText, connected: false, color: 'text-sky-600' },
    { id: 'slack', name: 'Slack', icon: Bot, connected: false, color: 'text-purple-500' },
    { id: 'twilio', name: 'Twilio', icon: Target, connected: false, color: 'text-red-600' },
    { id: 'zapier', name: 'Zapier', icon: Brain, connected: false, color: 'text-orange-500' },
  ];

  const handleConnect = (name: string) => {
    toastStore.add({
      type: 'info',
      title: 'Coming Soon',
      message: `${name} integration is currently in development and will be available soon!`
    });
  };

  return (
    <div className="space-y-8 page-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Integrations</h2>
        <p className="text-muted-foreground">Connect your favorite tools to supercharge your workflow.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {integrations.map((int) => (
          <div key={int.id} className="p-6 bg-muted/30 border border-border rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div className={cn("p-3 rounded-2xl bg-card border border-border", int.color)}>
                <int.icon size={24} />
              </div>
              {int.connected ? (
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest rounded-full">Connected</span>
              ) : (
                <span className="px-3 py-1 bg-muted text-muted-foreground text-[10px] font-black uppercase tracking-widest rounded-full">Disconnected</span>
              )}
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{int.name}</p>
              <p className="text-xs text-muted-foreground">Sync your {int.name.toLowerCase()} data with NexusCRM.</p>
            </div>
            {int.connected ? (
              <button className="w-full py-2 bg-card border border-border text-foreground rounded-xl text-sm font-bold hover:bg-muted transition-all ripple">
                Disconnect
              </button>
            ) : (
              <button 
                onClick={() => handleConnect(int.name)}
                className="w-full py-2 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:bg-primary/90 transition-all ripple"
              >
                Connect
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const GoalsSection = () => <div>Goals Settings coming soon.</div>;
const NotificationsSection = () => <div>Notifications Settings coming soon.</div>;

const ImportExportSection = () => {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [exportResource, setExportResource] = useState<'contacts' | 'deals' | 'companies'>('contacts');

  return (
    <div className="space-y-8 page-fade-in">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Import & Export</h2>
        <p className="text-muted-foreground">Manage your data by importing from or exporting to external files.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Import Card */}
        <div className="p-8 bg-muted/30 border border-border rounded-3xl space-y-6 flex flex-col items-center text-center">
          <div className="p-4 bg-indigo-500/10 rounded-2xl text-indigo-500">
            <Upload size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Import Data</h3>
            <p className="text-sm text-muted-foreground">Upload a CSV or XLSX file to bulk add contacts to your CRM. Our AI will help you map columns automatically.</p>
          </div>
          <button 
            onClick={() => setIsImportOpen(true)}
            className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 btn-hover ripple"
          >
            Start Import Wizard
          </button>
        </div>

        {/* Export Card */}
        <div className="p-8 bg-muted/30 border border-border rounded-3xl space-y-6 flex flex-col items-center text-center">
          <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-500">
            <Download size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-foreground">Export Data</h3>
            <p className="text-sm text-muted-foreground">Download your contacts, deals, or companies in CSV, XLSX, PDF, or JSON format for external use or backups.</p>
          </div>
          <div className="flex gap-2 w-full">
            <select 
              className="flex-1 px-4 py-3 bg-card border border-border rounded-xl outline-none text-sm font-bold"
              value={exportResource}
              onChange={(e) => setExportResource(e.target.value as any)}
            >
              <option value="contacts">Contacts</option>
              <option value="deals">Deals</option>
              <option value="companies">Companies</option>
            </select>
            <button 
              onClick={() => setIsExportOpen(true)}
              className="px-6 py-3 bg-card border border-border text-foreground rounded-xl font-bold hover:bg-muted transition-all ripple"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-4">
        <Info className="text-amber-500 shrink-0" size={20} />
        <div className="space-y-1">
          <p className="text-sm font-bold text-amber-900 dark:text-amber-200">Recommendation for Exports</p>
          <p className="text-xs text-amber-800 dark:text-amber-300">For security and data integrity, we recommend regular exports of your CRM data. Use the AI Summary option when exporting to PDF for an executive overview.</p>
        </div>
      </div>

      <ImportWizard isOpen={isImportOpen} onClose={() => setIsImportOpen(false)} resource="contacts" />
      <ExportModal 
        isOpen={isExportOpen} 
        onClose={() => setIsExportOpen(false)} 
        resource={exportResource} 
        totalCount={100} 
      />
    </div>
  );
};

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<SettingsTab>('Profile');

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 md:p-6 pb-24 md:pb-12 page-fade-in">
      <h1 className="text-3xl font-black text-foreground tracking-tight px-1">Settings</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="lg:w-64 flex-shrink-0 overflow-x-auto lg:overflow-visible scrollbar-hide">
          <nav className="flex lg:flex-col gap-1 pb-4 lg:pb-0">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap lg:w-full ripple",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <tab.icon size={18} />
                <span>{tab.id}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          <div className="bg-card border border-border rounded-3xl p-6 md:p-8 shadow-sm min-h-[500px]">
            {activeTab === 'Profile' && <ProfileSection />}
            {activeTab === 'Pipeline' && <PipelineSection />}
            {activeTab === 'AI Configuration' && <AIConfigSection />}
            {activeTab === 'Integrations' && <IntegrationsSection />}
            {activeTab === 'Goals' && <GoalsSection />}
            {activeTab === 'Notifications' && <NotificationsSection />}
            {activeTab === 'Import/Export' && <ImportExportSection />}
          </div>
        </div>
      </div>
    </div>
  );
};
