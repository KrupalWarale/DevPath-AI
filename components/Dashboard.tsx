import React from 'react';
import { AnalysisResult, RepoMetadata } from '../types';
import { Gauge, BookOpen, Layers, Zap, Award, CheckCircle, XCircle, FolderTree } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardProps {
  result: AnalysisResult;
  metadata: RepoMetadata;
  onReset: () => void;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

const Dashboard: React.FC<DashboardProps> = ({ result, metadata, onReset }) => {
  const languageData = Object.entries(metadata.languages).map(([name, value]) => ({
    name,
    value,
  }));

  // Determine badge color
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10';
    if (score >= 70) return 'text-blue-400 border-blue-500/50 bg-blue-500/10';
    if (score >= 50) return 'text-amber-400 border-amber-500/50 bg-amber-500/10';
    return 'text-red-400 border-red-500/50 bg-red-500/10';
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-2">
            <span className="text-slate-400 font-light">{metadata.owner} /</span> {metadata.name}
          </h2>
          <p className="text-slate-400 mt-1 flex items-center gap-4">
             <span className="flex items-center gap-1"><Award className="w-4 h-4" /> {metadata.stars} Stars</span>
             <span className="flex items-center gap-1"><Layers className="w-4 h-4" /> {metadata.forks} Forks</span>
             <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 border border-slate-600">
               {result.difficultyLevel}
             </span>
          </p>
        </div>
        <button 
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors"
        >
          Analyze Another
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Score Card */}
        <div className="md:col-span-1 bg-surface rounded-2xl p-6 border border-white/5 shadow-xl flex flex-col items-center justify-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
           <h3 className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-4">Overall Score</h3>
           <div className={`relative w-40 h-40 rounded-full border-8 flex items-center justify-center ${
              result.overallScore >= 70 ? 'border-blue-500' : result.overallScore >= 50 ? 'border-amber-500' : 'border-red-500'
           }`}>
              <div className="text-center">
                 <span className="text-5xl font-bold text-white block">{result.overallScore}</span>
                 <span className="text-xs text-slate-500">/ 100</span>
              </div>
           </div>
           <p className="mt-6 text-center text-slate-300 italic">"{result.summary}"</p>
        </div>

        {/* Breakdown Stats */}
        <div className="md:col-span-2 space-y-6">
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {result.dimensions.map((dim, idx) => (
                <div key={idx} className="bg-surface p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-slate-200">{dim.name}</h4>
                    <span className={`font-mono font-bold ${getScoreColor(dim.score).split(' ')[0]}`}>
                      {dim.score}/100
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden mb-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" 
                      style={{ width: `${dim.score}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">{dim.feedback}</p>
                </div>
              ))}
           </div>
           
           {/* Tech Stack */}
           <div className="bg-surface p-4 rounded-xl border border-white/5">
              <h4 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Language Distribution</h4>
              <div className="h-24 w-full flex items-center">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={languageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={40}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {languageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                      />
                    </PieChart>
                 </ResponsiveContainer>
                 <div className="flex flex-wrap gap-2 ml-4 flex-1">
                    {languageData.slice(0, 5).map((lang, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                        {lang.name}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* File Structure Card - NEW */}
      <div className="bg-surface rounded-xl p-6 border border-white/5 shadow-lg">
        <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
          <FolderTree className="text-blue-400 w-5 h-5" /> Code File Structure
        </h3>
        <div className="bg-slate-900/50 rounded-lg p-4 overflow-hidden border border-white/5">
          <pre className="text-xs font-mono text-slate-400 overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar max-h-60">
            {metadata.fileStructure}
          </pre>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths & Weaknesses */}
          <div className="space-y-6">
             <div className="bg-surface rounded-xl p-6 border border-white/5">
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                  <CheckCircle className="text-emerald-500 w-5 h-5" /> Key Strengths
                </h3>
                <ul className="space-y-3">
                  {result.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                      {s}
                    </li>
                  ))}
                </ul>
             </div>
             
             <div className="bg-surface rounded-xl p-6 border border-white/5">
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-4">
                  <XCircle className="text-red-500 w-5 h-5" /> Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {result.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                      {w}
                    </li>
                  ))}
                </ul>
             </div>
          </div>

          {/* Roadmap */}
          <div className="bg-surface rounded-xl p-6 border border-white/5 h-full">
              <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-6">
                 <Zap className="text-amber-500 w-5 h-5" /> Personalized Roadmap
              </h3>
              <div className="relative border-l border-slate-700 ml-3 space-y-8">
                  {result.roadmap.map((step, idx) => (
                    <div key={idx} className="relative pl-8">
                       <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 bg-surface ${
                          step.priority === 'High' ? 'border-red-500' :
                          step.priority === 'Medium' ? 'border-amber-500' : 'border-blue-500'
                       }`}></span>
                       <div className="flex justify-between items-start">
                         <h4 className="text-slate-200 font-semibold text-base">{step.title}</h4>
                         <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                            step.priority === 'High' ? 'text-red-400 border-red-500/30 bg-red-500/10' :
                            step.priority === 'Medium' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' :
                            'text-blue-400 border-blue-500/30 bg-blue-500/10'
                         }`}>{step.priority}</span>
                       </div>
                       <p className="text-slate-400 text-sm mt-1 leading-relaxed">
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