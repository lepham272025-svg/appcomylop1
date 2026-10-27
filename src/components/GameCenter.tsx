import React, { useState } from 'react';
import { Student } from '../types';
import { BeMamMascot } from './BeMamMascot';
import { ttsService } from '../services/ttsService';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Award,
  RefreshCw,
  CheckCircle,
  HelpCircle,
  Gamepad2
} from 'lucide-react';

interface GameCenterProps {
  currentStudent: Student;
  onAwardStars: (count: number) => void;
}

export const GameCenter: React.FC<GameCenterProps> = ({ currentStudent, onAwardStars }) => {
  const [activeGame, setActiveGame] = useState<'math_apples' | 'word_match'>('math_apples');

  // Math Apple Game State
  const [appleRound, setAppleRound] = useState(0);
  const [appleScore, setAppleScore] = useState(0);
  const [appleGameOver, setAppleGameOver] = useState(false);

  const MATH_QUESTIONS = [
    { num1: 4, num2: 3, op: '+', correct: 7, options: [6, 7, 8, 9] },
    { num1: 9, num2: 4, op: '-', correct: 5, options: [3, 4, 5, 6] },
    { num1: 6, num2: 2, op: '+', correct: 8, options: [7, 8, 9, 10] },
    { num1: 10, num2: 7, op: '-', correct: 3, options: [2, 3, 4, 5] },
    { num1: 5, num2: 5, op: '+', correct: 10, options: [8, 9, 10, 11] }
  ];

  // Word Match Game State
  const [wordRound, setWordRound] = useState(0);
  const [wordScore, setWordScore] = useState(0);
  const [wordGameOver, setWordGameOver] = useState(false);

  const WORD_QUESTIONS = [
    { prefix: 'cây b...', vần: 'àng', options: ['àn', 'àng', 'ơn', 'ung'], word: 'cây bàng' },
    { prefix: 'ngôi l...', vần: 'àng', options: ['ang', 'àng', 'en', 'ương'], word: 'ngôi làng' },
    { prefix: 'cái b...', vần: 'àn', options: ['àn', 'àng', 'at', 'am'], word: 'cái bàn' },
    { prefix: 'chú ngh...', vần: 'é', options: ['é', 'á', 'ó', 'ú'], word: 'chú nghé' }
  ];

  const handleAppleAnswer = (ans: number) => {
    const q = MATH_QUESTIONS[appleRound];
    if (ans === q.correct) {
      setAppleScore((s) => s + 10);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      ttsService.speak('Đúng rồi! Táo rơi vào giỏ rồi!');
    } else {
      ttsService.speak('Chưa đúng rồi, thử lại nhé!');
    }

    if (appleRound + 1 < MATH_QUESTIONS.length) {
      setAppleRound((r) => r + 1);
    } else {
      setAppleGameOver(true);
      onAwardStars(15);
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
      ttsService.speak('Bé Mầm chúc mừng bạn đã chiến thắng trò chơi thu hoạch táo!');
    }
  };

  const handleWordAnswer = (opt: string) => {
    const q = WORD_QUESTIONS[wordRound];
    if (opt === q.vần) {
      setWordScore((s) => s + 10);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
      ttsService.speak(`Hoan hô! Ghép đúng từ ${q.word} rồi!`);
    } else {
      ttsService.speak('Thử lại vần khác nhé!');
    }

    if (wordRound + 1 < WORD_QUESTIONS.length) {
      setWordRound((r) => r + 1);
    } else {
      setWordGameOver(true);
      onAwardStars(15);
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
    }
  };

  const restartAppleGame = () => {
    setAppleRound(0);
    setAppleScore(0);
    setAppleGameOver(false);
  };

  const restartWordGame = () => {
    setWordRound(0);
    setWordScore(0);
    setWordGameOver(false);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 rounded-3xl p-6 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
            <Gamepad2 className="w-3.5 h-3.5 text-amber-300" />
            <span>Khu Vui Chơi Học Tập Tương Tác</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            TRÒ CHƠI BÉ MẦM AI
          </h1>
          <p className="text-purple-100 text-xs sm:text-sm">
            Vừa chơi vui nhộn vừa ghi nhớ kiến thức Tiếng Việt & Toán học cho bé <b>{currentStudent.name}</b>.
          </p>
        </div>

        <BeMamMascot
          mood="cheering"
          size="md"
          message="Chào bạn nhỏ! Cùng thi tài hái táo và nối chữ với Bé Mầm nào!"
        />
      </div>

      {/* Game Selector Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveGame('math_apples')}
          className={`flex-1 p-4 rounded-2xl border-2 font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
            activeGame === 'math_apples'
              ? 'bg-amber-500 text-white border-amber-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>🍎</span>
          <span>Thu Hoạch Táo Toán Học</span>
        </button>

        <button
          onClick={() => setActiveGame('word_match')}
          className={`flex-1 p-4 rounded-2xl border-2 font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all ${
            activeGame === 'word_match'
              ? 'bg-blue-600 text-white border-blue-700 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>🧩</span>
          <span>Nối Vần Ghép Chữ Kỳ Diệu</span>
        </button>
      </div>

      {/* GAME 1: MATH APPLES */}
      {activeGame === 'math_apples' && (
        <div className="bg-white rounded-3xl border-2 border-amber-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍎</span>
              <div>
                <h2 className="text-lg font-black text-slate-900">Thu Hoạch Táo Toán Học</h2>
                <p className="text-xs text-slate-500">Tính nhẩm nhanh và chọn giỏ táo đúng</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Điểm số</span>
              <span className="text-xl font-black text-amber-600">{appleScore} đ</span>
            </div>
          </div>

          {!appleGameOver ? (
            <div className="space-y-6 text-center">
              <p className="text-xs font-bold text-slate-400">
                Câu hỏi {appleRound + 1} / {MATH_QUESTIONS.length}
              </p>

              {/* Big Math Question on Apple */}
              <div className="relative inline-block my-4">
                <div className="w-36 h-36 bg-gradient-to-tr from-rose-500 to-red-400 rounded-full flex flex-col items-center justify-center text-white shadow-xl mx-auto border-4 border-rose-300">
                  {/* Stem & Leaf */}
                  <div className="absolute -top-3 w-3 h-5 bg-amber-800 rounded-xs" />
                  <div className="absolute -top-2 left-1/2 ml-2 w-6 h-4 bg-emerald-500 rounded-full" />
                  <span className="text-3xl font-black">
                    {MATH_QUESTIONS[appleRound].num1} {MATH_QUESTIONS[appleRound].op} {MATH_QUESTIONS[appleRound].num2}
                  </span>
                  <span className="text-sm font-bold text-rose-100">= ?</span>
                </div>
              </div>

              <p className="text-base font-black text-slate-800">
                Hãy chọn chiếc giỏ có kết quả đúng:
              </p>

              {/* 4 Baskets Options */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {MATH_QUESTIONS[appleRound].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAppleAnswer(opt)}
                    className="p-5 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 font-black text-2xl text-amber-900 shadow-sm transition-transform active:scale-95 flex flex-col items-center gap-1"
                  >
                    <span>🧺</span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <BeMamMascot mood="cheering" size="lg" />
              <h3 className="text-2xl font-black text-slate-900">BẠN ĐÃ THU HOẠCH ĐỦ TÁO!</h3>
              <p className="text-slate-600 text-sm">
                Tổng điểm: <b>{appleScore} điểm</b>. Bạn được thưởng thêm <b>+15 ngôi sao vàng</b>!
              </p>
              <button
                onClick={restartAppleGame}
                className="bg-amber-500 hover:bg-amber-600 text-white font-black text-sm px-6 py-3 rounded-2xl shadow-md"
              >
                Chơi lại lần nữa
              </button>
            </div>
          )}
        </div>
      )}

      {/* GAME 2: WORD MATCH */}
      {activeGame === 'word_match' && (
        <div className="bg-white rounded-3xl border-2 border-blue-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧩</span>
              <div>
                <h2 className="text-lg font-black text-slate-900">Nối Vần Ghép Chữ Kỳ Diệu</h2>
                <p className="text-xs text-slate-500">Chọn vần đúng để hoàn thành từ có nghĩa</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 block">Điểm số</span>
              <span className="text-xl font-black text-blue-600">{wordScore} đ</span>
            </div>
          </div>

          {!wordGameOver ? (
            <div className="space-y-6 text-center">
              <p className="text-xs font-bold text-slate-400">
                Câu đố {wordRound + 1} / {WORD_QUESTIONS.length}
              </p>

              <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-3xl inline-block my-2">
                <span className="text-3xl sm:text-4xl font-black text-blue-900 tracking-wider">
                  {WORD_QUESTIONS[wordRound].prefix}
                </span>
              </div>

              <p className="text-base font-black text-slate-800">
                Chọn vần đúng để điền vào chỗ chấm:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {WORD_QUESTIONS[wordRound].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleWordAnswer(opt)}
                    className="p-5 rounded-2xl bg-blue-50 hover:bg-blue-100 border-2 border-blue-300 font-black text-2xl text-blue-900 shadow-sm transition-transform active:scale-95"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-6 space-y-4">
              <BeMamMascot mood="cheering" size="lg" />
              <h3 className="text-2xl font-black text-slate-900">BÉ GHÉP VẦN SIÊU ĐỈNH!</h3>
              <p className="text-slate-600 text-sm">
                Tổng điểm: <b>{wordScore} điểm</b>. Bạn được thưởng thêm <b>+15 ngôi sao vàng</b>!
              </p>
              <button
                onClick={restartWordGame}
                className="bg-blue-600 hover:bg-blue-700 text-white font-black text-sm px-6 py-3 rounded-2xl shadow-md"
              >
                Chơi lại lần nữa
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
