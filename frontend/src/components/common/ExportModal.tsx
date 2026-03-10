import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FileText, 
  Check, 
  Loader2,
  Bot,
  Table as TableIcon,
  Layout
} from 'lucide-react';
import { importExportService } from '@/services/importExport.service';
import { toastStore } from '@/lib/toast-store';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: 'contacts' | 'deals' | 'companies';
  totalCount: number;
  selectedIds?: number[];
  filteredCount?: number;
}

const formatOptions = [
  { id: 'csv', name: 'CSV', icon: TableIcon },
  { id: 'xlsx', name: 'Excel (XLSX)', icon: Layout },
  { id: 'pdf', name: 'PDF', icon: FileText },
  { id: 'json', name: 'JSON', icon: Layout },
];

const fieldOptions = {
  contacts: [
    { id: 'firstName', name: 'First Name' },
    { id: 'lastName', name: 'Last Name' },
    { id: 'email', name: 'Email' },
    { id: 'phone', name: 'Phone' },
    { id: 'company', name: 'Company' },
    { id: 'jobTitle', name: 'Job Title' },
    { id: 'leadScore', name: 'Lead Score' },
    { id: 'leadStatus', name: 'Lead Status' },
    { id: 'tags', name: 'Tags' },
    { id: 'address', name: 'Address' },
    { id: 'linkedinUrl', name: 'LinkedIn URL' },
    { id: 'createdAt', name: 'Created Date' },
    { id: 'lastContacted', name: 'Last Contacted' },
  ],
  deals: [
    { id: 'name', name: 'Deal Name' },
    { id: 'value', name: 'Value' },
    { id: 'stage', name: 'Stage' },
    { id: 'probability', name: 'Probability' },
    { id: 'priority', name: 'Priority' },
    { id: 'expectedCloseDate', name: 'Close Date' },
    { id: 'owner', name: 'Owner' },
  ],
  companies: [
    { id: 'name', name: 'Company Name' },
    { id: 'domain', name: 'Domain' },
    { id: 'industry', name: 'Industry' },
    { id: 'size', name: 'Size' },
    { id: 'location', name: 'Location' },
    { id: 'website', name: 'Website' },
  ]
};

export const ExportModal: React.FC<ExportModalProps> = ({ 
  isOpen, 
  onClose, 
  resource, 
  totalCount, 
  selectedIds, 
  filteredCount 
}) => {
  const [exportType, setExportType] = useState<'all' | 'filtered' | 'selected'>(
    selectedIds && selectedIds.length > 0 ? 'selected' : 'all'
  );
  const [format, setFormat] = useState<'csv' | 'xlsx' | 'pdf' | 'json'>('csv');
  const [selectedFields, setSelectedFields] = useState<string[]>(
    fieldOptions[resource].slice(0, 8).map(f => f.id)
  );
  const [includeAiSummary, setIncludeAiSummary] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleToggleField = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(f => f !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const ids = exportType === 'selected' 
        ? (selectedIds || []).join(',') 
        : exportType === 'filtered' 
          ? 'filtered' 
          : 'all';

      await importExportService.exportData({
        resource,
        ids,
        format,
        fields: selectedFields,
        includeAiSummary
      });

      toastStore.add({ type: 'success', title: 'Export Complete', message: `Export complete! ${exportType === 'selected' ? selectedIds?.length : totalCount} ${resource} exported.` });
      onClose();
    } catch (error) {
      toastStore.add({ type: 'error', title: 'Export Failed', message: 'Export failed. Please try again.' });
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
              <Download size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Export Data</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Export Range */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">What to export:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'all', label: `All ${resource}`, count: totalCount },
                { id: 'filtered', label: 'Filtered items', count: filteredCount || 0, disabled: !filteredCount },
                { id: 'selected', label: 'Selected items', count: selectedIds?.length || 0, disabled: !selectedIds?.length },
              ].map((option) => (
                <button
                  key={option.id}
                  disabled={option.disabled}
                  onClick={() => setExportType(option.id as any)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    exportType === option.id
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-slate-100 dark:border-slate-800 hover:border-indigo-300 opacity-60'
                  } ${option.disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <p className={`text-sm font-bold ${exportType === option.id ? 'text-indigo-900 dark:text-indigo-200' : 'text-slate-600'}`}>{option.label}</p>
                  <p className="text-xs text-slate-500 mt-1">({option.count})</p>
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Format:</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {formatOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setFormat(opt.id as any)}
                  className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    format === opt.id
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600'
                      : 'border-slate-100 dark:border-slate-800 hover:border-indigo-300 text-slate-500'
                  }`}
                >
                  <opt.icon size={20} />
                  <span className="text-xs font-bold">{opt.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Fields to include:</h3>
              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedFields(fieldOptions[resource].map(f => f.id))}
                  className="text-xs text-indigo-600 font-bold"
                >
                  Select All
                </button>
                <button 
                  onClick={() => setSelectedFields([])}
                  className="text-xs text-slate-500 font-bold"
                >
                  Deselect All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {fieldOptions[resource].map((field) => (
                <label 
                  key={field.id} 
                  className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors"
                >
                  <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    selectedFields.includes(field.id)
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {selectedFields.includes(field.id) && <Check size={12} strokeWidth={3} />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={selectedFields.includes(field.id)}
                    onChange={() => handleToggleField(field.id)}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-300">{field.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* AI Insights (PDF only) */}
          {format === 'pdf' && (
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800/30">
              <label className="flex items-start gap-3 cursor-pointer">
                <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                  includeAiSummary
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'border-slate-300 dark:border-slate-600'
                }`}>
                  {includeAiSummary && <Check size={12} strokeWidth={3} />}
                </div>
                <input 
                  type="checkbox" 
                  className="hidden"
                  checked={includeAiSummary}
                  onChange={() => setIncludeAiSummary(!includeAiSummary)}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Bot size={16} className="text-indigo-600" />
                    <span className="text-sm font-bold text-indigo-900 dark:text-indigo-200">AI Summary Report</span>
                  </div>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300 mt-1">
                    Include an AI insights summary page (adds executive summary with key metrics and recommendations).
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button 
            onClick={onClose}
            className="px-6 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting || selectedFields.length === 0}
            className="flex items-center gap-2 px-8 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            {isExporting ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                <span>Preparing...</span>
              </>
            ) : (
              <>
                <span>Export</span>
                <ChevronRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
