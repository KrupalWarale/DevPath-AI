import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface RepoInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

const RepoInput: React.FC<RepoInputProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-8 relative z-10">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight pt-8">
           <span className="bg-rainbow-gradient text-transparent bg-clip-text animate-text-gradient drop-shadow-[0_0_30px_rgba(126,66,167,0.4)]">DevPath AI</span>
        </h1>
        <p className="text-lg text-slate-300 max-w-lg mx-auto leading-relaxed drop-shadow-sm">
          AI-powered code analysis. Paste your GitHub repository link below to get a <span className="text-primary font-semibold">professional audit</span>, score, and personalized roadmap.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group max-w-xl mx-auto">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-teal via-primary to-neon-purple rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500 animate-pulse-slow"></div>
        <div className="relative flex items-center glass-panel rounded-xl shadow-2xl ring-1 ring-white/10 overflow-hidden">
          <div className="pl-5 text-primary/70">
            <Search className="w-6 h-6" />
          </div>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/username/repository"
            className="w-full px-4 py-5 bg-transparent text-white placeholder-slate-500 focus:outline-none font-mono text-lg"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !url}
            className={`px-8 py-5 font-bold uppercase tracking-wider transition-all duration-300 ${
              isLoading || !url
                ? 'bg-slate-800/50 text-slate-500 cursor-not-allowed'
                : 'bg-blue-gradient text-white hover:shadow-glow-blue hover:scale-105'
            }`}
          >
            {isLoading ? 'Analyzing...' : 'Audit'}
          </button>
        </div>
      </form>
      
      <div className="flex flex-wrap justify-center gap-3 text-sm text-slate-400 pt-6">
        <span className="opacity-70">Try popular repos:</span>
        <button onClick={() => setUrl('https://github.com/facebook/react')} className="px-3 py-1 rounded-full glass-panel hover:bg-white/10 hover:text-primary transition-all border border-white/5 hover:border-primary/30">facebook/react</button>
        <button onClick={() => setUrl('https://github.com/torvalds/linux')} className="px-3 py-1 rounded-full glass-panel hover:bg-white/10 hover:text-primary transition-all border border-white/5 hover:border-primary/30">torvalds/linux</button>
      </div>
    </div>
  );
};

export default RepoInput;