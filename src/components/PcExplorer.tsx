import React, { useState } from 'react';
import { PC_COMPONENTS } from '../data/curriculumData';
import { playSound } from '../utils/audio';
import { Cpu, Zap, Database, Palette, CircuitBoard, Heart, Snowflake, Sparkles, HelpCircle, Layers, Check, X } from 'lucide-react';

export default function PcExplorer() {
  const [selectedId, setSelectedId] = useState<string>('cpu');
  const [viewMode, setViewMode] = useState<'explorer' | 'ramVsSsd'>('explorer');

  const selectedComp = PC_COMPONENTS.find(c => c.id === selectedId) || PC_COMPONENTS[0];

  const handleSelect = (id: string) => {
    playSound('step');
    setSelectedId(id);
  };

  const getComponentIcon = (id: string) => {
    switch (id) {
      case 'cpu': return <Cpu className="w-6 h-6 text-sky-400" />;
      case 'ram': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'ssd': return <Database className="w-6 h-6 text-emerald-400" />;
      case 'gpu': return <Palette className="w-6 h-6 text-pink-400" />;
      case 'mobo': return <CircuitBoard className="w-6 h-6 text-indigo-400" />;
      case 'psu': return <Heart className="w-6 h-6 text-rose-400" />;
      case 'cooling': return <Snowflake className="w-6 h-6 text-cyan-400" />;
      default: return <Cpu className="w-6 h-6 text-sky-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Sub-navigation */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-md shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase bg-sky-500/20 text-sky-400 border border-sky-500/30">
              Level 2: Computer Anatomy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Inside the PC: X-Ray Explorer
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Understand the physical machinery inside desktop towers, laptops, and consoles using unforgettable everyday analogies!
            </p>
          </div>

          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => { playSound('click'); setViewMode('explorer'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'explorer' ? 'bg-sky-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <CircuitBoard className="w-4 h-4" />
              X-Ray Components
            </button>
            <button
              onClick={() => { playSound('click'); setViewMode('ramVsSsd'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === 'ramVsSsd' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              RAM vs. SSD Showdown
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'explorer' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Component Selection Grid (Left / Top) */}
          <div className="lg:col-span-5 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
              Select a Vital Component:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
              {PC_COMPONENTS.map(comp => {
                const isSelected = comp.id === selectedId;
                return (
                  <button
                    key={comp.id}
                    onClick={() => handleSelect(comp.id)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center gap-3.5 cursor-pointer ${
                      isSelected
                        ? 'bg-sky-950/60 border-sky-400 shadow-lg shadow-sky-950/50 scale-[1.01]'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-950 flex items-center justify-center text-2xl shrink-0 border border-slate-800">
                      {comp.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className={`font-bold text-sm truncate ${isSelected ? 'text-sky-300' : 'text-white'}`}>
                          {comp.shortName}
                        </div>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                        )}
                      </div>
                      <div className="text-xs text-slate-400 truncate mt-0.5">
                        {comp.analogyTitle.replace('ANALOGY: ', '')}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Component Detail Spotlight (Right) */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative flex flex-col justify-between">
            <div>
              {/* Analogy badge */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  {selectedComp.analogyTitle}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedComp.role}
                </span>
              </div>

              {/* Title & Icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center text-3xl shadow-inner">
                  {selectedComp.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white">
                    {selectedComp.name}
                  </h3>
                  <p className="text-xs text-sky-400 font-medium">
                    {selectedComp.connections.join(' • ')}
                  </p>
                </div>
              </div>

              {/* Analogy Deep Dive Card */}
              <div className="bg-gradient-to-r from-purple-950/40 to-slate-950/70 border border-purple-900/50 rounded-xl p-4 mb-4">
                <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Real-World Superpower Analogy
                </div>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {selectedComp.analogy}
                </p>
              </div>

              {/* Technical Description */}
              <div className="text-slate-300 text-sm leading-relaxed mb-4">
                {selectedComp.description}
              </div>

              {/* Fun Fact banner */}
              <div className="bg-sky-950/40 border-l-4 border-sky-400 p-3.5 rounded-r-xl text-xs text-slate-200 mb-6">
                <strong className="text-sky-300 font-bold block mb-1">💡 Mind-Blowing Tech Fact:</strong>
                {selectedComp.funFact}
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-xs font-bold text-slate-400 uppercase mb-2">Key Hardware Specifications:</div>
              <div className="grid grid-cols-2 gap-2">
                {selectedComp.keySpecs.map((spec, i) => (
                  <div key={i} className="bg-slate-950/70 border border-slate-800/80 p-2.5 rounded-lg">
                    <span className="text-[11px] text-slate-400 block">{spec.label}</span>
                    <span className="text-xs font-bold text-slate-200">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* RAM vs SSD Comparison Table */
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Crucial Grade 7 Concept
            </span>
            <h3 className="text-2xl font-black text-white mt-2">
              RAM (Memory) vs. SSD (Storage)
            </h3>
            <p className="text-slate-300 text-sm mt-1">
              Many students confuse memory with storage. Here is the definitive showdown between the two!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* RAM Column */}
            <div className="bg-slate-950/80 border-2 border-amber-500/40 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-3xl">
                  ⚡
                </div>
                <div>
                  <h4 className="text-xl font-black text-amber-300">RAM (Memory)</h4>
                  <p className="text-xs text-slate-400">Random Access Memory</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-semibold">Analogy</div>
                  <div className="font-bold text-white mt-0.5">Your Study Desk Surface</div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-semibold">Speed</div>
                  <div className="font-bold text-emerald-400 mt-0.5">Blazing Fast (~60 nanoseconds)</div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-semibold">Power Off (Volatility)</div>
                  <div className="font-bold text-rose-400 mt-0.5 flex items-center gap-1.5">
                    <X className="w-4 h-4" /> Erased Completely (Volatile)
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-semibold">Typical Capacity</div>
                  <div className="font-bold text-white mt-0.5">8 GB, 16 GB, or 32 GB</div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-semibold">What is inside it?</div>
                  <div className="text-slate-300 text-xs mt-0.5 leading-snug">
                    Active game windows, open browser tabs, running Discord voice chats.
                  </div>
                </div>
              </div>
            </div>

            {/* SSD Column */}
            <div className="bg-slate-950/80 border-2 border-emerald-500/40 rounded-2xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-3xl">
                  🗄️
                </div>
                <div>
                  <h4 className="text-xl font-black text-emerald-300">SSD (Storage)</h4>
                  <p className="text-xs text-slate-400">Solid State Drive / Hard Drive</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-semibold">Analogy</div>
                  <div className="font-bold text-white mt-0.5">Giant Bookshelf / Warehouse</div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-semibold">Speed</div>
                  <div className="font-bold text-sky-400 mt-0.5">Fast, but 100x slower than RAM</div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-semibold">Power Off (Volatility)</div>
                  <div className="font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> 100% Saved Safely (Non-Volatile)
                  </div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-semibold">Typical Capacity</div>
                  <div className="font-bold text-white mt-0.5">512 GB, 1,000 GB (1TB), 2,000 GB</div>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 font-semibold">What is inside it?</div>
                  <div className="text-slate-300 text-xs mt-0.5 leading-snug">
                    All downloaded games, family photos, school files, and the Operating System.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
