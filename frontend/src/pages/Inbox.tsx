import React, { useEffect, useState } from 'react';
import { emailService } from '../services/email.service';
import { Email } from '../types';
import { 
  Search, 
  Inbox as InboxIcon, 
  Send, 
  FileText, 
  Star, 
  Sparkles, 
  Layout, 
  Trash2, 
  Archive, 
  Reply, 
  Forward, 
  MoreHorizontal, 
  Paperclip, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Calendar, 
  Edit3, 
  ArrowUpRight, 
  Search as SearchIcon,
  Tag,
  RefreshCw
} from 'lucide-react';
import { cn } from '../lib/utils';
import { format, formatDistanceToNow } from 'date-fns';

export const Inbox: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFolder, setActiveFolder] = useState('Inbox');
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiPanelExpanded, setIsAiPanelExpanded] = useState(true);
  const [replyText, setReplyText] = useState('');
  const [isGeneratingReply, setIsGeneratingReply] = useState(false);

  useEffect(() => {
    fetchEmails();
  }, [activeFolder]);

  const fetchEmails = async () => {
    setIsLoading(true);
    try {
      const data = await emailService.getEmails(activeFolder);
      setEmails(data);
      if (data.length > 0 && !selectedEmail) {
        setSelectedEmail(data[0]);
      } else if (selectedEmail) {
        const updatedSelected = data.find(e => e.id === selectedEmail.id);
        if (updatedSelected) setSelectedEmail(updatedSelected);
      }
    } catch (error) {
      console.error('Failed to fetch emails', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectEmail = (email: Email) => {
    setSelectedEmail(email);
    if (!email.isRead) {
      emailService.markAsRead(email.id);
      setEmails(prev => prev.map(e => e.id === email.id ? { ...e, isRead: true } : e));
    }
  };

  const handleToggleStar = async (e: React.MouseEvent, emailId: number) => {
    e.stopPropagation();
    try {
      await emailService.toggleStar(emailId);
      setEmails(prev => prev.map(e => e.id === emailId ? { ...e, isStarred: !e.isStarred } : e));
      if (selectedEmail?.id === emailId) {
        setSelectedEmail(prev => prev ? { ...prev, isStarred: !prev.isStarred } : null);
      }
    } catch (error) {
      console.error('Failed to toggle star', error);
    }
  };

  const handleGenerateAiReply = async () => {
    if (!selectedEmail) return;
    setIsGeneratingReply(true);
    try {
      const reply = await emailService.generateAiReply(selectedEmail.id);
      setReplyText(reply);
    } catch (error) {
      console.error('Failed to generate AI reply', error);
    } finally {
      setIsGeneratingReply(false);
    }
  };

  const filteredEmails = emails.filter(email => {
    if (activeFilter === 'Unread' && email.isRead) return false;
    if (activeFilter === 'Starred' && !email.isStarred) return false;
    if (activeFilter === 'AI Flagged' && !email.isAIFlagged) return false;
    
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      return (
        email.sender.toLowerCase().includes(search) ||
        email.senderName?.toLowerCase().includes(search) ||
        email.subject.toLowerCase().includes(search) ||
        email.content.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const getSentimentColor = (sentiment?: string) => {
    switch (sentiment) {
      case 'Positive': return 'text-green-600 bg-green-50 border-green-100';
      case 'Neutral': return 'text-gray-600 bg-gray-50 border-gray-100';
      case 'Negative': return 'text-amber-600 bg-amber-50 border-amber-100';
      case 'Urgent': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  const getSentimentIcon = (sentiment?: string) => {
    switch (sentiment) {
      case 'Positive': return '✅';
      case 'Neutral': return '➡️';
      case 'Negative': return '⚠️';
      case 'Urgent': return '🔴';
      default: return '';
    }
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col bg-gray-50/50 rounded-2xl border border-gray-200 overflow-hidden">
      <div className="flex h-full">
        {/* LEFT PANEL - Folders */}
        <div className="w-[250px] bg-white border-r border-gray-200 flex flex-col p-4">
          <button className="w-full bg-indigo-600 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-indigo-200 mb-6 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all">
            <Edit3 size={18} />
            <span>Compose</span>
          </button>

          <nav className="space-y-1">
            {[
              { id: 'Inbox', icon: InboxIcon, count: 12 },
              { id: 'Sent', icon: Send, count: 45 },
              { id: 'Drafts', icon: FileText, count: 3 },
              { id: 'Starred', icon: Star, count: 5 },
              { id: 'AI Generated', icon: Sparkles, count: 8 },
              { id: 'Templates', icon: Layout, count: 0 },
              { id: 'Trash', icon: Trash2, count: 0 },
            ].map(folder => (
              <button
                key={folder.id}
                onClick={() => setActiveFolder(folder.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all",
                  activeFolder === folder.id 
                    ? "bg-indigo-50 text-indigo-700" 
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center gap-3">
                  <folder.icon size={18} className={cn(activeFolder === folder.id ? "text-indigo-600" : "text-gray-400")} />
                  <span>{folder.id}</span>
                </div>
                {folder.count > 0 && (
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold",
                    activeFolder === folder.id ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-500"
                  )}>
                    {folder.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* MIDDLE PANEL - Email List */}
        <div className="w-[350px] bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search emails..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:bg-white transition-all"
              />
            </div>
            
            <div className="flex items-center gap-1 p-1 bg-gray-100 rounded-lg">
              {['All', 'Unread', 'Starred', 'AI Flagged'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "flex-1 py-1 text-[11px] font-bold rounded-md transition-all",
                    activeFilter === filter ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {isLoading ? (
              <div className="p-8 text-center space-y-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="text-xs text-gray-500 font-medium">Loading emails...</p>
              </div>
            ) : filteredEmails.length > 0 ? (
              filteredEmails.map((email) => (
                <button
                  key={email.id}
                  onClick={() => handleSelectEmail(email)}
                  className={cn(
                    "w-full text-left p-4 hover:bg-gray-50 transition-all relative group",
                    selectedEmail?.id === email.id ? "bg-indigo-50/50" : "",
                    !email.isRead ? "bg-white" : ""
                  )}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-2 overflow-hidden">
                      {!email.isRead && <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0" />}
                      <span className={cn("text-sm truncate", !email.isRead ? "font-bold text-gray-900" : "text-gray-600")}>
                        {email.senderName || email.sender}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase whitespace-nowrap ml-2">
                      {formatDistanceToNow(new Date(email.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  
                  <div className={cn("text-xs mb-1 truncate", !email.isRead ? "font-bold text-gray-900" : "text-gray-700")}>
                    {email.subject}
                  </div>
                  
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                    {email.content}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    {email.sentiment && (
                      <div className={cn(
                        "flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold border",
                        getSentimentColor(email.sentiment)
                      )}>
                        <span>🤖 {email.sentiment} {getSentimentIcon(email.sentiment)}</span>
                      </div>
                    )}
                    {email.dealName && (
                      <div className="flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-100 px-2 py-0.5 rounded-full text-[9px] font-bold">
                        <Tag size={10} />
                        <span>{email.dealName}</span>
                      </div>
                    )}
                    {email.attachments && email.attachments.length > 0 && (
                      <Paperclip size={12} className="text-gray-400" />
                    )}
                  </div>
                  
                  <button 
                    onClick={(e) => handleToggleStar(e, email.id)}
                    className={cn(
                      "absolute top-10 right-4 opacity-0 group-hover:opacity-100 transition-all p-1 rounded-full",
                      email.isStarred ? "opacity-100 text-amber-500" : "text-gray-300 hover:text-amber-500"
                    )}
                  >
                    <Star size={16} fill={email.isStarred ? "currentColor" : "none"} />
                  </button>
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400">
                <SearchIcon size={32} className="mx-auto mb-2 opacity-20" />
                <p className="text-xs font-medium">No emails found</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL - Email Detail */}
        <div className="flex-1 bg-white flex flex-col overflow-hidden">
          {selectedEmail ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Email Header Actions */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={(e) => handleToggleStar(e, selectedEmail.id)} className={cn("p-2 rounded-lg transition-all", selectedEmail.isStarred ? "text-amber-500 bg-amber-50" : "text-gray-400 hover:bg-gray-50 hover:text-amber-500")}>
                    <Star size={18} fill={selectedEmail.isStarred ? "currentColor" : "none"} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                    <Archive size={18} />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-lg transition-all border border-gray-200">
                    <Reply size={14} />
                    <span>Reply</span>
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-lg transition-all border border-gray-200">
                    <Forward size={14} />
                    <span>Forward</span>
                  </button>
                  <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-all">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="p-8">
                  {/* Email Header Info */}
                  <div className="mb-8 flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">{selectedEmail.subject}</h2>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm border-2 border-white shadow-sm">
                          {selectedEmail.senderAvatar || (selectedEmail.senderName || selectedEmail.sender)[0].toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-900">{selectedEmail.senderName || selectedEmail.sender}</span>
                            <span className="text-xs text-gray-400">&lt;{selectedEmail.sender}&gt;</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            to me • {format(new Date(selectedEmail.timestamp), 'MMMM d, yyyy, h:mm a')}
                          </div>
                        </div>
                      </div>
                    </div>
                    {selectedEmail.dealName && (
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1 rounded-lg text-xs font-bold">
                          <Tag size={14} />
                          <span>Associated Deal: {selectedEmail.dealName}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Email Body */}
                  <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap mb-10 pb-10 border-b border-gray-100">
                    {selectedEmail.content}
                  </div>

                  {/* Attachments */}
                  {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
                    <div className="mb-10">
                      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Attachments ({selectedEmail.attachments.length})</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedEmail.attachments.map((file, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-all group cursor-pointer">
                            <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-lg flex items-center justify-center group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-all">
                              <FileText size={20} />
                            </div>
                            <div className="overflow-hidden">
                              <div className="text-xs font-bold text-gray-900 truncate">{file.name}</div>
                              <div className="text-[10px] text-gray-500">{file.size}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* AI ANALYSIS PANEL */}
                  <div className="bg-white border border-indigo-100 rounded-2xl overflow-hidden shadow-sm shadow-indigo-100 mb-8">
                    <button 
                      onClick={() => setIsAiPanelExpanded(!isAiPanelExpanded)}
                      className="w-full flex items-center justify-between p-4 bg-indigo-50/50 hover:bg-indigo-50 transition-all"
                    >
                      <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                        <Sparkles size={16} />
                        <span>🤖 AI Email Analysis</span>
                      </div>
                      {isAiPanelExpanded ? <ChevronUp size={16} className="text-indigo-400" /> : <ChevronDown size={16} className="text-indigo-400" />}
                    </button>
                    
                    {isAiPanelExpanded && (
                      <div className="p-5 space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">📊 Sentiment</div>
                            <div className="flex items-center gap-2">
                              <span className={cn("text-sm font-bold", selectedEmail.sentiment === 'Positive' ? "text-green-600" : "text-gray-600")}>
                                {selectedEmail.sentiment || 'Analyzing...'}
                              </span>
                              {selectedEmail.sentimentScore && (
                                <span className="text-xs text-gray-400">({selectedEmail.sentimentScore}% confidence)</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {selectedEmail.keyPoints && (
                          <div className="space-y-3">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">🔑 Key Points Extracted</div>
                            <ul className="space-y-2">
                              {selectedEmail.keyPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {selectedEmail.intent && (
                          <div className="space-y-2">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">🎯 Detected Intent</div>
                            <p className="text-sm text-gray-700 italic">"{selectedEmail.intent}"</p>
                          </div>
                        )}

                        {selectedEmail.suggestedActions && (
                          <div className="space-y-3 pt-4 border-t border-gray-100">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">⚡ Suggested Actions</div>
                            <div className="space-y-2">
                              {selectedEmail.suggestedActions.map((action, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-indigo-50 group transition-all cursor-pointer">
                                  <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-gray-400">{idx + 1}.</span>
                                    <span className="text-xs font-medium text-gray-700">{action}</span>
                                  </div>
                                  <ArrowRight size={14} className="text-indigo-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                </div>
                              ))}
                            </div>
                            <div className="flex gap-2 mt-4">
                              <button className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                                <Calendar size={14} />
                                <span>Schedule Meeting</span>
                              </button>
                              <button onClick={handleGenerateAiReply} className="flex-1 bg-white text-indigo-600 border border-indigo-200 py-2 rounded-xl text-xs font-bold hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                                <Sparkles size={14} />
                                <span>Draft Reply</span>
                              </button>
                              <button className="flex-1 bg-white text-gray-600 border border-gray-200 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                                <ArrowUpRight size={14} />
                                <span>Update Deal</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* REPLY SECTION */}
                  <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="text-xs font-bold text-gray-900">Reply</div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">To:</span>
                          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">{selectedEmail.sender}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-[10px] font-bold text-gray-400 uppercase tracking-wider hover:text-indigo-600 transition-all">Use Template</button>
                        <ChevronDown size={14} className="text-gray-400" />
                      </div>
                    </div>

                    <div className="relative mb-4">
                      <textarea
                        rows={6}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply here..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-200 transition-all resize-none"
                      />
                      <button 
                        onClick={handleGenerateAiReply}
                        disabled={isGeneratingReply}
                        className="absolute bottom-4 right-4 bg-indigo-50 text-indigo-600 p-2 rounded-xl hover:bg-indigo-100 transition-all border border-indigo-100 shadow-sm disabled:opacity-50"
                        title="AI Write Reply"
                      >
                        {isGeneratingReply ? <RefreshCw size={18} className="animate-spin" /> : <Sparkles size={18} />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <Paperclip size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                          <Calendar size={18} />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl transition-all">Save Draft</button>
                        <div className="relative group">
                          <button className="bg-indigo-600 text-white pl-4 pr-10 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100 flex items-center gap-2">
                            <span>Send</span>
                          </button>
                          <div className="absolute right-0 top-0 bottom-0 w-8 border-l border-indigo-500/30 flex items-center justify-center group-hover:bg-indigo-700 rounded-r-xl cursor-pointer">
                            <ChevronDown size={14} className="text-white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50/20">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl shadow-gray-200/50 flex items-center justify-center mb-6">
                <InboxIcon size={40} strokeWidth={1.5} className="text-gray-300" />
              </div>
              <p className="text-sm font-bold text-gray-900">Select an email to read</p>
              <p className="text-xs text-gray-400 mt-2">Manage your conversations with AI insights</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};