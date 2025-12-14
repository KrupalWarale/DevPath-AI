import React, { useState } from 'react';
import { Search, Github } from 'lucide-react';

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
    <div className="w-full max-w-2xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-surface rounded-full shadow-lg mb-4 ring-1 ring-white/10">
          <Github className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          DevPath AI
        </h1>
        <p className="text-lg text-slate-400 max-w-lg mx-auto">
          AI-powered code analysis. Paste your GitHub repository link below to get a professional audit, score, and personalized roadmap.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
        <div className="relative flex items-center bg-surface rounded-lg shadow-2xl ring-1 ring-white/10 overflow-hidden">
          <div className="pl-4 text-slate-500">
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
            className={`px-8 py-5 font-bold uppercase tracking-wider transition-all duration-200 ${
              isLoading || !url
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-primary hover:bg-blue-600 text-white'
            }`}
          >
            {isLoading ? 'Analyzing...' : 'Audit'}
          </button>
        </div>
      </form>
      
      <div className="flex flex-wrap justify-center gap-4 text-sm text-slate-500 pt-4">
        <span>Try:</span>
        <button onClick={() => setUrl('https://github.com/facebook/react')} className="hover:text-primary transition-colors">facebook/react</button>
        <span>•</span>
        <button onClick={() => setUrl('https://github.com/torvalds/linux')} className="hover:text-primary transition-colors">torvalds/linux</button>
        <span>•</span>
        <button onClick={() => setUrl('https://github.com/airbnb/javascript')} className="hover:text-primary transition-colors">airbnb/javascript</button>
      </div>
    </div>
  );
};

export default RepoInput;