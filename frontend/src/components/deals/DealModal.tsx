import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Deal, DealStage, DealPriority, Company, Contact } from '../../types';
import { companyService } from '../../services/company.service';
import { contactService } from '../../services/contact.service';
import { dealService } from '../../services/deal.service';

const dealSchema = z.object({
  name: z.string().min(1, 'Deal name is required'),
  value: z.number().min(0, 'Value must be positive'),
  currency: z.string(),
  stage: z.string().min(1, 'Stage is required'),
  probability: z.number().optional(),
  contactId: z.number().optional().nullable(),
  companyId: z.number().optional().nullable(),
  expectedCloseDate: z.string().optional().nullable(),
  priority: z.string().min(1, 'Priority is required'),
  notes: z.string().optional(),
  owner: z.string(),
});

type DealFormValues = z.infer<typeof dealSchema>;

const STAGES: DealStage[] = ['Lead', 'Qualified', 'Discovery', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];
const PRIORITIES: DealPriority[] = ['Low', 'Medium', 'High', 'Critical'];

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
  deal?: Deal | null;
  initialStage?: DealStage;
}

export const DealModal: React.FC<DealModalProps> = ({ isOpen, onClose, onSuccess, deal, initialStage }) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DealFormValues>({
    resolver: zodResolver(dealSchema),
    defaultValues: deal ? {
      name: deal.name,
      value: deal.value,
      currency: deal.currency,
      stage: deal.stage,
      probability: deal.probability,
      contactId: deal.contactId,
      companyId: deal.companyId,
      expectedCloseDate: deal.expectedCloseDate ? new Date(deal.expectedCloseDate).toISOString().split('T')[0] : '',
      priority: deal.priority,
      notes: deal.notes || '',
      owner: deal.owner || 'Me',
    } : {
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
      owner: 'Me',
    }
  });

  const watchedStage = watch('stage');

  useEffect(() => {
    if (watchedStage && !deal) {
      setValue('probability', STAGE_PROBABILITIES[watchedStage]);
    }
  }, [watchedStage, setValue, deal]);

  useEffect(() => {
    const loadData = async () => {
      setIsLoadingData(true);
      try {
        const [companiesData, contactsData] = await Promise.all([
          companyService.getCompanies(),
          contactService.getContacts()
        ]);
        setCompanies(companiesData);
        setContacts(contactsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoadingData(false);
      }
    };
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && deal) {
      reset({
        name: deal.name,
        value: deal.value,
        currency: deal.currency,
        stage: deal.stage,
        probability: deal.probability,
        contactId: deal.contactId,
        companyId: deal.companyId,
        expectedCloseDate: deal.expectedCloseDate ? new Date(deal.expectedCloseDate).toISOString().split('T')[0] : '',
        priority: deal.priority,
        notes: deal.notes || '',
        owner: deal.owner || 'Me',
      });
    } else if (isOpen) {
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
        owner: 'Me',
      });
    }
  }, [isOpen, deal, initialStage, reset]);

  const onSubmit: SubmitHandler<DealFormValues> = async (data) => {
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
        await dealService.updateDeal(deal.id, dealData);
      } else {
        await dealService.createDeal(dealData);
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving deal:', error);
    }
  };

  const handleDelete = async () => {
    if (!deal) return;
    if (confirm('Are you sure you want to delete this deal?')) {
      try {
        await dealService.deleteDeal(deal.id);
        onSuccess();
        onClose();
      } catch (error) {
        console.error('Error deleting deal:', error);
      }
    }
  };

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
            className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {deal ? 'Edit Deal' : 'Add New Deal'}
                </h2>
                {deal && (
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                    Last modified {new Date(deal.updatedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Basic Information */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <BadgeDollarSign size={16} className="text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Deal Information</h3>
                </div>
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Deal Name*</label>
                  <input
                    {...register('name')}
                    className={cn(
                      "w-full bg-gray-50 border rounded-xl py-2 px-3 text-sm focus:outline-none transition-all",
                      errors.name ? "border-rose-300 focus:ring-rose-500/10 focus:border-rose-500" : "border-gray-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                    )}
                    placeholder="e.g. Acme - Enterprise Plan"
                  />
                  {errors.name && <p className="text-[10px] font-bold text-rose-500">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Value*</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                      <input
                        type="number"
                        {...register('value', { valueAsNumber: true })}
                        className={cn(
                          "w-full bg-gray-50 border rounded-xl py-2 pl-7 pr-3 text-sm focus:outline-none transition-all",
                          errors.value ? "border-rose-300 focus:ring-rose-500/10 focus:border-rose-500" : "border-gray-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                        )}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.value && <p className="text-[10px] font-bold text-rose-500">{errors.value.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Currency</label>
                    <select
                      {...register('currency')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm outline-none"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* Pipeline Stage */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={16} className="text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Pipeline Stage</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Stage*</label>
                    <select
                      {...register('stage')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm outline-none"
                    >
                      {STAGES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Probability (%)</label>
                    <input
                      type="number"
                      {...register('probability', { valueAsNumber: true })}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </section>

              {/* Relationships */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 size={16} className="text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Relationships</h3>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Company</label>
                  <select
                    {...register('companyId', { valueAsNumber: true })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm outline-none"
                  >
                    <option value="">Select Company</option>
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Primary Contact</label>
                  <select
                    {...register('contactId', { valueAsNumber: true })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm outline-none"
                  >
                    <option value="">Select Contact</option>
                    {contacts.map(c => (
                      <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>
                    ))}
                  </select>
                </div>
              </section>

              {/* Details */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={16} className="text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Schedule & Priority</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Expected Close Date</label>
                    <input
                      type="date"
                      {...register('expectedCloseDate')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Priority*</label>
                    <select
                      {...register('priority')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm outline-none"
                    >
                      {PRIORITIES.map(p => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Notes */}
              <section className="space-y-4 pb-12">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle size={16} className="text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Notes</h3>
                </div>
                <textarea
                  {...register('notes')}
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none"
                  placeholder="Additional notes about this deal..."
                />
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-white flex items-center justify-between">
              {deal ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-bold text-sm transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete Deal</span>
                </button>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit(onSubmit)}
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
