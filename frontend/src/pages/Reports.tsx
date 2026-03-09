import React from 'react';
import { BarChart3, PieChart, LineChart, Download, Calendar } from 'lucide-react';

export const Reports: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Analytics & Reports</h1>
          <p className="text-gray-500 mt-1">Deep dive into your sales performance and team productivity.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors shadow-sm">
            <Calendar size={18} />
            <span>Quarter to Date</span>
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
            <Download size={18} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 size={18} className="text-indigo-500" />
              Revenue Forecast
            </h3>
          </div>
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Chart Visualization</p>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <PieChart size={18} className="text-violet-500" />
              Lead Source Attribution
            </h3>
          </div>
          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center border border-dashed border-gray-200">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Chart Visualization</p>
          </div>
        </div>
      </div>
    </div>
  );
};
