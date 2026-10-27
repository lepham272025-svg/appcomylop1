import React, { useState } from 'react';
import { Student, Assignment, Question } from '../types';
import { geminiService } from '../services/geminiService';
import { BeMamMascot } from './BeMamMascot';
import {
  X,
  Brain,
  Sparkles,
  Check,
  Edit3,
  Plus,
  Send,
  Loader2,
  BookOpen
} from 'lucide-react';

interface AiExerciseModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
  onApproveAndAssign: (assignment: Assignment) => void;
}

export const AiExerciseModal: React.FC<AiExerciseModalProps> = ({
  student,
  isOpen,
  onClose,
  onApproveAndAssign
}) => {
  const [subject, setSubject] = useState<'vietnamese' | 'math'>('vietnamese');
  const [customTopic, setCustomTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState<{
    title: string;
    description: string;
    questions: Question[];
    aiPedagogyNote?: string;
    teacherAdvice?: string;
  } | null>(null);

  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    const difficulty =
      subject === 'vietnamese' ? student.vietnameseDifficulty : student.mathDifficulty;

    const res = await geminiService.generateExercise({
      studentName: student.name,
      subject,
      difficulty,
      topic: customTopic || (subject === 'vietnamese' ? 'Khắc phục khó khăn âm vần' : 'Phép tính & So sánh số'),
      level: student.levelLabel
    });

    setGeneratedData({
      title: res.title || `Bài tập củng cố: ${student.name}`,
      description: res.description || `Bé Mầm AI tạo bài củng cố cá nhân hóa`,
      questions: res.questions || [],
      aiPedagogyNote: res.aiPedagogyNote,
      teacherAdvice: res.teacherAdvice
    });
    setIsGenerating(false);
  };

  const handleUpdateQuestion = (qId: string, updatedPrompt: string) => {
    if (!generatedData) return;
    setGeneratedData({
      ...generatedData,
      questions: generatedData.questions.map((q) =>
        q.id === qId ? { ...q, prompt: updatedPrompt } : q
      )
    });
    setEditingQuestionId(null);
  };

  const handleApprove = () => {
    if (!generatedData) return;

    const newAssignment: Assignment = {
      id: 'assign-' + Date.now(),
      studentId: student.id,
      studentName: student.name,
      subject,
      title: generatedData.title,
      description: generatedData.description,
      questions: generatedData.questions,
      status: 'assigned',
      assignedAt: new Date().toISOString(),
      approvedByTeacher: true
    };

    onApproveAndAssign(newAssignment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scale-up max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md">
                  {student.id}
                </span>
                <h2 className="text-lg font-black">{student.name}</h2>
              </div>
              <p className="text-xs text-blue-100">
                BÉ MẦM AI CÁ NHÂN HÓA BÀI TẬP (GIÁO VIÊN DUYỆT TRƯỚC KHI GIAO)
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

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Difficulty Insight */}
          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 space-y-1">
            <p className="font-bold">Điểm khó khăn cần can thiệp của học sinh:</p>
            <p className="text-slate-700">
              • <b>Tiếng Việt:</b> {student.vietnameseDifficulty}
            </p>
            <p className="text-slate-700">
              • <b>Toán học:</b> {student.mathDifficulty}
            </p>
          </div>

          {/* Form options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Chọn môn học cần củng cố:
              </label>
              <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSubject('vietnamese')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    subject === 'vietnamese' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Tiếng Việt
                </button>
                <button
                  type="button"
                  onClick={() => setSubject('math')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    subject === 'math' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Toán học
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Chủ đề trọng tâm (hoặc để trống để AI tự quyết):
              </label>
              <input
                type="text"
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                placeholder="VD: Phân biệt vần an/ang, phép trừ..."
                className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            disabled={isGenerating}
            onClick={handleGenerate}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Bé Mầm AI đang suy nghĩ và tạo bài tập cá nhân hóa...</span>
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 text-amber-300" />
                <span>{generatedData ? 'Tạo lại đề xuất bài tập mới' : 'Bé Mầm AI tạo bài củng cố ngay'}</span>
              </>
            )}
          </button>

          {/* Generated Exercise Review & Teacher Edit */}
          {generatedData && (
            <div className="space-y-4 pt-3 border-t border-slate-200 animate-fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900">{generatedData.title}</h3>
                  <p className="text-xs text-slate-500">{generatedData.description}</p>
                </div>
                <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  3 câu trắc nghiệm
                </span>
              </div>

              {/* Questions List */}
              <div className="space-y-3">
                {generatedData.questions.map((q, idx) => (
                  <div key={q.id} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <span className="text-[10px] font-bold text-slate-400">Câu {idx + 1}:</span>
                        {editingQuestionId === q.id ? (
                          <div className="flex items-center gap-2 mt-1">
                            <input
                              type="text"
                              defaultValue={q.prompt}
                              id={`input-${q.id}`}
                              className="text-xs p-1.5 border rounded-lg flex-1 font-bold"
                            />
                            <button
                              onClick={() => {
                                const input = document.getElementById(`input-${q.id}`) as HTMLInputElement;
                                if (input) handleUpdateQuestion(q.id, input.value);
                              }}
                              className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-lg font-bold"
                            >
                              Lưu
                            </button>
                          </div>
                        ) : (
                          <p className="text-xs font-bold text-slate-900">{q.prompt}</p>
                        )}
                      </div>

                      <button
                        onClick={() => setEditingQuestionId(q.id)}
                        className="text-slate-400 hover:text-blue-600 p-1"
                        title="Giáo viên sửa câu hỏi"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`p-1.5 rounded-lg border ${
                            opt === q.correctAnswer
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-bold'
                              : 'bg-white border-slate-200 text-slate-600'
                          }`}
                        >
                          {String.fromCharCode(65 + oIdx)}. {opt} {opt === q.correctAnswer && '✓'}
                        </div>
                      ))}
                    </div>

                    <p className="text-[10px] text-blue-600 italic">💡 Gợi ý: {q.hint}</p>
                  </div>
                ))}
              </div>

              {/* AI Pedagogy Note for Teacher Tú My */}
              {generatedData.aiPedagogyNote && (
                <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 text-xs text-indigo-950">
                  <span className="font-bold block text-indigo-700">Chẩn đoán sư phạm của Bé Mầm AI:</span>
                  <p className="mt-0.5">{generatedData.aiPedagogyNote}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-bold text-slate-500 hover:text-slate-700 px-4 py-2"
          >
            Đóng lại
          </button>

          {generatedData && (
            <button
              onClick={handleApprove}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-transform active:scale-95"
            >
              <Check className="w-4 h-4" />
              <span>Cô Tú My Duyệt & Giao Bài Này</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
