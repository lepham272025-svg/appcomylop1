import React, { useState } from 'react';
import { Student } from '../types';
import { BeMamMascot } from './BeMamMascot';
import {
  ClipboardCheck,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  BarChart,
  Users
} from 'lucide-react';

interface DiagnosticSurveyProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
}

export const DiagnosticSurvey: React.FC<DiagnosticSurveyProps> = ({ students, onSelectStudent }) => {
  const [activeSubject, setActiveSubject] = useState<'vietnamese' | 'math'>('vietnamese');

  const tvLow = students.filter((s) => s.preTestVietnamese < 5).length;
  const tvMid = students.filter((s) => s.preTestVietnamese >= 5 && s.preTestVietnamese < 7).length;
  const tvHigh = students.filter((s) => s.preTestVietnamese >= 7).length;

  const mathLow = students.filter((s) => s.preTestMath < 5).length;
  const mathMid = students.filter((s) => s.preTestMath >= 5 && s.preTestMath < 7).length;
  const mathHigh = students.filter((s) => s.preTestMath >= 7).length;

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* 1. Header */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
            <ClipboardCheck className="w-3.5 h-3.5 text-amber-300" />
            <span>Đánh Giá Ban Đầu & Sàng Lọc Sớm Khó Khăn</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            KHẢO SÁT NĂNG LỰC ĐẦU VÀO LỚP 1/2
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm">
            Công cụ khảo sát chuẩn hóa đầu năm học giúp giáo viên Nguyễn Thị Tú My phát hiện sớm các rào cản học tập trước khi can thiệp bằng Bé Mầm AI.
          </p>
        </div>

        <BeMamMascot
          mood="thinking"
          size="md"
          message="Khảo sát đầu vào giúp cô Tú My nắm rõ từng bạn nhỏ để Bé Mầm thiết kế bài tập vừa vặn nhất!"
        />
      </div>

      {/* 2. Statistical Breakdown of Baseline Survey */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vietnamese Baseline Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>📖</span>
              <span>Khảo sát Tiếng Việt đầu năm (Pre-test)</span>
            </h2>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              TB: 5.58 đ
            </span>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-rose-700">Nguy cơ hổng & Cần hỗ trợ (Dưới 5.0đ):</span>
                <span>{tvLow} / 32 em ({((tvLow / 32) * 100).toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(tvLow / 32) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-amber-700">Đạt chuẩn trung bình (5.0 - 6.9đ):</span>
                <span>{tvMid} / 32 em ({((tvMid / 32) * 100).toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(tvMid / 32) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-700">Khá - Giỏi (Từ 7.0đ trở lên):</span>
                <span>{tvHigh} / 32 em ({((tvHigh / 32) * 100).toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(tvHigh / 32) * 100}%` }} />
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 leading-relaxed">
            <b>Phân tích lỗi chủ yếu:</b> Nhầm lẫn âm vần địa phương (an/ang, c/k, ng/ngh), đọc ngắc ngứ và thiếu tự tin trước đám đông.
          </p>
        </div>

        {/* Math Baseline Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>📐</span>
              <span>Khảo sát Toán học đầu năm (Pre-test)</span>
            </h2>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
              TB: 5.75 đ
            </span>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-rose-700">Nguy cơ hổng & Cần hỗ trợ (Dưới 5.0đ):</span>
                <span>{mathLow} / 32 em ({((mathLow / 32) * 100).toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(mathLow / 32) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-amber-700">Đạt chuẩn trung bình (5.0 - 6.9đ):</span>
                <span>{mathMid} / 32 em ({((mathMid / 32) * 100).toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(mathMid / 32) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-emerald-700">Khá - Giỏi (Từ 7.0đ trở lên):</span>
                <span>{mathHigh} / 32 em ({((mathHigh / 32) * 100).toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(mathHigh / 32) * 100}%` }} />
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500 pt-2 border-t border-slate-100 leading-relaxed">
            <b>Phân tích lỗi chủ yếu:</b> Nhầm lẫn dấu lớn/bé, đếm nhảy cóc số lượng lớn hơn 10, chưa hiểu từ khóa bài toán có lời văn.
          </p>
        </div>
      </div>

      {/* 3. Action Recommendation: Targeted Students */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <span>DANH SÁCH HỌC SINH ĐƯỢC CHỈ ĐỊNH CAN THIỆP TRỌNG ĐIỂM (12 EM)</span>
          </h3>
          <span className="text-xs text-slate-500">
            Dựa trên kết quả khảo sát đầu vào
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {students
            .filter((s) => s.level === 'NguyCoHong' || s.level === 'CanHoTro')
            .map((s) => (
              <div
                key={s.id}
                onClick={() => onSelectStudent(s)}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 cursor-pointer transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{s.avatar}</span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black text-blue-700 bg-blue-100 px-1 rounded-sm">
                        {s.id}
                      </span>
                      <span className="font-bold text-xs text-slate-900">{s.name}</span>
                    </div>
                    <span className="text-[10px] text-rose-600 font-bold block mt-0.5">
                      Đầu năm: TV {s.preTestVietnamese} • Toán {s.preTestMath}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
