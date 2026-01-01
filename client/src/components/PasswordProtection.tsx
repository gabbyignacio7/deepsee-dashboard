import { useState, useEffect, type ReactNode } from 'react';

interface PasswordProtectionProps {
  children: ReactNode;
}

// Simple client-side password for static hosting (GitHub Pages)
const VALID_PASSWORD = 'DeepSee2025!';
const SESSION_KEY = 'deepsee_auth';

export default function PasswordProtection({ children }: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated in session storage
    const authStatus = sessionStorage.getItem(SESSION_KEY);
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === VALID_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAuthenticated(true);
      setPassword('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">DeepSee Dashboard</h1>
          <p className="text-slate-400 text-sm">Enter password to access</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-md border border-slate-600 bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              data-testid="input-password"
              autoFocus
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-md">
              <p className="text-red-400 text-sm" data-testid="text-error">{error}</p>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            data-testid="button-login"
          >
            Login
          </button>
        </form>
        
        <p className="text-slate-500 text-xs text-center mt-6">
          Session expires when browser closes
        </p>
      </div>
    </div>
  );
}
