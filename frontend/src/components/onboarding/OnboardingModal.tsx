import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Upload, 
  Database, 
  Sparkles,
  Search,
  LayoutDashboard,
  MessageSquare,
  Command,
  CheckCircle2,
  TrendingUp,
  Users,
  Briefcase
} from 'lucide-react';
import { authService } from '../../services/auth.service';
import { User } from '../../types';

interface OnboardingModalProps {
  onComplete: (user: User) => void;
  onSkip: () => void;
}

const STEPS = 5;

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Sales Rep',
    teamSize: 'Just me',
    revenueTarget: ''
  });
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (step < STEPS) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      const updatedUser = await authService.updateOnboarding({
        name: formData.name,
        role: formData.role,
        teamSize: formData.teamSize,
        revenueTarget: parseFloat(formData.revenueTarget) || 0,
        isOnboarded: true
      });
      onComplete(updatedUser);
    } catch (error) {
      console.error('Failed to complete onboarding', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <WelcomeStep onNext={handleNext} onSkip={onSkip} />;
      case 2:
        return <SetupStep formData={formData} setFormData={setFormData} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <GetStartedStep onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <TourStep onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <ReadyStep onNext={handleComplete} loading={loading} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col min-h-[500px]"
      >
        <div className="relative flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 p-8"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          <div className="p-6 border-t bg-gray-50 flex items-center justify-between">
            <div className="flex gap-2">
              {[...Array(STEPS)].map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    step === i + 1 ? 'w-6 bg-indigo-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            {step > 1 && step < STEPS && (
              <div className="flex gap-3">
                <button 
                  onClick={onSkip}
                  className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Skip onboarding
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const WelcomeStep = ({ onNext, onSkip }: { onNext: () => void, onSkip: () => void }) => (
  <div className="flex flex-col items-center text-center space-y-8 py-4">
    <div className="w-20 h-20 bg-indigo-100 rounded-3xl flex items-center justify-center text-indigo-600">
      <Rocket className="w-10 h-10" />
    </div>
    <div className="space-y-2">
      <h2 className="text-3xl font-bold text-gray-900">🚀 Welcome to NexusCRM AI</h2>
      <p className="text-lg text-gray-600 max-w-md">
        The AI-powered CRM that helps you close more deals, faster.
      </p>
    </div>
    
    <div className="relative w-full max-w-sm aspect-video bg-indigo-50 rounded-xl overflow-hidden border border-indigo-100 flex items-center justify-center">
      {/* Simulated Lottie/Animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="relative"
        >
          <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
            <Sparkles className="w-12 h-12 text-indigo-500" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-white"
          >
            <CheckCircle2 className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-4 left-4 right-4 h-2 bg-white/50 rounded-full overflow-hidden">
        <motion.div 
          animate={{ x: [-200, 400] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-1/2 h-full bg-indigo-400/30"
        />
      </div>
    </div>

    <div className="flex flex-col w-full max-w-xs gap-4">
      <button 
        onClick={onNext}
        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group"
      >
        Get Started
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
      <button 
        onClick={onSkip}
        className="text-sm font-medium text-gray-500 hover:text-gray-700"
      >
        Skip onboarding
      </button>
    </div>
  </div>
);

const SetupStep = ({ formData, setFormData, onNext, onBack }: { formData: any, setFormData: any, onNext: () => void, onBack: () => void }) => (
  <div className="space-y-8">
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-gray-900">Quick Setup</h2>
      <p className="text-gray-600">Let's personalize your experience</p>
    </div>

    <div className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Your name</label>
        <input 
          type="text" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="e.g. Alex Johnson"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Your role</label>
          <select 
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option>Sales Rep</option>
            <option>Sales Manager</option>
            <option>Founder</option>
            <option>Marketing</option>
            <option>Other</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-700">Team size</label>
          <select 
            value={formData.teamSize}
            onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option>Just me</option>
            <option>2-5</option>
            <option>6-20</option>
            <option>20+</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700">Monthly revenue target</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
          <input 
            type="number" 
            value={formData.revenueTarget}
            onChange={(e) => setFormData({...formData, revenueTarget: e.target.value})}
            placeholder="50,000"
            className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>
    </div>

    <div className="flex gap-4 pt-4">
      <button 
        onClick={onBack}
        className="flex-1 py-3 px-4 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
      >
        Back
      </button>
      <button 
        onClick={onNext}
        disabled={!formData.name}
        className="flex-[2] py-3 px-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  </div>
);

const GetStartedStep = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => (
  <div className="space-y-8">
    <div className="space-y-2 text-center">
      <h2 className="text-2xl font-bold text-gray-900">How would you like to get started?</h2>
      <p className="text-gray-600">Choose the best path for your business</p>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <button onClick={onNext} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex flex-col items-center text-center space-y-4 group">
        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <Upload className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Import from CSV</h3>
          <p className="text-xs text-gray-500 mt-1">Upload your existing contacts</p>
        </div>
      </button>

      <button onClick={onNext} className="p-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50 hover:border-indigo-500 transition-all flex flex-col items-center text-center space-y-4 group">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Use Demo Data</h3>
          <p className="text-xs text-gray-500 mt-1">Explore with pre-loaded sample data</p>
        </div>
      </button>

      <button onClick={onNext} className="p-6 rounded-2xl border-2 border-gray-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all flex flex-col items-center text-center space-y-4 group">
        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Start Fresh</h3>
          <p className="text-xs text-gray-500 mt-1">Start with an empty CRM</p>
        </div>
      </button>
    </div>

    <div className="flex gap-4 pt-4">
      <button 
        onClick={onBack}
        className="flex-1 py-3 px-4 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
      >
        Back
      </button>
      <div className="flex-[2]" />
    </div>
  </div>
);

const TourStep = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
  const [tourIndex, setTourIndex] = useState(0);
  
  const tourItems = [
    {
      title: "This is your AI Assistant",
      desc: "Ask it anything about your data, draft emails, or create tasks naturally.",
      icon: <MessageSquare className="w-6 h-6" />,
      highlight: "chat-panel"
    },
    {
      title: "Your Pipeline View",
      desc: "Keep track of all active deals at a glance and move them through stages.",
      icon: <LayoutDashboard className="w-6 h-6" />,
      highlight: "pipeline"
    },
    {
      title: "AI Insights Everywhere",
      desc: "Smart alerts and recommendations appear throughout to help you prioritize.",
      icon: <TrendingUp className="w-6 h-6" />,
      highlight: "insights"
    },
    {
      title: "Quick Commands",
      desc: "Use Ctrl+K or Cmd+K to quickly find anything or trigger actions.",
      icon: <Command className="w-6 h-6" />,
      highlight: "command-palette"
    }
  ];

  const currentItem = tourItems[tourIndex];

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Quick Tour</h2>
        <p className="text-gray-600">Learn the key features in seconds</p>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 flex flex-col items-center text-center space-y-6 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div 
            key={tourIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center text-indigo-600 mx-auto">
              {currentItem.icon}
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-900">{currentItem.title}</h3>
              <p className="text-gray-600 max-w-sm">{currentItem.desc}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2">
          {tourItems.map((_, i) => (
            <div key={i} className={`h-1.5 w-8 rounded-full transition-colors ${i === tourIndex ? 'bg-indigo-600' : 'bg-gray-200'}`} />
          ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={onBack}
          className="flex-1 py-3 px-4 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button 
          onClick={() => {
            if (tourIndex < tourItems.length - 1) {
              setTourIndex(tourIndex + 1);
            } else {
              onNext();
            }
          }}
          className="flex-[2] py-3 px-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
        >
          {tourIndex < tourItems.length - 1 ? 'Next Tip' : 'Got it!'}
        </button>
      </div>
    </div>
  );
};

const ReadyStep = ({ onNext, loading }: { onNext: () => void, loading: boolean }) => (
  <div className="flex flex-col items-center text-center space-y-8 py-4">
    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600">
      <CheckCircle2 className="w-10 h-10" />
    </div>
    <div className="space-y-2">
      <h2 className="text-3xl font-bold text-gray-900">🎉 You're all set!</h2>
      <p className="text-lg text-gray-600 max-w-md">
        Your AI assistant is ready to help you close more deals.
      </p>
    </div>

    <div className="w-full max-w-md bg-indigo-50 rounded-2xl p-6 border border-indigo-100 text-left space-y-4">
      <div className="flex items-center gap-3 text-indigo-600">
        <Sparkles className="w-5 h-5" />
        <span className="font-bold text-sm uppercase tracking-wider">AI Suggested First Task</span>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 flex items-center gap-4">
        <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-bold text-gray-900">Add your first 5 contacts</h4>
          <p className="text-sm text-gray-500">To get started with personalized AI insights.</p>
        </div>
      </div>
    </div>

    <button 
      onClick={onNext}
      disabled={loading}
      className="w-full max-w-xs py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
    >
      {loading ? (
        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
      ) : (
        <>
          Go to Dashboard
          <ChevronRight className="w-5 h-5" />
        </>
      )}
    </button>
  </div>
);

export default OnboardingModal;
