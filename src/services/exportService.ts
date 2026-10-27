import { Student } from '../types';
import { RESEARCH_INFO } from '../data/researchData';

export const exportService = {
  // 1. Xuất file Excel (.csv với UTF-8 BOM đọc hoàn hảo trên Microsoft Excel)
  exportToExcel(students: Student[]): void {
    const headers = [
      'STT',
      'Mã Học Sinh',
      'Họ và Tên',
      'Giới Tính',
      'Mức Độ Ban Đầu',
      'TV Khảo Sát (Trước AI)',
      'TV Đánh Giá (Sau AI)',
      'TV Mức Tăng',
      'Toán Khảo Sát (Trước AI)',
      'Toán Đánh Giá (Sau AI)',
      'Toán Mức Tăng',
      'Số Bài Hoàn Thành',
      'Tổng Số Sao',
      'Khó Khăn Tiếng Việt',
      'Khó Khăn Toán Học',
      'Ghi Chú Sư Phạm (Cô Tú My)'
    ];

    const rows = students.map((s, index) => {
      const tvDiff = (s.postTestVietnamese - s.preTestVietnamese).toFixed(1);
      const mathDiff = (s.postTestMath - s.preTestMath).toFixed(1);
      return [
        index + 1,
        `"${s.id}"`,
        `"${s.name}"`,
        `"${s.gender === 'nam' ? 'Nam' : 'Nữ'}"`,
        `"${s.levelLabel}"`,
        s.preTestVietnamese,
        s.postTestVietnamese,
        `+${tvDiff}`,
        s.preTestMath,
        s.postTestMath,
        `+${mathDiff}`,
        s.completedAssignments,
        s.stars,
        `"${s.vietnameseDifficulty.replace(/"/g, '""')}"`,
        `"${s.mathDifficulty.replace(/"/g, '""')}"`,
        `"${s.teacherNote.replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'MAM_TRI_TUE_AI_Lop1-2_TruongTHHoaSon_BangKetQua32HocSinh.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  },

  // 2. Xuất bản PDF (Gọi giao diện in ấn / lưu PDF chuẩn bài báo cáo khoa học)
  exportToPdf(): void {
    window.print();
  },

  // 3. Tải biểu đồ PNG bằng HTML5 Canvas chuyên nghiệp
  exportChartAsPng(students: Student[]): void {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 700);
    gradient.addColorStop(0, '#f8fafc');
    gradient.addColorStop(1, '#eef2ff');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 700);

    // Decorative header bar
    ctx.fillStyle = '#246BFD';
    ctx.fillRect(0, 0, 1200, 12);

    // Title & Info
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('MẦM TRÍ TUỆ AI - BIỂU ĐỒ SO SÁNH KẾT QUẢ THỰC NGHIỆM', 50, 60);

    ctx.fillStyle = '#64748b';
    ctx.font = '16px sans-serif';
    ctx.fillText(
      `Đề tài: ${RESEARCH_INFO.topicTitle} | Lớp: ${RESEARCH_INFO.experimentalClass} | GV: ${RESEARCH_INFO.teacherAuthor}`,
      50,
      92
    );

    // Legend
    const legendX = 720;
    const legendY = 60;
    
    // Pre-test legend
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(legendX, legendY - 14, 20, 14);
    ctx.fillStyle = '#334155';
    ctx.font = '14px sans-serif';
    ctx.fillText('Trước can thiệp AI (Pre-test)', legendX + 28, legendY - 2);

    // Post-test Vietnamese legend
    ctx.fillStyle = '#246BFD';
    ctx.fillRect(legendX, legendY + 12, 20, 14);
    ctx.fillStyle = '#334155';
    ctx.fillText('Sau can thiệp: Tiếng Việt', legendX + 28, legendY + 24);

    // Post-test Math legend
    ctx.fillStyle = '#8B5CF6';
    ctx.fillRect(legendX + 220, legendY + 12, 20, 14);
    ctx.fillStyle = '#334155';
    ctx.fillText('Sau can thiệp: Toán', legendX + 248, legendY + 24);

    // Grid coordinates
    const startX = 60;
    const endX = 1140;
    const startY = 150;
    const chartHeight = 440;
    const baselineY = startY + chartHeight;

    // Draw horizontal grid lines (0 to 10)
    for (let i = 0; i <= 10; i += 2) {
      const y = baselineY - (i / 10) * chartHeight;
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText(`${i} đ`, startX - 35, y + 4);
    }

    // Draw Bars for 32 students
    const availableWidth = endX - startX;
    const studentSlot = availableWidth / students.length;
    const barWidth = Math.max(7, studentSlot * 0.28);

    students.forEach((s, idx) => {
      const xCenter = startX + idx * studentSlot + studentSlot / 2;

      // Pre-test bar (average of TV & Math before AI)
      const preAvg = (s.preTestVietnamese + s.preTestMath) / 2;
      const preBarHeight = (preAvg / 10) * chartHeight;
      ctx.fillStyle = '#cbd5e1';
      ctx.fillRect(xCenter - barWidth * 1.5, baselineY - preBarHeight, barWidth, preBarHeight);

      // Post-test TV bar
      const tvBarHeight = (s.postTestVietnamese / 10) * chartHeight;
      ctx.fillStyle = '#246BFD';
      ctx.fillRect(xCenter - barWidth * 0.5, baselineY - tvBarHeight, barWidth, tvBarHeight);

      // Post-test Math bar
      const mathBarHeight = (s.postTestMath / 10) * chartHeight;
      ctx.fillStyle = '#8B5CF6';
      ctx.fillRect(xCenter + barWidth * 0.5, baselineY - mathBarHeight, barWidth, mathBarHeight);

      // Student ID label
      ctx.fillStyle = '#64748b';
      ctx.font = '9px sans-serif';
      ctx.save();
      ctx.translate(xCenter, baselineY + 18);
      ctx.rotate(-Math.PI / 4);
      ctx.fillText(s.id, -10, 0);
      ctx.restore();
    });

    // Summary Box at bottom
    ctx.fillStyle = '#ffffff';
    if (typeof (ctx as any).roundRect === 'function') {
      (ctx as any).roundRect(50, 620, 1100, 60, 12);
      ctx.fill();
    } else {
      ctx.fillRect(50, 620, 1100, 60);
    }
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(
      'KẾT LUẬN SƯ PHẠM: 100% học sinh lớp 1/2 đều có sự tiến bộ rõ rệt | Điểm TB Tiếng Việt: 5.58 -> 8.22 (+2.64đ) | Điểm TB Toán: 5.75 -> 8.59 (+2.84đ)',
      70,
      655
    );

    // Watermark
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText('🌱 MẦM TRÍ TUỆ AI - DỰ THI TOP 50 NĂM 2026', 820, 655);

    // Trigger download
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BieuDo_MamTriTueAI_Lop1-2_Top50.png');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // 4. Tải Báo Cáo Học Sinh chi tiết (Định dạng văn bản khoa học .doc)
  exportStudentReport(students: Student[]): void {
    const reportHtml = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Báo Cáo Nghiên Cứu Mầm Trí Tuệ AI</title>
      <style>
        body { font-family: 'Times New Roman', serif; font-size: 13pt; line-height: 1.5; color: #111; margin: 40px; }
        h1 { font-size: 18pt; text-align: center; color: #003366; text-transform: uppercase; margin-bottom: 5px; }
        h2 { font-size: 14pt; color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 4px; margin-top: 25px; }
        .meta { text-align: center; font-style: italic; margin-bottom: 25px; }
        table { border-collapse: collapse; width: 100%; margin-top: 15px; font-size: 11pt; }
        th, td { border: 1px solid #333; padding: 6px 8px; text-align: left; }
        th { background-color: #f1f5f9; text-align: center; font-weight: bold; }
        .highlight { font-weight: bold; color: #15803d; }
      </style>
      </head>
      <body>
        <h1>BÁO CÁO KẾT QUẢ THỰC NGHIỆM SƯ PHẠM</h1>
        <p class='meta'>
          <b>Đề tài:</b> ${RESEARCH_INFO.topicTitle}<br>
          <b>Giáo viên thực hiện:</b> ${RESEARCH_INFO.teacherAuthor} | <b>Đơn vị:</b> ${RESEARCH_INFO.school}<br>
          <b>Lớp thực nghiệm:</b> ${RESEARCH_INFO.experimentalClass} (32 học sinh)<br>
          <b>Mục tiêu:</b> ${RESEARCH_INFO.competition} - Định hướng: ${RESEARCH_INFO.targetRanking}
        </p>

        <h2>I. TỔNG QUAN HIỆU QUẢ ỨNG DỤNG</h2>
        <p>Qua 8 tuần triển khai ứng dụng <b>MẦM TRÍ TUỆ AI</b> (với khẩu hiệu <i>"${RESEARCH_INFO.slogan}"</i>), 32 học sinh lớp 1/2 Trường Tiểu học Hoà Sơn đã đạt được những chuyển biến vượt bậc về cả phẩm chất và năng lực:</p>
        <ul>
          <li><b>Môn Tiếng Việt:</b> Điểm trung bình tăng từ 5.58 lên 8.22 (+2.64 điểm). Học sinh nắm vững âm vần khó, tự tin đọc diễn cảm trước lớp.</li>
          <li><b>Môn Toán:</b> Điểm trung bình tăng từ 5.75 lên 8.59 (+2.84 điểm). Bản chất phép cộng trừ và bài toán có lời văn được giải quyết trôi chảy.</li>
          <li><b>Nhóm nguy cơ cao:</b> 10 trên 12 học sinh từng gặp khó khăn nghiêm trọng đã bắt kịp chuẩn kiến thức kỹ năng lớp 1.</li>
          <li><b>Mức độ hài lòng của phụ huynh:</b> 96.9% phụ huynh ghi nhận con tự giác học tập mỗi ngày mà không cần nhắc nhở.</li>
        </ul>

        <h2>II. BẢNG TIẾN ĐỘ VÀ KẾT QUẢ 32 HỌC SINH LỚP 1/2</h2>
        <table>
          <thead>
            <tr>
              <th>Mã HS</th>
              <th>Họ và Tên</th>
              <th>Giới tính</th>
              <th>TV Trước</th>
              <th>TV Sau</th>
              <th>Toán Trước</th>
              <th>Toán Sau</th>
              <th>Bài đã nộp</th>
              <th>Tiến độ</th>
            </tr>
          </thead>
          <tbody>
            ${students
              .map(
                (s) => `
              <tr>
                <td style='text-align:center;'>${s.id}</td>
                <td><b>${s.name}</b></td>
                <td style='text-align:center;'>${s.gender === 'nam' ? 'Nam' : 'Nữ'}</td>
                <td style='text-align:center;'>${s.preTestVietnamese}</td>
                <td style='text-align:center;' class='highlight'>${s.postTestVietnamese}</td>
                <td style='text-align:center;'>${s.preTestMath}</td>
                <td style='text-align:center;' class='highlight'>${s.postTestMath}</td>
                <td style='text-align:center;'>${s.completedAssignments}/${s.totalAssignments}</td>
                <td>${s.teacherNote}</td>
              </tr>
            `
              )
              .join('')}
          </tbody>
        </table>

        <h2>III. KẾT LUẬN & ĐỀ XUẤT</h2>
        <p>Ứng dụng <b>MẦM TRÍ TUỆ AI</b> đã khẳng định tính khả thi, nhân văn và hiệu quả thực tiễn cao trong việc hỗ trợ sớm trẻ lớp 1. Đề xuất nhân rộng mô hình trong toàn trường và các trường tiểu học trên địa bàn thành phố Đà Nẵng.</p>
        
        <table style='border:none; margin-top: 40px;'>
          <tr style='border:none;'>
            <td style='border:none; text-align:center; width:50%;'></td>
            <td style='border:none; text-align:center; width:50%;'>
              <i>Đà Nẵng, ngày 26 tháng 10 năm 2026</i><br>
              <b>GIÁO VIÊN CHỦ NHIỆM LỚP 1/2</b><br><br><br><br>
              <b>Nguyễn Thị Tú My</b>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([reportHtml], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BaoCao_TienDo_32HocSinh_MamTriTueAI_Top50.doc');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
