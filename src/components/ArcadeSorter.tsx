import React, { useState, useEffect, useCallback } from 'react';
import { SORTER_ITEMS } from '../data/curriculumData';
import { SorterItem } from '../types';
import { playSound } from '../utils/audio';
import { Trophy, Flame, Sparkles, CheckCircle2, XCircle, RotateCcw, HelpCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ArcadeSorter() {
  const [items, setItems] = useState<SorterItem[]>(() => [...SORTER_ITEMS].sort(() => Math.random() - 0.5));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lastFeedback, setLastFeedback] = useState<{
    isCorrect: boolean;
    item: SorterItem;
    message: string;
  } | null>(null);
  const [itemsAnswered, setItemsAnswered] = useState(0);

  const currentItem = items[currentIndex % items.length];

  const handleChoice = useCallback((choice: 'hardware' | 'software') => {
    const isCorrect = choice === currentItem.type;
    setItemsAnswered(prev => prev + 1);

    if (isCorrect) {
      playSound('correct');
      const pointGain = 10 + Math.min(streak * 2, 20);
      setScore(s => s + pointGain);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);

      if (newStreak === 5 || newStreak === 10) {
        playSound('success');
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }

      setLastFeedback({
        isCorrect: true,
        item: currentItem,
        message: `Spot on! ${currentItem.fact}`
      });
    } else {
      playSound('wrong');
      setStreak(0);
      setLastFeedback({
        isCorrect: false,
        item: currentItem,
        message: `Oops! ${currentItem.name} is ${currentItem.type.toUpperCase()}. ${currentItem.fact}`
      });
    }

    // Move to next card
    setCurrentIndex(i => (i + 1) % items.length);
  }, [currentItem, streak, bestStreak, items.length]);

  // Keyboard controls for rapid gameplay (H = Hardware, S = Software)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'h' || e.key === 'H' || e.key === 'ArrowLeft') {
        e.preventDefault();
        handleChoice('hardware');
      } else if (e.key === 's' || e.key === 'S' || e.key === 'ArrowRight') {
        e.preventDefault();
        handleChoice('software');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleChoice]);

  const restartGame = () => {
    playSound('step');
    setItems([...SORTER_ITEMS].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setLastFeedback(null);
    setItemsAnswered(0);
  };

  return (
    <div className="space-y-6">
      {/* Intro banner */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-md shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Level 1: Fast-Paced Arcade
              </span>
              <span className="text-xs text-slate-400 font-mono">Press [H] or [S] on keyboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Hardware vs. Software Arcade
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              <strong className="text-sky-400">The Golden Rule:</strong> If you can physically hold, touch, or plug it in, it’s <strong className="text-blue-400">HARDWARE</strong>. If it consists of digital code, apps, or instructions running in memory, it’s <strong className="text-pink-400">SOFTWARE</strong>!
            </p>
          </div>

          <button
            onClick={restartGame}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 transition"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Score
          </button>
        </div>

        {/* Scoreboard stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800">
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500/20 text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Score</div>
              <div className="text-2xl font-black text-amber-300">{score}</div>
            </div>
          </div>

          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 flex items-center gap-3">
            <div className={`p-2.5 rounded-lg ${streak > 0 ? 'bg-orange-500/20 text-orange-400 animate-pulse' : 'bg-slate-800 text-slate-500'}`}>
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Streak</div>
              <div className="text-2xl font-black text-orange-400 flex items-center gap-1">
                {streak}
                {streak >= 3 && <span className="text-xs font-normal px-1.5 py-0.5 rounded bg-orange-950 text-orange-300">🔥 ON FIRE</span>}
              </div>
            </div>
          </div>

          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-500/20 text-purple-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Best Streak</div>
              <div className="text-2xl font-black text-purple-300">{bestStreak}</div>
            </div>
          </div>

          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800 flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-semibold">Solved</div>
              <div className="text-2xl font-black text-emerald-300">{itemsAnswered}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main card stage */}
      <div className="flex flex-col items-center">
        {/* Active item card */}
        <div className="w-full max-w-lg bg-gradient-to-b from-slate-800/90 to-slate-900 border-2 border-slate-700/80 rounded-2xl p-8 text-center shadow-2xl relative transition-all duration-300 transform hover:-translate-y-1">
          <div className="absolute top-3 right-3 text-xs font-mono text-slate-500">
            Card #{((currentIndex) % items.length) + 1} of {items.length}
          </div>

          <div className="w-24 h-24 mx-auto mb-4 bg-slate-950/80 border border-slate-700/60 rounded-2xl flex items-center justify-center text-5xl shadow-inner select-none transition-transform duration-200 hover:scale-110">
            {currentItem.emoji}
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
            {currentItem.name}
          </h3>

          <p className="text-slate-400 text-sm mt-2">
            Is this item physical tangible machinery, or digital code instructions?
          </p>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <button
              onClick={() => handleChoice('hardware')}
              className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white font-bold shadow-lg shadow-blue-900/30 border border-blue-400/30 transition-all transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/50 cursor-pointer"
            >
              <div className="text-lg tracking-wide uppercase font-black">HARDWARE</div>
              <span className="text-xs text-blue-100/80 font-medium mt-0.5">Physical / Tangible</span>
              <span className="absolute bottom-1 right-2 text-[10px] text-blue-200/50 font-mono hidden sm:inline">[Key H]</span>
            </button>

            <button
              onClick={() => handleChoice('software')}
              className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-pink-600 to-rose-700 hover:from-pink-500 hover:to-rose-600 text-white font-bold shadow-lg shadow-pink-900/30 border border-pink-400/30 transition-all transform active:scale-95 focus:outline-none focus:ring-4 focus:ring-pink-500/50 cursor-pointer"
            >
              <div className="text-lg tracking-wide uppercase font-black">SOFTWARE</div>
              <span className="text-xs text-pink-100/80 font-medium mt-0.5">Code &amp; Programs</span>
              <span className="absolute bottom-1 right-2 text-[10px] text-pink-200/50 font-mono hidden sm:inline">[Key S]</span>
            </button>
          </div>
        </div>

        {/* Live educational feedback banner */}
        {lastFeedback && (
          <div
            className={`w-full max-w-lg mt-4 p-4 rounded-xl border flex items-start gap-3 transition-all animate-fadeIn ${
              lastFeedback.isCorrect
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/60 border-rose-500/50 text-rose-200'
            }`}
          >
            {lastFeedback.isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div className="text-sm">
              <div className="font-bold flex items-center gap-1.5">
                {lastFeedback.isCorrect ? 'Correct Answer!' : 'Learning Moment!'}
                <span className="text-xs font-normal opacity-80 uppercase tracking-wider">
                  ({lastFeedback.item.name} = {lastFeedback.item.type.toUpperCase()})
                </span>
              </div>
              <p className="mt-1 leading-snug">{lastFeedback.message}</p>
            </div>
          </div>
        )}

        {/* Quick cheat-sheet helper accordion / tip */}
        <div className="w-full max-w-lg mt-6 bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 font-bold text-slate-300 mb-2">
            <HelpCircle className="w-4 h-4 text-sky-400" />
            Grade 7 Memory Shortcut
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="p-2 rounded bg-slate-950/50 border border-slate-800/80">
              <span className="font-bold text-blue-400">Hardware:</span> Keyboard, Monitor, GPU, CPU, RAM, Mouse, SSD, Cables. (You can physically weigh them!)
            </div>
            <div className="p-2 rounded bg-slate-950/50 border border-slate-800/80">
              <span className="font-bold text-pink-400">Software:</span> Apps, Games, Web Browsers, Operating Systems, Video Files, Python code. (Invisible logic!)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
