import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/curriculumData';
import { playSound } from '../utils/audio';
import CertificateModal from './CertificateModal';
import { Trophy, CheckCircle2, XCircle, RotateCcw, ArrowRight, Award, Sparkles, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BossQuiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      playSound('correct');
      setScore(s => s + 1);
    } else {
      playSound('wrong');
    }
  };

  const handleNext = () => {
    playSound('step');
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      playSound('fanfare');
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestart = () => {
    playSound('step');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
    setShowCertificate(false);
  };

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-md shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Level 4: The Boss Challenge
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Junior Computer Scientist Certification Quiz
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Test your knowledge on hardware, software, CPU execution, and PC memory to unlock your official Certificate of Achievement!
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Score</div>
                <div className="text-lg font-black text-amber-300">
                  {score} / {QUIZ_QUESTIONS.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {!isCompleted && (
          <div className="mt-6">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5 font-semibold">
              <span>Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-sky-400 to-amber-400 transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {!isCompleted ? (
        /* Active Question Card */
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-slate-800 text-sky-400 border border-slate-700">
              Category: {currentQ.category}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-snug mb-6">
            {currentQuestionIndex + 1}. {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isChosen = selectedAnswer === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = 'bg-slate-950/70 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 text-slate-200';
              if (isAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg shadow-emerald-950/50';
                } else if (isChosen && !isCorrect) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-xl border font-medium text-sm transition-all duration-200 flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {isAnswered && (
                    <div>
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {isChosen && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Explanation */}
          {isAnswered && (
            <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 animate-fadeIn">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white block font-bold mb-1">
                    {selectedAnswer === currentQ.correctIndex ? '🎉 Excellent work!' : '💡 Explanation:'}
                  </strong>
                  {currentQ.explanation}
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-lg shadow-sky-900/30 transition cursor-pointer"
                >
                  {currentQuestionIndex + 1 < QUIZ_QUESTIONS.length ? 'Next Question' : 'View Results'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results Celebration Screen */
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-4xl mb-4 shadow-xl">
            🏆
          </div>

          <h3 className="text-3xl font-black text-white">
            Quiz Battle Complete!
          </h3>

          <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto leading-relaxed">
            You scored <strong className="text-amber-400 font-bold">{score} out of {QUIZ_QUESTIONS.length}</strong> ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)!
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                playSound('success');
                setShowCertificate(true);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-extrabold text-sm bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 shadow-xl shadow-amber-900/40 transition transform hover:scale-105 cursor-pointer"
            >
              <Award className="w-5 h-5 text-slate-950" />
              Claim My Certificate
            </button>

            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Quiz
            </button>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={showCertificate}
        onClose={() => setShowCertificate(false)}
        score={score}
        totalQuestions={QUIZ_QUESTIONS.length}
      />
    </div>
  );
}
