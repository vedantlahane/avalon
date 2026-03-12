import React, { useEffect, useState, useMemo } from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  X, 
  Building2, 
  User, 
  Calendar, 
  BadgeDollarSign,
  TrendingUp,
  AlertCircle,
  Loader2,
  Trash2,
  Plus,
  Sparkles,
  Minus,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';
import { toast } from 'react-hot-toast';
import { cn } from '../../lib/utils';
import { Deal, DealStage, DealPriority, Company, Contact } from '../../types';
import { companyService } from '../../services/company.service';
import { contactService } from '../../services/contact.service';
import { dealService } from '../../services/deal.service';
import { format, addDays } from 'date-fns';

const lineItemSchema = z.object({
  productName: z.string().min(1, 'Product name is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  unitPrice: z.number().min(0, 'Unit price must be positive'),
  total: z.number(),
});

const dealSchema = z.object({
  name: z.string().min(1, 'Deal name is required'),
  value: z.number().min(0.01, 'Value must be greater than 0'),
  currency: z.string(),
  stage: z.string().min(1, 'Stage is required'),
  probability: z.number().min(0).max(100),
  contactId: z.number().nullable().refine(v => v !== null, 'Contact is required'),
  companyId: z.number().nullable(),
  expectedCloseDate: z.string().min(1, 'Expected close date is required'),
  priority: z.string().min(1, 'Priority is required'),
  notes: z.string().optional(),
  competitors: z.array(z.string()),
  lineItems: z.array(lineItemSchema),
  owner: z.string(),
});

const STAGES: { value: DealStage; color: string }[] = [
  { value: 'Lead', color: '#9CA3AF' },
  { value: 'Qualified', color: '#3B82F6' },
  { value: 'Discovery', color: '#6366F1' },
  { value: 'Proposal', color: '#8B5CF6' },
  { value: 'Negotiation', color: '#F59E0B' },
  { value: 'Closed Won', color: '#10B981' },
  { value: 'Closed Lost', color: '#EF4444' },
];

const PRIORITIES: { value: DealPriority; emoji: string }[] = [
  { value: 'Low', emoji: '🟢' },
  { value: 'Medium', emoji: '🟡' },
  { value: 'High', emoji: '🟠' },
  { value: 'Critical', emoji: '🔴' },
];

const CURRENCIES = ['USD', 'EUR', 'GBP', 'INR'];

const STAGE_PROBABILITIES: Record<string, number> = {
  'Lead': 10,
  'Qualified': 25,
  'Discovery': 40,
  'Proposal': 60,
  'Negotiation': 80,
  'Closed Won': 100,
  'Closed Lost': 0
};

interface DealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  dealId?: number;
  initialStage?: DealStage;
}

export const DealModal: React.FC<DealModalProps> = ({ isOpen, onClose, onSuccess, dealId, initialStage }) => {
  const [deal, setDeal] = useState<Deal | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isAiAssisting, setIsAiAssisting] = useState(false);
  const [competitorInput, setCompetitorInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<any>({
    resolver: zodResolver(dealSchema) as any,
    defaultValues: {
      name: '',
      value: 0,
      currency: 'USD',
      stage: initialStage || 'Lead',
      probability: STAGE_PROBABILITIES[initialStage || 'Lead'],
      contactId: null,
      companyId: null,
      expectedCloseDate: '',
      priority: 'Medium',
      notes: '',
      competitors: [],
      lineItems: [],
      owner: 'Me',
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'lineItems',
  });

  const watchedLineItems = watch('lineItems');
  const watchedStage = watch('stage');
  const watchedProbability = watch('probability');
  const watchedCompanyId = watch('companyId');
  const watchedContactId = watch('contactId');
  const watchedCompetitors = watch('competitors') || [];

  // Load deal if ID is provided
  useEffect(() => {
    const loadDeal = async () => {
      if (dealId && isOpen) {
        setIsLoadingData(true);
        try {
          const data = await dealService.getDealById(dealId);
          if (data) {
            setDeal(data);
            reset({
              name: data.name,
              value: data.value,
              currency: data.currency,
              stage: data.stage,
              probability: data.probability || 0,
              contactId: data.contactId || null,
              companyId: data.companyId || null,
              expectedCloseDate: data.expectedCloseDate ? new Date(data.expectedCloseDate).toISOString().split('T')[0] : '',
              priority: data.priority,
              notes: data.notes || '',
              competitors: data.competitors || [],
              lineItems: data.lineItems || [],
              owner: data.owner || 'Me',
            });
          }
        } catch (error) {
          console.error('Error loading deal:', error);
        } finally {
          setIsLoadingData(false);
        }
      } else if (!dealId && isOpen) {
        setDeal(null);
        reset({
          name: '',
          value: 0,
          currency: 'USD',
          stage: initialStage || 'Lead',
          probability: STAGE_PROBABILITIES[initialStage || 'Lead'],
          contactId: null,
          companyId: null,
          expectedCloseDate: '',
          priority: 'Medium',
          notes: '',
          competitors: [],
          lineItems: [],
          owner: 'Me',
        });
      }
    };
    loadDeal();
  }, [dealId, isOpen, initialStage, reset]);

  const handleAiAssist = () => {
    if (!watchedContactId) {
      toast.error('Please select a contact first for AI Assist');
      return;
    }

    const contact = contacts.find((c: any) => c.id === watchedContactId);
    if (!contact) return;

    setIsAiAssisting(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      const suggestedValue = 105000;
      const suggestedDate = format(addDays(new Date(), 45), 'yyyy-MM-dd');
      
      toast.success(
        <div className="flex flex-col gap-1">
          <p className="font-bold">🤖 AI Suggestions for {contact.firstName}:</p>
          <ul className="text-xs space-y-1 mt-1 opacity-90">
            <li>• Value: $80k - $150k (Avg: $105k)</li>
            <li>• Products: Enterprise Plan, API Access</li>
            <li>• Timeline: 45-60 days</li>
          </ul>
        </div>,
        { duration: 5000 }
      );

      setValue('value', suggestedValue);
      setValue('expectedCloseDate', suggestedDate);
      
      // Auto-add suggested products to line items if empty
      if (fields.length === 0) {
        append({ productName: 'Enterprise Plan', quantity: 1, unitPrice: 85000, total: 85000 });
        append({ productName: 'API Access', quantity: 1, unitPrice: 20000, total: 20000 });
      }

      setIsAiAssisting(false);
    }, 1500);
  };

  const saveDeal = async (data: any, addAnother: boolean = false) => {
    try {
      const dealData = {
        ...data,
        contactId: data.contactId || undefined,
        companyId: data.companyId || undefined,
        stage: data.stage as DealStage,
        priority: data.priority as DealPriority,
        expectedCloseDate: data.expectedCloseDate ? new Date(data.expectedCloseDate).toISOString() : undefined,
      };

      if (deal) {
        await dealService.updateDeal(deal.id, dealData as any);
        toast.success('Deal updated successfully');
      } else {
        await dealService.createDeal(dealData as any);
        toast.success('Deal created successfully');
      }
      
      onSuccess();
      
      if (addAnother) {
        reset({
          name: '',
          value: 0,
          currency: 'USD',
          stage: 'Lead',
          probability: 10,
          contactId: null,
          companyId: null,
          expectedCloseDate: '',
          priority: 'Medium',
          notes: '',
          competitors: [],
          lineItems: [],
          owner: 'Me',
        });
      } else {
        onClose();
      }
    } catch (error) {
      console.error('Error saving deal:', error);
      toast.error('Failed to save deal');
    }
  };

  const onSubmit: SubmitHandler<any> = (data) => saveDeal(data, false);

  const handleAddCompetitor = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && competitorInput.trim()) {
      e.preventDefault();
      if (!watchedCompetitors.includes(competitorInput.trim())) {
        setValue('competitors', [...watchedCompetitors, competitorInput.trim()]);
      }
      setCompetitorInput('');
    }
  };

  const removeCompetitor = (comp: string) => {
    setValue('competitors', watchedCompetitors.filter((c: any) => c !== comp));
  };

  const getProbabilityColor = (prob: number) => {
    if (prob <= 30) return 'bg-rose-500';
    if (prob <= 60) return 'bg-amber-500';
    return 'bg-emerald-500';
  };

  const contactOptions = useMemo(() => contacts.map(c => ({
    value: c.id,
    label: `${c.firstName} ${c.lastName}`,
    email: c.email,
    company: c.company?.name || 'No Company'
  })), [contacts]);

  const companyOptions = useMemo(() => companies.map(c => ({
    value: c.id,
    label: c.name,
  })), [companies]);

  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: '#F9FAFB',
      border: state.isFocused ? '1px solid #6366F1' : '1px solid #F3F4F6',
      borderRadius: '0.75rem',
      padding: '2px',
      fontSize: '0.875rem',
      boxShadow: state.isFocused ? '0 0 0 4px rgba(99, 102, 241, 0.1)' : 'none',
      '&:hover': {
        borderColor: '#6366F1'
      }
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#6366F1' : state.isFocused ? '#EEF2FF' : 'white',
      color: state.isSelected ? 'white' : '#1F2937',
      padding: '8px 12px',
      fontSize: '0.875rem',
    })
  };

  const suggestedCloseDate = format(addDays(new Date(), 45), 'MMM d, yyyy');

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
            className="fixed top-0 right-0 h-full w-full max-w-[550px] bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                  <X size={20} />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {deal ? 'Edit Deal' : 'Add New Deal'}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAiAssist}
                  disabled={isAiAssisting}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
                >
                  {isAiAssisting ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                  <span>🤖 AI Assist</span>
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
              {/* Section 1: Deal Information */}
              <section className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <BadgeDollarSign size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 tracking-tight">Deal Information</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 flex justify-between">
                      <span>Deal Name*</span>
                      {!deal && watchedCompanyId && (
                        <span className="text-indigo-600 flex items-center gap-1 font-medium animate-pulse">
                          <Sparkles size={10} /> Suggested from company
                        </span>
                      )}
                    </label>
                    <input
                      {...register('name')}
                      className={cn(
                        "w-full bg-gray-50 border rounded-xl py-2.5 px-4 text-sm focus:outline-none transition-all",
                        errors.name ? "border-rose-300 focus:ring-rose-500/10 focus:border-rose-500" : "border-gray-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                      )}
                      placeholder="e.g. Acme - Enterprise Plan"
                    />
                    {errors.name && <p className="text-[10px] font-bold text-rose-500">{errors.name.message as string}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Deal Value*</label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                        <input
                          type="number"
                          step="0.01"
                          {...register('value', { valueAsNumber: true })}
                          className={cn(
                            "w-full bg-gray-50 border rounded-xl py-2.5 pl-8 pr-4 text-sm focus:outline-none transition-all font-bold",
                            errors.value ? "border-rose-300 focus:ring-rose-500/10 focus:border-rose-500" : "border-gray-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                          )}
                          placeholder="0.00"
                        />
                      </div>
                      {errors.value && <p className="text-[10px] font-bold text-rose-500">{errors.value.message as string}</p>}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Currency</label>
                      <select
                        {...register('currency')}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-indigo-500/10 focus:border-indigo-500"
                      >
                        {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Pipeline Stage</label>
                      <div className="relative">
                        <select
                          {...register('stage')}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 text-sm outline-none appearance-none focus:ring-indigo-500/10 focus:border-indigo-500"
                        >
                          {STAGES.map(s => (
                            <option key={s.value} value={s.value}>
                              {s.value}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full" 
                            style={{ backgroundColor: STAGES.find(s => s.value === watchedStage)?.color }} 
                          />
                          <ChevronDown size={14} className="text-gray-400" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-gray-700">Priority</label>
                      <select
                        {...register('priority')}
                        className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-indigo-500/10 focus:border-indigo-500"
                      >
                        {PRIORITIES.map(p => (
                          <option key={p.value} value={p.value}>{p.emoji} {p.value}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Associations */}
              <section className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <User size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 tracking-tight">Associations</h3>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-gray-700">Contact*</label>
                      <button type="button" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">+ Create New Contact</button>
                    </div>
                    <Select
                      options={contactOptions}
                      placeholder="Search contacts..."
                      styles={customSelectStyles}
                      value={contactOptions.find(o => o.value === watchedContactId)}
                      onChange={(option) => setValue('contactId', option ? option.value : null)}
                      formatOptionLabel={(option: any) => (
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{option.label}</span>
                          <span className="text-[10px] text-gray-400">{option.email} • {option.company}</span>
                        </div>
                      )}
                    />
                    {errors.contactId && <p className="text-[10px] font-bold text-rose-500">{errors.contactId.message as string}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Company</label>
                    <Select
                      options={companyOptions}
                      placeholder="Search companies..."
                      styles={customSelectStyles}
                      value={companyOptions.find(o => o.value === watchedCompanyId)}
                      onChange={(option) => setValue('companyId', option ? option.value : null)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Deal Owner</label>
                    <select
                      {...register('owner')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 text-sm outline-none focus:ring-indigo-500/10 focus:border-indigo-500"
                    >
                      <option value="Me">Me (Alex Smith)</option>
                      <option value="Sarah Johnson">Sarah Johnson</option>
                      <option value="Mike Peters">Mike Peters</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Section 3: Timeline */}
              <section className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                    <Calendar size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 tracking-tight">Timeline</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Expected Close Date*</label>
                    <input
                      type="date"
                      {...register('expectedCloseDate')}
                      className={cn(
                        "w-full bg-gray-50 border rounded-xl py-2.5 px-4 text-sm focus:outline-none transition-all",
                        errors.expectedCloseDate ? "border-rose-300 focus:ring-rose-500/10 focus:border-rose-500" : "border-gray-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                      )}
                    />
                    <p className="text-[10px] text-indigo-600 font-bold mt-1 flex items-center gap-1">
                      <Sparkles size={10} /> Suggested: {suggestedCloseDate}
                    </p>
                    {errors.expectedCloseDate && <p className="text-[10px] font-bold text-rose-500">{errors.expectedCloseDate.message as string}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-400">Created Date</label>
                    <input
                      type="text"
                      readOnly
                      value={format(new Date(), 'yyyy-MM-dd')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 text-sm outline-none text-gray-400 cursor-not-allowed"
                    />
                  </div>
                </div>
              </section>

              {/* Section 4: Additional Details */}
              <section className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
                    <TrendingUp size={18} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 tracking-tight">Additional Details</h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-gray-700">Win Probability</label>
                      <span className={cn(
                        "text-xs font-black px-2 py-0.5 rounded text-white transition-colors",
                        getProbabilityColor(watchedProbability)
                      )}>
                        {watchedProbability}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      {...register('probability', { valueAsNumber: true })}
                      className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Competitors</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {watchedCompetitors.map((comp: any) => (
                        <span key={comp} className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-[10px] font-bold">
                          {comp}
                          <button type="button" onClick={() => removeCompetitor(comp)} className="text-gray-400 hover:text-rose-500">
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={competitorInput}
                      onChange={(e) => setCompetitorInput(e.target.value)}
                      onKeyDown={handleAddCompetitor}
                      placeholder="Add competitor and press Enter..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-indigo-500/10 focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Notes</label>
                    <textarea
                      {...register('notes')}
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none"
                      placeholder="Key takeaways, blockers, or strategy..."
                    />
                  </div>
                </div>
              </section>

              {/* Section 5: Products/Line Items */}
              <section className="space-y-6 pb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                      <Plus size={18} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 tracking-tight">Products/Line Items</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => append({ productName: '', quantity: 1, unitPrice: 0, total: 0 })}
                    className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 font-bold text-xs"
                  >
                    <Plus size={14} /> Add Item
                  </button>
                </div>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="p-4 bg-gray-50 border border-gray-100 rounded-xl space-y-3 relative group">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <Minus size={14} />
                      </button>
                      
                      <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12 md:col-span-6 space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Product Name</label>
                          <input
                            {...register(`lineItems.${index}.productName`)}
                            className="w-full bg-white border border-gray-100 rounded-lg py-1.5 px-3 text-sm outline-none focus:border-indigo-300"
                            placeholder="e.g. Enterprise License"
                          />
                        </div>
                        <div className="col-span-4 md:col-span-2 space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Qty</label>
                          <input
                            type="number"
                            {...register(`lineItems.${index}.quantity`, { valueAsNumber: true })}
                            className="w-full bg-white border border-gray-100 rounded-lg py-1.5 px-3 text-sm outline-none focus:border-indigo-300"
                          />
                        </div>
                        <div className="col-span-8 md:col-span-4 space-y-1">
                          <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Price</label>
                          <div className="relative">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">$</span>
                            <input
                              type="number"
                              {...register(`lineItems.${index}.unitPrice`, { valueAsNumber: true })}
                              className="w-full bg-white border border-gray-100 rounded-lg py-1.5 pl-5 pr-3 text-sm outline-none focus:border-indigo-300"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {fields.length === 0 && (
                    <div className="text-center py-6 border-2 border-dashed border-gray-100 rounded-2xl">
                      <p className="text-xs text-gray-400">No products added yet.</p>
                      <button
                        type="button"
                        onClick={() => append({ productName: '', quantity: 1, unitPrice: 0, total: 0 })}
                        className="text-xs text-indigo-600 font-bold mt-2"
                      >
                        + Add your first product
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-white flex items-center justify-between sticky bottom-0 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
              {deal ? (
                <button
                  type="button"
                  onClick={async () => {
                    if (confirm('Delete this deal?')) {
                      await dealService.deleteDeal(deal.id);
                      onSuccess();
                      onClose();
                    }
                  }}
                  className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-bold text-sm transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              )}
              <div className="flex items-center gap-3">
                {!deal && (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmit((data: any) => saveDeal(data, true))}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold text-indigo-600 border border-indigo-100 hover:bg-indigo-50 transition-all disabled:opacity-50"
                  >
                    Save & Add Another
                  </button>
                )}
                <button
                  onClick={handleSubmit((data: any) => saveDeal(data, false))}
                  disabled={isSubmitting}
                  className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                  {deal ? 'Save Changes' : 'Save Deal'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
