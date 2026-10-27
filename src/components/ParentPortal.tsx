import React, { useState } from 'react';
import { Student } from '../types';
import { BeMamMascot } from './BeMamMascot';
import {
  Heart,
  MessageSquare,
  Award,
  Send,
  Star,
  CheckCircle,
  Lightbulb,
  Phone,
  UserCheck
} from 'lucide-react';

interface ParentPortalProps {
  currentStudent: Student;
  allStudents: Student[];
  onSwitchStudent: (id: string) => void;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({
  currentStudent,
  allStudents,
  onSwitchStudent
}) => {
  const [feedbackText, setFeedbackText] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    setSentSuccess(true);
    setFeedbackText('');
    setTimeout(() => setSentSuccess(false), 5000);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
            <Heart className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
            <span>Sổ Liên Lạc Điện Tử Thông Minh</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            CỔNG THÔNG TIN PHỤ HUYNH
          </h1>
          <p className="text-amber-100 text-xs sm:text-sm">
            Kênh đồng hành giữa gia đình và cô giáo <b>Nguyễn Thị Tú My</b> (Lớp 1/2 • Trường TH Hoà Sơn).
          </p>
        </div>

        <BeMamMascot
          mood="happy"
          size="md"
          message={`Bé Mầm xin chào ba mẹ bạn ${currentStudent.name}! Hôm nay bé học rất chăm chỉ ạ!`}
        />
      </div>

      {/* 2. Select Student Pill */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-1 bg-amber-50 rounded-xl border border-amber-200">
            {currentStudent.avatar}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                {currentStudent.id}
              </span>
              <h2 className="text-lg font-black text-slate-900">{currentStudent.name}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Phụ huynh: <b>{currentStudent.parentName}</b> (SĐT: {currentStudent.parentPhone})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Xem học sinh khác:</span>
          <select
            value={currentStudent.id}
            onChange={(e) => onSwitchStudent(e.target.value)}
            className="py-1.5 px-3 text-xs font-bold rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {allStudents.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id}: {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Daily Learning Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-3.5">
          <span className="text-3xl p-2.5 bg-amber-50 rounded-2xl">⭐</span>
          <div>
            <span className="text-xs font-bold text-slate-500 block">Số sao tích lũy</span>
            <span className="text-2xl font-black text-amber-600">{currentStudent.stars} sao</span>
            <p className="text-[10px] text-emerald-600 font-bold mt-0.5">Xếp hạng chăm chỉ Lớp 1/2</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-3.5">
          <span className="text-3xl p-2.5 bg-blue-50 rounded-2xl">📝</span>
          <div>
            <span className="text-xs font-bold text-slate-500 block">Nhiệm vụ hoàn thành</span>
            <span className="text-2xl font-black text-blue-600">
              {currentStudent.completedAssignments} / {currentStudent.totalAssignments} bài
            </span>
            <p className="text-[10px] text-blue-600 font-bold mt-0.5">Tỷ lệ: {((currentStudent.completedAssignments / currentStudent.totalAssignments) * 100).toFixed(0)}%</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-3.5">
          <span className="text-3xl p-2.5 bg-purple-50 rounded-2xl">📈</span>
          <div>
            <span className="text-xs font-bold text-slate-500 block">Mức độ tiến bộ</span>
            <span className="text-2xl font-black text-purple-600">
              +{((currentStudent.postTestVietnamese - currentStudent.preTestVietnamese + (currentStudent.postTestMath - currentStudent.preTestMath)) / 2).toFixed(1)} đ
            </span>
            <p className="text-[10px] text-purple-600 font-bold mt-0.5">Sau 8 tuần can thiệp AI</p>
          </div>
        </div>
      </div>

      {/* 4. Teacher's Note & At-Home Interaction Advice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cô giáo Tú My's Note */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-blue-700 font-extrabold text-sm">
            <UserCheck className="w-4 h-4" />
            <span>NHẬN XÉT CỦA CÔ GIÁO NGUYỄN THỊ TÚ MY</span>
          </div>

          <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            "{currentStudent.teacherNote}"
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-bold text-slate-700">Điểm cần chú ý kèm thêm:</p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-slate-600">
              <p>• <b>Tiếng Việt:</b> {currentStudent.vietnameseDifficulty}</p>
              <p>• <b>Toán:</b> {currentStudent.mathDifficulty}</p>
            </div>
          </div>
        </div>

        {/* At-Home Fun Pedagogy Guide */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-600 font-extrabold text-sm">
            <Lightbulb className="w-4 h-4" />
            <span>GỢI Ý TƯƠNG TÁC CÙNG CON TẠI NHÀ (5 PHÚT)</span>
          </div>

          <div className="space-y-3 text-xs leading-relaxed text-slate-700">
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 flex items-start gap-2.5">
              <span className="text-base">🌟</span>
              <div>
                <p className="font-bold text-amber-950">Trò chơi đố chữ khi đi dạo:</p>
                <p className="text-slate-600 mt-0.5">
                  Ba mẹ hãy đố bé tìm 3 đồ vật xung quanh có vần "ang" (ví dụ: cái bảng, cây bàng, ánh sáng).
                </p>
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 flex items-start gap-2.5">
              <span className="text-base">🥄</span>
              <div>
                <p className="font-bold text-emerald-950">Học toán khi dọn cơm:</p>
                <p className="text-slate-600 mt-0.5">
                  Nhờ bé đếm 4 chiếc bát, rồi lấy thêm 2 chiếc thì cả nhà có mấy chiếc? (Rèn phép cộng trực quan).
                </p>
              </div>
            </div>

            <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-200 flex items-start gap-2.5">
              <span className="text-base">🎙️</span>
              <div>
                <p className="font-bold text-purple-950">Luyện đọc cùng Bé Mầm:</p>
                <p className="text-slate-600 mt-0.5">
                  Cho con mở app 10 phút trước khi đi ngủ, bé rất thích được robot chấm điểm và khen ngợi.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Feedback Form from Parent */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-black text-sm text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-blue-600" />
          <span>GỬI PHẢN HỒI HOẶC TIN NHẮN CHO CÔ GIÁO TÚ MY</span>
        </h3>

        <form onSubmit={handleSendFeedback} className="space-y-3">
          <textarea
            rows={3}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Kính gửi cô giáo Tú My, hôm nay cháu ở nhà làm bài rất hứng thú..."
            className="w-full p-3.5 text-xs sm:text-sm rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />

          <div className="flex items-center justify-between">
            {sentSuccess ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-fade-in">
                <CheckCircle className="w-4 h-4" />
                Đã gửi lời nhắn đến cô giáo Tú My thành công!
              </span>
            ) : (
              <span className="text-[11px] text-slate-400">
                Ý kiến của phụ huynh là nguồn động viên quý giá cho đề tài nghiên cứu.
              </span>
            )}

            <button
              type="submit"
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs transition-transform active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Gửi lời nhắn</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
