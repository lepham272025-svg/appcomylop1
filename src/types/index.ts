export type UserRole = 'teacher' | 'student' | 'parent';

export type StudentLevel = 'KhaGioi' | 'DatChuan' | 'CanHoTro' | 'NguyCoHong';

export interface Student {
  id: string; // HS01 -> HS32
  name: string;
  gender: 'nam' | 'nu';
  avatar: string;
  level: StudentLevel;
  levelLabel: string;
  vietnameseDifficulty: string;
  mathDifficulty: string;
  preTestVietnamese: number; // 0 - 10
  preTestMath: number; // 0 - 10
  postTestVietnamese: number; // 0 - 10
  postTestMath: number; // 0 - 10
  completedAssignments: number;
  totalAssignments: number;
  stars: number;
  streak: number;
  parentName: string;
  parentPhone: string;
  teacherNote: string;
  recentHistory: StudentHistoryRecord[];
}

export interface StudentHistoryRecord {
  id: string;
  date: string;
  subject: 'vietnamese' | 'math';
  topic: string;
  score: number;
  totalQuestions: number;
  timeSpent: string;
  note: string;
}

export interface Question {
  id: string;
  type: 'choice' | 'fill' | 'listen' | 'count';
  prompt: string;
  visual?: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  explanation: string;
}

export interface Assignment {
  id: string;
  studentId: string;
  studentName: string;
  subject: 'vietnamese' | 'math';
  title: string;
  description: string;
  questions: Question[];
  status: 'assigned' | 'completed' | 'reviewed';
  assignedAt: string;
  submittedAt?: string;
  studentAnswers?: Record<string, string>;
  score?: number;
  aiDiagnosis?: string;
  teacherFeedback?: string;
  aiSuggestedRemediation?: string;
  approvedByTeacher?: boolean;
}

export interface Lesson {
  id: string;
  subject: 'vietnamese' | 'math';
  grade: 1;
  unit: string;
  title: string;
  summary: string;
  content: string;
  audioPronunciation?: string;
  visualIcon: string;
  level: 'Cơ bản' | 'Củng cố khó khăn' | 'Nâng cao';
  tags: string[];
  practiceQuestions: Question[];
}

export interface ResearchSurveyItem {
  criterion: string;
  preValue: string;
  postValue: string;
  improvement: string;
  metricType: 'percentage' | 'score' | 'count';
}

export interface Top50Metric {
  title: string;
  value: string;
  baseline: string;
  growth: string;
  iconName: string;
  note: string;
}
