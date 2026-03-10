import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (location.pathname === '/') return null;

  return (
    <nav className="flex items-center px-6 py-2 bg-background/50 border-b border-border/40 backdrop-blur-sm">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="text-muted-foreground hover:text-primary transition-colors flex items-center">
            <Home size={14} />
          </Link>
        </li>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isId = value.length > 20 || !isNaN(Number(value)); // Rough check for ID

          // Format the label
          let label = value.charAt(0).toUpperCase() + value.slice(1);
          if (isId) {
            // Try to use a more friendly name if it's an ID
            // For now, just keep it or replace with "Detail"
            label = "Detail";
          }

          return (
            <li key={to} className="flex items-center space-x-2">
              <ChevronRight size={14} className="text-muted-foreground opacity-50" />
              {last ? (
                <span className="text-sm font-bold text-foreground">{label}</span>
              ) : (
                <Link to={to} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
