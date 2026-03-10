import React, { useEffect, useState } from 'react';
import { 
  Building2, Search, Filter, Plus, Globe, Users, 
  TrendingUp, DollarSign, Activity, Brain, 
  MapPin, Briefcase, ExternalLink, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CompanyWithStats } from '../types';
import { companyService } from '../services/company.service';
import { cn } from '../lib/utils';

export const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: 'All',
    size: 'All',
    location: 'All'
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setIsLoading(true);
    try {
      const data = await companyService.getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error('Failed to load companies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnrich = async () => {
    // In a real app, this would enrich selected companies
    alert('AI Bulk Enrich started for selected companies.');
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         company.industry?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = filters.industry === 'All' || company.industry === filters.industry;
    const matchesSize = filters.size === 'All' || company.size === filters.size;
    
    return matchesSearch && matchesIndustry && matchesSize;
  });

  const industries = ['All', ...new Set(companies.map(c => c.industry).filter(Boolean))];
  const sizes = ['All', '1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-gray-500 font-medium">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Companies</h1>
          <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2.5 py-1 rounded-full">
            {companies.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleEnrich}
            className="flex items-center gap-2 bg-white border border-indigo-200 text-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-all shadow-sm"
          >
            <Brain size={18} />
            <span>AI Enrich</span>
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm">
            <Plus size={18} />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search companies by name or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          <div className="flex items-center gap-2 min-w-fit">
            <Filter size={16} className="text-gray-400" />
            <select 
              value={filters.industry}
              onChange={(e) => setFilters({...filters, industry: e.target.value})}
              className="text-sm border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-1.5"
            >
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>
          <select 
            value={filters.size}
            onChange={(e) => setFilters({...filters, size: e.target.value})}
            className="text-sm border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-1.5 min-w-fit"
          >
            <option value="All">All Sizes</option>
            {sizes.filter(s => s !== 'All').map(size => (
              <option key={size} value={size}>{size} employees</option>
            ))}
          </select>
          <select 
            className="text-sm border-gray-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 py-1.5 min-w-fit"
            disabled
          >
            <option>All Locations</option>
          </select>
        </div>
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map(company => (
            <div 
              key={company.id} 
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Building2 size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-indigo-600 transition-colors">{company.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">{company.industry}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{company.size} employees</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-6 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} className="text-gray-400 shrink-0" />
                  <span className="truncate">{company.location || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Globe size={16} className="text-gray-400 shrink-0" />
                  <span className="truncate">{company.website?.replace('https://', '') || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={16} className="text-gray-400 shrink-0" />
                  <span>{company.contactCount} Contacts</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase size={16} className="text-gray-400 shrink-0" />
                  <span className="truncate">{company.activeDealCount} Active Deals</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 font-medium">
                  <DollarSign size={16} className="text-green-500 shrink-0" />
                  <span>${company.totalRevenue?.toLocaleString() || '0'} Rev</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <TrendingUp size={16} className="text-indigo-400 shrink-0" />
                  <span>${company.activeDealValue?.toLocaleString() || '0'} Pipeline</span>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <Brain size={14} className="text-indigo-500" />
                    <span className="text-xs font-bold text-gray-700">AI Health Score</span>
                  </div>
                  <span className={cn(
                    "text-xs font-bold",
                    (company.healthScore || 0) >= 80 ? "text-green-600" : (company.healthScore || 0) >= 60 ? "text-amber-600" : "text-red-600"
                  )}>
                    {company.healthScore}/100
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      (company.healthScore || 0) >= 80 ? "bg-green-500" : (company.healthScore || 0) >= 60 ? "bg-amber-500" : "bg-red-500"
                    )}
                    style={{ width: `${company.healthScore}%` }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => navigate(`/companies/${company.id}`)}
                    className="flex-1 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-1"
                  >
                    View
                    <ChevronRight size={14} />
                  </button>
                  <button className="px-3 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition-all">
                    + Contact
                  </button>
                  <button className="px-3 py-2 bg-white border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition-all">
                    + Deal
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mx-auto mb-4">
              <Building2 size={40} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No companies found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilters({ industry: 'All', size: 'All', location: 'All' });
              }}
              className="mt-6 text-indigo-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};