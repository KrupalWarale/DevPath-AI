import React from 'react';
import { AnalysisResult, RepoMetadata } from '../types';
import { Layers, Zap, Award, CheckCircle, XCircle, FolderTree, Code2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardProps {
  result: AnalysisResult;
  metadata: RepoMetadata;
  onReset: () => void;
}

const COLORS = ['#72a1de', '#b967db', '#00aaa7', '#4a7bc8', '#8e44ad', '#6070fd'];

const Dashboard: React.FC<DashboardProps> = ({ result, metadata, onReset }) => {
  const languageData = Object.entries(metadata.languages).map(([name, value]) => ({
    name,
    value,
  }));

  // Determine badge color with neon glow style
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_10px_rgba(52,211,153,0.2)]';
    if (score >= 70) return 'text-primary border-primary/50 bg-primary/10 shadow-glow-blue';
    if (score >= 50) return 'text-amber-400 border-amber-500/50 bg-amber-500/10 shadow-[0_0_10px_rgba(251,191,36,0.2)]';
    return 'text-danger border-danger/50 bg-danger/10 shadow-[0_0_10px_rgba(244,67,54,0.2)]';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in pb-12 relative z-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6 bg-black/20 backdrop-blur-sm rounded-xl p-4">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-2 drop-shadow-md">
            <span className="text-slate-500 font-light">{metadata.owner} /</span> 
            <span className="bg-gradient-to-r from-white to-slate-400 text-transparent bg-clip-text">{metadata.name}</span>
          </h2>
          <p className="text-slate-400 mt-2 flex items-center gap-4 text-sm">
             <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-primary" /> {metadata.stars.toLocaleString()} Stars</span>
             <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-neon-purple" /> {metadata.forks.toLocaleString()} Forks</span>
             <span className={`text-xs px-2.5 py-0.5 rounded-full border ${
                 result.difficultyLevel === 'Advanced' ? 'border-neon-purple/50 text-neon-purple bg-neon-purple/10' :
                 result.difficultyLevel === 'Intermediate' ? 'border-primary/50 text-primary bg-primary/10' :
                 'border-neon-teal/50 text-neon-teal bg-neon-teal/10'
             }`}>
               {result.difficultyLevel}
             </span>
          </p>
        </div>
        <button 
          onClick={onReset}
          className="px-5 py-2.5 text-sm font-bold tracking-wide text-white bg-slate-800/50 hover:bg-slate-700/80 border border-white/10 rounded-lg transition-all hover:shadow-glow-blue hover:border-primary/40"
        >
          Analyze Another
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className="md:col-span-1 glass-panel rounded-2xl p-1 border-t border-primary/30 shadow-glow-blue flex flex-col relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50"></div>
           <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 h-full flex flex-col items-center justify-center relative z-10">
               <h3 className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">Overall Quality Score</h3>
               <div className="relative w-48 h-48 flex items-center justify-center">
                  {/* Outer Glow Ring */}
                  <div className={`absolute inset-0 rounded-full border-4 blur-sm opacity-40 ${
                      result.overallScore >= 70 ? 'border-primary' : result.overallScore >= 50 ? 'border-amber-500' : 'border-danger'
                   }`}></div>
                   {/* Main Ring */}
                  <div className={`relative w-full h-full rounded-full border-8 flex items-center justify-center shadow-inner ${
                      result.overallScore >= 70 ? 'border-primary shadow-primary/20' : result.overallScore >= 50 ? 'border-amber-500 shadow-amber-500/20' : 'border-danger shadow-danger/20'
                   }`}>
                      <div className="text-center">
                         <span className="text-6xl font-black text-white block drop-shadow-lg">{result.overallScore}</span>
                         <span className="text-xs text-slate-400 uppercase tracking-widest">/ 100</span>
                      </div>
                   </div>
               </div>
               <p className="mt-8 text-center text-slate-300 italic px-2 border-l-2 border-primary/30 pl-4">
                 "{result.summary}"
               </p>
           </div>
        </div>

        {/* Breakdown Stats */}
        <div className="md:col-span-2 space-y-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.dimensions.map((dim, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-xl border border-white/5 hover:border-primary/30 transition-all hover:bg-white/5 group">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-slate-200 group-hover:text-primary transition-colors">{dim.name}</h4>
                    <span className={`font-mono font-bold ${getScoreColor(dim.score).split(' ')[0]}`}>
                      {dim.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-800/50 h-1.5 rounded-full overflow-hidden mb-3">
                    <div 
                      className="bg-rainbow-gradient h-full rounded-full shadow-[0_0_10px_rgba(114,161,222,0.5)]" 
                      style={{ width: `${dim.score}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{dim.feedback}</p>
                </div>
              ))}
           </div>
           
           {/* Tech Stack */}
           <div className="glass-panel p-5 rounded-xl border border-white/5">
              <h4 className="text-xs font-bold text-slate-400 mb-4 uppercase tracking-widest flex items-center gap-2">
                <Code2 className="w-4 h-4 text-neon-teal" /> Language Distribution
              </h4>
              <div className="h-28 w-full flex items-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={languageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={45}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                      >
                        {languageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'rgba(0,0,0,0.9)', borderColor: 'rgba(255,255,255,0.1)', color: '#fff', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="flex flex-wrap gap-x-6 gap-y-2 ml-4 flex-1">
                    {languageData.slice(0, 5).map((lang, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-2 h-2 rounded-full shadow-[0_0_5px_currentColor]" style={{ backgroundColor: COLORS[idx % COLORS.length], color: COLORS[idx % COLORS.length] }}></span>
                        {lang.name}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* File Structure Card */}
      <div className="glass-panel rounded-xl p-6 border border-white/5 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <FolderTree className="w-32 h-32 text-white" />
        </div>
        <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
          <FolderTree className="text-primary w-5 h-5" /> Project Anatomy
        </h3>
        <div className="bg-black/50 rounded-lg p-4 overflow-hidden border border-white/5 font-mono text-xs">
          <pre className="text-slate-400 overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar max-h-60 selection:bg-primary/20 selection:text-white">
            {metadata.fileStructure}
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths & Weaknesses */}
          <div className="space-y-6">
             <div className="glass-panel rounded-xl p-6 border-l-4 border-l-emerald-500/50">
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                  <CheckCircle className="text-emerald-400 w-5 h-5 shadow-[0_0_10px_rgba(52,211,153,0.4)] rounded-full" /> Key Strengths
                </h3>
                <ul className="space-y-3">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm group">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 group-hover:shadow-[0_0_5px_#10b981] transition-all"></span>
                      {s}
                    </li>
                  ))}
                </ul>
             </div>
             
             <div className="glass-panel rounded-xl p-6 border-l-4 border-l-danger/50">
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                  <XCircle className="text-danger w-5 h-5 shadow-[0_0_10px_rgba(244,67,54,0.4)] rounded-full" /> Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {result.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300 text-sm group">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-danger shrink-0 group-hover:shadow-[0_0_5px_#f44336] transition-all"></span>
                      {w}
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          {/* Roadmap */}
          <div className="glass-panel rounded-xl p-6 border-t-4 border-t-neon-purple/50 h-full relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/5 blur-2xl rounded-full pointer-events-none"></div>
              <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-8">
                 <Zap className="text-amber-400 w-5 h-5 shadow-[0_0_10px_rgba(251,191,36,0.4)] rounded-full" /> Personalized Roadmap
              </h3>
              <div className="relative border-l border-white/10 ml-3 space-y-8">
                  {result.roadmap.map((step, idx) => (
                    <div key={idx} className="relative pl-8 group">
                       <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-black transition-all duration-300 ${
                          step.priority === 'High' ? 'border-danger group-hover:shadow-[0_0_10px_rgba(244,67,54,0.6)]' :
                          step.priority === 'Medium' ? 'border-amber-500 group-hover:shadow-[0_0_10px_rgba(245,158,11,0.6)]' : 'border-primary group-hover:shadow-[0_0_10px_rgba(59,130,246,0.6)]'
                       }`}></span>
                       <div className="flex justify-between items-start mb-1">
                         <h4 className="text-slate-100 font-semibold text-base group-hover:text-white transition-colors">{step.title}</h4>
                         <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border backdrop-blur-sm ${
                            step.priority === 'High' ? 'text-danger border-danger/30 bg-danger/10' :
                            step.priority === 'Medium' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' :
                            'text-primary border-primary/30 bg-primary/10'
                         }`}>{step.priority}</span>
                       </div>
                       <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                         {step.description}
                       </p>
                    </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;