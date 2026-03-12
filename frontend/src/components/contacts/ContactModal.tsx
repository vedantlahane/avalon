import React, { useEffect, useState, useCallback } from 'react';
import { useForm, useWatch, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  X, 
  Plus, 
  Search, 
  Building2, 
  Mail, 
  Phone, 
  User, 
  Linkedin, 
  Twitter, 
  Globe, 
  MapPin, 
  StickyNote,
  Sparkles,
  Loader2,
  Trash2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { Contact, Company, LeadSource, LeadStatus, Industry, CompanySize, EnrichmentResult } from '../../types';
import { companyService } from '../../services/company.service';
import { contactService } from '../../services/contact.service';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  jobTitle: z.string().optional(),
  companyId: z.number().optional().nullable(),
  newCompany: z.object({
    name: z.string().optional(),
    domain: z.string().optional(),
    industry: z.string().optional(),
    size: z.string().optional(),
  }).optional(),
  leadSource: z.string().optional(),
  leadStatus: z.string().optional(),
  tags: z.array(z.string()),
  owner: z.string(),
  linkedinUrl: z.string().url('Invalid URL').or(z.string().length(0)).optional(),
  twitterUrl: z.string().url('Invalid URL').or(z.string().length(0)).optional(),
  website: z.string().url('Invalid URL').or(z.string().length(0)).optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  contactId?: number;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onSuccess, contactId }) => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [isLoadingContact, setIsLoadingContact] = useState(false);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isCreatingCompany, setIsCreatingCompany] = useState(false);
  const [isAiEnriching, setIsAiEnriching] = useState(false);
  const [enrichmentResults, setEnrichmentResults] = useState<EnrichmentResult | null>(null);
  const [currentEnrichmentStep, setCurrentEnrichmentStep] = useState(-1);
  const [acceptedFields, setAcceptedFields] = useState<Set<string>>(new Set());
  const [showDraftToast, setShowDraftToast] = useState(false);
  const [showAiToast, setShowAiToast] = useState(false);
  const [companySearch, setCompanySearch] = useState('');
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const enrichmentSteps = [
    "Verifying email...",
    "Finding contact information...",
    "Looking up company data...",
    "Analyzing social profiles...",
    "Generating lead score..."
  ];

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      tags: [],
      owner: 'Me',
      phone: '',
      jobTitle: '',
      companyId: null,
      leadSource: '',
      leadStatus: '',
      linkedinUrl: '',
      twitterUrl: '',
      website: '',
      address: '',
      notes: '',
    }
  });

  const watchedValues = watch();

  // Load contact if ID is provided
  useEffect(() => {
    const loadContact = async () => {
      if (contactId && isOpen) {
        setIsLoadingContact(true);
        try {
          const data = await contactService.getContactById(contactId);
          if (data) {
            setContact(data);
            reset({
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              phone: data.phone || '',
              jobTitle: data.jobTitle || '',
              companyId: data.companyId || null,
              leadSource: data.leadSource || '',
              leadStatus: data.leadStatus || '',
              tags: data.tags || [],
              owner: data.owner || 'Me',
              linkedinUrl: data.linkedinUrl || '',
              twitterUrl: data.twitterUrl || '',
              website: data.website || '',
              address: data.address || '',
              notes: data.notes || '',
            });
          }
        } catch (error) {
          console.error('Error loading contact:', error);
        } finally {
          setIsLoadingContact(false);
        }
      } else if (!contactId && isOpen) {
        setContact(null);
        reset({
          firstName: '',
          lastName: '',
          email: '',
          tags: [],
          owner: 'Me',
          phone: '',
          jobTitle: '',
          companyId: null,
          leadSource: '',
          leadStatus: '',
          linkedinUrl: '',
          twitterUrl: '',
          website: '',
          address: '',
          notes: '',
        });
      }
    };
    loadContact();
  }, [contactId, isOpen, reset]);

  // Load companies
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await companyService.getCompanies();
        setCompanies(data);
      } catch (error) {
        console.error('Error loading companies:', error);
      }
    };
    loadCompanies();
  }, []);

  // Pre-fill from draft
  useEffect(() => {
    if (!contactId && isOpen) {
      const draft = localStorage.getItem('contact_draft');
      if (draft) {
        try {
          const parsedDraft = JSON.parse(draft);
          reset(parsedDraft);
        } catch (e) {
          console.error('Failed to load draft', e);
        }
      }
    }
  }, [isOpen, contactId, reset]);

  // Auto-save draft
  useEffect(() => {
    if (!contactId && isDirty && isOpen) {
      const timer = setTimeout(() => {
        localStorage.setItem('contact_draft', JSON.stringify(watchedValues));
        setShowDraftToast(true);
        setTimeout(() => setShowDraftToast(false), 2000);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [watchedValues, isDirty, contactId, isOpen]);

  // Keyboard shortcut Ctrl+Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleSubmit(onSubmit)();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmit]);

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      let companyId = data.companyId;

      if (isCreatingCompany && data.newCompany?.name) {
        const newCompany = await companyService.createCompany({
          name: data.newCompany.name,
          domain: data.newCompany.domain,
          industry: data.newCompany.industry as Industry,
          size: data.newCompany.size as CompanySize,
        });
        companyId = newCompany.id;
      }

      const contactData = {
        ...data,
        companyId: companyId || undefined,
        leadSource: data.leadSource as LeadSource || undefined,
        leadStatus: data.leadStatus as LeadStatus || undefined,
      };

      if (contact) {
        await contactService.updateContact(contact.id, contactData);
      } else {
        await contactService.createContact(contactData);
        localStorage.removeItem('contact_draft');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving contact:', error);
    }
  };

  const handleAiEnrich = async () => {
    const email = getValues('email');
    if (!email) return;

    setIsAiEnriching(true);
    setEnrichmentResults(null);
    setCurrentEnrichmentStep(0);
    
    // Animate progress steps
    for (let i = 0; i < enrichmentSteps.length; i++) {
      setCurrentEnrichmentStep(i);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    try {
      const result = await contactService.enrichContact(email);
      setEnrichmentResults(result);
      setAcceptedFields(new Set(Object.keys(result).filter(k => !['suggestedLeadScore', 'suggestedTags'].includes(k))));
    } catch (error) {
      console.error('Enrichment failed:', error);
    } finally {
      setIsAiEnriching(false);
      setCurrentEnrichmentStep(-1);
    }
  };

  const acceptAllEnrichment = () => {
    if (!enrichmentResults) return;
    
    const fields = [
      'firstName', 'lastName', 'jobTitle', 'phone', 
      'linkedinUrl', 'website', 'companyName', 'companyDomain'
    ];

    fields.forEach(field => {
      const value = (enrichmentResults as any)[field === 'website' ? 'companyDomain' : field];
      if (value) {
        if (field === 'companyName' || field === 'companyDomain') {
          // Handle company auto-population if needed
          if (field === 'companyName') {
            const existing = companies.find(c => c.name.toLowerCase() === value.toLowerCase());
            if (existing) {
              setValue('companyId', existing.id);
            } else {
              setIsCreatingCompany(true);
              setValue('newCompany.name', value);
            }
          } else {
            setValue('newCompany.domain', value);
          }
        } else {
          setValue(field as any, value, { shouldDirty: true });
        }
      }
    });

    if (enrichmentResults.suggestedTags) {
      const currentTags = getValues('tags') || [];
      const newTags = [...new Set([...currentTags, ...enrichmentResults.suggestedTags])];
      setValue('tags', newTags);
    }

    setEnrichmentResults(null);
    setShowAiToast(true);
    setTimeout(() => setShowAiToast(false), 3000);
  };

  const toggleField = (field: string) => {
    const newAccepted = new Set(acceptedFields);
    if (newAccepted.has(field)) {
      newAccepted.delete(field);
    } else {
      newAccepted.add(field);
    }
    setAcceptedFields(newAccepted);
  };

  const acceptSelectedEnrichment = () => {
    if (!enrichmentResults) return;

    acceptedFields.forEach(field => {
      const value = (enrichmentResults as any)[field];
      if (value) {
        if (field === 'companyName' || field === 'companyDomain') {
          if (field === 'companyName') {
            const existing = companies.find(c => c.name.toLowerCase() === value.toLowerCase());
            if (existing) {
              setValue('companyId', existing.id);
            } else {
              setIsCreatingCompany(true);
              setValue('newCompany.name', value);
            }
          } else {
            setValue('newCompany.domain', value);
          }
        } else {
          setValue(field as any, value, { shouldDirty: true });
        }
      }
    });

    if (acceptedFields.has('suggestedTags') && enrichmentResults.suggestedTags) {
      const currentTags = getValues('tags') || [];
      const newTags = [...new Set([...currentTags, ...enrichmentResults.suggestedTags])];
      setValue('tags', newTags);
    }

    setEnrichmentResults(null);
    setShowAiToast(true);
    setTimeout(() => setShowAiToast(false), 3000);
  };

  const addTag = () => {
    if (tagInput.trim()) {
      const currentTags = getValues('tags') || [];
      if (!currentTags.includes(tagInput.trim())) {
        setValue('tags', [...currentTags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    const currentTags = getValues('tags') || [];
    setValue('tags', currentTags.filter(t => t !== tag));
  };

  const handleDelete = async () => {
    if (!contact) return;
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.deleteContact(contact.id);
        onSuccess();
        onClose();
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const filteredCompanies = companies.filter(c => 
    c.name.toLowerCase().includes(companySearch.toLowerCase())
  );

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
            <div className="p-6 border-b border-gray-100 flex items-center justify-between relative">
              <AnimatePresence>
                {showAiToast && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="absolute -bottom-12 left-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded-xl shadow-lg z-50 flex items-center gap-2 text-sm font-bold"
                  >
                    <Sparkles size={16} />
                    <span>✨ AI found 6 additional fields for this contact</span>
                  </motion.div>
                )}
              </AnimatePresence>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {contact ? 'Edit Contact' : 'Add New Contact'}
                </h2>
                {contact && (
                  <div className="flex flex-col gap-0.5 mt-1">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      Created on {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      Last modified {new Date(contact.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                {showDraftToast && (
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                    <CheckCircle2 size={10} />
                    Draft saved
                  </span>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Enrichment Animation */}
              <AnimatePresence>
                {isAiEnriching && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-6 overflow-hidden"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-indigo-600 p-2 rounded-lg text-white">
                        <Loader2 size={20} className="animate-spin" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-indigo-900">AI is enriching this contact...</h4>
                        <p className="text-xs text-indigo-600 font-medium">Scanning 20+ data sources</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {enrichmentSteps.map((step, idx) => (
                        <motion.div
                          key={step}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: currentEnrichmentStep >= idx ? 1 : 0.3,
                            x: 0,
                            scale: currentEnrichmentStep === idx ? 1.02 : 1
                          }}
                          className="flex items-center gap-3"
                        >
                          <div className={cn(
                            "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                            currentEnrichmentStep > idx ? "bg-emerald-500 text-white" : 
                            currentEnrichmentStep === idx ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-500"
                          )}>
                            {currentEnrichmentStep > idx ? <CheckCircle2 size={12} /> : idx + 1}
                          </div>
                          <span className={cn(
                            "text-xs font-bold",
                            currentEnrichmentStep >= idx ? "text-gray-900" : "text-gray-400"
                          )}>
                            {step}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enrichment Results Panel */}
              <AnimatePresence>
                {enrichmentResults && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white border-2 border-indigo-600 rounded-2xl shadow-xl p-6 space-y-6 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-3 opacity-10">
                      <Sparkles size={100} className="text-indigo-600" />
                    </div>
                    
                    <div className="flex items-center justify-between relative">
                      <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-lg text-white">
                          <Sparkles size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-indigo-900">🤖 AI Enrichment Results</h4>
                          <p className="text-xs text-indigo-600 font-medium">Found 8 data points</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3 relative">
                      {[
                        { label: 'First Name', value: enrichmentResults.firstName, field: 'firstName' },
                        { label: 'Last Name', value: enrichmentResults.lastName, field: 'lastName' },
                        { label: 'Job Title', value: enrichmentResults.jobTitle, field: 'jobTitle' },
                        { label: 'Company', value: enrichmentResults.companyName, field: 'companyName' },
                        { label: 'Phone', value: enrichmentResults.phone, field: 'phone' },
                        { label: 'LinkedIn', value: enrichmentResults.linkedinUrl, field: 'linkedinUrl' },
                        { label: 'Location', value: enrichmentResults.location, field: 'location' },
                        { label: 'Company Size', value: enrichmentResults.companySize, field: 'companySize' },
                      ].map((item) => (
                        <div key={item.field} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 size={16} className="text-emerald-500" />
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">{item.label}</p>
                              <p className="text-xs font-bold text-gray-900">{item.value}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleField(item.field)}
                            className={cn(
                              "text-[10px] font-bold px-2 py-1 rounded-lg border transition-all",
                              acceptedFields.has(item.field)
                                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                : "bg-gray-50 text-gray-500 border-gray-100"
                            )}
                          >
                            {acceptedFields.has(item.field) ? 'Accepted' : 'Accept'}
                          </button>
                        </div>
                      ))}

                      {enrichmentResults.suggestedLeadScore && (
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-between mt-4">
                          <div className="flex items-center gap-3">
                            <span className="text-xl">🎯</span>
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-wider text-amber-600">Suggested Lead Score</p>
                              <p className="text-sm font-black text-amber-900">{enrichmentResults.suggestedLeadScore}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {enrichmentResults.suggestedTags && (
                        <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-wider text-indigo-600">🏷️ Suggested Tags</p>
                          <div className="flex flex-wrap gap-2">
                            {enrichmentResults.suggestedTags.map(tag => (
                              <span key={tag} className="bg-white text-indigo-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-indigo-100 shadow-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {enrichmentResults.recentNews && (
                        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 space-y-1">
                          <p className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Recent News / Funding</p>
                          <p className="text-xs font-bold text-gray-900">{enrichmentResults.recentNews}</p>
                        </div>
                      )}

                      {enrichmentResults.technologies && (
                        <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Technologies Used</p>
                          <div className="flex flex-wrap gap-2">
                            {enrichmentResults.technologies.map(tech => (
                              <span key={tech} className="bg-white text-gray-700 px-2 py-1 rounded-lg text-[10px] font-bold border border-gray-200">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3 relative pt-2">
                      <button
                        type="button"
                        onClick={acceptAllEnrichment}
                        className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-xs font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                      >
                        Accept All
                      </button>
                      <button
                        type="button"
                        onClick={acceptSelectedEnrichment}
                        className="flex-1 bg-white border border-gray-200 text-gray-700 py-2.5 rounded-xl text-xs font-black hover:bg-gray-50 transition-all"
                      >
                        Accept Selected
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Section 1: Basic Information */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <User size={16} className="text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Basic Information</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">First Name*</label>
                    <input
                      {...register('firstName')}
                      className={cn(
                        "w-full bg-gray-50 border rounded-xl py-2 px-3 text-sm focus:outline-none transition-all",
                        errors.firstName ? "border-rose-300 focus:ring-rose-500/10 focus:border-rose-500" : "border-gray-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                      )}
                      placeholder="e.g. John"
                    />
                    {errors.firstName && <p className="text-[10px] font-bold text-rose-500">{errors.firstName.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Last Name*</label>
                    <input
                      {...register('lastName')}
                      className={cn(
                        "w-full bg-gray-50 border rounded-xl py-2 px-3 text-sm focus:outline-none transition-all",
                        errors.lastName ? "border-rose-300 focus:ring-rose-500/10 focus:border-rose-500" : "border-gray-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                      )}
                      placeholder="e.g. Doe"
                    />
                    {errors.lastName && <p className="text-[10px] font-bold text-rose-500">{errors.lastName.message}</p>}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Email*</label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        {...register('email')}
                        className={cn(
                          "w-full bg-gray-50 border rounded-xl py-2 px-3 text-sm focus:outline-none transition-all",
                          errors.email ? "border-rose-300 focus:ring-rose-500/10 focus:border-rose-500" : "border-gray-100 focus:ring-indigo-500/10 focus:border-indigo-500"
                        )}
                        placeholder="john@example.com"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAiEnrich}
                      disabled={isAiEnriching || !watchedValues.email}
                      className="flex items-center gap-2 bg-indigo-50 text-indigo-700 border border-indigo-100 px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-all disabled:opacity-50"
                    >
                      {isAiEnriching ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                      AI Enrich
                    </button>
                  </div>
                  {errors.email && <p className="text-[10px] font-bold text-rose-500">{errors.email.message}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Phone</label>
                    <input
                      {...register('phone')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Job Title</label>
                    <input
                      {...register('jobTitle')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      placeholder="e.g. CEO"
                    />
                  </div>
                </div>
              </section>

              {/* Section 2: Company */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 size={16} className="text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Company</h3>
                </div>

                {!isCreatingCompany ? (
                  <div className="space-y-1 relative">
                    <label className="text-xs font-bold text-gray-700">Company</label>
                    <div 
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm cursor-pointer flex items-center justify-between"
                      onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                    >
                      <span className={watchedValues.companyId ? "text-gray-900" : "text-gray-400"}>
                        {watchedValues.companyId 
                          ? companies.find(c => c.id === watchedValues.companyId)?.name 
                          : 'Select a company'}
                      </span>
                      <Search size={14} className="text-gray-400" />
                    </div>

                    <AnimatePresence>
                      {isCompanyDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-2 max-h-60 overflow-y-auto"
                        >
                          <input 
                            className="w-full bg-gray-50 border-none rounded-lg py-2 px-3 text-sm focus:ring-0 mb-2"
                            placeholder="Search companies..."
                            value={companySearch}
                            onChange={(e) => setCompanySearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="space-y-1">
                            {filteredCompanies.map(comp => (
                              <button
                                key={comp.id}
                                type="button"
                                className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                                onClick={() => {
                                  setValue('companyId', comp.id);
                                  setIsCompanyDropdownOpen(false);
                                }}
                              >
                                {comp.name}
                              </button>
                            ))}
                            <button
                              type="button"
                              className="w-full text-left px-3 py-2 rounded-xl text-sm font-bold text-indigo-600 hover:bg-indigo-50 transition-all flex items-center gap-2"
                              onClick={() => {
                                setIsCreatingCompany(true);
                                setIsCompanyDropdownOpen(false);
                                setValue('companyId', null);
                              }}
                            >
                              <Plus size={14} />
                              Create New Company
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="bg-indigo-50/30 border border-indigo-100 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-indigo-900">New Company</h4>
                      <button 
                        type="button"
                        onClick={() => setIsCreatingCompany(false)}
                        className="text-xs font-bold text-gray-400 hover:text-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700">Company Name</label>
                        <input
                          {...register('newCompany.name')}
                          className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700">Domain</label>
                        <input
                          {...register('newCompany.domain')}
                          className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700">Industry</label>
                        <select
                          {...register('newCompany.industry')}
                          className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-sm outline-none"
                        >
                          <option value="">Select industry</option>
                          {['Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Other'].map(i => (
                            <option key={i} value={i}>{i}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-700">Size</label>
                        <select
                          {...register('newCompany.size')}
                          className="w-full bg-white border border-gray-200 rounded-xl py-2 px-3 text-sm outline-none"
                        >
                          <option value="">Select size</option>
                          {['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* Section 3: Lead Details */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <StickyNote size={16} className="text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Lead Details</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Lead Source</label>
                    <select
                      {...register('leadSource')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm outline-none"
                    >
                      <option value="">Select source</option>
                      {['Website', 'LinkedIn', 'Referral', 'Cold Outreach', 'Event', 'Other'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-700">Lead Status</label>
                    <select
                      {...register('leadStatus')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm outline-none"
                    >
                      <option value="">Select status</option>
                      {['New', 'Contacted', 'Qualified', 'Unqualified', 'Nurturing'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(watchedValues.tags || []).map(tag => (
                      <span key={tag} className="bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-indigo-100">
                        {tag}
                        <X size={12} className="cursor-pointer hover:text-indigo-900" onClick={() => removeTag(tag)} />
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                      className="flex-1 bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      placeholder="Add a tag..."
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-50 transition-all"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700">Owner</label>
                  <select
                    {...register('owner')}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 px-3 text-sm outline-none"
                  >
                    <option value="Me">Me</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Bob Wilson">Bob Wilson</option>
                  </select>
                </div>
              </section>

              {/* Section 4: Social & Web */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe size={16} className="text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Social & Web</h3>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <Linkedin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('linkedinUrl')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      placeholder="LinkedIn URL"
                    />
                  </div>
                  <div className="relative">
                    <Twitter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('twitterUrl')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      placeholder="Twitter URL"
                    />
                  </div>
                  <div className="relative">
                    <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      {...register('website')}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      placeholder="Website"
                    />
                  </div>
                </div>
              </section>

              {/* Section 5: Address */}
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Address</h3>
                </div>
                <textarea
                  {...register('address')}
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none"
                  placeholder="Full address..."
                />
              </section>

              {/* Section 6: Notes */}
              <section className="space-y-4 pb-12">
                <div className="flex items-center gap-2 mb-2">
                  <StickyNote size={16} className="text-indigo-600" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Notes</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 p-1 rounded-t-2xl border-b-0">
                    <button type="button" className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-xs font-bold text-gray-600 transition-all">B</button>
                    <button type="button" className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-xs italic text-gray-600 transition-all">I</button>
                    <button type="button" className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-xs underline text-gray-600 transition-all">U</button>
                    <div className="w-[1px] h-4 bg-gray-200 mx-1" />
                    <button type="button" className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-xs text-gray-600 transition-all">List</button>
                    <button type="button" className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg text-xs text-gray-600 transition-all">Link</button>
                  </div>
                  <textarea
                    {...register('notes')}
                    rows={4}
                    className="w-full bg-gray-50 border border-gray-100 rounded-b-2xl py-3 px-4 text-sm focus:outline-none focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none"
                    placeholder="Additional notes..."
                  />
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-white flex items-center justify-between">
              {contact ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-bold text-sm transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete Contact</span>
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
                  {contact ? 'Save Changes' : 'Save Contact'}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
