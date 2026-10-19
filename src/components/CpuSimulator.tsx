import React, { useState, useEffect, useRef } from 'react';
import { CPU_PROGRAM_PRESETS } from '../data/curriculumData';
import { playSound } from '../utils/audio';
import { Play, Pause, StepForward, RotateCcw, Cpu, Monitor, Binary, Info, CheckCircle, Terminal } from 'lucide-react';

export default function CpuSimulator() {
  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const preset = CPU_PROGRAM_PRESETS[activePresetIndex];

  // CPU internal hardware state
  const [stepIndex, setStepIndex] = useState(0);
  const [stage, setStage] = useState<'IDLE' | 'FETCH' | 'DECODE' | 'EXECUTE' | 'OUTPUT' | 'HALTED'>('IDLE');
  const [regA, setRegA] = useState<number>(0);
  const [regB, setRegB] = useState<number>(0);
  const [aluResult, setAluResult] = useState<number>(0);
  const [aluOp, setAluOp] = useState<string>('NONE');
  const [instRegister, setInstRegister] = useState<string>('READY');
  const [logs, setLogs] = useState<string[]>([
    '> System booted: Clock frequency set to educational speed.',
    '> Ready to execute program from memory address 0x00...'
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [showBinary, setShowBinary] = useState(false);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll console monitor
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Convert number to 8-bit binary string
  const toBinary = (val: number) => {
    const clamped = Math.max(0, Math.min(255, val));
    return clamped.toString(2).padStart(8, '0');
  };

  const handleReset = () => {
    playSound('step');
    setIsRunning(false);
    setStepIndex(0);
    setStage('IDLE');
    setRegA(0);
    setRegB(0);
    setAluResult(0);
    setAluOp('NONE');
    setInstRegister('READY');
    setLogs([
      `> [RESET] Loaded preset program: "${preset.name}".`,
      '> RAM loaded with 5 instructions. Ready for Step 1.'
    ]);
  };

  const executeNextStep = () => {
    if (stepIndex >= preset.instructions.length) {
      playSound('clock');
      setStage('HALTED');
      setIsRunning(false);
      return;
    }

    const currentInst = preset.instructions[stepIndex];
    playSound('step');

    switch (currentInst.type) {
      case 'LOAD_A': {
        const val = currentInst.operand ?? 0;
        setStage('FETCH');
        setInstRegister(currentInst.code);
        setRegA(val);
        setLogs(prev => [
          ...prev,
          `> [STEP ${stepIndex + 1} - FETCH & LOAD] Bus transferred value ${val} (${toBinary(val)}b) into Register A.`
        ]);
        break;
      }
      case 'LOAD_B': {
        const val = currentInst.operand ?? 0;
        setStage('FETCH');
        setInstRegister(currentInst.code);
        setRegB(val);
        setLogs(prev => [
          ...prev,
          `> [STEP ${stepIndex + 1} - FETCH & LOAD] Bus transferred value ${val} (${toBinary(val)}b) into Register B.`
        ]);
        break;
      }
      case 'ADD': {
        const res = regA + regB;
        setStage('EXECUTE');
        setInstRegister(currentInst.code);
        setAluOp('ADD (+)');
        setAluResult(res);
        setLogs(prev => [
          ...prev,
          `> [STEP ${stepIndex + 1} - EXECUTE ALU] Math unit added ${regA} + ${regB} = ${res}.`
        ]);
        break;
      }
      case 'SUB': {
        const res = regA - regB;
        setStage('EXECUTE');
        setInstRegister(currentInst.code);
        setAluOp('SUB (-)');
        setAluResult(res);
        setLogs(prev => [
          ...prev,
          `> [STEP ${stepIndex + 1} - EXECUTE ALU] Math unit subtracted ${regA} - ${regB} = ${res}.`
        ]);
        break;
      }
      case 'MULTIPLY': {
        const res = regA * regB;
        setStage('EXECUTE');
        setInstRegister(currentInst.code);
        setAluOp('MUL (×)');
        setAluResult(res);
        setLogs(prev => [
          ...prev,
          `> [STEP ${stepIndex + 1} - EXECUTE ALU] Math unit multiplied ${regA} × ${regB} = ${res}.`
        ]);
        break;
      }
      case 'PRINT': {
        setStage('OUTPUT');
        setInstRegister(currentInst.code);
        setLogs(prev => [
          ...prev,
          `> [STEP ${stepIndex + 1} - OUTPUT] 🖥️ SCREEN DISPLAY: Output = ${aluResult}`
        ]);
        break;
      }
      case 'HALT': {
        setStage('HALTED');
        setInstRegister('HALT');
        playSound('success');
        setLogs(prev => [
          ...prev,
          `> [STEP ${stepIndex + 1} - HALT] 🏁 CPU instruction cycle completed! Program finished.`
        ]);
        setIsRunning(false);
        break;
      }
    }

    setStepIndex(prev => prev + 1);
  };

  // Clock runner effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      if (stepIndex >= preset.instructions.length) {
        setIsRunning(false);
      } else {
        timer = setTimeout(() => {
          executeNextStep();
        }, 1100);
      }
    }
    return () => clearTimeout(timer);
  }, [isRunning, stepIndex, preset, regA, regB, aluResult]);

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 backdrop-blur-md shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase bg-purple-500/20 text-purple-400 border border-purple-500/30">
              Level 3: Micro-CPU Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Fetch, Decode, Execute: The CPU in Slow Motion
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              How does software actually control hardware? Watch assembly instructions move from memory into CPU registers and execute through the Arithmetic Logic Unit (ALU)!
            </p>
          </div>

          <button
            onClick={() => { playSound('click'); setShowBinary(b => !b); }}
            className={`self-start md:self-auto flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition ${
              showBinary ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <Binary className="w-4 h-4" />
            {showBinary ? 'Binary Mode: ON (8-bit)' : 'View in Binary'}
          </button>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-800">
          <span className="text-xs font-bold uppercase text-slate-400 mr-1">Select Program:</span>
          {CPU_PROGRAM_PRESETS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActivePresetIndex(idx);
                setStepIndex(0);
                setStage('IDLE');
                setRegA(0);
                setRegB(0);
                setAluResult(0);
                setAluOp('NONE');
                setInstRegister('READY');
                setIsRunning(false);
                setLogs([`> Switched to program: "${p.name}". Ready.`]);
                playSound('step');
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                activePresetIndex === idx
                  ? 'bg-sky-500 text-slate-950 border-sky-400 font-extrabold'
                  : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Simulator Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Program Memory / RAM Table */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-white text-base">
                  Program Memory (RAM)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">Address 0x00 - 0x04</span>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              The CPU reads one instruction line per cycle using the Program Counter (PC).
            </p>

            {/* Instruction Lines */}
            <div className="space-y-2">
              {preset.instructions.map((inst, idx) => {
                const isCurrent = stepIndex === idx && stage !== 'HALTED';
                const isExecuted = stepIndex > idx;
                return (
                  <div
                    key={inst.id}
                    className={`p-3 rounded-xl border font-mono text-xs transition-all duration-200 ${
                      isCurrent
                        ? 'bg-sky-950/80 border-sky-400 text-white shadow-lg shadow-sky-950/40 ring-2 ring-sky-500/30'
                        : isExecuted
                        ? 'bg-slate-950/40 border-slate-800/80 text-slate-400 line-through opacity-75'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] ${
                          isCurrent ? 'bg-sky-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {idx + 1}
                        </span>
                        <span className="font-bold tracking-wider">{inst.code}</span>
                      </div>
                      {isCurrent && (
                        <span className="text-[10px] uppercase font-bold text-sky-400 bg-sky-950 px-2 py-0.5 rounded border border-sky-500/40 animate-pulse">
                          ACTIVE PC
                        </span>
                      )}
                      {isExecuted && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 pl-7 font-sans not-italic">
                      {inst.comment}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="pt-4 mt-6 border-t border-slate-800 flex flex-wrap gap-2">
            <button
              onClick={executeNextStep}
              disabled={stepIndex >= preset.instructions.length}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-lg shadow-sky-900/30 transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <StepForward className="w-4 h-4" />
              Step Next Clock Cycle
            </button>

            <button
              onClick={() => {
                playSound('click');
                setIsRunning(!isRunning);
              }}
              disabled={stepIndex >= preset.instructions.length}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs border flex items-center gap-1.5 transition cursor-pointer ${
                isRunning
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
              } disabled:opacity-40`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Auto Play'}
            </button>

            <button
              onClick={handleReset}
              className="px-3 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
              title="Reset Simulator"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Internal CPU Chip Schematic & Registers */}
        <div className="lg:col-span-7 space-y-4">
          {/* CPU Hardware Board */}
          <div className="bg-slate-900/90 border-2 border-slate-700/80 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Cpu className="w-6 h-6 text-purple-400" />
                <h3 className="font-extrabold text-white text-base">
                  CPU Execution Core &amp; Registers
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Current Stage:</span>
                <span className="px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  {stage}
                </span>
              </div>
            </div>

            {/* Instruction Register & Program Counter Banner */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Instruction Register (IR)
                </div>
                <div className="text-sm font-mono font-bold text-sky-400 truncate">
                  {instRegister}
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-center">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Program Counter (PC)
                </div>
                <div className="text-sm font-mono font-bold text-emerald-400">
                  0x0{Math.min(stepIndex, preset.instructions.length - 1)}
                </div>
              </div>
            </div>

            {/* General Purpose Registers */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/30 text-center relative overflow-hidden">
                <div className="text-xs uppercase font-bold text-blue-400 mb-1">Register A</div>
                <div className="text-3xl font-black text-white">
                  {showBinary ? toBinary(regA) : regA}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  {showBinary ? `Dec: ${regA}` : `Bin: ${toBinary(regA)}`}
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-pink-500/30 text-center relative overflow-hidden">
                <div className="text-xs uppercase font-bold text-pink-400 mb-1">Register B</div>
                <div className="text-3xl font-black text-white">
                  {showBinary ? toBinary(regB) : regB}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  {showBinary ? `Dec: ${regB}` : `Bin: ${toBinary(regB)}`}
                </div>
              </div>
            </div>

            {/* ALU (Arithmetic Logic Unit) */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-slate-950 to-teal-950/40 p-4 rounded-xl border-2 border-emerald-500/40 text-center">
              <div className="flex items-center justify-between text-xs text-emerald-400 font-bold uppercase mb-1">
                <span>ALU (Math Engine)</span>
                <span className="text-[10px] font-mono text-emerald-300">Operation: {aluOp}</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-emerald-300 tracking-wider">
                {showBinary ? toBinary(aluResult) : aluResult}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {aluOp !== 'NONE'
                  ? `Active output calculated from Reg A and Reg B`
                  : `Waiting for ADD / SUB arithmetic instruction`}
              </div>
            </div>
          </div>

          {/* Console Output Screen */}
          <div className="bg-black border-2 border-emerald-500/50 rounded-2xl p-4 shadow-xl text-xs font-mono text-emerald-400">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-950">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-emerald-400" />
                <span className="font-bold tracking-wider uppercase">Screen Output &amp; Bus Monitor</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

            <div className="h-32 overflow-y-auto space-y-1 pr-1 font-mono text-xs">
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={log.includes('SCREEN DISPLAY') ? 'text-cyan-300 font-bold bg-cyan-950/40 p-1 rounded' : ''}
                >
                  {log}
                </div>
              ))}
              <div ref={logsEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
