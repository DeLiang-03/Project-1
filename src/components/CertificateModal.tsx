import React, { useState } from 'react';
import { Award, Printer, X, CheckCircle, ShieldCheck } from 'lucide-react';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
}

export default function CertificateModal({ isOpen, onClose, score, totalQuestions }: CertificateModalProps) {
  const [studentName, setStudentName] = useState('Alex Morgan');
  const [schoolName, setSchoolName] = useState('Grade 7 Computer Science Class');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Customization Fields for Classroom */}
        <div className="mb-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300">
          <div className="font-bold text-white mb-2 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            Customize Your Certificate:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Student Name:</label>
              <input
                type="text"
                value={studentName}
                onChange={e => setStudentName(e.target.value)}
                placeholder="Enter Student Name"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-bold focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">School / Class:</label>
              <input
                type="text"
                value={schoolName}
                onChange={e => setSchoolName(e.target.value)}
                placeholder="Grade 7 Informatics"
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div
          id="printable-certificate"
          className="bg-white text-slate-900 rounded-2xl p-8 sm:p-10 border-8 border-amber-500 shadow-2xl text-center relative overflow-hidden select-none"
        >
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-600" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-600" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-600" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-600" />

          {/* Watermark Logo */}
          <div className="text-xs uppercase tracking-widest font-black text-amber-600 mb-1">
            ByteCraft Academy • Computer Science Lab
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1 font-serif uppercase">
            Certificate of Achievement
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 italic mb-6">
            Official Junior Computer Scientist Credential
          </p>

          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">
            This certifies that
          </p>

          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-950 border-b-2 border-amber-400 pb-1 mb-4 inline-block px-8 max-w-full truncate">
            {studentName || 'Distinguished Student'}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-6">
            has successfully mastered the foundational principles of <strong>Computer Hardware vs. System Software</strong>, explored internal PC architecture, and completed hands-on <strong>Fetch-Decode-Execute Micro-CPU simulation</strong>.
          </p>

          {/* Badge & Signature Footer */}
          <div className="grid grid-cols-3 items-center pt-6 border-t border-slate-200 mt-4 text-left">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">Date Issued</div>
              <div className="text-xs font-semibold text-slate-800">{today}</div>
              <div className="text-[10px] text-slate-500 mt-1">{schoolName}</div>
            </div>

            {/* Gold Seal Emblem */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 border-4 border-amber-600 flex items-center justify-center shadow-lg transform hover:scale-105 transition">
                <ShieldCheck className="w-8 h-8 text-amber-950" />
              </div>
              <span className="text-[9px] font-black uppercase text-amber-800 mt-1 tracking-wider">
                Score: {score}/{totalQuestions}
              </span>
            </div>

            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400">ByteCraft Authority</div>
              <div className="text-xs font-serif italic text-slate-800 font-bold">Grade 7 CS Faculty</div>
              <div className="text-[10px] text-slate-500 mt-1">Verified Credential</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-end mt-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-900/30 transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print or Save as PDF
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
