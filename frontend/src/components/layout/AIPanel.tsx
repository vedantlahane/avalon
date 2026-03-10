import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Sparkles, Send, Trash2, Copy, ThumbsUp, ThumbsDown, Maximize2, Minimize2, Mic, Paperclip, Terminal } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { cn } from '../../lib/utils';
import { toast } from 'react-hot-toast';

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
  } as any); // Use any to bypass version-specific type issues if any

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
    }
    scrollToBottom();
  }, [isOpen, messages]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || status !== 'ready') return;
    
    sendMessage({ text: input });
    setInput('');
  };

  const handleQuickAction = (action: string) => {
    sendMessage({ text: action });
  };

  const clearConversation = () => {
    setMessages([]);
    toast.success('Conversation cleared');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
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
    { label: 'Find a contact', icon: '👤' },
  ];

  if (!isOpen) return null;

  return (
    <div 
      className={cn(
        "fixed right-0 top-0 h-screen bg-white border-l border-gray-200 shadow-2xl transition-all duration-300 ease-in-out z-50 flex flex-col",
        isFullScreen ? "w-full" : "w-[350px]"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 leading-none">NexusCRM AI Assistant</h3>
            <div className="flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setIsFullScreen(!isFullScreen)} 
            className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400"
            title={isFullScreen ? "Minimize" : "Full Screen"}
          >
            {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button 
            onClick={clearConversation} 
            className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400"
            title="Clear Chat"
          >
            <Trash2 size={16} />
          </button>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-md text-gray-400">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scrollbar-hide">
        {messages.length === 0 && (
          <div className="py-8 space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Sparkles size={20} />
                  </div>
                  <div>
                      <p className="font-semibold text-gray-900">Welcome! I'm your AI assistant.</p>
                      <p className="text-sm text-gray-500">I can help you with your daily tasks.</p>
                  </div>
              </div>
              <ul className="space-y-2 mb-6">
                  {['Query your CRM data', 'Draft emails & messages', 'Analyze deals & contacts', 'Create tasks & activities', 'Get AI-powered insights'].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="text-indigo-500 mt-1">•</span>
                          <span>{item}</span>
                      </li>
                  ))}
              </ul>
              <p className="text-sm font-medium text-gray-900 mb-3">Try asking me something!</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, i) => (
                    <button
                        key={i}
                        onClick={() => handleQuickAction(action.label)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-700 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm"
                    >
                        {action.icon} {action.label}
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
                  ? "bg-indigo-600 text-white rounded-tr-none" 
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
              )}
            >
              <div className="whitespace-pre-wrap leading-relaxed">
                {getMessageText(message)}
              </div>
              
              {message.role === 'assistant' && (
                <div className="absolute right-0 -bottom-6 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                        onClick={() => copyToClipboard(getMessageText(message))}
                        className="p-1 hover:bg-gray-100 rounded text-gray-400"
                    >
                        <Copy size={12} />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400">
                        <ThumbsUp size={12} />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded text-gray-400">
                        <ThumbsDown size={12} />
                    </button>
                </div>
              )}
            </div>
          </div>
        ))}

        {(status === 'submitted' || status === 'streaming') && (
            <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                    <Bot size={16} />
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                    <div className="flex gap-1 items-center h-5">
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                </div>
                <button 
                  onClick={() => stop()}
                  className="mt-2 text-[10px] text-red-500 hover:text-red-700 font-bold uppercase tracking-widest px-2 py-1 rounded border border-red-100"
                >
                  Stop
                </button>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400">
            <Mic size={16} className="hover:text-indigo-600 cursor-pointer" />
            <Paperclip size={16} className="hover:text-indigo-600 cursor-pointer" />
          </div>
          <input 
            ref={inputRef}
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="💬 Ask me anything..."
            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-14 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-gray-400"
            disabled={status !== 'ready' && status !== 'error'}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <div className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-gray-100 rounded border border-gray-200 text-[10px] text-gray-400 font-mono">
                <Terminal size={10} />
                <span>⌘K</span>
            </div>
            <button 
                type="submit"
                disabled={!input.trim() || (status !== 'ready' && status !== 'error')}
                className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                    input.trim() ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" : "bg-gray-100 text-gray-400"
                )}
            >
                <Send size={14} fill={input.trim() ? "currentColor" : "none"} />
            </button>
          </div>
        </form>
        <p className="mt-2 text-[10px] text-center text-gray-400">
            AI can make mistakes. Please verify important information.
        </p>
      </div>
    </div>
  );
};
