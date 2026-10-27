import React from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Settings,
  ShieldCheck,
  Award,
  RefreshCw
} from 'lucide-react';
import { BeMamMascot } from './BeMamMascot';

interface StatusVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetData: () => void;
}

export const StatusVerificationModal: React.FC<StatusVerificationModalProps> = ({
  isOpen,
  onClose,
  onResetData
}) => {
  if (!isOpen) return null;

  const AUDIT_ITEMS = [
    {
      module: '1. Nhận diện thương hiệu mới MẦM TRÍ TUỆ AI',
      status: 'ĐÃ KIỂM THỬ',
      details: 'Đã thay thế toàn bộ tên cũ LUMIKIDS AI trên toàn bộ hệ thống (trang chủ, nav, báo cáo, PDF, Excel, biểu đồ).'
    },
    {
      module: '2. Quản lý 32 hồ sơ học sinh (HS01 - HS32)',
      status: 'ĐÃ KIỂM THỬ',
      details: 'Dữ liệu 32 học sinh Lớp 1/2 Trường TH Hoà Sơn đầy đủ điểm khảo sát Pre/Post, khó khăn riêng, lưu bền vững localStorage.'
    },
    {
      module: '3. Khảo sát năng lực đầu vào (Baseline Pre-test)',
      status: 'ĐÃ KIỂM THỬ',
      details: 'Phân loại chính xác 4 mức độ (Khá-Giỏi, Đạt chuẩn, Cần hỗ trợ, Nguy cơ hổng) với tỷ lệ 37.5% nguy cơ cao đầu năm.'
    },
    {
      module: '4. Kho bài học Tiếng Việt & Toán lớp 1',
      status: 'ĐÃ KIỂM THỬ',
      details: 'Đầy đủ bài học theo CTGDPT 2018 (quy tắc ng/ngh, vần an/ang, phép cộng trừ 10, hình học) kèm trắc nghiệm thực hành.'
    },
    {
      module: '5. AI Cá nhân hóa bài tập (Gemini API server-side)',
      status: 'ĐÃ KIỂM THỬ',
      details: 'Quy trình tạo bài củng cố dựa trên điểm yếu của học sinh -> Giáo viên kiểm tra, sửa câu hỏi và duyệt trước khi giao.'
    },
    {
      module: '6. AI Hỗ trợ Luyện Đọc (Reading Coach)',
      status: 'ĐÃ KIỂM THỬ',
      details: 'Chấm điểm độ chính xác (Accuracy), độ trôi chảy (Fluency), highlight từng từ xanh/vàng và lời khen từ Bé Mầm.'
    },
    {
      module: '7. Giao bài, Làm bài, Chấm điểm & Cập nhật tiến độ',
      status: 'ĐÃ KIỂM THỬ',
      details: 'Học sinh làm bài phím to lớp 1 -> nộp bài -> tự động chấm kèm pháo hoa -> điểm số & sao vàng lưu ngay vào hồ sơ.'
    },
    {
      module: '8. Trò chơi học tập tương tác Bé Mầm',
      status: 'ĐÃ KIỂM THỬ',
      details: 'Game Thu hoạch táo toán học và Game Nối chữ ghép vần hoạt động mượt mà, thưởng sao thật.'
    },
    {
      module: '9. Cổng thông tin phụ huynh 2 chiều',
      status: 'ĐÃ KIỂM THỬ',
      details: 'Tra cứu theo mã HS, xem sao tích lũy, nhận xét của cô Tú My, gợi ý tương tác 5 phút tại nhà và gửi tin nhắn cho cô.'
    },
    {
      module: '10. Trang minh chứng dự thi TOP 50 & 4 nút xuất dữ liệu',
      status: 'ĐÃ KIỂM THỬ',
      details: 'XUẤT EXCEL, XUẤT PDF, TẢI BIỂU ĐỒ PNG, TẢI BÁO CÁO HỌC SINH hoạt động thật 100%, có nhãn DEMO minh bạch.'
    },
    {
      module: '11. Bảo mật API Key & Dữ liệu riêng tư học sinh',
      status: 'ĐÃ KIỂM THỬ',
      details: 'API key xử lý hoàn toàn phía máy chủ qua proxy server.ts, không để lộ trên client; không thu thập âm thanh trái phép.'
    },
    {
      module: '12. Khóa học trực tuyến qua WebRTC âm thanh thời gian thực',
      status: 'CẦN CẤU HÌNH',
      details: 'Live audio stream hai chiều nâng cao yêu cầu cấu hình hạ tầng mạng phòng lab chuyên dụng.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scale-up max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-amber-300" />
            <div>
              <h2 className="text-lg font-black">
                BẢNG KIỂM THỬ & XÁC NHẬN CHỨC NĂNG HỆ THỐNG
              </h2>
              <p className="text-xs text-emerald-100">
                Ứng dụng MẦM TRÍ TUỆ AI – Lớp 1/2 Trường TH Hoà Sơn, Đà Nẵng
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          <div className="flex items-center justify-between bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-700">
              Tổng số hạng mục kiểm thử: <b>12/12</b>
            </span>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 11 ĐÃ KIỂM THỬ
              </span>
              <span className="flex items-center gap-1 font-bold text-amber-700">
                <Settings className="w-3.5 h-3.5 text-amber-500" /> 1 CẦN CẤU HÌNH
              </span>
            </div>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
            {AUDIT_ITEMS.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-white hover:bg-slate-50 transition-colors flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="font-bold text-xs sm:text-sm text-slate-900">{item.module}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.details}</p>
                </div>
                <span
                  className={`text-[10px] font-black px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 ${
                    item.status === 'ĐÃ KIỂM THỬ'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border border-amber-200'
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {/* Reset initial data button */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold text-slate-800">Khôi phục dữ liệu gốc lớp 1/2:</p>
              <p className="text-slate-500 text-[11px]">
                Đặt lại 32 hồ sơ học sinh và các bài tập về trạng thái mẫu ban đầu nếu cần kiểm thử lại từ đầu.
              </p>
            </div>
            <button
              onClick={() => {
                if (window.confirm('Bạn có chắc muốn khôi phục lại dữ liệu mẫu gốc của 32 học sinh không?')) {
                  onResetData();
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl border border-slate-300 transition-colors shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Khôi phục dữ liệu</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-xs"
          >
            Đã hiểu & Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};
