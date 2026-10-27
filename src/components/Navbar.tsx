import React from 'react';
import { UserRole } from '../types';
import {
  GraduationCap,
  Users,
  BookOpen,
  Mic,
  Gamepad2,
  BarChart3,
  Award,
  CheckCircle2,
  Sparkles,
  ClipboardList,
  HeartHandshake
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onOpenAuditModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  onOpenAuditModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Bar: Brand, Slogan, Role selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand Logo & Slogan */}
        <div
          onClick={() => onTabChange('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Logo Mark: Green sprout + Book + AI Circuit */}
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <span className="text-2xl select-none">🌱</span>
            <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-900 text-[9px] font-black px-1 rounded-full shadow-xs">
              AI
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                MẦM TRÍ TUỆ AI
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                Lớp 1/2 • TH Hoà Sơn
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-500 hidden md:block">
              Mỗi em một lộ trình – Mỗi ngày một tiến bộ
            </p>
          </div>
        </div>

        {/* Right Controls: Role Switcher & Audit button */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Role Selector Pill */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => onRoleChange('teacher')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentRole === 'teacher'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Giáo viên</span>
            </button>
            <button
              onClick={() => onRoleChange('student')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentRole === 'student'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>🎒</span>
              <span>Học sinh</span>
            </button>
            <button
              onClick={() => onRoleChange('parent')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                currentRole === 'parent'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Phụ huynh</span>
            </button>
          </div>

          {/* System Audit / Verification Modal Trigger */}
          <button
            onClick={onOpenAuditModal}
            title="Kiểm tra trạng thái & xác nhận quy trình"
            className="hidden lg:flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold px-2.5 py-1.5 rounded-xl transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Kiểm thử</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="bg-slate-50/80 border-t border-slate-200/80 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 py-1.5 text-xs sm:text-sm font-bold whitespace-nowrap">
          <button
            onClick={() => onTabChange('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              activeTab === 'dashboard'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <span>🏠</span>
            <span>Tổng quan</span>
          </button>

          <button
            onClick={() => onTabChange('students')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              activeTab === 'students'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Users className="w-4 h-4 text-blue-500" />
            <span>32 Học sinh</span>
          </button>

          <button
            onClick={() => onTabChange('survey')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              activeTab === 'survey'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <ClipboardList className="w-4 h-4 text-indigo-500" />
            <span>Khảo sát đầu vào</span>
          </button>

          <button
            onClick={() => onTabChange('lessons')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              activeTab === 'lessons'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span>Kho bài học (TV & Toán)</span>
          </button>

          <button
            onClick={() => onTabChange('reading')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              activeTab === 'reading'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Mic className="w-4 h-4 text-pink-500" />
            <span>AI Luyện đọc</span>
          </button>

          <button
            onClick={() => onTabChange('games')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              activeTab === 'games'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Gamepad2 className="w-4 h-4 text-purple-500" />
            <span>Trò chơi Bé Mầm</span>
          </button>

          <button
            onClick={() => onTabChange('reports')}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all ${
              activeTab === 'reports'
                ? 'bg-white text-blue-600 shadow-xs border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-amber-500" />
            <span>Biểu đồ tiến độ</span>
          </button>

          {/* High Priority: Minh Chứng Dự Thi TOP 50 */}
          <button
            onClick={() => onTabChange('evidence')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl ml-auto transition-all ${
              activeTab === 'evidence'
                ? 'bg-amber-400 text-slate-950 font-black shadow-md shadow-amber-400/30'
                : 'bg-amber-100/90 text-amber-900 hover:bg-amber-200'
            }`}
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>🏆 MINH CHỨNG DỰ THI TOP 50</span>
          </button>
        </div>
      </div>
    </header>
  );
};
