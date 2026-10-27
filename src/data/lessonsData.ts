import { Lesson } from '../types';

export const LESSONS_DATA: Lesson[] = [
  // --- TIẾNG VIỆT LỚP 1 ---
  {
    id: 'tv-01',
    subject: 'vietnamese',
    grade: 1,
    unit: 'Chủ đề 1: Làm quen chữ cái & thanh điệu',
    title: 'Quy tắc vàng: Phân biệt ng - ngh, c - k, g - gh',
    summary: 'Mẹo nhớ chính tả bằng thơ lục bát vui nhộn giúp học sinh không bao giờ nhầm lẫn.',
    visualIcon: '🔤',
    level: 'Củng cố khó khăn',
    tags: ['Chính tả', 'Âm đầu', 'ng/ngh', 'c/k'],
    content: `
⭐ QUY TẮC BÉ MẦM:
- Âm "k, gh, ngh" chỉ đi với 3 người bạn thân: "e, ê, i" (Ví dụ: kéo, ghé, nghỉ, nghe).
- Âm "c, g, ng" đi với các chữ còn lại: "a, o, ô, ơ, u, ư..." (Ví dụ: cá, gà, ngô, ngủ).

💡 Câu thần chú vui:
"Kìa em bé nghé
Thích đi cùng e, ê, i
Còn các chữ cái khác
Thì nhường c, g, ng!"
    `,
    audioPronunciation: 'k-gh-ngh chỉ đi với e-ê-i. Ví dụ: chú nghé con, cây kéo nhỏ, nghỉ hè.',
    practiceQuestions: [
      {
        id: 'q-tv1-1',
        type: 'choice',
        prompt: 'Chữ nào ghép ĐÚNG với chữ "ê"?',
        options: ['c', 'k', 'g', 'ng'],
        correctAnswer: 'k',
        hint: 'Nhớ ba người bạn e, ê, i nhé!',
        explanation: 'Đúng rồi! k ghép với ê thành "kê" (con gà kê, kê bàn).'
      },
      {
        id: 'q-tv1-2',
        type: 'choice',
        prompt: 'Từ nào sau đây viết sai chính tả?',
        options: ['con nghé', 'nghe nhạc', 'nghủ say', 'ngắm nhìn'],
        correctAnswer: 'nghủ say',
        hint: '"u" không phải e, ê, i nên không đi với "ngh".',
        explanation: 'Chính xác! Phải viết là "ngủ say" (ng ghép với u).'
      }
    ]
  },
  {
    id: 'tv-02',
    subject: 'vietnamese',
    grade: 1,
    unit: 'Chủ đề 2: Luyện vần ghép',
    title: 'Phân biệt vần an và ang (Âm cuối n và ng)',
    summary: 'Cách đặt khẩu hình miệng để phát âm chuẩn xác vần an (khép răng) và ang (mở rộng họng).',
    visualIcon: '🗣️',
    level: 'Củng cố khó khăn',
    tags: ['Vần an - ang', 'Luyện phát âm', 'Khẩu hình'],
    content: `
⭐ BÍ KÍP KHẨU HÌNH MIỆNG:
- Vần "an" (a - n - an): Khi đọc xong, đầu lưỡi chạm vào chân răng trên, môi khẽ hé.
  Ví dụ: cái bàn, hoa lan, đàn gà, bạn bè.
- Vần "ang" (a - ng - ang): Khi đọc, miệng mở rộng hơn, cuống lưỡi chạm vòm họng mềm, hơi ra đằng mũi.
  Ví dụ: cây bàng, ngôi làng, ánh sáng, vàng ươm.
    `,
    audioPronunciation: 'an: bàn học, hoa lan. ang: cây bàng, ánh sáng.',
    practiceQuestions: [
      {
        id: 'q-tv2-1',
        type: 'choice',
        prompt: 'Điền vần vào chỗ trống: "Buổi sáng, ánh nắng ... ngập tràn khắp sân."',
        options: ['an', 'ang', 'ăng', 'on'],
        correctAnswer: 'ang',
        hint: 'Nắng chói chang, nắng vàng.',
        explanation: 'Đúng rồi! "ánh nắng vàng" hoặc "ngập tràn" có vần an/ang.'
      },
      {
        id: 'q-tv2-2',
        type: 'choice',
        prompt: 'Tiếng "làng" trong từ "ngôi làng" có vần gì?',
        options: ['an', 'ang', 'am', 'ap'],
        correctAnswer: 'ang',
        hint: 'l - ang - lang - huyền - làng.',
        explanation: 'Chính xác! Tiếng "làng" có vần "ang".'
      }
    ]
  },
  {
    id: 'tv-03',
    subject: 'vietnamese',
    grade: 1,
    unit: 'Chủ đề 3: Đọc hiểu và cảm thụ',
    title: 'Luyện đọc đoạn văn: "Mầm xanh bé nhỏ"',
    summary: 'Đoạn văn ngắn 3 câu giúp học sinh lớp 1 luyện ngắt nghỉ hơi và trả lời câu hỏi đọc hiểu.',
    visualIcon: '🌱',
    level: 'Cơ bản',
    tags: ['Luyện đọc', 'Đoạn văn', 'Đọc hiểu'],
    content: `
📖 BÀI ĐỌC: MẦM XANH BÉ NHỎ

Hạt mầm nằm ngủ say sưa dưới lòng đất ấm. 
Một sớm mai, mưa xuân tưới mát, mầm xanh cựa mình thức dậy. 
Nó nhú lên hai chiếc lá non xanh biếc, mỉm cười chào ông mặt trời.
    `,
    audioPronunciation: 'Hạt mầm nằm ngủ say sưa dưới lòng đất ấm. Một sớm mai, mưa xuân tưới mát, mầm xanh cựa mình thức dậy.',
    practiceQuestions: [
      {
        id: 'q-tv3-1',
        type: 'choice',
        prompt: 'Ai đã tưới mát giúp hạt mầm cựa mình thức dậy?',
        options: ['Mưa xuân', 'Gió bấc', 'Bé Mầm AI', 'Ánh sao đêm'],
        correctAnswer: 'Mưa xuân',
        hint: 'Đọc kỹ câu thứ hai trong bài đọc.',
        explanation: 'Hoan hô bạn nhỏ! Chính "mưa xuân" đã tưới mát đất lành.'
      },
      {
        id: 'q-tv3-2',
        type: 'choice',
        prompt: 'Mầm xanh đã nhú lên mấy chiếc lá non?',
        options: ['Một chiếc lá', 'Hai chiếc lá', 'Ba chiếc lá', 'Năm chiếc lá'],
        correctAnswer: 'Hai chiếc lá',
        hint: '"Nó nhú lên hai chiếc lá non xanh biếc..."',
        explanation: 'Rất thông minh! Hai chiếc lá non mọc đón nắng mai.'
      }
    ]
  },

  // --- TOÁN LỚP 1 ---
  {
    id: 'toan-01',
    subject: 'math',
    grade: 1,
    unit: 'Chủ đề 1: Số và phép đếm',
    title: 'Bí mật đếm nhanh và so sánh: Lớn hơn (>), Bé hơn (<), Bằng (=)',
    summary: 'Mẹo chú cá sấu há to miệng về phía số lớn hơn giúp bé không bao giờ nhầm dấu so sánh.',
    visualIcon: '🐊',
    level: 'Củng cố khó khăn',
    tags: ['So sánh số', 'Dấu lớn bé', 'Phạm vi 10'],
    content: `
⭐ MẸO CHÚ CÁ SẤU THAM ĂN:
- Chú cá sấu há mồm to > < luôn luôn quay miệng về phía CÓ NHIỀU QUẢ TÁO HƠN!
- Ví dụ: 8 > 3 (Cá sấu quay miệng về phía số 8).
- Ví dụ: 4 < 9 (Cá sấu quay miệng về phía số 9).
- Khi hai bên bằng nhau thì ta dùng dấu bằng (=), ví dụ: 5 = 5.
    `,
    audioPronunciation: 'Tám lớn hơn ba. Bốn bé hơn chín. Năm bằng năm.',
    practiceQuestions: [
      {
        id: 'q-toan1-1',
        type: 'choice',
        prompt: 'Điền dấu thích hợp: 7 ... 4',
        options: ['>', '<', '=', '+'],
        correctAnswer: '>',
        hint: 'Số 7 nhiều hơn số 4, cá sấu há miệng về số nào nhỉ?',
        explanation: 'Chính xác! 7 > 4 (bảy lớn hơn bốn).'
      },
      {
        id: 'q-toan1-2',
        type: 'choice',
        prompt: 'Trong các số sau, số nào BÉ NHẤT: 9, 3, 6, 8?',
        options: ['9', '6', '3', '8'],
        correctAnswer: '3',
        hint: 'Số đếm trước là số bé hơn.',
        explanation: 'Đúng rồi! Số 3 là số bé nhất trong dãy.'
      }
    ]
  },
  {
    id: 'toan-02',
    subject: 'math',
    grade: 1,
    unit: 'Chủ đề 2: Phép tính trong phạm vi 10',
    title: 'Phép cộng và phép trừ kỳ diệu (Thêm vào & Bớt đi)',
    summary: 'Sử dụng mô hình quả táo và que tính trực quan để hiểu bản chất của phép tính.',
    visualIcon: '🍎',
    level: 'Cơ bản',
    tags: ['Phép cộng', 'Phép trừ', 'Phạm vi 10'],
    content: `
⭐ BẢN CHẤT PHÉP TÍNH:
- Phép cộng (+) = THÊM VÀO, CHO THÊM, CÓ TẤT CẢ.
  Ví dụ: Có 4 quả cam, mẹ cho thêm 3 quả: 4 + 3 = 7 quả.
- Phép trừ (-) = BỚT ĐI, RỤNG ĐI, ĂN MẤT, CÒN LẠI.
  Ví dụ: Cành cây có 8 chú chim, 2 chú bay đi: 8 - 2 = 6 chú chim.
    `,
    audioPronunciation: 'Bốn cộng ba bằng bảy. Tám trừ hai bằng sáu.',
    practiceQuestions: [
      {
        id: 'q-toan2-1',
        type: 'choice',
        prompt: 'Trên bàn có 5 bông hoa cúc, bé cắm thêm 4 bông hoa hồng. Hỏi có tất cả bao nhiêu bông hoa?',
        options: ['8 bông hoa', '9 bông hoa', '10 bông hoa', '7 bông hoa'],
        correctAnswer: '9 bông hoa',
        hint: 'Làm phép tính cộng: 5 + 4 = ?',
        explanation: 'Tuyệt đỉnh! 5 + 4 = 9 bông hoa ngát hương.'
      },
      {
        id: 'q-toan2-2',
        type: 'choice',
        prompt: 'Bé Mầm hái được 10 quả dâu tây, Bé Mầm chia cho bạn 4 quả. Bé Mầm còn lại mấy quả dâu tây?',
        options: ['5 quả', '6 quả', '7 quả', '4 quả'],
        correctAnswer: '6 quả',
        hint: 'Làm phép tính trừ: 10 - 4 = ?',
        explanation: 'Chính xác! 10 bớt 4 còn 6 quả dâu tây thơm ngon.'
      }
    ]
  },
  {
    id: 'toan-03',
    subject: 'math',
    grade: 1,
    unit: 'Chủ đề 3: Hình học và không gian',
    title: 'Thế giới hình học: Tròn, Vuông, Tam giác, Chữ nhật',
    summary: 'Nhận biết các hình xung quanh cuộc sống: bánh xe, mặt đồng hồ, cánh buồm, bảng con.',
    visualIcon: '📐',
    level: 'Cơ bản',
    tags: ['Hình học', 'Hình tròn', 'Hình tam giác'],
    content: `
⭐ ĐẶC ĐIỂM CÁC BẠN HÌNH HỌC:
- Hình tròn: Tròn xoe, không có góc cạnh, lăn được (như bánh xe, quả bóng, đĩa ăn).
- Hình tam giác: Có 3 cạnh thẳng và 3 góc nhọn (như mái nhà, biển báo giao thông).
- Hình vuông: Có 4 cạnh bằng nhau chằn chặn (như viên gạch hoa, chiếc khăn tay).
- Hình chữ nhật: Có 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau (như cái bảng, quyển sách Toán).
    `,
    practiceQuestions: [
      {
        id: 'q-toan3-1',
        type: 'choice',
        prompt: 'Vật nào sau đây có dạng hình tròn?',
        options: ['Quyển sách', 'Mặt đồng hồ treo tường', 'Cái bảng lớp học', 'Hộp sữa'],
        correctAnswer: 'Mặt đồng hồ treo tường',
        hint: 'Hình tròn xoe, có thể lăn được.',
        explanation: 'Rất giỏi! Mặt đồng hồ thường có dạng hình tròn.'
      }
    ]
  }
];
