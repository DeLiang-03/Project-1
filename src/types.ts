export type AppTab = 'arcade' | 'anatomy' | 'cpu' | 'quiz';

export interface SorterItem {
  id: string;
  name: string;
  type: 'hardware' | 'software';
  subCategory?: 'input' | 'output' | 'storage' | 'system' | 'application';
  emoji: string;
  fact: string;
  detailedExplanation: string;
}

export interface PcComponent {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  role: string;
  analogy: string;
  analogyTitle: string;
  description: string;
  funFact: string;
  keySpecs: { label: string; value: string }[];
  connections: string[];
}

export type CpuInstructionType = 
  | 'LOAD_A'
  | 'LOAD_B'
  | 'ADD'
  | 'SUB'
  | 'MULTIPLY'
  | 'PRINT'
  | 'HALT';

export interface InstructionLine {
  id: number;
  code: string;
  type: CpuInstructionType;
  operand?: number;
  comment: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: 'Hardware' | 'Software' | 'CPU & Logic' | 'Memory';
}
