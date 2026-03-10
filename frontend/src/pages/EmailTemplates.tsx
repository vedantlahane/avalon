import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Sparkles, 
  Search, 
  Filter, 
  MoreVertical, 
  Copy, 
  Edit2, 
  Trash2, 
  Send,
  Mail,
  BarChart2,
  Code
} from 'lucide-react';
import { emailTemplateService } from '../services/emailTemplate.service';
import { EmailTemplate, EmailTemplateCategory } from '../types';
import TemplateModal from '../components/emailTemplates/TemplateModal';
import AIGenerateModal from '../components/emailTemplates/AIGenerateModal';
import { toast } from 'react-hot-toast';

const EmailTemplates: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Modal states
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [aiInitialData, setAiInitialData] = useState<{ subject: string; body: string } | null>(null);

  const categories: string[] = ['All', 'Follow-up', 'Introduction', 'Proposal', 'Thank You', 'Re-engagement', 'AI Generated'];

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const data = await emailTemplateService.getEmailTemplates();
      setTemplates(data);
    } catch (error) {
      console.error('Error loading templates:', error);
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedTemplate(null);
    setAiInitialData(null);
    setIsTemplateModalOpen(true);
  };

  const handleEdit = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setAiInitialData(null);
    setIsTemplateModalOpen(true);
  };

  const handleAIGenerate = () => {
    setIsAIModalOpen(true);
  };

  const handleAISelect = (data: { subject: string; body: string }) => {
    setAiInitialData(data);
    setSelectedTemplate(null);
    setIsAIModalOpen(false);
    setIsTemplateModalOpen(true);
  };

  const handleSave = async (templateData: Partial<EmailTemplate>) => {
    try {
      if (selectedTemplate) {
        await emailTemplateService.updateEmailTemplate(selectedTemplate.id, templateData);
        toast.success('Template updated successfully');
      } else {
        await emailTemplateService.createEmailTemplate(templateData);
        toast.success('Template created successfully');
      }
      setIsTemplateModalOpen(false);
      loadTemplates();
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Failed to save template');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this template?')) return;
    try {
      await emailTemplateService.deleteEmailTemplate(id);
      toast.success('Template deleted successfully');
      loadTemplates();
    } catch (error) {
      console.error('Error deleting template:', error);
      toast.error('Failed to delete template');
    }
  };

  const handleDuplicate = async (template: EmailTemplate) => {
    try {
      const { id, createdAt, updatedAt, ...rest } = template;
      await emailTemplateService.createEmailTemplate({
        ...rest,
        name: `${rest.name} (Copy)`
      });
      toast.success('Template duplicated');
      loadTemplates();
    } catch (error) {
      console.error('Error duplicating template:', error);
      toast.error('Failed to duplicate template');
    }
  };

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         template.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'AI Generated') return matchesSearch && template.aiGenerated;
    return matchesSearch && template.category === selectedCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
          <p className="text-gray-500 text-sm">Manage and personalize your communication with smart templates.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleAIGenerate}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI Generate Template</span>
          </button>
          <button 
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Template</span>
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 bg-gray-100 rounded-xl border border-gray-200"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden">
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <Mail className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {template.name}
                      </h3>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                        {template.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {template.aiGenerated && (
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold">
                        <Sparkles className="w-3 h-3" />
                        <span>AI</span>
                      </div>
                    )}
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-50">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 mb-4 min-h-[100px]">
                  <p className="text-sm text-gray-600 line-clamp-4 italic leading-relaxed">
                    "{template.body.replace(/{{/g, '{').replace(/}}/g, '}')}"
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <span className="text-xs font-bold text-gray-900">{template.variablesCount}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-medium">Variables</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <span className="text-xs font-bold text-gray-900">{template.usedCount}</span>
                    <span className="text-[10px] text-gray-400 uppercase font-medium">Used</span>
                  </div>
                  <div className="flex flex-col items-center p-2 rounded-lg bg-gray-50 border border-gray-100">
                    <span className="text-xs font-bold text-green-600">{template.avgOpenRate}%</span>
                    <span className="text-[10px] text-gray-400 uppercase font-medium">Open Rate</span>
                  </div>
                </div>
              </div>

              <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => handleEdit(template)}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDuplicate(template)}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" 
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(template.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" 
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all shadow-sm">
                  <Send className="w-3.5 h-3.5" />
                  <span>Use</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredTemplates.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="p-4 bg-gray-50 rounded-full w-fit mx-auto mb-4">
            <Mail className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No templates found</h3>
          <p className="text-gray-500 max-w-sm mx-auto mt-2">
            Try adjusting your search or filters, or create a new template to get started.
          </p>
          <button 
            onClick={handleCreate}
            className="mt-6 flex items-center gap-2 px-6 py-2 bg-indigo-600 rounded-lg text-sm font-medium text-white hover:bg-indigo-700 transition-colors shadow-sm mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Template</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <TemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        template={selectedTemplate}
        onSave={handleSave}
        initialData={aiInitialData}
      />

      <AIGenerateModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onSelect={handleAISelect}
      />
    </div>
  );
};

export default EmailTemplates;
