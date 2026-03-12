import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, EyeOff, Mail, Lock, User, Building2, Users, Briefcase, 
  ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Github, Globe, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { cn } from '../lib/utils';
import { toast } from 'react-hot-toast';

type AuthMode = 'login' | 'signup' | 'forgot-password';

export const Auth: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('demo@nexuscrm.ai');
  const [password, setPassword] = useState('password123');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [teamSize, setTeamSize] = useState('Just me');
  const [role, setRole] = useState('Sales Representative');
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    // Auto-focus first input
    const firstInput = document.querySelector('input');
    if (firstInput) (firstInput as HTMLInputElement).focus();
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        await authService.login(email, password);
        toast.success('Welcome back!');
        window.location.href = '/'; // Full refresh to reset app state
      } else if (mode === 'signup') {
        if (!agreed) {
          toast.error('Please agree to terms');
          setLoading(false);
          return;
        }
        await authService.register({ fullName, email, companyName, password, teamSize, role });
        toast.success('Account created successfully!');
        window.location.href = '/';
      } else {
        await authService.forgotPassword(email);
        setEmailSent(true);
      }
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialClick = (provider: string) => {
    toast(`Sign in with ${provider} coming soon!`, { icon: '⏳' });
  };

  const passwordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 25;
    if (/[0-9]/.test(pass)) score += 25;
    if (/[^A-Za-z0-9]/.test(pass)) score += 25;
    return score;
  };

  return (
    <div className="min-h-screen w-full flex bg-background overflow-hidden relative">
      {/* Left Side - Brand & Illustration */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-600 via-violet-700 to-purple-900 relative p-12 flex-col justify-between overflow-hidden">
        {/* Animated Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.5 + 0.2
              }}
              animate={{ 
                y: [null, "-20px", "20px", null],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Logo Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 font-bold text-2xl shadow-lg">
            N
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-tight">NexusCRM AI</h1>
            <span className="text-white/60 text-xs font-medium tracking-widest uppercase">Intelligent CRM</span>
          </div>
        </motion.div>

        {/* Illustration Section */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* AI Graphic (Abstract nodes) */}
            <div className="w-64 h-64 relative flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-white/10 rounded-full"
              />
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border-2 border-dashed border-white/20 rounded-full"
              />
              <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 flex items-center justify-center relative z-10 shadow-2xl">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Users className="w-12 h-12 text-white" />
                </motion.div>
              </div>
              
              {/* Floating data nodes */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                  animate={{ 
                    x: [Math.cos(i * 60) * 100, Math.cos(i * 60) * 110, Math.cos(i * 60) * 100],
                    y: [Math.sin(i * 60) * 100, Math.sin(i * 60) * 110, Math.sin(i * 60) * 100],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                />
              ))}
            </div>
          </motion.div>
          
          <div className="mt-12 text-center max-w-sm">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-3xl font-bold text-white mb-4"
            >
              The intelligent CRM that closes deals for you
            </motion.h2>
          </div>
        </div>

        {/* Testimonial Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="relative z-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl max-w-md self-center lg:self-start"
        >
          <p className="text-white/90 italic text-lg leading-relaxed">
            "NexusCRM AI increased our close rate by 35% in just 3 months"
          </p>
          <div className="mt-4 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-400 flex items-center justify-center text-white font-bold">
              AJ
            </div>
            <div>
              <p className="text-white font-semibold">Alex J.</p>
              <p className="text-white/60 text-sm">Sales Director</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto custom-scrollbar">
        {/* Mobile Header (Only visible on small screens) */}
        <div className="lg:hidden absolute top-8 left-8 right-8 flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
            N
          </div>
          <h1 className="text-xl font-bold text-foreground">NexusCRM AI</h1>
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {mode === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Welcome back! 👋</h2>
                  <p className="text-muted-foreground">Sign in to your NexusCRM AI account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium leading-none">Password</label>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="remember" className="rounded border-input" />
                      <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">Remember me</label>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => setMode('forgot-password')}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full active:scale-[0.98]"
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In →"}
                  </button>
                </form>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <button onClick={() => handleSocialClick('Google')} className="flex items-center justify-center rounded-md border border-input bg-background h-10 hover:bg-muted/50 transition-colors">
                      <Globe className="h-5 w-5 mr-2 text-red-500" />
                      <span className="text-xs font-medium">Google</span>
                    </button>
                    <button onClick={() => handleSocialClick('GitHub')} className="flex items-center justify-center rounded-md border border-input bg-background h-10 hover:bg-muted/50 transition-colors">
                      <Github className="h-5 w-5 mr-2" />
                      <span className="text-xs font-medium">GitHub</span>
                    </button>
                    <button onClick={() => handleSocialClick('SSO')} className="flex items-center justify-center rounded-md border border-input bg-background h-10 hover:bg-muted/50 transition-colors">
                      <Lock className="h-4 w-4 mr-2" />
                      <span className="text-xs font-medium">SSO</span>
                    </button>
                  </div>

                  <p className="mt-8 text-center text-sm text-muted-foreground">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setMode('signup')}
                      className="font-medium text-primary hover:underline"
                    >
                      Sign up →
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

            {mode === 'signup' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Create your account 🚀</h2>
                  <p className="text-muted-foreground">Start your AI-powered CRM journey</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="John Smith"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="email"
                        placeholder="john@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Acme Inc"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 h-4 w-4 text-muted-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {/* Password Strength */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Password strength:</span>
                        <span className={cn(
                          "font-bold",
                          passwordStrength(password) < 50 ? "text-red-500" : 
                          passwordStrength(password) < 75 ? "text-amber-500" : "text-emerald-500"
                        )}>
                          {passwordStrength(password) < 50 ? "Weak" : 
                           passwordStrength(password) < 75 ? "Medium" : "Strong"}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden flex">
                        <motion.div 
                          className={cn(
                            "h-full",
                            passwordStrength(password) < 50 ? "bg-red-500" : 
                            passwordStrength(password) < 75 ? "bg-amber-500" : "bg-emerald-500"
                          )}
                          initial={{ width: 0 }}
                          animate={{ width: `${passwordStrength(password)}%` }}
                        />
                      </div>
                      <ul className="mt-2 space-y-1">
                        <li className="flex items-center text-[11px] text-muted-foreground">
                          {password.length >= 8 ? <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-500" /> : <div className="h-3 w-3 mr-1 rounded-full border border-muted-foreground/30" />}
                          8+ characters
                        </li>
                        <li className="flex items-center text-[11px] text-muted-foreground">
                          {(/[A-Z]/.test(password) && /[a-z]/.test(password)) ? <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-500" /> : <div className="h-3 w-3 mr-1 rounded-full border border-muted-foreground/30" />}
                          Uppercase & lowercase
                        </li>
                        <li className="flex items-center text-[11px] text-muted-foreground">
                          {/[0-9]/.test(password) ? <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-500" /> : <div className="h-3 w-3 mr-1 rounded-full border border-muted-foreground/30" />}
                          Number included
                        </li>
                        <li className="flex items-center text-[11px] text-muted-foreground">
                          {/[^A-Za-z0-9]/.test(password) ? <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-500" /> : <div className="h-3 w-3 mr-1 rounded-full border border-muted-foreground/30" />}
                          Special character
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Team Size</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <select 
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary appearance-none"
                        >
                          <option>Just me</option>
                          <option>2-5</option>
                          <option>6-20</option>
                          <option>20+</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Role</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <select 
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary appearance-none"
                        >
                          <option>Sales Rep</option>
                          <option>Sales Manager</option>
                          <option>Founder/CEO</option>
                          <option>Marketing</option>
                          <option>RevOps</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 rounded border-input" 
                    />
                    <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                      I agree to the <button type="button" className="text-primary hover:underline">Terms of Service</button> and <button type="button" className="text-primary hover:underline">Privacy Policy</button>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full active:scale-[0.98] transition-all"
                  >
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account →"}
                  </button>
                </form>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">or sign up with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-6">
                    <button onClick={() => handleSocialClick('Google')} className="flex items-center justify-center rounded-md border border-input bg-background h-10 hover:bg-muted/50 transition-colors">
                      <Globe className="h-5 w-5 mr-2 text-red-500" />
                      <span className="text-xs font-medium">Google</span>
                    </button>
                    <button onClick={() => handleSocialClick('GitHub')} className="flex items-center justify-center rounded-md border border-input bg-background h-10 hover:bg-muted/50 transition-colors">
                      <Github className="h-5 w-5 mr-2" />
                      <span className="text-xs font-medium">GitHub</span>
                    </button>
                    <button onClick={() => handleSocialClick('SSO')} className="flex items-center justify-center rounded-md border border-input bg-background h-10 hover:bg-muted/50 transition-colors">
                      <Lock className="h-4 w-4 mr-2" />
                      <span className="text-xs font-medium">SSO</span>
                    </button>
                  </div>

                  <p className="mt-8 text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <button 
                      onClick={() => setMode('login')}
                      className="font-medium text-primary hover:underline"
                    >
                      Sign in →
                    </button>
                  </p>
                </div>
              </motion.div>
            )}

            {mode === 'forgot-password' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {!emailSent ? (
                  <>
                    <div className="mb-8">
                      <button 
                        onClick={() => setMode('login')}
                        className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Sign In
                      </button>
                      <h2 className="text-3xl font-bold tracking-tight mb-2">🔐 Reset Password</h2>
                      <p className="text-muted-foreground">Enter your email and we'll send you a reset link.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <input
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-9 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full active:scale-[0.98] transition-all"
                      >
                        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Send Reset Link →"}
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Reset link sent!</h2>
                    <p className="text-muted-foreground mb-8">
                      Check your inbox at <span className="text-foreground font-medium">{email}</span>
                    </p>
                    <div className="space-y-4">
                      <button 
                        onClick={() => {
                          setEmailSent(false);
                          setLoading(false);
                        }}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Didn't receive it? Resend in 30s
                      </button>
                      <button 
                        onClick={() => setMode('login')}
                        className="block w-full text-center py-2 px-4 border border-input rounded-md hover:bg-muted transition-colors text-sm font-medium"
                      >
                        Back to Sign In
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Floating AI Decoration on right */}
        <div className="absolute bottom-0 right-0 p-12 opacity-5 pointer-events-none select-none">
          <div className="text-9xl font-bold rotate-12">AI</div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
