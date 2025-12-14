import React, { useState } from 'react';
import RepoInput from './components/RepoInput';
import Dashboard from './components/Dashboard';
import LoadingOverlay from './components/LoadingOverlay';
import { parseRepoUrl, fetchRepoData } from './services/githubService';
import { analyzeRepoWithGemini } from './services/geminiService';
import { RepoMetadata, AnalysisResult } from './types';
import { AlertCircle } from 'lucide-react';

function App() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [repoData, setRepoData] = useState<RepoMetadata | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async (url: string) => {
    setStatus('loading');
    setErrorMsg('');
    
    try {
      // 1. Parse URL
      const parsed = parseRepoUrl(url);
      if (!parsed) {
        throw new Error("Invalid GitHub URL. Please use format: https://github.com/owner/repo");
      }

      // 2. Fetch GitHub Data
      setLoadingStep(`Fetching data for ${parsed.owner}/${parsed.name}...`);
      const data = await fetchRepoData(parsed.owner, parsed.name);
      setRepoData(data);

      // 3. Analyze with Gemini
      setLoadingStep("AI Agent analyzing code quality and structure...");
      const aiResult = await analyzeRepoWithGemini(data);
      setAnalysisResult(aiResult);

      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An unexpected error occurred.");
      setStatus('error');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setRepoData(null);
    setAnalysisResult(null);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-background text-slate-100 flex flex-col">
      <header className="border-b border-white/5 bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="DevPath AI" 
              className="h-8 w-auto object-contain" 
            />
            <span>DevPath AI</span>
          </div>
          <a href="https://github.com/krupalWarale/" target="_blank" rel="noreferrer" className="text-sm text-slate-400 hover:text-white transition-colors">
            GitHub
          </a>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center">
        {status === 'idle' && (
          <RepoInput onAnalyze={handleAnalyze} isLoading={false} />
        )}

        {status === 'loading' && (
          <LoadingOverlay status={loadingStep} />
        )}

        {status === 'error' && (
          <div className="text-center space-y-6 max-w-md animate-fade-in">
             <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-500 mb-4">
                <AlertCircle className="w-12 h-12" />
             </div>
             <h2 className="text-2xl font-bold text-white">Analysis Failed</h2>
             <p className="text-slate-400">{errorMsg}</p>
             <button 
                onClick={handleReset}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium"
             >
                Try Again
             </button>
          </div>
        )}

        {status === 'success' && repoData && analysisResult && (
          <Dashboard 
            metadata={repoData} 
            result={analysisResult} 
            onReset={handleReset} 
          />
        )}
      </main>

      <footer className="py-6 text-center text-slate-600 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} DevPath AI. AI Code Analysis System.</p>
      </footer>
    </div>
  );
}

export default App;