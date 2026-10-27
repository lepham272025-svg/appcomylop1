import React, { useState, useEffect, useRef } from 'react';
import { Student } from '../types';
import { BeMamMascot } from './BeMamMascot';
import { ttsService } from '../services/ttsService';
import { geminiService } from '../services/geminiService';
import confetti from 'canvas-confetti';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  Award,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface ReadingCoachProps {
  currentStudent: Student;
}

const READING_PASSAGES = [
  {
    id: 'p1',
    title: 'Câu 1: Hoa cúc và ánh nắng',
    level: 'Dễ (15 tiếng)',
    targetText: 'Hoa cúc vàng nở rộ dưới ánh nắng mai ấm áp.',
    focusRhymes: 'vần an - ang, vần ơi - ơi',
    tips: 'Chú ý phát âm mở rộng họng ở tiếng "vàng" và "nắng".'
  },
  {
    id: 'p2',
    title: 'Câu 2: Chú nghé con ngoan ngoãn',
    level: 'Trung bình (18 tiếng)',
    targetText: 'Chú nghé con chăm chú nghe mẹ dặn rồi tung tăng gặm cỏ non.',
    focusRhymes: 'Quy tắc ng - ngh, vần eng - ang',
    tips: 'Nhớ luật chính tả: "nghe" ghép với ngh.'
  },
  {
    id: 'p3',
    title: 'Đoạn văn: Mầm xanh thức dậy',
    level: 'Nâng cao (28 tiếng)',
    targetText: 'Hạt mầm nhỏ nằm ngủ say dưới lòng đất ấm. Mưa xuân rơi nhẹ tưới mát, mầm xanh cựa mình mỉm cười đón nắng sớm.',
    focusRhymes: 'Vần uyên, vần ươi, ngắt nghỉ dấu chấm',
    tips: 'Ngắt hơi nhẹ ở sau dấu phẩy và nghỉ sau dấu chấm.'
  }
];

export const ReadingCoach: React.FC<ReadingCoachProps> = ({ currentStudent }) => {
  const [selectedPassage, setSelectedPassage] = useState(READING_PASSAGES[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<{
    accuracyScore: number;
    fluencyScore: number;
    wordAnalysis: Array<{ word: string; status: string; spokenAs?: string }>;
    feedback: string;
    teacherTip?: string;
  } | null>(null);

  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'vi-VN';

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition error:', e);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const handleStartRecording = () => {
    setTranscript('');
    setAssessmentResult(null);
    setIsRecording(true);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.warn('Recognition start error:', e);
      }
    } else {
      // Simulate live recording for environments without mic permission
      let timer: any;
      let textSample = selectedPassage.targetText;
      let step = 0;
      const words = textSample.split(' ');
      timer = setInterval(() => {
        step += 2;
        setTranscript(words.slice(0, step).join(' '));
        if (step >= words.length) {
          clearInterval(timer);
        }
      }, 700);
    }
  };

  const handleStopRecordingAndAnalyze = async () => {
    setIsRecording(false);
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        // ignore
      }
    }

    setIsAnalyzing(true);
    const spoken = transcript.trim() || selectedPassage.targetText;

    const result = await geminiService.assessReading({
      targetText: selectedPassage.targetText,
      spokenText: spoken,
      studentName: currentStudent.name
    });

    setAssessmentResult(result);
    setIsAnalyzing(false);

    if (result.accuracyScore >= 80) {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
      ttsService.speak(`Bé Mầm khen bạn ${currentStudent.name} đọc rất to và chuẩn xác!`);
    } else {
      ttsService.speak(`Bạn ${currentStudent.name} đã rất cố gắng! Cùng luyện lại nhé!`);
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Phòng Luyện Đọc Thông Minh</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            BÉ MẦM AI HỖ TRỢ LUYỆN ĐỌC
          </h1>
          <p className="text-pink-100 text-xs sm:text-sm">
            Học sinh đọc to vào micro, AI phân tích âm sắc, chỉ rõ từ đúng và từ cần sửa cho bé <b>{currentStudent.name}</b>.
          </p>
        </div>

        <BeMamMascot
          mood={isRecording ? 'speaking' : 'happy'}
          size="md"
          message={`Bé ${currentStudent.name} ơi, hãy nhấn nút Micro rồi đọc thật to rõ ràng nhé!`}
        />
      </div>

      {/* 2. Passage Selector */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        {READING_PASSAGES.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setSelectedPassage(p);
              setTranscript('');
              setAssessmentResult(null);
            }}
            className={`px-4 py-3 rounded-2xl border-2 font-bold text-xs sm:text-sm text-left transition-all shrink-0 ${
              selectedPassage.id === p.id
                ? 'bg-pink-50 border-pink-500 text-pink-900 shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:border-pink-300'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-extrabold">{p.title}</span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-slate-200">
                {p.level}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{p.targetText}</p>
          </button>
        ))}
      </div>

      {/* 3. Main Reading Teleprompter Card */}
      <div className="bg-white rounded-3xl border-2 border-pink-100 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-pink-700 bg-pink-100 px-3 py-1 rounded-full">
              {selectedPassage.focusRhymes}
            </span>
          </div>

          {/* Model Voice Button */}
          <button
            onClick={() => ttsService.speak(selectedPassage.targetText)}
            className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors"
          >
            <Volume2 className="w-4 h-4" />
            <span>Nghe Bé Mầm đọc mẫu</span>
          </button>
        </div>

        {/* Big Text To Read */}
        <div className="bg-gradient-to-b from-slate-50 to-pink-50/30 p-6 sm:p-8 rounded-3xl border border-pink-100 text-center space-y-3">
          <p className="text-xl sm:text-3xl font-black text-slate-900 leading-relaxed tracking-wide select-none">
            {selectedPassage.targetText}
          </p>
          <p className="text-xs text-pink-600 font-semibold italic">
            💡 Lời khuyên: {selectedPassage.tips}
          </p>
        </div>

        {/* Live Audio Visualizer / Recording Controls */}
        <div className="flex flex-col items-center justify-center gap-4 pt-2">
          {isRecording ? (
            <div className="flex flex-col items-center gap-3">
              {/* Pulsing Red Indicator */}
              <div className="flex items-center gap-1.5 h-8">
                <span className="w-1.5 h-6 bg-rose-500 animate-pulse rounded-full" />
                <span className="w-1.5 h-8 bg-rose-500 animate-pulse rounded-full delay-75" />
                <span className="w-1.5 h-4 bg-rose-500 animate-pulse rounded-full delay-150" />
                <span className="w-1.5 h-9 bg-rose-500 animate-pulse rounded-full delay-200" />
                <span className="w-1.5 h-5 bg-rose-500 animate-pulse rounded-full delay-100" />
              </div>

              <p className="text-sm font-bold text-rose-600 animate-pulse">
                Đang nghe bạn đọc... (Đọc to từng chữ nhé!)
              </p>

              {transcript && (
                <div className="bg-white p-3 rounded-xl border border-rose-200 text-xs text-slate-700 max-w-md text-center italic">
                  "{transcript}"
                </div>
              )}

              <button
                onClick={handleStopRecordingAndAnalyze}
                className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-sm px-6 py-3 rounded-2xl shadow-lg transition-transform active:scale-95"
              >
                <MicOff className="w-5 h-5" />
                <span>Hoàn thành & Chấm điểm</span>
              </button>
            </div>
          ) : (
            <button
              disabled={isAnalyzing}
              onClick={handleStartRecording}
              className="flex items-center gap-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-black text-base sm:text-lg px-8 py-4 rounded-3xl shadow-lg shadow-pink-500/25 transition-transform active:scale-95"
            >
              <Mic className="w-6 h-6 animate-bounce" />
              <span>{isAnalyzing ? 'Bé Mầm đang chấm điểm...' : 'BẮT ĐẦU ĐỌC BÀI NÀO!'}</span>
            </button>
          )}
        </div>

        {/* 4. Assessment Results */}
        {assessmentResult && (
          <div className="bg-gradient-to-br from-slate-50 to-emerald-50/50 rounded-3xl p-6 border-2 border-emerald-200 space-y-5 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
              <div>
                <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase">
                  Kết quả đánh giá AI
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Đánh giá giọng đọc của {currentStudent.name}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Độ chính xác</span>
                  <span className="text-2xl font-black text-emerald-600">
                    {assessmentResult.accuracyScore}%
                  </span>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div className="text-center">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Độ trôi chảy</span>
                  <span className="text-2xl font-black text-blue-600">
                    {assessmentResult.fluencyScore}%
                  </span>
                </div>
              </div>
            </div>

            {/* Word by word color highlights */}
            <div>
              <p className="text-xs font-bold text-slate-600 mb-2">
                Chi tiết từng tiếng (Xanh: đọc đúng chuẩn; Vàng: cần đọc rõ hơn):
              </p>
              <div className="flex flex-wrap gap-2">
                {assessmentResult.wordAnalysis?.map((w, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-xl font-bold text-sm sm:text-base border ${
                      w.status === 'correct'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}
                  >
                    {w.word}
                  </span>
                ))}
              </div>
            </div>

            {/* Bé Mầm feedback */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-start gap-3">
              <BeMamMascot mood="happy" size="sm" />
              <div className="space-y-1">
                <p className="text-xs font-extrabold text-blue-700">Lời khen từ Bé Mầm AI:</p>
                <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                  "{assessmentResult.feedback}"
                </p>
                {assessmentResult.teacherTip && (
                  <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    📌 <b>Gợi ý cho cô Tú My:</b> {assessmentResult.teacherTip}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
