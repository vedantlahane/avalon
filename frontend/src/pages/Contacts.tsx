import React, { useState } from 'react';
import { useStore } from '../data/store';
import { DataTable } from '../components/common/DataTable';
import { Badge } from '../components/common/Badge';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, Download } from 'lucide-react';
import { Button } from '../components/common/FormControls';

const Contacts: React.FC = () => {
  const { contacts } = useStore();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact => 
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: 'Name',
      accessor: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-[10px] font-bold">
            {row.firstName[0]}{row.lastName[0]}
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-[var(--text-primary)]">{row.firstName} {row.lastName}</span>
            <span className="text-xs text-[var(--text-muted)]">{row.title}</span>
          </div>
        </div>
      )
    },
    {
      header: 'Company',
      accessor: (row: any) => (
        <span className="text-[var(--text-secondary)]">{row.company}</span>
      )
    },
    {
      header: 'Status',
      accessor: (row: any) => {
        const variant = row.leadStatus === 'qualified' ? 'success' : 
                        row.leadStatus === 'new' ? 'accent' : 'default';
        return <Badge variant={variant as any}>{row.leadStatus}</Badge>;
      }
    },
    {
      header: 'Lead Score',
      accessor: (row: any) => (
        <div className="flex items-center gap-2">
          <span className={cn(
            "font-mono font-medium",
            row.leadScore >= 80 ? "text-nexus-success" : 
            row.leadScore >= 50 ? "text-nexus-warning" : "text-nexus-danger"
          )}>
            {row.leadScore}
          </span>
          <div className="w-16 h-1.5 bg-[var(--bg-hover)] rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full",
                row.leadScore >= 80 ? "bg-nexus-success" : 
                row.leadScore >= 50 ? "bg-nexus-warning" : "bg-nexus-danger"
              )}
              style={{ width: `${row.leadScore}%` }}
            />
          </div>
        </div>
      )
    },
    {
      header: 'Last Contact',
      accessor: (row: any) => (
        <span className="text-[var(--text-muted)] font-mono text-xs">
          {new Date(row.lastContacted).toLocaleDateString()}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Contacts</h1>
          <p className="text-[var(--text-muted)] text-sm">Manage your customer relationships and AI-scored leads.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download size={14} className="mr-2" /> Export
          </Button>
          <Button variant="primary" size="sm" onClick={() => {}}>
            <Plus size={14} className="mr-2" /> Add Contact
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 border border-[var(--border-color)] bg-[var(--bg-surface)] p-2 rounded-lg">
        <div className="flex-1 flex items-center gap-2 px-2">
          <Search size={18} className="text-[var(--text-muted)]" />
          <input 
            type="text"
            placeholder="Search contacts by name, company or email..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--text-primary)]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-[1px] h-6 bg-[var(--border-color)] mx-2" />
        <Button variant="ghost" size="sm">
          <Filter size={14} className="mr-2" /> Filters
        </Button>
      </div>

      <div className="border border-[var(--border-color)] bg-[var(--bg-surface)] overflow-hidden">
        <DataTable 
          data={filteredContacts} 
          columns={columns} 
          onRowClick={(row) => navigate(`/contacts/${row.id}`)}
        />
      </div>
    </div>
  );
};

// Simple CN helper since it might be missing in this file context
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default Contacts;
