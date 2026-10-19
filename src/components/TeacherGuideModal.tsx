import React from 'react';
import { TEACHER_GUIDE_STEPS } from '../data/curriculumData';
import { AppTab } from '../types';
import { playSound } from '../utils/audio';
import { GraduationCap, Clock, HelpCircle, X, ChevronRight, BookOpen, Lightbulb } from 'lucide-react';

interface TeacherGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchTab: (tab: AppTab) => void;
}

export default function TeacherGuideModal({ isOpen, onClose, onSwitchTab }: TeacherGuideModalProps) {
  if (!isOpen) return null;

  const tabMapping: Record<number, AppTab> = {
    1: 'arcade',
    2: 'anatomy',
    3: 'cpu',
    4: 'quiz'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">
              Grade 7 Lesson Plan &amp; Teaching Guide
            </h2>
            <p className="text-xs text-slate-400">
              35-Minute Interactive Classroom Curriculum for Middle School Computer Science
            </p>
          </div>
        </div>

        {/* Lesson Overview Banner */}
        <div className="my-5 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block font-bold mb-0.5">Teacher Tip for Smartboards:</strong>
            You can project this app on the front projector while students follow along on their Chromebooks/tablets or participate as a whole class shouting out answers!
          </div>
        </div>

        {/* 4 Step Timeline */}
        <div className="space-y-4">
          {TEACHER_GUIDE_STEPS.map(step => (
            <div
              key={step.step}
              className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4 sm:p-5 hover:border-slate-700 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center font-black text-sm text-sky-400">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-white text-base flex items-center gap-2">
                      <span>{step.icon}</span>
                      {step.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    {step.time}
                  </span>

                  <button
                    onClick={() => {
                      playSound('step');
                      onSwitchTab(tabMapping[step.step]);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold bg-sky-500/20 text-sky-300 hover:bg-sky-500 hover:text-slate-950 border border-sky-500/30 transition cursor-pointer"
                  >
                    Jump to Tab <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-3">
                {step.description}
              </p>

              {/* Discussion prompts */}
              <div className="bg-slate-900/80 rounded-xl p-3 border border-slate-800/80 text-xs">
                <div className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Classroom Prompts &amp; Activities:
                </div>
                <ul className="space-y-1 text-slate-300 pl-4 list-disc">
                  {step.discussionPrompts.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
