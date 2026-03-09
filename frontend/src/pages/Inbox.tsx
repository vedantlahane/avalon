import React, { useEffect, useState } from 'react';
import { emailService } from '../services/email.service';
import { Email } from '../types';
import { 
  Search, 
  Inbox as InboxIcon, 
  Archive, 
  Trash2, 
  Star, 
  Filter,
  RefreshCw,
  Sparkles,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

export const Inbox: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    emailService.getEmails().then(data => {
      setEmails(data);
      if (data.length > 0) setSelectedEmail(data[0]);
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
    <div className="h-[calc(100vh-140px)] flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Inbox</h1>
          <p className="text-gray-500 mt-1">Unified communication across all your contacts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:bg-white hover:text-indigo-600 rounded-lg border border-transparent hover:border-gray-200 transition-all">
            <RefreshCw size={18} />
          </button>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
            <MessageSquare size={18} />
            <span>Compose</span>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex">
        {/* Email List */}
        <div className="w-1/3 border-r border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100 bg-gray-50/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input 
                type="text" 
                placeholder="Search inbox..." 
                className="w-full bg-white border border-gray-200 rounded-lg py-1.5 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
            {emails.map((email) => (
              <button
                key={email.id}
                onClick={() => setSelectedEmail(email)}
                className={cn(
                  "w-full text-left p-4 hover:bg-gray-50 transition-colors relative group",
                  selectedEmail?.id === email.id ? "bg-indigo-50/50" : "",
                  !email.isRead ? "font-bold" : ""
                )}
              >
                {!email.isRead && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600"></div>
                )}
                <div className="flex justify-between items-start mb-1">
                  <span className="text-sm text-gray-900 truncate pr-4">{email.sender}</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase whitespace-nowrap">
                    {format(new Date(email.timestamp), 'HH:mm')}
                  </span>
                </div>
                <div className="text-xs text-indigo-600 mb-1 truncate">{email.subject}</div>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {email.content}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-md px-1.5 py-0.5 text-[10px] text-gray-500 font-bold">
                    <Sparkles size={10} className="text-indigo-500" />
                    <span>AI Scored</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Email Content */}
        {selectedEmail ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-gray-50 rounded-lg transition-colors">
                  <Archive size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 size={18} />
                </button>
                <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>
                <button className="p-2 text-gray-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-colors">
                  <Star size={18} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs font-bold text-gray-500 hover:text-gray-900 px-2 py-1">Reply</button>
                <button className="text-xs font-bold text-gray-500 hover:text-gray-900 px-2 py-1">Forward</button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedEmail.subject}</h2>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">
                    {selectedEmail.sender[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">{selectedEmail.sender}</div>
                    <div className="text-xs text-gray-500">to me • {format(new Date(selectedEmail.timestamp), 'MMM d, yyyy HH:mm')}</div>
                  </div>
                </div>
              </div>

              {/* AI Summary Card */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 mb-8 relative group">
                <div className="absolute top-4 right-4 text-indigo-200">
                  <Sparkles size={24} />
                </div>
                <div className="flex items-center gap-2 text-indigo-700 font-bold text-xs uppercase tracking-widest mb-3">
                  <Sparkles size={14} />
                  <span>AI Insight & Summary</span>
                </div>
                <p className="text-indigo-900/80 text-sm leading-relaxed mb-4">
                  The sender is interested involume discounts and wants to schedule a demo. 
                  <span className="font-bold text-indigo-700"> Sentiment: 85% Positive.</span>
                </p>
                <div className="flex gap-2">
                  <button className="bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
                    Draft AI Response
                  </button>
                  <button className="bg-white text-indigo-600 border border-indigo-200 text-xs font-bold px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                    Add to Deal Task
                  </button>
                </div>
              </div>

              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedEmail.content}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50/30">
            <InboxIcon size={48} strokeWidth={1} className="mb-4 opacity-20" />
            <p className="text-sm font-medium">Select an email to read</p>
          </div>
        )}
      </div>
    </div>
  );
};
