import React, { useState } from 'react';
import { useStore } from '../data/store';
import { Badge } from '../components/common/Badge';
import { 
  Search, 
  Filter, 
  Star, 
  Trash2, 
  Archive, 
  Mail, 
  Send,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/common/FormControls';

const Inbox: React.FC = () => {
  const { emails } = useStore();
  const [selectedEmailId, setSelectedEmailId] = useState<string | null>(emails[0]?.id || null);

  const selectedEmail = emails.find(e => e.id === selectedEmailId);

  return (
    <div className="h-full flex flex-col -m-[24px_32px]">
      <div className="flex-1 flex overflow-hidden">
        {/* Email List */}
        <div className="w-[350px] border-r border-[var(--border-color)] flex flex-col bg-[var(--bg-surface)]">
          <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
            <h2 className="text-lg font-bold text-[var(--text-primary)]">Inbox</h2>
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
              <Sparkles size={16} className="text-[var(--accent)]" />
            </Button>
          </div>
          <div className="p-3 border-b border-[var(--border-color)]">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input 
                type="text"
                placeholder="Search emails..."
                className="w-full bg-[var(--bg-hover)] border-none rounded-md pl-9 pr-3 py-2 text-xs text-[var(--text-primary)] outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {emails.map(email => (
              <button
                key={email.id}
                onClick={() => setSelectedEmailId(email.id)}
                className={`w-full text-left p-4 border-b border-[var(--border-color)] transition-colors hover:bg-[var(--bg-hover)] ${selectedEmailId === email.id ? 'bg-[var(--bg-hover)] border-l-2 border-l-[var(--accent)]' : ''}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold ${email.read ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                    {email.fromName}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-mono">
                    {new Date(email.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className={`text-xs truncate mb-1 ${email.read ? 'text-[var(--text-muted)] font-normal' : 'text-[var(--text-primary)] font-medium'}`}>
                  {email.subject}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                  {email.body}
                </div>
                {email.sentiment === 'urgent' && (
                  <Badge variant="danger" className="mt-2 text-[8px] px-1.5 py-0">Urgent</Badge>
                )}
                {email.sentiment === 'positive' && (
                  <Badge variant="success" className="mt-2 text-[8px] px-1.5 py-0">Positive</Badge>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Email Detail */}
        <div className="flex-1 flex flex-col bg-[var(--bg-primary)]">
          {selectedEmail ? (
            <>
              <div className="h-14 border-b border-[var(--border-color)] flex items-center justify-between px-6 bg-[var(--bg-surface)]">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="w-9 h-9 p-0"><Star size={18} /></Button>
                  <Button variant="ghost" size="sm" className="w-9 h-9 p-0"><Archive size={18} /></Button>
                  <Button variant="ghost" size="sm" className="w-9 h-9 p-0"><Trash2 size={18} /></Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">Reply</Button>
                  <Button variant="primary" size="sm">Forward</Button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">{selectedEmail.subject}</h1>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-xs font-bold">
                          {selectedEmail.fromName[0]}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-[var(--text-primary)]">{selectedEmail.fromName}</span>
                          <span className="text-xs text-[var(--text-muted)]">to {selectedEmail.to}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-[var(--text-muted)] font-mono">
                        {new Date(selectedEmail.date).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {selectedEmail.sentiment === 'urgent' && (
                    <div className="p-4 bg-nexus-danger/10 border border-nexus-danger/20 rounded-lg flex gap-3">
                      <Sparkles size={18} className="text-nexus-danger flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-nexus-danger uppercase tracking-wider mb-1">AI Sentiment Analysis: Urgent/Negative</p>
                        <p className="text-sm text-[var(--text-primary)]">This email contains pricing concerns and mentions competitors. Immediate follow-up recommended.</p>
                      </div>
                    </div>
                  )}

                  <div className="text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap text-sm">
                    {selectedEmail.body}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-muted)]">
              <Mail size={48} strokeWidth={1} className="mb-4 opacity-20" />
              <p>Select an email to read</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;