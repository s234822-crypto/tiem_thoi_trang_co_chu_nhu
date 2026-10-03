import React from 'react';
import { Sparkles, Eye, ShoppingCart, CheckCircle, Award, Store, Target, Trophy, Sun } from 'lucide-react';

interface GuideModalProps {
  onClose: () => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({ onClose }) => {
  const steps = [
    {
      step: 1,
      icon: <Eye className="w-4 h-4 text-[#D87C9B]" />,
      title: 'Lắng nghe yêu cầu khách',
      desc: 'Mỗi khách hàng sẽ chia sẻ gu thời trang, dịp mặc, tone màu và ngân sách tối đa.',
    },
    {
      step: 2,
      icon: <ShoppingCart className="w-4 h-4 text-[#D87C9B]" />,
      title: 'Chọn sản phẩm phù hợp',
      desc: 'Mở Tủ Đồ Tiệm và chọn trang phục có style tag và màu sắc khớp với nhu cầu của khách.',
    },
    {
      step: 3,
      icon: <Sparkles className="w-4 h-4 text-[#D87C9B]" />,
      title: 'Phối Outfit hoàn hảo',
      desc: 'Phối Áo + Quần/Chân váy hoặc 1 chiếc Đầm xinh xắn, kèm Áo khoác, Giày, Túi và Phụ kiện.',
    },
    {
      step: 4,
      icon: <CheckCircle className="w-4 h-4 text-[#D87C9B]" />,
      title: 'Cho khách thử đồ & Chấm điểm',
      desc: 'Khách sẽ chấm điểm dựa trên Style, Occasion, Color, Budget và Độ hoàn thiện (0 - 100 điểm). Đạt từ 60đ trở lên để khách mua đồ!',
    },
    {
      step: 5,
      icon: <Sun className="w-4 h-4 text-[#D9A441]" />,
      title: 'Sự kiện & Khách hàng đặc biệt',
      desc: 'Mỗi ngày có sự kiện thời tiết/xu hướng riêng. Đón tiếp Influencer (tiệm viral nếu phối đẹp), Reviewer (ảnh hưởng số sao), Khách quen (kiên nhẫn), Khách khó tính (cần ≥75đ).',
    },
    {
      step: 6,
      icon: <Target className="w-4 h-4 text-[#D87C9B]" />,
      title: 'Nhiệm vụ hàng ngày',
      desc: 'Mỗi ngày có 3 nhiệm vụ mục tiêu ngẫu nhiên. Hoàn thành để nhận thêm tiền thưởng và EXP quý giá!',
    },
    {
      step: 7,
      icon: <Trophy className="w-4 h-4 text-[#D9A441]" />,
      title: 'Hệ thống Thành tựu',
      desc: 'Ghi dấu cột mốc kinh doanh vĩnh viễn (doanh thu khủng, khách VIP, chuỗi hoàn hảo) để nhận quà lớn.',
    },
    {
      step: 8,
      icon: <Store className="w-4 h-4 text-[#D87C9B]" />,
      title: 'Quản lý kho & Nâng cấp Tiệm',
      desc: 'Nhớ nhập thêm hàng vào đầu hoặc cuối ngày. Mua sắm nội thất, mở rộng tiệm thành Luxury Boutique!',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="w-full max-w-sm max-h-[85vh] bg-[#FFF8F4] border-2 border-[#F4C7D9] rounded-2xl p-4 shadow-xl flex flex-col select-none animate-gentle-bounce">
        {/* Header */}
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#F2E1CF]">
          <div className="flex items-center gap-1.5">
            <span className="text-lg">📖</span>
            <h3 className="text-sm font-extrabold text-[#3E3431] font-heading">
              Cẩm Nang Cô Chủ Tiệm
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white border border-[#F2E1CF] text-[#6F554A] font-bold flex items-center justify-center hover:bg-rose-50"
          >
            ✕
          </button>
        </div>

        {/* Steps List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {steps.map((s) => (
            <div
              key={s.step}
              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/90 border border-[#F2E1CF] shadow-2xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#FFF0F5] border border-[#F4C7D9] flex items-center justify-center shrink-0 font-extrabold text-xs text-[#D87C9B]">
                {s.step}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#3E3431] mb-0.5 flex items-center gap-1">
                  <span>{s.title}</span>
                </h4>
                <p className="text-[11px] text-[#6F554A] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <button
          onClick={onClose}
          className="mt-3 w-full h-10 rounded-xl bg-[#D87C9B] hover:bg-[#c96c8a] text-white text-xs font-bold transition-all shadow-xs shrink-0"
        >
          Đã hiểu, sẵn sàng mở tiệm!
        </button>
      </div>
    </div>
  );
};
