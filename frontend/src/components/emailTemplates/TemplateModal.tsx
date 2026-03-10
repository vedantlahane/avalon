import React, { useState, useEffect } from 'react';
import { X, Save, Eye, Code, ChevronRight, Info, Sparkles } from 'lucide-react';
import { EmailTemplate, EmailTemplateCategory } from '../../types';

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template?: EmailTemplate | null;
  onSave: (templateData: Partial<EmailTemplate>) => void;
  initialData?: { subject: string; body: string } | null;
}

const variables = [
  { label: 'Contact First Name', value: '{{first_name}}' },
  { label: 'Contact Last Name', value: '{{last_name}}' },
  { label: 'Company Name', value: '{{company_name}}' },
  { label: 'Job Title', value: '{{job_title}}' },
  { label: 'Deal Name', value: '{{deal_name}}' },
  { label: 'Deal Value', value: '{{deal_value}}' },
  { label: 'Industry', value: '{{industry}}' },
  { label: 'Last Meeting Date', value: '{{last_meeting_date}}' },
  { label: 'Next Step', value: '{{next_step}}' },
];

const TemplateModal: React.FC<TemplateModalProps> = ({ isOpen, onClose, template, onSave, initialData }) => {
  const [formData, setFormData] = useState<Partial<EmailTemplate>>({
    name: '',
    subject: '',
    body: '',
    category: 'Follow-up' as EmailTemplateCategory,
    aiGenerated: false
  });
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  const [activeField, setActiveField] = useState<'subject' | 'body'>('body');

  useEffect(() => {
    if (template) {
      setFormData(template);
    } else if (initialData) {
      setFormData({
        ...formData,
        subject: initialData.subject,
        body: initialData.body,
        aiGenerated: true
      });
    } else {
      setFormData({
        name: '',
        subject: '',
        body: '',
        category: 'Follow-up' as EmailTemplateCategory,
        aiGenerated: false
      });
    }
  }, [template, initialData, isOpen]);

  if (!isOpen) return null;

  const handleInsertVariable = (variable: string) => {
    if (activeField === 'subject') {
      setFormData({ ...formData, subject: (formData.subject || '') + variable });
    } else {
      setFormData({ ...formData, body: (formData.body || '') + variable });
    }
  };

  const getPreviewBody = () => {
    let preview = formData.body || '';
    const sampleData: Record<string, string> = {
      '{{first_name}}': 'John',
      '{{last_name}}': 'Smith',
      '{{company_name}}': 'Acme Technologies',
      '{{job_title}}': 'VP of Engineering',
      '{{deal_name}}': 'Enterprise Expansion',
      '{{deal_value}}': '$120,000',
      '{{industry}}': 'Technology',
      '{{last_meeting_date}}': 'March 5th',
      '{{next_step}}': 'Thursday at 2 PM'
    };

    Object.keys(sampleData).forEach(key => {
      preview = preview.replace(new RegExp(key, 'g'), `<span class="bg-indigo-100 text-indigo-700 px-1 rounded font-medium">${sampleData[key]}</span>`);
    });

    return preview.replace(/\n/g, '<br/>');
  };

  const handleSave = () => {
    const variablesCount = (formData.body?.match(/{{.*?}}/g) || []).length + 
                          (formData.subject?.match(/{{.*?}}/g) || []).length;
    
    onSave({
      ...formData,
      variablesCount,
      usedCount: template?.usedCount || 0,
      avgOpenRate: template?.avgOpenRate || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-gray-900">
              {template ? 'Edit Template' : 'Create New Template'}
            </h2>
            <div className="flex p-1 bg-white border border-gray-200 rounded-lg">
              <button
                onClick={() => setMode('edit')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-all ${mode === 'edit' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Code className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => setMode('preview')}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-2 transition-all ${mode === 'preview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <Eye className="w-3.5 h-3.5" />
                Preview
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100"
            >
              <Save className="w-4 h-4" />
              Save Template
            </button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
            {mode === 'edit' ? (
              <div className="space-y-6 max-w-3xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Template Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                      placeholder="e.g. Post-Demo Follow Up"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                    <select
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as EmailTemplateCategory })}
                    >
                      <option>Follow-up</option>
                      <option>Introduction</option>
                      <option>Proposal</option>
                      <option>Thank You</option>
                      <option>Re-engagement</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Subject Line</label>
                  <input
                    type="text"
                    onFocus={() => setActiveField('subject')}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
                    placeholder="e.g. Next steps for {{company_name}}"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>

                <div className="flex-1 min-h-[400px] flex flex-col">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Body</label>
                  <textarea
                    onFocus={() => setActiveField('body')}
                    className="flex-1 w-full p-6 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm leading-relaxed resize-none min-h-[400px]"
                    placeholder="Write your email template here... use {{variable_name}} for personalization."
                    value={formData.body}
                    onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  />
                </div>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mt-4">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Subject:</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {(formData.subject || '').replace(/{{(.*?)}}/g, '$1').replace(/first_name/g, 'John').replace(/company_name/g, 'Acme Technologies')}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div 
                    className="text-gray-700 leading-relaxed text-sm"
                    dangerouslySetInnerHTML={{ __html: getPreviewBody() }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Variables */}
          <div className="w-72 border-l border-gray-100 bg-gray-50/50 p-6 overflow-y-auto">
            <div className="flex items-center gap-2 mb-6">
              <Info className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Variables</h3>
            </div>
            <p className="text-[11px] text-gray-500 mb-6 leading-normal">
              Click a variable to insert it into the active field ({activeField}). Use double curly braces for personalization.
            </p>
            <div className="space-y-2">
              {variables.map((v) => (
                <button
                  key={v.value}
                  onClick={() => handleInsertVariable(v.value)}
                  className="w-full flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl text-left hover:border-indigo-300 hover:shadow-sm transition-all group"
                >
                  <span className="text-xs font-medium text-gray-700">{v.label}</span>
                  <div className="flex items-center text-[10px] font-mono text-gray-400 group-hover:text-indigo-600 transition-colors">
                    {v.value}
                    <ChevronRight className="w-3 h-3 ml-1" />
                  </div>
                </button>
              ))}
            </div>

            {formData.aiGenerated && (
              <div className="mt-8 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-indigo-700">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">AI Insight</span>
                </div>
                <p className="text-[11px] text-indigo-600/80 leading-relaxed italic">
                  "This template was generated by AI. Personalizing variables like {"{{first_name}}"} and {"{{company_name}}"} can increase open rates by up to 24%."
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
