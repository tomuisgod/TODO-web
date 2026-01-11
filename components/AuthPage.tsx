
import React, { useState } from 'react';
import { Icons } from '../constants';

interface AuthPageProps {
  onLogin: (username: string, passcode: string) => boolean;
  onRegister: (username: string, passcode: string) => boolean;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, onRegister }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username || !passcode) {
      setError("Please fill in all fields.");
      return;
    }

    if (mode === 'login') {
      if (!onLogin(username, passcode)) {
        setError("Invalid username or passcode.");
      }
    } else {
      if (!onRegister(username, passcode)) {
        setError("Username already taken.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-indigo-50 to-slate-100">
      <div className="w-full max-w-md p-8 transition-all bg-white shadow-2xl rounded-3xl ring-1 ring-slate-200">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
             <Icons.Lock />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">My TODO Vault</h1>
          <p className="mt-2 text-slate-500 text-sm">Access your private workspace</p>
        </div>

        <div className="flex p-1 bg-slate-100 rounded-xl mt-8 mb-6">
          <button 
            onClick={() => { setMode('login'); setError(null); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Log In
          </button>
          <button 
            onClick={() => { setMode('register'); setError(null); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'register' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Workspace Name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username"
              className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 ml-1">Passcode</label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode"
              className="w-full px-4 py-3 text-lg tracking-widest border border-slate-200 rounded-xl outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all"
            />
          </div>
          
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl">
              <p className="text-xs text-center text-rose-500 font-semibold">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-2 font-bold text-white transition-all bg-indigo-600 rounded-xl hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-100"
          >
            {mode === 'login' ? 'Unlock Workspace' : 'Create Workspace'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Secure Personal Access</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
