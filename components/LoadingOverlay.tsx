import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  status: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ status }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-6 animate-pulse">
       <div className="relative">
         <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full"></div>
         <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
       </div>
       <div className="text-center space-y-2">
         <h3 className="text-xl font-semibold text-white">Analyzing Repository</h3>
         <p className="text-slate-400 font-mono text-sm">{status}</p>
       </div>
       
       <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
         <div className="h-full bg-primary animate-progress origin-left"></div>
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
