import React, { useState } from 'react';
import { Student, Assignment, Question } from '../types';
import { BeMamMascot } from './BeMamMascot';
import { ttsService } from '../services/ttsService';
import confetti from 'canvas-confetti';
import {
  Volume2,
  CheckCircle,
  XCircle,
  Sparkles,
  Award,
  ChevronRight,
  Flame,
  ArrowRight,
  RefreshCw,
  BookOpen,
  RotateCcw
} from 'lucide-react';

interface StudentZoneProps {
  currentStudent: Student;
  allStudents: Student[];
  assignments: Assignment[];
  onSwitchStudent: (studentId: string) => void;
  onSubmitAssignment: (assignmentId: string, answers: Record<string, string>, score: number, aiDiagnosis?: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const StudentZone: React.FC<StudentZoneProps> = ({
  currentStudent,
  allStudents,
  assignments,
  onSwitchStudent,
  onSubmitAssignment,
  onNavigateTab
}) => {
  // Assignments for current student
  const myAssignments = assignments.filter((a) => a.studentId === currentStudent.id);
  const activeAssignment = myAssignments.find((a) => a.status === 'assigned') || myAssignments[0];

  // Quiz state
  const [currentQuiz, setCurrentQuiz] = useState<Assignment | null>(activeAssignment || null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);

  // If active assignment changes
  const startQuiz = (assign: Assignment) => {
    setCurrentQuiz(assign);
    setCurrentQIndex(0);
    setSelectedAnswers({});
    setShowFeedback(false);
    setIsFinished(false);
    setFinalScore(null);
  };

  const handleSelectOption = (opt: string) => {
    if (showFeedback || !currentQuiz) return;

    const currentQuestion = currentQuiz.questions[currentQIndex];
    const correct = opt === currentQuestion.correctAnswer;
    setIsAnswerCorrect(correct);
    setShowFeedback(true);

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: opt
    }));

    if (correct) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 }
      });
      ttsService.speak('Hoan hô! Em làm rất đúng!');
    } else {
      ttsService.speak(`Chưa đúng rồi, ${currentQuestion.hint}`);
    }
  };

  const handleNextQuestion = () => {
    if (!currentQuiz) return;
    setShowFeedback(false);

    if (currentQIndex + 1 < currentQuiz.questions.length) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // Calculate final score
      let correctCount = 0;
      currentQuiz.questions.forEach((q) => {
        if (selectedAnswers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      });
      const calculatedScore = Math.round((correctCount / currentQuiz.questions.length) * 10 * 10) / 10;
      setFinalScore(calculatedScore);
      setIsFinished(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 }
      });

      // Submit assignment and save persistently
      const aiDiagnosis = calculatedScore >= 8
        ? `Học sinh ${currentStudent.name} đã hiểu sâu sắc nội dung bài học, tự tin và phản xạ rất nhanh.`
        : `Học sinh ${currentStudent.name} cần xem lại bài giảng về ${currentQuiz.title} để nắm vững hơn.`;

      onSubmitAssignment(currentQuiz.id, selectedAnswers, calculatedScore, aiDiagnosis);
    }
  };

  const currentQuestion: Question | undefined = currentQuiz?.questions[currentQIndex];

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* 1. Student Header & Identity Bar */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-3xl p-5 sm:p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <span className="text-4xl sm:text-5xl bg-white/20 p-2 rounded-2xl backdrop-blur-md shadow-xs">
            {currentStudent.avatar}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-2 py-0.5 rounded-lg">
                {currentStudent.id}
              </span>
              <h1 className="text-xl sm:text-2xl font-black">{currentStudent.name}</h1>
            </div>
            <p className="text-xs text-purple-200 mt-0.5">
              Lớp 1/2 • Cô giáo: Nguyễn Thị Tú My
            </p>
          </div>
        </div>

        {/* Student Badges & Switcher */}
        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-2 border border-white/20">
            <span className="text-amber-300 font-black text-sm flex items-center gap-1">
              ⭐ {currentStudent.stars}
            </span>
            <span className="text-xs text-purple-200">sao</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-2xl flex items-center gap-1.5 border border-white/20 text-xs font-bold text-amber-300">
            <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
            <span>{currentStudent.streak} ngày</span>
          </div>

          {/* Quick Switch Student Modal/Dropdown */}
          <select
            value={currentStudent.id}
            onChange={(e) => onSwitchStudent(e.target.value)}
            className="bg-white text-slate-800 text-xs font-bold py-1.5 px-3 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-amber-400 cursor-pointer"
            title="Đổi học sinh khác để kiểm thử"
          >
            {allStudents.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id}: {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 2. Main Practice Screen / Quiz */}
      {currentQuiz && !isFinished ? (
        <div className="bg-white rounded-3xl border-2 border-indigo-100 shadow-md p-6 sm:p-8 space-y-6">
          {/* Header of assignment */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-black px-2.5 py-1 rounded-full ${
                  currentQuiz.subject === 'vietnamese'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-purple-100 text-purple-800'
                }`}
              >
                {currentQuiz.subject === 'vietnamese' ? '📖 Tiếng Việt Lớp 1' : '📐 Toán Lớp 1'}
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900">
                {currentQuiz.title}
              </h2>
            </div>

            {/* Question Progress Counter */}
            <span className="text-xs font-black bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
              Câu {currentQIndex + 1} / {currentQuiz.questions.length}
            </span>
          </div>

          {/* Question Box */}
          {currentQuestion && (
            <div className="space-y-6">
              {/* Question Prompt with Speaker Button */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-100 flex items-start gap-3">
                <button
                  onClick={() => ttsService.speak(currentQuestion.prompt)}
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl shrink-0 shadow-sm transition-transform active:scale-95"
                  title="Bấm để nghe Bé Mầm đọc câu hỏi"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <div className="space-y-1">
                  <p className="text-base sm:text-xl font-black text-slate-900 leading-snug">
                    {currentQuestion.prompt}
                  </p>
                  <p className="text-xs text-blue-600 font-semibold">
                    💡 Nhấn loa để nghe đọc câu hỏi nếu em chưa nhớ chữ nhé!
                  </p>
                </div>
              </div>

              {/* Multiple Choice Options (Huge buttons for small 1st grade hands) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentQuestion.options.map((option, idx) => {
                  const isSelected = selectedAnswers[currentQuestion.id] === option;
                  const isCorrect = option === currentQuestion.correctAnswer;

                  let btnStyle = 'bg-slate-50 hover:bg-blue-50/80 border-slate-200 text-slate-800';
                  if (showFeedback) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md scale-102';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500 text-white border-rose-600';
                    } else {
                      btnStyle = 'opacity-50 bg-slate-100 border-slate-200 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showFeedback}
                      onClick={() => handleSelectOption(option)}
                      className={`p-4 sm:p-5 rounded-2xl border-2 font-black text-base sm:text-lg flex items-center justify-between gap-3 text-left transition-all active:scale-98 shadow-xs ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-white/30 backdrop-blur-xs flex items-center justify-center text-sm font-black border border-current">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>

                      {showFeedback && isCorrect && <CheckCircle className="w-6 h-6 text-white" />}
                      {showFeedback && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-white" />}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert from Bé Mầm */}
              {showFeedback && (
                <div
                  className={`p-4 rounded-2xl border-2 flex items-start gap-3 animate-fade-in ${
                    isAnswerCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-amber-50 border-amber-300 text-amber-950'
                  }`}
                >
                  <BeMamMascot
                    mood={isAnswerCorrect ? 'cheering' : 'thinking'}
                    size="sm"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="font-black text-sm">
                      {isAnswerCorrect ? '🎉 Tuyệt vời! Em chọn hoàn toàn chính xác!' : '💪 Đừng buồn nhé, cùng cố gắng thêm chút nữa!'}
                    </p>
                    <p className="text-xs text-slate-700">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5 transition-transform active:scale-95 shrink-0"
                  >
                    <span>{currentQIndex + 1 < currentQuiz.questions.length ? 'Câu tiếp theo' : 'Nộp bài ngay'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : isFinished && currentQuiz ? (
        /* Completion Screen with Stars and Confetti */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-md text-center space-y-5 animate-fade-in">
          <BeMamMascot mood="cheering" size="lg" message={`Chúc mừng bạn ${currentStudent.name} đã hoàn thành xuất sắc bài tập!`} />

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              HOÀN THÀNH NHIỆM VỤ!
            </h2>
            <p className="text-slate-600 text-sm">
              Bài tập <b>{currentQuiz.title}</b> đã được chấm điểm và tự động lưu vào hồ sơ học sinh.
            </p>
          </div>

          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-2xl">
            <div className="text-left">
              <span className="text-xs text-amber-800 font-bold block">Điểm số đạt được:</span>
              <span className="text-3xl font-black text-amber-600">{finalScore} / 10 đ</span>
            </div>
            <div className="h-10 w-px bg-amber-200" />
            <div className="text-left">
              <span className="text-xs text-amber-800 font-bold block">Thưởng sao Bé Mầm:</span>
              <span className="text-3xl font-black text-emerald-600">
                +{(finalScore || 0) >= 9 ? 15 : (finalScore || 0) >= 7 ? 10 : 5} ⭐
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => startQuiz(currentQuiz)}
              className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại bài này</span>
            </button>

            <button
              onClick={() => onNavigateTab('games')}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition-transform active:scale-95"
            >
              <span>🎮 Chơi trò chơi Bé Mầm</span>
            </button>

            <button
              onClick={() => onNavigateTab('reading')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-sm transition-transform active:scale-95"
            >
              <span>🎙️ Luyện đọc AI</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty / No assignment state */
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
          <BeMamMascot mood="happy" size="md" message="Chào bạn nhỏ! Cô Tú My chưa giao bài mới, bạn có muốn chơi trò chơi học tập không?" />
          <h2 className="text-lg font-black text-slate-900">Bạn đã hoàn thành hết các nhiệm vụ được giao!</h2>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => onNavigateTab('lessons')}
              className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
            >
              Xem kho bài học
            </button>
          </div>
        </div>
      )}

      {/* 3. Fast Access to Grade 1 Interactive Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => onNavigateTab('reading')}
          className="bg-gradient-to-br from-pink-500 to-rose-500 text-white p-5 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-black uppercase text-pink-200">Phòng đọc thông minh</span>
            <h3 className="text-lg font-black mt-1">AI HỖ TRỢ LUYỆN ĐỌC</h3>
            <p className="text-xs text-pink-100 mt-0.5">Bé đọc to vào micro, Bé Mầm AI chấm điểm tức thì!</p>
          </div>
          <span className="text-3xl">🎙️</span>
        </div>

        <div
          onClick={() => onNavigateTab('games')}
          className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-5 rounded-2xl shadow-sm hover:shadow-md cursor-pointer transition-all flex items-center justify-between"
        >
          <div>
            <span className="text-xs font-black uppercase text-emerald-200">Vừa học vừa chơi</span>
            <h3 className="text-lg font-black mt-1">TRÒ CHƠI BÉ MẦM</h3>
            <p className="text-xs text-emerald-100 mt-0.5">Thu hoạch táo toán học & Nối chữ thông thái</p>
          </div>
          <span className="text-3xl">🎮</span>
        </div>
      </div>
    </div>
  );
};
