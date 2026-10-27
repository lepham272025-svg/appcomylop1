import { Student, Assignment } from '../types';
import { INITIAL_STUDENTS, INITIAL_ASSIGNMENTS } from '../data/studentsData';

const STORAGE_KEYS = {
  STUDENTS: 'mam_tri_tue_ai_students_v2',
  ASSIGNMENTS: 'mam_tri_tue_ai_assignments_v2',
  ACTIVE_STUDENT_ID: 'mam_tri_tue_ai_active_student_v2',
  CURRENT_ROLE: 'mam_tri_tue_ai_current_role_v2',
  FEEDBACKS: 'mam_tri_tue_ai_feedbacks_v2'
};

export const storageService = {
  getStudents(): Student[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 32) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error loading students from localStorage:', e);
    }
    // Initialize with 32 students
    this.saveStudents(INITIAL_STUDENTS);
    return INITIAL_STUDENTS;
  },

  saveStudents(students: Student[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
    } catch (e) {
      console.error('Error saving students to localStorage:', e);
    }
  },

  getStudentById(id: string): Student | undefined {
    const list = this.getStudents();
    return list.find((s) => s.id === id);
  },

  updateStudent(updatedStudent: Student): void {
    const list = this.getStudents();
    const idx = list.findIndex((s) => s.id === updatedStudent.id);
    if (idx !== -1) {
      list[idx] = updatedStudent;
      this.saveStudents(list);
    }
  },

  getAssignments(): Assignment[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading assignments from localStorage:', e);
    }
    this.saveAssignments(INITIAL_ASSIGNMENTS as Assignment[]);
    return INITIAL_ASSIGNMENTS as Assignment[];
  },

  saveAssignments(assignments: Assignment[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(assignments));
    } catch (e) {
      console.error('Error saving assignments to localStorage:', e);
    }
  },

  addAssignment(assignment: Assignment): void {
    const list = this.getAssignments();
    // Prepend new assignment
    list.unshift(assignment);
    this.saveAssignments(list);

    // Update student's total assignments
    const student = this.getStudentById(assignment.studentId);
    if (student) {
      student.totalAssignments += 1;
      this.updateStudent(student);
    }
  },

  submitAssignment(assignmentId: string, answers: Record<string, string>, score: number, aiDiagnosis?: string): Assignment | undefined {
    const assignments = this.getAssignments();
    const item = assignments.find((a) => a.id === assignmentId);
    if (!item) return undefined;

    item.status = 'completed';
    item.studentAnswers = answers;
    item.score = score;
    item.submittedAt = new Date().toISOString();
    if (aiDiagnosis) item.aiDiagnosis = aiDiagnosis;

    this.saveAssignments(assignments);

    // Also update student profile: add completed task, award stars, add history
    const student = this.getStudentById(item.studentId);
    if (student) {
      student.completedAssignments += 1;
      const earnedStars = score >= 9 ? 15 : score >= 7 ? 10 : 5;
      student.stars += earnedStars;
      student.streak += 1;

      // Update post-test estimation if score is high
      if (item.subject === 'vietnamese' && score > student.postTestVietnamese) {
        student.postTestVietnamese = Math.min(10, Math.round(((student.postTestVietnamese * 3 + score) / 4) * 10) / 10);
      } else if (item.subject === 'math' && score > student.postTestMath) {
        student.postTestMath = Math.min(10, Math.round(((student.postTestMath * 3 + score) / 4) * 10) / 10);
      }

      student.recentHistory.unshift({
        id: 'h-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        subject: item.subject,
        topic: item.title,
        score,
        totalQuestions: item.questions.length,
        timeSpent: '4 phút',
        note: `Hoàn thành tốt nhiệm vụ, nhận +${earnedStars} ngôi sao vàng!`
      });

      this.updateStudent(student);
    }

    return item;
  },

  reviewAssignment(assignmentId: string, teacherFeedback: string, remediationIdea?: string): void {
    const assignments = this.getAssignments();
    const item = assignments.find((a) => a.id === assignmentId);
    if (item) {
      item.status = 'reviewed';
      item.teacherFeedback = teacherFeedback;
      if (remediationIdea) item.aiSuggestedRemediation = remediationIdea;
      this.saveAssignments(assignments);
    }
  },

  getActiveStudentId(): string {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_STUDENT_ID) || 'HS02';
  },

  setActiveStudentId(id: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_STUDENT_ID, id);
  },

  resetAllData(): void {
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.ASSIGNMENTS);
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(INITIAL_ASSIGNMENTS));
  }
};
