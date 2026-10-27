import React, { useState } from 'react';
import { Student, Assignment } from '../types';
import {
  Users,
  Search,
  PlusCircle,
  Brain,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Send,
  MessageSquare,
  BookOpen
} from 'lucide-react';
import { BeMamMascot } from './BeMamMascot';

interface TeacherDashboardProps {
  students: Student[];
  assignments: Assignment[];
  onOpenAiGenerator: (student: Student) => void;
  onOpenDiagnostic: (student: Student) => void;
  onSelectStudent: (student: Student) => void;
  onNavigateTab: (tab: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  students,
  assignments,
  onOpenAiGenerator,
  onOpenDiagnostic,
  onSelectStudent,
  onNavigateTab
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [activeTabSub, setActiveTabSub] = useState<'students' | 'assignments'>('students');

  const filteredStudents = students.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLevel = selectedLevel === 'all' || s.level === selectedLevel;
    return matchSearch && matchLevel;
  });

  const pendingAssignments = assignments.filter((a) => a.status === 'assigned');
  const completedAssignments = assignments.filter((a) => a.status === 'completed' || a.status === 'reviewed');

  // Stats
  const totalTasksDone = students.reduce((acc, cur) => acc + cur.completedAssignments, 0);
  const totalStars = students.reduce((acc, cur) => acc + cur.stars, 0);
  const highRiskCount = students.filter((s) => s.level === 'NguyCoHong' || s.level === 'CanHoTro').length;

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Welcome Card: Teacher Tú My & Bé Mầm AI */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Không gian làm việc của Giáo viên</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Chào cô giáo Nguyễn Thị Tú My!
            </h1>
            <p className="text-blue-100 text-sm leading-relaxed">
              Lớp 1/2 • Trường Tiểu học Hoà Sơn, Đà Nẵng. Hệ thống <b>MẦM TRÍ TUỆ AI</b> đang theo dõi lộ trình riêng của 32 học sinh.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15">
                👥 <b>32</b> học sinh lớp 1/2
              </span>
              <span className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15">
                ⭐ <b>{totalStars.toLocaleString()}</b> sao vàng tích lũy
              </span>
              <span className="bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/15">
                📝 <b>{totalTasksDone}</b> bài tập đã nộp
              </span>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <BeMamMascot
              mood="happy"
              size="md"
              message="Cô Tú My ơi, hôm nay Bé Mầm đã sẵn sàng hỗ trợ 32 bạn lớp 1/2 rồi ạ!"
            />
            <div className="text-left">
              <p className="text-xs text-blue-200">Trợ lý sư phạm:</p>
              <p className="text-base font-black text-amber-300">BÉ MẦM AI</p>
              <p className="text-[11px] text-white/80">Tự động phân tích điểm yếu</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Key Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab('evidence')}
          className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-5 shadow-sm cursor-pointer hover:shadow-md transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-amber-100">Hồ sơ dự thi</span>
            <Award className="w-5 h-5 text-amber-200 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-xl font-black mt-2">DỰ THI TOP 50</p>
          <p className="text-xs text-amber-100 mt-1">Xuất Excel, PDF & Biểu đồ minh chứng</p>
        </div>

        <div
          onClick={() => onNavigateTab('survey')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-blue-400 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Khảo sát đầu năm</span>
            <CheckCircle2 className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-xl font-black text-slate-900 mt-2">32 / 32 HS</p>
          <p className="text-xs text-emerald-600 font-bold mt-1">Đã hoàn thành Pre-test</p>
        </div>

        <div
          onClick={() => {
            setSelectedLevel('CanHoTro');
            setActiveTabSub('students');
          }}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-amber-400 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cần hỗ trợ sớm</span>
            <Clock className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-xl font-black text-amber-600 mt-2">{highRiskCount} học sinh</p>
          <p className="text-xs text-slate-500 mt-1">Có bài củng cố cá nhân hóa</p>
        </div>

        <div
          onClick={() => onNavigateTab('reports')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-purple-400 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mức độ tăng trưởng</span>
            <TrendingUp className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
          </div>
          <p className="text-xl font-black text-emerald-600 mt-2">+2.74 điểm</p>
          <p className="text-xs text-slate-500 mt-1">Trung bình toàn bộ lớp 1/2</p>
        </div>
      </div>

      {/* 3. Students Management Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span>DANH SÁCH 32 HỌC SINH LỚP 1/2 – TRƯỜNG TH HOÀ SƠN</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Nhấn vào từng em để xem hồ sơ chi tiết, tạo bài tập AI hoặc theo dõi tiến trình
            </p>
          </div>

          {/* Sub Tab Switch: Students Grid vs Assignments */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
              <button
                onClick={() => setActiveTabSub('students')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTabSub === 'students' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                Hồ sơ học sinh (32)
              </button>
              <button
                onClick={() => setActiveTabSub('assignments')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTabSub === 'assignments' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600'
                }`}
              >
                Nhiệm vụ & Chấm bài ({assignments.length})
              </button>
            </div>
          </div>
        </div>

        {activeTabSub === 'students' ? (
          <>
            {/* Search and Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative flex-1 min-w-[240px] max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm học sinh theo tên hoặc mã HS (HS01...)"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-bold">
                <button
                  onClick={() => setSelectedLevel('all')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedLevel === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tất cả (32)
                </button>
                <button
                  onClick={() => setSelectedLevel('NguyCoHong')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedLevel === 'NguyCoHong'
                      ? 'bg-rose-600 text-white'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  Nguy cơ cao (4)
                </button>
                <button
                  onClick={() => setSelectedLevel('CanHoTro')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedLevel === 'CanHoTro'
                      ? 'bg-amber-500 text-white'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  Cần hỗ trợ sớm (8)
                </button>
                <button
                  onClick={() => setSelectedLevel('DatChuan')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedLevel === 'DatChuan'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  Đạt chuẩn (14)
                </button>
                <button
                  onClick={() => setSelectedLevel('KhaGioi')}
                  className={`px-3 py-1.5 rounded-xl transition-all ${
                    selectedLevel === 'KhaGioi'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  Khá - Giỏi (6)
                </button>
              </div>
            </div>

            {/* Students Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pt-2">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="bg-slate-50/70 hover:bg-white rounded-2xl p-4 border border-slate-200/90 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header: Avatar, Name, Level badge */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl p-1 bg-white rounded-xl shadow-xs border border-slate-100">
                          {student.avatar}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">
                              {student.id}
                            </span>
                            <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-600 transition-colors">
                              {student.name}
                            </h3>
                          </div>
                          <span
                            className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full mt-1 ${
                              student.level === 'NguyCoHong'
                                ? 'bg-rose-100 text-rose-800'
                                : student.level === 'CanHoTro'
                                ? 'bg-amber-100 text-amber-800'
                                : student.level === 'DatChuan'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}
                          >
                            {student.levelLabel}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pre vs Post Score chips */}
                    <div className="grid grid-cols-2 gap-2 my-2.5 bg-white p-2 rounded-xl border border-slate-100 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Tiếng Việt:</span>
                        <span className="font-semibold text-slate-600">{student.preTestVietnamese}</span>
                        <span className="text-slate-400 mx-1">➔</span>
                        <span className="font-black text-blue-700">{student.postTestVietnamese}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block">Toán học:</span>
                        <span className="font-semibold text-slate-600">{student.preTestMath}</span>
                        <span className="text-slate-400 mx-1">➔</span>
                        <span className="font-black text-purple-700">{student.postTestMath}</span>
                      </div>
                    </div>

                    {/* Difficulties tags */}
                    <div className="space-y-1 text-[11px] text-slate-600">
                      <p className="line-clamp-1" title={student.vietnameseDifficulty}>
                        <span className="font-bold text-slate-700">TV:</span> {student.vietnameseDifficulty}
                      </p>
                      <p className="line-clamp-1" title={student.mathDifficulty}>
                        <span className="font-bold text-slate-700">Toán:</span> {student.mathDifficulty}
                      </p>
                    </div>
                  </div>

                  {/* Actions for this student */}
                  <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center gap-1.5">
                    <button
                      onClick={() => onOpenAiGenerator(student)}
                      className="flex-1 flex items-center justify-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold py-2 rounded-xl shadow-xs transition-transform active:scale-95"
                      title="Dùng Bé Mầm AI tạo bài tập riêng"
                    >
                      <Brain className="w-3.5 h-3.5 text-amber-300" />
                      <span>Tạo bài AI</span>
                    </button>

                    <button
                      onClick={() => onSelectStudent(student)}
                      className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
                      title="Xem hồ sơ chi tiết"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Assignments Management Tab */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-800">
                DANH SÁCH BÀI TẬP ĐÃ GIAO ({assignments.length})
              </h3>
              <span className="text-xs text-slate-500">
                Đang chờ làm: <b>{pendingAssignments.length}</b> | Đã hoàn thành: <b>{completedAssignments.length}</b>
              </span>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
              {assignments.map((item) => (
                <div key={item.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                        {item.studentId}
                      </span>
                      <span className="font-bold text-sm text-slate-900">{item.studentName}</span>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          item.subject === 'vietnamese' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {item.subject === 'vietnamese' ? 'Tiếng Việt' : 'Toán'}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.status === 'reviewed'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.status === 'completed' ? 'Đã nộp bài' : item.status === 'reviewed' ? 'Cô đã duyệt' : 'Đang làm'}
                      </span>
                    </div>
                    <p className="font-bold text-xs text-slate-800">{item.title}</p>
                    <p className="text-xs text-slate-500">{item.description}</p>
                    {item.score !== undefined && (
                      <p className="text-xs text-emerald-600 font-black">
                        ★ Kết quả: {item.score} / 10 điểm
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {item.status === 'completed' && (
                      <div className="text-right text-xs bg-emerald-50 text-emerald-900 p-2 rounded-xl border border-emerald-200">
                        <span className="font-bold">Đã tự động chấm & lưu hồ sơ</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
