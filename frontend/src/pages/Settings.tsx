import React, { useState } from 'react';
import { 
  User, 
  Building2, 
  Layers, 
  Tag, 
  Mail, 
  Bot, 
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
  ExternalLink,
  Save,
  ChevronRight,
  Search,
  FileText,
  AlertCircle
} from 'lucide-react';

type Section = 
  | 'profile' 
  | 'organization' 
  | 'pipeline' 
  | 'tags' 
  | 'email' 
  | 'ai' 
  | 'integrations' 
  | 'goals' 
  | 'notifications' 
  | 'import-export';

export const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>('profile');

  const navItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'organization', label: 'Organization', icon: Building2 },
    { id: 'pipeline', label: 'Pipeline Configuration', icon: Layers },
    { id: 'tags', label: 'Tags & Custom Fields', icon: Tag },
    { id: 'email', label: 'Email Settings', icon: Mail },
    { id: 'ai', label: 'AI Configuration', icon: Bot },
    { id: 'integrations', label: 'Integrations', icon: LinkIcon },
    { id: 'goals', label: 'Goals & Targets', icon: Target },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'import-export', label: 'Import/Export', icon: Download },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'profile': return <ProfileSection />;
      case 'pipeline': return <PipelineSection />;
      case 'ai': return <AISection />;
      case 'goals': return <GoalsSection />;
      case 'notifications': return <NotificationsSection />;
      case 'import-export': return <ImportExportSection />;
      case 'integrations': return <IntegrationsSection />;
      default: return (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
          <p className="text-lg font-medium">Coming Soon</p>
          <p className="text-sm">This section is currently under development.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex h-[calc(100vh-100px)] -m-6 bg-gray-50 overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as Section)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeSection === item.id
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon size={18} />
              {item.label}
              {activeSection === item.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8 bg-white">
        <div className="max-w-4xl">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

/* --- SECTION 1: PROFILE --- */
const ProfileSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        <p className="text-gray-500">Update your personal information and preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Avatar Upload */}
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              <User size={40} className="text-gray-300" />
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg hover:bg-indigo-700 transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Avatar</h3>
            <p className="text-sm text-gray-500 mb-2">JPG, GIF or PNG. Max size of 800K</p>
            <div className="flex gap-2">
              <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Upload new</button>
              <button className="text-xs font-semibold text-red-600 hover:text-red-700">Remove</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="Alex Johnson" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="alex.j@nexus.ai" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Role</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed" value="Senior Sales Executive" readOnly />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Timezone</label>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>(GMT-08:00) Pacific Time (US & Canada)</option>
              <option>(GMT-05:00) Eastern Time (US & Canada)</option>
              <option>(GMT+00:00) Greenwich Mean Time</option>
              <option>(GMT+01:00) Central European Time</option>
            </select>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-gray-100">
          <h3 className="font-semibold text-gray-900">Preferences</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Date Format</label>
              <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Theme</label>
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                {['Light', 'Dark', 'Auto'].map((theme) => (
                  <button key={theme} className={`flex-1 py-1 text-xs font-medium rounded-md transition-all ${theme === 'Light' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    {theme}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all">
            <Save size={18} />
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};

/* --- SECTION 2: PIPELINE CONFIGURATION --- */
const PipelineSection: React.FC = () => {
  const [activePipeline, setActivePipeline] = useState('New Business');
  const [stages, setStages] = useState([
    { name: 'Lead', prob: 10, color: 'bg-blue-500', reqFields: ['Company Name', 'Contact Email'] },
    { name: 'Qualified', prob: 25, color: 'bg-indigo-500', reqFields: ['Budget', 'Timeline'] },
    { name: 'Discovery', prob: 40, color: 'bg-purple-500', reqFields: ['Pain Points', 'Decision Maker'] },
    { name: 'Proposal', prob: 65, color: 'bg-orange-500', reqFields: ['Proposal PDF'] },
    { name: 'Negotiation', prob: 85, color: 'bg-pink-500', reqFields: ['Contract Draft'] },
    { name: 'Won', prob: 100, color: 'bg-green-500', reqFields: [] },
  ]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pipeline Configuration</h2>
          <p className="text-gray-500">Customize your sales stages and probabilities.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg font-medium transition-all">
          <Plus size={18} />
          Add Pipeline
        </button>
      </div>

      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        {['New Business', 'Upsell/Expansion', 'Partnership'].map((p) => (
          <button
            key={p}
            onClick={() => setActivePipeline(p)}
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activePipeline === p ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider px-4">
          <div className="w-8"></div>
          <div className="flex-1 ml-4">Stage Name</div>
          <div className="w-32 text-center">Probability (%)</div>
          <div className="w-32 text-center">Color</div>
          <div className="w-16"></div>
        </div>

        <div className="space-y-2">
          {stages.map((stage, idx) => (
            <div key={stage.name} className="flex items-center bg-white border border-gray-100 p-4 rounded-xl shadow-sm hover:border-indigo-100 transition-all group">
              <button className="text-gray-300 cursor-grab active:cursor-grabbing">
                <GripVertical size={20} />
              </button>
              
              <div className="flex-1 ml-4">
                <input type="text" className="w-full font-semibold text-gray-900 border-none p-0 focus:ring-0" defaultValue={stage.name} />
                <p className="text-xs text-gray-400 mt-1">{stage.reqFields.length} required fields</p>
              </div>

              <div className="w-32 flex justify-center">
                <input type="number" className="w-16 px-2 py-1 border border-gray-200 rounded text-center text-sm" defaultValue={stage.prob} />
              </div>

              <div className="w-32 flex justify-center">
                <div className={`w-6 h-6 rounded-full ${stage.color} cursor-pointer shadow-sm ring-2 ring-white ring-inset`}></div>
              </div>

              <div className="w-16 flex justify-end">
                <button className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all flex items-center justify-center gap-2 font-medium">
          <Plus size={20} />
          Add Stage
        </button>
      </div>

      <div className="flex justify-end pt-4">
        <button className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all">
          Save Pipeline
        </button>
      </div>
    </div>
  );
};

/* --- SECTION 3: AI CONFIGURATION --- */
const AISection: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Bot className="text-indigo-600" />
          AI Configuration
        </h2>
        <p className="text-gray-500">Fine-tune your AI assistant's behavior and intelligence.</p>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 space-y-8">
        {/* Behavior */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">AI Assistant Behavior</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Enable AI Daily Briefing', checked: true },
              { label: 'Enable AI Deal Scoring', checked: true },
              { label: 'Enable AI Email Analysis', checked: true },
              { label: 'Enable AI Task Suggestions', checked: true },
              { label: 'Enable Auto-email drafts', checked: false },
            ].map((item) => (
              <label key={item.label} className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-xl cursor-pointer hover:border-indigo-200 transition-all">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked={item.checked} />
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Communication Style */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">AI Communication Style</h3>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Professional</option>
              <option>Friendly</option>
              <option>Concise</option>
              <option>Detailed</option>
            </select>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">AI Email Tone Default</h3>
            <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>Professional</option>
              <option>Casual</option>
              <option>Empathetic</option>
              <option>Persuasive</option>
            </select>
          </div>
        </div>

        {/* Scoring Weights */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">AI Scoring Weights</h3>
          <div className="space-y-4">
            {[
              { label: 'Email Engagement', weight: 80 },
              { label: 'Meeting Attendance', weight: 100 },
              { label: 'Response Time', weight: 60 },
              { label: 'Company Fit', weight: 70 },
              { label: 'Budget Authority', weight: 90 },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">{item.label}</span>
                  <span className="font-bold text-indigo-600">{item.weight}%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${item.weight}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Privacy */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Data Privacy</h3>
          <div className="space-y-3">
            {[
              { label: 'Allow AI to analyze email content', checked: true },
              { label: 'Allow AI to send emails automatically', checked: false },
              { label: 'Allow AI to create tasks automatically', checked: true },
            ].map((item) => (
              <label key={item.label} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked={item.checked} />
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200">
          Save AI Settings
        </button>
      </div>
    </div>
  );
};

/* --- SECTION 4: GOALS & TARGETS --- */
const GoalsSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Goals & Targets</h2>
        <p className="text-gray-500">Set and track your sales performance benchmarks.</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Revenue Targets */}
        <div className="space-y-6">
          <h3 className="font-bold text-gray-900 text-lg">Revenue Targets</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Monthly revenue target</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="150000" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Quarterly revenue target</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="450000" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Monthly deals target</label>
              <input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="12" />
            </div>
          </div>
        </div>

        {/* Activity Targets */}
        <div className="space-y-6">
          <h3 className="font-bold text-gray-900 text-lg">Activity Targets</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Emails per week</label>
              <input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Calls per week</label>
              <input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="25" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Meetings per week</label>
              <input type="number" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" defaultValue="10" />
            </div>
          </div>
        </div>
      </div>

      {/* Progress View */}
      <div className="space-y-6 pt-6 border-t border-gray-100">
        <h3 className="font-bold text-gray-900 text-lg">Current Progress</h3>
        <div className="space-y-6">
          {[
            { label: 'Monthly Revenue', current: 142000, target: 150000, unit: '$' },
            { label: 'Monthly Deals', current: 6, target: 12, unit: '' },
            { label: 'Weekly Emails', current: 42, target: 50, unit: '' },
          ].map((item) => (
            <div key={item.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-700">{item.label}</span>
                <span className="font-bold">
                  {item.unit}{item.current.toLocaleString()} / {item.unit}{item.target.toLocaleString()}
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    (item.current / item.target) >= 0.9 ? 'bg-green-500' : 
                    (item.current / item.target) >= 0.6 ? 'bg-amber-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${Math.min(100, (item.current / item.target) * 100)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* --- SECTION 5: NOTIFICATIONS --- */
const NotificationsSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
        <p className="text-gray-500">Manage how and when you want to be notified.</p>
      </div>

      <div className="space-y-8">
        {/* Email Notifications */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Mail size={20} className="text-gray-400" />
            Email Notifications
          </h3>
          <div className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-200">
            {[
              { label: 'Deal stage changes', checked: true },
              { label: 'New lead assigned', checked: true },
              { label: 'Task overdue', checked: true },
              { label: 'AI risk alerts', checked: true },
              { label: 'Daily digest email', checked: false },
            ].map((item) => (
              <label key={item.label} className="flex items-center justify-between p-2">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <input type="checkbox" className="w-10 h-5 rounded-full bg-gray-200 appearance-none checked:bg-indigo-600 transition-all cursor-pointer relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all checked:after:translate-x-5" defaultChecked={item.checked} />
              </label>
            ))}
          </div>
        </div>

        {/* In-app Notifications */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Bell size={20} className="text-gray-400" />
            In-app Notifications
          </h3>
          <div className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-200">
            {[
              { label: 'All activity updates', checked: true },
              { label: 'AI suggestions', checked: true },
              { label: 'Mention/assignment', checked: true },
            ].map((item) => (
              <label key={item.label} className="flex items-center justify-between p-2">
                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                <input type="checkbox" className="w-10 h-5 rounded-full bg-gray-200 appearance-none checked:bg-indigo-600 transition-all cursor-pointer relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all checked:after:translate-x-5" defaultChecked={item.checked} />
              </label>
            ))}
          </div>
        </div>

        {/* AI-specific Notifications */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Bot size={20} className="text-indigo-500" />
            AI-specific Notifications
          </h3>
          <div className="space-y-3 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
            {[
              { label: 'Notify when AI detects deal at risk', checked: true },
              { label: 'Notify when lead score changes significantly', checked: true },
              { label: 'Notify when negative sentiment detected', checked: true },
            ].map((item) => (
              <label key={item.label} className="flex items-center justify-between p-2">
                <span className="text-sm font-medium text-gray-900">{item.label}</span>
                <input type="checkbox" className="w-10 h-5 rounded-full bg-indigo-200 appearance-none checked:bg-indigo-600 transition-all cursor-pointer relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all checked:after:translate-x-5" defaultChecked={item.checked} />
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- SECTION 6: IMPORT/EXPORT --- */
const ImportExportSection: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Import/Export</h2>
        <p className="text-gray-500">Manage your data migration and backups.</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Import */}
        <div className="space-y-6">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <Upload size={20} className="text-gray-400" />
            Import Contacts
          </h3>
          <div className="p-8 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-center space-y-4 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-indigo-600 shadow-sm transition-all">
              <FileText size={24} />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Upload CSV file</p>
              <p className="text-sm text-gray-500">Drag and drop or click to browse</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all text-sm">
              Map Columns
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-100 transition-all text-sm">
              <Bot size={16} />
              AI Auto-Map
            </button>
          </div>
          
          {/* Progress Simulation (hidden by default) */}
          <div className="space-y-2 pt-4 hidden">
            <div className="flex justify-between text-xs font-bold text-gray-500">
              <span>Importing 425 contacts...</span>
              <span>65%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 w-[65%]"></div>
            </div>
          </div>
        </div>

        {/* Export */}
        <div className="space-y-6">
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            <Download size={20} className="text-gray-400" />
            Export Data
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Export Contacts', format: 'CSV' },
              { label: 'Export Deals', format: 'CSV' },
              { label: 'Export Activities', format: 'CSV' },
              { label: 'Export Full Report', format: 'PDF', primary: true },
            ].map((item) => (
              <button 
                key={item.label}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  item.primary ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700' : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                }`}
              >
                <span className="font-semibold">{item.label}</span>
                <span className={`text-xs font-bold px-2 py-1 rounded-md ${item.primary ? 'bg-indigo-500' : 'bg-gray-100 text-gray-500'}`}>
                  {item.format}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- SECTION 7: INTEGRATIONS --- */
const IntegrationsSection: React.FC = () => {
  const integrations = [
    { name: 'Gmail', icon: Mail, connected: true, color: 'text-red-500' },
    { name: 'Google Cal', icon: Target, connected: false, color: 'text-blue-500' },
    { name: 'LinkedIn', icon: User, connected: false, color: 'text-blue-700' },
    { name: 'Slack', icon: Bot, connected: false, color: 'text-purple-500' },
    { name: 'Twilio', icon: Target, connected: false, color: 'text-red-600' },
    { name: 'Zapier', icon: Layers, connected: false, color: 'text-orange-500' },
  ];

  const handleConnect = () => {
    alert("Coming Soon!");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
        <p className="text-gray-500">Connect your favorite tools to supercharge your workflow.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {integrations.map((item) => (
          <div key={item.name} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:border-indigo-100 hover:shadow-md transition-all space-y-4">
            <div className="flex justify-between items-start">
              <div className={`w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center ${item.color}`}>
                <item.icon size={24} />
              </div>
              {item.connected && (
                <div className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">
                  <Check size={12} />
                  Connected
                </div>
              )}
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">Connect your {item.name} account to sync data.</p>
            </div>

            <button
              onClick={item.connected ? undefined : handleConnect}
              className={`w-full py-2 rounded-xl text-sm font-bold transition-all ${
                item.connected 
                ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
              }`}
            >
              {item.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};