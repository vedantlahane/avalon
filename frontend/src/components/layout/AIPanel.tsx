import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Sparkles, Send, Trash2, Maximize2, Minimize2, Mic, Paperclip, Terminal, Brain, ChevronLeft, MoreVertical } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useHelpStore } from '@/lib/help-store';

interface AIPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIPanel: React.FC<AIPanelProps> = ({ isOpen, onClose }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, stop, setMessages } = useChat({
    transport: new DefaultChatTransport({
        api: `${import.meta.env.VITE_API_BASE_URL}/ai/chat`
    })
  } as any);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
    }
    scrollToBottom();
  }, [isOpen, messages]);

  const { openHelp } = useHelpStore();

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || status !== 'ready') return;
    
    const lowerInput = input.trim().toLowerCase();
    if (lowerInput === 'help' || lowerInput.startsWith('how do i')) {
      openHelp();
      setInput('');
      return;
    }
    
    sendMessage({ text: input });
    setInput('');
  };

  const getMessageText = (message: any): string => {
    let fullText = message.content || '';
    const parts = message.parts || [];
    if (parts.length > 0) {
        fullText = parts
            .filter((part: any) => part.type === 'text')
            .map((part: any) => part.text)
            .join('');
    }
    return fullText;
  };

  const quickActions = [
    { label: 'Pipeline summary', icon: '📊' },
    { label: 'Today\'s priorities', icon: '🎯' },
    { label: 'Draft an email', icon: '✉️' },
    { label: 'Deals at risk', icon: '⚠️' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={cn(
            "fixed right-0 top-0 h-screen bg-card shadow-2xl z-50 flex flex-col transition-all duration-300",
            isFullScreen || window.innerWidth < 768 ? "w-full" : "w-[400px] border-l border-border"
          )}
        >
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between bg-primary text-primary-foreground shrink-0 h-[52px] md:h-auto">
            <div className="flex items-center gap-3">
              <button 
                onClick={onClose} 
                className="md:hidden p-2 -ml-2 hover:bg-white/10 rounded-xl transition-colors text-white"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="hidden md:flex w-10 h-10 bg-white/20 rounded-2xl items-center justify-center backdrop-blur-md border border-white/10">
                <Brain size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">AI Assistant</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] text-primary-foreground/80 font-black uppercase tracking-widest opacity-80">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setIsFullScreen(!isFullScreen)} 
                className="hidden md:block p-2 hover:bg-white/10 rounded-xl transition-colors text-white"
              >
                {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button onClick={onClose} className="hidden md:block p-2 hover:bg-white/10 rounded-xl transition-colors text-white">
                <X size={20} />
              </button>
              <button className="md:hidden p-2 hover:bg-white/10 rounded-xl transition-colors text-white">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-muted/20 custom-scrollbar">
            {messages.length === 0 && (
              <div className="space-y-6 page-fade-in">
                <div className="bg-card border border-border rounded-3xl p-6 shadow-sm border-b-4 border-b-primary/20">
                  <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/10">
                          <Sparkles size={24} />
                      </div>
                      <div>
                          <p className="font-bold text-foreground">Good morning! 👋</p>
                          <p className="text-sm text-muted-foreground">Here are your priorities for today...</p>
                      </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {quickActions.map((action, i) => (
                        <button
                            key={i}
                            onClick={() => { setInput(action.label); }}
                            className="flex items-center gap-3 w-full p-3 bg-muted/50 rounded-2xl text-sm font-bold text-foreground hover:bg-primary/10 hover:text-primary transition-all border border-transparent hover:border-primary/20 group ripple"
                        >
                            <span className="text-lg group-hover:scale-110 transition-transform">{action.icon}</span>
                            <span>{action.label}</span>
                        </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {messages.map((message: any) => (
              <div key={message.id} className={cn("flex flex-col", message.role === 'user' ? "items-end" : "items-start")}>
                <div 
                  className={cn(
                    "max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm relative group",
                    message.role === 'user' 
                      ? "bg-primary text-primary-foreground rounded-tr-none" 
                      : "bg-card text-foreground border border-border rounded-tl-none border-l-4 border-l-indigo-500"
                  )}
                >
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {getMessageText(message)}
                  </div>
                </div>
                {message.role !== 'user' && (
                  <div className="mt-2 flex gap-2">
                    <button className="px-3 py-1.5 bg-muted rounded-full text-[10px] font-bold text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                      Email Sarah
                    </button>
                    <button className="px-3 py-1.5 bg-muted rounded-full text-[10px] font-bold text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors">
                      View Quantum Deal
                    </button>
                  </div>
                )}
              </div>
            ))}

            {(status === 'submitted' || status === 'streaming') && (
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-primary/20">
                        <Brain size={14} className="text-primary-foreground" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                        <div className="flex gap-1.5 items-center h-5">
                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 md:p-6 bg-card border-t border-border shrink-0 pb-safe">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <button type="button" className="p-2 text-muted-foreground hover:bg-muted rounded-xl transition-colors">
                <Paperclip size={20} />
              </button>
              <div className="relative flex-1 group">
                <input 
                  ref={inputRef}
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="w-full bg-muted/50 border border-border rounded-2xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary text-foreground transition-all group-hover:bg-card"
                  disabled={status !== 'ready' && status !== 'error'}
                />
                <button 
                    type="submit"
                    disabled={!input.trim() || (status !== 'ready' && status !== 'error')}
                    className={cn(
                        "absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-md active:scale-90",
                        input.trim() ? "bg-primary text-primary-foreground shadow-primary/20" : "bg-muted text-muted-foreground"
                    )}
                >
                    <Send size={16} fill={input.trim() ? "currentColor" : "none"} />
                </button>
              </div>
              <button type="button" className="p-2.5 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/20 active:scale-90 transition-all">
                <Mic size={20} />
              </button>
            </form>
            <div className="hidden md:flex mt-4 items-center justify-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                <div className="flex items-center gap-1">
                    <Terminal size={10} />
                    <span>Ctrl + K</span>
                </div>
                <span>•</span>
                <span>Nexus AI v2.0</span>
            </div>
          </div>
        </motion.div>

      )}
    </AnimatePresence>
  );
};