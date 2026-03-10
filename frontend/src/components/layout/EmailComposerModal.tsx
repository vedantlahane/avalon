import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Minus, 
  Maximize2, 
  Minimize2, 
  Send, 
  Clock, 
  Save, 
  FileText, 
  Sparkles, 
  ChevronDown, 
  Search, 
  User, 
  Paperclip, 
  Smile, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Bold, 
  Italic, 
  List, 
  Type,
  MoreHorizontal,
  Loader2,
  CheckCircle2,
  RotateCcw,
  Languages,
  ArrowRight,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { emailService } from '../../services/email.service';
import { contactService } from '../../services/contact.service';
import { Contact, Deal } from '../../types';
import { composerStore } from '../../lib/composer-store';
import toast from 'react-hot-toast';

export const EmailComposerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState<any>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isAiAssistOn, setIsAiAssistOn] = useState(true);
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggestingSubject, setIsSuggestingSubject] = useState(false);
  const [isScoring, setIsScoring] = useState(false);
  const [isSuggestingTime, setIsSuggestingTime] = useState(false);
  const [aiScore, setAiScore] = useState<{ score: number; feedback: string[] } | null>(null);
  const [bestTime, setBestTime] = useState<{ bestTime: string; reason: string } | null>(null);
  const [aiVersions, setAiVersions] = useState<{ subject: string; body: string }[]>([]);
  const [selectedVersionIdx, setSelectedVersionIdx] = useState(0);
  
  // AI Panel State
  const [emailType, setEmailType] = useState('Follow-up after meeting');
  const [tone, setTone] = useState('Professional');
  const [length, setLength] = useState('Medium (1-2 paragraphs)');
  const [additionalContext, setAdditionalContext] = useState('');

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactSearch, setShowContactSearch] = useState(false);

  useEffect(() => {
    const unsubscribe = composerStore.subscribe((state) => {
      setIsOpen(state.isOpen);
      if (state.isOpen) {
        setParams(state);
        if (state.to) setTo(state.to);
        if (state.contact) setTo(state.contact.email);
        if (state.subject) setSubject(state.subject);
        if (state.initialContent) setContent(state.initialContent);
        setIsMinimized(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const data = await contactService.getContacts();
        setContacts(data);
      } catch (error) {
        console.error('Error loading contacts:', error);
      }
    };
    if (isOpen) loadContacts();
  }, [isOpen]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const result = await emailService.generateEmail({
        type: emailType,
        tone,
        length,
        additionalContext,
        contactId: params?.contact?.id,
        dealId: params?.deal?.id
      });
      setAiVersions(result.versions);
      setSelectedVersionIdx(0);
      setSubject(result.versions[0].subject);
      setContent(result.versions[0].body);
    } catch (error) {
      toast.error('Failed to generate email');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleImprove = async (action: any) => {
    setIsGenerating(true);
    try {
      const improvedText = await emailService.improveEmail({
        text: content,
        action
      });
      setContent(improvedText);
    } catch (error) {
      toast.error('Failed to improve email');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSuggestSubject = async () => {
    setIsSuggestingSubject(true);
    try {
      const context = `To: ${to}\nContent: ${content.substring(0, 500)}`;
      const subjects = await emailService.suggestSubjects(context);
      // For simplicity, just pick the first one or show a menu
      setSubject(subjects[0]);
      toast.success('Subject suggested');
    } catch (error) {
      toast.error('Failed to suggest subject');
    } finally {
      setIsSuggestingSubject(false);
    }
  };

  const handleScoreEmail = async () => {
    setIsScoring(true);
    try {
      const result = await emailService.scoreEmail(content);
      setAiScore(result);
    } catch (error) {
      toast.error('Failed to score email');
    } finally {
      setIsScoring(false);
    }
  };

  const handleSuggestTime = async () => {
    setIsSuggestingTime(true);
    try {
      const result = await emailService.suggestTime(params?.contact?.id);
      setBestTime(result);
    } catch (error) {
      toast.error('Failed to suggest time');
    } finally {
      setIsSuggestingTime(false);
    }
  };

  const handleSend = async (scheduledAt?: string) => {
    if (!to || !subject || !content) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await emailService.sendEmail({
        to,
        subject,
        content,
        contactId: params?.contact?.id,
        dealId: params?.deal?.id,
        scheduledAt
      });
      toast.success(scheduledAt ? `Email scheduled for ${scheduledAt}` : `Email sent to ${to}`);
      composerStore.close();
      resetForm();
    } catch (error) {
      toast.error('Failed to send email');
    }
  };

  const resetForm = () => {
    setTo('');
    setCc('');
    setBcc('');
    setSubject('');
    setContent('');
    setAiVersions([]);
    setAiScore(null);
    setBestTime(null);
    setAdditionalContext('');
  };

  const filteredContacts = contacts.filter(c => 
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className={cn(
      "fixed bottom-0 right-8 z-[200] flex flex-col transition-all duration-300",
      isMinimized ? "h-12 w-80" : "h-[700px] w-[950px]"
    )}>
      {/* Modal Header */}
      <div className="bg-gray-900 text-white p-3 rounded-t-xl flex items-center justify-between cursor-pointer" onClick={() => isMinimized && setIsMinimized(false)}>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold flex items-center gap-2">
            <Mail size={16} className="text-indigo-400" />
            ✉️ Compose Email
          </span>
          <div className="h-4 w-[1px] bg-gray-700 mx-2" />
          <div className="flex items-center gap-2">
            <div 
              className={cn(
                "w-8 h-4 rounded-full relative transition-colors cursor-pointer",
                isAiAssistOn ? "bg-indigo-600" : "bg-gray-600"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setIsAiAssistOn(!isAiAssistOn);
              }}
            >
              <div className={cn(
                "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all",
                isAiAssistOn ? "left-4.5" : "left-0.5"
              )} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
              🤖 AI Assist {isAiAssistOn ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
            {isMinimized ? <Maximize2 size={16} /> : <Minus size={16} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); composerStore.close(); }} className="p-1.5 hover:bg-gray-800 rounded-lg transition-colors">
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="bg-white flex-1 flex border-x border-gray-200 overflow-hidden shadow-2xl">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col border-r border-gray-100 min-w-0">
            {/* Form Fields */}
            <div className="p-4 space-y-3 border-b border-gray-100">
              {/* To Field */}
              <div className="flex items-center gap-2 text-sm relative">
                <span className="text-gray-400 font-medium w-8">To</span>
                <div className="flex-1 relative">
                  <input 
                    type="text" 
                    value={to}
                    onChange={(e) => {
                      setTo(e.target.value);
                      setSearchQuery(e.target.value);
                      setShowContactSearch(true);
                    }}
                    onFocus={() => setShowContactSearch(true)}
                    className="w-full focus:outline-none py-1"
                    placeholder="Search contacts..."
                  />
                  {showContactSearch && searchQuery && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-50 p-2 max-h-48 overflow-y-auto">
                      {filteredContacts.map(c => (
                        <button
                          key={c.id}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-50 flex items-center justify-between group"
                          onClick={() => {
                            setTo(c.email);
                            setShowContactSearch(false);
                            setSearchQuery('');
                          }}
                        >
                          <div>
                            <div className="text-sm font-bold text-gray-900">{c.firstName} {c.lastName}</div>
                            <div className="text-xs text-gray-400">{c.email}</div>
                          </div>
                          <ArrowRight size={14} className="text-gray-300 group-hover:text-indigo-600 transition-colors" />
                        </button>
                      ))}
                      {filteredContacts.length === 0 && (
                        <div className="px-3 py-2 text-xs text-gray-400 italic">No contacts found</div>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setShowCc(!showCc)} className="text-xs font-bold text-gray-400 hover:text-indigo-600">Cc</button>
                  <button onClick={() => setShowBcc(!showBcc)} className="text-xs font-bold text-gray-400 hover:text-indigo-600">Bcc</button>
                </div>
              </div>

              {showCc && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400 font-medium w-8">Cc</span>
                  <input 
                    type="text" 
                    value={cc}
                    onChange={(e) => setCc(e.target.value)}
                    className="flex-1 focus:outline-none py-1"
                  />
                </div>
              )}

              {showBcc && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400 font-medium w-8">Bcc</span>
                  <input 
                    type="text" 
                    value={bcc}
                    onChange={(e) => setBcc(e.target.value)}
                    className="flex-1 focus:outline-none py-1"
                  />
                </div>
              )}

              <div className="h-[1px] bg-gray-100" />

              {/* Subject Field */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 font-medium w-8">Sub</span>
                <input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="flex-1 focus:outline-none py-1 font-bold"
                  placeholder="Subject line"
                />
                {isAiAssistOn && (
                  <button 
                    onClick={handleSuggestSubject}
                    disabled={isSuggestingSubject}
                    className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-indigo-100 transition-all border border-indigo-100"
                  >
                    {isSuggestingSubject ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                    Suggest Subject
                  </button>
                )}
              </div>
            </div>

            {/* Rich Text Editor Placeholder */}
            <div className="flex-1 flex flex-col p-4 relative">
              <div className="flex items-center gap-1 mb-3 border-b border-gray-50 pb-2">
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors"><Bold size={16} /></button>
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors"><Italic size={16} /></button>
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors"><List size={16} /></button>
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors"><LinkIcon size={16} /></button>
                <div className="h-4 w-[1px] bg-gray-200 mx-1" />
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors"><Type size={16} /></button>
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors"><Smile size={16} /></button>
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors"><Paperclip size={16} /></button>
                <div className="h-4 w-[1px] bg-gray-200 mx-1" />
                <button className="p-1.5 hover:bg-gray-100 rounded text-gray-600 transition-colors"><RotateCcw size={16} /></button>
              </div>

              <div className="flex-1 relative">
                <textarea 
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-full resize-none focus:outline-none text-sm leading-relaxed"
                  placeholder="Start writing your email here..."
                />
                {isGenerating && (
                  <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex gap-1">
                        <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-indigo-600 rounded-full" />
                        <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-indigo-600 rounded-full" />
                        <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-indigo-600 rounded-full" />
                      </div>
                      <p className="text-xs font-bold text-indigo-900">AI is drafting...</p>
                    </div>
                  </div>
                )}
              </div>

              {aiVersions.length > 0 && (
                <div className="absolute bottom-4 left-4 right-4 bg-white border border-indigo-100 rounded-xl shadow-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black uppercase tracking-wider text-indigo-600">AI Suggested Versions</p>
                    <div className="flex gap-1">
                      {aiVersions.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedVersionIdx(idx);
                            setSubject(aiVersions[idx].subject);
                            setContent(aiVersions[idx].body);
                          }}
                          className={cn(
                            "w-6 h-6 rounded-md text-[10px] font-bold border transition-all",
                            selectedVersionIdx === idx ? "bg-indigo-600 text-white border-indigo-600" : "bg-gray-50 text-gray-500 border-gray-100"
                          )}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleGenerate}
                      className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 hover:underline"
                    >
                      <RotateCcw size={10} /> Regenerate
                    </button>
                    <div className="h-3 w-[1px] bg-gray-200" />
                    <button 
                      onClick={handleScoreEmail}
                      className="text-[10px] font-bold text-indigo-600 flex items-center gap-1 hover:underline"
                    >
                      <Sparkles size={10} /> Score Email
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-xl overflow-hidden shadow-lg shadow-indigo-100 border border-indigo-600">
                  <button 
                    onClick={() => handleSend()}
                    className="bg-indigo-600 text-white px-6 py-2 text-sm font-bold hover:bg-indigo-700 transition-all flex items-center gap-2"
                  >
                    <Send size={16} />
                    Send Now
                  </button>
                  <div className="w-[1px] h-full bg-indigo-500" />
                  <button 
                    onClick={handleSuggestTime}
                    className="bg-indigo-600 text-white px-3 py-2 hover:bg-indigo-700 transition-all"
                    title="Schedule Send"
                  >
                    <Clock size={16} />
                  </button>
                </div>
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                  <Save size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                  <FileText size={20} />
                </button>
              </div>

              {bestTime && (
                <div className="bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-xl flex items-center gap-2 max-w-[250px]">
                  <Sparkles size={14} className="text-emerald-600 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-black text-emerald-700">🤖 Best time to send: {bestTime.bestTime}</p>
                    <p className="text-[9px] text-emerald-600 leading-tight line-clamp-1">{bestTime.reason}</p>
                  </div>
                  <button 
                    onClick={() => handleSend(bestTime.bestTime)}
                    className="text-[10px] font-bold text-white bg-emerald-600 px-2 py-0.5 rounded-md hover:bg-emerald-700"
                  >
                    Schedule
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* AI Assist Sidebar */}
          {isAiAssistOn && (
            <div className="w-[300px] flex flex-col bg-gray-50/50 border-l border-gray-100">
              <div className="p-4 border-b border-gray-100 bg-white">
                <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                  <Sparkles size={16} className="text-indigo-600" />
                  🤖 AI Writing Assistant
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Option 1: Generate from Scratch */}
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Option 1: Generate from scratch</p>
                  <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500">Email Type</label>
                      <select 
                        value={emailType}
                        onChange={(e) => setEmailType(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-lg py-1.5 px-2 text-xs font-bold outline-none"
                      >
                        <option>Follow-up after meeting</option>
                        <option>Follow-up after demo</option>
                        <option>Send proposal</option>
                        <option>Check in / Touch base</option>
                        <option>Introduction</option>
                        <option>Thank you</option>
                        <option>Re-engagement (gone cold)</option>
                        <option>Custom</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500">Tone</label>
                      <select 
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-lg py-1.5 px-2 text-xs font-bold outline-none"
                      >
                        <option>Professional</option>
                        <option>Friendly</option>
                        <option>Formal</option>
                        <option>Casual</option>
                        <option>Urgent</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500">Length</label>
                      <select 
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-lg py-1.5 px-2 text-xs font-bold outline-none"
                      >
                        <option>Short (2-3 sentences)</option>
                        <option>Medium (1-2 paragraphs)</option>
                        <option>Long (detailed)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-500">Additional context</label>
                      <textarea 
                        value={additionalContext}
                        onChange={(e) => setAdditionalContext(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-lg py-1.5 px-2 text-xs min-h-[60px] resize-none outline-none"
                        placeholder="Include mention of 15% discount..."
                      />
                    </div>

                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full bg-indigo-600 text-white py-2 rounded-lg text-xs font-black flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50"
                    >
                      {isGenerating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                      Generate Email
                    </button>
                  </div>
                </div>

                {/* Option 2: Improve Existing */}
                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Option 2: Improve existing text</p>
                  <div className="grid grid-cols-1 gap-2">
                    {[ 
                      { label: 'Make it shorter', icon: <Minimize2 size={12} />, action: 'shorter' },
                      { label: 'Make it more formal', icon: <FileText size={12} />, action: 'formal' },
                      { label: 'Make it friendlier', icon: <Smile size={12} />, action: 'friendly' },
                      { label: 'Fix grammar & spelling', icon: <CheckCircle2 size={12} />, action: 'grammar' },
                      { label: 'Add call-to-action', icon: <Plus size={12} />, action: 'cta' },
                    ].map(item => (
                      <button
                        key={item.label}
                        onClick={() => handleImprove(item.action)}
                        className="bg-white border border-gray-100 rounded-xl p-2.5 text-left flex items-center gap-3 hover:bg-indigo-50 hover:border-indigo-100 group transition-all"
                      >
                        <div className="bg-gray-50 p-1.5 rounded-lg text-gray-400 group-hover:bg-white group-hover:text-indigo-600 transition-all">
                          {item.icon}
                        </div>
                        <span className="text-[11px] font-bold text-gray-700 group-hover:text-indigo-900">{item.label}</span>
                      </button>
                    ))}
                    <div className="relative">
                      <Languages size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select 
                        className="w-full bg-white border border-gray-100 rounded-xl py-2 pl-8 pr-2 text-[11px] font-bold outline-none"
                        onChange={(e) => handleImprove({ action: 'translate', language: e.target.value } as any)}
                        defaultValue=""
                      >
                        <option value="" disabled>Translate to...</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                        <option>Japanese</option>
                        <option>Chinese</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Option 3: AI Scoring Results */}
                {aiScore && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Option 3: Email Score</p>
                    <div className="bg-indigo-900 text-white rounded-2xl p-4 space-y-3 shadow-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold opacity-80">Email Score</span>
                        <span className="text-lg font-black">{aiScore.score}/10</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${aiScore.score * 10}%` }}
                          className="h-full bg-emerald-400"
                        />
                      </div>
                      <div className="space-y-2 pt-2">
                        {aiScore.feedback.map((f, i) => (
                          <div key={i} className="text-[10px] font-bold leading-tight flex gap-2">
                            <span className="opacity-80">•</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Plus = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
