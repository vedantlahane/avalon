import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Home, Search } from 'lucide-react';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <Bot size={48} className="text-primary" />
      </div>
      
      <h1 className="text-[24px] font-bold text-[var(--text-primary)] mb-2">
        🤖 Oops! Page not found
      </h1>
      <p className="text-[14px] text-[var(--text-muted)] mb-8 max-w-md">
        Even AI couldn't find what you're looking for.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 bg-[var(--accent)] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
        >
          <Home size={20} />
          Go Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;