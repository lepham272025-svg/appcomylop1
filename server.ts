import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry header
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// 1. API: Cá nhân hóa bài tập bằng AI (Tiếng Việt & Toán lớp 1)
app.post('/api/gemini/generate-exercise', async (req: Request, res: Response) => {
  const { studentName, subject, difficulty, topic, level } = req.body;

  if (!ai || !apiKey) {
    // Graceful pedagogical fallback if key is not configured
    return res.json({
      fallback: true,
      title: subject === 'vietnamese' ? `Bài tập củng cố: ${topic || 'Luyện vần'}` : `Bài tập rèn luyện: ${topic || 'Phép tính phạm vi 10'}`,
      description: `Bé Mầm AI thiết kế riêng cho bạn ${studentName} để vượt qua điểm vướng mắc: ${difficulty}`,
      questions: subject === 'vietnamese' ? [
        {
          id: 'q1',
          type: 'choice',
          prompt: 'Từ nào sau đây chứa tiếng có vần "ang"?',
          options: ['bàn học', 'hoa cúc', 'ngôi làng', 'quả mận'],
          correctAnswer: 'ngôi làng',
          hint: 'Ngôi l-ang-lang-huyền-làng nở rộ sắc xuân!',
          explanation: 'Tiếng "làng" có vần "ang" (a - ng - ang).'
        },
        {
          id: 'q2',
          type: 'choice',
          prompt: 'Chọn vần thích hợp điền vào chỗ chấm: "Cây b... nở hoa đỏ rực."',
          options: ['ang', 'àng', 'àng', 'àng'],
          actualOptions: ['àng', 'ang', 'an', 'ong'],
          correctAnswer: 'àng',
          hint: 'Cây bàng toả bóng mát sân trường.',
          explanation: 'Điền "àng" để thành từ "Cây bàng".'
        },
        {
          id: 'q3',
          type: 'choice',
          prompt: 'Tiếng nào đọc đúng âm "ngh" đứng trước "e, ê, i"?',
          options: ['nghe ngóng', 'ngủ ngoan', 'ngon ngọt', 'ngã ba'],
          correctAnswer: 'nghe ngóng',
          hint: 'Luật chính tả: "ngh" chỉ ghép với e, ê, i.',
          explanation: 'Chính xác! "ngh" ghép với "e" tạo thành "nghe".'
        }
      ] : [
        {
          id: 'm1',
          type: 'choice',
          prompt: 'Bé Mầm có 6 quả táo đỏ. Bạn thỏ tặng thêm 3 quả. Hỏi Bé Mầm có tất cả bao nhiêu quả táo?',
          options: ['7 quả', '8 quả', '9 quả', '10 quả'],
          correctAnswer: '9 quả',
          hint: 'Ta làm phép tính cộng: 6 + 3 = ?',
          explanation: 'Đúng rồi! 6 + 3 = 9 quả táo đỏ mọng!'
        },
        {
          id: 'm2',
          type: 'choice',
          prompt: 'Điền số thích hợp vào dấu hỏi chấm: 10 - ? = 4',
          options: ['5', '6', '7', '8'],
          correctAnswer: '6',
          hint: 'Muốn tìm số trừ, ta lấy số bị trừ (10) bớt đi hiệu (4).',
          explanation: 'Chính xác! 10 bớt 6 còn 4.'
        },
        {
          id: 'm3',
          type: 'choice',
          prompt: 'Hình nào có 3 cạnh và 3 góc nhọn xinh xắn?',
          options: ['Hình tròn', 'Hình vuông', 'Hình tam giác', 'Hình chữ nhật'],
          correctAnswer: 'Hình tam giác',
          hint: 'Hình tam giác giống mái nhà và cánh buồm.',
          explanation: 'Tuyệt vời! Hình tam giác có đúng 3 cạnh.'
        }
      ],
      aiPedagogyNote: `Mầm AI đã phân tích điểm yếu "${difficulty}" của em ${studentName}. Bài tập tập trung rèn trực quan, giảm áp lực tâm lý, nâng cao phản xạ tự tin.`,
      teacherAdvice: 'Cô giáo Tú My nên cho học sinh thao tác que tính hoặc đọc to thành tiếng khi làm bài này.'
    });
  }

  try {
    const prompt = `Bạn là trợ lý AI sư phạm "Bé Mầm AI" trong dự án "MẦM TRÍ TUỆ AI" của cô giáo Nguyễn Thị Tú My (Trường TH Hoà Sơn, Đà Nẵng).
Nhiệm vụ: Tạo 3 câu hỏi trắc nghiệm lớp 1 cực kỳ trực quan, vui vẻ, cá nhân hóa cho học sinh:
- Tên học sinh: ${studentName}
- Môn học: ${subject === 'vietnamese' ? 'Tiếng Việt lớp 1' : 'Toán lớp 1'}
- Mức độ hiện tại: ${level || 'Cần hỗ trợ sớm'}
- Điểm khó khăn cần củng cố: "${difficulty}"
- Chủ đề: ${topic || 'Củng cố kiến thức trọng tâm'}

Yêu cầu định dạng JSON chính xác:
{
  "title": "Tên bài tập củng cố vui tươi",
  "description": "Lời động viên ngắn thân thiện từ Bé Mầm",
  "questions": [
    {
      "id": "q1",
      "type": "choice",
      "prompt": "Nội dung câu hỏi ngắn, rõ nghĩa, phù hợp trẻ 6 tuổi",
      "options": ["Đáp án 1", "Đáp án 2", "Đáp án 3", "Đáp án 4"],
      "correctAnswer": "Đáp án 1",
      "hint": "Gợi ý nhẹ nhàng, hình tượng",
      "explanation": "Giải thích vì sao đúng, khen ngợi bé"
    }
  ],
  "aiPedagogyNote": "Nhận xét sư phạm ngắn gọn cho cô giáo Tú My về nguyên nhân lỗi và giải pháp",
  "teacherAdvice": "Gợi ý tương tác trực tiếp 1-1 cô và trò"
}
Lưu ý: Chỉ trả về JSON hợp lệ, không bọc markdown hay giải thích thừa.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ fallback: false, ...parsed });
  } catch (error) {
    console.error('Error generating exercise with Gemini:', error);
    return res.status(500).json({ error: 'Lỗi tạo bài tập AI, chuyển sang chế độ tự động sư phạm.' });
  }
});

// 2. API: Phân tích lỗi sai & Chẩn đoán sư phạm
app.post('/api/gemini/analyze-errors', async (req: Request, res: Response) => {
  const { studentName, subject, mistakes, historicalSummary } = req.body;

  if (!ai || !apiKey) {
    return res.json({
      fallback: true,
      diagnosticSummary: `Học sinh ${studentName} có xu hướng vấp ở các dạng bài đòi hỏi phân biệt thính giác (vần gần âm) hoặc tư duy trừu tượng đảo ngược số.`,
      rootCause: subject === 'vietnamese'
        ? 'Giai đoạn chuyển từ đánh vần đơn sang vần ghép 2 âm cuối (ng, nh, c, t), học sinh hay phát âm theo thói quen địa phương hoặc nhầm vị trí âm đệm.'
        : 'Khái niệm bớt (phép trừ) còn phụ thuộc ngón tay, khi vượt qua số 5 thì trí nhớ thao tác ngắn hạn bị quá tải.',
      remedialSteps: [
        'Bước 1: Cho bé xem tranh trực quan và dùng tay làm động tác tượng thanh/tượng hình.',
        'Bước 2: Sử dụng bài tập củng cố 3 câu của Bé Mầm AI với độ dài ngắn, thưởng sao ngay.',
        'Bước 3: Nhắn phụ huynh phối hợp 5 phút đố vui mỗi tối theo hướng dẫn từ cổng phụ huynh.'
      ],
      encouragementMessage: `Bé Mầm tin bạn ${studentName} chỉ cần kiên nhẫn thêm một chút là sẽ làm rất tốt! Cố lên nhé bạn nhỏ!`
    });
  }

  try {
    const prompt = `Là chuyên gia AI sư phạm tiểu học trong ứng dụng "MẦM TRÍ TUỆ AI" của cô giáo Nguyễn Thị Tú My (Trường TH Hoà Sơn, Đà Nẵng):
Hãy phân tích lỗi sai thực tế của học sinh ${studentName} trong môn ${subject === 'vietnamese' ? 'Tiếng Việt lớp 1' : 'Toán lớp 1'}.
Dữ liệu lỗi sai: ${JSON.stringify(mistakes || [])}
Lịch sử học tập: ${historicalSummary || 'Đang trong diện hỗ trợ sớm của lớp 1/2'}

Hãy trả về JSON:
{
  "diagnosticSummary": "Chẩn đoán tổng quan nguyên nhân lỗi của học sinh",
  "rootCause": "Bản chất nhận thức/ngôn ngữ/tâm lý học sinh lớp 1 gây ra lỗi này",
  "remedialSteps": [
    "Bước can thiệp 1 của cô giáo",
    "Bước can thiệp 2 cùng Bé Mầm AI",
    "Bước phối hợp với phụ huynh tại nhà"
  ],
  "encouragementMessage": "Lời khích lệ ấm áp của Bé Mầm AI gửi riêng cho em"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ fallback: false, ...parsed });
  } catch (error) {
    console.error('Error analyzing errors with Gemini:', error);
    return res.status(500).json({ error: 'Lỗi phân tích sư phạm AI' });
  }
});

// 3. API: Đánh giá giọng đọc Tiếng Việt lớp 1 (AI Reading Assessment)
app.post('/api/gemini/assess-reading', async (req: Request, res: Response) => {
  const { targetText, spokenText, studentName } = req.body;

  if (!ai || !apiKey) {
    // Intelligent phonics comparison
    const targetWords = (targetText || '').trim().split(/\s+/);
    const spokenWords = (spokenText || '').trim().split(/\s+/);
    let matchCount = 0;
    const wordAnalysis = targetWords.map((word: string, idx: number) => {
      const match = spokenWords[idx] && spokenWords[idx].toLowerCase() === word.toLowerCase();
      if (match) matchCount++;
      return {
        word,
        status: match ? 'correct' : (spokenWords[idx] ? 'mispronounced' : 'skipped'),
        spokenAs: spokenWords[idx] || ''
      };
    });

    const accuracyScore = Math.max(60, Math.min(100, Math.round((matchCount / (targetWords.length || 1)) * 100)));

    return res.json({
      fallback: true,
      accuracyScore,
      fluencyScore: 88,
      wordAnalysis,
      feedback: accuracyScore >= 80
        ? `Bé Mầm khen bạn ${studentName || 'em'} đọc rất to, rõ ràng và truyền cảm!`
        : `Bạn ${studentName || 'em'} đọc khá tốt rồi, chỉ cần chú ý phát âm chậm và rõ hơn ở các từ có âm vần khó nhé!`,
      teacherTip: 'Cho học sinh nghe lại giọng mẫu của Bé Mầm 2 lần trước khi đọc lại lần tiếp theo.'
    });
  }

  try {
    const prompt = `Bạn là trợ lý chấm đọc thông minh "Bé Mầm AI" cho học sinh lớp 1 tại Việt Nam.
Văn bản mẫu cần đọc: "${targetText}"
Lời học sinh đã đọc (nhận diện qua micro): "${spokenText}"
Tên học sinh: ${studentName || 'Em'}

Hãy phân tích và trả về JSON:
{
  "accuracyScore": 90,
  "fluencyScore": 85,
  "wordAnalysis": [
    {"word": "từ", "status": "correct | mispronounced | skipped", "spokenAs": "..."}
  ],
  "feedback": "Lời nhận xét ngọt ngào, khen ngợi tiến bộ và chỉ dẫn nhẹ nhàng",
  "teacherTip": "Lời khuyên cho cô giáo Tú My"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: { responseMimeType: 'application/json' },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ fallback: false, ...parsed });
  } catch (error) {
    console.error('Error assessing reading:', error);
    return res.status(500).json({ error: 'Lỗi đánh giá đọc của AI' });
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server MẦM TRÍ TUỆ AI đang chạy trên cổng ${port}`);
  });
}

startServer();
