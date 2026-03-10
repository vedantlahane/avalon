import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorStateProps {
  title?: string;
  message?: string;
  errorCode?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "We couldn't load the data. This might be a temporary issue.",
  errorCode = "CRM-500",
  onRetry
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 m-6 page-fade-in">
      <div className="bg-red-50 p-4 rounded-full mb-6">
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600 mb-8 max-w-md">{message}</p>
      
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors btn-hover ripple"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Again
          </button>
        )}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center px-6 py-2.5 bg-white text-gray-700 font-semibold rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors btn-hover ripple"
        >
          <Home className="h-4 w-4 mr-2" />
          Go to Dashboard
        </button>
      </div>
      
      <p className="text-sm text-gray-400 font-mono">Error code: {errorCode}</p>
    </div>
  );
};
