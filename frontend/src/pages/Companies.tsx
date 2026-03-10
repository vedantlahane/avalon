import React, { useEffect, useState } from 'react';
import { 
  Building2, Search, Filter, Plus, Globe, Users, 
  TrendingUp, DollarSign, Brain, 
  MapPin, Briefcase, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CompanyWithStats } from '../types';
import { companyService } from '../services/company.service';
import { cn } from '../lib/utils';
import { EmptyState } from '../components/common/EmptyState';
import { CardGridSkeleton } from '../components/common/Skeletons';
import { ErrorState } from '../components/common/ErrorState';

export const Companies: React.FC = () => {
  const [companies, setCompanies] = useState<CompanyWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: 'All',
    size: 'All'
  });
  const navigate = useNavigate();

  const loadCompanies = async () => {
    setIsLoading(true);
    try {
      const data = await companyService.getCompanies();
      setCompanies(data);
      setError(null);
    } catch (err) {
      console.error('Failed to load companies:', err);
      setError('Failed to load company data');
    } finally {
      setTimeout(() => setIsLoading(false), 600);
    }
  };

  useEffect(() => {
    loadCompanies();
  }, []);

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         company.industry?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = filters.industry === 'All' || company.industry === filters.industry;
    const matchesSize = filters.size === 'All' || company.size === filters.size;
    
    return matchesSearch && matchesIndustry && matchesSize;
  });

  const industries = ['All', ...new Set(companies.map(c => c.industry).filter(Boolean))];

  if (isLoading) return <CardGridSkeleton />;
  if (error) return <ErrorState onRetry={loadCompanies} />;

  return (
    <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-6 pb-24 md:pb-12 page-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Companies</h1>
          <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-primary/10 shadow-sm">
            {companies.length}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 bg-card border border-border text-muted-foreground px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-muted transition-all ripple shadow-sm">
            <Brain size={16} className="text-primary" />
            <span>AI Enrich</span>
          </button>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 btn-hover ripple">
            <Plus size={18} />
            <span>Add Company</span>
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-card p-3 rounded-2xl border border-border shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <input
            type="text"
            placeholder="Search companies by name or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/50 border border-transparent rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/10 text-foreground transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select 
            value={filters.industry}
            onChange={(e) => setFilters({...filters, industry: e.target.value})}
            className="text-[10px] font-black uppercase tracking-widest bg-muted/50 border-transparent rounded-xl focus:ring-primary py-2.5 px-3 min-w-fit outline-none text-foreground"
          >
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
          <button className="p-2.5 bg-muted/50 rounded-xl text-muted-foreground hover:text-primary ripple transition-colors">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.length === 0 ? (
          <div className="col-span-full">
            <EmptyState
              icon={Building2}
              title="No companies yet"
              description="Add your clients and prospects to start building your CRM. Use AI to enrich company details automatically."
              actions={[
                { label: 'Add Company', onClick: () => {}, icon: Plus },
                { label: 'AI Bulk Enrich', onClick: () => {}, variant: 'secondary', icon: Brain }
              ]}
              aiTip="Just enter a company website, and AI will pull industry, size, and location for you!"
            />
          </div>
        ) : filteredCompanies.length > 0 ? (
          filteredCompanies.map(company => (
            <div 
              key={company.id} 
              className="bg-card border border-border rounded-2xl p-6 shadow-sm card-hover group flex flex-col h-full cursor-pointer"
              onClick={() => navigate(`/companies/${company.id}`)}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-muted/50 rounded-2xl flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all border border-border group-hover:border-primary/20">
                    <Building2 size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg leading-tight group-hover:text-primary transition-colors">{company.name}</h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-muted text-muted-foreground rounded-lg border border-border">{company.industry}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <MapPin size={14} className="text-muted-foreground/50 shrink-0" />
                  <span className="truncate">{company.location || 'USA'}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Globe size={14} className="text-muted-foreground/50 shrink-0" />
                  <span className="truncate">{company.website?.replace('https://', '') || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Users size={14} className="text-muted-foreground/50 shrink-0" />
                  <span>{company.contactCount} Contacts</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground font-medium">
                  <Briefcase size={14} className="text-muted-foreground/50 shrink-0" />
                  <span className="truncate">{company.activeDealCount} Deals</span>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <Brain size={14} className="text-primary" />
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Health Score</span>
                  </div>
                  <span className={cn(
                    "text-xs font-black",
                    (company.healthScore || 0) >= 80 ? "text-emerald-500" : (company.healthScore || 0) >= 60 ? "text-amber-500" : "text-rose-500"
                  )}>
                    {company.healthScore || 85}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden mb-6 shadow-inner">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      (company.healthScore || 0) >= 80 ? "bg-emerald-500" : (company.healthScore || 0) >= 60 ? "bg-amber-500" : "bg-rose-500"
                    )}
                    style={{ width: `${company.healthScore || 85}%` }}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    className="flex-1 py-2.5 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-1 shadow-lg shadow-primary/20 ripple"
                  >
                    View Details
                    <ChevronRight size={14} />
                  </button>
                  <button className="p-2.5 bg-muted text-muted-foreground rounded-xl hover:text-primary hover:bg-primary/10 transition-all ripple" title="Add Contact" onClick={(e) => e.stopPropagation()}>
                    <Users size={16} />
                  </button>
                  <button className="p-2.5 bg-muted text-muted-foreground rounded-xl hover:text-primary hover:bg-primary/10 transition-all ripple" title="Add Deal" onClick={(e) => e.stopPropagation()}>
                    <DollarSign size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-card border border-dashed border-border rounded-3xl">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-muted-foreground mx-auto mb-4">
              <Building2 size={40} />
            </div>
            <h3 className="text-xl font-bold text-foreground">No results found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setFilters({ industry: 'All', size: 'All' });
              }}
              className="mt-6 text-primary font-bold hover:underline ripple px-4 py-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
