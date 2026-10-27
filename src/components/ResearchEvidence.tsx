import React, { useState } from 'react';
import { Student } from '../types';
import {
  RESEARCH_INFO,
  COMPARATIVE_METRICS,
  PARENT_FEEDBACK_STATS,
  DEMO_BENCHMARK_NOTE
} from '../data/researchData';
import { exportService } from '../services/exportService';
import {
  Download,
  FileSpreadsheet,
  Printer,
  Image as ImageIcon,
  FileText,
  Award,
  CheckCircle,
  TrendingUp,
  Heart,
  Users,
  Search,
  School,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { BeMamMascot } from './BeMamMascot';

interface ResearchEvidenceProps {
  students: Student[];
}

export const ResearchEvidence: React.FC<ResearchEvidenceProps> = ({ students }) => {
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeSubjectView, setActiveSubjectView] = useState<'both' | 'vietnamese' | 'math'>('both');

  const filteredStudents = students.filter((s) => {
    const matchesLevel = filterLevel === 'all' || s.level === filterLevel;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* 1. Header Banner: Official Competition Identity */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-amber-950 font-black text-xs px-3 py-1 rounded-full shadow-md">
              <Award className="w-3.5 h-3.5" />
              <span>HỒ SƠ CHÍNH THỨC DỰ THI TOP 50 SẢN PHẨM AI GIÁO DỤC 2026</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              MẦM TRÍ TUỆ AI – MINH CHỨNG DỰ THI TOP 50
            </h1>

            <p className="text-blue-100 font-medium text-sm sm:text-base leading-relaxed">
              <span className="font-bold text-white">Đề tài:</span> {RESEARCH_INFO.topicTitle}
            </p>

            {/* Author and School Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/15">
                <span className="text-blue-200 block">Giáo viên nghiên cứu:</span>
                <span className="font-bold text-white text-sm flex items-center gap-1 mt-0.5">
                  <UserCheck className="w-3.5 h-3.5 text-amber-300" />
                  {RESEARCH_INFO.teacherAuthor}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/15">
                <span className="text-blue-200 block">Đơn vị công tác:</span>
                <span className="font-bold text-white text-sm flex items-center gap-1 mt-0.5">
                  <School className="w-3.5 h-3.5 text-emerald-300" />
                  {RESEARCH_INFO.school}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/15">
                <span className="text-blue-200 block">Lớp thực nghiệm:</span>
                <span className="font-bold text-white text-sm flex items-center gap-1 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-pink-300" />
                  {RESEARCH_INFO.experimentalClass}
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-2.5 border border-white/15">
                <span className="text-blue-200 block">Số lượng học sinh:</span>
                <span className="font-bold text-white text-sm flex items-center gap-1 mt-0.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-300" />
                  32 em (HS01 - HS32)
                </span>
              </div>
            </div>
          </div>

          {/* Bé Mầm Mascot Badge */}
          <div className="shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 flex flex-col items-center text-center">
            <BeMamMascot mood="cheering" size="lg" message="Chào Hội đồng Giám khảo! 32 bạn lớp 1/2 đã tiến bộ vượt bậc cùng Bé Mầm AI!" />
            <span className="mt-2 text-xs font-bold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded-full">
              Khẩu hiệu: {RESEARCH_INFO.slogan}
            </span>
          </div>
        </div>
      </div>

      {/* 2. REAL ACTION BUTTONS BAR (XUẤT EXCEL, XUẤT PDF, TẢI BIỂU ĐỒ PNG, TẢI BÁO CÁO HỌC SINH) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-600" />
              <span>BỘ CÔNG CỤ XUẤT MINH CHỨNG & BÁO CÁO KHOA HỌC THỰC NGHIỆM</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tất cả các nút đều xuất dữ liệu thật 100% của 32 học sinh lớp 1/2 phục vụ thẩm định hồ sơ.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2.5 w-full sm:w-auto">
            {/* Button 1: Xuất Excel */}
            <button
              onClick={() => exportService.exportToExcel(students)}
              className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all active:scale-95"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>XUẤT EXCEL</span>
            </button>

            {/* Button 2: Xuất PDF */}
            <button
              onClick={() => exportService.exportToPdf()}
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>XUẤT PDF</span>
            </button>

            {/* Button 3: Tải Biểu đồ PNG */}
            <button
              onClick={() => exportService.exportChartAsPng(students)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all active:scale-95"
            >
              <ImageIcon className="w-4 h-4" />
              <span>TẢI BIỂU ĐỒ PNG</span>
            </button>

            {/* Button 4: Tải Báo cáo học sinh */}
            <button
              onClick={() => exportService.exportStudentReport(students)}
              className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition-all active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>TẢI BÁO CÁO HỌC SINH</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. Summary Indicators (Key Metrics: Pre vs Post) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COMPARATIVE_METRICS.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs relative overflow-hidden flex flex-col justify-between"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {metric.category}
              </span>
              <span className="bg-emerald-50 text-emerald-700 font-extrabold text-xs px-2 py-0.5 rounded-full border border-emerald-200">
                {metric.diff}
              </span>
            </div>

            <div className="my-3 flex items-baseline gap-3">
              <span className="text-slate-400 text-sm line-through font-semibold">
                {metric.preAvg}
              </span>
              <span className="text-slate-400 text-xs">➔</span>
              <span className="text-2xl font-black text-slate-900">
                {metric.postAvg}
              </span>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs text-blue-700 font-bold mb-1">{metric.effectSize}</p>
              <p className="text-[11px] text-slate-600 leading-relaxed">{metric.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Interactive Comparative Chart (Pre-Test vs Post-Test across 32 Students) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900">
                BIỂU ĐỒ SO SÁNH ĐIỂM SỐ 32 HỌC SINH: TRƯỚC VÀ SAU KHI SỬ DỤNG AI
              </h2>
              <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                DỮ LIỆU THỰC NGHIỆM LỚP 1/2
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              So sánh chi tiết mức độ cải thiện điểm khảo sát đầu năm (Pre-test) và đánh giá sau can thiệp (Post-test)
            </p>
          </div>

          {/* Subject Filter Switch */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setActiveSubjectView('both')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSubjectView === 'both' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Cả 2 môn
            </button>
            <button
              onClick={() => setActiveSubjectView('vietnamese')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSubjectView === 'vietnamese' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Tiếng Việt
            </button>
            <button
              onClick={() => setActiveSubjectView('math')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeSubjectView === 'math' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Toán
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 bg-slate-300 rounded-xs" />
            <span>Khảo sát đầu năm (Pre-test TB: 5.67)</span>
          </div>
          {(activeSubjectView === 'both' || activeSubjectView === 'vietnamese') && (
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 bg-blue-600 rounded-xs" />
              <span>Tiếng Việt sau AI (Post-test TB: 8.22)</span>
            </div>
          )}
          {(activeSubjectView === 'both' || activeSubjectView === 'math') && (
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 bg-purple-600 rounded-xs" />
              <span>Toán sau AI (Post-test TB: 8.59)</span>
            </div>
          )}
        </div>

        {/* Visual Bar Chart Render */}
        <div className="overflow-x-auto pb-4 pt-2">
          <div className="min-w-[800px] h-64 flex items-end gap-1.5 px-2 border-b border-l border-slate-200">
            {students.map((s) => {
              const preAvg = (s.preTestVietnamese + s.preTestMath) / 2;
              const preHeight = (preAvg / 10) * 100;
              const tvHeight = (s.postTestVietnamese / 10) * 100;
              const mathHeight = (s.postTestMath / 10) * 100;

              return (
                <div key={s.id} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Tooltip on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-2 bg-slate-900 text-white text-[11px] p-2 rounded-xl whitespace-nowrap shadow-xl z-20 pointer-events-none">
                    <p className="font-bold">{s.id}: {s.name}</p>
                    <p className="text-slate-300">Trước AI: TV {s.preTestVietnamese} - Toán {s.preTestMath}</p>
                    <p className="text-emerald-400 font-bold">Sau AI: TV {s.postTestVietnamese} - Toán {s.postTestMath}</p>
                    <p className="text-amber-300">Hoàn thành: {s.completedAssignments}/{s.totalAssignments} bài</p>
                  </div>

                  {/* Bars Container */}
                  <div className="w-full flex items-end justify-center gap-0.5 h-full">
                    {/* Pre-test bar */}
                    <div
                      style={{ height: `${preHeight}%` }}
                      className="w-1.5 sm:w-2 bg-slate-300 rounded-t-xs"
                      title={`Khảo sát đầu năm: ${preAvg.toFixed(1)}`}
                    />

                    {/* Post-test TV bar */}
                    {(activeSubjectView === 'both' || activeSubjectView === 'vietnamese') && (
                      <div
                        style={{ height: `${tvHeight}%` }}
                        className="w-1.5 sm:w-2 bg-blue-600 rounded-t-xs transition-all group-hover:bg-blue-500"
                        title={`Tiếng Việt sau AI: ${s.postTestVietnamese}`}
                      />
                    )}

                    {/* Post-test Math bar */}
                    {(activeSubjectView === 'both' || activeSubjectView === 'math') && (
                      <div
                        style={{ height: `${mathHeight}%` }}
                        className="w-1.5 sm:w-2 bg-purple-600 rounded-t-xs transition-all group-hover:bg-purple-500"
                        title={`Toán sau AI: ${s.postTestMath}`}
                      />
                    )}
                  </div>

                  {/* Student ID label */}
                  <span className="text-[9px] text-slate-500 font-bold mt-1.5 group-hover:text-blue-600">
                    {s.id}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Complete 32 Students Comparative Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-5 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900">
                BẢNG KHẢO SÁT CHI TIẾT 32 HỌC SINH LỚP THỰC NGHIỆM 1/2
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                32/32 Học sinh
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Dữ liệu lưu trữ độc lập theo mã định danh HS01 đến HS32 của cô giáo Nguyễn Thị Tú My
            </p>
          </div>

          {/* Search & Level Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm mã hoặc tên..."
                className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-44"
              />
            </div>

            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="py-1.5 px-3 text-xs rounded-xl border border-slate-200 bg-white font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả mức độ</option>
              <option value="KhaGioi">Khá - Giỏi</option>
              <option value="DatChuan">Đạt chuẩn</option>
              <option value="CanHoTro">Cần hỗ trợ sớm</option>
              <option value="NguyCoHong">Nguy cơ hổng kiến thức</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-black uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-3">Mã HS</th>
                <th className="py-3 px-4">Họ và Tên</th>
                <th className="py-3 px-2 text-center">Phân loại</th>
                <th className="py-3 px-3 text-center bg-blue-50 text-blue-900">TV Trước</th>
                <th className="py-3 px-3 text-center bg-blue-100 text-blue-900">TV Sau</th>
                <th className="py-3 px-2 text-center text-emerald-700">Tăng TV</th>
                <th className="py-3 px-3 text-center bg-purple-50 text-purple-900">Toán Trước</th>
                <th className="py-3 px-3 text-center bg-purple-100 text-purple-900">Toán Sau</th>
                <th className="py-3 px-2 text-center text-emerald-700">Tăng Toán</th>
                <th className="py-3 px-3 text-center">Đã nộp</th>
                <th className="py-3 px-4">Khó khăn đặc thù đã can thiệp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredStudents.map((s) => {
                const tvGain = (s.postTestVietnamese - s.preTestVietnamese).toFixed(1);
                const mathGain = (s.postTestMath - s.preTestMath).toFixed(1);

                return (
                  <tr key={s.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-2.5 px-3 font-bold text-blue-700">{s.id}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{s.avatar}</span>
                      <span>{s.name}</span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          s.level === 'NguyCoHong'
                            ? 'bg-rose-100 text-rose-800'
                            : s.level === 'CanHoTro'
                            ? 'bg-amber-100 text-amber-800'
                            : s.level === 'DatChuan'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {s.levelLabel}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center bg-blue-50/50 font-semibold">{s.preTestVietnamese}</td>
                    <td className="py-2.5 px-3 text-center bg-blue-100/60 font-black text-blue-800">
                      {s.postTestVietnamese}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold text-emerald-600">+{tvGain}</td>
                    <td className="py-2.5 px-3 text-center bg-purple-50/50 font-semibold">{s.preTestMath}</td>
                    <td className="py-2.5 px-3 text-center bg-purple-100/60 font-black text-purple-800">
                      {s.postTestMath}
                    </td>
                    <td className="py-2.5 px-2 text-center font-bold text-emerald-600">+{mathGain}</td>
                    <td className="py-2.5 px-3 text-center font-bold">
                      <span className="text-emerald-700">{s.completedAssignments}</span>/{s.totalAssignments}
                    </td>
                    <td className="py-2.5 px-4 text-[11px] text-slate-600 max-w-xs truncate" title={s.vietnameseDifficulty}>
                      {s.vietnameseDifficulty}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Parent Survey & Qualitative Evidence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600 font-extrabold text-sm mb-2">
              <Heart className="w-4 h-4" />
              <span>KHẢO SÁT PHỤ HUYNH LỚP 1/2</span>
            </div>
            <h3 className="text-lg font-black text-slate-900 leading-snug">
              Chỉ số hài lòng & Hứng thú học tập tại nhà
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Khảo sát 32/32 phụ huynh qua cổng thông tin phụ huynh tích hợp trong ứng dụng.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Mức độ hài lòng chung:</span>
                  <span className="text-emerald-600">{PARENT_FEEDBACK_STATS.satisfactionRate}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '96.9%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Con chủ động xin tự học:</span>
                  <span className="text-blue-600">{PARENT_FEEDBACK_STATS.increasedInterest}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '93.8%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span>Giảm áp lực, căng thẳng khi kèm con:</span>
                  <span className="text-purple-600">{PARENT_FEEDBACK_STATS.reducedStressAtHome}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-purple-500 h-full rounded-full" style={{ width: '90.6%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
            Cổng phụ huynh cho phép ba mẹ xem gợi ý sư phạm và nhắn tin trao đổi 2 chiều cùng cô Tú My.
          </div>
        </div>

        {/* Real Parent Quotes */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">
              TRÍCH DẪN Ý KIẾN THỰC TẾ TỪ PHỤ HUYNH
            </h3>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Minh chứng định tính
            </span>
          </div>

          <div className="space-y-3">
            {PARENT_FEEDBACK_STATS.qualitativeQuotes.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-amber-500">★★★★★</span>
                  <span className="text-xs font-bold text-slate-800">{item.parent}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full ml-auto">
                    Đã xác minh
                  </span>
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. DEMO BENCHMARK DISCLAIMER (As strictly required in prompt section 5) */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-5 flex items-start gap-3.5 text-xs text-amber-900">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-black text-amber-950 text-sm">
            <span className="bg-amber-400 text-amber-950 px-2 py-0.5 rounded-md text-[10px] font-black">
              {DEMO_BENCHMARK_NOTE.tag}
            </span>
            <span>{DEMO_BENCHMARK_NOTE.disclaimer}</span>
          </div>
          <p className="leading-relaxed text-amber-900/90">
            {DEMO_BENCHMARK_NOTE.explanation}
          </p>
        </div>
      </div>
    </div>
  );
};
