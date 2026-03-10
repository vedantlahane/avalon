import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Mail, 
  Smile, 
  Meh, 
  Frown, 
  AlertTriangle, 
  ExternalLink, 
  MessageSquare, 
  Calendar, 
  UserPlus,
  ArrowRight,
  Bot
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { emailService } from '../services/email.service';
import { cn } from '../lib/utils';
import { EmptyState } from '../components/common/EmptyState';
import { useNavigate } from 'react-router-dom';

export const SentimentAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<any>(null);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [flaggedEmails, setFlaggedEmails] = useState<any[]>([]);
  const [contactBreakdown, setContactBreakdown] = useState<any[]>([]);
  const [insights, setInsights] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sum, trend, flagged, breakdown, ins] = await Promise.all([
          emailService.getSentimentSummary(),
          emailService.getSentimentTrend(),
          emailService.getFlaggedEmails(),
          emailService.getContactSentimentBreakdown(),
          emailService.getSentimentInsights()
        ]);
        setSummary(sum);
        setTrendData(trend);
        setFlaggedEmails(flagged);
        setContactBreakdown(breakdown);
        setInsights(ins);
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!summary || summary.totalEmails === 0) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Sentiment Analysis</h1>
        <EmptyState
          icon={Bot}
          title="No sentiment data yet"
          description="Connect your email and start communicating with contacts to see AI-powered sentiment analysis and trends."
          actions={[
            { label: 'Go to Inbox', onClick: () => navigate('/inbox'), icon: Mail },
            { label: 'Go to Contacts', onClick: () => navigate('/contacts'), variant: 'secondary', icon: UserPlus }
          ]}
          aiTip="AI sentiment analysis helps you identify at-risk deals before it's too late by detecting negative tone in emails."
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-gray-900">Sentiment Analysis</h1>
        <div className="text-sm text-gray-500">Last 30 Days</div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Mail className="text-indigo-600" size={20} />
            </div>
            <span className="text-xs font-medium text-gray-400">Total Emails</span>
          </div>
          <div className="text-2xl font-bold">{summary?.totalEmails}</div>
          <div className="mt-1 text-sm text-gray-500 flex items-center gap-1">
            <Mail size={14} /> This Month
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <Smile className="text-green-600" size={20} />
            </div>
            <span className="text-xs font-medium text-gray-400">Positive</span>
          </div>
          <div className="text-2xl font-bold">{summary?.positive}%</div>
          <div className="mt-1 text-sm text-green-600 flex items-center gap-1">
            <TrendingUp size={14} /> ↑{summary?.trends.positive}%
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Meh className="text-gray-600" size={20} />
            </div>
            <span className="text-xs font-medium text-gray-400">Neutral</span>
          </div>
          <div className="text-2xl font-bold">{summary?.neutral}%</div>
          <div className="mt-1 text-sm text-gray-500 flex items-center gap-1">
            <TrendingUp size={14} className="rotate-90" /> ↓{Math.abs(summary?.trends.neutral)}%
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div className="p-2 bg-red-50 rounded-lg">
              <Frown className="text-red-600" size={20} />
            </div>
            <span className="text-xs font-medium text-gray-400">Negative</span>
          </div>
          <div className="text-2xl font-bold">{summary?.negative}%</div>
          <div className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <TrendingUp size={14} /> ↑{summary?.trends.negative}%
          </div>
        </div>
      </div>

      {/* Sentiment Trend Chart */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-6">Sentiment Trend</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#9CA3AF' }}
                unit="%"
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
              <Line 
                type="monotone" 
                dataKey="positive" 
                stroke="#10B981" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6 }}
                name="Positive"
              />
              <Line 
                type="monotone" 
                dataKey="neutral" 
                stroke="#9CA3AF" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6 }}
                name="Neutral"
              />
              <Line 
                type="monotone" 
                dataKey="negative" 
                stroke="#EF4444" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6 }}
                name="Negative"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flagged Emails */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-amber-500" size={20} />
            <h3 className="text-lg font-semibold text-gray-900">Flagged Emails (Needs Attention)</h3>
          </div>
          
          {flaggedEmails.map((email) => (
            <div key={email.id} className="bg-white rounded-xl border-l-4 border-l-red-500 border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xs font-semibold text-red-600 uppercase tracking-wider mb-1 flex items-center gap-1">
                      <AlertTriangle size={12} /> Negative Sentiment Detected
                    </div>
                    <div className="font-semibold text-gray-900">From: {email.from} ({email.company})</div>
                    <div className="text-gray-600">Subject: "{email.subject}"</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">Sentiment: <span className="text-red-600">{email.sentiment} ({email.confidence}% confidence)</span></div>
                    <div className="text-xs text-gray-500 mt-1 italic">Deal at risk: {email.dealName} (${(email.dealValue/1000).toFixed(0)}K)</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-1">Key phrases:</div>
                  <div className="flex flex-wrap gap-2">
                    {email.keyPhrases.map((phrase: string, idx: number) => (
                      <span key={idx} className="px-2 py-1 bg-red-50 text-red-700 rounded-md text-xs border border-red-100">
                        "{phrase}"
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100 mb-5">
                  <div className="flex gap-2">
                    <Bot className="text-indigo-600 shrink-0" size={18} />
                    <div className="text-sm text-indigo-900">
                      <span className="font-semibold text-indigo-700">Recommended:</span> {email.recommendation}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                    <ExternalLink size={14} /> View Email
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-1.5 text-indigo-600">
                    <MessageSquare size={14} /> Draft Apology
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-1.5 text-amber-600">
                    <Calendar size={14} /> Create Urgent Task
                  </button>
                  <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-1.5 text-gray-600">
                    <UserPlus size={14} /> Assign to Manager
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Insight */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <Bot size={80} />
            </div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bot className="text-indigo-600" size={20} /> AI Insight
            </h3>
            <div className="text-gray-700 text-sm leading-relaxed">
              "{insights}"
            </div>
          </div>

          {/* Contact Sentiment Breakdown */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-semibold">Contact Sentiment Breakdown</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                  <tr>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">Sentiment</th>
                    <th className="px-4 py-3">Trend</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {contactBreakdown.map((item) => (
                    <tr 
                      key={item.id}
                      className={cn(
                        "transition-colors",
                        item.sentiment === 'Positive' ? "hover:bg-green-50/50" : 
                        item.sentiment === 'Negative' ? "hover:bg-red-50/50" : 
                        "hover:bg-yellow-50/50"
                      )}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{item.contact}</div>
                        <div className="text-xs text-gray-500">{item.company}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {item.sentiment === 'Positive' ? <Smile className="text-green-500" size={16} /> :
                           item.sentiment === 'Negative' ? <Frown className="text-red-500" size={16} /> :
                           <Meh className="text-gray-400" size={16} />}
                          <span className={cn(
                            "font-medium",
                            item.sentiment === 'Positive' ? "text-green-700" :
                            item.sentiment === 'Negative' ? "text-red-700" :
                            "text-gray-700"
                          )}>
                            {item.sentiment}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {item.trend === 'up' ? <TrendingUp className="text-green-500" size={16} /> :
                         item.trend === 'down' ? <TrendingDown className="text-red-500" size={16} /> :
                         <ArrowRight className="text-gray-400" size={16} />}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium text-xs">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
