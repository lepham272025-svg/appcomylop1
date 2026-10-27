import React, { useState } from 'react';
import { Lesson } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { BeMamMascot } from './BeMamMascot';
import { ttsService } from '../services/ttsService';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  Volume2,
  CheckCircle,
  Sparkles,
  HelpCircle,
  Tag
} from 'lucide-react';

export const LessonsHub: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<'vietnamese' | 'math'>('vietnamese');
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(LESSONS_DATA[0]);
  const [activeAnswers, setActiveAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});

  const filteredLessons = LESSONS_DATA.filter((l) => l.subject === selectedSubject);

  const handleSelectAnswer = (qId: string, opt: string, correct: string) => {
    setActiveAnswers((prev) => ({ ...prev, [qId]: opt }));
    const isCorrect = opt === correct;
    setFeedback((prev) => ({ ...prev, [qId]: isCorrect }));

    if (isCorrect) {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
      ttsService.speak('Chính xác! Bé Mầm khen bạn rất giỏi!');
    } else {
      ttsService.speak('Chưa đúng rồi, hãy đọc lại bài học để tìm câu trả lời nhé!');
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* 1. Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>Chương Trình Giáo Dục Phổ Thông Lớp 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            KHO BÀI HỌC BÉ MẦM AI
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm">
            Bài giảng ngắn gọn, trực quan, giải quyết tận gốc các khó khăn âm vần và phép tính số học.
          </p>
        </div>

        <BeMamMascot mood="speaking" size="md" message="Cùng Bé Mầm khám phá những bài học thú vị hôm nay nào!" />
      </div>

      {/* 2. Subject Switcher */}
      <div className="flex gap-3">
        <button
          onClick={() => {
            setSelectedSubject('vietnamese');
            const firstTv = LESSONS_DATA.find((l) => l.subject === 'vietnamese');
            if (firstTv) setSelectedLesson(firstTv);
          }}
          className={`flex-1 p-4 rounded-2xl border-2 font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
            selectedSubject === 'vietnamese'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>📖</span>
          <span>Kho Bài Học Tiếng Việt Lớp 1</span>
        </button>

        <button
          onClick={() => {
            setSelectedSubject('math');
            const firstMath = LESSONS_DATA.find((l) => l.subject === 'math');
            if (firstMath) setSelectedLesson(firstMath);
          }}
          className={`flex-1 p-4 rounded-2xl border-2 font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
            selectedSubject === 'math'
              ? 'bg-purple-600 text-white border-purple-700 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>📐</span>
          <span>Kho Bài Học Toán Lớp 1</span>
        </button>
      </div>

      {/* 3. Main Split View: Lesson List & Lesson Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson List Sidebar */}
        <div className="space-y-3">
          <h3 className="font-extrabold text-sm text-slate-800 uppercase tracking-wider">
            Danh mục chuyên đề ({filteredLessons.length})
          </h3>
          <div className="space-y-2">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                onClick={() => {
                  setSelectedLesson(lesson);
                  setActiveAnswers({});
                  setFeedback({});
                }}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedLesson.id === lesson.id
                    ? 'bg-blue-50/80 border-blue-500 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{lesson.visualIcon}</span>
                  <span className="text-[10px] font-black uppercase text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded-full">
                    {lesson.level}
                  </span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                  {lesson.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{lesson.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lesson Content Panel */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-slate-500 block">{selectedLesson.unit}</span>
              <h2 className="text-xl font-black text-slate-900 mt-0.5">{selectedLesson.title}</h2>
            </div>

            {selectedLesson.audioPronunciation && (
              <button
                onClick={() => ttsService.speak(selectedLesson.audioPronunciation!)}
                className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors self-start sm:self-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe phát âm mẫu</span>
              </button>
            )}
          </div>

          {/* Lesson Body */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-5 rounded-2xl border border-slate-100 font-medium text-slate-800">
            {selectedLesson.content}
          </div>

          {/* Practice Questions inside Lesson */}
          {selectedLesson.practiceQuestions.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h3 className="font-black text-sm text-slate-900">
                  THỬ TÀI BẠN NHỎ (Thực hành ngay sau bài học)
                </h3>
              </div>

              <div className="space-y-4">
                {selectedLesson.practiceQuestions.map((q, idx) => (
                  <div key={q.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-xs sm:text-sm text-slate-900">
                        Câu {idx + 1}: {q.prompt}
                      </p>
                      <button
                        onClick={() => ttsService.speak(q.prompt)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Nghe câu hỏi"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = activeAnswers[q.id] === opt;
                        const isCorrect = opt === q.correctAnswer;
                        const showResult = activeAnswers[q.id] !== undefined;

                        let style = 'bg-white border-slate-200 text-slate-800 hover:bg-blue-50';
                        if (showResult) {
                          if (isCorrect) style = 'bg-emerald-500 text-white border-emerald-600';
                          else if (isChosen) style = 'bg-rose-500 text-white border-rose-600';
                          else style = 'opacity-50 bg-slate-100 text-slate-400 border-slate-200';
                        }

                        return (
                          <button
                            key={oIdx}
                            disabled={showResult}
                            onClick={() => handleSelectAnswer(q.id, opt, q.correctAnswer)}
                            className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${style}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {activeAnswers[q.id] && (
                      <p className="text-xs text-slate-600 font-semibold pt-1 border-t border-slate-200/60">
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
