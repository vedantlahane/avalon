import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Plus, 
  Play, 
  Pause, 
  Trash2, 
  Edit2, 
  History, 
  ChevronRight, 
  User, 
  DollarSign, 
  Clock, 
  Mail, 
  Target, 
  CheckSquare, 
  Bot, 
  BarChart2,
  AlertTriangle,
  ArrowRight,
  Filter,
  CheckCircle2,
  X,
  PlusCircle,
  Settings
} from 'lucide-react';
import { automationService } from '../services/automation.service';
import { Automation, AutomationTriggerType, AutomationStatus } from '../types';
import { cn } from '../lib/utils';
import { toast } from 'react-hot-toast';

const Automations: React.FC = () => {
  const [automations, setAutomations] = useState<Automation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [newAutomation, setNewAutomation] = useState<Partial<Automation>>({
    name: '',
    description: '',
    status: 'Draft',
    trigger: { type: 'Contact Created', config: {} },
    conditions: [],
    actions: [],
  });

  useEffect(() => {
    fetchAutomations();
  }, []);

  const fetchAutomations = async () => {
    try {
      setIsLoading(true);
      const data = await automationService.getAutomations();
      setAutomations(data);
    } catch (error) {
      console.error('Failed to fetch automations:', error);
      toast.error('Failed to load automations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      const updated = await automationService.toggleAutomation(id);
      setAutomations(automations.map(a => a.id === id ? updated : a));
      toast.success(`Automation ${updated.status === 'Active' ? 'activated' : 'paused'}`);
    } catch (error) {
      toast.error('Failed to update automation status');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this automation?')) {
      try {
        await automationService.deleteAutomation(id);
        setAutomations(automations.filter(a => a.id !== id));
        toast.success('Automation deleted');
      } catch (error) {
        toast.error('Failed to delete automation');
      }
    }
  };

  const renderTriggerIcon = (type: AutomationTriggerType) => {
    switch (type) {
      case 'Contact Created': return <User className="w-5 h-5 text-blue-500" />;
      case 'Deal Stage Changed': return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'Time-based': return <Clock className="w-5 h-5 text-purple-500" />;
      case 'Email Received': return <Mail className="w-5 h-5 text-indigo-500" />;
      case 'Lead Score Changed': return <Target className="w-5 h-5 text-orange-500" />;
      case 'Task Overdue': return <CheckSquare className="w-5 h-5 text-red-500" />;
      case 'AI Detects Risk': return <Bot className="w-5 h-5 text-violet-500" />;
      case 'Metric Threshold': return <BarChart2 className="w-5 h-5 text-slate-500" />;
      default: return <Zap className="w-5 h-5 text-indigo-500" />;
    }
  };

  const renderActionIcon = (type: string) => {
    if (type.includes('AI')) return <Bot className="w-4 h-4 text-violet-500" />;
    if (type.includes('Email')) return <Mail className="w-4 h-4 text-blue-500" />;
    if (type.includes('Task')) return <CheckSquare className="w-4 h-4 text-emerald-500" />;
    if (type.includes('Notification')) return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    return <ArrowRight className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Zap className="w-8 h-8 text-indigo-500" />
            Automations
          </h1>
          <p className="text-slate-500 mt-1">Set up AI-powered automations to save time</p>
        </div>
        <button 
          onClick={() => {
            setIsWizardOpen(true);
            setWizardStep(1);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Create Automation
        </button>
      </div>

      {/* Automations List */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl p-6 h-64 animate-pulse border border-slate-200 dark:border-slate-700" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {automations.map((automation) => (
            <div 
              key={automation.id} 
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all hover:scale-[1.01] overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                      <Zap className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg dark:text-slate-100">{automation.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          automation.status === 'Active' ? "bg-emerald-500" : "bg-slate-400"
                        )} />
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          Status: {automation.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-500">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleToggleStatus(automation.id)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-500"
                    >
                      {automation.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button 
                      onClick={() => handleDelete(automation.id)}
                      className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-1 bg-slate-100 dark:bg-slate-700 rounded">
                      {renderTriggerIcon(automation.trigger.type)}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500">WHEN</p>
                      <p className="text-sm font-medium dark:text-slate-300">{automation.trigger.type}</p>
                    </div>
                  </div>

                  {automation.conditions.length > 0 && (
                    <div className="flex items-start gap-3 pl-8 relative">
                      <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
                      <div>
                        <p className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500">AND</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {automation.conditions.map((condition, idx) => (
                            <span key={idx} className="px-2 py-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded text-xs text-slate-600 dark:text-slate-400">
                              {condition.field} {condition.operator} "{condition.value}"
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3 pl-8 relative">
                    <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase text-slate-400 dark:text-slate-500">THEN</p>
                      <div className="space-y-2 mt-1">
                        {automation.actions.map((action, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <div className="w-5 flex justify-center">
                              {renderActionIcon(action.type)}
                            </div>
                            <span>→ {action.type}</span>
                            {action.config?.title && <span className="text-xs text-slate-400">({action.config.title})</span>}
                            {action.config?.templateId && <span className="text-xs text-slate-400">({action.config.templateId})</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1">
                    <History className="w-3 h-3" />
                    <span>Triggered: {automation.triggeredCount} times</span>
                  </div>
                  {automation.lastRun && (
                    <span>Last run: {new Date(automation.lastRun).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ago</span>
                  )}
                </div>
                <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                  View Log <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Automation Wizard Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Wizard Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Zap className="w-5 h-5 text-indigo-500" />
                  Create Automation
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  {[1, 2, 3, 4].map(step => (
                    <div 
                      key={step} 
                      className={cn(
                        "h-1.5 rounded-full transition-all",
                        step === wizardStep ? "w-8 bg-indigo-500" : (step < wizardStep ? "w-4 bg-indigo-200 dark:bg-indigo-900/50" : "w-4 bg-slate-200 dark:bg-slate-700")
                      )}
                    />
                  ))}
                  <span className="text-xs text-slate-400 font-medium ml-2">Step {wizardStep} of 4</span>
                </div>
              </div>
              <button 
                onClick={() => setIsWizardOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Wizard Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {wizardStep === 1 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h3 className="text-lg font-bold mb-2">Step 1: Choose Trigger</h3>
                  <p className="text-slate-500 mb-6">When does this automation run?</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { type: 'Contact Created', icon: <User className="w-6 h-6 text-blue-500" /> },
                      { type: 'Deal Stage Changed', icon: <DollarSign className="w-6 h-6 text-green-500" /> },
                      { type: 'Time-based', icon: <Clock className="w-6 h-6 text-purple-500" /> },
                      { type: 'Email Received', icon: <Mail className="w-6 h-6 text-indigo-500" /> },
                      { type: 'Lead Score Changed', icon: <Target className="w-6 h-6 text-orange-500" /> },
                      { type: 'Task Overdue', icon: <CheckSquare className="w-6 h-6 text-red-500" /> },
                      { type: 'AI Detects Risk', icon: <Bot className="w-6 h-6 text-violet-500" /> },
                      { type: 'Metric Threshold', icon: <BarChart2 className="w-6 h-6 text-slate-500" /> },
                    ].map((trigger) => (
                      <button
                        key={trigger.type}
                        onClick={() => setNewAutomation({ ...newAutomation, trigger: { type: trigger.type as AutomationTriggerType, config: {} } })}
                        className={cn(
                          "p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-3",
                          newAutomation.trigger?.type === trigger.type 
                            ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20" 
                            : "border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800"
                        )}
                      >
                        <div className="p-3 bg-white dark:bg-slate-900 rounded-lg shadow-sm">
                          {trigger.icon}
                        </div>
                        <span className="text-sm font-semibold">{trigger.type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wizardStep === 2 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h3 className="text-lg font-bold mb-2">Step 2: Add Conditions (Optional)</h3>
                  <p className="text-slate-500 mb-6">Add conditions to filter when this runs</p>

                  <div className="space-y-4">
                    {newAutomation.conditions?.map((condition, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl">
                        <select className="bg-transparent font-medium focus:outline-none dark:text-slate-300">
                          <option>{condition.field}</option>
                        </select>
                        <select className="bg-transparent font-medium focus:outline-none text-indigo-600 dark:text-indigo-400">
                          <option>{condition.operator}</option>
                        </select>
                        <input 
                          type="text" 
                          value={condition.value}
                          className="bg-transparent border-b border-slate-300 dark:border-slate-600 focus:border-indigo-500 focus:outline-none flex-1 px-2"
                        />
                        <button 
                          onClick={() => {
                            const updated = [...(newAutomation.conditions || [])];
                            updated.splice(idx, 1);
                            setNewAutomation({ ...newAutomation, conditions: updated });
                          }}
                          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    <button 
                      onClick={() => setNewAutomation({ 
                        ...newAutomation, 
                        conditions: [...(newAutomation.conditions || []), { field: 'Field', operator: 'equals', value: 'Value' }] 
                      })}
                      className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-2 text-slate-500 hover:border-indigo-300 hover:text-indigo-500 transition-all"
                    >
                      <PlusCircle className="w-5 h-5" />
                      Add Condition
                    </button>
                    <p className="text-xs text-slate-400 text-center mt-2">AND logic applied between conditions</p>
                  </div>
                </div>
              )}

              {wizardStep === 3 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h3 className="text-lg font-bold mb-2">Step 3: Define Actions</h3>
                  <p className="text-slate-500 mb-6">What should happen? (Build action flow)</p>

                  <div className="flex flex-col items-center gap-6 max-w-lg mx-auto mb-8">
                    {/* Visual Flow Builder Representation */}
                    <div className="w-full flex flex-col items-center">
                      <div className="bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        TRIGGER: {newAutomation.trigger?.type}
                      </div>
                      
                      <div className="w-0.5 h-6 bg-slate-200 dark:bg-slate-700" />
                      
                      {newAutomation.conditions?.length ? (
                        <>
                          <div className="bg-amber-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            CONDITION: {newAutomation.conditions.length} Filter(s)
                          </div>
                          <div className="w-0.5 h-6 bg-slate-200 dark:bg-slate-700" />
                        </>
                      ) : null}

                      {newAutomation.actions?.map((action, idx) => (
                        <React.Fragment key={idx}>
                          <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg flex items-center gap-2 group relative">
                            {renderActionIcon(action.type)}
                            {action.type}
                            <button 
                              onClick={() => {
                                const updated = [...(newAutomation.actions || [])];
                                updated.splice(idx, 1);
                                setNewAutomation({ ...newAutomation, actions: updated });
                              }}
                              className="absolute -right-10 opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-100 text-red-600 rounded-lg"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="w-0.5 h-6 bg-slate-200 dark:bg-slate-700" />
                        </React.Fragment>
                      ))}

                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-indigo-300 flex items-center justify-center text-indigo-400">
                        <Plus className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { type: 'Send Email', icon: <Mail className="w-4 h-4" /> },
                      { type: 'Create Task', icon: <CheckSquare className="w-4 h-4" /> },
                      { type: 'Send Notification', icon: <AlertTriangle className="w-4 h-4" /> },
                      { type: 'Update Field', icon: <Settings className="w-4 h-4" /> },
                      { type: 'Assign to User', icon: <User className="w-4 h-4" /> },
                      { type: 'AI: Enrich Contact', icon: <Bot className="w-4 h-4" /> },
                      { type: 'AI: Draft Email', icon: <Bot className="w-4 h-4" /> },
                      { type: 'AI: Generate Insights', icon: <Bot className="w-4 h-4" /> },
                      { type: 'Wait (delay)', icon: <Clock className="w-4 h-4" /> },
                    ].map((action) => (
                      <button
                        key={action.type}
                        onClick={() => setNewAutomation({ 
                          ...newAutomation, 
                          actions: [...(newAutomation.actions || []), { id: Math.random().toString(), type: action.type, config: {} }] 
                        })}
                        className="p-3 border border-slate-100 dark:border-slate-700 rounded-xl hover:border-indigo-300 dark:hover:border-indigo-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center gap-3 text-left"
                      >
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                          {action.icon}
                        </div>
                        <span className="text-sm font-medium">{action.type}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {wizardStep === 4 && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h3 className="text-lg font-bold mb-2">Step 4: Review & Activate</h3>
                  <p className="text-slate-500 mb-6">Review your automation settings</p>

                  <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 mb-6">
                    <div className="mb-6">
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-2">Automation Name</label>
                      <input 
                        type="text"
                        value={newAutomation.name}
                        onChange={(e) => setNewAutomation({ ...newAutomation, name: e.target.value })}
                        placeholder="e.g. New Lead Auto-Assignment"
                        className="w-full text-xl font-bold bg-transparent border-b-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:outline-none py-1"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-medium">Trigger: {newAutomation.trigger?.type}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-medium">{newAutomation.conditions?.length || 0} Filter condition(s)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm font-medium">{newAutomation.actions?.length || 0} Action(s) to execute</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex-1 py-3 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-2">
                      <Play className="w-4 h-4" />
                      Test Automation
                    </button>
                    <button className="flex-1 py-3 border border-slate-200 dark:border-slate-700 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                      Save as Draft
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Wizard Footer */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700 flex justify-between">
              <button 
                disabled={wizardStep === 1}
                onClick={() => setWizardStep(wizardStep - 1)}
                className="px-6 py-2 rounded-lg font-bold text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 disabled:opacity-0 transition-all"
              >
                Back
              </button>
              
              {wizardStep < 4 ? (
                <button 
                  onClick={() => setWizardStep(wizardStep + 1)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
                >
                  Next
                </button>
              ) : (
                <button 
                  onClick={async () => {
                    try {
                      const created = await automationService.createAutomation(newAutomation);
                      setAutomations([created, ...automations]);
                      setIsWizardOpen(false);
                      toast.success('Automation created and activated!');
                    } catch (error) {
                      toast.error('Failed to create automation');
                    }
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-lg font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 flex items-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Activate Automation
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Automations;
