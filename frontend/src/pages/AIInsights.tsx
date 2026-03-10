import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  RefreshCw, 
  Share2, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Phone, 
  Mail, 
  Calendar, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Lightbulb, 
  ShieldCheck, 
  Target, 
  Trophy, 
  UserPlus, 
  Flag,
  HelpCircle,
  MoreVertical,
  XCircle,
  Zap
} from 'lucide-react';
import { reportService } from '../services/report.service';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { cn } from '../lib/utils';

const AIInsights: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    summary: true,
    actions: true,
    risks: true,
    opportunities: true,
    coaching: true,
    competitors: true
  });
  
  const reportRef = useRef<HTMLDivElement>(null);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const insights = await reportService.getAiInsights();
      setData(insights);
    } catch (error) {
      console.error('Failed to fetch AI insights:', error);
      toast.error('Failed to load AI insights. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleDownloadPDF = async () => {
    if (!reportRef.current) return;
    
    toast('Preparing your PDF report...', { icon: '📄' });
    
    try {
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`AI-Insights-Report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
      
      toast.success('PDF report downloaded successfully!');
    } catch (error) {
      console.error('PDF generation failed:', error);
      toast.error('Failed to generate PDF. Please try again.');
    }
  };

  const handleShare = () => {
    toast.success('Report link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="p-8 space-y-8 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
            <div className="h-4 w-48 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
          </div>
          <div className="h-10 w-32 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
        </div>
        <div className="h-64 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
          <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto" ref={reportRef}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Brain className="w-8 h-8 text-indigo-500" />
            AI Insights & Recommendations
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Last analyzed: {format(new Date(data.lastAnalyzed), 'MMM d, yyyy h:mm a')}
          </p>
        </div>
        <button 
          onClick={fetchInsights}
          className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh Analysis
        </button>
      </div>

      {/* SECTION 1: AI EXECUTIVE SUMMARY */}
      <section className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div 
          className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center cursor-pointer"
          onClick={() => toggleSection('summary')}
        >
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-semibold">
              <Zap className="w-5 h-5 text-amber-500" />
              🤖 {data.executiveSummary.title}
            </div>
            <span className="text-[10px] text-slate-400 font-normal">Last updated: {format(new Date(data.lastAnalyzed), 'h:mm a')}</span>
          </div>
          {expandedSections.summary ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
        <AnimatePresence>
          {expandedSections.summary && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="p-6 space-y-6"
            >
              <div className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                "{data.executiveSummary.content}"
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Confidence</span>
                    <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{data.executiveSummary.confidence}%</span>
                  </div>
                  <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1">Based on</span>
                    <span className="text-lg font-bold">{data.executiveSummary.dataPointsCount} data points</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    Share Summary
                  </button>
                  <button 
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SECTION 2: PRIORITIZED ACTION ITEMS */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Target className="w-6 h-6 text-indigo-500" />
            🎯 AI-Recommended Actions (Priority Order)
          </h2>
          <span className="text-[10px] text-slate-400 font-normal mb-1">Last updated: {format(new Date(data.lastAnalyzed), 'h:mm a')}</span>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-3">Priority</th>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">Impact</th>
                  <th className="px-6 py-3">Effort</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {data.actionItems.map((item: any) => (
                  <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "font-bold",
                        item.priority === 'High' ? 'text-red-500' : 
                        item.priority === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                      )}>
                        {item.priorityLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-slate-900 dark:text-white">{item.action}</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{item.description}</span>
                        <div className="flex gap-2 mt-2">
                          {item.type === 'Call' && (
                            <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-md hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors">
                              <Phone className="w-3 h-3" /> Call Now
                            </button>
                          )}
                          {item.type === 'Email' && (
                            <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-md hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                              <Mail className="w-3 h-3" /> Draft Email
                            </button>
                          )}
                          {item.type === 'Meeting' && (
                            <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                              <Eye className="w-3 h-3" /> View Prep Notes
                            </button>
                          )}
                          {item.type === 'Enrichment' && (
                            <button className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-900/50 transition-colors">
                              <Zap className="w-3 h-3" /> Auto-Enrich All
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full font-medium",
                        item.impact === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 
                        item.impact === 'Med' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      )}>
                        {item.impact}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">
                      {item.effort}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500" />
                        <button className="p-1 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SECTION 3: DEAL RISK ANALYSIS */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            ⚠️ Deals at Risk
          </h2>
          <span className="text-[10px] text-slate-400 font-normal mb-1">Last updated: {format(new Date(data.lastAnalyzed), 'h:mm a')}</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {data.dealsAtRisk.map((deal: any, index: number) => (
            <div key={deal.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 space-y-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "w-3 h-3 rounded-full",
                    deal.riskLevel === 'HIGH' ? 'bg-red-500' : 
                    deal.riskLevel === 'MODERATE' ? 'bg-amber-500' : 'bg-blue-500'
                  )}></span>
                  <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{deal.name}</h3>
                </div>
                <span className="text-sm font-bold">${(deal.value / 1000).toFixed(0)}K</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Risk Score</span>
                  <span className={cn(
                    "font-bold",
                    deal.riskScore > 75 ? 'text-red-500' : 
                    deal.riskScore > 50 ? 'text-amber-500' : 'text-blue-500'
                  )}>{deal.riskScore}/100</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      deal.riskScore > 75 ? 'bg-red-500' : 
                      deal.riskScore > 50 ? 'bg-amber-500' : 'bg-blue-500'
                    )}
                    style={{ width: `${deal.riskScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Risk Factors:</span>
                <ul className="space-y-1">
                  {deal.riskFactors.map((factor: string, i: number) => (
                    <li key={i} className="text-xs flex items-start gap-1.5 text-slate-600 dark:text-slate-400">
                      <span className="text-red-500 mt-0.5">•</span>
                      {factor}
                    </li>
                  ))}
                </ul>
              </div>

              {deal.probabilityChange && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500">Prob. Change:</span>
                  <span className="font-bold flex items-center gap-1 text-red-500">
                    {deal.probabilityChange.from}% <TrendingDown className="w-3 h-3" /> {deal.probabilityChange.to}%
                  </span>
                </div>
              )}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700">
                <p className="text-xs italic text-slate-500 dark:text-slate-400 mb-4">
                  Suggested: {deal.suggested}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-3 py-2 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    View Deal
                  </button>
                  <button className="px-3 py-2 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Draft Response
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: OPPORTUNITY INSIGHTS */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-amber-500" />
            💡 Opportunities Detected
          </h2>
          <span className="text-[10px] text-slate-400 font-normal mb-1">Last updated: {format(new Date(data.lastAnalyzed), 'h:mm a')}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.opportunities.map((opp: any, i: number) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex gap-4 hover:border-emerald-500/50 transition-colors group">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">{opp.type}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">{opp.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  "{opp.description}"
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {opp.actions.map((action: string, j: number) => (
                    <button key={j} className="text-xs font-medium px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-emerald-600 hover:text-white transition-all">
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: PERFORMANCE COACHING */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-500" />
            📈 AI Performance Coach
          </h2>
          <span className="text-[10px] text-slate-400 font-normal mb-1">Last updated: {format(new Date(data.lastAnalyzed), 'h:mm a')}</span>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-slate-700">
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" /> Strengths
                </h3>
                <ul className="space-y-3">
                  {data.performanceCoaching.strengths.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-700">
                <h3 className="font-bold flex items-center gap-2 text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-5 h-5" /> Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {data.performanceCoaching.improvements.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                      <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="p-8 bg-indigo-50/50 dark:bg-indigo-900/10 flex flex-col justify-center items-center text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none animate-bounce">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2 max-w-sm">
                <h3 className="text-xl font-bold text-indigo-900 dark:text-indigo-100">Coaching Tip of the Week</h3>
                <p className="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed italic">
                  "{data.performanceCoaching.tip}"
                </p>
              </div>
              <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-md hover:bg-indigo-700 transition-all active:scale-95">
                View Full Performance Report
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: COMPETITOR INTELLIGENCE */}
      <section className="space-y-4 pb-12">
        <div className="flex justify-between items-end">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Flag className="w-6 h-6 text-red-500" />
            🏁 Competitor Intelligence
          </h2>
          <span className="text-[10px] text-slate-400 font-normal mb-1">Last updated: {format(new Date(data.lastAnalyzed), 'h:mm a')}</span>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Competitors mentioned this week:
            </h3>
            <div className="space-y-6">
              {data.competitorIntelligence.mentions.map((comp: any, i: number) => (
                <div key={i} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 font-bold rounded-lg text-sm">
                      {comp.name}
                    </span>
                    <span className="text-sm text-slate-500">{comp.count} mentions</span>
                  </div>
                  <div className="space-y-2 border-l-2 border-slate-100 dark:border-slate-700 pl-4">
                    {comp.details.map((detail: any, j: number) => (
                      <div key={j} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2 italic">
                        {detail.contact && <Phone className="w-3 h-3 text-slate-400 mt-0.5" />}
                        {detail.note && <Eye className="w-3 h-3 text-slate-400 mt-0.5" />}
                        <span>
                          {detail.contact && <span className="font-bold not-italic">{detail.contact}: </span>}
                          "{detail.quote || detail.note}"
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-500" />
              <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-xs">AI Analysis</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              "{data.competitorIntelligence.analysis}"
            </p>
            <div className="flex gap-2 pt-4">
              <button className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">
                View Competitive Battlecard
              </button>
              <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors">
                Draft Response Email
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIInsights;
