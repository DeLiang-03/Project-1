import React, { useState } from 'react';
import { AppTab } from './types';
import ArcadeSorter from './components/ArcadeSorter';
import PcExplorer from './components/PcExplorer';
import CpuSimulator from './components/CpuSimulator';
import BossQuiz from './components/BossQuiz';
import TeacherGuideModal from './components/TeacherGuideModal';
import { playSound, setMuted, getMuted } from './utils/audio';
import { Gamepad2, Cpu, Monitor, Award, Volume2, VolumeX, GraduationCap, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('arcade');
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(() => getMuted());
  const [isTeacherGuideOpen, setIsTeacherGuideOpen] = useState(false);

  const toggleSound = () => {
    const nextState = !isAudioMuted;
    setIsAudioMuted(nextState);
    setMuted(nextState);
    if (!nextState) {
      playSound('step');
    }
  };

  const handleTabChange = (tab: AppTab) => {
    playSound('step');
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500 selection:text-slate-950 font-sans">
      {/* Background radial ambient lights */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-indigo-900/30 via-sky-900/10 to-transparent blur-3xl opacity-80" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-purple-900/10 blur-3xl" />
      </div>

      {/* Sticky Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-purple-600 flex items-center justify-center text-slate-950 shadow-lg shadow-sky-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-2">
                ByteCraft <span className="text-sky-400">Academy</span>
              </div>
              <div className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold hidden sm:block">
                Grade 7 Computer Science Lab
              </div>
            </div>
          </div>

          {/* Navigation Tabs (Desktop & Tablet) */}
          <nav className="hidden md:flex items-center bg-slate-900/90 p-1.5 rounded-full border border-slate-800 shadow-inner">
            <button
              onClick={() => handleTabChange('arcade')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'arcade'
                  ? 'bg-sky-400 text-slate-950 shadow-md shadow-sky-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              🕹️ Arcade
            </button>

            <button
              onClick={() => handleTabChange('anatomy')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'anatomy'
                  ? 'bg-sky-400 text-slate-950 shadow-md shadow-sky-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              🖥️ PC Anatomy
            </button>

            <button
              onClick={() => handleTabChange('cpu')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'cpu'
                  ? 'bg-sky-400 text-slate-950 shadow-md shadow-sky-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              🤖 CPU Sim
            </button>

            <button
              onClick={() => handleTabChange('quiz')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'quiz'
                  ? 'bg-sky-400 text-slate-950 shadow-md shadow-sky-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              🏆 Boss Quiz
            </button>
          </nav>

          {/* Right Action Utilities */}
          <div className="flex items-center gap-2">
            {/* Teacher Lesson Guide Button */}
            <button
              onClick={() => {
                playSound('step');
                setIsTeacherGuideOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition cursor-pointer"
              title="Classroom Teaching Guide"
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Teacher Guide</span>
            </button>

            {/* Mute/Unmute audio button */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                isAudioMuted
                  ? 'bg-rose-950/40 text-rose-400 border-rose-800'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title={isAudioMuted ? 'Unmute Sound' : 'Mute Sound'}
            >
              {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-800 bg-slate-950/90 text-xs">
          <button
            onClick={() => handleTabChange('arcade')}
            className={`flex flex-col items-center py-1 px-3 rounded-lg font-bold ${
              activeTab === 'arcade' ? 'text-sky-400' : 'text-slate-400'
            }`}
          >
            <Gamepad2 className="w-4 h-4 mb-0.5" />
            Arcade
          </button>
          <button
            onClick={() => handleTabChange('anatomy')}
            className={`flex flex-col items-center py-1 px-3 rounded-lg font-bold ${
              activeTab === 'anatomy' ? 'text-sky-400' : 'text-slate-400'
            }`}
          >
            <Monitor className="w-4 h-4 mb-0.5" />
            Anatomy
          </button>
          <button
            onClick={() => handleTabChange('cpu')}
            className={`flex flex-col items-center py-1 px-3 rounded-lg font-bold ${
              activeTab === 'cpu' ? 'text-sky-400' : 'text-slate-400'
            }`}
          >
            <Cpu className="w-4 h-4 mb-0.5" />
            CPU Sim
          </button>
          <button
            onClick={() => handleTabChange('quiz')}
            className={`flex flex-col items-center py-1 px-3 rounded-lg font-bold ${
              activeTab === 'quiz' ? 'text-sky-400' : 'text-slate-400'
            }`}
          >
            <Award className="w-4 h-4 mb-0.5" />
            Quiz
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'arcade' && <ArcadeSorter />}
        {activeTab === 'anatomy' && <PcExplorer />}
        {activeTab === 'cpu' && <CpuSimulator />}
        {activeTab === 'quiz' && <BossQuiz />}
      </main>

      {/* Classroom Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>100% Offline Ready • Zero Cloud Lag • Web Audio Synthesizer Built-in</span>
          </div>
          <div className="text-center sm:text-right text-slate-500">
            ByteCraft Academy • Designed for Middle School Computer Science &amp; Informatics
          </div>
        </div>
      </footer>

      {/* Teacher Guide Modal */}
      <TeacherGuideModal
        isOpen={isTeacherGuideOpen}
        onClose={() => setIsTeacherGuideOpen(false)}
        onSwitchTab={tab => setActiveTab(tab)}
      />
    </div>
  );
}
