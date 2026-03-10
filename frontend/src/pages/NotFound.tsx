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
      
      <h1 className="text-3xl font-bold text-foreground mb-2">
        🤖 Oops! This page seems to have wandered off.
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Even AI couldn't find what you're looking for. It might have been moved or deleted.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          <Home size={20} />
          Go Home
        </button>
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
          className="flex items-center justify-center gap-2 bg-card border border-border px-6 py-3 rounded-xl font-semibold hover:bg-muted hover:scale-105 active:scale-95 transition-all"
        >
          <Search size={20} />
          Search for something
        </button>
      </div>
    </div>
  );
};
