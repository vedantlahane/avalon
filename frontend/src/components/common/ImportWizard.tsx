import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  ChevronLeft, 
  X,
  Bot,
  Download,
  Loader2,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { importExportService, ImportAnalysis, ImportPreview, ImportResult } from '@/services/importExport.service';
import { toastStore } from '@/lib/toast-store';
import Papa from 'papaparse';

interface ImportWizardProps {
  isOpen: boolean;
  onClose: () => void;
  resource: 'contacts';
}

const steps = [
  { id: 1, title: 'Upload File' },
  { id: 2, title: 'Map Columns' },
  { id: 3, title: 'Preview & Validate' },
  { id: 4, title: 'Results' }
];

export const ImportWizard: React.FC<ImportWizardProps> = ({ isOpen, onClose, resource }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<ImportAnalysis | null>(null);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [csvData, setCsvData] = useState<any[]>([]);
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [duplicateHandling, setDuplicateHandling] = useState<'skip' | 'update' | 'create'>('update');
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    try {
      const result = await importExportService.analyzeImport(file);
      setAnalysis(result);
      setMapping(result.suggestedMapping);
      
      // Also parse locally for mapping step
      Papa.parse(file, {
        complete: (results) => {
          setCsvData(results.data);
          setCurrentStep(2);
        },
        header: true,
        skipEmptyLines: true
      });
    } catch (error) {
      toastStore.add({ type: 'error', title: 'Analysis Failed', message: 'Failed to analyze file' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = async () => {
    setIsLoading(true);
    try {
      const result = await importExportService.previewImport(csvData, mapping);
      setPreview(result);
      setCurrentStep(3);
    } catch (error) {
      toastStore.add({ type: 'error', title: 'Preview Failed', message: 'Failed to generate preview' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExecuteImport = async () => {
    setIsLoading(true);
    // Simulate progress for UX
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 200);

    try {
      const result = await importExportService.executeImport(csvData, mapping, duplicateHandling);
      setImportResult(result);
      setProgress(100);
      setCurrentStep(4);
      toastStore.add({ type: 'success', title: 'Import Successful', message: `Successfully imported ${result.created + result.updated} ${resource}` });
    } catch (error) {
      toastStore.add({ type: 'error', title: 'Import Failed', message: 'Import failed' });
    } finally {
      clearInterval(interval);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600">
              <Upload size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Import Contacts</h2>
              <p className="text-sm text-slate-500">Step {currentStep} of 4: {steps[currentStep - 1].title}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Stepper */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between max-w-md mx-auto relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 dark:bg-slate-700 -translate-y-1/2 z-0" />
            {steps.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  currentStep >= step.id 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
                }`}>
                  {currentStep > step.id ? <CheckCircle2 size={16} /> : step.id}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div {...getRootProps()} className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                isDragActive 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600'
              }`}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-4">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-full text-indigo-600">
                    <Upload size={32} />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-slate-900 dark:text-white">
                      {file ? file.name : 'Drop your CSV file here or click to browse'}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">Supported: .csv, .xlsx | Max size: 10MB</p>
                  </div>
                  {file && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setFile(null); }}
                      className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                    >
                      <Trash2 size={14} /> Remove file
                    </button>
                  )}
                </div>
              </div>

              {analysis && (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500" />
                  <p className="text-sm text-emerald-800 dark:text-emerald-200">
                    ✅ {analysis.fileName} uploaded ({analysis.rowCount} rows, {analysis.columns.length} columns)
                  </p>
                </div>
              )}

              <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                <Download size={16} /> Download sample CSV template
              </button>
            </div>
          )}

          {currentStep === 2 && analysis && (
            <div className="space-y-6">
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot size={20} className="text-indigo-600" />
                  <span className="text-sm font-medium text-indigo-900 dark:text-indigo-200">AI Auto-Map Columns</span>
                </div>
                <button 
                  onClick={() => setMapping(analysis.suggestedMapping)}
                  className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700"
                >
                  Apply Suggested
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider px-2">
                  <span>Your CSV Column</span>
                  <span>CRM Field</span>
                </div>
                <div className="space-y-2">
                  {analysis.columns.map((col) => (
                    <div key={col} className="grid grid-cols-2 gap-4 items-center p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl">
                      <span className="text-sm font-medium truncate">{col}</span>
                      <select 
                        value={mapping[col] || '-- Skip --'} 
                        onChange={(e) => setMapping({ ...mapping, [col]: e.target.value })}
                        className="text-sm bg-transparent border-none focus:ring-0 w-full"
                      >
                        <option value="-- Skip --">-- Skip --</option>
                        <option value="firstName">First Name</option>
                        <option value="lastName">Last Name</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="company">Company</option>
                        <option value="jobTitle">Job Title</option>
                        <option value="leadSource">Lead Source</option>
                        <option value="address">Address</option>
                        <option value="city">City</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 text-sm">
                  <Bot size={16} />
                  <span>AI mapped {Object.keys(mapping).filter(k => mapping[k] !== '-- Skip --').length}/{analysis.columns.length} columns automatically</span>
                </div>
                {Object.values(mapping).includes('-- Skip --') && (
                  <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200 text-sm">
                    <AlertTriangle size={16} />
                    <span>{Object.values(mapping).filter(v => v === '-- Skip --').length} column(s) skipped</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && preview && (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Total rows', value: preview.summary.total, color: 'slate' },
                  { label: 'Valid', value: preview.summary.valid, color: 'emerald' },
                  { label: 'Warnings', value: preview.summary.warnings, color: 'amber' },
                  { label: 'Errors', value: preview.summary.errors, color: 'red' },
                ].map((stat) => (
                  <div key={stat.label} className={`p-3 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 rounded-xl border border-${stat.color}-200 dark:border-${stat.color}-800/30`}>
                    <p className={`text-xs font-medium text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.label}</p>
                    <p className={`text-xl font-bold text-${stat.color}-900 dark:text-${stat.color}-200`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Preview (first 5 rows):</h3>
                <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <tr>
                        {Object.values(mapping).filter(v => v !== '-- Skip --').map(field => (
                          <th key={field} className="px-4 py-2 font-medium">{field}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                      {preview.preview.map((row, i) => (
                        <tr key={i} className="bg-white dark:bg-slate-900">
                          {Object.values(mapping).filter(v => v !== '-- Skip --').map(field => (
                            <td key={field} className="px-4 py-2 text-slate-600 dark:text-slate-400">{row[field]}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Duplicate handling:</h3>
                <div className="space-y-2">
                  {[
                    { id: 'skip', label: 'Skip duplicates (by email)' },
                    { id: 'update', label: 'Update existing contacts' },
                    { id: 'create', label: 'Create duplicates' },
                  ].map((option) => (
                    <label key={option.id} className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <input 
                        type="radio" 
                        name="duplicates" 
                        checked={duplicateHandling === option.id}
                        onChange={() => setDuplicateHandling(option.id as any)}
                        className="text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              {isLoading && !importResult ? (
                <>
                  <div className="w-full max-w-md space-y-4 text-center">
                    <p className="text-lg font-bold">Importing...</p>
                    <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-600 transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-slate-500">{progress}% complete</p>
                  </div>
                </>
              ) : importResult ? (
                <div className="w-full max-w-md space-y-8 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-600">
                      <CheckCircle2 size={48} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">Import Complete!</h3>
                      <p className="text-slate-500">Successfully imported {importResult.created + importResult.updated} contacts!</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-medium text-slate-500">Created</p>
                      <p className="text-2xl font-bold text-emerald-600">{importResult.created}</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-medium text-slate-500">Updated</p>
                      <p className="text-2xl font-bold text-indigo-600">{importResult.updated}</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-medium text-slate-500">Skipped</p>
                      <p className="text-2xl font-bold text-amber-600">{importResult.skipped}</p>
                    </div>
                    <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <p className="text-sm font-medium text-slate-500">Failed</p>
                      <p className="text-2xl font-bold text-red-600">{importResult.failed}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800/30 text-left space-y-4">
                    <div className="flex items-start gap-3">
                      <Bot className="text-indigo-600 mt-1" />
                      <div>
                        <p className="text-sm font-bold text-indigo-900 dark:text-indigo-200">AI Enrichment Available</p>
                        <p className="text-xs text-indigo-700 dark:text-indigo-300">Would you like AI to enrich the {importResult.created + importResult.updated} new contacts with additional data?</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700">Yes, Enrich All</button>
                      <button className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700">Maybe Later</button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button 
            onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
            disabled={currentStep === 1 || currentStep === 4 || isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 disabled:opacity-50"
          >
            <ChevronLeft size={16} /> Back
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              {currentStep === 4 ? 'Done' : 'Cancel'}
            </button>
            {currentStep === 1 && (
              <button 
                onClick={handleUpload}
                disabled={!file || isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Next'} <ChevronRight size={16} />
              </button>
            )}
            {currentStep === 2 && (
              <button 
                onClick={handlePreview}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700"
              >
                {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Next'} <ChevronRight size={16} />
              </button>
            )}
            {currentStep === 3 && (
              <button 
                onClick={handleExecuteImport}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700"
              >
                {isLoading ? <Loader2 className="animate-spin" size={16} /> : 'Import'} <Upload size={16} />
              </button>
            )}
            {currentStep === 4 && (
              <div className="flex gap-3">
                <button 
                  onClick={() => {
                    setCurrentStep(1);
                    setFile(null);
                    setAnalysis(null);
                    setImportResult(null);
                  }}
                  className="px-6 py-2 border border-slate-200 dark:border-slate-800 text-sm font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  Import More
                </button>
                <button 
                  onClick={onClose}
                  className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700"
                >
                  View Contacts
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
