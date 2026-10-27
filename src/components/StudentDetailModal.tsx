import React, { useState } from 'react';
import { Student } from '../types';
import { BeMamMascot } from './BeMamMascot';
import { geminiService } from '../services/geminiService';
import {
  X,
  Brain,
  Sparkles,
  Award,
  BookOpen,
  Calendar,
  CheckCircle,
  TrendingUp,
  UserCheck,
  Heart,
  Loader2
} from 'lucide-react';

interface StudentDetailModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAiGenerator: (student: Student) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  isOpen,
  onClose,
  onOpenAiGenerator
}) => {
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [aiDiagnosis, setAiDiagnosis] = useState<{
    diagnosticSummary: string;
    rootCause: string;
    remedialSteps: string[];
    encouragementMessage: string;
  } | null>(null);

  if (!isOpen || !student) return null;

  const handleRunAiDiagnosis = async () => {
    setIsDiagnosing(true);
    const result = await geminiService.analyzeErrors({
      studentName: student.name,
      subject: 'vietnamese',
      mistakes: [
        { question: 'Phát âm và ghép vần', studentAnswer: 'Nhầm lẫn âm cuối', correctAnswer: student.vietnameseDifficulty }
      ],
      historicalSummary: student.teacherNote
    });

    setAiDiagnosis(result);
    setIsDiagnosing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scale-up max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-1 bg-white/20 rounded-2xl backdrop-blur-md">
              {student.avatar}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md">
                  {student.id}
                </span>
                <h2 className="text-xl font-black">{student.name}</h2>
              </div>
              <p className="text-xs text-blue-100">
                Lớp 1/2 • Phụ huynh: {student.parentName} ({student.parentPhone})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Level and Score Comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100 space-y-1">
              <span className="text-[10px] font-bold text-blue-700 uppercase">Môn Tiếng Việt lớp 1</span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm line-through text-slate-400">{student.preTestVietnamese}đ</span>
                <span className="text-slate-400">➔</span>
                <span className="text-2xl font-black text-blue-700">{student.postTestVietnamese}đ</span>
                <span className="text-xs font-bold text-emerald-600 ml-auto">
                  +{(student.postTestVietnamese - student.preTestVietnamese).toFixed(1)}đ
                </span>
              </div>
              <p className="text-[11px] text-slate-600 pt-1">
                <b>Khó khăn:</b> {student.vietnameseDifficulty}
              </p>
            </div>

            <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-100 space-y-1">
              <span className="text-[10px] font-bold text-purple-700 uppercase">Môn Toán lớp 1</span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm line-through text-slate-400">{student.preTestMath}đ</span>
                <span className="text-slate-400">➔</span>
                <span className="text-2xl font-black text-purple-700">{student.postTestMath}đ</span>
                <span className="text-xs font-bold text-emerald-600 ml-auto">
                  +{(student.postTestMath - student.preTestMath).toFixed(1)}đ
                </span>
              </div>
              <p className="text-[11px] text-slate-600 pt-1">
                <b>Khó khăn:</b> {student.mathDifficulty}
              </p>
            </div>
          </div>

          {/* Teacher's Note */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-blue-600" />
              Ghi chú của cô giáo Nguyễn Thị Tú My:
            </span>
            <p className="text-xs text-slate-700 italic">"{student.teacherNote}"</p>
          </div>

          {/* AI Pedagogical Diagnostic Section */}
          <div className="border-t border-slate-200 pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs sm:text-sm font-black text-slate-900">
                  BÉ MẦM AI CHẨN ĐOÁN NGUYÊN NHÂN LỖI & ĐỀ XUẤT CAN THIỆP
                </h3>
              </div>

              {!aiDiagnosis && (
                <button
                  disabled={isDiagnosing}
                  onClick={handleRunAiDiagnosis}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 disabled:opacity-50"
                >
                  {isDiagnosing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-amber-300" />}
                  <span>Chẩn đoán AI</span>
                </button>
              )}
            </div>

            {aiDiagnosis && (
              <div className="bg-indigo-50/70 p-4 rounded-2xl border border-indigo-200 space-y-3 animate-fade-in text-xs">
                <div>
                  <span className="font-bold text-indigo-900 block">Chẩn đoán tổng quan:</span>
                  <p className="text-slate-700 mt-0.5">{aiDiagnosis.diagnosticSummary}</p>
                </div>

                <div>
                  <span className="font-bold text-indigo-900 block">Nguyên nhân cốt lõi:</span>
                  <p className="text-slate-700 mt-0.5">{aiDiagnosis.rootCause}</p>
                </div>

                <div>
                  <span className="font-bold text-indigo-900 block">Các bước can thiệp đề xuất:</span>
                  <ul className="list-disc list-inside text-slate-700 space-y-0.5 mt-1">
                    {aiDiagnosis.remedialSteps.map((step, idx) => (
                      <li key={idx}>{step}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-white rounded-xl border border-indigo-100 flex items-center gap-2">
                  <BeMamMascot mood="cheering" size="sm" />
                  <p className="text-[11px] text-indigo-950 italic">
                    "{aiDiagnosis.encouragementMessage}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Student's Learning History */}
          <div className="border-t border-slate-200 pt-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Lịch sử làm bài gần đây ({student.recentHistory.length})
            </h3>
            {student.recentHistory.length > 0 ? (
              <div className="space-y-2">
                {student.recentHistory.map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{item.topic}</p>
                      <p className="text-[11px] text-slate-500">{item.date} • {item.timeSpent}</p>
                    </div>
                    <span className="font-black text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      {item.score} đ
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Học sinh chưa có lượt làm bài nào gần đây.</p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-700 px-4 py-2"
          >
            Đóng
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenAiGenerator(student);
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-transform active:scale-95"
          >
            <Brain className="w-4 h-4 text-amber-300" />
            <span>Tạo bài củng cố AI cho em này</span>
          </button>
        </div>
      </div>
    </div>
  );
};
