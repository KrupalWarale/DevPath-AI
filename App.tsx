import React, { useState, useMemo } from 'react';
import RepoInput from './components/RepoInput';
import Dashboard from './components/Dashboard';
import LoadingOverlay from './components/LoadingOverlay';
import { parseRepoUrl, fetchRepoData } from './services/githubService';
import { analyzeRepoWithGemini } from './services/geminiService';
import { RepoMetadata, AnalysisResult } from './types';
import { AlertCircle, Github, User } from 'lucide-react';

// Generate static stars data once
const generateStars = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1, // 1px to 3px
    duration: Math.random() * 10 + 20, // 20s to 30s
    delay: Math.random() * -20, // Start at different times
    opacity: Math.random() * 0.5 + 0.3
  }));
};

function App() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [repoData, setRepoData] = useState<RepoMetadata | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [imgError, setImgError] = useState(false);

  // Memoize stars to prevent regeneration on re-renders
  const stars = useMemo(() => generateStars(50), []);

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
      setLoadingStep(`Crawling repository ${parsed.owner}/${parsed.name}...`);
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
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans selection:bg-primary/30 selection:text-white overflow-x-hidden relative">
      
      {/* Global Background Layers */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         {/* Deep Space Base */}
         <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050510] to-black"></div>
         
         {/* Nebula / Glow Effects */}
         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[100px] rounded-full"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-purple/5 blur-[100px] rounded-full"></div>
         
         {/* Moving Stars */}
         {stars.map(star => (
            <div
              key={star.id}
              className="star-particle animate-float-up"
              style={{
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.opacity,
                animationDuration: `${star.duration}s`,
                animationDelay: `${star.delay}s`
              }}
            />
          ))}
      </div>

      {/* Navbar with distinct deep slate background for separation */}
      <header className="relative border-b border-white/5 sticky top-0 z-50 h-16 shadow-lg bg-[#0B1121] backdrop-blur-md">
         
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between relative z-10">
          <div className="font-bold text-xl tracking-tighter flex items-center gap-3 group cursor-default">
            <div className="p-1.5 bg-primary/10 rounded-lg border border-primary/20 backdrop-blur-md shadow-glow-blue transition-all group-hover:shadow-[0_0_15px_rgba(114,161,222,0.4)]">
              <Github className="w-6 h-6 text-primary" />
            </div>
            <span className="bg-gradient-to-r from-white to-slate-400 text-transparent bg-clip-text font-extrabold drop-shadow-sm">DevPath AI</span>
          </div>
          
          <a 
            href="https://github.com/krupalWarale/" 
            target="_blank" 
            rel="noreferrer" 
            className="flex items-center gap-3 hover:bg-white/5 px-3 py-1.5 rounded-full transition-all border border-transparent hover:border-white/10 group"
          >
            <span className="text-sm font-medium text-slate-300 hidden sm:block group-hover:text-white transition-colors">krupalWarale</span>
            
            {!imgError ? (
              <img 
                src="https://github.com/krupalWarale.png" 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-white/10 group-hover:border-primary/50 group-hover:shadow-glow-blue transition-all bg-slate-800"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 group-hover:border-primary/50 group-hover:shadow-glow-blue transition-all">
                 <User className="w-4 h-4 text-slate-400 group-hover:text-white" />
              </div>
            )}
          </a>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center relative z-10">
        
        {status === 'idle' && (
          <RepoInput onAnalyze={handleAnalyze} isLoading={false} />
        )}

        {status === 'loading' && (
          <LoadingOverlay status={loadingStep} />
        )}

        {status === 'error' && (
          <div className="text-center space-y-6 max-w-md animate-fade-in glass-panel p-8 rounded-2xl shadow-glow-purple border-danger/30">
             <div className="inline-flex p-4 rounded-full bg-danger/10 text-danger mb-4 ring-1 ring-danger/20 shadow-[0_0_20px_rgba(244,67,54,0.3)]">
                <AlertCircle className="w-12 h-12" />
             </div>
             <h2 className="text-2xl font-bold text-white drop-shadow-md">Analysis Failed</h2>
             <p className="text-slate-300">{errorMsg}</p>
             <button 
                onClick={handleReset}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium border border-white/10 hover:shadow-glow-blue"
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

      {/* Footer with distinct deep slate background for separation */}
      <footer className="py-6 text-center text-slate-500 text-sm border-t border-white/5 relative z-10 bg-[#0B1121]">
        <p>© {new Date().getFullYear()} DevPath AI. AI Code Analysis System.</p>
      </footer>
    </div>
  );
}

export default App;