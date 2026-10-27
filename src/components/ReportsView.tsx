import React, { useState } from 'react';
import { Student } from '../types';
import { exportService } from '../services/exportService';
import {
  BarChart3,
  TrendingUp,
  Download,
  Award,
  CheckCircle2,
  Users,
  Printer
} from 'lucide-react';
import { BeMamMascot } from './BeMamMascot';

interface ReportsViewProps {
  students: Student[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ students }) => {
  const [selectedMetric, setSelectedMetric] = useState<'vietnamese' | 'math' | 'completion'>('vietnamese');

  // Averages
  const avgPreTv = (students.reduce((a, s) => a + s.preTestVietnamese, 0) / students.length).toFixed(2);
  const avgPostTv = (students.reduce((a, s) => a + s.postTestVietnamese, 0) / students.length).toFixed(2);
  const avgPreMath = (students.reduce((a, s) => a + s.preTestMath, 0) / students.length).toFixed(2);
  const avgPostMath = (students.reduce((a, s) => a + s.postTestMath, 0) / students.length).toFixed(2);

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* 1. Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
            <BarChart3 className="w-3.5 h-3.5 text-amber-300" />
            <span>Trung Tâm Báo Cáo & Phân Tích Sư Phạm</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            BÁO CÁO TIẾN ĐỘ & BIỂU ĐỒ TĂNG TRƯỞNG
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm">
            Theo dõi sự chuyển biến tích cực của 32 học sinh Lớp 1/2 Trường TH Hoà Sơn trước và sau khi sử dụng MẦM TRÍ TUỆ AI.
          </p>
        </div>

        <BeMamMascot mood="cheering" size="md" message="Dữ liệu cho thấy 100% các bạn học sinh đều tiến bộ vượt trội cô Tú My ơi!" />
      </div>

      {/* 2. Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase block">Tiếng Việt Trước AI</span>
          <span className="text-2xl font-black text-slate-700 mt-1 block">{avgPreTv} đ</span>
          <span className="text-[11px] text-slate-400">Khảo sát đầu năm (Pre-test)</span>
        </div>

        <div className="bg-white rounded-2xl border border-blue-200 p-5 shadow-xs bg-blue-50/20">
          <span className="text-xs font-bold text-blue-700 uppercase block">Tiếng Việt Sau AI</span>
          <span className="text-2xl font-black text-blue-700 mt-1 block">{avgPostTv} đ</span>
          <span className="text-[11px] text-emerald-600 font-bold">
            +{(parseFloat(avgPostTv) - parseFloat(avgPreTv)).toFixed(2)} đ tăng trưởng
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
          <span className="text-xs font-bold text-slate-500 uppercase block">Toán Học Trước AI</span>
          <span className="text-2xl font-black text-slate-700 mt-1 block">{avgPreMath} đ</span>
          <span className="text-[11px] text-slate-400">Khảo sát đầu năm (Pre-test)</span>
        </div>

        <div className="bg-white rounded-2xl border border-purple-200 p-5 shadow-xs bg-purple-50/20">
          <span className="text-xs font-bold text-purple-700 uppercase block">Toán Học Sau AI</span>
          <span className="text-2xl font-black text-purple-700 mt-1 block">{avgPostMath} đ</span>
          <span className="text-[11px] text-emerald-600 font-bold">
            +{(parseFloat(avgPostMath) - parseFloat(avgPreMath)).toFixed(2)} đ tăng trưởng
          </span>
        </div>
      </div>

      {/* 3. Interactive Visual Distribution Chart */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-black text-slate-900">
              PHÂN TÍCH TĂNG TRƯỞNG TỪNG HỌC SINH (HS01 - HS32)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Nhấn chuyển đổi môn học để quan sát phổ điểm chi tiết
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setSelectedMetric('vietnamese')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedMetric === 'vietnamese' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                Tiếng Việt
              </button>
              <button
                onClick={() => setSelectedMetric('math')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  selectedMetric === 'math' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                Toán học
              </button>
            </div>

            <button
              onClick={() => exportService.exportChartAsPng(students)}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tải PNG</span>
            </button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="overflow-x-auto pt-4">
          <div className="min-w-[750px] h-60 flex items-end gap-1.5 px-2 border-b border-l border-slate-200 pb-2">
            {students.map((s) => {
              const pre = selectedMetric === 'vietnamese' ? s.preTestVietnamese : s.preTestMath;
              const post = selectedMetric === 'vietnamese' ? s.postTestVietnamese : s.postTestMath;
              const prePct = (pre / 10) * 100;
              const postPct = (post / 10) * 100;

              return (
                <div key={s.id} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-0.5 h-full">
                    {/* Pre bar */}
                    <div
                      style={{ height: `${prePct}%` }}
                      className="w-2 bg-slate-300 rounded-t-xs"
                      title={`Trước AI: ${pre}`}
                    />
                    {/* Post bar */}
                    <div
                      style={{ height: `${postPct}%` }}
                      className={`w-2 rounded-t-xs transition-transform group-hover:scale-y-105 ${
                        selectedMetric === 'vietnamese' ? 'bg-blue-600' : 'bg-purple-600'
                      }`}
                      title={`Sau AI: ${post}`}
                    />
                  </div>
                  <span className="text-[9px] text-slate-500 font-bold mt-1 group-hover:text-blue-600">
                    {s.id}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mt-2 px-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 bg-slate-300 inline-block rounded-xs" /> Trước khi sử dụng AI
              </span>
              <span className="flex items-center gap-1">
                <span
                  className={`w-3 h-3 inline-block rounded-xs ${
                    selectedMetric === 'vietnamese' ? 'bg-blue-600' : 'bg-purple-600'
                  }`}
                />
                Sau khi sử dụng MẦM TRÍ TUỆ AI
              </span>
            </div>
            <span>32 học sinh lớp 1/2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
