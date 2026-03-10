import React, { useEffect, useState } from 'react';
import { 
  X, 
  Building2, 
  User, 
  Calendar, 
  BadgeDollarSign,
  TrendingUp,
  AlertCircle,
  Clock,
  Mail,
  Phone,
  MessageSquare,
  ChevronRight,
  MoreVertical,
  Zap,
  Edit2,
  Plus,
  Package,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Deal, Activity, LineItem } from '../../types';
import { dealService } from '../../services/deal.service';
import { format } from 'date-fns';

interface DealDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  dealId: number | null;
  onEdit: (deal: Deal) => void;
}

export const DealDetailDrawer: React.FC<DealDetailDrawerProps> = ({ isOpen, onClose, dealId, onEdit }) => {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'Overview' | 'Timeline' | 'Tasks'>('Overview');

  useEffect(() => {
    if (isOpen && dealId) {
      setIsLoading(true);
      dealService.getDealById(dealId).then(data => {
        if (data) setDeal(data);
        setIsLoading(false);
      }).catch(err => {
        console.error(err);
        setIsLoading(false);
      });
    }
  }, [isOpen, dealId]);

  if (!deal && isLoading) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[600px] bg-gray-50 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="bg-white p-6 border-b border-gray-100 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className={cn(
                  "px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest border",
                  deal?.stage === 'Closed Won' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                  deal?.stage === 'Closed Lost' ? "bg-red-50 text-red-600 border-red-100" :
                  "bg-indigo-50 text-indigo-600 border-indigo-100"
                )}>
                  {deal?.stage}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => deal && onEdit(deal)}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-indigo-600 transition-all"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all">
                    <MoreVertical size={18} />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-black text-gray-900 leading-tight">{deal?.name}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="text-2xl font-black text-indigo-600">
                    {deal?.currency || '$'}{deal?.value.toLocaleString()}
                  </div>
                  <div className="w-[1px] h-4 bg-gray-200" />
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-500">
                    <TrendingUp size={16} className="text-emerald-500" />
                    <span>{deal?.probability}% Win Probability</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2">
                <button className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200">
                  <Mail size={14} />
                  <span>Send Email</span>
                </button>
                <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  <Phone size={14} />
                  <span>Log Call</span>
                </button>
                <button className="flex-1 bg-white border border-gray-200 text-gray-700 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  <MessageSquare size={14} />
                  <span>Add Note</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-100 flex px-6 sticky top-0 z-10">
              {['Overview', 'Timeline', 'Tasks'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={cn(
                    "px-4 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all",
                    activeTab === tab ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {activeTab === 'Overview' && (
                <>
                  {/* AI Insight Card */}
                  <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-5 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Zap size={80} fill="white" />
                    </div>
                    <div className="flex items-center gap-2 mb-3 relative">
                      <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-md">
                        <Zap size={16} fill="white" />
                      </div>
                      <h4 className="text-sm font-black uppercase tracking-widest">AI Opportunity Insight</h4>
                    </div>
                    <p className="text-sm font-medium leading-relaxed opacity-90 relative">
                      "Based on industry data and {deal?.company?.name || 'the company'}'s profile, similar deals closed within 45 days. Suggest focusing on the {deal?.lineItems?.[0]?.productName || 'core'} package which has a higher success rate."
                    </p>
                    <button className="mt-4 w-full bg-white text-indigo-600 py-2 rounded-xl text-xs font-black hover:bg-indigo-50 transition-all shadow-lg relative">
                      View Similar Won Deals
                    </button>
                  </div>

                  {/* Details Card */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6 shadow-sm">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Deal Details</h4>
                    
                    <div className="grid grid-cols-2 gap-y-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                          <Building2 size={12} />
                          Company
                        </p>
                        <p className="text-sm font-bold text-gray-900">{deal?.company?.name || 'No Company'}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                          <User size={12} />
                          Contact
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {deal?.contact ? `${deal.contact.firstName} ${deal.contact.lastName}` : 'No Contact'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                          <Calendar size={12} />
                          Expected Close
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {deal?.expectedCloseDate ? format(new Date(deal.expectedCloseDate), 'MMM d, yyyy') : 'TBD'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                          <AlertCircle size={12} />
                          Priority
                        </p>
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-black uppercase",
                          deal?.priority === 'High' || deal?.priority === 'Critical' ? "bg-red-50 text-red-600 border border-red-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                        )}>
                          {deal?.priority}
                        </div>
                      </div>
                    </div>

                    {/* Competitors */}
                    {deal?.competitors && deal.competitors.length > 0 && (
                      <div className="pt-6 border-t border-gray-50 space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                          <ShieldAlert size={12} />
                          Competitors
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {deal.competitors.map(comp => (
                            <span key={comp} className="px-2 py-1 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-gray-600 uppercase">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Line Items */}
                    {deal?.lineItems && deal.lineItems.length > 0 && (
                      <div className="pt-6 border-t border-gray-50 space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                          <Package size={12} />
                          Products/Line Items
                        </p>
                        <div className="space-y-2">
                          {deal.lineItems.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                              <div>
                                <p className="text-xs font-bold text-gray-900">{item.productName}</p>
                                <p className="text-[10px] text-gray-500">{item.quantity} x {deal.currency || '$'}{item.unitPrice.toLocaleString()}</p>
                              </div>
                              <div className="text-xs font-black text-gray-900">
                                {deal.currency || '$'}{item.total.toLocaleString()}
                              </div>
                            </div>
                          ))}
                          <div className="flex justify-between items-center px-3 pt-2">
                            <span className="text-[10px] font-black uppercase text-gray-400">Total Value</span>
                            <span className="text-sm font-black text-indigo-600">{deal.currency || '$'}{deal.value.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="pt-6 border-t border-gray-50 space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                        <MessageSquare size={12} />
                        Notes
                      </p>
                      <p className="text-sm text-gray-600 leading-relaxed italic">
                        {deal?.notes || 'No notes added for this deal yet.'}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'Timeline' && (
                <div className="space-y-6">
                  {/* Timeline logic would go here */}
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                      <Clock size={32} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">No activity logged yet</h4>
                      <p className="text-xs text-gray-500 mt-1">Start by sending an email or logging a call.</p>
                    </div>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-100">
                      Log First Activity
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'Tasks' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Active Tasks</h4>
                    <button className="text-xs font-bold text-indigo-600 flex items-center gap-1">
                      <Plus size={14} />
                      Add Task
                    </button>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center space-y-3">
                    <p className="text-sm text-gray-500">All tasks completed! 🎉</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-white border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Owner</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold border border-indigo-200">
                    ME
                  </div>
                  <span className="text-xs font-bold text-gray-900">Me</span>
                </div>
              </div>
              <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1">
                View Detailed Analytics
                <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};