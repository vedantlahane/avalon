import React from 'react';
import { Building2, Search, Filter, Plus, Globe, Users } from 'lucide-react';
import { MOCK_COMPANIES } from '../data/mockData';

export const Companies: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Companies</h1>
          <p className="text-gray-500 mt-1">Manage organization-level relationships and firmographics.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus size={18} />
          <span>Add Company</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COMPANIES.map(company => (
          <div key={company.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                <Building2 size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{company.name}</h3>
                <p className="text-xs text-gray-500 font-medium">{company.industry}</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Globe size={14} className="text-gray-400" />
                <span className="truncate">{company.website}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users size={14} className="text-gray-400" />
                <span>12 Contacts</span>
              </div>
            </div>

            <button className="w-full py-2 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
              View Organization Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
