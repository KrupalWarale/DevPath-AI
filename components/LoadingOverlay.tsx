import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  status: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ status }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-8 animate-fade-in relative z-10">
       <div className="relative">
         <div className="absolute inset-0 bg-primary blur-2xl opacity-20 rounded-full animate-pulse-slow"></div>
         <div className="relative p-6 glass-panel rounded-full border border-primary/20 shadow-glow-blue">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
         </div>
       </div>
       <div className="text-center space-y-3">
         <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-lg">Analyzing Repository</h3>
         <p className="text-slate-400 font-mono text-sm max-w-xs mx-auto animate-pulse">{status}</p>
       </div>
       
       <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden shadow-inner border border-white/5">
         <div className="h-full bg-rainbow-gradient animate-progress origin-left shadow-[0_0_10px_rgba(114,161,222,0.5)]"></div>
       </div>
       
       <style>{`
         @keyframes progress {
           0% { width: 0%; }
           50% { width: 70%; }
           100% { width: 100%; }
         }
         .animate-progress {
           animation: progress 2s infinite ease-in-out;
         }
       `}</style>
    </div>
  );
};

export default LoadingOverlay;