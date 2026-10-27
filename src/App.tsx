import React, { useState, useEffect } from 'react';
import { UserRole, Student, Assignment } from './types';
import { storageService } from './services/storageService';
import { RESEARCH_INFO } from './data/researchData';
import { Navbar } from './components/Navbar';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentZone } from './components/StudentZone';
import { ParentPortal } from './components/ParentPortal';
import { ResearchEvidence } from './components/ResearchEvidence';
import { LessonsHub } from './components/LessonsHub';
import { ReadingCoach } from './components/ReadingCoach';
import { GameCenter } from './components/GameCenter';
import { DiagnosticSurvey } from './components/DiagnosticSurvey';
import { ReportsView } from './components/ReportsView';
import { AiExerciseModal } from './components/AiExerciseModal';
import { StudentDetailModal } from './components/StudentDetailModal';
import { StatusVerificationModal } from './components/StatusVerificationModal';
import { BeMamMascot } from './components/BeMamMascot';
import {
  Award,
  Sparkles,
  Heart,
  School,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('teacher');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [students, setStudents] = useState<Student[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<string>('HS02');

  // Modals
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedAiStudent, setSelectedAiStudent] = useState<Student | null>(null);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDetailStudent, setSelectedDetailStudent] = useState<Student | null>(null);

  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize data on mount
  useEffect(() => {
    const loadedStudents = storageService.getStudents();
    const loadedAssignments = storageService.getAssignments();
    const savedActiveStudentId = storageService.getActiveStudentId();

    setStudents(loadedStudents);
    setAssignments(loadedAssignments);
    setActiveStudentId(savedActiveStudentId);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSwitchStudent = (newId: string) => {
    setActiveStudentId(newId);
    storageService.setActiveStudentId(newId);
  };

  const handleOpenAiGenerator = (student: Student) => {
    setSelectedAiStudent(student);
    setIsAiModalOpen(true);
  };

  const handleSelectStudentForDetail = (student: Student) => {
    setSelectedDetailStudent(student);
    setIsDetailModalOpen(true);
  };

  const handleApproveAndAssign = (newAssignment: Assignment) => {
    storageService.addAssignment(newAssignment);
    setAssignments(storageService.getAssignments());
    setStudents(storageService.getStudents());
    showToast(`Đã duyệt & giao bài củng cố AI cho em ${newAssignment.studentName} thành công!`);
  };

  const handleSubmitAssignment = (
    assignmentId: string,
    answers: Record<string, string>,
    score: number,
    aiDiagnosis?: string
  ) => {
    storageService.submitAssignment(assignmentId, answers, score, aiDiagnosis);
    setAssignments(storageService.getAssignments());
    setStudents(storageService.getStudents());
    showToast(`Đã nộp và chấm điểm tự động: ${score}/10 điểm! Dữ liệu đã lưu an toàn.`);
  };

  const handleAwardStars = (starsCount: number) => {
    const student = students.find((s) => s.id === activeStudentId);
    if (student) {
      student.stars += starsCount;
      storageService.updateStudent(student);
      setStudents(storageService.getStudents());
      showToast(`Bé Mầm AI thưởng cho bạn +${starsCount} ngôi sao vàng!`);
    }
  };

  const handleResetData = () => {
    storageService.resetAllData();
    setStudents(storageService.getStudents());
    setAssignments(storageService.getAssignments());
    showToast('Đã khôi phục dữ liệu gốc của 32 học sinh lớp 1/2.');
  };

  const currentStudent = students.find((s) => s.id === activeStudentId) || students[0] || {
    id: 'HS02',
    name: 'Lê Minh Khôi',
    gender: 'nam',
    avatar: '👦',
    level: 'CanHoTro',
    levelLabel: 'Cần hỗ trợ sớm',
    vietnameseDifficulty: 'Đọc ngắc ngứ, hay quên âm ngh',
    mathDifficulty: 'Khó khăn bài toán có lời văn',
    preTestVietnamese: 4.0,
    preTestMath: 4.5,
    postTestVietnamese: 7.5,
    postTestMath: 8.0,
    completedAssignments: 16,
    totalAssignments: 18,
    stars: 115,
    streak: 8,
    parentName: 'Lê Văn Hùng',
    parentPhone: '0905***883',
    teacherNote: 'Cần khuyến khích bằng sticker ngôi sao.',
    recentHistory: []
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-blue-100 selection:text-blue-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <Navbar
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          if (role === 'student') setActiveTab('student_zone');
          else if (role === 'parent') setActiveTab('parent_portal');
          else setActiveTab('dashboard');
        }}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onOpenAuditModal={() => setIsAuditModalOpen(true)}
      />

      {/* Main Body View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 pb-12">
        {activeTab === 'dashboard' && (
          <TeacherDashboard
            students={students}
            assignments={assignments}
            onOpenAiGenerator={handleOpenAiGenerator}
            onOpenDiagnostic={(student) => {
              setSelectedDetailStudent(student);
              setIsDetailModalOpen(true);
            }}
            onSelectStudent={handleSelectStudentForDetail}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'students' && (
          <TeacherDashboard
            students={students}
            assignments={assignments}
            onOpenAiGenerator={handleOpenAiGenerator}
            onOpenDiagnostic={(student) => {
              setSelectedDetailStudent(student);
              setIsDetailModalOpen(true);
            }}
            onSelectStudent={handleSelectStudentForDetail}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'student_zone' && (
          <StudentZone
            currentStudent={currentStudent}
            allStudents={students}
            assignments={assignments}
            onSwitchStudent={handleSwitchStudent}
            onSubmitAssignment={handleSubmitAssignment}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'parent_portal' && (
          <ParentPortal
            currentStudent={currentStudent}
            allStudents={students}
            onSwitchStudent={handleSwitchStudent}
          />
        )}

        {activeTab === 'evidence' && <ResearchEvidence students={students} />}

        {activeTab === 'lessons' && <LessonsHub />}

        {activeTab === 'reading' && <ReadingCoach currentStudent={currentStudent} />}

        {activeTab === 'games' && (
          <GameCenter currentStudent={currentStudent} onAwardStars={handleAwardStars} />
        )}

        {activeTab === 'survey' && (
          <DiagnosticSurvey
            students={students}
            onSelectStudent={handleSelectStudentForDetail}
          />
        )}

        {activeTab === 'reports' && <ReportsView students={students} />}
      </main>

      {/* AI Generator Modal */}
      {selectedAiStudent && (
        <AiExerciseModal
          student={selectedAiStudent}
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          onApproveAndAssign={handleApproveAndAssign}
        />
      )}

      {/* Student Detail Modal */}
      {selectedDetailStudent && (
        <StudentDetailModal
          student={selectedDetailStudent}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          onOpenAiGenerator={handleOpenAiGenerator}
        />
      )}

      {/* System Audit & Verification Modal */}
      <StatusVerificationModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        onResetData={handleResetData}
      />

      {/* Footer: Official Research & Author Branding */}
      <footer className="bg-slate-900 text-slate-400 py-10 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-white text-xl shadow-md">
                🌱
              </div>
              <div>
                <span className="text-white font-black text-lg tracking-tight block">
                  MẦM TRÍ TUỆ AI
                </span>
                <span className="text-slate-400 text-xs">
                  {RESEARCH_INFO.slogan}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-amber-400/10 text-amber-300 font-bold px-3 py-1 rounded-xl border border-amber-400/20 text-xs">
                🏆 {RESEARCH_INFO.competition} - {RESEARCH_INFO.targetRanking}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-slate-400 text-xs leading-relaxed">
            <div>
              <p className="font-bold text-white mb-1">Tác giả đề tài:</p>
              <p>Giáo viên: <b>{RESEARCH_INFO.teacherAuthor}</b></p>
              <p>Đơn vị: <b>{RESEARCH_INFO.school}</b></p>
              <p>Lớp thực nghiệm: <b>{RESEARCH_INFO.experimentalClass} (32 học sinh)</b></p>
            </div>

            <div>
              <p className="font-bold text-white mb-1">Mục tiêu sư phạm:</p>
              <p>Cá nhân hóa bài tập bằng AI, chẩn đoán sớm và hỗ trợ học sinh gặp khó khăn trong môn Tiếng Việt và Toán lớp 1.</p>
              <p className="text-emerald-400 mt-1 font-semibold">100% học sinh tiến bộ qua khảo sát thực nghiệm.</p>
            </div>

            <div>
              <p className="font-bold text-white mb-1">Cam kết bảo mật & Chuẩn mực:</p>
              <p>Toàn bộ API Key xử lý qua proxy an toàn phía máy chủ. Dữ liệu học sinh lưu trữ bảo mật, tuân thủ đạo đức AI trong giáo dục tiểu học.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <p>© 2026 MẦM TRÍ TUỆ AI • Trường Tiểu học Hoà Sơn, thành phố Đà Nẵng.</p>
            <p>Phiên bản chính thức dự thi Top 50 Ứng dụng AI trong Giáo dục Việt Nam.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
