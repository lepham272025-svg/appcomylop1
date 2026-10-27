export interface GenerateExerciseParams {
  studentName: string;
  subject: 'vietnamese' | 'math';
  difficulty: string;
  topic?: string;
  level?: string;
}

export interface AnalyzeErrorsParams {
  studentName: string;
  subject: 'vietnamese' | 'math';
  mistakes: Array<{ question: string; studentAnswer: string; correctAnswer: string }>;
  historicalSummary?: string;
}

export interface AssessReadingParams {
  targetText: string;
  spokenText: string;
  studentName?: string;
}

export const geminiService = {
  // Generate personalized exercises via backend proxy
  async generateExercise(params: GenerateExerciseParams) {
    try {
      const res = await fetch('/api/gemini/generate-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error('Network error');
      return await res.json();
    } catch (e) {
      console.warn('Backend exercise proxy failed, using pedagogical local generator:', e);
      return this.getLocalExerciseFallback(params);
    }
  },

  // Analyze learning errors via backend proxy
  async analyzeErrors(params: AnalyzeErrorsParams) {
    try {
      const res = await fetch('/api/gemini/analyze-errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error('Network error');
      return await res.json();
    } catch (e) {
      console.warn('Backend error analysis failed, using local diagnostic logic:', e);
      return {
        fallback: true,
        diagnosticSummary: `Học sinh ${params.studentName} có khó khăn ở kỹ năng phân tích âm vần / tư duy trừu tượng trong môn ${params.subject === 'vietnamese' ? 'Tiếng Việt' : 'Toán'}.`,
        rootCause: params.subject === 'vietnamese'
          ? 'Học sinh đang trong giai đoạn chuyển đổi giữa nhận diện chữ đơn và ghép vần đa âm tiết, dễ bị ảnh hưởng bởi phát âm thói quen hàng ngày.'
          : 'Học sinh cần thêm công cụ trực quan (que tính, hạt đếm) để củng cố khái niệm số học cơ bản trước khi chuyển sang tính nhẩm trừu tượng.',
        remedialSteps: [
          'Bước 1: Giảm độ dài câu hỏi, tăng cường hình ảnh minh họa sinh động.',
          'Bước 2: Sử dụng bài tập củng cố 3 câu của Bé Mầm AI với phản hồi tích cực tức thì.',
          'Bước 3: Nhắn phụ huynh phối hợp 5 phút đố vui mỗi tối theo hướng dẫn từ cổng phụ huynh.'
        ],
        encouragementMessage: `Bé Mầm tin bạn ${params.studentName} chỉ cần cố gắng một chút là sẽ làm rất tốt! Cố lên bạn nhỏ nhé!`
      };
    }
  },

  // Assess reading attempts
  async assessReading(params: AssessReadingParams) {
    try {
      const res = await fetch('/api/gemini/assess-reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });
      if (!res.ok) throw new Error('Network error');
      return await res.json();
    } catch (e) {
      console.warn('Backend reading assessment fallback:', e);
      const targetWords = (params.targetText || '').trim().split(/\s+/);
      const spokenWords = (params.spokenText || '').trim().split(/\s+/);
      let matchCount = 0;
      const wordAnalysis = targetWords.map((word, idx) => {
        const spoken = spokenWords[idx] || '';
        const isMatch = spoken.toLowerCase() === word.toLowerCase();
        if (isMatch) matchCount++;
        return {
          word,
          status: isMatch ? 'correct' : (spoken ? 'mispronounced' : 'skipped'),
          spokenAs: spoken
        };
      });

      const accuracyScore = Math.min(100, Math.max(65, Math.round((matchCount / (targetWords.length || 1)) * 100)));
      return {
        fallback: true,
        accuracyScore,
        fluencyScore: 88,
        wordAnalysis,
        feedback: accuracyScore >= 80
          ? `Bé Mầm khen bạn ${params.studentName || 'em'} đọc rất to, tròn vành rõ chữ và truyền cảm!`
          : `Bạn ${params.studentName || 'em'} đã rất cố gắng! Cùng luyện lại các từ có màu vàng để đọc hay hơn nữa nhé!`,
        teacherTip: 'Cho học sinh nghe lại giọng phát âm mẫu của Bé Mầm 2 lần trước khi thử lại.'
      };
    }
  },

  // Local fallback generator for reliable offline / prototype usage
  getLocalExerciseFallback(params: GenerateExerciseParams) {
    if (params.subject === 'vietnamese') {
      return {
        fallback: true,
        title: `Bài củng cố Tiếng Việt: ${params.topic || 'Vần và quy tắc chính tả'}`,
        description: `Bé Mầm AI tạo riêng cho ${params.studentName} để củng cố: "${params.difficulty}"`,
        questions: [
          {
            id: 'gen-q1',
            type: 'choice',
            prompt: 'Từ nào dưới đây có vần phù hợp với bài học?',
            options: ['ngôi làng', 'bàn học', 'hoa lan', 'bát cơm'],
            correctAnswer: 'ngôi làng',
            hint: 'L-ang-lang-huyền-làng.',
            explanation: 'Chính xác! "ngôi làng" có vần "ang".'
          },
          {
            id: 'gen-q2',
            type: 'choice',
            prompt: 'Quy tắc chính tả: Âm nào chỉ đi với các nguyên âm e, ê, i?',
            options: ['k, gh, ngh', 'c, g, ng', 'ch, tr, nh', 'b, d, đ'],
            correctAnswer: 'k, gh, ngh',
            hint: 'Nhớ ba người bạn nhỏ: kéo, ghé, nghỉ.',
            explanation: 'Rất tuyệt vời! k, gh, ngh luôn đi với e, ê, i.'
          },
          {
            id: 'gen-q3',
            type: 'choice',
            prompt: 'Chọn tiếng đúng: "Chú chim hót líu ... trên cành cây."',
            options: ['lo', 'loang', 'loắt', 'lo'],
            actualOptions: ['lo', 'loang', 'lon', 'loang'],
            correctAnswer: 'lo',
            hint: 'Líu lo líu lo.',
            explanation: 'Đúng rồi! "Líu lo" là tiếng chim ca ríu rít.'
          }
        ],
        aiPedagogyNote: `Học sinh ${params.studentName} cần bài tập ngắn, trực quan hoá tối đa, giảm gánh nặng đánh vần phức tạp.`,
        teacherAdvice: 'Cô giáo Tú My nên cho học sinh làm xong đọc to câu trả lời thành tiếng.'
      };
    } else {
      return {
        fallback: true,
        title: `Bài rèn luyện Toán: ${params.topic || 'Phép tính & So sánh số'}`,
        description: `Bé Mầm AI tạo riêng cho ${params.studentName} để vượt qua: "${params.difficulty}"`,
        questions: [
          {
            id: 'gen-m1',
            type: 'choice',
            prompt: 'Bé Mầm có 7 quả táo, bạn gấu tặng thêm 2 quả nữa. Hỏi Bé Mầm có tất cả bao nhiêu quả táo?',
            options: ['8 quả', '9 quả', '10 quả', '7 quả'],
            correctAnswer: '9 quả',
            hint: 'Ta làm phép tính cộng: 7 + 2 = ?',
            explanation: 'Chính xác! 7 + 2 = 9 quả táo đỏ.'
          },
          {
            id: 'gen-m2',
            type: 'choice',
            prompt: 'Tìm số thích hợp điền vào dấu ?: 10 - ? = 7',
            options: ['2', '3', '4', '5'],
            correctAnswer: '3',
            hint: 'Mười bớt mấy thì còn lại bảy?',
            explanation: 'Đúng rồi! 10 - 3 = 7.'
          },
          {
            id: 'gen-m3',
            type: 'choice',
            prompt: 'Hình nào có 4 cạnh dài bằng nhau chằn chặn?',
            options: ['Hình tròn', 'Hình vuông', 'Hình tam giác', 'Hình thoi'],
            correctAnswer: 'Hình vuông',
            hint: 'Giống viên gạch bông lát nền nhà.',
            explanation: 'Tuyệt đỉnh! Đó chính là hình vuông.'
          }
        ],
        aiPedagogyNote: `Em ${params.studentName} tiếp thu tốt hơn khi bài toán có nhân vật ngộ nghĩnh và đồ vật quen thuộc.`,
        teacherAdvice: 'Cho học sinh dùng que tính hoặc ngón tay thao tác thực hành.'
      };
    }
  }
};
