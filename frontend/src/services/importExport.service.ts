import { api } from '@/lib/api';

export interface ImportAnalysis {
  fileName: string;
  rowCount: number;
  columns: string[];
  suggestedMapping: Record<string, string>;
}

export interface ImportPreview {
  summary: {
    total: number;
    valid: number;
    warnings: number;
    errors: number;
  };
  preview: any[];
  validationErrors: any[];
}

export interface ImportResult {
  created: number;
  updated: number;
  skipped: number;
  failed: number;
}

export interface ExportParams {
  resource: 'contacts' | 'deals' | 'companies';
  ids: string;
  format: 'csv' | 'xlsx' | 'pdf' | 'json';
  fields: string[];
  includeAiSummary?: boolean;
}

export const importExportService = {
  analyzeImport: async (file: File): Promise<ImportAnalysis> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/crm/import/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  previewImport: async (data: any[], mapping: Record<string, string>): Promise<ImportPreview> => {
    const response = await api.post('/crm/import/preview', { data, mapping });
    return response.data;
  },

  executeImport: async (data: any[], mapping: Record<string, string>, duplicateHandling: string): Promise<ImportResult> => {
    const response = await api.post('/crm/import/execute', { data, mapping, duplicateHandling });
    return response.data;
  },

  exportData: async (params: ExportParams): Promise<void> => {
    const queryParams = new URLSearchParams({
      resource: params.resource,
      ids: params.ids,
      format: params.format,
      fields: params.fields.join(','),
      includeAiSummary: String(!!params.includeAiSummary),
    });

    const response = await api.get(`/crm/export?${queryParams.toString()}`, {
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const extension = params.format === 'xlsx' ? 'xlsx' : params.format;
    link.setAttribute('download', `${params.resource}_export_${new Date().getTime()}.${extension}`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};
