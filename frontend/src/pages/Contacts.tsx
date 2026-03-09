import React, { useEffect, useState } from 'react';
import { contactService } from '../services/contact.service';
import { Contact } from '../types';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Mail, 
  Phone, 
  Building2,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Contacts: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    contactService.getContacts().then(data => {
      setContacts(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Contacts</h1>
          <p className="text-gray-500 mt-1">Manage your relationships and view lead potential.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
          <Plus size={18} />
          <span>Add Contact</span>
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white border border-gray-200 p-3 rounded-xl shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search contacts by name, email, or company..." 
            className="w-full bg-gray-50 border border-gray-100 rounded-lg py-1.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
          />
        </div>
        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded-lg border border-transparent hover:border-gray-200">
          <Filter size={16} />
          <span>Filters</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Score</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {contacts.map((contact) => (
              <tr key={contact.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
                      {contact.firstName[0]}{contact.lastName[0]}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 leading-tight">
                        {contact.firstName} {contact.lastName}
                      </div>
                      <div className="text-xs text-gray-500">{contact.jobTitle}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                    contact.leadStatus === 'Qualified' ? "bg-emerald-50 text-emerald-700" : 
                    contact.leadStatus === 'New' ? "bg-indigo-50 text-indigo-700" : "bg-amber-50 text-amber-700"
                  )}>
                    {contact.leadStatus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <Building2 size={14} className="text-gray-400" />
                    {contact.company?.name || 'No Company'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 max-w-[100px] h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          contact.leadScore > 70 ? "bg-emerald-500" : contact.leadScore > 40 ? "bg-amber-500" : "bg-red-500"
                        )}
                        style={{ width: `${contact.leadScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-mono font-bold text-gray-900">{contact.leadScore}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Email">
                      <Mail size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="Call">
                      <Phone size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* AI Suggestion Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Sparkles size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Intelligent Prospecting</h3>
              <p className="text-indigo-100 text-sm mt-1 max-w-xl">
                Our AI has identified 12 high-potential leads that match your ideal customer profile. Would you like to review them and start an automated outreach campaign?
              </p>
            </div>
          </div>
          <button className="bg-white text-indigo-600 px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-indigo-50 transition-colors shadow-lg whitespace-nowrap">
            <span>Explore Leads</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
